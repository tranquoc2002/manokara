"""Repeatable local Chromium measurements; isolated fixtures, no production diagnostics."""
import argparse
from contextlib import contextmanager
import hashlib
import json
import os
from pathlib import Path
import socket
import sys
import tempfile
import threading
import time

import uvicorn
from playwright.sync_api import sync_playwright

PROJECT = Path(__file__).parents[1]
sys.path.insert(0, str(PROJECT / 'outputs'))
import manokara_server as backend
from browser_cases import YOUTUBE_FIXTURE


class WireMeasurements:
    def __init__(self, app):
        self.app, self.lock = app, threading.Lock()
        self.data = None

    def start(self):
        with self.lock:
            self.data = dict(posts=0, patchPosts=0, uploadBytes=0, sseChunks=0, sseBytes=0, postDurationsMs=[])

    def finish(self):
        with self.lock:
            data, self.data = self.data, None
            return data

    async def __call__(self, scope, receive, send):
        if scope['type'] != 'http' or scope['path'] != '/__lyric-state':
            return await self.app(scope, receive, send)
        post = scope['method'] == 'POST'
        stream = scope['method'] == 'GET' and b'stream=1' in scope.get('query_string', b'')
        started = time.perf_counter()
        async def incoming():
            message = await receive()
            if post:
                with self.lock:
                    if self.data is not None:
                        self.data['uploadBytes'] += len(message.get('body', b''))
            return message
        async def outgoing(message):
            with self.lock:
                if self.data is not None:
                    if post and message['type'] == 'http.response.start':
                        self.data['posts'] += 1
                        self.data['patchPosts'] += b'patch=1' in scope.get('query_string', b'')
                        self.data['postDurationsMs'].append((time.perf_counter()-started)*1000)
                    if stream and message['type'] == 'http.response.body' and message.get('body'):
                        self.data['sseChunks'] += 1
                        self.data['sseBytes'] += len(message['body'])
            await send(message)
        await self.app(scope, incoming, outgoing)


@contextmanager
def isolated_server():
    listener = socket.socket()
    listener.bind(('127.0.0.1', 0))
    origin = f'http://127.0.0.1:{listener.getsockname()[1]}'
    with tempfile.TemporaryDirectory() as state:
        app = backend.create_app(backend.Settings(origin, Path(state), True), media_settings=backend.MediaSettings())
        wire = WireMeasurements(app)
        server = uvicorn.Server(uvicorn.Config(wire, access_log=False, log_level='warning', proxy_headers=False,
                                              timeout_keep_alive=1, timeout_graceful_shutdown=10))
        thread = threading.Thread(target=server.run, kwargs={'sockets': [listener]}, daemon=True)
        thread.start()
        deadline = time.monotonic()+30
        while not server.started and thread.is_alive() and time.monotonic()<deadline:
            time.sleep(.02)
        if not server.started:
            server.should_exit=True
            thread.join(15)
            raise AssertionError('Benchmark server startup failed')
        try:
            yield origin, wire
        finally:
            server.should_exit=True
            thread.join(15)
            listener.close()
            assert not thread.is_alive(), 'Benchmark server did not shut down'


def read_metrics(session):
    return {item['name']: item['value'] for item in session.send('Performance.getMetrics')['metrics']}


def difference(before, after, elapsed):
    counters = ('TaskDuration', 'ScriptDuration', 'LayoutDuration', 'RecalcStyleDuration', 'LayoutCount', 'RecalcStyleCount')
    values = {key: after.get(key,0)-before.get(key,0) for key in counters}
    values['mainThreadBusyPercent'] = values['TaskDuration']/elapsed*100
    values['heapUsedBytes'] = after.get('JSHeapUsedSize')
    values['nodes'] = after.get('Nodes')
    return values


