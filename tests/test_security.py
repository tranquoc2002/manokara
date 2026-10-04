import asyncio
import importlib.util
from pathlib import Path
import time

import pytest
from starlette.testclient import TestClient
from starlette.exceptions import HTTPException
from starlette.requests import Request

spec = importlib.util.spec_from_file_location("manokara_server", Path(__file__).parents[1] / "outputs/manokara_server.py")
server = importlib.util.module_from_spec(spec)
# dataclasses uses the module registry when resolving annotations.
import sys
sys.modules[spec.name] = server
spec.loader.exec_module(server)

ORIGIN = "https://karaoke.example.com"


def test_default_database_is_created_in_user_state_directory(tmp_path, monkeypatch):
    monkeypatch.setattr(server.Path, "home", classmethod(lambda cls: tmp_path))
    monkeypatch.setenv("MANOKARA_ORIGIN", ORIGIN)
    monkeypatch.delenv("MANOKARA_DATA_DIR", raising=False)
    monkeypatch.delenv("XDG_STATE_HOME", raising=False)
    settings = server.Settings.from_env()
    assert settings.data_dir == tmp_path / ".local" / "state" / "manokara"
    with TestClient(server.create_app(settings), base_url=ORIGIN) as client:
        assert client.get("/healthz").status_code == 200
        assert (settings.data_dir / "relay.sqlite3").is_file()


def test_state_directory_supports_xdg_and_explicit_override(tmp_path, monkeypatch):
    monkeypatch.setenv("MANOKARA_ORIGIN", ORIGIN)
    monkeypatch.delenv("MANOKARA_DATA_DIR", raising=False)
    monkeypatch.setenv("XDG_STATE_HOME", str(tmp_path / "xdg"))
    assert server.Settings.from_env().data_dir == tmp_path / "xdg" / "manokara"
    monkeypatch.setenv("MANOKARA_DATA_DIR", str(tmp_path / "custom"))
    assert server.Settings.from_env().data_dir == tmp_path / "custom"


def test_unwritable_database_reports_directory_and_fix(tmp_path, monkeypatch):
    def denied(*args, **kwargs):
        raise server.sqlite3.OperationalError("unable to open database file")
    monkeypatch.setattr(server.sqlite3, "connect", denied)
    with pytest.raises(ValueError) as error:
        server.Store(server.Settings(ORIGIN, tmp_path))
    assert str(tmp_path) in str(error.value)
    assert "MANOKARA_DATA_DIR" in str(error.value)
    assert "writable by the account running the server" in str(error.value)


@pytest.fixture
def app(tmp_path):
    return server.create_app(server.Settings(ORIGIN, tmp_path))


@pytest.fixture
def client(app):
    with TestClient(app, base_url=ORIGIN, headers={"Origin": ORIGIN}, follow_redirects=False) as client:
        yield client


def open_session(client):
    response = client.post("/__session", json={})
    assert response.status_code == 200
    return response


def room(client):
    response = client.post("/__room", json={})
    assert response.status_code == 200
    return response.json()


def claim(client, room_id, writer="writer-A"):
    response = client.post(f"/__lyric-owner?room={room_id}", json={"writerId": writer, "action": "claim"})
    assert response.status_code == 200


def test_startup_fails_without_valid_secure_settings(tmp_path):
    for origin, local in [("", False), ("https://example.com/", False),
                          ("http://example.com", True), ("https://user@example.com", False)]:
        with pytest.raises(ValueError):
            server.Settings(origin, tmp_path, local)
    server.Settings("http://localhost:8000", tmp_path, True)
    with pytest.raises(ValueError):
        server.Settings(ORIGIN, server.ROOT / "private")


def test_public_app_has_no_login_but_controls_need_browser_credential(client):
    assert client.get("/").headers["location"] == "/manokara.html"
    response = client.get("/manokara.html")
    assert response.status_code == 200
    assert 'id="logout"' not in response.text
    assert '__logout' not in response.text
    for path in ("/manokara-login.html", "/manokara-login.js", "/__login", "/__logout"):
        assert client.get(path).status_code == 404
        assert client.post(path, json={}).status_code in (404, 405)
    for path in ("/__room", "/__room/rotate", "/__room/delete", "/__lyric-owner", "/__lyric-state"):
        assert client.post(path, json={}).status_code == 401
    open_session(client)
    assert room(client)["room"]


