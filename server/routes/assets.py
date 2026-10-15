"""Public health/allowlisted assets; source Python is never a static asset."""
from starlette.exceptions import HTTPException
from starlette.responses import FileResponse, JSONResponse, RedirectResponse
from starlette.routing import Route
from ..constants import ROOM_ID
from ..security.assets import safe_asset

def build_routes(runtime):
    manifest = runtime.manifest

    async def health(request):
        return JSONResponse({"ok": True})

    async def assets(request):
        path = request.url.path
        room = request.query_params.get("room", "")
        suffix = "?room=" + room if ROOM_ID.fullmatch(room) else ""
        if path == "/":
            return RedirectResponse("/manokara.html" + suffix, status_code=303)
        file = manifest.get(path)
        if not file or not safe_asset(file):
            raise HTTPException(404, "Not found.")
        media = "text/plain; charset=utf-8" if path.startswith("/sources/") and file.suffix in (".txt", ".md", ".tsx", ".mts") else None
        return FileResponse(file, media_type=media)

    return [
        Route("/healthz", health, methods=["GET"]),
        Route("/{path:path}", assets, methods=["GET", "HEAD"]),
    ]
