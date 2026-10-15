"""Real Chromium smoke test: pip install playwright; python -m playwright install chromium."""

from pathlib import Path
import os
import socket
import sys
import tempfile
import threading
import time

import uvicorn
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parents[1] / "outputs"))
import manokara_server as backend
from browser_cases import exercise_controller, exercise_server_fallback, exercise_video_titles, song_editor, set_effect, LyricsOutput, YOUTUBE_FIXTURE
from browser_react_cases import exercise_search, exercise_studio, exercise_guides, exercise_karaoke_layout, exercise_stage_preview
from browser_pitch_cases import exercise_pitch_timeline
from browser_song_settings_cases import exercise_song_settings
from browser_storage_cases import exercise_persistence
from browser_playback_cases import exercise_playback_lifecycle
from browser_feature_cases import exercise_feature_state
from browser_overlay_cases import exercise_overlay_model
from browser_performance_cases import exercise_performance_contracts
from browser_rotation_cases import exercise_rotation


def main():
    listener = socket.socket()
    listener.bind(("127.0.0.1", 0))
    port = listener.getsockname()[1]
    origin = f"http://127.0.0.1:{port}"
    with tempfile.TemporaryDirectory() as state:
        app = backend.create_app(backend.Settings(origin, Path(state), True))
        server = uvicorn.Server(uvicorn.Config(app, access_log=False, log_level="warning", proxy_headers=False,
                                              timeout_keep_alive=1, timeout_graceful_shutdown=10))
        thread = threading.Thread(target=server.run, kwargs={"sockets": [listener]}, daemon=True)
        thread.start()
        deadline = time.monotonic() + 30
        while not server.started and thread.is_alive() and time.monotonic() < deadline:
            time.sleep(.02)
        if not server.started:
            server.should_exit = True
            thread.join(15)
            listener.close()
            raise AssertionError("Test server did not start within 30 seconds.")
        errors, violations = [], []
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(executable_path=os.environ.get("MANOKARA_TEST_BROWSER") or None,
                                                     args=["--autoplay-policy=no-user-gesture-required"])
                try:
                    controller = browser.new_context(viewport={'width':1920,'height':1080}, locale='en-US')
                    controller.add_init_script("localStorage.setItem('manokaraLanguage','en')")
                    viewer = browser.new_context()
                    second_user = browser.new_context()
                    second_viewer = browser.new_context()
                    urls = []
                    controller.add_init_script("document.addEventListener('securitypolicyviolation', e => console.error('CSP-VIOLATION:' + e.violatedDirective + ':' + e.blockedURI))")
                    viewer.add_init_script("document.addEventListener('securitypolicyviolation', e => console.error('CSP-VIOLATION:' + e.violatedDirective + ':' + e.blockedURI))")
                    second_user.add_init_script("document.addEventListener('securitypolicyviolation', e => console.error('CSP-VIOLATION:' + e.violatedDirective + ':' + e.blockedURI))")
                    second_viewer.add_init_script("document.addEventListener('securitypolicyviolation', e => console.error('CSP-VIOLATION:' + e.violatedDirective + ':' + e.blockedURI))")
                    def watch(page):
                        page.on("pageerror", lambda error: errors.append(error.stack or str(error)))
                        page.on("console", lambda message: violations.append(message.text) if message.text.startswith("CSP-VIOLATION:") else None)
                        page.on("request", lambda request: urls.append(request.url))
                    page = controller.new_page()
                    watch(page)
                    page.goto(origin)
                    page.wait_for_url("**/manokara.html?room=*")
                    page.wait_for_function("() => document.querySelector('#relayStatus').textContent === 'OBS relay connected'")
                    if '--rotation-only' in sys.argv:
                        viewer.on('page', watch)
                        exercise_rotation(page, viewer)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--performance-only' in sys.argv:
                        exercise_performance_contracts(page)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--overlay-only' in sys.argv:
                        viewer.on('page', watch)
                        exercise_overlay_model(page, viewer)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--features-only' in sys.argv:
                        exercise_feature_state(page)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--playback-only' in sys.argv:
                        exercise_playback_lifecycle(page)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--pitch-only' in sys.argv:
                        controller.on('page', watch)
                        exercise_pitch_timeline(page)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--lyrics-only' in sys.argv:
                        exercise_song_settings(page)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--storage-only' in sys.argv:
                        exercise_persistence(page)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--media-only' in sys.argv:
                        page.route('https://www.youtube.com/iframe_api', lambda route: route.fulfill(content_type='application/javascript', body=YOUTUBE_FIXTURE))
                        page.evaluate('localStorage.kpt2=JSON.stringify([{title:"First song",url:"https://example.com/first",pitch:0},{title:"Browser smoke test",url:"https://example.com/test-song",lrc:"[00:00]Browser smoke test",pitch:0}])')
                        page.reload()
                        page.wait_for_function('() => document.querySelector("#relayStatus").dataset.state==="connected"')
                        output = viewer.new_page()
                        watch(output)
                        output.goto(page.locator('#obsurl').input_value())
                        exercise_server_fallback(page, LyricsOutput(output))
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--stage-only' in sys.argv:
                        exercise_stage_preview(page, screenshots='--screenshots' in sys.argv)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--karaoke-only' in sys.argv:
                        exercise_karaoke_layout(page, screenshots='--screenshots' in sys.argv)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    if '--studio-only' in sys.argv:
                        exercise_studio(page, screenshots='--screenshots' in sys.argv)
                        exercise_guides(page)
                        assert not errors, errors
                        assert not violations, violations
                        return
                    exercise_stage_preview(page, screenshots='--screenshots' in sys.argv)
                    assert page.locator('input[type="password"], #logout').count() == 0
                    old_link = page.locator("#obsurl").input_value()
                    assert "#view=" in old_link and "view=" not in old_link.split("#")[0]
                    obs = viewer.new_page()
                    watch(obs)
                    obs.goto(old_link)
                    obs = LyricsOutput(obs)
                    set_effect(page, "clean")
                    song_editor(page)
                    # A normal HTTPS link uses the app's clock fallback without fetching external media.
                    page.locator("#url").fill("https://example.com/test-song")
                    page.locator("#ttl").fill("Browser smoke test")
                    page.locator("#llrc").fill("[00:00]Browser smoke test")
                    page.locator("#add").click()
                    page.locator('#songEditorDialog').wait_for(state='hidden')
                    page.locator("#list [data-a='go']").click()
                    obs.wait_for_function("() => document.querySelector('#current').textContent === 'Browser smoke test'")
                    # A different user opening the first controller URL gets their own room.
                    other = second_user.new_page()
                    watch(other)
                    other.goto(page.url)
                    other.wait_for_function("() => document.querySelector('#relayStatus').textContent === 'OBS relay connected'")
                    assert other.url != page.url
                    set_effect(other, 'clean')
                    song_editor(other)
                    other.locator('#url').fill('https://example.com/second-user')
                    other.locator('#ttl').fill('Second user song')
                    other.locator('#llrc').fill('[00:00]Second user lyrics')
                    other.locator('#add').click()
                    other.locator('#songEditorDialog').wait_for(state='hidden')
                    other.locator("#list [data-a='go']").click()
                    second_obs = second_viewer.new_page()
                    watch(second_obs)
                    second_obs.goto(other.locator('#obsurl').input_value())
                    second_obs = LyricsOutput(second_obs)
                    second_obs.wait_for_function("() => document.querySelector('#current').textContent === 'Second user lyrics'")
                    assert obs.locator('#current').inner_text() == 'Browser smoke test'
                    own_url, own_link = other.url, other.locator('#obsurl').input_value()
                    # Reopening another user's URL reuses the second user's existing room.
                    other.goto(page.url)
                    other.wait_for_function("() => document.querySelector('#relayStatus').textContent === 'OBS relay connected'")
                    assert other.url == own_url and other.locator('#obsurl').input_value() == own_link
                    other.locator("#list [data-a='go']").click()
                    second_obs.wait_for_function("() => document.querySelector('#current').textContent === 'Second user lyrics'")
                    exercise_controller(page, obs, origin)
                    exercise_server_fallback(page, obs)
                    exercise_video_titles(page)
                    exercise_search(page)
                    exercise_studio(page, screenshots='--screenshots' in sys.argv)
                    exercise_guides(page)
                    # Verify the bundled visualizer and its nested iframe receive viewer authentication.
                    set_effect(page, "folia-classic")
                    obs.wait_for_function("() => document.body.dataset.folia === 'on'")
                    folia = obs.frame_locator("#foliaFrame")
                    folia.locator("#root > *").first.wait_for(timeout=20000)
                    assert "#view=" in obs.locator("#foliaFrame").get_attribute("src")
                    if "--all-effects" in sys.argv:
                        selectable = set(page.locator('#lfx option').evaluate_all('(options)=>options.map(option=>option.value)'))
                        for mode in sorted(selectable - {"folia-classic", "jizura", "clean"}):
                            set_effect(page, mode)
                            if mode.startswith("folia-"):
                                obs.locator(f'#foliaFrame[data-mode="{mode}"]').wait_for()
                                folia.locator("#root > *").first.wait_for(timeout=20000)
                            obs.wait_for_timeout(800)
                        print("All visualizer modes loaded.")
                    set_effect(page, "jizura")
                    obs.wait_for_function("() => document.body.dataset.jizura === 'on'")
                    set_effect(page, "clean")
                    obs.wait_for_function("() => document.querySelector('#current').textContent === 'Browser smoke test' && document.body.dataset.folia === 'off'")
                    page.locator("#rotateobs").click()
                    page.wait_for_function("() => document.querySelector('#msg').textContent.startsWith('Previous OBS links revoked.')")
                    obs.page.wait_for_function("() => document.querySelector('#viewerStatus').textContent.includes('revoked')")
                    new_link = page.locator("#obsurl").input_value()
                    assert old_link != new_link
                    obs.goto(new_link)
                    obs.page.wait_for_function('(token) => document.querySelector("#lyricViewport")?.src.endsWith("#view=" + token)', arg=new_link.split('#view=')[1])
                    obs.wait_for_function("() => document.querySelector('#current').textContent === 'Browser smoke test'")
                    token = new_link.split("#view=")[1]
                    assert not any(token in url for url in urls), "Viewer token leaked into an HTTP URL."
                    assert viewer.cookies() == [] and second_viewer.cookies() == [], "OBS viewers must not need cookies."
                    assert second_obs.locator('#current').inner_text() == 'Second user lyrics'
                    # Closing one controller does not affect the other user's OBS output.
                    other.close()
                    obs.reload()
                    obs.wait_for_function("() => document.querySelector('#current').textContent === 'Browser smoke test'")
                    assert not errors, errors
                    assert not violations, violations
                finally:
                    if browser.is_connected():
                        browser.close()
            print("Browser smoke passed: public access, simultaneous users and OBS viewers, room reuse, live relay, Folia, JIZURA, token rotation, cookie-free OBS, CSP.")
        except Exception:
            print("Browser errors:", errors)
            print("CSP violations:", violations)
            raise
        finally:
            server.should_exit = True
            thread.join(15)
            assert not thread.is_alive(), "Test server did not shut down."
            listener.close()


if __name__ == "__main__":
    main()
