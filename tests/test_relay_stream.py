"""Exercise the real ASGI streaming response, avoiding a buffering TestClient transport."""
import asyncio
import json

import httpx

from test_security import server, ORIGIN


def test_stream_pushes_compact_updates_and_revokes_viewer(tmp_path):
    async def run():
        app = server.create_app(server.Settings(ORIGIN, tmp_path))
        async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url=ORIGIN,
                                     headers={"Origin": ORIGIN}) as controller:
            await controller.post('/__session', json={})
            info = (await controller.post('/__room', json={})).json()
            room = info['room']
            # Viewer token is stored in the URL fragment, never sent in an HTTP URL.
            token = app.state.store.view_token(room)
            endpoint = f'/__lyric-state?room={room}'
            initial = {'writerId':'stream-test', 'ready':True, 'title':'Song', 'lrc':'[00:00]Hello', 'time':1,
                       'playing':True, 'uploadDelayMs':90, 'audioBass':.5}
            assert (await controller.post(endpoint, json=initial)).status_code == 200
            response = (await controller.get(endpoint)).json()
            assert 90 <= response['stateAgeMs'] < 1000
            assert 'uploadDelayMs' not in response
            queue = asyncio.Queue()
            started = False

            async def receive():
                nonlocal started
                if not started:
                    started = True
                    return {'type':'http.request', 'body':b'', 'more_body':False}
                await asyncio.Event().wait()

            async def send(message):
                await queue.put(message)

            scope = {'type':'http', 'asgi':{'version':'3.0','spec_version':'2.3'}, 'http_version':'1.1',
                     'method':'GET','scheme':'https','path':'/__lyric-state','raw_path':b'/__lyric-state',
                     'query_string':f'room={room}&stream=1'.encode(), 'root_path':'',
                     'headers':[(b'host',b'karaoke.example.com'),(b'authorization',('Bearer '+token).encode())],
                     'server':('karaoke.example.com',443),'client':('127.0.0.1',1234)}
            task = asyncio.create_task(app(scope, receive, send))
            try:
                start = await asyncio.wait_for(queue.get(), 2)
                assert start['status'] == 200
                assert b'text/event-stream' in dict(start['headers'])[b'content-type']
                first = await asyncio.wait_for(queue.get(), 2)
                packet = json.loads(first['body'].decode().split('data: ',1)[1])
                assert packet['state']['lrc'] == initial['lrc']
                assert (await controller.post(endpoint+'&patch=1',json={'writerId':'stream-test','time':1.2,'audioBass':.8})).status_code == 200
                update = await asyncio.wait_for(queue.get(), 2)
                packet = json.loads(update['body'].decode().split('data: ',1)[1])
                assert packet['patch']['time'] == 1.2
                assert packet['patch']['audioBass'] == .8
                assert 'lrc' not in packet['patch']
                assert (await controller.get(endpoint)).json()['lrc'] == initial['lrc']
                assert (await controller.post(endpoint+'&patch=1',json={'writerId':'other-tab','time':3})).status_code == 409
                await controller.post('/__room/rotate', json={'room':room})
                # Rotation itself wakes the stream, even while playback is paused.
                revoked = await asyncio.wait_for(queue.get(), 2)
                assert b'event: revoked' in revoked['body']
            finally:
                task.cancel()
                try:
                    await task
                except asyncio.CancelledError:
                    pass
                app.state.store.db.close()
    asyncio.run(run())
