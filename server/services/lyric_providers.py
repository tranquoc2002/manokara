"""Small source adapters. Fixed HTTPS endpoints; no scraping, shared account cookies or desktop tokens."""
import asyncio
import re

from ..schemas.lyrics import duration, match_score, text


class ProviderError(Exception):
    def __init__(self, status="unavailable"):
        self.status = status
        super().__init__(status)


async def lrclib(get, query, track_duration):
    data = await get("https://lrclib.net/api/search", {"q": query})
    if not isinstance(data, list):
        raise ProviderError("invalid")
    return [{**row, "sourceUrl": "https://lrclib.net/"} for row in data[:100] if isinstance(row, dict)], False


async def expand(candidates, fetch):
    if not candidates:
        return [], False
    tasks = [asyncio.create_task(fetch(row)) for row in candidates]
    try:
        done, pending = await asyncio.wait(tasks, timeout=4.5)
        responses = []
        for task in tasks:
            if task in done:
                try:
                    responses.append(task.result())
                except Exception as error:
                    responses.append(error)
        if pending:
            responses.append(ProviderError("timeout"))
    finally:
        for task in tasks:
            if not task.done():
                task.cancel()
        await asyncio.gather(*tasks, return_exceptions=True)
    rows = [row for row in responses if isinstance(row, dict)]
    errors = [row for row in responses if isinstance(row, Exception)]
    if errors and not rows:
        raise next((error for error in errors if isinstance(error, ProviderError)), ProviderError())
    return rows, bool(errors)


def candidates(rows, query, mapper, limit=4):
    if not isinstance(rows, list):
        raise ProviderError("invalid")
    mapped = []
    for value in rows[:30]:
        row = mapper(value) if isinstance(value, dict) else None
        if isinstance(row, dict):
            row["trackName"], row["artistName"] = text(row.get("trackName")), text(row.get("artistName"))
            if row["trackName"]:
                mapped.append(row)
    return sorted(mapped, key=lambda row: -match_score(row, query))[:limit]


async def netease(get, query, track_duration):
    # The legacy /api/search/pc can reject anonymous queries with -462. The maintained
    # NeteaseCloudMusicApiEnhanced search module uses /api/search/get.
    data = await get("https://music.163.com/api/search/get", {"s": query, "type": 1, "limit": 8, "offset": 0})
    if not isinstance(data, dict):
        raise ProviderError("invalid")
    if data.get("code") in (-462, 301, 302, 401, 403):
        raise ProviderError("restricted")
    if data.get("code") != 200:
        raise ProviderError()

    def metadata(row):
        artists = row.get("artists") or row.get("ar") or []
        milliseconds = row.get("duration") or row.get("dt")
        seconds = duration(milliseconds / 1000) if isinstance(milliseconds, (int, float)) else None
        return {"id": row.get("id"), "trackName": row.get("name", ""),
                "artistName": ", ".join(str(artist.get("name", "")) for artist in artists if isinstance(artist, dict)),
                "duration": seconds}

    rows = candidates((data.get("result") or {}).get("songs") or [], query, metadata)

    async def lyric(row):
        if not re.fullmatch(r"\d{1,20}", str(row["id"])):
            raise ProviderError("invalid")
        body = await get("https://music.163.com/api/song/lyric", {"id": row["id"], "lv": -1, "kv": -1, "tv": -1}, cache=True)
        if not isinstance(body, dict) or body.get("code", 200) != 200:
            raise ProviderError("restricted")
        lrc = body.get("lrc") or {}
        return {**row, "syncedLyrics": lrc.get("lyric") if isinstance(lrc, dict) else None,
                "sourceUrl": "https://music.163.com/#/song?id=" + str(row["id"])}
    return await expand(rows, lyric)


async def musixmatch(get, query, track_duration):
    def body(data):
        if not isinstance(data, dict) or not isinstance(data.get("message"), dict):
            raise ProviderError("invalid")
        message = data["message"]
        code = (message.get("header") or {}).get("status_code")
        if code in (401, 402, 403):
            raise ProviderError("credentials")
        if code == 429:
            raise ProviderError("limited")
        if code != 200:
            raise ProviderError()
        return message.get("body") or {}

    data = body(await get("https://api.musixmatch.com/ws/1.1/track.search",
                          {"q": query, "page_size": 5, "page": 1, "s_track_rating": "desc"}))
    def metadata(value):
        track = value.get("track")
        if isinstance(track, dict):
            return {**track, "trackName": track.get("track_name"), "artistName": track.get("artist_name")}
    rows = candidates(data.get("track_list", []), query, metadata)

    async def lyric(row):
        track_id = row.get("track_id")
        if not re.fullmatch(r"\d{1,20}", str(track_id)):
            raise ProviderError("invalid")
        data = body(await get("https://api.musixmatch.com/ws/1.1/track.subtitle.get",
                              {"track_id": track_id, "subtitle_format": "lrc"}))
        subtitle = data.get("subtitle") or {}
        if not isinstance(subtitle, dict) or subtitle.get("restricted"):
            raise ProviderError("restricted")
        return {"trackName": row.get("track_name"), "artistName": row.get("artist_name"),
                "duration": row.get("track_length"), "syncedLyrics": subtitle.get("subtitle_body"),
                "copyright": subtitle.get("lyrics_copyright", ""), "sourceUrl": row.get("track_share_url", "")}
    # Adapt Musixmatch metadata to the same neutral ranking before fetching detail.
    return await expand(rows, lyric)


ADAPTERS = {"lrclib": lrclib, "netease": netease, "musixmatch": musixmatch}
