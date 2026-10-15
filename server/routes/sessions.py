"""Browser-session and durable room endpoints."""
from starlette.responses import JSONResponse
from starlette.routing import Route
from ..constants import SESSION_SECONDS
from ..http import read_json
from ..security.auth import client_ip

def build_routes(runtime):
    settings, store, limiter = runtime.settings, runtime.store, runtime.limiter
    browser_session = runtime.auth.browser_session

    async def open_session(request):
        limiter.check(("session", client_ip(request)), 1, 20)
        limiter.check("session-global", 10, 50)
        await read_json(request, 1024)
        token = request.cookies.get(settings.cookie)
        if not store.session(token):
            limiter.check(("new-session", client_ip(request)), 10 / 60, 10)
        response = JSONResponse({"ok": True})
        response.set_cookie(settings.cookie, store.start_session(token), max_age=SESSION_SECONDS, httponly=True,
                            secure=settings.secure, samesite="strict", path="/")
        return response

    async def room_info(request):
        digest = browser_session(request)
        limiter.check(("room", digest), 1, 10)
        payload = await read_json(request, 1024)
        digest = browser_session(request)
        room_id = payload.get("room")
        if room_id is None:
            room_id = store.create_room(digest)
        else:
            store.room(room_id, digest)
        return JSONResponse({"room": room_id, "viewToken": store.view_token(room_id)})

    async def room_change(request):
        digest = browser_session(request)
        limiter.check(("room", digest), 1, 10)
        payload = await read_json(request, 1024)
        room_id = payload.get("room")
        if request.url.path == "/__room/rotate":
            return JSONResponse(runtime.rooms.rotate(room_id, digest))
        runtime.rooms.delete(room_id, digest)
        return JSONResponse({"ok": True})

    return [
        Route("/__session", open_session, methods=["POST"]),
        Route("/__room", room_info, methods=["POST"]),
        Route("/__room/rotate", room_change, methods=["POST"]),
        Route("/__room/delete", room_change, methods=["POST"]),
    ]
