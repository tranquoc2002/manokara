"""Playback service integration in an isolated Chromium profile.

YouTube is deterministic; the native source exercises the real local WASM graph.
Synthetic page transitions verify cleanup, without claiming real BFcache eligibility.
"""
import io
import math
import struct
import wave

from browser_cases import YOUTUBE_FIXTURE


def exercise_playback_lifecycle(page):
    saved = page.evaluate('({items:localStorage.kpt2,prefs:localStorage.kpt_set})')
    songs = [dict(title=f'Playback {index}', url='https://www.youtube.com/watch?v=dz3sM6ygX_g',
                  s=0, e=None, pitch=0, off=0, lrc='[00:00]First line\n[01:00]Next line',
                  librarySync=False) for index in range(2)]
    pending = []
    fixture = YOUTUBE_FIXTURE.replace('window.onYouTubeIframeAPIReady();', 'window.onYouTubeIframeAPIReady?.();')
    api_url = 'https://www.youtube.com/iframe_api'
    lookup_url = '**/__youtube?*'
    native_url = '**/__playback-test.wav'

    def ready():
        page.wait_for_function('() => document.querySelector("#relayStatus").dataset.state === "connected"')

    def seed(items):
        page.evaluate('(items) => {localStorage.kpt2=JSON.stringify(items);localStorage.kpt_set=JSON.stringify({cdn:0,fxv:1,lfx:"clean"})}', items)
        page.reload()
        ready()

    def playing():
        page.wait_for_function('() => ManokaraController.getSnapshot().playing')

    def assert_suspended():
        state = page.evaluate('ManokaraController.diagnostics()')
        assert state['activeTimers'] == state['playback']['activeTimers'] == 0, state
        assert state['playback']['suspended'] and state['playback']['paused'], state

    try:
        page.route(api_url, lambda route: route.fulfill(content_type='application/javascript', body=fixture))
        seed(songs)
        page.locator('#list [data-a="go"]').first.click()
        playing()
        page.wait_for_timeout(500)
        baseline = page.evaluate('ManokaraController.diagnostics()')
        page.evaluate('() => {window.keptPlayer=testYT;for(let i=0;i<20;i++)ManokaraController.start()}')
        started = page.evaluate('ManokaraController.diagnostics()')
        assert started['timers'] == baseline['timers']
        assert started['playback']['timers'] == baseline['playback']['timers'] == 1
        page.evaluate('testYT.seekTo(15)')
        page.wait_for_timeout(300)
        audio_version = page.evaluate('ManokaraController.getSnapshot().audioVersion')
        for _ in range(3):
            page.evaluate('window.dispatchEvent(new PageTransitionEvent("pagehide",{persisted:true}))')
            assert_suspended()
            position = page.evaluate('ManokaraController.getSnapshot().position')
            page.wait_for_timeout(400)
            assert abs(page.evaluate('ManokaraController.getSnapshot().position') - position) < .02
            page.evaluate('window.dispatchEvent(new PageTransitionEvent("pageshow",{persisted:true}))')
            playing()
            page.wait_for_timeout(300)
            state = page.evaluate('ManokaraController.diagnostics()')
            assert page.evaluate('testYT===keptPlayer')
            assert state['timers'] == baseline['timers'] and state['playback']['activeTimers'] == 1
            assert state['playback']['audioVersion'] == audio_version
        page.evaluate('window.obsoletePlayers=[]')
        for index in range(12):
            page.evaluate('obsoletePlayers.push(testYT)')
            page.locator('#list [data-a="go"]').nth((index + 1) % 2).click()
            playing()
            assert page.evaluate('ManokaraController.getSnapshot().timers') == 1
        page.locator('#stop').click()
        stopped = page.evaluate('ManokaraController.getSnapshot()')
        page.evaluate('obsoletePlayers.forEach(player=>{player.options.events.onReady({target:player});player.change(0)})')
        assert page.evaluate('ManokaraController.getSnapshot().mode') == ''
        assert page.evaluate('document.querySelector("#stageMediaRoot").childElementCount') == 0
        assert stopped['timers'] == 0

        # Cancel the API load, then allow its script to arrive late.
        page.unroute(api_url)
        page.route(api_url, lambda route: pending.append(route))
        seed(songs)
        page.locator('#list [data-a="go"]').first.click()
        page.wait_for_function('() => document.querySelector("#ytapi")')
        page.wait_for_timeout(100)
        assert pending, 'The API request did not start.'
        page.locator('#stop').click()
        assert page.evaluate('document.querySelector("#ytapi")===null')
        for request in pending:
            request.fulfill(content_type='application/javascript', body=fixture)
        pending.clear()
        page.wait_for_timeout(200)
        assert page.evaluate('ManokaraController.getSnapshot().mode') == ''
        assert page.evaluate('document.querySelector("#stageMediaRoot").childElementCount') == 0

        # Late server lookup must not resurrect a stopped track.
        page.route(lookup_url, lambda route: pending.append(route))
        page.locator('#list [data-a="go"]').first.click()
        playing()
        page.evaluate('testYT.options.events.onError({data:150,target:testYT})')
        page.wait_for_function('() => ManokaraController.getSnapshot().lookupPending')
        page.wait_for_timeout(150)
        assert pending
        page.locator('#stop').click()
        for request in pending:
            request.fulfill(json={'url':'/__youtube/media?videoId=dz3sM6ygX_g','title':'Late result','duration':285})
        pending.clear()
        page.wait_for_timeout(250)
        state = page.evaluate('ManokaraController.getSnapshot()')
        assert not state['lookupPending'] and state['mode'] == '' and state['timers'] == 0
        assert page.locator('#stageMediaRoot video').count() == 0
        page.unroute(lookup_url)

        # Use real MediaElementAudioSource + Signalsmith, then return to key 0.
        samples = b''.join(struct.pack('<h', int(2400 * math.sin(2 * math.pi * 220 * i / 24000))) for i in range(24000 * 8))
        audio = io.BytesIO()
        with wave.open(audio, 'wb') as wav:
            wav.setnchannels(1)
            wav.setsampwidth(2)
            wav.setframerate(24000)
            wav.writeframes(samples)
        page.route(native_url, lambda route: route.fulfill(content_type='audio/wav', body=audio.getvalue()))
        page.add_init_script('''
          window.testSourceBindings=[];
          const original=AudioContext.prototype.createMediaElementSource;
          AudioContext.prototype.createMediaElementSource=function(element){
            const source=original.call(this,element);testSourceBindings.push({element,source});return source;
          };
        ''')
        native = dict(songs[0], url=page.url.split('/manokara.html')[0] + '/__playback-test.wav', pitch=2)
        seed([native])
        page.locator('#list [data-a="go"]').click()
        page.wait_for_function('() => testSourceBindings.length===1 && ManokaraController.getSnapshot().playing && !ManokaraController.getSnapshot().pitchBusy', timeout=20000)
        page.evaluate('ManokaraPlayerActions.resetKey()')
        page.wait_for_function('() => !ManokaraController.getSnapshot().pitchBusy && JSON.parse(localStorage.kpt2)[0].pitch===0')
        page.evaluate('window.nativePlayer=document.querySelector("#stageMediaRoot video")')
        page.evaluate('window.dispatchEvent(new PageTransitionEvent("pagehide",{persisted:true}))')
        assert_suspended()
        page.wait_for_function('() => testSourceBindings[0].source.context.state === "suspended"')
        page.evaluate('window.dispatchEvent(new PageTransitionEvent("pageshow",{persisted:true}))')
        playing()
        page.wait_for_function('() => testSourceBindings[0].source.context.state === "running"')
        assert page.evaluate('testSourceBindings.length===1 && document.querySelector("#stageMediaRoot video")===nativePlayer')
        page.evaluate('ManokaraController.dispose();ManokaraController.dispose()')
        disposed = page.evaluate('ManokaraController.diagnostics()')
        assert not page.evaluate('ManokaraController.active')
        assert disposed['timers'] == disposed['activeTimers'] == disposed['listeners'] == 0
        assert disposed['playback']['disposed'] and disposed['playback']['timers'] == disposed['playback']['listeners'] == 0
        page.wait_for_function('() => testSourceBindings[0].source.context.state === "closed"')
        print('Playback lifecycle passed: idempotent start, repeated switching, late API/lookup, suspended clocks, native pitch bypass, terminal disposal.')
    finally:
        page.unroute(api_url)
        page.unroute(lookup_url)
        page.unroute(native_url)
        page.evaluate('saved => {for (const [key,value] of Object.entries({kpt2:saved.items,kpt_set:saved.prefs})) {if(value==null)localStorage.removeItem(key);else localStorage.setItem(key,value)}}', saved)
        page.reload()
        ready()
