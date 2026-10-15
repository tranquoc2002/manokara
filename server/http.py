"""HTTP body/error adapters shared by routes."""
import asyncio
import json
from starlette.exceptions import HTTPException
from starlette.responses import JSONResponse
from .constants import MAX_BODY

async def read_json(request, limit=MAX_BODY):
    if request.headers.get("content-type", "").split(";")[0].strip().lower() != "application/json":
        raise HTTPException(415, "Content-Type must be application/json.")
    try:
        declared = int(request.headers.get("content-length", "0"))
        if declared < 0:
            raise ValueError
    except ValueError:
        raise HTTPException(400, "Invalid Content-Length.")
    if declared > limit:
        raise HTTPException(413, "Request body too large.")
    body = bytearray()
    try:
        async with asyncio.timeout(5):
            async for chunk in request.stream():
                body.extend(chunk)
                if len(body) > limit:
                    raise HTTPException(413, "Request body too large.")
        value = json.loads(body, parse_constant=lambda _: (_ for _ in ()).throw(ValueError()))
    except TimeoutError:
        raise HTTPException(408, "Request body timed out.")
    except (ValueError, RecursionError):
        raise HTTPException(400, "Invalid JSON.")
    if not isinstance(value, dict):
        raise HTTPException(400, "Expected a JSON object.")
    return value

async def http_error(request, error):
    return JSONResponse({"error": error.detail}, error.status_code, headers=error.headers)
