"""Backend boundaries, compatible launcher, resource ownership and relay races."""
import asyncio
import importlib
import inspect
import json
import os
from pathlib import Path
import socket
import sqlite3
import subprocess
import sys
import time
import urllib.request

import pytest
from starlette.exceptions import HTTPException

from test_security import server, ORIGIN
from server.app import create_app
from server.config import Settings, ROOT
from server.repositories.rooms import Store
from server.runtime import Runtime
from server.services.media import MediaSettings

PROJECT = Path(__file__).parents[1]


def make_runtime(tmp_path):
    runtime = Runtime.create(Settings(ORIGIN, tmp_path), media_settings=MediaSettings())
    token = runtime.store.start_session(None)
    digest = runtime.store.session(token)
    room = runtime.store.create_room(digest)
    return runtime, token, digest, room


def scope(path, room, token, *, method="POST"):
    return {"type": "http", "asgi": {"version": "3.0", "spec_version": "2.4"},
            "http_version": "1.1", "method": method, "scheme": "https", "path": path,
            "raw_path": path.encode(), "query_string": ("room=" + room).encode(), "root_path": "",
            "headers": [(b"host", b"karaoke.example.com"), (b"origin", ORIGIN.encode()),
                        (b"cookie", ("__Host-manokara_session=" + token).encode()),
                        (b"content-type", b"application/json")],
            "server": ("karaoke.example.com", 443), "client": ("127.0.0.1", 1234)}


def test_legacy_imports_retain_canonical_symbol_identity_and_asset_root():
    assert server.create_app is create_app
    assert server.Settings is Settings and server.Store is Store
    assert ROOT == PROJECT / "outputs" and server.ROOT == ROOT
    assert importlib.import_module('manokara_media') is importlib.import_module('server.services.media')
    assert importlib.import_module('manokara_overlay') is importlib.import_module('server.schemas.overlay')
    from server.schemas.snapshot import snapshot
    assert server.snapshot is snapshot
    assert not inspect.iscoroutinefunction(server.Store.create_room)


def test_routes_retain_paths_names_methods_and_security_middleware(tmp_path):
    app = create_app(Settings(ORIGIN, tmp_path), media_settings=MediaSettings())
    expected = [
        ('/__session', {'POST'}, 'open_session'), ('/__room', {'POST'}, 'room_info'),
        ('/__room/rotate', {'POST'}, 'room_change'), ('/__room/delete', {'POST'}, 'room_change'),
        ('/__lyric-owner', {'POST'}, 'relay_owner'), ('/__lyric-state', {'GET', 'HEAD', 'POST'}, 'relay_state'),
        ('/__youtube', {'POST'}, 'youtube_lookup'), ('/__youtube/title', {'POST'}, 'youtube_title'),
        ('/__youtube/search', {'POST'}, 'youtube_search'), ('/__youtube/media', {'GET', 'HEAD'}, 'youtube_media'),
        ('/healthz', {'GET', 'HEAD'}, 'health'), ('/{path:path}', {'GET', 'HEAD'}, 'assets')]
    try:
        assert [(route.path, route.methods, route.name) for route in app.routes] == expected
        assert app.state.store.live is app.state.relay.rooms
        assert app.user_middleware[0].cls is server.SecurityHeaders
        for route in app.routes:
            assert route.endpoint.__module__.startswith('server.routes.')
        assert not hasattr(app.state.store, 'stream_state')
    finally:
        asyncio.run(app.state.runtime.close())


def test_import_from_outside_project_never_opens_database_or_validates_env(tmp_path):
    script = '''
import sys, sqlite3, os
from pathlib import Path
def forbidden(*a,**kw): raise AssertionError('Import opened SQLite')
sqlite3.connect=forbidden
sys.path.insert(0,str(Path(sys.argv[1])/'outputs'))
import manokara_server, manokara_media, manokara_overlay
assert manokara_server.ROOT==Path(sys.argv[1])/'outputs'
assert not Path(os.environ['MANOKARA_DATA_DIR']).exists()
'''
    env = {**os.environ, 'MANOKARA_ORIGIN': 'invalid-origin', 'MANOKARA_DATA_DIR': str(tmp_path / 'not-created')}
    result = subprocess.run([sys.executable, '-c', script, str(PROJECT)], cwd=tmp_path, env=env,
                            capture_output=True, text=True, timeout=20)
    assert result.returncode == 0, result.stderr


def test_optional_tool_validation_precedes_opening_sqlite(tmp_path, monkeypatch):
    opened = []
    def invalid(cls):
        raise ValueError('Invalid tool configuration')
    monkeypatch.setattr(MediaSettings, 'from_env', classmethod(invalid))
    with pytest.raises(ValueError, match='Invalid tool'):
        create_app(Settings(ORIGIN, tmp_path), store_factory=lambda settings: opened.append(settings))
    assert opened == [] and not (tmp_path / 'relay.sqlite3').exists()


