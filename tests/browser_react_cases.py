"""React UI regressions through public controls and persisted data contracts."""

from pathlib import Path
from playwright.sync_api import expect
from browser_cases import song_editor, output_settings, YOUTUBE_FIXTURE, LyricsOutput


def exercise_stage_preview(page, screenshots=False):
    saved = page.evaluate('({items:localStorage.kpt2,prefs:localStorage.kpt_set,overlay:localStorage.manokaraOverlayV1})')
    original = '[00:00]君と歌うこの夜\n[01:00]次の歌詞'
    romaji = '[00:00]Kimi to utau kono yoru\n[01:00]Tsugi no kashi'
    songs = [{'title': 'Stage preview test', 'url': 'https://www.youtube.com/watch?v=dz3sM6ygX_g',
              'lrc': original, 'romaji': {'source': original, 'lrc': romaji}, 'lyricMode': 'original',
              's': 0, 'e': None, 'off': 0, 'librarySync': False},
             {'title': 'Song without lyrics', 'url': 'https://example.com/no-lyrics', 'lrc': '', 'librarySync': False}]
    child_reads = []
    output_page = None
    def requested(request):
        if '/__lyric-state' in request.url and request.method == 'GET' and request.frame.parent_frame:
            child_reads.append(request.url)
    page.on('request', requested)
    page.route('https://www.youtube.com/iframe_api', lambda route: route.fulfill(content_type='application/javascript', body=YOUTUBE_FIXTURE))
    def stage():
        page.locator('#stageLyricsFrame').wait_for()
        view = LyricsOutput(page.locator('#stageLyricsFrame').element_handle().content_frame())
        view.wait_for_function('() => !!window.ManokaraOutput')
        return view
    try:
        page.evaluate('(songs) => {localStorage.kpt2=JSON.stringify(songs);localStorage.kpt_set=JSON.stringify({fxv:1,cdn:0,lfx:"clean"});localStorage.removeItem("manokaraOverlayV1")}', songs)
        page.reload()
        page.wait_for_function('() => document.querySelector("#relayStatus").dataset.state === "connected"')
        page.locator('#stageLyricsButton').click()
        expect(page.locator('.stage-preview-message')).to_have_text('Play a song to preview its lyrics.')
        page.locator('#stageMediaButton').click()
        page.locator('#list [data-a="go"]').first.click()
        page.wait_for_function('() => window.testYT?.getPlayerState() === 1')
        page.evaluate('window.stageTestPlayer=testYT;window.stageTestRoot=document.querySelector("#stageMediaRoot")')
        output_page = page.context.new_page()
        output_page.goto(page.locator('#obsurl').input_value())
        output = LyricsOutput(output_page)
        output.wait_for_function('() => document.querySelector("#current").textContent === "君と歌うこの夜"')
        for _ in range(3):
            page.locator('#stageLyricsButton').click()
            stage().wait_for_function('() => document.querySelector("#current").textContent === "君と歌うこの夜"')
            assert page.evaluate('testYT===stageTestPlayer && document.querySelector("#stageMediaRoot")===stageTestRoot && testYT.getPlayerState()===1')
            page.locator('#stageMediaButton').click()
            expect(page.locator('#stageLyricsFrame')).to_have_count(0)
        page.locator('#stageLyricsButton').click()
        stage().wait_for_function('() => ManokaraOutput.getSnapshot()?.playing')
        assert abs(stage().evaluate('ManokaraOutput.time()') - output.evaluate('ManokaraOutput.time()')) < .3
        page.locator('#pause').click()
        stage().wait_for_function('() => ManokaraOutput.getSnapshot()?.paused')
        frozen = stage().evaluate('ManokaraOutput.time()')
        page.wait_for_timeout(450)
        assert abs(stage().evaluate('ManokaraOutput.time()') - frozen) < .05
        page.locator('#lp').click()
        stage().wait_for_function('(before) => ManokaraOutput.time()>before+.4', arg=frozen)
        output.wait_for_function('() => ManokaraOutput.getSnapshot()?.paused')
        assert abs(stage().evaluate('ManokaraOutput.time()') - output.evaluate('ManokaraOutput.time()')) < .2
        page.locator('#play').click()
        stage().wait_for_function('() => ManokaraOutput.getSnapshot()?.playing')
        page.evaluate('testYT.position=25;testYT.anchor=performance.now()')
        stage().wait_for_function('() => ManokaraOutput.time()>25')
        output.wait_for_function('() => ManokaraOutput.time()>25')
        page.locator('#liveLyricMode').select_option('both')
        stage().wait_for_function('() => ManokaraOutput.getSnapshot()?.romajiLrc.includes("Kimi")')
        expect(page.locator('#pan .romanized').first).to_have_text('Kimi to utau kono yoru')
        page.locator('#lfc').fill('Arial')
        for _ in range(8): page.locator('#lsz').press('ArrowRight')
        size = int(page.locator('#lsz').input_value())
        page.locator('#ltheme').select_option('cyan')
        for target in (stage(), output):
            target.wait_for_function('(size) => ManokaraOutput.getSnapshot()?.font===\'"Arial"\' && ManokaraOutput.getSnapshot()?.size===size && ManokaraOutput.getSnapshot()?.colorTheme==="cyan"', arg=size)
        for effect, flag in [('karaoke-classic', 'karaoke'), ('jizura', 'jizura'), ('folia-classic', 'folia')]:
            page.locator('#lfx').select_option(effect)
            stage().wait_for_function('(flag) => document.body.dataset[flag]==="on"', arg=flag)
            output.wait_for_function('(flag) => document.body.dataset[flag]==="on"', arg=flag)
            if effect.startswith('folia'):
                folia = stage().frame_locator('#foliaFrame')
                folia.locator('#root > *').first.wait_for(timeout=20000)
                assert folia.locator('html').evaluate('() => ManokaraFoliaSource===parent.ManokaraOutput')
        assert not child_reads, 'Stage renderer must share its local feed rather than create relay readers.'
        page.locator('#main-playlist').click()
        expect(page.locator('#stageLyricsFrame')).to_have_count(0)
        page.locator('[data-overlay-tab="lyrics"]').click()
        page.locator('#studioData').select_option('sample')
        page.locator('#studioLyricSettings summary').click()
        page.locator('#lfx').select_option('karaoke-classic')
        page.locator('#ltheme').select_option('rose')
        page.locator('#studioW').fill('1280')
        page.locator('#studioW').press('Tab')
        page.wait_for_timeout(300)
        overlay = page.evaluate('JSON.parse(localStorage.manokaraOverlayV1)')
        page.locator('#main-karaoke').click()
        expect(page.locator('#stageLyricsButton')).to_have_attribute('aria-pressed', 'true')
        stage().wait_for_function('() => ManokaraOutput.getSnapshot()?.title==="Stage preview test" && ManokaraOutput.getSnapshot()?.effect==="karaoke-classic" && ManokaraOutput.getSnapshot()?.colorTheme==="rose"')
        assert page.evaluate('testYT===stageTestPlayer && testYT.getPlayerState()===1')
        assert stage().evaluate('JSON.parse(ManokaraOutput.getSnapshot().overlay)') == overlay
        assert page.locator('#lfx').input_value() == 'karaoke-classic'
        assert stage().locator('#out [data-hit], [data-resize]').count() == 0
        assert not child_reads
        if screenshots:
            page.locator('#language').select_option('vi')
            page.emulate_media(color_scheme='dark')
            for width, height in [(1920, 1080), (1536, 864)]:
                page.set_viewport_size({'width': width, 'height': height})
                page.locator('#panel-green').evaluate('(el) => el.scrollTop=0')
                page.wait_for_timeout(150)
                Path('.state/react-qa').mkdir(parents=True, exist_ok=True)
                page.screenshot(path=f'.state/react-qa/karaoke-stage-preview-{width}.png')
        page.locator('#list [data-a="go"]').nth(1).click()
        expect(page.locator('.stage-preview-message')).to_contain_text('chưa có lời' if screenshots else 'no lyrics')
        page.locator('#stop').click()
        expect(page.locator('.stage-preview-message')).to_contain_text('Phát một bài' if screenshots else 'Play a song')
        print('Stage preview passed: retained YouTube player, local feed, timing, pause/seek, shared settings/Romaji/layout, Studio switch, Folia/JIZURA/classic, empty states.')
    finally:
        page.remove_listener('request', requested)
        page.unroute('https://www.youtube.com/iframe_api')
        if output_page: output_page.close()
        page.evaluate('(saved) => {for(const [key,value] of [["kpt2",saved.items],["kpt_set",saved.prefs],["manokaraOverlayV1",saved.overlay]]) {if(value==null)localStorage.removeItem(key);else localStorage.setItem(key,value)}}', saved)
        page.locator('#language').select_option('en')
        page.set_viewport_size({'width': 1920, 'height': 1080})
        page.emulate_media(color_scheme='light')
        page.reload()
        page.wait_for_function('() => document.querySelector("#relayStatus").dataset.state === "connected"')


