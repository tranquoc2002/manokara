"""Playback and output regressions, using a deterministic YouTube API fixture."""

import time
import shutil
import subprocess

YOUTUBE_FIXTURE = r"""window.YT = {Player: class {
  constructor(id, options) {
    this.options = options; this.position = options.playerVars.start || 0;
    this.status = -1; this.anchor = performance.now(); window.testYT = this;
    setTimeout(() => options.events.onReady({target:this}), 0);
  }
  getCurrentTime() { return this.position + (this.status === 1 ? (performance.now()-this.anchor)/1000 : 0); }
  getDuration() { return 120; }
  getPlayerState() { return this.status; }
  setVolume() {}
  change(status) { this.position=this.getCurrentTime(); this.anchor=performance.now(); this.status=status; this.options.events.onStateChange({data:status,target:this}); }
  playVideo() { this.change(1); }
  pauseVideo() { this.change(2); }
  destroy() { this.status=-1; }
}};
window.onYouTubeIframeAPIReady();
"""


def song_editor(page):
    page.locator('#tab-song').click()


def output_settings(page):
    page.locator('#tab-output').click()


def set_effect(page, effect):
    output_settings(page)
    page.locator('#lfx').select_option(effect)


def mc_editor(page):
    song_editor(page)
    if page.locator('#mcDetails').get_attribute('open') is None:
        page.locator('#mcDetails summary').click()


def add_song(page, title, url="https://example.com/test-song", lyrics="[00:00]Browser smoke test", start="", end=""):
    song_editor(page)
    page.locator('#ttl').fill(title)
    page.locator('#url').fill(url)
    page.locator('#llrc').fill(lyrics)
    page.locator('#st').fill(start)
    page.locator('#en').fill(end)
    page.locator('#add').click()


def exercise_video_titles(page):
    song_editor(page)
    oembed = 'https://www.youtube.com/oembed?*'
    endpoint = '**/__youtube/title?*'
    pending = []
    original_count = page.locator('#list li').count()
    page.route(oembed, lambda route: route.fulfill(status=401, body='Unavailable', headers={'Access-Control-Allow-Origin':'*'}))
    page.route(endpoint, lambda route: pending.append(route))

    def lookup():
        deadline = time.monotonic() + 5
        while not pending and time.monotonic() < deadline:
            page.wait_for_timeout(25)
        assert pending, 'Server title lookup was not requested after oEmbed failed.'
        return pending.pop(0)

    try:
        page.evaluate('reset()')
        first = 'https://www.youtube.com/watch?v=ju03AIeny2Q'
        page.locator('#url').fill(first)
        page.locator('#ttl').click()
        request = lookup()
        # Adding before the lookup finishes must repair the saved item, without filling a new form.
        page.locator('#add').click()
        assert page.locator('#list li').last.locator('.t').inner_text().endswith(first)
        request.fulfill(json={'title':'JVKE - golden hour (Karaoke Version)'})
        page.wait_for_function('() => items.at(-1).title === "JVKE - golden hour (Karaoke Version)"')
        assert page.evaluate('JSON.parse(localStorage.kpt2).at(-1).title') == 'JVKE - golden hour (Karaoke Version)'
        assert page.locator('#ttl').input_value() == ''
        assert not pending, 'Adding a song should reuse the pending title lookup.'

        page.locator('#url').fill('https://www.youtube.com/watch?v=FrfyqKgHpA4')
        page.locator('#ttl').click()
        request = lookup()
        page.locator('#ttl').fill('My custom song title')
        request.fulfill(json={'title':'ROSÉ - On The Ground (Karaoke Version)'})
        page.wait_for_function('() => youtubeTitles.get("FrfyqKgHpA4")?.promise != null')
        page.wait_for_timeout(100)
        assert page.locator('#ttl').input_value() == 'My custom song title'
        page.locator('#add').click()
        assert page.evaluate('items.at(-1).title') == 'My custom song title'

        # An older request must not replace the title of a different URL.
        page.locator('#url').fill('https://www.youtube.com/watch?v=dz3sM6ygX_g')
        page.locator('#ttl').click()
        older = lookup()
        page.locator('#url').fill('https://www.youtube.com/watch?v=abcdefghijk')
        page.locator('#ttl').click()
        newer = lookup()
        newer.fulfill(json={'title':'The latest video title'})
        page.wait_for_function('() => document.querySelector("#ttl").value === "The latest video title"')
        older.fulfill(json={'title':'An older video title'})
        page.wait_for_timeout(100)
        assert page.locator('#ttl').input_value() == 'The latest video title'
        assert page.locator('#lq').input_value() == 'The latest video title'

        # An existing setlist entry using its URL as a title is repaired when played.
        page.evaluate('reset();const url="https://www.youtube.com/watch?v=dQw4w9WgXcQ";items.push({url,title:url,s:0,e:null,lrc:""});save();render()')
        page.locator('#list li').last.locator('[data-a="go"]').click()
        lookup().fulfill(json={'title':'Recovered saved video title'})
        page.wait_for_function('() => document.querySelector("#now").textContent === "Recovered saved video title"')
        assert page.evaluate('JSON.parse(localStorage.kpt2).at(-1).title') == 'Recovered saved video title'
        print('Video title checks passed: oEmbed failure, server fallback, immediate Add, persistence, custom titles, stale responses and existing setlist repair.')
    finally:
        for request in pending:
            request.abort()
        page.unroute(oembed)
        page.unroute(endpoint)
        page.evaluate('(count) => {items.splice(count);reset();save();render();go(1)}', original_count)


