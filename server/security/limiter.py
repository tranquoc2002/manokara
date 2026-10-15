"""Bounded process-local token buckets."""
from collections import OrderedDict
import math
import time
from starlette.exceptions import HTTPException

class Limiter:
    """Token buckets with bounded memory; clock is injectable for security tests."""

    def __init__(self, clock=time.monotonic):
        self.clock = clock
        self.buckets = OrderedDict()

    def check(self, key, rate, burst):
        now = self.clock()
        tokens, updated = self.buckets.pop(key, (float(burst), now))
        tokens = min(burst, tokens + (now - updated) * rate)
        accepted = tokens >= 1
        self.buckets[key] = (tokens - 1 if accepted else tokens, now)
        if len(self.buckets) > 10_000:
            self.buckets.popitem(last=False)
        if not accepted:
            retry = max(1, math.ceil((1 - tokens) / rate))
            raise HTTPException(429, "Too many requests. Try again shortly.", headers={"Retry-After": str(retry)})
