"""Bounded concurrent LRC search, independent source failures and short in-memory caches."""
import asyncio
from collections import OrderedDict
from dataclasses import dataclass, field
import json
import os
import time
from urllib.parse import urlsplit

import httpx
from starlette.exceptions import HTTPException

from ..schemas.lyrics import PROVIDER_LABELS, has_timecodes, normalize_result, rank_results
from .lyric_providers import ADAPTERS, ProviderError, ZING_API_PATHS, ZING_LYRIC_HOST, zing_lyric_file, zing_params
from .amll import AmllProvider

MAX_CACHE_BYTES = 8 * 1024 * 1024
MAX_RESULT_BYTES = 1000000
USER_AGENT = "Manokara/1.0 (+https://github.com/tranquoc2002/manokara)"
HOSTS = {"lrclib": "lrclib.net", "netease": "music.163.com",
         "qq": "api.betterlyrics.org", "zing": "zingmp3.vn", "amll": "raw.githubusercontent.com", "musixmatch": "api.musixmatch.com"}


@dataclass(frozen=True)
class LyricsSettings:
    providers: tuple = tuple(PROVIDER_LABELS)
    musixmatch_key: str = field(default="", repr=False)
    betterlyrics_key: str = field(default="", repr=False)

    @classmethod
    def from_env(cls):
        providers = tuple(dict.fromkeys(value.strip().lower() for value in
                                        os.environ.get("MANOKARA_LYRIC_PROVIDERS", ",".join(PROVIDER_LABELS)).split(",") if value.strip()))
        # Old private start scripts may still list the retired provider; ignore it on upgrade.
        providers = tuple(value for value in providers if value != "megalobiz")
        if any(value not in PROVIDER_LABELS for value in providers):
            raise ValueError("MANOKARA_LYRIC_PROVIDERS accepts lrclib,netease,qq,zing,amll,musixmatch.")
        key = os.environ.get("MANOKARA_MUSIXMATCH_API_KEY", "").strip()
        qq_key = os.environ.get("MANOKARA_BETTER_LYRICS_API_KEY", "").strip()
        for secret in (key, qq_key):
            if len(secret) > 512 or any(ord(char) < 33 or ord(char) > 126 for char in secret):
                raise ValueError("Lyric provider API keys must be printable ASCII without spaces.")
        return cls(providers, key, qq_key)


