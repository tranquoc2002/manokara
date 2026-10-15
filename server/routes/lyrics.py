"""Same-origin, authenticated lyric searches; provider credentials never reach the browser."""
import asyncio

from starlette.exceptions import HTTPException
from starlette.responses import JSONResponse
from starlette.routing import Route

from ..http import read_json
from ..schemas.lyrics import PROVIDER_LABELS, duration
from ..schemas.ttml import convert_ttml, TtmlError


def build_routes(runtime):
    def authenticate(request):
        digest = runtime.auth.browser_session(request)
        runtime.store.room(request.query_params.get("room"), digest)
        return digest

    async def providers(request):
        digest = authenticate(request)
        runtime.limiter.check(("lyric-providers", digest), 1, 5)
        if await read_json(request, 128):
            raise HTTPException(400, "Send an empty JSON object.")
        return JSONResponse({"providers": runtime.lyrics.providers()})

    async def search(request):
        digest = authenticate(request)
        payload = await read_json(request, 2048)
        if not {"query"} <= payload.keys() or set(payload) - {"query", "provider", "duration"}:
            raise HTTPException(400, "Send a lyric query, optional provider and track duration.")
        query, provider = payload["query"], payload.get("provider", "auto")
        if not isinstance(query, str) or not 1 <= len(query.strip()) <= 200 or any(ord(char) < 32 for char in query):
            raise HTTPException(400, "Enter a song or artist name (1–200 characters).")
        if not isinstance(provider, str) or provider not in ("auto", *PROVIDER_LABELS):
            raise HTTPException(400, "Invalid lyric provider.")
        track_duration = duration(payload.get("duration"))
        if payload.get("duration") is not None and track_duration is None:
            raise HTTPException(400, "Invalid track duration.")
        runtime.limiter.check(("lyric-search", digest), 20 / 60, 5)
        runtime.limiter.check("lyric-search-global", 3, 12)
        result = await runtime.lyrics.search(" ".join(query.split()), provider, track_duration)
        authenticate(request)
        return JSONResponse(result)

    async def import_ttml(request):
        digest = authenticate(request)
        runtime.limiter.check(("ttml-import", digest), 12 / 60, 4)
        runtime.limiter.check("ttml-import-global", 2, 8)
        payload = await read_json(request, 1024 * 1024)
        if set(payload) != {"ttml"} or not isinstance(payload["ttml"], str):
            raise HTTPException(400, "Send a TTML document.")
        try:
            result = await asyncio.to_thread(convert_ttml, payload["ttml"])
        except TtmlError as error:
            raise HTTPException(400, str(error)) from None
        authenticate(request)
        return JSONResponse(result)

    return [Route("/__lyrics/providers", providers, methods=["POST"]),
            Route("/__lyrics/import-ttml", import_ttml, methods=["POST"]),
            Route("/__lyrics/search", search, methods=["POST"])]