def exercise_karaoke_layout(page, screenshots=False):
    """Four desktop columns stay in one viewport while their long content scrolls."""
    saved = page.evaluate('localStorage.kpt2')
    language = page.locator('#language').input_value()
    lyrics = '\n'.join(f'[{i // 20:02}:{(i * 3) % 60:02}]Dòng lời {i + 1} — Cùng hát một bài thật dài để kiểm tra khung lời' for i in range(90))
    songs = [{'title': f'Bài hát {i + 1:02} — Setlist cho buổi karaoke',
              'url': f'https://example.com/layout-song-{i}', 'lrc': lyrics,
              's': 0, 'e': None, 'off': 0, 'librarySync': False} for i in range(24)]
    try:
        page.evaluate('(songs) => localStorage.kpt2=JSON.stringify(songs)', songs)
        page.reload()
        page.wait_for_function('() => document.querySelector("#relayStatus").textContent === "OBS relay connected"')
        page.locator('#lfx').select_option('clean')
        page.locator('#list [data-a="go"]').first.click()
        expect(page.locator('#pan .ln')).to_have_count(90)
        page.locator('#language').select_option('vi')
        for width, height in [(1920, 1080), (1536, 864), (1280, 720)]:
            page.set_viewport_size({'width': width, 'height': height})
            page.wait_for_timeout(150)
            page.evaluate('window.scrollTo(0,0);document.body.scrollTop=0')
            assert page.evaluate('document.documentElement.scrollWidth') <= width + 1
            assert page.evaluate('document.documentElement.scrollHeight') <= height + 1
            columns = [page.locator(selector).bounding_box() for selector in ('#setlistSide', '#maincol', '#workspace', '#side')]
            for index, box in enumerate(columns):
                assert box['y'] >= 0 and box['y'] + box['height'] <= height, (width, box)
                assert abs(box['y'] - columns[0]['y']) < 1
                assert abs(box['height'] - columns[0]['height']) < 1
                if index: assert box['x'] >= columns[index - 1]['x'] + columns[index - 1]['width']
            buttons = [button.bounding_box() for button in page.locator('#list li').first.locator('.list-actions button').all()]
            assert len(buttons) == 4 and all(abs(box['y'] - buttons[0]['y']) < 1 for box in buttons)
            for selector in ('#list', '#pan', '#panel-green'):
                page.locator(selector).evaluate('(el) => el.scrollTop=el.scrollHeight')
                assert page.locator(selector).evaluate('(el) => el.scrollTop') > 0, (width, selector)
            page.locator('#lshape').scroll_into_view_if_needed()
            for selector in ('#lshape', '#play', '#pause', '#tap', '#lz', '#liveLyricMode'):
                box = page.locator(selector).bounding_box()
                assert box and box['y'] >= 0 and box['y'] + box['height'] <= height, (width, selector, box)
                assert box['x'] >= 0 and box['x'] + box['width'] <= width, (width, selector, box)
            assert page.evaluate('window.scrollY') == 0
            page.locator('#panel-green').evaluate('(el) => el.scrollTop=0')
            page.locator('#pan').evaluate('(el) => el.scrollTop=0')
            page.locator('#list').evaluate('(el) => el.scrollTop=0')
            if screenshots:
                Path('.state/react-qa').mkdir(parents=True, exist_ok=True)
                page.emulate_media(color_scheme='dark')
                page.screenshot(path=f'.state/react-qa/karaoke-four-columns-{width}.png', animations='disabled')
        for width, height in [(1024, 768), (390, 844)]:
            page.set_viewport_size({'width': width, 'height': height})
            page.wait_for_timeout(150)
            assert page.evaluate('document.documentElement.scrollWidth') <= width + 1
            for selector in ('#setlistSide', '#maincol', '#workspace', '#side'):
                box = page.locator(selector).bounding_box()
                assert box['x'] >= 0 and box['x'] + box['width'] <= width, (width, selector, box)
            page.locator('#lshape').scroll_into_view_if_needed()
            assert page.locator('#lshape').is_visible()
        print('Karaoke layout passed: four full-height columns, desktop 100%/125%, internal scroll and smaller screens.')
    finally:
        page.evaluate('(saved) => {if(saved==null)localStorage.removeItem("kpt2");else localStorage.kpt2=saved}', saved)
        page.set_viewport_size({'width': 1920, 'height': 1080})
        page.emulate_media(color_scheme='light')
        page.locator('#language').select_option(language)
        page.reload()
        page.wait_for_function('() => document.querySelector("#relayStatus").dataset.state === "connected"')


