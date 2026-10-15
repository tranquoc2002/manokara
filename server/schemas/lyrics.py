"""Provider-neutral lyric validation, matching and ordering. Never rewrites LRC clocks."""
from difflib import SequenceMatcher
import hashlib
import math
import re
import unicodedata
from urllib.parse import urlsplit

PROVIDER_LABELS = {"lrclib": "LRCLIB", "netease": "NetEase", "amll": "AMLL TTML", "musixmatch": "Musixmatch"}
SOURCE_HOSTS = {
    "lrclib": {"lrclib.net"}, "netease": {"music.163.com"},
    "musixmatch": {"musixmatch.com", "www.musixmatch.com"},
    "amll": {"github.com"},
}
TIMESTAMP = re.compile(r"\[\d{1,3}:[0-5]\d(?:[.:]\d{1,3})?\]")
METADATA = re.compile(r"^\[(?:ar|ti|al|by|re|ve|length|id):.*\]\s*$", re.I)
NOISE = re.compile(r"\b(?:karaoke|instrumental|official|lyrics?|video|audio|beat)\b", re.I)


def text(value, limit=512):
    return value.strip()[:limit] if isinstance(value, str) else ""


def duration(value):
    if isinstance(value, bool):
        return None
    try:
        result = float(value)
        return result if math.isfinite(result) and 0 < result <= 86400 else None
    except (TypeError, ValueError, OverflowError):
        return None


def source_url(provider, value):
    if not isinstance(value, str) or len(value) > 2048:
        return ""
    try:
        url = urlsplit(value)
        if (url.scheme == "https" and url.hostname in SOURCE_HOSTS[provider] and
                not url.username and not url.password and url.port in (None, 443)):
            if provider == "amll" and not url.path.startswith("/amll-dev/amll-ttml-db/"):
                return ""
            return value
    except ValueError:
        pass
    return ""


def lyric_text(value):
    # Match the editor and relay limits; rejecting is safer than cutting off half a song.
    if not isinstance(value, str) or not value.strip() or "\0" in value or len(value) > 200000:
        return ""
    if len(value.encode("utf-8")) > 220000:
        return ""
    return value.replace("\r\n", "\n").replace("\r", "\n")


def has_timecodes(value):
    return any(TIMESTAMP.match(line.strip()) and TIMESTAMP.sub("", line).strip()
               for line in value.splitlines())


def normalize_result(provider, row):
    if not isinstance(row, dict):
        return None
    title, artist = text(row.get("trackName")), text(row.get("artistName"))
    synced, plain = lyric_text(row.get("syncedLyrics")), lyric_text(row.get("plainLyrics"))
    if synced and not has_timecodes(synced):
        plain, synced = plain or synced, ""
    if not synced and plain and has_timecodes(plain):
        synced = plain
    if synced:
        plain = ""
    if not title or not (synced or plain):
        return None
    source = {"id": provider, "label": PROVIDER_LABELS[provider], "url": source_url(provider, row.get("sourceUrl"))}
    return {"trackName": title, "artistName": artist, "duration": duration(row.get("duration")),
            "syncedLyrics": synced or None, "plainLyrics": plain or None, "sources": [source],
            "copyright": text(row.get("copyright"), 2000),
            "wordTimed": bool(synced and (row.get("wordTimed") if type(row.get("wordTimed")) is bool else re.search(r"<\d{1,3}:\d{2}(?:\.\d+)?>[^<\r\n]+", synced))),
            "format": "ttml" if row.get("format") == "ttml" else "lrc",
            "warnings": [value for value in row.get("warnings", []) if value in ("background", "auxiliary", "overlap", "reserved_characters")][:4] if isinstance(row.get("warnings"), list) else []}


def fold(value):
    value = NOISE.sub(" ", unicodedata.normalize("NFKD", value).casefold())
    return " ".join("".join(char if char.isalnum() else " " for char in value
                            if not unicodedata.combining(char)).split())


def match_score(row, query):
    query, title = fold(query), fold(row["trackName"])
    combined = fold(row["trackName"] + " " + row["artistName"])
    tokens = set(query.split())
    return max(SequenceMatcher(None, query, title).ratio(),
               SequenceMatcher(None, query, combined).ratio(),
               len(tokens & set(combined.split())) / max(1, len(tokens | set(combined.split()))))


def fingerprint(row):
    # Keep every timing token, offset tag and blank timed gap. Different timing maps are different results.
    body = row["syncedLyrics"] or row["plainLyrics"]
    body = "\n".join(line.rstrip() for line in body.splitlines() if not METADATA.fullmatch(line.strip())).strip()
    return hashlib.sha256(unicodedata.normalize("NFC", body).encode()).hexdigest()


def rank_results(rows, query, track_duration=None):
    def key(row):
        gap = abs(row["duration"] - track_duration) if row["duration"] and track_duration else float("inf")
        # No provider weight, including as a tie breaker.
        return (not bool(row["syncedLyrics"]), -round(match_score(row, query), 2), gap,
                fold(row["trackName"] + " " + row["artistName"]), fingerprint(row))
    unique = {}
    for row in sorted(rows, key=key):
        identity = (bool(row["syncedLyrics"]), fold(row["trackName"]), fold(row["artistName"]), fingerprint(row))
        if identity not in unique:
            unique[identity] = {**row, "sources": list(row["sources"])}
        else:
            previous = unique[identity]
            for source in row["sources"]:
                if source not in previous["sources"]:
                    previous["sources"].append(source)
            if row["copyright"] and row["copyright"] not in previous["copyright"]:
                previous["copyright"] = " · ".join(filter(None, (previous["copyright"], row["copyright"])))
    return list(unique.values())