def test_automatic_session_cookie_is_secure_and_reuses_identity(client, app):
    response = open_session(client)
    cookie = response.headers["set-cookie"]
    for flag in ("__Host-manokara_session=", "HttpOnly", "Secure", "SameSite=strict", "Path=/"):
        assert flag in cookie
    assert "Domain=" not in cookie
    saved = client.cookies.get("__Host-manokara_session")
    assert client.get("/manokara.html").status_code == 200
    digest = app.state.store.session(saved)
    app.state.store.db.execute("UPDATE sessions SET expires=? WHERE digest=?", (time.time() + 60, digest))
    app.state.store.db.commit()
    open_session(client)
    assert client.cookies.get("__Host-manokara_session") == saved
    assert app.state.store.db.execute("SELECT count(*) FROM sessions").fetchone()[0] == 1
    expires = app.state.store.db.execute("SELECT expires FROM sessions WHERE digest=?", (digest,)).fetchone()[0]
    assert expires > time.time() + server.SESSION_SECONDS - 10


def test_session_expiry(client, app):
    open_session(client)
    info = room(client)
    endpoint = f'/__lyric-state?room={info["room"]}'
    assert client.post(endpoint, json={"writerId": "writer-A"}).status_code == 200
    app.state.store.db.execute("UPDATE sessions SET expires=?", (time.time() - 1,))
    app.state.store.db.commit()
    assert client.post("/__room", json={}).status_code == 401
    assert client.get(endpoint, headers={"Authorization": "Bearer " + info["viewToken"]}).status_code == 404
    open_session(client)
    assert app.state.store.db.execute("SELECT count(*) FROM rooms").fetchone()[0] == 0
    assert info["room"] not in app.state.store.live
    assert client.post("/__room", json={"room": info["room"]}).status_code == 404
    assert room(client)["room"] != info["room"]


def test_host_origin_and_content_type_checks(client):
    assert client.post("/__session", json={}, headers={"Origin": "https://evil.example"}).status_code == 403
    assert client.post("/__session", content="{}", headers={"Content-Type": "text/plain"}).status_code == 415
    open_session(client)
    assert client.get("/healthz", headers={"Host": "evil.example"}).status_code == 400
    assert client.post("/__room", json={}, headers={"Origin": "https://evil.example"}).status_code == 403
    assert client.post("/__room", json={}, headers={"Origin": "null"}).status_code == 403
    assert client.post("/__room", content="{}", headers={"Content-Type": "text/plain"}).status_code == 415
    assert client.options("/__room").status_code == 405
    assert client.get("/healthz").headers.get("access-control-allow-origin") is None
    client.headers.pop("origin")
    assert client.post("/__room", json={}).status_code == 403


def test_two_rooms_isolated_and_viewers_cannot_write(client):
    open_session(client)
    a, b = room(client), room(client)
    claim(client, a["room"])
    assert client.post(f'/__lyric-state?room={a["room"]}', json={"writerId": "writer-A", "ready": True, "title": "A", "lrc": "[00:00]Hello"}).status_code == 200
    assert client.get(f'/__lyric-state?room={b["room"]}').json() == {"ready": False}
    client.cookies.clear()
    headers = {"Authorization": "Bearer " + a["viewToken"]}
    response = client.get(f'/__lyric-state?room={a["room"]}', headers=headers)
    assert response.json()["title"] == "A"
    assert "writerId" not in response.json()
    assert client.get(f'/__lyric-state?room={a["room"]}').status_code == 401
    assert client.get(f'/__lyric-state?room={b["room"]}', headers=headers).status_code == 401
    for path in ("/__lyric-owner", "/__lyric-state", "/__room/rotate", "/__room", "/__room/delete"):
        assert client.post(f'{path}?room={a["room"]}', json={"room": a["room"]}, headers=headers).status_code == 401


