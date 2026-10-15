"""Fixed HTTPS lyric sources using anonymous public clients or configured backend keys."""
import asyncio
import hashlib
import hmac
import re
import time
import httpx
from urllib.parse import quote, urlencode, urlsplit

from ..schemas.lyrics import duration, lyric_text, match_score, text
from ..schemas.yrc import convert_yrc, YrcError
from ..schemas.qrc import convert_qrc, QrcError
from ..schemas.zing import convert_zing, ZingLyricError

# Public anonymous web-client values shipped at zingmp3.vn (desktop v1.22.2).
# These identify the public client, not a user account. Keep signing server-side.
# Protocol reference: yt-dlp/yt_dlp/extractor/zingmp3.py and the public Zing bundle.
ZING_VERSION = "1.22.2"
ZING_CLIENT_ID = "X5BM3w8N7MKozC0B85o4KMlzLZKhV00y"
ZING_SIGNING_KEY = b"acOrvUS15XRW2o9JksiK1KgQ6Vbds8ZW"
ZING_API_PATHS = {"/api/v2/search/multi", "/api/v2/lyric/get/lyric"}
ZING_LYRIC_HOST = "static-zmp3.zmdcdn.me"


def zing_params(path, params):
    if path not in ZING_API_PATHS:
        raise ProviderError("invalid")
    values = {**params, "ctime": str(int(time.time())), "version": ZING_VERSION}
    signed = {key: value for key, value in values.items() if key in ("ctime", "id", "type", "page", "count", "version")}
    canonical = "".join(key + "=" + quote(str(value), safe="") for key, value in sorted(signed.items()))
    digest = hashlib.sha256(canonical.encode()).hexdigest()
    return {**values, "apiKey": ZING_CLIENT_ID,
            "sig": hmac.new(ZING_SIGNING_KEY, (path + digest).encode(), hashlib.sha512).hexdigest()}


def zing_lyric_file(url):
    if not isinstance(url, str) or len(url) > 512:
        return False
    try:
        parsed = urlsplit(url)
        return (parsed.scheme == "https" and parsed.netloc == ZING_LYRIC_HOST and
                not parsed.query and not parsed.fragment and
                bool(re.fullmatch(r"/lyrics/(?:[A-Za-z0-9_-]+/)*[A-Za-z0-9_-]+\.lrc", parsed.path)))
    except ValueError:
        return False


class ProviderError(Exception):
    def __init__(self, status="unavailable", *, retry_at=None):
        self.status = status
        self.retry_at = retry_at
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
    data = await get("https://music.163.com/api/search/get", {"s": query, "type": 1, "limit": 8, "offset": 0},
                     method="POST", cache=True, cache_ttl=60)
    if not isinstance(data, dict):
        raise ProviderError("invalid")
    if data.get("code") in (-462, 301, 302, 401, 403):
        raise ProviderError("restricted")
    if data.get("code") == 429:
        raise ProviderError("limited")
    if data.get("code") != 200:
        raise ProviderError()
    result = data.get("result")
    if not isinstance(result, dict) or not isinstance(result.get("songs"), list) and result.get("songCount") != 0:
        raise ProviderError("invalid")

    def metadata(row):
        artists = row.get("artists") or row.get("ar") or []
        milliseconds = row.get("duration") or row.get("dt")
        seconds = duration(milliseconds / 1000) if isinstance(milliseconds, (int, float)) else None
        return {"id": row.get("id"), "trackName": row.get("name", ""),
                "artistName": ", ".join(str(artist.get("name", "")) for artist in artists if isinstance(artist, dict)),
                "duration": seconds}

    rows = candidates(result.get("songs") or [], query, metadata)

    async def lyric(row):
        if not re.fullmatch(r"\d{1,20}", str(row["id"])):
            raise ProviderError("invalid")
        def validate(body):
            if not isinstance(body, dict):
                raise ProviderError("invalid")
            if body.get("code") in (-462, 301, 302, 401, 403):
                raise ProviderError("restricted")
            if body.get("code") == 429:
                raise ProviderError("limited")
            if body.get("code", 200) != 200:
                raise ProviderError()
            return body

        async def legacy():
            return validate(await get("https://music.163.com/api/song/lyric", {
                "id": row["id"], "lv": -1, "kv": -1, "tv": -1,
            }, cache=True))

        partial = False
        try:
            # The new endpoint returns both YRC and LRC where available. Keep enough
            # of the existing per-song budget to recover through the legacy endpoint.
            async with asyncio.timeout(2):
                body = validate(await get("https://music.163.com/api/song/lyric/v1", {
                    "id": row["id"], "cp": "false", "tv": 0, "lv": 0, "rv": 0,
                    "kv": 0, "yv": 0, "ytv": 0, "yrv": 0,
                }, cache=True))
            if not any(isinstance(body.get(key), dict) and body[key].get("lyric") for key in ("lrc", "yrc")) and not (body.get("nolyric") or body.get("uncollected")):
                raise ProviderError("invalid")
        except (ProviderError, httpx.HTTPError, TimeoutError, ValueError):
            partial = True
            body = await legacy()
        result = {**row, "sourceUrl": "https://music.163.com/#/song?id=" + str(row["id"]), "_partial": partial}
        yrc = body.get("yrc")
        if isinstance(yrc, dict) and yrc.get("lyric"):
            credit = body.get("lyricUser")
            try:
                converted = await asyncio.to_thread(convert_yrc, yrc["lyric"], title=row["trackName"], artist=row["artistName"],
                                                    author=text(credit.get("nickname")) if isinstance(credit, dict) else "")
                return {**result, **converted}
            except YrcError:
                result.update({"_partial": True, "warnings": ["word_timing_unavailable"]})
        lrc = body.get("lrc") or {}
        if not isinstance(lrc, dict):
            raise ProviderError("invalid")
        if result.get("warnings") and not lrc.get("lyric"):
            if partial:
                raise ProviderError("invalid")
            lrc = (await legacy()).get("lrc") or {}
            if not isinstance(lrc, dict) or not lrc.get("lyric"):
                raise ProviderError("invalid")
        return {**result, "syncedLyrics": lrc.get("lyric")}
    values, partial = await expand(rows, lyric)
    return values, partial or any(row.get("_partial") for row in values)