def test_factory_failure_closes_already_open_repository(tmp_path):
    stores = []
    def factory(settings):
        store = Store(settings)
        stores.append(store)
        return store
    def broken(settings):
        raise RuntimeError('Cannot construct media service')
    with pytest.raises(RuntimeError, match='construct media'):
        create_app(Settings(ORIGIN, tmp_path), media_settings=MediaSettings(),
                   store_factory=factory, media_factory=broken)
    assert stores[0].closed
    with pytest.raises(sqlite3.ProgrammingError):
        stores[0].db.execute('SELECT 1')


def test_repository_initialization_failure_closes_connection(tmp_path, monkeypatch):
    connections, original = [], sqlite3.connect
    def connect(*args, **kwargs):
        connection = original(*args, **kwargs)
        connections.append(connection)
        return connection
    def broken(self):
        raise sqlite3.DatabaseError('Bad database schema')
    monkeypatch.setattr(sqlite3, 'connect', connect)
    monkeypatch.setattr(Store, '_initialize', broken)
    with pytest.raises(ValueError, match='MANOKARA_DATA_DIR'):
        Store(Settings(ORIGIN, tmp_path))
    with pytest.raises(sqlite3.ProgrammingError):
        connections[0].execute('SELECT 1')


@pytest.mark.parametrize('failure', [RuntimeError, asyncio.CancelledError])
def test_shutdown_closes_repository_even_when_media_cleanup_fails(tmp_path, failure):
    class FailingMedia:
        calls = 0
        def __init__(self, settings):
            pass
        async def close(self):
            self.calls += 1
            raise failure()
    runtime = Runtime.create(Settings(ORIGIN, tmp_path), media_settings=MediaSettings(), media_factory=FailingMedia)
    async def run():
        with pytest.raises(failure):
            await runtime.close()
        assert runtime.store.closed and runtime.relay.closed
        await runtime.close()
        assert runtime.media.calls == 1
    asyncio.run(run())


def test_application_instances_do_not_share_limits_scenes_or_media(tmp_path):
    a, token, _, room = make_runtime(tmp_path / 'a')
    b, _, _, _ = make_runtime(tmp_path / 'b')
    try:
        a.relay.publish(room, {'writerId': 'a', 'ready': True, 'title': 'Private A'})
        a.relay.reserve_stream(room).release()
        assert b.relay.rooms == {} and b.relay.active_streams == {}
        assert a.limiter is not b.limiter and a.media is not b.media
        assert a.store.secret != b.store.secret
        with pytest.raises(HTTPException) as error:
            b.relay.authorize_reader(room, token, '')
        assert error.value.status_code == 404
    finally:
        asyncio.run(a.close())
        asyncio.run(b.close())


def test_relay_clock_patch_full_replacement_and_paused_rotation(tmp_path):
    runtime, token, digest, room = make_runtime(tmp_path)
    now = [100.0]
    relay = runtime.relay
    relay.clock = lambda: now[0]
    assert not inspect.iscoroutinefunction(relay.publish)
    assert not inspect.iscoroutinefunction(relay.claim)
    async def run():
        stream = None
        try:
            relay.publish(room, {'writerId': 'a', 'ready': True, 'title': 'First', 'lrc': '[00:00]Text',
                                 'playing': False, 'time': 1, 'uploadDelayMs': 70})
            lease = relay.reserve_stream(room)
            stream = relay.stream_state(lease, token, '')
            now[0] += 2
            packet = json.loads((await anext(stream)).removeprefix('data: '))
            assert packet['state']['stateAgeMs'] == 2070
            assert 'writerId' not in packet['state'] and 'uploadDelayMs' not in packet['state']
            relay.publish(room, {'writerId': 'a', 'time': 2}, partial=True)
            patch = json.loads((await anext(stream)).removeprefix('data: '))['patch']
            assert patch['time'] == 2 and 'lrc' not in patch
            relay.publish(room, {'writerId': 'a', 'ready': True, 'time': 3})
            packet = json.loads((await anext(stream)).removeprefix('data: '))
            assert 'state' in packet and 'title' not in packet['state']
            # Cookie-free viewer is revoked by rotation even with no playback updates.
            await stream.aclose()
            lease = relay.reserve_stream(room)
            old_token = runtime.store.view_token(room)
            stream = relay.stream_state(lease, None, 'Bearer ' + old_token)
            await anext(stream)
            runtime.rooms.rotate(room, digest)
            assert 'event: revoked' in await anext(stream)
            await stream.aclose()
            assert relay.active_streams == {}
            now[0] += 16
            with pytest.raises(HTTPException) as error:
                relay.publish(room, {'writerId': 'a', 'time': 4}, partial=True)
            assert error.value.status_code == 428
        finally:
            if stream:
                await stream.aclose()
            await runtime.close()
    asyncio.run(run())