def test_public_visitors_cannot_read_control_or_revoke_each_others_rooms(client):
    open_session(client)
    a = room(client)
    first_cookie = client.cookies.get("__Host-manokara_session")
    endpoint_a = f'/__lyric-state?room={a["room"]}'
    assert client.post(endpoint_a, json={"writerId": "writer-A", "title": "First user's song"}).status_code == 200
    client.cookies.clear()
    open_session(client)
    b = room(client)
    assert a["room"] != b["room"]
    assert first_cookie != client.cookies.get("__Host-manokara_session")
    endpoint_b = f'/__lyric-state?room={b["room"]}'
    assert client.post(endpoint_b, json={"writerId": "writer-B", "title": "Second user's song"}).status_code == 200
    assert client.get(endpoint_a).status_code == 401
    for path in ("/__room", "/__room/rotate", "/__room/delete"):
        assert client.post(path, json={"room": a["room"]}).status_code == 404
    assert client.post(f'/__lyric-owner?room={a["room"]}', json={"writerId": "writer-B", "action": "claim"}).status_code == 404
    assert client.post(endpoint_a, json={"writerId": "writer-B", "title": "Hijacked"}).status_code == 404
    # Even a valid OBS token grants this visitor viewing access only.
    view_a = {"Authorization": "Bearer " + a["viewToken"]}
    assert client.get(endpoint_a, headers=view_a).json()["title"] == "First user's song"
    assert client.post(endpoint_a, json={"writerId": "writer-B"}, headers=view_a).status_code == 404
    client.cookies.clear()
    assert client.get(endpoint_a, headers=view_a).json()["title"] == "First user's song"
    assert client.get(endpoint_b, headers={"Authorization": "Bearer " + b["viewToken"]}).json()["title"] == "Second user's song"


def test_token_rotation_and_room_deletion(client):
    open_session(client)
    info = room(client)
    rotated = client.post("/__room/rotate", json={"room": info["room"]}).json()
    assert rotated["viewToken"] != info["viewToken"]
    cookie = client.cookies.get("__Host-manokara_session")
    client.cookies.clear()
    endpoint = f'/__lyric-state?room={info["room"]}'
    assert client.get(endpoint, headers={"Authorization": "Bearer " + info["viewToken"]}).status_code == 401
    assert client.get(endpoint, headers={"Authorization": "Bearer " + rotated["viewToken"]}).status_code == 200
    client.cookies.set("__Host-manokara_session", cookie, domain="karaoke.example.com", path="/")
    assert client.post("/__room/delete", json={"room": info["room"]}).status_code == 200
    assert client.get(endpoint, headers={"Authorization": "Bearer " + rotated["viewToken"]}).status_code == 404


def test_writer_takeover_and_lease_expiry(client, app):
    open_session(client)
    info = room(client)
    endpoint = f'/__lyric-state?room={info["room"]}'
    claim(client, info["room"])
    claim(client, info["room"], "writer-B")
    assert client.post(endpoint, json={"writerId": "writer-A"}).status_code == 409
    assert client.post(endpoint, json={"writerId": "writer-B"}).status_code == 200
    app.state.store.live[info["room"]]["until"] = 0
    assert client.post(endpoint, json={"writerId": "writer-A"}).status_code == 200
    assert client.post(endpoint, json={"writerId": "writer-B"}).status_code == 409
    claim(client, info["room"])
    assert client.post(endpoint, json={"writerId": "writer-A"}).status_code == 200


@pytest.mark.parametrize("field,value", [("lrc", 123), ("playing", "true"), ("time", None),
    ("duration", -1), ("time", 10**1000), ("size", 9000), ("effect", "unknown"),
    ("foreground", "url(https://evil.example)"), ("extra", "field"), ("title", "a"*513)])
def test_malformed_snapshot_rejected(client, field, value):
    open_session(client)
    info = room(client)
    claim(client, info["room"])
    assert client.post(f'/__lyric-state?room={info["room"]}', json={"writerId": "writer-A", field: value}).status_code == 400


def test_json_errors_and_size_limit(client):
    open_session(client)
    info = room(client)
    endpoint = f'/__lyric-state?room={info["room"]}'
    for body in ('{"time":NaN}', '[]', '{', '{"time":Infinity}'):
        assert client.post(endpoint, content=body, headers={"Content-Type": "application/json"}).status_code == 400
    assert client.post(endpoint, content='x'*(server.MAX_BODY+1), headers={"Content-Type": "application/json"}).status_code == 413
    chunks = iter([b'x'*131072, b'x'*131072, b'x'])
    assert client.post(endpoint, content=chunks, headers={"Content-Type": "application/json"}).status_code == 413


