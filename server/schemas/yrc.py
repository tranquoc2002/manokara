"""NetEase YRC -> the same bounded Enhanced LRC timeline used by TTML imports.

YRC word starts are absolute milliseconds. Durations are retained, never inferred.
Metadata links and JSON credit cards are not rendered or fetched.
"""
import json
import re

MAX_TIME_MS = 59999999
LINE = re.compile(r"\[(\d{1,9}),(\d{1,9})\](.*)")
WORD = re.compile(r"\((\d{1,9}),(\d{1,9}),(\d{1,6})\)")


class YrcError(ValueError):
    pass


def stamp(milliseconds):
    return f"{milliseconds // 60000:02d}:{milliseconds % 60000 // 1000:02d}.{milliseconds % 1000:03d}"


def convert_yrc(source, *, title="", artist="", author=""):
    if not isinstance(source, str) or not source.strip() or "\0" in source:
        raise YrcError("Invalid YRC document.")
    try:
        if len(source.encode("utf-8")) > 500000:
            raise YrcError("YRC document is too large.")
    except UnicodeError:
        raise YrcError("Invalid YRC characters.") from None
    entries, warnings, word_count = [], set(), 0
    for raw in source.lstrip("\ufeff").splitlines():
        line = raw.strip()
        if not line:
            continue
        if line.startswith("{"):
            try:
                card = json.loads(line)
            except (ValueError, RecursionError):
                raise YrcError("Invalid YRC metadata.") from None
            if not isinstance(card, dict) or not isinstance(card.get("c"), list):
                raise YrcError("Invalid YRC metadata.")
            continue
        match = LINE.fullmatch(line)
        if not match or len(entries) >= 4000:
            raise YrcError("Invalid or oversized YRC timeline.")
        start, length, body = int(match[1]), int(match[2]), match[3]
        end = start + length
        if end > MAX_TIME_MS:
            raise YrcError("Invalid YRC line time.")
        tags = list(WORD.finditer(body))
        if body.strip() and (not tags or body[:tags[0].start()].strip()):
            raise YrcError("YRC words require real word timestamps.")
        words = []
        for index, tag in enumerate(tags):
            begin, stop = int(tag[1]), int(tag[1]) + int(tag[2])
            value = body[tag.end():tags[index + 1].start() if index + 1 < len(tags) else None]
            if begin < start or stop > end or words and begin < words[-1]["start"]:
                raise YrcError("YRC word times must be ordered and within the line.")
            if not value:
                continue
            if any(char in value for char in "[]<>"):
                warnings.add("reserved_characters")
                value = value.translate(str.maketrans("[]<>", "［］＜＞"))
            words.append({"start": begin, "end": stop, "text": value})
        if words:
            words[0]["text"] = words[0]["text"].lstrip()
            words[-1]["text"] = words[-1]["text"].rstrip()
        word_count += len(words)
        if word_count > 20000:
            raise YrcError("YRC contains too many words.")
        entries.append({"start": start, "end": end, "words": words})
    if not word_count or not any(any(word["text"].strip() for word in row["words"]) for row in entries):
        raise YrcError("No word-timed lyrics found in YRC.")
    entries.sort(key=lambda row: row["start"])
    output = ["[re:Manokara YRC]"]
    for name, value in (("ti", title), ("ar", artist), ("by", author)):
        if value:
            value = re.sub(r"[\[\]\r\n]", " ", str(value)[:512])
            output.append(f"[{name}:{value}]")
    for index, row in enumerate(entries):
        if row["words"]:
            line = f"[{stamp(row['start'])}][mk-end:{stamp(row['end'])}]"
            line += "[mk-ends:" + ",".join(f"{word['end'] / 1000:.3f}" for word in row["words"]) + "]"
            line += "".join(f"<{stamp(word['start'])}>{word['text']}" for word in row["words"])
            output.append(line)
        else:
            output.append(f"[{stamp(row['start'])}]")
        if index + 1 == len(entries) or entries[index + 1]["start"] > row["end"]:
            output.append(f"[{stamp(row['end'])}]")
        elif entries[index + 1]["start"] < row["end"]:
            warnings.add("overlap")
    result = "\n".join(output)
    if len(result) > 200000 or len(result.encode("utf-8")) > 220000:
        raise YrcError("Converted YRC exceeds the lyric size limit.")
    return {"syncedLyrics": result, "format": "yrc", "wordTimed": True,
            "copyright": "Lyric timing: " + str(author)[:512] if author else "", "warnings": sorted(warnings)}