def test_stream_capacity_is_bounded_per_room_and_process_and_release_is_idempotent(tmp_path):
    runtime, _, _, _ = make_runtime(tmp_path)
    relay = runtime.relay
    leases = [relay.reserve_stream(str(room)) for room in range(16) for _ in range(8)]
    try:
        for room in ('0', 'new-room'):
            with pytest.raises(HTTPException) as error:
                relay.reserve_stream(room)
            assert error.value.status_code == 429
        for lease in leases:
            lease.release()
            lease.release()
        assert relay.active_streams == {}
    finally:
        asyncio.run(runtime.close())


def test_token_rotation_resets_wake_generation_without_requiring_a_new_scene(tmp_path):
    runtime, _, digest, room = make_runtime(tmp_path)
    try:
        previous = runtime.relay.room(room)['changed']
        runtime.rooms.rotate(room, digest)
        current = runtime.relay.room(room)['changed']
        assert previous.is_set() and current is not previous and not current.is_set()
        runtime.relay.wake(room)
        assert current.is_set() and not runtime.relay.room(room)['changed'].is_set()
    finally:
        asyncio.run(runtime.close())


def test_authorized_stream_waits_after_rotation_then_receives_the_next_scene(tmp_path):
    runtime, _, digest, room = make_runtime(tmp_path)
    relay = runtime.relay
    async def run():
        stream, pending = None, None
        try:
            relay.publish(room, {'writerId':'a','ready':True,'time':1})
            runtime.rooms.rotate(room, digest)
            # Fail before starting a waiter if the event would spin without yielding.
            assert not relay.room(room)['changed'].is_set()
            authorization = 'Bearer ' + runtime.store.view_token(room)
            stream = relay.stream_state(relay.reserve_stream(room), None, authorization)
            assert json.loads((await anext(stream)).removeprefix('data: '))['state']['time'] == 1
            pending = asyncio.create_task(anext(stream))
            await asyncio.sleep(.01)
            assert not pending.done()
            relay.publish(room, {'writerId':'a','time':2}, partial=True)
            assert json.loads((await asyncio.wait_for(pending, 1)).removeprefix('data: '))['patch']['time'] == 2
        finally:
            if pending and not pending.done():
                pending.cancel()
                await asyncio.gather(pending, return_exceptions=True)
            if stream:
                await stream.aclose()
            await runtime.close()
    asyncio.run(run())


@pytest.mark.parametrize('change', ['deleted', 'expired', 'shutdown'])
def test_waiting_stream_wakes_on_room_removal_or_shutdown_without_reading_a_closed_db(tmp_path, change):
    runtime, _, digest, room = make_runtime(tmp_path)
    relay, pending = runtime.relay, None
    authorization = 'Bearer ' + runtime.store.view_token(room)
    async def run():
        nonlocal pending
        stream = relay.stream_state(relay.reserve_stream(room), None, authorization)
        try:
            await anext(stream)
            pending = asyncio.create_task(anext(stream))
            await asyncio.sleep(0)
            if change == 'deleted':
                runtime.rooms.delete(room, digest)
            elif change == 'expired':
                runtime.store.db.execute('UPDATE sessions SET expires=0')
                runtime.store.db.commit()
                runtime.store.cleanup()
            else:
                await runtime.close()
            assert 'event: revoked' in await asyncio.wait_for(pending, .5)
            await stream.aclose()
            assert relay.active_streams == {}
            if change != 'shutdown':
                assert room not in relay.rooms
        finally:
            if pending and not pending.done():
                pending.cancel()
                await asyncio.gather(pending, return_exceptions=True)
            await stream.aclose()
            await runtime.close()
    asyncio.run(run())


@pytest.mark.parametrize('failure', [OSError, asyncio.CancelledError])
def test_failed_sse_headers_do_not_leak_capacity(tmp_path, failure):
    app = create_app(Settings(ORIGIN, tmp_path), media_settings=MediaSettings())
    runtime = app.state.runtime
    token = runtime.store.start_session(None)
    room = runtime.store.create_room(runtime.store.session(token))
    request_scope = scope('/__lyric-state', room, token, method='GET')
    request_scope['query_string'] += b'&stream=1'
    async def run():
        async def receive():
            return {'type': 'http.request', 'body': b'', 'more_body': False}
        async def send(message):
            raise failure()
        try:
            for _ in range(10):
                if failure is asyncio.CancelledError:
                    with pytest.raises(asyncio.CancelledError):
                        await app(request_scope, receive, send)
                else:
                    await app(request_scope, receive, send)
                assert runtime.relay.active_streams == {}
        finally:
            await runtime.close()
    asyncio.run(run())


