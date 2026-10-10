"""Bounded data-only overlay schemas. Themes never supply executable markup."""
import json
import re

from starlette.exceptions import HTTPException


def invalid():
    raise HTTPException(400, "Invalid overlay or playlist data.")


def object_value(value, keys):
    if not isinstance(value, dict) or set(value) != set(keys.split()):
        invalid()


def number(value, low, high):
    if type(value) not in (int, float) or not low <= value <= high:
        invalid()


def text(value, limit):
    if not isinstance(value, str) or len(value) > limit:
        invalid()


def boolean(value):
    if type(value) is not bool:
        invalid()


def parse(raw):
    try:
        return json.loads(raw, parse_constant=lambda _: invalid())
    except (ValueError, RecursionError, TypeError):
        invalid()


def overlay_config(raw):
    value = parse(raw)
    required = set("version width height lyric playlist".split())
    if not isinstance(value, dict) or not required <= set(value) or set(value) - required - {"lyricCompact"}:
        invalid()
    if type(value["version"]) is not int or value["version"] != 1:
        invalid()
    number(value["width"], 320, 3840)
    number(value["height"], 240, 2160)

    def rect(block, extra=""):
        object_value(block, "x y w h visible " + extra)
        number(block["x"], 0, value["width"])
        number(block["y"], 0, value["height"])
        number(block["w"], 32, value["width"])
        number(block["h"], 32, value["height"])
        if block["x"] + block["w"] > value["width"] + .01 or block["y"] + block["h"] > value["height"] + .01:
            invalid()
        boolean(block["visible"])

    rect(value["lyric"])
    if "lyricCompact" in value:
        rect(value["lyricCompact"], "autoFit")
        boolean(value["lyricCompact"]["autoFit"])
    p = value["playlist"]
    required = set("theme foreground accent background opacity radius font limit listMode numbering progress hideIdle blocks".split())
    optional = {"layout", "group", "autoScroll", "scrollSpeed", "scrollPause"}
    if not isinstance(p, dict) or not required <= set(p) or set(p) - required - optional:
        invalid()
    if "layout" in p and p["layout"] not in ("separate", "unified"):
        invalid()
    if "group" in p:
        rect(p["group"])
    if "autoScroll" in p:
        boolean(p["autoScroll"])
    if "scrollSpeed" in p:
        number(p["scrollSpeed"], 8, 80)
    if "scrollPause" in p:
        number(p["scrollPause"], 0, 10)
    if p["theme"] not in ("glass", "paper", "minimal", "card", "vinyl", "signal") or p["font"] not in ("system", "geist", "serif", "mono") or p["listMode"] not in ("all", "upcoming", "history"):
        invalid()
    for name in ("foreground", "accent", "background"):
        if not isinstance(p[name], str) or not re.fullmatch(r"#[a-fA-F0-9]{6}", p[name]):
            invalid()
    number(p["opacity"], 0, 1)
    number(p["radius"], 0, 80)
    if type(p["limit"]) is not int or not 1 <= p["limit"] <= 20:
        invalid()
    for name in ("numbering", "progress", "hideIdle"):
        boolean(p[name])
    object_value(p["blocks"], "current list next")
    for b in p["blocks"].values():
        rect(b, "size label align bold")
        number(b["size"], 12, 96)
        text(b["label"], 80)
        boolean(b["bold"])
        if b["align"] not in ("left", "center", "right"):
            invalid()


def playlist_data(raw):
    p = parse(raw)
    object_value(p, "now next videoId currentIndex nextIndex status songs history")
    text(p["now"], 160)
    text(p["next"], 160)
    if not isinstance(p["videoId"], str) or p["videoId"] and not re.fullmatch(r"[\w-]{11}", p["videoId"], re.ASCII):
        invalid()
    if p["status"] not in ("ready", "playing", "paused", "counting", "mc"):
        invalid()
    for name in ("currentIndex", "nextIndex"):
        if type(p[name]) is not int or not -1 <= p[name] <= 1_000_000:
            invalid()
    for name in ("songs", "history"):
        if not isinstance(p[name], list) or len(p[name]) > 120:
            invalid()
        for song in p[name]:
            object_value(song, "title index")
            text(song["title"], 160)
            if type(song["index"]) is not int or not 0 <= song["index"] <= 1_000_000:
                invalid()
