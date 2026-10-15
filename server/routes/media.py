"""Authenticated media HTTP adapters; process/stream work belongs to MediaService."""
from starlette.exceptions import HTTPException
from starlette.responses import JSONResponse, Response
from starlette.routing import Route
from ..constants import ROOM_ID
from ..http import read_json
from ..services.media import MediaResponse

def build_routes(runtime):
    settings, store, limiter = runtime.settings, runtime.store, runtime.limiter
    media_service = runtime.media
    browser_session = runtime.auth.browser_session

    async def youtube_lookup(request):
        digest = browser_session(request)
        room_id = request.query_params.get("room")
        store.room(room_id, digest)
        limiter.check(("youtube-request", digest), 12 / 60, 6)
        payload = await read_json(request, 1024)
        if set(payload) != {"videoId"}:
            raise HTTPException(400, "Send only a YouTube video ID.")
        def reserve():
            limiter.check(("youtube", digest), 2 / 60, 4)
            limiter.check("youtube-global", 1, 8)
        result = await media_service.resolve(payload["videoId"], room_id, digest, reserve)
        store.room(room_id, digest)
        result["url"] = f"/__youtube/media?room={room_id}&ticket={result.pop('ticket')}"
        return JSONResponse(result)

    async def youtube_title(request):
        digest = browser_session(request)
        room_id = request.query_params.get("room")
        store.room(room_id, digest)
        limiter.check(("youtube-title", digest), 6 / 60, 6)
        payload = await read_json(request, 1024)
        if set(payload) != {"videoId"}:
            raise HTTPException(400, "Send only a YouTube video ID.")
        def reserve():
            limiter.check("youtube-global", 1, 8)
        result = await media_service.title(payload["videoId"], reserve)
        store.room(room_id, digest)
        return JSONResponse(result)

    async def youtube_search(request):
        digest = browser_session(request)
        room_id = request.query_params.get("room")
        store.room(room_id, digest)
        payload = await read_json(request, 2048)
        if set(payload) != {"query", "karaoke"}:
            raise HTTPException(400, "Send a search query and karaoke preference.")
        limiter.check(("youtube-search", digest), 18 / 60, 6)
        limiter.check("youtube-search-global", 2, 8)
        result = await media_service.search(payload["query"], payload["karaoke"])
        store.room(room_id, digest)
        return JSONResponse(result)

    async def youtube_media(request):
        digest = browser_session(request)
        room_id = request.query_params.get("room")
        store.room(room_id, digest)
        ticket = request.query_params.get("ticket", "")
        if not ROOM_ID.fullmatch(ticket):
            raise HTTPException(404, "Video stream not found.")
        kind = request.query_params.get("kind", "video")
        if kind not in ("video", "audio"):
            raise HTTPException(400, "Invalid media kind.")
        audio_only = kind == "audio"
        if request.method == "HEAD":
            media_service.get_ticket(ticket, room_id, digest)
            return Response(media_type="audio/mp4" if audio_only else "video/mp4", headers={"Accept-Ranges": "none"})
        limiter.check(("media", digest), 1, 6)
        try:
            start = float(request.query_params.get("start", "0"))
        except ValueError:
            raise HTTPException(400, "Invalid video start time.")
        process, initial = await media_service.open(ticket, room_id, digest, start, audio_only=audio_only)

        def valid():
            try:
                store.room(room_id, digest)
                return store.session(request.cookies.get(settings.cookie)) == digest
            except HTTPException:
                return False

        return MediaResponse(media_service, process, initial, digest, valid, audio_only=audio_only)

    return [
        Route("/__youtube", youtube_lookup, methods=["POST"]),
        Route("/__youtube/title", youtube_title, methods=["POST"]),
        Route("/__youtube/search", youtube_search, methods=["POST"]),
        Route("/__youtube/media", youtube_media, methods=["GET", "HEAD"]),
    ]