def test_frontend_default_snapshot_is_accepted(client):
    open_session(client)
    info = room(client)
    claim(client, info["room"])
    payload = {"writerId": "writer-A", "ready": True, "title": "", "lrc": "", "time": 0,
               "sampledAt": int(time.time() * 1000), "playing": False, "paused": False,
               "counting": False, "countdownRemaining": 0, "duration": 0, "mc": False,
               "memo": "", "size": 64, "foreground": "#ffffff", "themeSeed": 0,
               "background": "transparent", "transparent": True, "bold": True,
               "font": 'system-ui,"Segoe UI","Yu Gothic",sans-serif', "googleFont": "",
               "effect": "jizura", "centerFree": False, "centerShape": "auto", "colorTheme": "effect"}
    assert client.post(f'/__lyric-state?room={info["room"]}', json=payload).status_code == 200


def test_static_files_are_allowlisted_and_headers_present(client, tmp_path, monkeypatch):
    for path in ("/manokara_server.py", "/.env", "/folia-assets/", "/FOLIA-INTEGRATION-SOURCE/", "/README.md", "/__open-browser"):
        assert client.get(path).status_code == 404
    assert client.get("/sources/FOLIA-MAJOR-LICENSE.txt").status_code == 200
    assert client.head("/sources/FOLIA-MAJOR-SOURCE.zip").status_code == 200
    response = client.get("/manokara.html")
    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["cache-control"] == "no-store"
    assert "default-src 'none'" in response.headers["content-security-policy"]
    assert "unsafe-eval" not in response.headers["content-security-policy"]
    assert response.headers["strict-transport-security"] == "max-age=31536000"
    open_session(client)
    assert "unsafe-eval" not in client.get("/manokara.html").headers["content-security-policy"]
    assert "'sha256-" in client.get("/manokara.html").headers["content-security-policy"]
    assert "'unsafe-eval'" in client.get("/manokara-folia.html").headers["content-security-policy"]
    # Test a symlink directly without changing the project's public files.
    target = tmp_path / "secret.txt"
    target.write_text("secret")
    link = tmp_path / "link.txt"
    try:
        link.symlink_to(target)
    except OSError:
        pytest.skip("Symlink creation requires elevated Windows privileges.")
    monkeypatch.setattr(server, "ROOT", tmp_path)
    assert not server.safe_asset(link)


def test_new_browser_allocations_are_rate_limited(client, app):
    app.state.limiter.clock = lambda: 0.0
    for _ in range(10):
        open_session(client)
        client.cookies.clear()
    response = client.post("/__session", json={})
    assert response.status_code == 429
    assert response.headers["retry-after"] == "15"
    assert app.state.store.db.execute("SELECT count(*) FROM sessions").fetchone()[0] == 10


def test_room_and_session_storage_limits_keep_existing_visitors_working(client, app, monkeypatch):
    monkeypatch.setattr(server, "MAX_ROOMS_PER_BROWSER", 1)
    open_session(client)
    info = room(client)
    assert client.post("/__room", json={}).status_code == 409
    assert client.post("/__room", json={"room": info["room"]}).json() == info
    monkeypatch.setattr(server, "MAX_ROOMS", 1)
    monkeypatch.setattr(server, "MAX_SESSIONS", 2)
    client.cookies.clear()
    open_session(client)
    second_cookie = client.cookies.get("__Host-manokara_session")
    assert client.post("/__room", json={}).status_code == 503
    client.cookies.clear()
    assert client.post("/__session", json={}).status_code == 503
    client.cookies.set("__Host-manokara_session", second_cookie, domain="karaoke.example.com", path="/")
    open_session(client)
    assert app.state.store.db.execute("SELECT count(*) FROM sessions").fetchone()[0] == 2


def test_limiter_recovers_and_is_bounded():
    now = [0.0]
    limiter = server.Limiter(lambda: now[0])
    limiter.check("client", 1, 1)
    with pytest.raises(HTTPException):
        limiter.check("client", 1, 1)
    now[0] = 1
    limiter.check("client", 1, 1)
    for n in range(10001):
        limiter.check(n, 1, 1)
    assert len(limiter.buckets) == 10000