async def qqmusic(get, query, track_duration):
    # Better Lyrics returns decrypted QRC/XML. Keep the transport explicit in the
    # provider label; no shared QQ accounts or third-party client tokens are used.
    parts = re.split(r"\s+[—–]\s+", query, maxsplit=1)
    song, artist = parts[0], parts[1] if len(parts) > 1 else ""
    params = {"s": song}
    if artist:
        params["a"] = artist
    if track_duration:
        params["d"] = int(track_duration + .5)
    body = await get("https://api.betterlyrics.org/qq/getLyrics", params, cache=True, max_bytes=600000)
    if not isinstance(body, dict) or body.get("provider") != "qq":
        raise ProviderError("invalid")
    raw = body.get("lyrics")
    if not isinstance(raw, str):
        raise ProviderError("invalid")
    if not raw.strip():
        return [], False
    try:
        converted = await asyncio.to_thread(convert_qrc, raw)
    except QrcError:
        raise ProviderError("invalid") from None
    title = converted["trackName"] or song
    performer = converted["artistName"] or artist
    return [{**converted, "trackName": title, "artistName": performer,
             "sourceUrl": "https://y.qq.com/n/ryqq/search?" + urlencode({"w": title + " " + performer, "t": "song"})}], False


async def zingmp3(get, query, track_duration):
    # Bootstrap only an anonymous Zing visitor session. HTTPX retains the public
    # site's cookies; no logged-in account cookies are imported or configured.
    await get("https://zingmp3.vn/", {}, as_text=True, cache=True, cache_ttl=900, max_bytes=200000)

    def body(value):
        if not isinstance(value, dict) or type(value.get("err")) is not int:
            raise ProviderError("invalid")
        if value["err"] == 429:
            raise ProviderError("limited")
        if value["err"] != 0:
            raise ProviderError()
        data = value.get("data")
        if not isinstance(data, dict):
            raise ProviderError("invalid")
        return data

    data = body(await get("https://zingmp3.vn/api/v2/search/multi", {"q": query}, cache=True, cache_ttl=60))

    def metadata(row):
        song_id = row.get("encodeId")
        if not isinstance(song_id, str) or not re.fullmatch(r"[A-Za-z0-9]{6,32}", song_id) or row.get("hasLyric") is False or row.get("isPrivate") is True:
            return None
        link = row.get("link", "")
        source = "https://zingmp3.vn/link/song/" + song_id
        if isinstance(link, str) and re.fullmatch(r"/bai-hat/[^/?#\s]{1,512}/" + re.escape(song_id) + r"\.html", link):
            source = "https://zingmp3.vn" + link
        return {"id": song_id, "trackName": row.get("title"), "artistName": row.get("artistsNames"),
                "duration": duration(row.get("duration")), "sourceUrl": source}

    rows = candidates(data.get("songs", []), query, metadata)

    async def lyric(row):
        data = body(await get("https://zingmp3.vn/api/v2/lyric/get/lyric", {"id": row["id"]}, cache=True, max_bytes=600000))
        result = dict(row)
        if data.get("sentences"):
            try:
                converted = await asyncio.to_thread(convert_zing, data["sentences"], title=row["trackName"], artist=row["artistName"])
                return {**result, **converted}
            except ZingLyricError:
                result.update({"_partial": True, "warnings": ["word_timing_unavailable"]})
        # Only the official lyric CDN/path is allowed, never background assets or
        # arbitrary URLs carried in an upstream response.
        raw = data.get("lyric")
        if data.get("file"):
            if not zing_lyric_file(data["file"]):
                raise ProviderError("invalid")
            raw = await get(data["file"], {}, as_text=True, cache=True, max_bytes=500000)
        value = lyric_text(raw)
        if (raw and not value) or (result.get("_partial") and not value):
            raise ProviderError("invalid")
        return {**result, "syncedLyrics": value or None}

    values, partial = await expand(rows, lyric)
    return values, partial or any(row.get("_partial") for row in values)


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


ADAPTERS = {"lrclib": lrclib, "netease": netease, "qq": qqmusic, "zing": zingmp3, "musixmatch": musixmatch}
