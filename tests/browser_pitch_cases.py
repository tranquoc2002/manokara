"""Tab Audio lifecycle with real WASM/DSP and a synthetic capture source."""
from playwright.sync_api import expect
from browser_cases import YOUTUBE_FIXTURE, LyricsOutput

CAPTURE_FIXTURE = r"""
(() => {
  const devices=navigator.mediaDevices, actual=devices.setCaptureHandleConfig?.bind(devices);
  devices.setCaptureHandleConfig=config => {window.testCaptureConfig=config;actual?.(config)};
  const constraints=devices.getSupportedConstraints.bind(devices);
  devices.getSupportedConstraints=() => ({...constraints(),suppressLocalAudioPlayback:true});
  MediaStreamTrack.prototype.getCaptureHandle=function(){return this.testHandle || null};
  window.captureRequests=0;window.captureMode='valid';window.fixtureTracks=[];
  window.lastAudioVersion=null;
  window.addEventListener('message',event=>{if(event.data?.type==='manokara:tab-audio-state')window.lastAudioVersion=event.data.state.version});
  devices.getDisplayMedia=async options => {
    if (!navigator.userActivation.isActive) throw new DOMException('Need gesture','InvalidStateError');
    window.captureRequests++;window.captureOptions=options;
    if (window.captureMode==='cancel') throw new DOMException('Cancelled','NotAllowedError');
    const canvas=document.createElement('canvas');canvas.width=320;canvas.height=180;
    canvas.getContext('2d').fillRect(0,0,320,180);
    const video=canvas.captureStream(1).getVideoTracks()[0];
    video.getSettings=() => ({displaySurface:window.captureMode==='screen'?'monitor':'browser'});
    video.testHandle={handle:window.captureMode==='wrong'?'wrong':window.opener.testCaptureConfig.handle,origin:location.origin};
    const context=new AudioContext(), tone=context.createOscillator(), output=context.createMediaStreamDestination();
    tone.connect(output);tone.start();await context.resume();
    const audio=output.stream.getAudioTracks()[0];
    audio.getSettings=() => ({suppressLocalAudioPlayback:window.captureMode!=='doubled',latency:.02});
    audio.applyConstraints=async () => {};
    const stream=new MediaStream(window.captureMode==='silent'?[video]:[video,audio]);
    window.fixtureTracks.push(...stream.getTracks());window.fixtureStream=stream;
    window.addEventListener('pagehide',()=>context.close(),{once:true});
    return stream;
  };
})();
"""

