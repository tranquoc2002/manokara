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
PASSWORD = "test-password-with-enough-entropy"
HASH = server.password_hash(PASSWORD)


@pytest.fixture
def app(tmp_path):
    return server.create_app(server.Settings(ORIGIN, HASH, tmp_path))


@pytest.fixture
def client(app):
    with TestClient(app, base_url=ORIGIN, headers={"Origin": ORIGIN}, follow_redirects=False) as client:
        yield client


def sign_in(client):
    response = client.post("/__login", json={"password": PASSWORD})
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
    for origin, encoded, local in [("", HASH, False), ("https://example.com/", HASH, False),
                                   ("http://example.com", HASH, True), (ORIGIN, "password", False)]:
        with pytest.raises(ValueError):
            server.Settings(origin, encoded, tmp_path, local)
    server.Settings("http://localhost:8000", HASH, tmp_path, True)
    with pytest.raises(ValueError):
        server.Settings(ORIGIN, HASH, server.ROOT / "private")


def test_anonymous_controller_access_denied(client):
    assert client.get("/").headers["location"] == "/manokara-login.html"
    assert client.get("/manokara.html").status_code == 303
    for path in ("/__room", "/__room/rotate", "/__room/delete", "/__lyric-owner", "/__lyric-state", "/__logout"):
        assert client.post(path, json={}).status_code == 401


def test_session_cookie_and_logout_revocation(client):
    response = sign_in(client)
    cookie = response.headers["set-cookie"]
    for flag in ("__Host-manokara_session=", "HttpOnly", "Secure", "SameSite=strict", "Path=/"):
        assert flag in cookie
    assert "Domain=" not in cookie
    saved = client.cookies.get("__Host-manokara_session")
    assert client.get("/manokara.html").status_code == 200
    assert client.post("/__logout", json={}).status_code == 200
    client.cookies.set("__Host-manokara_session", saved, domain="karaoke.example.com", path="/")
    assert client.post("/__room", json={}).status_code == 401


def test_session_expiry(client, app):
    sign_in(client)
    app.state.store.db.execute("UPDATE sessions SET expires=?", (time.time() - 1,))
    app.state.store.db.commit()
    assert client.post("/__room", json={}).status_code == 401


def test_host_origin_and_content_type_checks(client):
    sign_in(client)
    assert client.get("/healthz", headers={"Host": "evil.example"}).status_code == 400
    assert client.post("/__room", json={}, headers={"Origin": "https://evil.example"}).status_code == 403
    assert client.post("/__room", json={}, headers={"Origin": "null"}).status_code == 403
    assert client.post("/__room", content="{}", headers={"Content-Type": "text/plain"}).status_code == 415
    assert client.options("/__room").status_code == 405
    assert client.get("/healthz").headers.get("access-control-allow-origin") is None
    client.headers.pop("origin")
    assert client.post("/__room", json={}).status_code == 403


def test_two_rooms_isolated_and_viewers_cannot_write(client):
    sign_in(client)
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


def test_token_rotation_and_room_deletion(client):
    sign_in(client)
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
    sign_in(client)
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
    sign_in(client)
    info = room(client)
    claim(client, info["room"])
    assert client.post(f'/__lyric-state?room={info["room"]}', json={"writerId": "writer-A", field: value}).status_code == 400


def test_json_errors_and_size_limit(client):
    sign_in(client)
    info = room(client)
    endpoint = f'/__lyric-state?room={info["room"]}'
    for body in ('{"time":NaN}', '[]', '{', '{"time":Infinity}'):
        assert client.post(endpoint, content=body, headers={"Content-Type": "application/json"}).status_code == 400
    assert client.post(endpoint, content='x'*(server.MAX_BODY+1), headers={"Content-Type": "application/json"}).status_code == 413
    chunks = iter([b'x'*131072, b'x'*131072, b'x'])
    assert client.post(endpoint, content=chunks, headers={"Content-Type": "application/json"}).status_code == 413


def test_frontend_default_snapshot_is_accepted(client):
    sign_in(client)
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
    response = client.get("/manokara-login.html")
    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["cache-control"] == "no-store"
    assert "default-src 'none'" in response.headers["content-security-policy"]
    assert "unsafe-eval" not in response.headers["content-security-policy"]
    assert response.headers["strict-transport-security"] == "max-age=31536000"
    sign_in(client)
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


def test_login_rate_limit_and_wrong_password(client):
    for _ in range(5):
        assert client.post("/__login", json={"password": "incorrect"}).status_code == 401
    response = client.post("/__login", json={"password": PASSWORD})
    assert response.status_code == 429
    assert response.headers["retry-after"] == "15"


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


def test_rooms_and_view_tokens_survive_restart_and_password_change_revokes_sessions(tmp_path):
    settings = server.Settings(ORIGIN, HASH, tmp_path)
    first = server.create_app(settings)
    with TestClient(first, base_url=ORIGIN, headers={"Origin": ORIGIN}) as client:
        sign_in(client)
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
    third = server.create_app(server.Settings(ORIGIN, server.password_hash("new-password-for-test"), tmp_path))
    with TestClient(third, base_url=ORIGIN, headers={"Origin": ORIGIN}) as client:
        client.cookies.set("__Host-manokara_session", cookie, domain="karaoke.example.com", path="/")
        assert client.post("/__room", json={"room": info["room"]}).status_code == 401


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
    sign_in(client)
    info = room(client)
    endpoint = f'/__lyric-state?room={info["room"]}'
    assert client.post(endpoint, json={"writerId": "writer-A", "ready": True, "time": 4,
                                       "sampledAt": 1, "timelineVersion": 7}).status_code == 200
    app.state.store.live[info["room"]]["received_at"] -= 2
    state = client.get(endpoint).json()
    assert 2000 <= state["stateAgeMs"] < 3000
    assert state["time"] == 4 and state["timelineVersion"] == 7
    assert client.post(endpoint, json={"writerId": "writer-A", "stateAgeMs": 0}).status_code == 400


def test_login_redirect_preserves_valid_room_only(client):
    valid = "a" * 32
    assert client.get('/?room=' + valid).headers['location'] == '/manokara-login.html?room=' + valid
    assert client.get('/?room=https://evil.example').headers['location'] == '/manokara-login.html'


def test_public_hashed_bundles_cache_but_private_state_does_not(client):
    asset = next(path for path in server.asset_manifest() if path.startswith('/folia-assets/') and path.endswith('.js'))
    assert client.get(asset).headers['cache-control'] == 'public, max-age=31536000, immutable'
    assert client.get('/manokara-obs.html').headers['cache-control'] == 'no-store'
    assert client.get('/folia-assets/missing.js').headers['cache-control'] == 'no-store'
    assert client.get('/sources/FOLIA-INTEGRATION-SOURCE/ObsWebSourceApp.tsx').status_code == 200
