"""Zing sentence/word JSON -> Enhanced LRC, retaining absolute millisecond clocks."""
import re

from .yrc import MAX_TIME_MS, stamp


class ZingLyricError(ValueError):
    pass


def convert_zing(sentences, *, title="", artist=""):
    if not isinstance(sentences, list) or not sentences or len(sentences) > 4000:
        raise ZingLyricError("Invalid or oversized Zing lyric timeline.")
    entries, warnings, word_count, text_bytes = [], set(), 0, 0
    for sentence in sentences:
        if not isinstance(sentence, dict) or not isinstance(sentence.get("words"), list):
            raise ZingLyricError("Invalid Zing lyric sentence.")
        words = []
        word_count += len(sentence["words"])
        if word_count > 20000:
            raise ZingLyricError("Zing lyrics contain too many words.")
        for word in sentence["words"]:
            if not isinstance(word, dict) or not isinstance(word.get("data"), str):
                raise ZingLyricError("Invalid Zing lyric word.")
            value = word["data"].strip()
            if any(char in value for char in "\0\r\n"):
                raise ZingLyricError("Invalid Zing lyric characters.")
            if not value:
                continue
            try:
                text_bytes += len(value.encode("utf-8"))
            except UnicodeError:
                raise ZingLyricError("Invalid Zing lyric characters.") from None
            if text_bytes > 220000:
                raise ZingLyricError("Zing lyrics exceed the lyric size limit.")
            begin, end = word.get("startTime"), word.get("endTime")
            # Zero-duration tokens occur in real Zing lyrics. Preserve them rather
            # than stretching or guessing a duration from the following word.
            if (type(begin) is not int or type(end) is not int or
                    not 0 <= begin <= end <= MAX_TIME_MS or words and begin < words[-1]["start"]):
                raise ZingLyricError("Invalid or unordered Zing word times.")
            if any(char in value for char in "[]<>"):
                warnings.add("reserved_characters")
                value = value.translate(str.maketrans("[]<>", "［］＜＞"))
            words.append({"start": begin, "end": end, "text": value})
        if words:
            entries.append({"start": words[0]["start"], "end": max(word["end"] for word in words), "words": words})
    if not entries:
        raise ZingLyricError("No word-timed lyrics found in Zing response.")
    entries.sort(key=lambda row: row["start"])
    output = ["[re:Manokara Zing MP3]"]
    for name, value in (("ti", title), ("ar", artist)):
        if value:
            output.append(f"[{name}:" + re.sub(r"[\[\]\r\n]", " ", str(value)[:512]) + "]")
    for index, row in enumerate(entries):
        line = f"[{stamp(row['start'])}][mk-end:{stamp(row['end'])}]"
        line += "[mk-ends:" + ",".join(f"{word['end'] / 1000:.3f}" for word in row["words"]) + "]"
        # Zing supplies unspaced tokens. Its web client separates these words with
        # spaces; attach each separator to the preceding word's original timing.
        line += " ".join(f"<{stamp(word['start'])}>{word['text']}" for word in row["words"])
        output.append(line)
        next_start = entries[index + 1]["start"] if index + 1 < len(entries) else None
        if next_start is None or next_start > row["end"]:
            output.append(f"[{stamp(row['end'])}]")
        elif next_start < row["end"]:
            warnings.add("overlap")
    result = "\n".join(output)
    if len(result) > 200000 or len(result.encode("utf-8")) > 220000:
        raise ZingLyricError("Converted Zing lyrics exceed the lyric size limit.")
    return {"syncedLyrics": result, "format": "lrc", "wordTimed": True, "warnings": sorted(warnings)}