def exercise_server_fallback(page, obs):
    executable = shutil.which('ffmpeg')
    if not executable:
        print('Video fallback browser fixture skipped: FFmpeg is not installed.')
        return
    # Generate an original video/audio fixture in RAM; no provider media is downloaded.
    fixture = subprocess.run([executable, '-v', 'error', '-f', 'lavfi', '-i', 'testsrc=size=320x180:rate=24',
        '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=44100', '-t', '12', '-c:v', 'libx264',
        '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-movflags',
        'frag_keyframe+empty_moov+default_base_moof', '-f', 'mp4', 'pipe:1'], capture_output=True, timeout=20)
    assert fixture.returncode == 0, 'Could not generate video fixture.'
    lookup = '**/__youtube?*'
    stream = '**/__youtube/media?*'
    starts = []
    page.route(lookup, lambda route: route.fulfill(json={'url':'/__youtube/media?room=test&ticket=fixture', 'duration':12, 'title':'Fetched video title'}))
    def serve(route):
        starts.append(route.request.url)
        route.fulfill(content_type='video/mp4', body=fixture.stdout, headers={'Cache-Control':'no-store'})
    page.route(stream, serve)
    try:
        page.locator('#cdn').fill('3')
        set_effect(page, 'clean')
        add_song(page, 'Server fallback test', 'https://www.youtube.com/watch?v=ju03AIeny2Q', '[00:00]Server fallback lyrics', start='00:03', end='00:08')
        page.locator('#list li').last.locator('[data-a="go"]').click()
        page.wait_for_function('() => window.testYT?.options.videoId === "ju03AIeny2Q"')
        page.evaluate('testYT.options.events.onError({data:150})')
        page.locator('#stage video').wait_for()
        page.wait_for_function('() => !counting && media && !media.paused && media.readyState >= 2')
        assert page.locator('#now').inner_text() == 'Server fallback test'
        obs.wait_for_function('() => ManokaraOutput.getSnapshot()?.playing && document.querySelector("#current").textContent === "Server fallback lyrics"')
        assert any('start=3' in url for url in starts)
        page.locator('#pause').click()
        page.wait_for_function('() => media.paused')
        before = page.evaluate('elapsed()')
        page.wait_for_timeout(350)
        assert abs(page.evaluate('elapsed()') - before) < .05
        obs.wait_for_function('() => ManokaraOutput.getSnapshot()?.paused')
        page.locator('#play').click()
        page.wait_for_function('(before) => elapsed() > before + .2', arg=before)
        assert page.evaluate('dur') == 5
        page.locator('#list li').nth(1).locator('[data-a="go"]').click()
        page.wait_for_function('() => !document.querySelector("#stage video")')
        obs.wait_for_function('() => document.querySelector("#current").textContent === "Browser smoke test"')
        print('Server fallback browser checks passed: embed error, video/audio, countdown, start/end range, pause/resume, lyric timing and cleanup.')
    finally:
        page.unroute(lookup)
        page.unroute(stream)


