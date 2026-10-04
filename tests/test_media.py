"""Public video relay boundaries and actual subprocess cleanup (no YouTube network)."""

import asyncio
from pathlib import Path
import sys
import time

import pytest
from starlette.exceptions import HTTPException
from starlette.requests import ClientDisconnect
from starlette.testclient import TestClient

sys.path.insert(0, str(Path(__file__).parents[1] / "outputs"))
import manokara_media as media
import manokara_server as backend

ORIGIN = "https://karaoke.example.com"
VIDEO = "ju03AIeny2Q"


def metadata():
    return {"id": VIDEO, "duration": 213, "availability": "public", "age_limit": 0,
            "formats": [
                {"format_id": "136", "protocol": "https", "height": 720, "ext": "mp4", "vcodec": "avc1.4d401f", "acodec": "none", "url": "https://r1.googlevideo.com/video"},
                {"format_id": "140", "protocol": "https", "ext": "m4a", "vcodec": "none", "acodec": "mp4a.40.2", "url": "https://r1.googlevideo.com/audio"},
                {"format_id": "232", "protocol": "m3u8_native", "height": 720, "ext": "mp4", "vcodec": "avc1.4d401f", "acodec": "none", "url": "https://manifest.googlevideo.com/video"},
                {"format_id": "234", "protocol": "m3u8_native", "ext": "mp4", "vcodec": "none", "acodec": None, "url": "https://manifest.googlevideo.com/audio"},
            ]}


def test_format_selection_keeps_only_safe_media_and_prefers_hls():
    info = metadata()
    info.update({"webpage_url": "https://example.com/evil", "subtitles": {"en": []}, "_filename": "/tmp/secret", "description": "large"})
    info["formats"].append({**info["formats"][2], "format_id": "270", "height": 1080})
    chosen = media.select_formats(info, VIDEO)
    assert [f["format_id"] for f in chosen["formats"]] == ["232", "234"]
    assert not {"webpage_url", "subtitles", "_filename", "description"} & chosen.keys()
    assert media.select_formats({**info, "formats": info["formats"][:2]}, VIDEO)["formats"][0]["format_id"] == "136"


@pytest.mark.parametrize("field,value", [("availability", "private"), ("availability", "subscriber_only"),
    ("availability", "premium_only"), ("age_limit", 18), ("is_live", True), ("has_drm", True),
    ("duration", float("nan")), ("duration", 7201), ("duration", 0), ("id", "FrfyqKgHpA4"), ("_type", "playlist")])
def test_restricted_and_unbounded_media_is_rejected(field, value):
    info = metadata()
    info[field] = value
    with pytest.raises(HTTPException) as error:
        media.select_formats(info, VIDEO)
    assert error.value.status_code == 422


@pytest.mark.parametrize("address", ["file:///etc/passwd", "http://r1.googlevideo.com/video",
    "https://r1.googlevideo.com.evil.example/video", "https://127.0.0.1/video", "https://r1.googlevideo.com:444/video",
    "https://user:secret@r1.googlevideo.com/video", "https://r1.googlevideo.com/video#secret", "https://[invalid/video"])
def test_stream_addresses_are_restricted_to_google_https(address):
    with pytest.raises(HTTPException):
        media.media_url(address)


def test_browser_cookies_are_only_server_configuration(monkeypatch):
    monkeypatch.setenv("MANOKARA_YTDLP_ENABLED", "0")
    monkeypatch.setenv("MANOKARA_YTDLP_FIREFOX_COOKIES", "1")
    monkeypatch.setenv("MANOKARA_YTDLP_FIREFOX_PROFILE", "/home/app/.mozilla/firefox/dedicated")
    monkeypatch.setenv("MANOKARA_YTDLP_IMPERSONATE", "chrome")
    settings = media.MediaSettings.from_env()
    args = media.command(settings)
    index = args.index("--cookies-from-browser")
    assert args[index + 1] == "firefox:/home/app/.mozilla/firefox/dedicated"
    assert "--ignore-config" in args and "--no-plugin-dirs" in args and "--no-cache-dir" in args
    assert "--cookies" not in args
    assert args[args.index("--impersonate") + 1] == "chrome"
    monkeypatch.setenv("MANOKARA_YTDLP_FIREFOX_PROFILE", "profile\n--exec malicious")
    with pytest.raises(ValueError):
        media.MediaSettings.from_env()


def test_media_tickets_require_the_same_room_and_browser():
    service = media.MediaService(media.MediaSettings())
    service.tickets["token"] = {"room": "room-A", "digest": "visitor-A", "expires": time.monotonic() + 60}
    assert service.get_ticket("token", "room-A", "visitor-A")
    for room, digest in [("room-B", "visitor-A"), ("room-A", "visitor-B")]:
        with pytest.raises(HTTPException):
            service.get_ticket("token", room, digest)
    service.tickets["token"]["expires"] = 0
    with pytest.raises(HTTPException):
        service.get_ticket("token", "room-A", "visitor-A")


