"""Public Manokara app with private browser rooms. Run one worker on loopback."""

import asyncio
import base64
from collections import OrderedDict
from contextlib import asynccontextmanager
from dataclasses import dataclass
import hashlib
import hmac
import ipaddress
import json
import os
from pathlib import Path
import re
import secrets
import sqlite3
import sys
import time
from urllib.parse import urlsplit

from starlette.applications import Starlette
from starlette.exceptions import HTTPException
from starlette.requests import ClientDisconnect, Request
from starlette.responses import FileResponse, JSONResponse, RedirectResponse, Response, StreamingResponse
from starlette.routing import Route

from manokara_media import MediaResponse, MediaService, MediaSettings

ROOT = Path(__file__).resolve().parent
MAX_BODY = 262_144
MAX_ROOMS = 128
MAX_ROOMS_PER_BROWSER = 8
MAX_SESSIONS = 1024
SESSION_SECONDS = 30 * 86400
WRITER_SECONDS = 15
ROOM_ID = re.compile(r"^[a-f0-9]{32}$")
EFFECTS = set("jizura tempera sonnet lumiere hanabi clean word-pop neon glitch".split()) | {
    "folia-" + name for name in "classic cadenza partita fume cappella tilt claddagh monet diorama pendolo sonnet tempera lumiere".split()
}


@dataclass(frozen=True)
class Settings:
    origin: str
    data_dir: Path
    allow_http: bool = False

    def __post_init__(self):
        url = urlsplit(self.origin)
        if (url.scheme not in ("http", "https") or not url.hostname or url.username or url.password
                or url.path or url.query or url.fragment or self.origin != self.origin.rstrip("/")):
            raise ValueError("MANOKARA_ORIGIN must be an exact origin, e.g. https://karaoke.example.com (no trailing slash).")
        if url.scheme != "https" and not (self.allow_http and url.hostname in ("localhost", "127.0.0.1", "::1")):
            raise ValueError("HTTPS is required; MANOKARA_ALLOW_HTTP=1 permits local loopback development only.")
        _ = url.port
        if self.data_dir.resolve().is_relative_to(ROOT):
            raise ValueError("MANOKARA_DATA_DIR must be outside the web assets directory.")

    @property
    def secure(self):
        return self.origin.startswith("https:")

    @property
    def cookie(self):
        return "__Host-manokara_session" if self.secure else "manokara_session"

    @classmethod
    def from_env(cls):
        state_home = Path(os.environ.get("XDG_STATE_HOME") or Path.home() / ".local" / "state")
        return cls(os.environ.get("MANOKARA_ORIGIN", ""),
                   Path(os.environ.get("MANOKARA_DATA_DIR") or state_home / "manokara").expanduser(),
                   os.environ.get("MANOKARA_ALLOW_HTTP") == "1")