def test_rooms_browser_identity_and_view_tokens_survive_restart(tmp_path):
    settings = server.Settings(ORIGIN, tmp_path)
    first = server.create_app(settings)
    with TestClient(first, base_url=ORIGIN, headers={"Origin": ORIGIN}) as client:
        open_session(client)
        info = room(client)
        claim(client, info["room"])
        assert client.post(f'/__lyric-state?room={info["room"]}', json={"writerId": "writer-A", "title": "before restart"}).status_code == 200
        cookie = client.cookies.get("__Host-manokara_session")
    second = server.create_app(settings)
    with TestClient(second, base_url=ORIGIN, headers={"Origin": ORIGIN}) as client:
        client.cookies.set("__Host-manokara_session", cookie, domain="karaoke.example.com", path="/")
        assert client.post("/__room", json={"room": info["room"]}).json() == info
        assert client.get(f'/__lyric-state?room={info["room"]}').json() == {"ready": False}
        assert client.post(f'/__lyric-state?room={info["room"]}', json={"writerId": "writer-A", "title": "recovered"}).status_code == 200


def test_upgrade_removes_shared_operator_rooms_without_granting_public_control(tmp_path):
    legacy_token = "a" * 43
    with server.sqlite3.connect(tmp_path / "relay.sqlite3") as db:
        db.executescript("""
            CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
            CREATE TABLE sessions (digest TEXT PRIMARY KEY, expires REAL NOT NULL);
            CREATE TABLE rooms (id TEXT PRIMARY KEY, epoch INTEGER NOT NULL DEFAULT 0);
        """)
        db.execute("INSERT INTO meta VALUES ('secret', ?)", ("f" * 64,))
        db.execute("INSERT INTO meta VALUES ('password', 'legacy-fingerprint')")
        db.execute("INSERT INTO sessions VALUES (?, ?)", (server.hashlib.sha256(legacy_token.encode()).hexdigest(), time.time() + 3600))
        db.execute("INSERT INTO rooms (id) VALUES (?)", ("a" * 32,))
    app = server.create_app(server.Settings(ORIGIN, tmp_path))
    with TestClient(app, base_url=ORIGIN, headers={"Origin": ORIGIN}) as client:
        client.cookies.set("__Host-manokara_session", legacy_token, domain="karaoke.example.com", path="/")
        assert client.post("/__room", json={"room": "a" * 32}).status_code == 401
        open_session(client)
        assert client.post("/__room", json={"room": "a" * 32}).status_code == 404
        assert room(client)["room"] != "a" * 32
        assert app.state.store.db.execute("SELECT value FROM meta WHERE key='password'").fetchone() is None


def test_request_body_timeout_without_waiting_five_seconds(monkeypatch):
    real_timeout = asyncio.timeout
    monkeypatch.setattr(server.asyncio, "timeout", lambda _: real_timeout(.01))
    async def run():
        async def receive():
            await asyncio.sleep(1)
            return {"type": "http.request", "body": b"{}"}
        request = Request({"type": "http", "headers": [(b"content-type", b"application/json")]}, receive)
        with pytest.raises(HTTPException) as error:
            await server.read_json(request)
        assert error.value.status_code == 408
    asyncio.run(run())


def test_relay_reports_server_age_without_trusting_device_clock(client, app):
    open_session(client)
    info = room(client)
    endpoint = f'/__lyric-state?room={info["room"]}'
    assert client.post(endpoint, json={"writerId": "writer-A", "ready": True, "time": 4,
                                       "sampledAt": 1, "timelineVersion": 7}).status_code == 200
    app.state.store.live[info["room"]]["received_at"] -= 2
    state = client.get(endpoint).json()
    assert 2000 <= state["stateAgeMs"] < 3000
    assert state["time"] == 4 and state["timelineVersion"] == 7
    assert client.post(endpoint, json={"writerId": "writer-A", "stateAgeMs": 0}).status_code == 400


def test_public_root_redirect_preserves_valid_room_only(client):
    valid = "a" * 32
    assert client.get('/?room=' + valid).headers['location'] == '/manokara.html?room=' + valid
    assert client.get('/?room=https://evil.example').headers['location'] == '/manokara.html'


def test_public_hashed_bundles_cache_but_private_state_does_not(client):
    asset = next(path for path in server.asset_manifest() if path.startswith('/folia-assets/') and path.endswith('.js'))
    assert client.get(asset).headers['cache-control'] == 'public, max-age=31536000, immutable'
    assert client.get('/manokara-obs.html').headers['cache-control'] == 'no-store'
    assert client.get('/folia-assets/missing.js').headers['cache-control'] == 'no-store'
    assert client.get('/sources/FOLIA-INTEGRATION-SOURCE/ObsWebSourceApp.tsx').status_code == 200