def test_real_lookup_process_is_reaped_on_success_and_size_failure(monkeypatch):
    async def run():
        service = media.MediaService(media.MediaSettings())
        assert await service.capture([sys.executable, "-c", "print('{\"ok\":true}')"]) == {"ok": True}
        assert not service.processes
        monkeypatch.setattr(media, "MAX_METADATA", 64)
        with pytest.raises(HTTPException) as error:
            await service.capture([sys.executable, "-c", "import sys,time; sys.stdout.write('x'*1000); sys.stdout.flush(); time.sleep(30)"])
        assert error.value.status_code == 502
        assert not service.processes
    asyncio.run(run())


def test_stream_disconnect_reaps_process_and_releases_capacity():
    async def run():
        service = media.MediaService(media.MediaSettings())
        process = await service.spawn([sys.executable, "-c", "import time; time.sleep(30)"])
        service.active["visitor"] = 1
        body = service.stream(process, b"initial media", "visitor", lambda: True)
        assert await anext(body) == b"initial media"
        await body.aclose()
        assert process.returncode is not None and not service.processes and not service.active
    asyncio.run(run())


@pytest.mark.parametrize("failure", ["headers", "disconnect"])
def test_http_stream_failures_reap_processes_and_release_capacity(failure):
    async def run():
        service = media.MediaService(media.MediaSettings())
        process = await service.spawn([sys.executable, "-c", "import time; time.sleep(30)"])
        service.active["visitor"] = 1
        response = media.MediaResponse(service, process, b"initial media", "visitor", lambda: True)
        sent_body = asyncio.Event()

        async def receive():
            await sent_body.wait()
            return {"type": "http.disconnect"}

        async def send(message):
            if failure == "headers":
                raise OSError("Connection closed before response headers.")
            if message["type"] == "http.response.body":
                sent_body.set()

        scope = {"type": "http", "asgi": {"spec_version": "2.4" if failure == "headers" else "2.3"}}
        if failure == "headers":
            with pytest.raises(ClientDisconnect):
                await response(scope, receive, send)
        else:
            await asyncio.wait_for(response(scope, receive, send), 5)
        assert process.returncode is not None and not service.processes and not service.active
    asyncio.run(run())


def test_cookie_free_viewers_and_other_visitors_cannot_use_video_relay(tmp_path, monkeypatch):
    monkeypatch.setenv("MANOKARA_YTDLP_ENABLED", "0")
    app = backend.create_app(backend.Settings(ORIGIN, tmp_path))
    with TestClient(app, base_url=ORIGIN, headers={"Origin": ORIGIN}) as client:
        assert client.post("/__youtube", json={"videoId": VIDEO}).status_code == 401
        client.post("/__session", json={})
        room = client.post("/__room", json={}).json()
        endpoint = "/__youtube?room=" + room["room"]
        assert client.post(endpoint, json={"videoId": VIDEO}).status_code == 503
        assert client.post(endpoint, json={"videoId": VIDEO, "cookies": "secret"}).status_code == 400
        client.cookies.clear()
        view = {"Authorization": "Bearer " + room["viewToken"]}
        assert client.post(endpoint, json={"videoId": VIDEO}, headers=view).status_code == 401
        assert client.get("/__youtube/media?room=" + room["room"], headers=view).status_code == 401
        client.post("/__session", json={})
        assert client.post(endpoint, json={"videoId": VIDEO}).status_code == 404
        assert client.get("/__youtube/media?room=" + room["room"]).status_code == 404


def test_stream_limits_and_invalid_start_do_not_launch_processes():
    async def run():
        service = media.MediaService(media.MediaSettings(enabled=True))
        service.tickets["token"] = {"room": "room", "digest": "visitor", "expires": time.monotonic() + 60, "metadata": {"duration": 30}}
        for start in (-1, float("inf"), 30):
            with pytest.raises(HTTPException) as error:
                await service.open("token", "room", "visitor", start)
            assert error.value.status_code == 400
        service.active["visitor"] = 2
        with pytest.raises(HTTPException) as error:
            await service.open("token", "room", "visitor", 0)
        assert error.value.status_code == 429
        assert not service.processes
    asyncio.run(run())


def test_media_head_returns_video_headers_without_launching_a_process(tmp_path, monkeypatch):
    monkeypatch.setenv("MANOKARA_YTDLP_ENABLED", "0")
    app = backend.create_app(backend.Settings(ORIGIN, tmp_path))
    with TestClient(app, base_url=ORIGIN, headers={"Origin": ORIGIN}) as client:
        client.post("/__session", json={})
        room = client.post("/__room", json={}).json()["room"]
        digest = app.state.store.session(client.cookies[app.state.settings.cookie])
        ticket = "a" * 32
        app.state.media.tickets[ticket] = {"room": room, "digest": digest, "expires": time.monotonic() + 60}
        response = client.head(f"/__youtube/media?room={room}&ticket={ticket}")
        assert response.status_code == 200 and response.content == b""
        assert response.headers["content-type"] == "video/mp4"
        assert response.headers["cache-control"] == "no-store"
        assert not app.state.media.processes