class Store:
    """Bounded persistent credentials/rooms; live playback deliberately stays in memory."""

    def __init__(self, settings):
        db_path = settings.data_dir / "relay.sqlite3"
        try:
            settings.data_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
            if db_path.is_symlink():
                raise ValueError("The state database must not be a symlink.")
            # All runtime DB access is synchronous on one ASGI event loop. TestClient starts its own thread.
            self.db = sqlite3.connect(db_path, check_same_thread=False)
            os.chmod(db_path, 0o600)
        except (OSError, sqlite3.Error) as error:
            if hasattr(self, "db"):
                self.db.close()
            raise ValueError(
                f"Cannot open the database in {settings.data_dir}: {error}. "
                "Set MANOKARA_DATA_DIR to a directory writable by the account running the server "
                "(for example $HOME/.local/state/manokara)."
            ) from error
        self.db.executescript("""
            CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
            CREATE TABLE IF NOT EXISTS sessions (digest TEXT PRIMARY KEY, expires REAL NOT NULL);
            CREATE TABLE IF NOT EXISTS rooms (id TEXT PRIMARY KEY, epoch INTEGER NOT NULL DEFAULT 0, owner TEXT);
        """)
        if "owner" not in {column[1] for column in self.db.execute("PRAGMA table_info(rooms)")}:
            # Legacy rooms used a shared operator credential and have no private owner.
            # They cannot safely become writable by anonymous visitors.
            self.db.execute("ALTER TABLE rooms ADD COLUMN owner TEXT")
            self.db.execute("DELETE FROM sessions")
        self.db.execute("CREATE INDEX IF NOT EXISTS room_owner ON rooms(owner)")
        self.db.execute("INSERT OR IGNORE INTO meta VALUES ('secret', ?)", (secrets.token_hex(32),))
        self.secret = bytes.fromhex(self.db.execute("SELECT value FROM meta WHERE key='secret'").fetchone()[0])
        self.db.execute("DELETE FROM meta WHERE key='password'")
        self.live = {}
        self.cleanup()

    def cleanup(self):
        self.db.execute("DELETE FROM sessions WHERE expires <= ?", (time.time(),))
        stale = self.db.execute("SELECT id FROM rooms WHERE owner IS NULL OR owner NOT IN (SELECT digest FROM sessions)").fetchall()
        self.db.execute("DELETE FROM rooms WHERE owner IS NULL OR owner NOT IN (SELECT digest FROM sessions)")
        self.db.commit()
        for (room_id,) in stale:
            self.live.pop(room_id, None)

    def session(self, token):
        if not token or not re.fullmatch(r"[A-Za-z0-9_-]{43}", token):
            return None
        digest = hashlib.sha256(token.encode()).hexdigest()
        row = self.db.execute("SELECT expires FROM sessions WHERE digest=?", (digest,)).fetchone()
        return digest if row and row[0] > time.time() else None

    def start_session(self, token):
        self.cleanup()
        digest = self.session(token)
        if digest:
            self.db.execute("UPDATE sessions SET expires=? WHERE digest=?", (time.time() + SESSION_SECONDS, digest))
        else:
            if self.db.execute("SELECT count(*) FROM sessions").fetchone()[0] >= MAX_SESSIONS:
                raise HTTPException(503, "Visitor limit reached. Try again later.")
            token = secrets.token_urlsafe(32)
            self.db.execute("INSERT INTO sessions VALUES (?, ?)", (hashlib.sha256(token.encode()).hexdigest(), time.time() + SESSION_SECONDS))
        self.db.commit()
        return token

    def room(self, room_id, digest=None):
        if not isinstance(room_id, str) or not ROOM_ID.fullmatch(room_id):
            raise HTTPException(404, "Room not found.")
        row = self.db.execute("""SELECT rooms.epoch, rooms.owner FROM rooms
                               JOIN sessions ON rooms.owner=sessions.digest
                               WHERE rooms.id=? AND sessions.expires>?""", (room_id, time.time())).fetchone()
        if not row or digest is not None and row[1] != digest:
            raise HTTPException(404, "Room not found.")
        return row[0]

    def owns_room(self, room_id, digest):
        return digest is not None and self.db.execute("SELECT owner FROM rooms WHERE id=?", (room_id,)).fetchone() == (digest,)

    def create_room(self, digest):
        self.cleanup()
        if self.db.execute("SELECT count(*) FROM rooms WHERE owner=?", (digest,)).fetchone()[0] >= MAX_ROOMS_PER_BROWSER:
            raise HTTPException(409, "Your room limit is reached. Reuse or delete an existing room.")
        if self.db.execute("SELECT count(*) FROM rooms").fetchone()[0] >= MAX_ROOMS:
            raise HTTPException(503, "Room limit reached. Try again later.")
        room_id = secrets.token_hex(16)
        self.db.execute("INSERT INTO rooms (id, owner) VALUES (?, ?)", (room_id, digest))
        self.db.commit()
        return room_id

    def view_token(self, room_id):
        epoch = self.room(room_id)
        return hmac.new(self.secret, f"view:{room_id}:{epoch}".encode(), hashlib.sha256).hexdigest()

    def viewer(self, room_id, authorization):
        expected = self.view_token(room_id)
        token = authorization.removeprefix("Bearer ")
        return authorization.startswith("Bearer ") and re.fullmatch(r"[a-f0-9]{64}", token) is not None and hmac.compare_digest(expected, token)


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
            raise HTTPException(429, "Too many requests. Try again shortly.", headers={"Retry-After": "15"})


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


