"""Read plaintext QQ QRC/XML with original word starts and durations.

XML is data only. No DTD, entities, links, styles or external resources are loaded.
Literal newlines in LyricContent must survive XML attribute normalization.
"""
import re
import xml.etree.ElementTree as ET

from .yrc import MAX_TIME_MS, stamp
from .lyrics import has_timecodes, lyric_text

LINE = re.compile(r"\[(\d{1,9}),(\d{1,9})\](.*)")
WORD = re.compile(r"\((\d{1,9}),(\d{1,9})\)")
META = re.compile(r"\[([A-Za-z]{1,20}):([^\r\n]*)\]")
ATTRIBUTE = re.compile(r"(\bLyricContent\s*=\s*)([\"'])(.*?)\2", re.S)
CREDIT = re.compile(r"^(?:作词|作曲|编曲|制作人|词|曲|Lyrics\s+by|Composed\s+by|Arranged\s+by|Producer)\s*[:：]", re.I)


class QrcError(ValueError):
    pass


def lyric_body(source):
    if not isinstance(source, str) or not source.strip() or "\0" in source:
        raise QrcError("Invalid QRC document.")
    try:
        if len(source.encode("utf-8")) > 500000:
            raise QrcError("QRC document is too large.")
    except UnicodeError:
        raise QrcError("Invalid QRC characters.") from None
    source = source.lstrip("\ufeff").strip()
    if not source.startswith("<"):
        return source
    if re.search(r"<!\s*(?:DOCTYPE|ENTITY)", source, re.I):
        raise QrcError("QRC with DTD or entities is not supported.")
    def preserve(match):
        value = match[3].replace("\r\n", "\n").replace("\r", "&#13;").replace("\n", "&#10;").replace("\t", "&#9;")
        return match[1] + match[2] + value + match[2]
    try:
        root = ET.fromstring(ATTRIBUTE.sub(preserve, source))
    except (ET.ParseError, ValueError):
        raise QrcError("Could not read QRC XML.") from None
    if root.tag.rsplit("}", 1)[-1] != "QrcInfos":
        raise QrcError("Invalid QRC XML root.")
    stack, count = [(root, 0)], 0
    body = None
    while stack:
        node, depth = stack.pop()
        count += 1
        if depth > 48 or count > 10000:
            raise QrcError("Invalid or oversized QRC XML.")
        if node.tag.rsplit("}", 1)[-1] == "Lyric_1":
            if body is not None:
                raise QrcError("Ambiguous QRC lyric body.")
            body = node.get("LyricContent")
        stack.extend((child, depth + 1) for child in node)
    if not body:
        raise QrcError("QRC has no main lyric body.")
    return body