def test_new_backend_sources_are_not_public_assets(tmp_path):
    from starlette.testclient import TestClient
    app = create_app(Settings(ORIGIN, tmp_path), media_settings=MediaSettings())
    with TestClient(app, base_url=ORIGIN) as client:
        for path in ('/server/app.py', '/server/runtime.py', '/server/config.py',
                     '/server/services/media.py', '/server/repositories/rooms.py',
                     '/server/security/middleware.py', '/outputs/manokara_server.py'):
            assert client.get(path).status_code == 404


@pytest.mark.parametrize('path', ['/__lyric-state', '/__lyric-owner'])
@pytest.mark.parametrize('change', ['deleted', 'expired'])
def test_room_permission_is_rechecked_after_streamed_request_body(tmp_path, path, change):
    app = create_app(Settings(ORIGIN, tmp_path), media_settings=MediaSettings())
    runtime = app.state.runtime
    token = runtime.store.start_session(None)
    digest = runtime.store.session(token)
    room = runtime.store.create_room(digest)
    runtime.relay.publish(room, {'writerId': 'current', 'ready': True, 'title': 'Keep me'})
    previous = dict(runtime.relay.rooms[room])
    body = json.dumps({'writerId': 'other', 'action': 'claim'} if path.endswith('owner')
                      else {'writerId': 'current', 'title': 'Late upload'}).encode()
    messages, count = [], 0
    async def receive():
        nonlocal count
        count += 1
        if count == 1:
            return {'type': 'http.request', 'body': body[:-1], 'more_body': True}
        if change == 'deleted':
            runtime.rooms.delete(room, digest)
        else:
            runtime.store.db.execute('UPDATE sessions SET expires=0')
            runtime.store.db.commit()
        return {'type': 'http.request', 'body': body[-1:], 'more_body': False}
    async def send(message):
        messages.append(message)
    async def run():
        try:
            await app(scope(path, room, token), receive, send)
            assert messages[0]['status'] == 404
            if change == 'deleted':
                assert room not in runtime.relay.rooms
            else:
                assert runtime.relay.rooms[room] == previous
        finally:
            await runtime.close()
    asyncio.run(run())


def test_session_expiry_during_room_creation_does_not_allocate_an_orphan(tmp_path):
    app = create_app(Settings(ORIGIN, tmp_path), media_settings=MediaSettings())
    runtime = app.state.runtime
    token = runtime.store.start_session(None)
    messages = []
    async def receive():
        runtime.store.db.execute('UPDATE sessions SET expires=0')
        runtime.store.db.commit()
        return {'type': 'http.request', 'body': b'{}', 'more_body': False}
    async def send(message):
        messages.append(message)
    async def run():
        try:
            await app(scope('/__room', '', token), receive, send)
            assert messages[0]['status'] == 401
            assert runtime.store.db.execute('SELECT count(*) FROM rooms').fetchone()[0] == 0
        finally:
            await runtime.close()
    asyncio.run(run())


def test_compatibility_launcher_serves_from_an_unrelated_working_directory(tmp_path):
    with socket.socket() as listener:
        listener.bind(('127.0.0.1', 0))
        port = listener.getsockname()[1]
    origin = f'http://127.0.0.1:{port}'
    env = {**os.environ, 'MANOKARA_ORIGIN': origin, 'MANOKARA_ALLOW_HTTP': '1', 'MANOKARA_PORT': str(port),
           'MANOKARA_DATA_DIR': str(tmp_path / 'state'), 'MANOKARA_YTDLP_ENABLED': '0',
           'MANOKARA_YTDLP_FIREFOX_COOKIES': '0', 'MANOKARA_YTDLP_FIREFOX_PROFILE': '',
           'MANOKARA_YTDLP_IMPERSONATE': '', 'MANOKARA_YTDLP_JS_RUNTIME': 'node'}
    process = subprocess.Popen([sys.executable, str(PROJECT / 'outputs/manokara_server.py')], cwd=tmp_path,
                               env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    try:
        deadline, response = time.monotonic() + 15, None
        while process.poll() is None and time.monotonic() < deadline:
            try:
                with urllib.request.urlopen(origin + '/healthz', timeout=.5) as result:
                    response = json.loads(result.read())
                break
            except OSError:
                time.sleep(.05)
        assert response == {'ok': True}
        assert (tmp_path / 'state/relay.sqlite3').is_file()
        with urllib.request.urlopen(origin + '/manokara.html', timeout=2) as result:
            assert result.status == 200 and b'manokara-react.js' in result.read()
    finally:
        process.terminate()
        try:
            process.communicate(timeout=10)
        except subprocess.TimeoutExpired:
            process.kill()
            process.communicate(timeout=5)