def snapshot(payload):
    strings = {"writerId": 128, "title": 512, "lrc": 200_000, "romajiLrc": 200_000, "memo": 4096,
               "font": 256, "googleFont": 128, "foreground": 9, "background": 16,
               "effect": 32, "centerShape": 8, "colorTheme": 12}
    numbers = {"time": (-86400, 604800), "sampledAt": (0, 100_000_000_000_000),
               "countdownRemaining": (0, 60), "duration": (0, 604800), "size": (24, 160),
               "themeSeed": (0, 4_294_967_295), "timelineVersion": (0, 100_000_000_000_000),
               "uploadDelayMs": (0, 2000),
               **{name: (0, 1) for name in ("audioPower", "audioBass", "audioLowMid", "audioMid", "audioVocal", "audioTreble")}}
    booleans = set("ready playing paused counting mc transparent bold centerFree".split())
    if set(payload) - (strings.keys() | numbers.keys() | booleans):
        raise HTTPException(400, "Unknown lyric state field.")
    for name, limit in strings.items():
        if name in payload and (not isinstance(payload[name], str) or len(payload[name]) > limit):
            raise HTTPException(400, f"Invalid {name}.")
    for name, (low, high) in numbers.items():
        if name in payload and (type(payload[name]) not in (int, float) or not low <= payload[name] <= high):
            raise HTTPException(400, f"Invalid {name}.")
    for name in booleans:
        if name in payload and type(payload[name]) is not bool:
            raise HTTPException(400, f"Invalid {name}.")
    if not payload.get("writerId"):
        raise HTTPException(400, "writerId is required.")
    if payload.get("effect", "clean") not in EFFECTS:
        raise HTTPException(400, "Unknown visualizer.")
    if payload.get("centerShape", "auto") not in ("auto", "wide", "tall"):
        raise HTTPException(400, "Unknown centre shape.")
    if payload.get("colorTheme", "effect") not in ("effect", "white", "cyan", "rose", "amber", "violet", "mint"):
        raise HTTPException(400, "Unknown colour theme.")
    for name in ("foreground", "background"):
        if name in payload and not (re.fullmatch(r"#[a-fA-F0-9]{6}", payload[name]) or name == "background" and payload[name] == "transparent"):
            raise HTTPException(400, f"Invalid {name}.")
    return payload


def asset_manifest():
    names = ["manokara.html", "manokara-obs.html", "manokara-folia.html", "manokara.ico",
             "manokara-ui.css", "manokara-icons.svg",
             "manokara-i18n.js", "manokara-tour.js", "manokara-tour.css",
             "manokara-search.js", "manokara-search.css",
             "manokara-effects.css", "manokara-effects.js", "manokara-jizura.js", "manokara-jizura-adapter.js",
             "manokara-session.js", "manokara-core.js",
             "manokara-lyrics.js", "manokara-lyrics-editor.js", "manokara-romaji-worker.js",
             "manokara-relay.js", "manokara-audio.js"]
    result = {"/" + name: ROOT / name for name in names}
    for file in (ROOT / "ui-assets").iterdir():
        if file.is_file() and file.suffix in (".css", ".svg", ".woff2", ".txt"):
            result["/ui-assets/" + file.name] = file
    # Only the converter, dictionary blobs and notices are served from this directory.
    for file in (ROOT / "romaji-assets").rglob("*"):
        if file.is_file() and file.suffix in (".js", ".gz", ".txt"):
            result["/romaji-assets/" + file.relative_to(ROOT / "romaji-assets").as_posix()] = file
    for file in (ROOT / "folia-assets").iterdir():
        if file.suffix in (".js", ".css", ".png") and file.is_file():
            result["/folia-assets/" + file.name] = file
    # Explicit source/notice downloads; arbitrary files and the Python server are never assets.
    for name in ("FOLIA-MAJOR-SOURCE.zip", "FOLIA-MAJOR-LICENSE.txt", "FOLIA-MAJOR-NOTICE.txt", "JIZURA-LICENSE.txt", "JIZURA-THIRD-PARTY-NOTICES.md"):
        result["/sources/" + name] = ROOT / name
    for name in ("manokara-folia.tsx", "manokara-folia.html", "manokara-folia.css", "vite.manokara.config.mts", "ObsWebSourceApp.tsx"):
        result["/sources/FOLIA-INTEGRATION-SOURCE/" + name] = ROOT / "FOLIA-INTEGRATION-SOURCE" / name
    return result


def safe_asset(path):
    return path.is_file() and path.resolve().is_relative_to(ROOT) and not any(
        part.is_symlink() for part in (path, *path.parents) if part.is_relative_to(ROOT)
    )


