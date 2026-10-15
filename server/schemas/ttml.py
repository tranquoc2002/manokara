"""AMLL TTML -> Enhanced LRC with explicit line/word ends for Manokara.

Only text is imported: XML styling, scripts, links and external resources are never rendered.
AMLL timestamps are absolute media times (including nested spans), not sequential subtitles.
"""
import math
import re
import xml.etree.ElementTree as ET

MAX_XML_BYTES = 500000
MAX_TIME = 59999.999
XML_SPACE = "{http://www.w3.org/XML/1998/namespace}space"
ROLE = "{http://www.w3.org/ns/ttml#metadata}role"


class TtmlError(ValueError):
    pass


def local(node):
    return node.tag.rsplit("}", 1)[-1]


def time_value(value):
    if value is None:
        return None
    value = value.strip()
    clock = re.fullmatch(r"(?:(\d{1,2}):)?(\d{1,3}):(\d{2}(?:\.\d{1,6})?)", value)
    if clock:
        hours, minutes, seconds = clock.groups()
        result = int(hours or 0) * 3600 + int(minutes) * 60 + float(seconds)
        if float(seconds) >= 60 or hours and int(minutes) >= 60:
            raise TtmlError("Invalid TTML timestamp.")
    else:
        offset = re.fullmatch(r"(\d+(?:\.\d{1,6})?)(ms|s|m|h)?", value)
        if not offset:
            raise TtmlError("Unsupported TTML timing. Use clock time or seconds, not frames or ticks.")
        result = float(offset[1]) * {None: 1, "ms": .001, "s": 1, "m": 60, "h": 3600}[offset[2]]
    if not math.isfinite(result) or not 0 <= result <= MAX_TIME:
        raise TtmlError("Invalid TTML timestamp.")
    return round(result, 3)


def stamp(value):
    milliseconds = round(value * 1000)
    return f"{milliseconds // 60000:02d}:{milliseconds % 60000 / 1000:06.3f}"


def metadata(root):
    result = {}
    for node in root.iter():
        if local(node) != "meta":
            continue
        key = node.get("key", "")
        values = [child.get("value") or "".join(child.itertext()) for child in node if local(child) == "value"]
        if not values:
            values = [node.get("value") or "".join(node.itertext())]
        result.setdefault(key, []).extend(value.strip()[:512] for value in values if value.strip())
    return result