def frame_results(page):
    result = []
    for index, frame in enumerate(page.frames):
        result.append(dict(index=index, document=frame.url.split('/')[-1].split('?')[0].split('#')[0],
                           **frame.evaluate('__manokaraBench.finish()')))
    return result


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',required=True)
    parser.add_argument('--label',default='local')
    parser.add_argument('--seconds',type=float,default=6)
    parser.add_argument('--repeats',type=int,default=3)
    parser.add_argument('--cases',nargs='+',default=['idle','clean','stage','folia','studio'])
    parser.add_argument('--controller-bundle', help='Optional saved controller bundle for a baseline replay; no file is overwritten.')
    args=parser.parse_args()
    assert 2<=args.seconds<=60 and 1<=args.repeats<=10
    assert set(args.cases)<={'idle','clean','stage','folia','studio'}
    probe=(PROJECT/'tests/performance_probe.js').read_text(encoding='utf-8')
    lyrics='\n'.join(f'[{int(i*.4)//60:02}:{i*.4%60:05.2f}]A measured lyric line {i:03} — Cùng hát theo lời bài hát' for i in range(240))
    songs=[dict(title=f'Benchmark song {i:03}',url='https://www.youtube.com/watch?v=dz3sM6ygX_g',
                lrc=lyrics if i==0 else '[00:00]Another song',pitch=0,off=0,librarySync=False) for i in range(100)]
    fixture=YOUTUBE_FIXTURE.replace('getDuration() { return 120; }','getDuration() { return 600; }')
    results, errors=[],[]
    with isolated_server() as (origin,wire), sync_playwright() as playwright:
        flags=['--autoplay-policy=no-user-gesture-required','--disable-background-timer-throttling','--disable-renderer-backgrounding']
        browser=playwright.chromium.launch(executable_path=os.environ.get('MANOKARA_TEST_BROWSER') or None,args=flags)
        try:
            context=browser.new_context(viewport={'width':1920,'height':1080},locale='en-US',reduced_motion='no-preference')
            context.add_init_script(probe)
            context.add_init_script('localStorage.setItem("manokaraLanguage","en")')
            page=context.new_page()
            if args.controller_bundle:
                baseline_bundle=Path(args.controller_bundle).read_bytes()
                page.route('**/manokara-react.js',lambda route:route.fulfill(content_type='application/javascript',body=baseline_bundle))
            page.on('pageerror',lambda error:errors.append(str(error)))
            page.route('https://www.youtube.com/iframe_api',lambda route:route.fulfill(content_type='application/javascript',body=fixture))
            page.route('https://www.youtube.com/oembed?*',lambda route:route.fulfill(json={'title':'Benchmark song 000'}))
            page.goto(origin)
            page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
            page.evaluate('(songs)=>{localStorage.kpt2=JSON.stringify(songs);localStorage.kpt_set=JSON.stringify({cdn:0,fxv:1,lfx:"clean"})}',songs)
            page.reload()
            page.wait_for_function('()=>document.querySelector("#relayStatus").dataset.state==="connected"')
            viewer_context=browser.new_context(viewport={'width':1920,'height':1080},reduced_motion='no-preference')
            viewer_context.add_init_script(probe)
            viewer=viewer_context.new_page()
            viewer.on('pageerror',lambda error:errors.append(str(error)))
            viewer.goto(page.locator('#obsurl').input_value())
            viewer.wait_for_function('()=>window.ManokaraOutput')
            control_cdp=context.new_cdp_session(page)
            output_cdp=viewer_context.new_cdp_session(viewer)
            control_cdp.send('Performance.enable');output_cdp.send('Performance.enable')
            info=browser.new_browser_cdp_session().send('SystemInfo.getInfo')['gpu']
            gpu=[{key:item.get(key) for key in ('vendorString','deviceString')} for item in info['devices']]
            for repeat in range(args.repeats):
                for case in args.cases:
                    page.locator('#main-karaoke').click()
                    page.locator('#stageMediaButton').click()
                    page.locator('#stop').click()
                    page.locator('#lfx').select_option('folia-classic' if case=='folia' else 'clean')
                    if case!='idle':
                        page.locator('#list [data-a="go"]').first.click()
                        page.wait_for_function('()=>testYT?.getPlayerState()===1')
                        page.evaluate('testYT.seekTo(10)')
                    if case in ('stage','folia'):
                        page.locator('#stageLyricsButton').click()
                        page.frame_locator('#stageLyricsFrame').frame_locator('#lyricViewport').locator('#current').wait_for(state='attached')
                    if case=='folia':
                        viewer.frame_locator('#lyricViewport').frame_locator('#foliaFrame').locator('#root > *').first.wait_for(timeout=20000)
                    if case=='studio':
                        page.locator('#main-playlist').click()
                        page.locator('[data-overlay-tab="lyrics"]').click()
                        page.locator('#studioData').select_option('live')
                    page.wait_for_timeout(1800)
                    for surface in (page,viewer):
                        for frame in surface.frames: frame.evaluate('__manokaraBench.start()')
                    before_c, before_v=read_metrics(control_cdp),read_metrics(output_cdp)
                    wire.start();started=time.perf_counter()
                    page.wait_for_timeout(args.seconds*1000)
                    elapsed=time.perf_counter()-started;network=wire.finish()
                    after_c, after_v=read_metrics(control_cdp),read_metrics(output_cdp)
                    row=dict(case=case,repeat=repeat,seconds=elapsed,controller=difference(before_c,after_c,elapsed),
                             viewer=difference(before_v,after_v,elapsed),controllerFrames=frame_results(page),
                             viewerFrames=frame_results(viewer),wire=network)
                    results.append(row)
                    print(f'{case} #{repeat+1}: controller busy={row["controller"]["mainThreadBusyPercent"]:.1f}%, '
                          f'react commits={sum(row["controllerFrames"][0]["commits"].values())}, '
                          f'posts={network["posts"]}',flush=True)
            viewer_context.close();context.close()
            document=dict(label=args.label,browser=browser.version,flags=flags,viewport=[1920,1080],gpu=gpu,
                          fixtures=dict(songs=100,lyricLines=240,lyricStepSeconds=.4,audio='none',youtube='clock fixture'),
                          artifacts={name:hashlib.sha256((PROJECT/name).read_bytes()).hexdigest() for name in
                                     ('outputs/manokara-react.js','outputs/manokara-overlay.js','outputs/manokara-viewer.js')},
                          results=results,errors=errors,
                          limitations=['Local loopback; no OBS/CEF, tunnel or real music.',
                                       'Main-thread busy is CDP TaskDuration/wall time, not whole-process CPU.',
                                       'RAF intervals are headless scheduling intervals, not OBS frame rate.',
                                       'Relay age is a software estimate, not audible device latency.'])
            if args.controller_bundle:
                document['artifacts']['outputs/manokara-react.js']=hashlib.sha256(baseline_bundle).hexdigest()
            document['probeSha256']=hashlib.sha256(probe.encode()).hexdigest()
            output=Path(args.output);output.parent.mkdir(parents=True,exist_ok=True)
            output.write_text(json.dumps(document,ensure_ascii=False,indent=2),encoding='utf-8')
            assert not errors,errors
        finally:
            browser.close()


if __name__=='__main__':
    main()
