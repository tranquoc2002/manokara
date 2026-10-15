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

from ..schemas.lyrics import PROVIDER_LABELS, normalize_result, rank_results
from .lyric_providers import ADAPTERS, ProviderError

MAX_CACHE_BYTES = 8 * 1024 * 1024
MAX_RESULT_BYTES = 1000000
USER_AGENT = "Manokara/1.0 (+https://github.com/tranquoc2002/manokara)"
HOSTS = {"lrclib": "lrclib.net", "netease": "music.163.com",
         "musixmatch": "api.musixmatch.com"}


@dataclass(frozen=True)
class LyricsSettings:
    providers: tuple = tuple(PROVIDER_LABELS)
    musixmatch_key: str = field(default="", repr=False)

    @classmethod
    def from_env(cls):
        providers = tuple(dict.fromkeys(value.strip().lower() for value in
                                        os.environ.get("MANOKARA_LYRIC_PROVIDERS", ",".join(PROVIDER_LABELS)).split(",") if value.strip()))
        # Old private start scripts may still list the retired provider; ignore it on upgrade.
        providers = tuple(value for value in providers if value != "megalobiz")
        if any(value not in PROVIDER_LABELS for value in providers):
            raise ValueError("MANOKARA_LYRIC_PROVIDERS accepts lrclib,netease,musixmatch.")
        key = os.environ.get("MANOKARA_MUSIXMATCH_API_KEY", "").strip()
        if len(key) > 512 or any(ord(char) < 33 or ord(char) > 126 for char in key):
            raise ValueError("Lyric provider API keys must be printable ASCII without spaces.")
        return cls(providers, key)


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

    def providers(self):
        return [{"id": provider, "label": label,
                 "enabled": provider in self.settings.providers and (provider != "musixmatch" or bool(self.settings.musixmatch_key)),
                 "reason": "disabled" if provider not in self.settings.providers else
                           "needs_key" if provider == "musixmatch" and not self.settings.musixmatch_key else ""}
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
            raise ProviderError(status)
        rate, burst = 4, 12
        tokens, updated = self.budgets.get(provider, (float(burst), now))
        tokens = min(burst, tokens + (now - updated) * rate)
        self.budgets[provider] = (tokens - 1 if tokens >= 1 else tokens, now)
        if tokens < 1:
            raise ProviderError("limited")

    async def get(self, provider, url, params, *, cache=False):
        # All adapters have fixed, allowlisted targets. Upstream source links are display-only.
        parsed = urlsplit(url)
        if parsed.scheme != "https" or parsed.netloc != HOSTS[provider]:
            raise ProviderError("invalid")
        key = ("detail", provider, url, tuple(sorted(params.items())))
        previous = self.cached(key) if cache else None
        if previous is not None:
            return previous
        self.reserve(provider)
        headers = {}
        params = dict(params)
        if provider == "netease":
            headers["Referer"] = "https://music.163.com/"
        elif provider == "musixmatch":
            params["apikey"] = self.settings.musixmatch_key
        if self.closed:
            raise ProviderError()
        if self.client is None:
            self.client = httpx.AsyncClient(timeout=httpx.Timeout(4, connect=3, pool=2), follow_redirects=False,
                                            limits=httpx.Limits(max_connections=12, max_keepalive_connections=6),
                                            headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
        async with asyncio.timeout(5):
            async with self.client.stream("GET", url, params=params, headers=headers) as response:
                if response.status_code == 429:
                    try:
                        retry = max(15, min(86400, float(response.headers.get("Retry-After", "60"))))
                    except ValueError:
                        retry = 60
                    self.cooldown[provider] = (time.monotonic() + retry, "limited")
                    raise ProviderError("limited")
                if response.status_code in (401, 403):
                    raise ProviderError("credentials" if provider == "musixmatch" else "restricted")
                if response.status_code != 200:
                    raise ProviderError()
                content = bytearray()
                async for chunk in response.aiter_bytes():
                    content.extend(chunk)
                    if len(content) > 3 * 1024 * 1024:
                        raise ProviderError("invalid")
        try:
            value = json.loads(content)
        except (ValueError, RecursionError):
            raise ProviderError("invalid") from None
        if cache:
            self.remember(key, value, 300)
        return value

    async def run_provider(self, provider, query, track_duration):
        try:
            async with asyncio.timeout(10):
                async def get(url, params, **options):
                    return await self.get(provider, url, params, **options)
                values, partial = await ADAPTERS[provider](get, query, track_duration)
                rows = [row for value in values if (row := normalize_result(provider, value))]
                return rows, "partial" if partial else "ok" if rows else "empty"
        except ProviderError as error:
            if error.status in ("restricted", "credentials"):
                # Distinct queries must not repeatedly hammer a provider asking for verification.
                self.cooldown[provider] = (time.monotonic() + 60, error.status)
            return [], error.status
        except (TimeoutError, httpx.TimeoutException):
            return [], "timeout"
        except (httpx.HTTPError, ValueError, TypeError, KeyError, AttributeError, OverflowError, RecursionError):
            return [], "unavailable"

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
        if self.client is not None:
            await self.client.aclose()
        self.cache.clear()
        self.cache_bytes = 0