def csp_for(path):
    hashes = []
    if path and path.suffix == ".html" and safe_asset(path):
        for attributes, code in re.findall(r"<script\b([^>]*)>(.*?)</script>", path.read_text(encoding="utf-8"), re.S | re.I):
            if not re.search(r"\bsrc\s*=", attributes, re.I):
                digest = base64.b64encode(hashlib.sha256(code.encode()).digest()).decode()
                hashes.append(f"'sha256-{digest}'")
    # The bundled Pixi renderer generates uniform/shader functions at runtime.
    # Scope that exception to Folia's viewer document, never the controller.
    pixi_eval = " 'unsafe-eval'" if path == ROOT / "manokara-folia.html" else ""
    pixi_connect = " data: blob:" if path == ROOT / "manokara-folia.html" else ""
    return "; ".join([
        "default-src 'none'", "base-uri 'none'", "object-src 'none'", "frame-ancestors 'self'",
        "form-action 'self'", "script-src 'self' " + " ".join(hashes) + pixi_eval + " https://www.youtube.com https://s.ytimg.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdmirror.cn/npm/@fontsource/",
        "img-src 'self' data: blob: https:", "media-src 'self' blob: https:",
        "connect-src 'self' https://lrclib.net https://www.youtube.com https://fonts.googleapis.com https://fonts.gstatic.com" + pixi_connect,
        "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com", "worker-src 'self' blob:",
    ])


class SecurityHeaders:
    def __init__(self, app, settings, manifest):
        self.app, self.settings = app, settings
        self.manifest_urls = set(manifest)
        self.policies = {url: csp_for(path) for url, path in manifest.items() if path.suffix == ".html"}

    async def __call__(self, scope, receive, send):
        if scope["type"] != "http":
            return await self.app(scope, receive, send)

        async def secure_send(message):
            if message["type"] == "http.response.start":
                headers = {k.lower(): v for k, v in message.get("headers", [])}
                headers.update({
                    b"cache-control": b"no-store", b"x-content-type-options": b"nosniff",
                    b"referrer-policy": b"strict-origin-when-cross-origin", b"x-frame-options": b"SAMEORIGIN",
                    b"content-security-policy": self.policies.get(scope["path"], csp_for(None)).encode(),
                    b"permissions-policy": b"camera=(), microphone=(), geolocation=()",
                })
                if (message["status"] == 200 and scope["path"].startswith("/folia-assets/")
                        and scope["path"] in self.manifest_urls):
                    # Public bundles are named by their content hash. Reuse them on mode changes.
                    headers[b"cache-control"] = b"public, max-age=31536000, immutable"
                elif (message["status"] == 200 and scope["path"].startswith("/romaji-assets/")
                      and scope["path"] in self.manifest_urls):
                    # Versioned public dictionary files can be reused on later conversions.
                    headers[b"cache-control"] = b"public, max-age=86400"
                elif (message["status"] == 200 and scope["path"].startswith("/ui-assets/")
                      and scope["path"] in self.manifest_urls):
                    headers[b"cache-control"] = b"public, max-age=86400"
                if self.settings.secure:
                    headers[b"strict-transport-security"] = b"max-age=31536000"
                message["headers"] = list(headers.items())
            await send(message)

        request = Request(scope)
        if request.headers.get("host", "").lower() != urlsplit(self.settings.origin).netloc.lower():
            return await JSONResponse({"error": "Invalid host."}, 400)(scope, receive, secure_send)
        if scope["method"] not in ("GET", "HEAD", "POST"):
            return await JSONResponse({"error": "Method not allowed."}, 405)(scope, receive, secure_send)
        if scope["method"] == "POST" and request.headers.get("origin") != self.settings.origin:
            return await JSONResponse({"error": "Invalid origin."}, 403)(scope, receive, secure_send)
        try:
            await self.app(scope, receive, secure_send)
        except ClientDisconnect:
            # The client closed the connection before its request finished.
            # Stop processing; there is no connected peer to send an error to.
            return