def exercise_search(page):
    saved = page.evaluate('localStorage.kpt2')
    endpoint = '**/__youtube/search?*'
    video = {'id': 'abcdefghijk', 'title': 'React search song', 'channel': 'Fixture', 'duration': 120}
    page.route(endpoint, lambda route: route.fulfill(json={'results': [video]}))

    def search():
        page.locator('#musicSearch').fill('React search song')
        page.locator('#musicSearch').press('Enter')
        page.locator('#youtube-result-0').wait_for()

    try:
        output_settings(page)
        search()
        page.locator('#youtube-result-0').click()
        expect(page.locator('#songEditorDialog')).to_be_visible()
        expect(page.locator('#musicSearchMenu')).to_be_hidden()
        expect(page.locator('#url')).to_have_value('https://www.youtube.com/watch?v=abcdefghijk')
        expect(page.locator('#ttl')).to_have_value('React search song')
        page.locator('#saveToLibrary').uncheck()
        page.locator('#add').click()
        expect(page.locator('#songEditorDialog')).to_be_hidden()
        item = page.evaluate('JSON.parse(localStorage.kpt2).at(-1)')
        assert item['title'] == video['title'] and item['ldur'] == 120 and item['lrc'] == ''
        search()
        page.locator('#musicSearch').press('ArrowDown')
        expect(page.locator('#musicSearch')).to_have_attribute('aria-activedescendant', 'youtube-result-0')
        page.locator('#musicSearch').press('Enter')
        expect(page.locator('#songEditorDialog')).to_be_visible()
        expect(page.locator('#ttl')).to_have_value(video['title'])
        page.locator('#url').fill('https://example.com/my-unsaved-draft')
        page.locator('#ttl').fill('Keep this draft')
        page.locator('#closeSongEditor').click()
        search()
        page.once('dialog', lambda dialog: dialog.dismiss())
        page.locator('#youtube-result-0').click()
        expect(page.locator('#musicSearchMenu')).to_be_visible()
        expect(page.locator('#ttl')).to_have_value('Keep this draft')
        page.locator('#musicSearch').press('Escape')
        print('React search passed: pointer/blur, keyboard, draft confirmation, add without LRC.')
    finally:
        page.unroute(endpoint)
        page.evaluate('(saved) => localStorage.kpt2=saved', saved)
        page.reload()
        page.wait_for_function('() => document.querySelector("#relayStatus").textContent === "OBS relay connected"')
        page.locator('#list li').nth(1).locator('[data-a="go"]').click()


