"""Transport/authentication/rate limits for lyric publishing and OBS readers."""
from starlette.responses import JSONResponse
from starlette.routing import Route

from ..http import read_json
from .streaming import RelayResponse


def build_routes(runtime):
    settings, store, limiter = runtime.settings, runtime.store, runtime.limiter
    relay = runtime.relay
    browser_session = runtime.auth.browser_session

    async def relay_owner(request):
        digest = browser_session(request)
        limiter.check(("owner", digest), 10, 30)
        room_id = request.query_params.get("room")
        store.room(room_id, digest)
        payload = await read_json(request, 1024)
        # Reading a streamed body yields: a room can be deleted or its session expire meanwhile.
        store.room(room_id, digest)
        accepted = relay.claim(room_id, payload.get("writerId"), payload.get("action"))
        return JSONResponse({"ok": accepted}, 200 if accepted else 409)

    async def relay_state(request):
        room_id = request.query_params.get("room")
        cookie = request.cookies.get(settings.cookie)
        authorization = request.headers.get("authorization", "")
        if request.method in ("GET", "HEAD"):
            relay.authorize_reader(room_id, cookie, authorization)
            limiter.check(("read", room_id), 40, 100)
            room = relay.room(room_id)
            if request.query_params.get("stream") == "1" and request.method == "GET":
                lease = relay.reserve_stream(room_id)
                return RelayResponse(relay, lease, cookie, authorization)
            return JSONResponse(relay.scene(room))
        digest = browser_session(request)
        limiter.check(("write", digest), 10, 30)
        store.room(room_id, digest)
        payload = await read_json(request)
        store.room(room_id, digest)
        relay.publish(room_id, payload, partial=request.query_params.get("patch") == "1")
        return JSONResponse({"ok": True})

    return [Route("/__lyric-owner", relay_owner, methods=["POST"]),
            Route("/__lyric-state", relay_state, methods=["GET", "POST"])]