def exercise_pitch_timeline(page):
    saved = page.evaluate('({items:localStorage.kpt2,prefs:localStorage.kpt_set})')
    song = {'title': 'Tab Audio test', 'url': 'https://www.youtube.com/watch?v=dz3sM6ygX_g',
            'lrc': '[00:00]First line\n[01:00]Next line', 's': 0, 'e': None, 'off': .4, 'pitch': 0, 'librarySync': False}
    requests = []
    page.context.add_init_script(CAPTURE_FIXTURE)
    page.context.on('request', lambda request: requests.append(request.url))
    api = YOUTUBE_FIXTURE.replace('getDuration() { return 120; }', 'getDuration() { return 285; }')
    page.route('https://www.youtube.com/iframe_api', lambda route: route.fulfill(content_type='application/javascript', body=api))
    popup = None
    try:
        page.evaluate('(song)=>{localStorage.kpt2=JSON.stringify([song]);localStorage.kpt_set=JSON.stringify({cdn:0,fxv:1,lfx:"clean"})}', song)
        page.reload()
        page.wait_for_function('() => document.querySelector("#relayStatus").dataset.state==="connected"')
        page.locator('#list [data-a="go"]').click()
        page.wait_for_function('() => window.testYT?.getPlayerState()===1')
        page.evaluate('window.originalYT=testYT;testYT.seekTo(5)')
        expect(page.locator('#time')).to_contain_text('/ 04:45')
        expect(page.locator('#playbackTimeline')).to_have_count(0)
        keys = page.locator('#transportReactRoot .key-control')
        with page.expect_popup() as opened:
            keys.get_by_role('button', name='Raise key', exact=True).click()
        popup = opened.value
        popup.wait_for_load_state()
        expect(popup.locator('#start')).to_be_enabled()
        expect(popup.locator('#key')).to_have_text('+1')
        assert popup.evaluate('captureRequests') == 0
        assert page.evaluate('testYT===originalYT && !testYT.isMuted()')
        expect(page.locator('#youtubePitchAudio, #stageMediaRoot video')).to_have_count(0)
        for mode, message in [('cancel','cancelled'),('silent','Share tab audio'),('wrong','original Manokara'),
                              ('screen','original Manokara'),('doubled','doubled sound')]:
            popup.evaluate('(mode)=>window.captureMode=mode', mode)
            popup.locator('#start').click()
            expect(popup.locator('#status')).to_contain_text(message)
            expect(popup.locator('#start')).to_be_enabled()
            assert popup.evaluate('fixtureTracks.every(track=>track.readyState==="ended")')
            assert page.evaluate('testYT===originalYT && testYT.getPlayerState()===1')
        popup.evaluate('captureMode="valid"')
        popup.locator('#start').click()
        expect(popup.locator('#status')).to_have_attribute('data-state','connected', timeout=20000)
        page.wait_for_function('() => !document.querySelector("#stopTabAudio").disabled')
        expect(popup.locator('#latency')).to_contain_text('ms')
        assert popup.evaluate('captureOptions.audio.suppressLocalAudioPlayback && captureOptions.selfBrowserSurface==="exclude" && captureOptions.systemAudio==="exclude"')
        count = popup.evaluate('captureRequests')
        keys.get_by_role('button', name='Raise key', exact=True).click()
        expect(popup.locator('#key')).to_have_text('+2')
        assert popup.evaluate('captureRequests') == count
        assert page.evaluate('testYT===originalYT && !testYT.isMuted()')
        page.locator('#stageLyricsButton').click()
        preview = LyricsOutput(page.locator('#stageLyricsFrame').element_handle().content_frame())
        preview.wait_for_function('() => window.ManokaraOutput?.getSnapshot()?.playing')
        page.locator('#pause').click()
        preview.wait_for_function('() => ManokaraOutput.getSnapshot()?.paused')
        frozen = preview.evaluate('ManokaraOutput.time()')
        page.wait_for_timeout(400)
        assert abs(preview.evaluate('ManokaraOutput.time()')-frozen) < .05
        audio_version = popup.evaluate('lastAudioVersion')
        page.locator('#lp').click()
        preview.wait_for_function('(frozen)=>ManokaraOutput.time()>frozen+.4', arg=frozen)
        page.locator('#lm').click()
        preview.wait_for_function('(frozen)=>Math.abs(ManokaraOutput.time()-frozen)<.05', arg=frozen)
        assert popup.evaluate('lastAudioVersion') == audio_version
        page.evaluate('testYT.seekTo(180)')
        preview.wait_for_function('() => ManokaraOutput.time()>179')
        page.locator('#play').click()
        preview.wait_for_function('() => ManokaraOutput.getSnapshot()?.playing')
        page.wait_for_timeout(900)
        assert popup.evaluate('captureRequests') == count
        assert page.evaluate('testYT===originalYT && JSON.parse(localStorage.kpt2)[0].off===.4 && JSON.parse(localStorage.kpt2)[0].pitch===2')
        assert not [url for url in requests if '/__youtube/media?' in url or '/__youtube?' in url]
        keys.get_by_role('button', name='Original key', exact=True).click()
        expect(popup.locator('#key')).to_have_text('0')
        assert popup.evaluate('captureRequests') == count
        page.locator('#transpose').click()
        page.locator('#stopTabAudio').click()
        expect(popup.locator('#status')).to_contain_text('original sound')
        page.wait_for_function('() => document.querySelector("#stopTabAudio").disabled')
        assert popup.evaluate('fixtureTracks.every(track=>track.readyState==="ended")')
        page.locator('#transposeClose').click()
        popup.locator('#start').click()
        expect(popup.locator('#status')).to_have_attribute('data-state','connected',timeout=20000)
        count = popup.evaluate('captureRequests')
        page.locator('#openSongEditor').click()
        editor = page.locator('#songEditorDialog')
        editor.locator('#url').fill(song['url'])
        editor.locator('#ttl').fill('Saved key song')
        editor.locator('#songKey').fill('-3')
        editor.locator('#add').click()
        page.locator('#next').click()
        expect(popup.locator('#song')).to_have_text('Saved key song')
        expect(popup.locator('#key')).to_have_text('-3')
        assert popup.evaluate('captureRequests') == count
        # Refresh the source page while the popup owns the existing stream.
        popup.evaluate('window.retainedCapture=fixtureStream;window.previousHandle=fixtureStream.getVideoTracks()[0].testHandle;fixtureStream.getVideoTracks()[0].testHandle=null;fixtureStream.getVideoTracks()[0].dispatchEvent(new Event("capturehandlechange"))')
        expect(popup.locator('#status')).to_have_attribute('data-state','reconnecting')
        assert popup.evaluate('fixtureStream.getTracks().every(track=>track.readyState==="live")')
        page.reload()
        page.wait_for_function('() => document.querySelector("#relayStatus").dataset.state==="connected"')
        assert not popup.is_closed()
        popup.evaluate('fixtureStream.getVideoTracks()[0].testHandle={handle:opener.testCaptureConfig.handle,origin:location.origin};fixtureStream.getVideoTracks()[0].dispatchEvent(new Event("capturehandlechange"))')
        expect(popup.locator('#status')).to_have_attribute('data-state','connected')
        page.wait_for_function('() => !document.querySelector("#stopTabAudio").disabled')
        page.locator('#list [data-a="go"]').last.click()
        expect(popup.locator('#key')).to_have_text('-3')
        assert popup.evaluate('fixtureStream===retainedCapture && captureRequests') == count
        # Repeating an ordinary refresh needs neither another popup nor picker.
        page.reload()
        page.wait_for_function('() => document.querySelector("#relayStatus").dataset.state==="connected"')
        page.wait_for_function('() => !document.querySelector("#stopTabAudio").disabled')
        assert not popup.is_closed()
        assert popup.evaluate('fixtureStream===retainedCapture && captureRequests') == count
        page.locator('#list [data-a="go"]').last.click()
        expect(popup.locator('#key')).to_have_text('-3')
        popup.evaluate('fixtureStream.getVideoTracks()[0].testHandle.handle="wrong";fixtureStream.getVideoTracks()[0].dispatchEvent(new Event("capturehandlechange"))')
        expect(popup.locator('#status')).to_contain_text('shared tab changed')
        assert popup.evaluate('fixtureTracks.every(track=>track.readyState==="ended")')
        popup.locator('#start').click()
        expect(popup.locator('#status')).to_have_attribute('data-state','connected',timeout=20000)
        popup.close()
        page.wait_for_function('() => document.querySelector("#stopTabAudio").disabled')
        expect(page.locator('#pitchStatus')).to_contain_text('original sound')
        assert page.evaluate('!testYT.isMuted()')
        expect(page.locator('#youtubePitchAudio, #playbackTimeline')).to_have_count(0)
        print('Tab Audio passed: real WASM/stream, retained YouTube/timeline, no media lookup, key reuse, pause/seek/preview, saved song keys, repeated controller refresh without another picker, null capture-handle recovery, cancelled/missing/wrong capture, doubled-audio rejection, source changes and close cleanup. Capture picker is simulated; real OBS listening remains manual.')
    finally:
        if popup and not popup.is_closed(): popup.close()
        page.unroute('https://www.youtube.com/iframe_api')
        page.evaluate('(saved)=>{for(const [key,value] of [["kpt2",saved.items],["kpt_set",saved.prefs]]){if(value==null)localStorage.removeItem(key);else localStorage.setItem(key,value)}}', saved)
        page.reload()