def exercise_studio(page, screenshots=False):
    assert page.locator('#lfx').count() == 1, 'Nested OBS React controls must mount on startup.'
    effect = page.locator('#lfx').input_value()
    page.locator('#main-playlist').click()
    page.locator('[data-overlay-tab="playlist"]').click()
    page.locator('#studioData').select_option('sample')
    preview = page.locator('#studioPreview')
    for width, height in [(1920, 1080), (1536, 864), (1024, 768), (390, 844)]:
        page.set_viewport_size({'width': width, 'height': height})
        page.wait_for_timeout(150)
        assert page.evaluate('document.documentElement.scrollWidth') <= width + 1
        bounds = preview.bounding_box()
        assert abs(bounds['width'] / bounds['height'] - 16 / 9) < .025, bounds
        page.locator('#studioW').scroll_into_view_if_needed()
        assert page.locator('#studioW').is_visible()
        for selector in ('#playlistStudio', '.studio-body', '.studio-preview-pane', '.studio-controls', '#studioW', '#studioH'):
            box = page.locator(selector).bounding_box()
            assert box['x'] >= -1 and box['x'] + box['width'] <= width + 1, (width, selector, box)
        if screenshots:
            Path('.state/react-qa').mkdir(parents=True, exist_ok=True)
            page.evaluate('window.scrollTo(0,0);document.body.scrollTop=0')
            page.screenshot(path=f'.state/react-qa/studio-{width}.png', full_page=True, animations='disabled')
    page.set_viewport_size({'width': 1920, 'height': 1080})
    page.locator('#language').select_option('vi')
    expect(page.locator('#studioGeometry summary')).to_contain_text('Vị trí')
    if screenshots:
        page.emulate_media(color_scheme='dark')
        page.screenshot(path='.state/react-qa/studio-1920-vi.png', full_page=True, animations='disabled')
        page.emulate_media(color_scheme='light')
    page.locator('#language').select_option('en')
    expect(page.locator('#studioGeometry summary')).to_contain_text('Position')
    page.locator('#studioFrame').select_option('1080x1920')
    page.wait_for_timeout(150)
    bounds = preview.bounding_box()
    assert abs(bounds['width'] / bounds['height'] - 9 / 16) < .025, bounds
    page.locator('#studioFrame').select_option('1920x1080')
    for theme in ['glass', 'paper', 'minimal', 'card', 'vinyl', 'signal']:
        page.locator(f'[data-theme-preset="{theme}"]').click()
        assert page.locator('#studioCanvas').inner_text().strip()
    page.locator('[data-theme-preset="glass"]').click()
    page.locator('[data-select="current"]').click()
    page.locator('#studioAspectLock').check()
    w, h = [float(page.locator('#studio' + key).input_value()) for key in ('W', 'H')]
    page.locator('#studioW').fill(str(w * .8))
    page.locator('#studioW').press('Tab')
    expect(page.locator('#studioW')).not_to_have_value(str(w))
    assert abs(float(page.locator('#studioH').input_value()) / h - .8) < .02
    page.locator('[data-action="undo"]').click()
    assert abs(float(page.locator('#studioW').input_value()) - w) < .1
    page.locator('[data-action="redo"]').click()
    assert abs(float(page.locator('#studioW').input_value()) - w * .8) < .1
    for edge in ('nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'):
        before = [float(page.locator('#studio' + key).input_value()) for key in ('W', 'H')]
        handle = page.locator(f'[data-hit="current"] [data-resize="{edge}"]')
        handle.scroll_into_view_if_needed()
        bounds = handle.bounding_box()
        x, y = bounds['x'] + bounds['width'] / 2, bounds['y'] + bounds['height'] / 2
        page.mouse.move(x, y)
        page.mouse.down()
        page.mouse.move(x + (8 if 'e' in edge or 'w' in edge else 0), y + (8 if 'n' in edge or 's' in edge else 0), steps=3)
        page.mouse.up()
        after = [float(page.locator('#studio' + key).input_value()) for key in ('W', 'H')]
        assert after != before, edge
        assert abs(after[0] / after[1] - before[0] / before[1]) < .01, edge
        page.locator('[data-action="undo"]').click()
    page.locator('#studioLayoutSection summary').click()
    page.locator('#studioLayout').select_option('unified')
    expect(page.locator('[data-hit="group"]')).to_be_visible()
    page.locator('#studioLayout').select_option('separate')
    page.locator('[data-overlay-tab="lyrics"]').click()
    page.locator('#studioLyricSettings summary').click()
    expect(page.locator('#studioLyricControlHost #lfx')).to_be_visible()
    assert page.locator('#lfx').count() == 1
    page.locator('#lfx').select_option('clean')
    output_settings(page)
    expect(page.locator('#lfx')).to_have_value('clean')
    page.locator('#lfx').select_option(effect)
    print('React Studio passed: responsive/125% viewport, 16:9/portrait, six presets, eight resize handles, ratio lock, unified blocks, undo/redo, shared lyric controls.')


def exercise_guides(page):
    for workspace in ('karaoke', 'playlist'):
        page.locator('#main-' + workspace).click()
        page.locator('#help').click()
        step = 0
        while page.locator('.tour-overlay').is_visible() and step < 24:
            step += 1
            expect(page.locator('.tour-progress')).to_contain_text(f'Step {step} of ')
            page.locator('[data-tour="next"]').click()
            page.wait_for_timeout(60)
        expect(page.locator('.tour-overlay')).to_be_hidden()
        assert step >= 10, (workspace, step)
        expect(page.locator('#songEditorDialog')).to_be_hidden()
        assert not page.locator('#playlistStudio').evaluate('(el) => el.inert')
    page.locator('#main-karaoke').click()
    print('Guides passed: Karaoke/editor dialog, Overlay accordions, focus and workspace restoration.')