def convert_ttml(source):
    if not isinstance(source, str):
        raise TtmlError("Send a TTML document.")
    try:
        size = len(source.encode("utf-8"))
    except UnicodeError:
        raise TtmlError("Invalid characters in TTML document.") from None
    if size > MAX_XML_BYTES:
        raise TtmlError("TTML file is too large (maximum 500 KB).")
    if re.search(r"<!\s*(?:DOCTYPE|ENTITY)", source, re.I):
        raise TtmlError("TTML with DTD or entity declarations is not supported.")
    try:
        root = ET.fromstring(source.lstrip("\ufeff"))
    except (ET.ParseError, ValueError):
        raise TtmlError("Could not read this TTML file. Check its XML format.") from None
    nodes = list(root.iter())
    if local(root) != "tt" or len(nodes) > 30000:
        raise TtmlError("Invalid or oversized TTML document.")
    space = {}
    stack = [(root, 0, False)]
    while stack:
        node, depth, preserve = stack.pop()
        if depth > 48:
            raise TtmlError("TTML nesting is too deep.")
        preserve = node.get(XML_SPACE, "preserve" if preserve else "default") == "preserve"
        space[node] = preserve
        stack.extend((child, depth + 1, preserve) for child in node)
    if any(node.get("timeContainer") == "seq" for node in nodes):
        raise TtmlError("Sequential TTML timing is not supported. Use absolute AMLL timestamps.")
    body = next((node for node in root if local(node) == "body"), None)
    if body is None:
        raise TtmlError("TTML has no lyric body.")
    warnings = set()
    info = metadata(root)
    entries = []

    def visible_text(value, preserve=False):
        if not value:
            return ""
        if not preserve:
            if not value.strip() and any(char in value for char in "\n\r\t"):
                return ""  # Formatting indentation between spans is not a sung space.
            value = re.sub(r"[ \t\r\n]+", " ", value)
        else:
            value = value.replace("\r", " ").replace("\n", " ").replace("\t", " ")
        if any(char in value for char in "[]<>"):
            warnings.add("reserved_characters")
            value = value.translate(str.maketrans("[]<>", "［］＜＞"))
        return value

    def visit(node, runs, begin=None, end=None, timed=False, preserve=False):
        role = node.get(ROLE) or node.get("role", "")
        if role == "x-bg":
            warnings.add("background")
            return
        if role in ("x-roman", "x-translation"):
            warnings.add("auxiliary")
            return
        preserve = node.get(XML_SPACE, "preserve" if preserve else "default") == "preserve"
        if local(node) != "p":
            start = time_value(node.get("begin"))
            stop = time_value(node.get("end"))
            length = time_value(node.get("dur"))
            if start is not None:
                begin = start
            if stop is not None:
                end = stop
            elif length is not None and begin is not None:
                end = round(begin + length, 3)
            timed = timed or start is not None or stop is not None or length is not None
        def append(value):
            value = visible_text(value, preserve)
            if value:
                runs.append({"text": value, "start": begin, "end": end, "timed": timed})
        append(node.text)
        for child in node:
            if local(child) == "br":
                append(" ")
            else:
                visit(child, runs, begin, end, timed, preserve)
            append(child.tail)

    for paragraph in body.iter():
        if local(paragraph) != "p":
            continue
        if len(entries) >= 4000:
            raise TtmlError("TTML contains too many lyric lines.")
        begin, end = time_value(paragraph.get("begin")), time_value(paragraph.get("end"))
        length = time_value(paragraph.get("dur"))
        if end is None and begin is not None and length is not None:
            end = round(begin + length, 3)
        runs = []
        visit(paragraph, runs, begin, end, preserve=space[paragraph])
        if not runs or not "".join(run["text"] for run in runs).strip():
            continue
        starts = [run["start"] for run in runs if run["timed"] and run["start"] is not None]
        stops = [run["end"] for run in runs if run["timed"] and run["end"] is not None]
        begin = begin if begin is not None else min(starts, default=None)
        end = end if end is not None else max(stops, default=None)
        if begin is None or end is None or end < begin or end > MAX_TIME:
            raise TtmlError("Each TTML lyric line needs valid start and end times.")
        words, inferred = [], False
        for run in runs:
            if not run["text"].strip() and words:
                words[-1]["text"] += run["text"]
                continue
            if not run["text"].strip():
                continue
            start, stop = run["start"], run["end"]
            if not run["timed"] or start is None or stop is None:
                inferred = True
                start, stop = begin, end
            if stop < start or start < begin - .001 or stop > end + .001:
                raise TtmlError("Word timestamps must stay within their TTML lyric line.")
            if words and words[-1]["start"] == start and words[-1]["end"] == stop:
                words[-1]["text"] += run["text"]
            else:
                words.append({"text": run["text"], "start": start, "end": stop})
        if not words:
            continue
        words[0]["text"], words[-1]["text"] = words[0]["text"].lstrip(), words[-1]["text"].rstrip()
        if any(words[index]["start"] < words[index - 1]["start"] for index in range(1, len(words))):
            raise TtmlError("TTML words must be ordered by their start time.")
        entries.append({"start": begin, "end": end, "words": words, "wordTimed": not inferred})

    if not entries:
        raise TtmlError("No timed main lyrics found in this TTML file.")
    entries.sort(key=lambda line: line["start"])
    for index, line in enumerate(entries[:-1]):
        if line["end"] > entries[index + 1]["start"]:
            warnings.add("overlap")
    title = next(iter(info.get("musicName", [])), "")
    artist = ", ".join(info.get("artists", [])[:8])
    author = ", ".join(info.get("ttmlAuthorGithubLogin", [])[:8])
    full_duration = time_value(body.get("dur")) or time_value(body.get("end"))
    def tag(key, value):
        return f"[{key}:{re.sub(r'[\[\]\r\n]', ' ', value)}]" if value else ""
    lines = list(filter(None, (tag("re", "Manokara TTML"), tag("ti", title), tag("ar", artist), tag("by", author),
                               tag("length", stamp(full_duration)) if full_duration else "")))
    for index, line in enumerate(entries):
        text = "".join(word["text"] for word in line["words"])
        output = f"[{stamp(line['start'])}][mk-end:{stamp(line['end'])}]"
        if line["wordTimed"]:
            output += "[mk-ends:" + ",".join(f"{word['end']:.3f}" for word in line["words"]) + "]"
            output += "".join(f"<{stamp(word['start'])}>{word['text']}" for word in line["words"])
        else:
            output += text
        lines.append(output)
        # A blank timed cue also clears renderers that only understand ordinary LRC.
        if index == len(entries) - 1 or entries[index + 1]["start"] > line["end"]:
            lines.append(f"[{stamp(line['end'])}]")
    result = "\n".join(lines)
    if len(result) > 200000 or len(result.encode("utf-8")) > 220000:
        raise TtmlError("Converted TTML exceeds the lyric size limit.")
    if any(node.get(ROLE) in ("x-roman", "x-translation") or local(node) in ("translations", "transliterations") for node in nodes):
        warnings.add("auxiliary")
    return {"trackName": title, "artistName": artist, "duration": full_duration,
            "syncedLyrics": result, "format": "ttml", "wordTimed": all(line["wordTimed"] for line in entries),
            "copyright": "TTML timing: " + author if author else "", "warnings": sorted(warnings)}
