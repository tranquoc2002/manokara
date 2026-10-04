"""Playback and output regressions, using a deterministic YouTube API fixture."""

import time

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


def add_song(page, title, url="https://example.com/test-song", lyrics="[00:00]Browser smoke test", start="", end=""):
    page.locator('#ttl').fill(title)
    page.locator('#url').fill(url)
    page.locator('#llrc').fill(lyrics)
    page.locator('#st').fill(start)
    page.locator('#en').fill(end)
    page.locator('#add').click()


def exercise_controller(page, obs, origin):
    # Desktop keeps one frame; phone uses one column without horizontal overflow.
    for width, height in [(1920,1080), (1440,900), (1024,768), (390,844)]:
        page.set_viewport_size({'width':width, 'height':height})
        metrics = page.evaluate('({w:innerWidth,h:innerHeight,sw:document.documentElement.scrollWidth,sh:document.documentElement.scrollHeight})')
        assert metrics['sw'] <= width + 1, metrics
        if width > 760:
            assert metrics['sh'] <= height + 1, metrics
    page.set_viewport_size({'width':1440, 'height':900})
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
    page.locator('#lfx').select_option('folia-classic')
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
    assert 'owner disabled' in page.locator('#msg').inner_text()

    # MC and stop clear motion without displaying a Ready placeholder over the lyrics.
    page.locator('#mcm').fill('MC regression')
    page.locator('#mcd').fill('00:30')
    page.locator('#addmc').click()
    page.locator('#list li').nth(3).locator('[data-a="go"]').click()
    obs.wait_for_function('() => document.querySelector("#current").textContent === "MC regression" && document.body.dataset.folia === "off"')
    page.locator('#stop').click()
    obs.wait_for_function('() => document.querySelector("#current").textContent === "" && document.body.dataset.folia === "off"')

    # Restore a predictable song for the all-effects/authentication smoke checks.
    page.locator('#lfx').select_option('clean')
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
