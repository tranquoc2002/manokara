"""Bounded lyric snapshot schema; partial merges are revalidated by the relay."""
import re
from starlette.exceptions import HTTPException
from ..constants import EFFECTS
from .overlay import overlay_config, playlist_data

def snapshot(payload):
    strings = {"writerId": 128, "title": 512, "lrc": 200_000, "romajiLrc": 200_000, "memo": 4096,
               "font": 256, "googleFont": 128, "foreground": 9, "background": 16,
               "effect": 32, "centerShape": 8, "colorTheme": 12,
               "overlay": 8192, "playlist": 64_000}
    numbers = {"time": (-86400, 604800), "sampledAt": (0, 100_000_000_000_000),
               "countdownRemaining": (0, 60), "duration": (0, 604800), "size": (24, 160),
               "themeSeed": (0, 4_294_967_295), "timelineVersion": (0, 100_000_000_000_000),
               "uploadDelayMs": (0, 2000),
               "playlistTime": (0, 604800),
               **{name: (0, 1) for name in ("audioPower", "audioBass", "audioLowMid", "audioMid", "audioVocal", "audioTreble")}}
    booleans = set("ready playing paused counting mc transparent bold centerFree".split())
    if set(payload) - (strings.keys() | numbers.keys() | booleans):
        raise HTTPException(400, "Unknown lyric state field.")
    for name, limit in strings.items():
        if name in payload and (not isinstance(payload[name], str) or len(payload[name]) > limit):
            raise HTTPException(400, f"Invalid {name}.")
    for name, (low, high) in numbers.items():
        if name in payload and (type(payload[name]) not in (int, float) or not low <= payload[name] <= high):
            raise HTTPException(400, f"Invalid {name}.")
    for name in booleans:
        if name in payload and type(payload[name]) is not bool:
            raise HTTPException(400, f"Invalid {name}.")
    if not payload.get("writerId"):
        raise HTTPException(400, "writerId is required.")
    if payload.get("effect", "clean") not in EFFECTS:
        raise HTTPException(400, "Unknown visualizer.")
    if payload.get("centerShape", "auto") not in ("auto", "wide", "tall"):
        raise HTTPException(400, "Unknown centre shape.")
    if payload.get("colorTheme", "effect") not in ("effect", "white", "cyan", "rose", "amber", "violet", "mint"):
        raise HTTPException(400, "Unknown colour theme.")
    for name in ("foreground", "background"):
        if name in payload and not (re.fullmatch(r"#[a-fA-F0-9]{6}", payload[name]) or name == "background" and payload[name] == "transparent"):
            raise HTTPException(400, f"Invalid {name}.")
    if "overlay" in payload:
        overlay_config(payload["overlay"])
    if "playlist" in payload:
        playlist_data(payload["playlist"])
    return payload