def create_app(settings=None):
    settings = settings or Settings.from_env()
    store, limiter = Store(settings), Limiter()
    media_service = MediaService(MediaSettings.from_env())
    manifest = asset_manifest()

    def browser_session(request):
        digest = store.session(request.cookies.get(settings.cookie))
        if not digest:
            raise HTTPException(401, "Reload the app to open your browser session. Cookies must be enabled.")
        return digest

    def client_ip(request):
        peer = request.client.host if request.client else "unknown"
        if peer in ("127.0.0.1", "::1"):
            try:
                return str(ipaddress.ip_address(request.headers.get("cf-connecting-ip", peer)))
            except ValueError:
                return peer
        return peer

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
        store.room(room_id, digest)
        if request.url.path == "/__room/rotate":
            store.db.execute("UPDATE rooms SET epoch=epoch+1 WHERE id=?", (room_id,))
            store.db.commit()
            if room_id in store.live:
                store.live[room_id]["changed"].set()
            return JSONResponse({"room": room_id, "viewToken": store.view_token(room_id)})
        store.db.execute("DELETE FROM rooms WHERE id=?", (room_id,))
        store.db.commit()
        old_room = store.live.pop(room_id, None)
        if old_room:
            old_room["changed"].set()
        return JSONResponse({"ok": True})

    active_streams = {}

    def live_room(room_id):
        return store.live.setdefault(room_id, {"owner": None, "until": 0, "snapshot": {"ready": False},
                                               "revision": 0, "changed": asyncio.Event()})

    def live_snapshot(room):
        result = dict(room["snapshot"])
        if "received_at" in room:
            result["stateAgeMs"] = max(0, (time.monotonic() - room["received_at"]) * 1000) + result.pop("uploadDelayMs", 0)
        return result

    async def stream_state(room_id, cookie, authorization):
        # One latest scene per client, no playback backlog; recheck revocation on every update/heartbeat.
        previous = None
        revision = -1
        try:
            while True:
                try:
                    store.room(room_id)
                    valid = store.owns_room(room_id, store.session(cookie)) or store.viewer(room_id, authorization)
                except HTTPException:
                    valid = False
                if not valid:
                    yield 'event: revoked\ndata: {}\n\n'
                    return
                room = live_room(room_id)
                changed = room["changed"]
                if revision != room["revision"]:
                    scene = live_snapshot(room)
                    packet = {"state": scene} if previous is None or previous.keys() - scene.keys() else {"patch": {k:v for k,v in scene.items() if previous.get(k) != v}}
                    previous, revision = scene, room["revision"]
                    yield 'data: ' + json.dumps(packet, ensure_ascii=False, separators=(',', ':')) + '\n\n'
                try:
                    await asyncio.wait_for(changed.wait(), timeout=5)
                except TimeoutError:
                    yield ': heartbeat\n\n'
        finally:
            active_streams[room_id] -= 1
            if not active_streams[room_id]:
                del active_streams[room_id]

    async def relay_owner(request):
        digest = browser_session(request)
        limiter.check(("owner", digest), 10, 30)
        room_id = request.query_params.get("room")
        store.room(room_id, digest)
        payload = await read_json(request, 1024)
        writer, action = payload.get("writerId"), payload.get("action")
        if not isinstance(writer, str) or not 1 <= len(writer) <= 128 or action not in ("claim", "renew", "release"):
            raise HTTPException(400, "Invalid writer request.")
        room = live_room(room_id)
        accepted = action == "claim" or (room["owner"] == writer and room["until"] > time.monotonic())
        if accepted:
            room["owner"] = None if action == "release" else writer
            room["until"] = time.monotonic() + WRITER_SECONDS
        return JSONResponse({"ok": accepted}, 200 if accepted else 409)

    async def relay_state(request):
        room_id = request.query_params.get("room")
        if request.method in ("GET", "HEAD"):
            store.room(room_id)
            digest = store.session(request.cookies.get(settings.cookie))
            if not store.owns_room(room_id, digest) and not store.viewer(room_id, request.headers.get("authorization", "")):
                raise HTTPException(401, "Use this room's controller browser or a valid OBS link.")
            limiter.check(("read", room_id), 40, 100)
            room = live_room(room_id)
            if request.query_params.get("stream") == "1" and request.method == "GET":
                if active_streams.get(room_id, 0) >= 8 or sum(active_streams.values()) >= 128:
                    raise HTTPException(429, "Too many live lyric viewers.")
                active_streams[room_id] = active_streams.get(room_id, 0) + 1
                return StreamingResponse(stream_state(room_id, request.cookies.get(settings.cookie), request.headers.get("authorization", "")),
                    media_type="text/event-stream", headers={"X-Accel-Buffering": "no"})
            return JSONResponse(live_snapshot(room))
        digest = browser_session(request)
        limiter.check(("write", digest), 10, 30)
        store.room(room_id, digest)
        payload = snapshot(await read_json(request))
        room = live_room(room_id)
        partial = request.query_params.get("patch") == "1"
        if partial and (room["owner"] is None or room["until"] <= time.monotonic() or not room["snapshot"].get("ready")):
            raise HTTPException(428, "Send a complete lyric scene after restart or lease expiry.")
        # This room's controller can recover automatically after restart/lease expiry.
        # No await occurs between checking ownership and updating the room.
        if room["owner"] is None or room["until"] <= time.monotonic():
            room["owner"] = payload["writerId"]
        if room["owner"] != payload["writerId"]:
            raise HTTPException(409, "Another window controls this room. Click the app to take control.")
        if partial:
            payload = snapshot({**room["snapshot"], **payload})
        room["until"] = time.monotonic() + WRITER_SECONDS
        room["snapshot"] = {key: value for key, value in payload.items() if key != "writerId"}
        room["received_at"] = time.monotonic()
        room["revision"] += 1
        room["changed"].set()
        room["changed"] = asyncio.Event()
        return JSONResponse({"ok": True})

    async def health(request):
        return JSONResponse({"ok": True})

    async def youtube_lookup(request):
        digest = browser_session(request)
        room_id = request.query_params.get("room")
        store.room(room_id, digest)
        limiter.check(("youtube", digest), 2 / 60, 4)
        limiter.check("youtube-global", 1, 8)
        payload = await read_json(request, 1024)
        if set(payload) != {"videoId"}:
            raise HTTPException(400, "Send only a YouTube video ID.")
        result = await media_service.resolve(payload["videoId"], room_id, digest)
        store.room(room_id, digest)
        result["url"] = f"/__youtube/media?room={room_id}&ticket={result.pop('ticket')}"
        return JSONResponse(result)

    async def youtube_title(request):
        digest = browser_session(request)
        room_id = request.query_params.get("room")
        store.room(room_id, digest)
        limiter.check(("youtube-title", digest), 6 / 60, 6)
        limiter.check("youtube-global", 1, 8)
        payload = await read_json(request, 1024)
        if set(payload) != {"videoId"}:
            raise HTTPException(400, "Send only a YouTube video ID.")
        result = await media_service.title(payload["videoId"])
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
        if request.method == "HEAD":
            media_service.get_ticket(ticket, room_id, digest)
            return Response(media_type="video/mp4", headers={"Accept-Ranges": "none"})
        limiter.check(("media", digest), 1, 6)
        try:
            start = float(request.query_params.get("start", "0"))
        except ValueError:
            raise HTTPException(400, "Invalid video start time.")
        process, initial = await media_service.open(ticket, room_id, digest, start)

        def valid():
            try:
                store.room(room_id, digest)
                return store.session(request.cookies.get(settings.cookie)) == digest
            except HTTPException:
                return False

        return MediaResponse(media_service, process, initial, digest, valid)

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

    async def http_error(request, error):
        return JSONResponse({"error": error.detail}, error.status_code, headers=error.headers)

    @asynccontextmanager
    async def lifespan(app):
        try:
            yield
        finally:
            await media_service.close()
            store.db.close()

    app = Starlette(routes=[
        Route("/__session", open_session, methods=["POST"]),
        Route("/__room", room_info, methods=["POST"]), Route("/__room/rotate", room_change, methods=["POST"]),
        Route("/__room/delete", room_change, methods=["POST"]),
        Route("/__lyric-owner", relay_owner, methods=["POST"]),
        Route("/__lyric-state", relay_state, methods=["GET", "POST"]),
        Route("/__youtube", youtube_lookup, methods=["POST"]),
        Route("/__youtube/title", youtube_title, methods=["POST"]),
        Route("/__youtube/search", youtube_search, methods=["POST"]),
        Route("/__youtube/media", youtube_media, methods=["GET", "HEAD"]),
        Route("/healthz", health, methods=["GET"]), Route("/{path:path}", assets, methods=["GET", "HEAD"]),
    ], exception_handlers={HTTPException: http_error}, lifespan=lifespan)
    app.state.store, app.state.limiter, app.state.settings = store, limiter, settings
    app.state.media = media_service
    app.add_middleware(SecurityHeaders, settings=settings, manifest=manifest)
    return app


def main():
    if sys.argv[1:]:
        raise SystemExit("Usage: python outputs/manokara_server.py")
    import uvicorn
    try:
        app = create_app()
    except ValueError as error:
        raise SystemExit(str(error))
    uvicorn.run(app, host="127.0.0.1", port=8000, workers=1, proxy_headers=False,
                server_header=False, access_log=False, limit_concurrency=64, backlog=128,
                timeout_keep_alive=5, timeout_graceful_shutdown=10, ws="none", http="h11",
                h11_max_incomplete_event_size=16384)


if __name__ == "__main__":
    main()