class LyricsService:
    def __init__(self, settings=None):
        self.settings = settings or LyricsSettings.from_env()
        self.client = None
        self.cache = OrderedDict()
        self.cache_bytes = 0
        self.jobs = {}
        self.cooldown = {}
        self.budgets = {}
        self.closed = False
        self.amll = AmllProvider()

    def providers(self):
        return [{"id": provider, "label": label,
                 "enabled": provider in self.settings.providers and (provider != "musixmatch" or bool(self.settings.musixmatch_key)),
                 "reason": "disabled" if provider not in self.settings.providers else
                           "needs_key" if provider == "musixmatch" and not self.settings.musixmatch_key else
                           "cache_only" if provider == "qq" and not self.settings.betterlyrics_key else ""}
                for provider, label in PROVIDER_LABELS.items()]

    def cached(self, key):
        value = self.cache.pop(key, None)
        if not value:
            return None
        if value[0] <= time.monotonic():
            self.cache_bytes -= len(value[1])
            return None
        self.cache[key] = value
        return json.loads(value[1])

    def remember(self, key, value, ttl):
        encoded = json.dumps(value, ensure_ascii=False, separators=(",", ":")).encode()
        if len(encoded) > MAX_RESULT_BYTES:
            return
        old = self.cache.pop(key, None)
        self.cache_bytes -= len(old[1]) if old else 0
        self.cache[key] = (time.monotonic() + ttl, encoded)
        self.cache_bytes += len(encoded)
        while len(self.cache) > 96 or self.cache_bytes > MAX_CACHE_BYTES:
            _, (_, data) = self.cache.popitem(last=False)
            self.cache_bytes -= len(data)

    def reserve(self, provider):
        now = time.monotonic()
        until, status = self.cooldown.get(provider, (0, "limited"))
        if until > now:
            # A local cooldown check must not extend the original upstream block.
            raise ProviderError(status, retry_at=until)
        rate, burst = 4, 12
        tokens, updated = self.budgets.get(provider, (float(burst), now))
        tokens = min(burst, tokens + (now - updated) * rate)
        self.budgets[provider] = (tokens - 1 if tokens >= 1 else tokens, now)
        if tokens < 1:
            raise ProviderError("limited")

    async def get(self, provider, url, params, *, method="GET", cache=False, cache_ttl=300, as_text=False, max_bytes=3 * 1024 * 1024):
        # All adapters have fixed, allowlisted targets. Upstream source links are display-only.
        parsed = urlsplit(url)
        hosts = {HOSTS[provider], ZING_LYRIC_HOST} if provider == "zing" else {HOSTS[provider]}
        if parsed.scheme != "https" or parsed.netloc not in hosts:
            raise ProviderError("invalid")
        if provider == "amll" and not parsed.path.startswith("/amll-dev/amll-ttml-db/main/"):
            raise ProviderError("invalid")
        if provider == "qq" and parsed.path != "/qq/getLyrics":
            raise ProviderError("invalid")
        if provider == "zing":
            if parsed.query or parsed.fragment:
                raise ProviderError("invalid")
            if parsed.netloc == ZING_LYRIC_HOST:
                if not as_text or params or not zing_lyric_file(url):
                    raise ProviderError("invalid")
            elif not (parsed.path == "/" and as_text and not params or parsed.path in ZING_API_PATHS and not as_text):
                raise ProviderError("invalid")
        if method not in ("GET", "POST") or method == "POST" and (provider != "netease" or parsed.path != "/api/search/get"):
            raise ProviderError("invalid")
        key = ("detail", provider, method, url, tuple(sorted(params.items())))
        previous = self.cached(key) if cache else None
        if previous is not None:
            return previous
        self.reserve(provider)
        headers = {"Accept": "text/plain"} if as_text else {}
        params = dict(params)
        if provider == "netease":
            headers["Referer"] = "https://music.163.com/"
            # A shared upstream visitor cookie (NMTID) can cause later anonymous
            # searches to return unrelated songs. Keep requests stateless even
            # when HTTPX's connection pool has retained upstream Set-Cookie data.
            headers["Cookie"] = ""
        elif provider == "musixmatch":
            params["apikey"] = self.settings.musixmatch_key
        elif provider == "qq":
            headers["Cookie"] = ""
            if self.settings.betterlyrics_key:
                headers["X-API-Key"] = self.settings.betterlyrics_key
        elif provider == "zing":
            headers["Referer"] = "https://zingmp3.vn/"
            if parsed.path in ZING_API_PATHS:
                # Generate fresh signatures only for outbound requests. Volatile
                # ctime/sig must not defeat the shared detail/search cache.
                params = zing_params(parsed.path, params)
            elif parsed.netloc == ZING_LYRIC_HOST:
                headers["Cookie"] = ""
        if self.closed:
            raise ProviderError()
        if self.client is None:
            self.client = httpx.AsyncClient(timeout=httpx.Timeout(4, connect=3, pool=2), follow_redirects=False,
                                            limits=httpx.Limits(max_connections=12, max_keepalive_connections=6),
                                            headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
        async with asyncio.timeout(5):
            request = {"params": params} if method == "GET" else {"data": params}
            async with self.client.stream(method, url, headers=headers, **request) as response:
                if response.status_code == 429:
                    try:
                        retry = max(15, min(86400, float(response.headers.get("Retry-After", "60"))))
                    except ValueError:
                        retry = 60
                    self.cooldown[provider] = (time.monotonic() + retry, "limited")
                    raise ProviderError("limited")
                if response.status_code in (401, 403):
                    if provider == "qq" and response.status_code == 401 and not self.settings.betterlyrics_key:
                        # A cache miss needs a key, but other cached QQ queries can
                        # still work. Do not put the whole provider into cooldown.
                        raise ProviderError("needs_key")
                    raise ProviderError("credentials" if provider in ("musixmatch", "qq") else "restricted")
                if provider == "qq" and response.status_code == 404:
                    raise ProviderError("empty")
                if response.status_code != 200:
                    raise ProviderError()
                content = bytearray()
                async for chunk in response.aiter_bytes():
                    content.extend(chunk)
                    if len(content) > max_bytes:
                        raise ProviderError("invalid")
        try:
            value = content.decode("utf-8-sig") if as_text else json.loads(content)
        except (ValueError, RecursionError):
            raise ProviderError("invalid") from None
        cacheable = True
        if provider == "qq":
            cacheable = isinstance(value, dict) and value.get("provider") == "qq" and isinstance(value.get("lyrics"), str) and bool(value["lyrics"].strip())
        if provider == "zing":
            if parsed.netloc == ZING_LYRIC_HOST:
                if not isinstance(value, str) or not has_timecodes(value):
                    raise ProviderError("invalid")
            elif parsed.path in ZING_API_PATHS:
                # Business errors can arrive with HTTP 200. Retain only actual
                # catalog/lyric data, so a temporary denial cannot poison cache.
                data = value.get("data") if isinstance(value, dict) and type(value.get("err")) is int and value["err"] == 0 else None
                cacheable = isinstance(data, dict) and bool(data.get("songs") if parsed.path == "/api/v2/search/multi" else
                                                          data.get("sentences") or data.get("file") or data.get("lyric"))
        if provider == "netease":
            # NetEase can return verification/errors inside an HTTP 200 response.
            # Never retain those responses as lyric or search details.
            cacheable = isinstance(value, dict) and value.get("code") == 200
            if cacheable and parsed.path == "/api/search/get":
                result = value.get("result")
                cacheable = isinstance(result, dict) and isinstance(result.get("songs"), list) and bool(result["songs"])
            elif cacheable and parsed.path in ("/api/song/lyric", "/api/song/lyric/v1"):
                cacheable = any(isinstance(value.get(key), dict) and isinstance(value[key].get("lyric"), str)
                                and bool(value[key]["lyric"].strip()) for key in ("lrc", "yrc"))
        if cache and cacheable:
            self.remember(key, value, cache_ttl)
        return value

    async def run_provider(self, provider, query, track_duration):
        try:
            async with asyncio.timeout(10):
                async def get(url, params, **options):
                    return await self.get(provider, url, params, **options)
                search = self.amll.search if provider == "amll" else ADAPTERS[provider]
                values, partial = await search(get, query, track_duration)
                rows = [row for value in values if (row := normalize_result(provider, value))]
                status = "partial" if partial else "ok" if rows else "empty"
        except ProviderError as error:
            if error.status in ("restricted", "credentials") and error.retry_at is None:
                # Distinct queries must not repeatedly hammer a provider asking for verification.
                self.cooldown[provider] = (time.monotonic() + 60, error.status)
            rows, status = [], error.status
        except (TimeoutError, httpx.TimeoutException):
            rows, status = [], "timeout"
        except (httpx.HTTPError, ValueError, TypeError, KeyError, AttributeError, OverflowError, RecursionError):
            rows, status = [], "unavailable"
        if provider == "netease":
            recent_key = ("recent-provider", provider, query.casefold(), track_duration)
            if status in ("ok", "empty"):
                # A successful empty response also invalidates a previous positive match.
                self.remember(recent_key, rows, 300)
            else:
                recent = self.cached(recent_key)
                if recent:
                    rows, status = rank_results([*rows, *recent], query, track_duration), "stale"
        return rows, status

    async def collect(self, query, provider, track_duration):
        enabled = [row["id"] for row in self.providers() if row["enabled"] and provider in ("auto", row["id"])]
        values = await asyncio.gather(*(self.run_provider(name, query, track_duration) for name in enabled))
        rows = rank_results([row for result, _ in values for row in result], query, track_duration)
        # Bound the response after sorting, so plain lyrics cannot crowd timed lyrics out.
        selected, size = [], 0
        for row in rows:
            cost = len(json.dumps(row, ensure_ascii=False).encode())
            if size + cost > 900000:
                continue
            selected.append(row)
            size += cost
            if len(selected) == 24:
                break
        return {"results": selected, "providers": self.providers(),
                "statuses": {name: status for name, (_, status) in zip(enabled, values)}}

    async def search(self, query, provider="auto", track_duration=None):
        if self.closed:
            raise HTTPException(503, "Lyric search is temporarily unavailable.")
        catalog = self.providers()
        if provider != "auto" and not any(row["id"] == provider and row["enabled"] for row in catalog):
            raise HTTPException(400, "This lyric provider is not enabled on the server.")
        key = ("search", query.casefold(), provider, track_duration)
        result = self.cached(key)
        if result is not None:
            return result
        task = self.jobs.get(key)
        if task is None:
            if len(self.jobs) >= 6:
                raise HTTPException(503, "Lyric search is busy. Try again in a moment.")
            async def work():
                try:
                    result = await self.collect(query, provider, track_duration)
                    successful = all(status in ("ok", "empty") for status in result["statuses"].values())
                    # Licensed Musixmatch content is kept only for this short search window.
                    ttl = 30 if "musixmatch" in result["statuses"] else 120 if successful else 15
                    self.remember(key, result, ttl)
                    return result
                finally:
                    self.jobs.pop(key, None)
            task = self.jobs[key] = asyncio.create_task(work())
        # Share identical searches across callers. Cancellation cannot kill another user's request.
        return await asyncio.shield(task)

    async def close(self):
        if self.closed:
            return
        self.closed = True
        tasks = list(self.jobs.values())
        for task in tasks:
            task.cancel()
        await asyncio.gather(*tasks, return_exceptions=True)
        await self.amll.close()
        if self.client is not None:
            await self.client.aclose()
        self.cache.clear()
        self.cache_bytes = 0