def convert_qrc(source):
    body = lyric_body(source)
    # QQ can return ordinary/Enhanced LRC when a recording has no QRC.
    if has_timecodes(body) and not any(LINE.fullmatch(line.strip()) for line in body.splitlines()):
        value = lyric_text(body)
        if not value:
            raise QrcError("QQ lyrics exceed the lyric size limit.")
        tags = {match[1].lower(): match[2].strip()[:512] for line in body.splitlines() if (match := META.fullmatch(line.strip()))}
        return {"trackName": tags.get("ti", ""), "artistName": tags.get("ar", ""),
                "syncedLyrics": value, "format": "lrc",
                "wordTimed": bool(re.search(r"<\d{1,3}:\d{2}(?:\.\d+)?>[^<\r\n]+", value)),
                "copyright": tags.get("by", ""), "warnings": []}
    metadata, entries, warnings, credits, word_count = {}, [], set(), [], 0
    for raw in body.splitlines():
        line = raw.strip()
        if not line:
            continue
        tag = META.fullmatch(line)
        if tag:
            metadata[tag[1].lower()] = tag[2].strip()[:512]
            continue
        match = LINE.fullmatch(line)
        if not match or len(entries) >= 4000:
            raise QrcError("Invalid or oversized QRC timeline.")
        start, length, text = int(match[1]), int(match[2]), match[3]
        tags, words, cursor = list(WORD.finditer(text)), [], 0
        for tag in tags:
            begin, end = int(tag[1]), int(tag[1]) + int(tag[2])
            value, cursor = text[cursor:tag.start()], tag.end()
            if begin < start or end > MAX_TIME_MS or words and begin < words[-1]["start"]:
                raise QrcError("Invalid QRC word time.")
            if value:
                words.append({"start": begin, "end": end, "text": value})
        if words:
            words[-1]["text"] += text[cursor:]
            words[0]["text"] = words[0]["text"].lstrip()
            words[-1]["text"] = words[-1]["text"].rstrip()
            text = "".join(word["text"] for word in words)
        elif tags:
            text = text[cursor:]
            if text.strip():
                raise QrcError("QRC has untimed trailing text.")
        if CREDIT.match(text.strip()):
            if len(credits) < 8:
                credits.append(text.strip()[:200])
            continue
        end = start + length if length else max((word["end"] for word in words), default=None)
        if start > MAX_TIME_MS or end is not None and (end > MAX_TIME_MS or any(word["end"] > end for word in words)):
            raise QrcError("QRC word times must stay within the line.")
        for word in words:
            if any(char in word["text"] for char in "[]<>"):
                warnings.add("reserved_characters")
                word["text"] = word["text"].translate(str.maketrans("[]<>", "［］＜＞"))
        if not words and any(char in text for char in "[]<>"):
            warnings.add("reserved_characters")
            text = text.translate(str.maketrans("[]<>", "［］＜＞"))
        word_count += len(words)
        if word_count > 20000:
            raise QrcError("QRC contains too many words.")
        entries.append({"start": start, "end": end, "text": text.strip(), "words": words})
    if not any(row["text"] for row in entries):
        raise QrcError("QRC has no timed lyrics.")
    entries.sort(key=lambda row: row["start"])
    output = ["[re:Manokara QRC]"]
    for key in ("ti", "ar", "al", "by"):
        if metadata.get(key):
            value = re.sub(r"[\[\]\r\n]", " ", metadata[key])
            output.append(f"[{key}:{value}]")
    if metadata.get("offset"):
        if not re.fullmatch(r"[+-]?\d{1,8}", metadata["offset"]) or abs(int(metadata["offset"])) > MAX_TIME_MS:
            raise QrcError("Invalid QRC offset.")
        output.append(f"[offset:{int(metadata['offset'])}]")
    for index, row in enumerate(entries):
        line = f"[{stamp(row['start'])}]"
        if row["end"] is not None:
            line += f"[mk-end:{stamp(row['end'])}]"
        if row["words"]:
            line += "[mk-ends:" + ",".join(f"{word['end'] / 1000:.3f}" for word in row["words"]) + "]"
            line += "".join(f"<{stamp(word['start'])}>{word['text']}" for word in row["words"])
        else:
            line += row["text"]
        output.append(line)
        if row["end"] is not None:
            next_start = entries[index + 1]["start"] if index + 1 < len(entries) else None
            if next_start is None or next_start > row["end"]:
                output.append(f"[{stamp(row['end'])}]")
            elif next_start < row["end"]:
                warnings.add("overlap")
    result = "\n".join(output)
    if len(result) > 200000 or len(result.encode("utf-8")) > 220000:
        raise QrcError("Converted QRC exceeds the lyric size limit.")
    credit = " · ".join(filter(None, (metadata.get("by", ""), *credits)))
    return {"trackName": metadata.get("ti", ""), "artistName": metadata.get("ar", ""),
            "syncedLyrics": result, "format": "qrc", "wordTimed": all(row["words"] for row in entries if row["text"]),
            "copyright": credit[:2000], "warnings": sorted(warnings)}
