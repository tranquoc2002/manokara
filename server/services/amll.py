"""On-demand AMLL metadata index and public TTML files; no catalog cloning."""
import asyncio
import json
import re
import time
import httpx

from ..schemas.lyrics import fold, match_score, text
from ..schemas.ttml import convert_ttml, TtmlError
from .lyric_providers import expand, ProviderError

BASE = "https://raw.githubusercontent.com/amll-dev/amll-ttml-db/main/"
INDEX = BASE + "metadata/raw-lyrics-index.jsonl"
FILENAME = re.compile(r"[A-Za-z0-9][A-Za-z0-9_.-]{0,160}\.ttml")


class AmllProvider:
    def __init__(self):
        self.index = []
        self.expires = 0
        self.retry_after = 0
        self.loading = None
        self.closed = False

    @staticmethod
    def parse_index(source):
        rows = []
        for number, line in enumerate(source.splitlines()):
            if number >= 20000:
                raise ProviderError("invalid")
            if not line.strip():
                continue
            try:
                record = json.loads(line)
            except ValueError:
                raise ProviderError("invalid") from None
            if not isinstance(record, dict):
                continue
            filename = record.get("rawLyricFile")
            if not isinstance(filename, str) or not FILENAME.fullmatch(filename) or ".." in filename:
                continue
            values = {}
            metadata = record.get("metadata")
            if not isinstance(metadata, list):
                continue
            for pair in metadata[:40]:
                if not isinstance(pair, list) or len(pair) != 2 or not isinstance(pair[0], str) or not isinstance(pair[1], list):
                    continue
                values.setdefault(pair[0], []).extend(text(value) for value in pair[1][:8] if text(value))
            titles = values.get("musicName", [])
            if not titles:
                continue
            title, artist = titles[0], ", ".join(values.get("artists", []))[:512]
            ids = [value for key in ("ncmMusicId", "qqMusicId", "appleMusicId", "spotifyId") for value in values.get(key, [])]
            rows.append({"trackName": title, "artistName": artist, "file": filename,
                         "lookup": fold(" ".join(titles) + " " + artist), "ids": ids})
        if not rows:
            raise ProviderError("invalid")
        return rows

    async def ensure_index(self, get):
        now = time.monotonic()
        if self.index and now < self.expires:
            return False
        if now < self.retry_after:
            if self.index:
                return True
            raise ProviderError("unavailable")
        if self.loading is None:
            async def load():
                try:
                    source = await get(INDEX, {}, as_text=True, max_bytes=8 * 1024 * 1024)
                    rows = await asyncio.to_thread(self.parse_index, source)
                    if not self.closed:
                        self.index, self.expires = rows, time.monotonic() + 3600
                except BaseException:
                    self.retry_after = time.monotonic() + 60
                    raise
                finally:
                    self.loading = None
            self.loading = asyncio.create_task(load())
            # The last caller may disconnect while the shared download finishes.
            self.loading.add_done_callback(lambda task: None if task.cancelled() else task.exception())
        try:
            await asyncio.shield(self.loading)
            return False
        except (ProviderError, TimeoutError, httpx.HTTPError, ValueError, OSError):
            if self.index:
                return True
            raise

    def candidates(self, query):
        key = fold(query)
        if not key:
            return []
        tokens = key.split()
        pool = []
        for row in self.index:
            lookup = row["lookup"]
            exact_id = query in row["ids"]
            overlap = sum(token in lookup for token in tokens)
            if exact_id or key in lookup or overlap:
                pool.append((exact_id, key in lookup, overlap, row))
        pool.sort(key=lambda value: value[:3], reverse=True)
        short = pool[:400]
        short.sort(key=lambda value: (value[0], match_score(value[3], query)), reverse=True)
        return [row for _, _, _, row in short[:4]]

    async def search(self, get, query, track_duration):
        stale = await self.ensure_index(get)
        rows = await asyncio.to_thread(self.candidates, query)
        async def lyric(row):
            source = await get(BASE + "raw-lyrics/" + row["file"], {}, as_text=True, cache=True, max_bytes=500000)
            try:
                result = await asyncio.to_thread(convert_ttml, source)
            except TtmlError:
                raise ProviderError("invalid") from None
            result["trackName"] = result["trackName"] or row["trackName"]
            result["artistName"] = result["artistName"] or row["artistName"]
            result["sourceUrl"] = "https://github.com/amll-dev/amll-ttml-db/blob/main/raw-lyrics/" + row["file"]
            return result
        results, partial = await expand(rows, lyric)
        return results, partial or stale

    async def close(self):
        self.closed = True
        if self.loading is not None:
            self.loading.cancel()
            await asyncio.gather(self.loading, return_exceptions=True)
        self.index = []