def exercise_controller(page, obs, origin):
    # Desktop keeps one frame; phone uses one column without horizontal overflow.
    for width, height in [(1920,1080), (1440,900), (1024,768), (860,700), (390,844)]:
        page.set_viewport_size({'width':width, 'height':height})
        metrics = page.evaluate('({w:innerWidth,h:innerHeight,sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight})')
        assert metrics['sw'] <= width + 1, metrics
        if width > 760:
            assert metrics['sh'] <= height + 1, metrics
        # Icon-only header controls must remain visible on phones.
        for control in ('#theme', '#transpose'):
            assert page.locator(control + ' .icon').is_visible()
    page.set_viewport_size({'width':1440, 'height':900})
    # The tool tabs work from the keyboard and exclude the hidden pane from tab order.
    song_editor(page)
    page.locator('#tab-song').focus()
    page.keyboard.press('ArrowRight')
    assert page.locator('#tab-output').get_attribute('aria-selected') == 'true'
    assert page.locator('#panel-song').is_hidden()
    assert page.locator('#panel-green').is_visible()
    assert page.locator('#tab-output').evaluate('(el) => el === document.activeElement')
    page.keyboard.press('Home')
    assert page.locator('#tab-song').get_attribute('aria-selected') == 'true'
    assert page.locator('#panel-green').is_hidden()
    # The dialog contains keyboard focus, closes with Escape and returns to its opener.
    page.locator('#transpose').click()
    assert page.locator('#transposeDialog').is_visible()
    page.keyboard.press('Tab')
    assert page.locator('#transposeInstall').evaluate('(el) => el === document.activeElement')
    page.keyboard.press('Shift+Tab')
    assert page.locator('#transposeClose').evaluate('(el) => el === document.activeElement')
    page.keyboard.press('Escape')
    assert page.locator('#transposeDialog').is_hidden()
    assert page.locator('#transpose').evaluate('(el) => el === document.activeElement')
    page.locator('#theme').click()
    first = page.locator('html').get_attribute('data-theme')
    page.locator('#theme').click()
    assert page.locator('html').get_attribute('data-theme') != first

    # Editing retains object identity and follows the same item through reordering.
    add_song(page, 'Second song')
    page.locator('#list li').nth(0).locator('[data-a="ed"]').click()
    page.locator('#ttl').fill('Edited first song')
    page.locator('#list li').nth(0).locator('[data-a="dn"]').click()
    page.locator('#add').click()
    assert 'Second song' in page.locator('#list li').nth(0).inner_text()
    assert 'Edited first song' in page.locator('#list li').nth(1).inner_text()
    assert page.locator('#now').inner_text() == 'Edited first song'
    page.locator('#list li').nth(1).locator('[data-a="ed"]').click()
    page.locator('#ttl').fill('Browser smoke test')
    page.locator('#add').click()

    # Invalid range and an empty MC duration must not insert broken entries.
    add_song(page, 'Invalid', start='00:70')
    assert page.locator('#list li').count() == 2
    page.locator('#cancel').click() if page.locator('#cancel').is_visible() else None
    page.locator('#st').fill('')
    mc_editor(page)
    page.locator('#mcd').fill('')
    page.locator('#addmc').click()
    assert page.locator('#list li').count() == 2

    # Pause/resume keeps the output clock stable, and small manual offsets apply immediately.
    page.locator('#pause').click()
    obs.wait_for_function('() => ManokaraOutput.getSnapshot()?.paused')
    before = obs.evaluate('ManokaraOutput.time()')
    obs.wait_for_timeout(450)
    assert abs(obs.evaluate('ManokaraOutput.time()') - before) < .05
    page.locator('#lp').click()
    obs.wait_for_function('(time) => ManokaraOutput.time() > time + .4', arg=before)
    page.locator('#lz').click()
    page.locator('#pause').click()
    obs.wait_for_function('() => ManokaraOutput.getSnapshot()?.playing')

    # A mocked API exercises countdown, buffering, seeks and error messages without depending
    # on availability or regional restrictions of an actual YouTube video.
    page.route('https://www.youtube.com/iframe_api', lambda route: route.fulfill(content_type='application/javascript', body=YOUTUBE_FIXTURE))
    page.locator('#cdn').fill('3')
    set_effect(page, 'folia-classic')
    add_song(page, 'Countdown song', 'https://www.youtube.com/watch?v=dz3sM6ygX_g', '[00:00]First line\n[00:01]Second line\n[00:02]Third line')
    page.locator('#list li').nth(2).locator('[data-a="go"]').click()
    obs.wait_for_function('() => document.querySelector("#count").textContent !== "" && document.body.dataset.folia === "off"')
    assert page.evaluate('testYT.options.playerVars.origin') == origin
    page.locator('#pause').click()
    obs.wait_for_function('() => ManokaraOutput.getSnapshot()?.paused')
    count = obs.locator('#count').inner_text()
    obs.wait_for_timeout(1100)
    assert obs.locator('#count').inner_text() == count
    page.locator('#play').click()
    obs.wait_for_function('() => ManokaraOutput.getSnapshot()?.playing && !ManokaraOutput.getSnapshot()?.counting')
    obs.wait_for_function('() => document.body.dataset.folia === "on"')
    obs.frame_locator('#foliaFrame').locator('#root > *').first.wait_for()
    # The nested renderer consumes its parent's source rather than making a second relay poll.
    assert obs.frame_locator('#foliaFrame').locator('html').evaluate('(el) => window.ManokaraFoliaSource === parent.ManokaraOutput')
    src = obs.locator('#foliaFrame').get_attribute('src')
    obs.wait_for_timeout(1100)
    assert obs.locator('#foliaFrame').get_attribute('src') == src
    page.evaluate('testYT.change(3)')
    obs.wait_for_function('() => ManokaraOutput.getSnapshot()?.playing === false')
    before = obs.evaluate('ManokaraOutput.time()')
    obs.wait_for_timeout(350)
    assert abs(obs.evaluate('ManokaraOutput.time()') - before) < .05
    page.evaluate('testYT.playVideo()')
    obs.wait_for_function('() => ManokaraOutput.getSnapshot()?.playing')
    page.evaluate('testYT.position=30;testYT.anchor=performance.now()')
    obs.wait_for_function('() => ManokaraOutput.time() > 29')
    page.evaluate('testYT.position=0;testYT.anchor=performance.now()')
    obs.wait_for_function('() => ManokaraOutput.time() < 2')
    page.evaluate('testYT.pauseVideo();testYT.position=15')
    page.locator('#list li').nth(2).locator('[data-a="ed"]').click()
    long_line = '放ったアルバムをずっと歌いたい夜空に輝く星たちと'
    page.locator('#llrc').fill('[00:00]' + long_line + '\n[01:00]Next line')
    page.locator('#add').click()
    output_settings(page)
    page.locator('#lcenter').check()
    obs.wait_for_function('() => ManokaraOutput.getSnapshot()?.paused && ManokaraOutput.time() > 14')
    obs.reload()
    folia_page = obs.frame_locator('#foliaFrame')
    word = folia_page.locator('#root [class~="whitespace-nowrap"]').first
    word.wait_for()
    # A paused output loaded from scratch must render its active word rather than remain
    # stuck at the initial transparent animation pose.
    deadline = time.monotonic() + 10
    while float(word.evaluate('(el) => getComputedStyle(el).opacity')) < .5 and time.monotonic() < deadline:
        obs.wait_for_timeout(100)
    assert float(word.evaluate('(el) => getComputedStyle(el).opacity')) >= .5
    assert word.evaluate('(el) => el.clientWidth') > 50
    for width, height in [(1280,720), (720,1280)]:
        obs.set_viewport_size({'width':width,'height':height})
        obs.wait_for_timeout(500)
        metrics = word.evaluate('(el) => ({w:el.clientWidth,h:el.clientHeight,sh:el.scrollHeight,sw:el.scrollWidth,frameH:innerHeight})')
        assert metrics['sw'] <= metrics['w'] + 1, metrics
        assert metrics['h'] < metrics['frameH'], metrics
    obs.set_viewport_size({'width':1280,'height':720})
    page.locator('#lcenter').uncheck()
    page.locator('#skip').uncheck()
    page.evaluate('testYT.options.events.onError({data:150})')
    page.wait_for_function('() => document.querySelector("#msg").textContent.includes("Server playback is disabled")')

    # MC and stop clear motion without displaying a Ready placeholder over the lyrics.
    mc_editor(page)
    page.locator('#mcm').fill('MC regression')
    page.locator('#mcd').fill('00:30')
    page.locator('#addmc').click()
    page.locator('#list li').nth(3).locator('[data-a="go"]').click()
    obs.wait_for_function('() => document.querySelector("#current").textContent === "MC regression" && document.body.dataset.folia === "off"')
    page.locator('#stop').click()
    obs.wait_for_function('() => document.querySelector("#current").textContent === "" && document.body.dataset.folia === "off"')

    # Restore a predictable song for the all-effects/viewer-token smoke checks.
    set_effect(page, 'clean')
    page.locator('#list li').nth(1).locator('[data-a="go"]').click()
    obs.wait_for_function('() => document.querySelector("#current").textContent === "Browser smoke test"')
    saved = page.evaluate('({items:localStorage.getItem("kpt2"),prefs:localStorage.getItem("kpt_set")})')
    page.evaluate('localStorage.setItem("kpt2","null");localStorage.setItem("kpt_set","null")')
    page.reload()
    page.wait_for_function('() => document.querySelector("#relayStatus").textContent === "OBS relay connected"')
    assert page.locator('#list li').count() == 0
    page.evaluate('(data) => {localStorage.setItem("kpt2",data.items);localStorage.setItem("kpt_set",data.prefs)}', saved)
    page.reload()
    page.wait_for_function('() => document.querySelector("#relayStatus").textContent === "OBS relay connected"')
    page.locator('#list li').nth(1).locator('[data-a="go"]').click()
    obs.wait_for_function('() => document.querySelector("#current").textContent === "Browser smoke test"')
    output_settings(page)
    with page.expect_popup() as opened:
        page.locator('#lwin').click()
    popup = opened.value
    popup_errors = []
    popup.on('pageerror', lambda error: popup_errors.append(str(error)))
    popup.wait_for_function('() => document.querySelector("#current").textContent === "Browser smoke test"')
    assert not popup_errors, popup_errors
    popup.close()
    other = page.context.new_page()
    other.goto(page.url)
    other.wait_for_function('() => document.querySelector("#relayStatus").textContent.includes("another window")')
    writes = []
    other.on('request', lambda request: writes.append(request.url) if request.method == 'POST' and '/__lyric-state' in request.url else None)
    other.wait_for_timeout(700)
    assert not writes, 'An inactive controller must wait for an explicit takeover.'
    assert obs.locator('#current').inner_text() == 'Browser smoke test'
    other.close()
    print('Controller regressions passed: responsive layout, theme, editing/reordering, range validation, pause, offsets, countdown, buffering, seeks, paused Folia reload, long CJK wrapping, MC, stop, storage recovery, popup output and controller isolation.')
