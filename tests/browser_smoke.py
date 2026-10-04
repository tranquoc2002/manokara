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
from browser_cases import exercise_controller


def main():
    listener = socket.socket()
    listener.bind(("127.0.0.1", 0))
    port = listener.getsockname()[1]
    origin = f"http://127.0.0.1:{port}"
    with tempfile.TemporaryDirectory() as state:
        app = backend.create_app(backend.Settings(origin, Path(state), True))
        server = uvicorn.Server(uvicorn.Config(app, access_log=False, log_level="warning", proxy_headers=False,
                                              timeout_graceful_shutdown=3))
        thread = threading.Thread(target=server.run, kwargs={"sockets": [listener]}, daemon=True)
        thread.start()
        deadline = time.monotonic() + 10
        while not server.started and thread.is_alive() and time.monotonic() < deadline:
            time.sleep(.02)
        assert server.started, "Server did not start."
        errors, violations = [], []
        try:
            with sync_playwright() as playwright:
                browser = playwright.chromium.launch(executable_path=os.environ.get("MANOKARA_TEST_BROWSER") or None,
                                                     args=["--autoplay-policy=no-user-gesture-required"])
                controller = browser.new_context()
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
                assert page.locator('input[type="password"], #logout').count() == 0
                old_link = page.locator("#obsurl").input_value()
                assert "#view=" in old_link and "view=" not in old_link.split("#")[0]
                obs = viewer.new_page()
                watch(obs)
                obs.goto(old_link)
                page.locator("#lfx").select_option("clean")
                # A normal HTTPS link uses the app's clock fallback without fetching external media.
                page.locator("#url").fill("https://example.com/test-song")
                page.locator("#ttl").fill("Browser smoke test")
                page.locator("#llrc").fill("[00:00]Browser smoke test")
                page.locator("#add").click()
                page.locator("#list [data-a='go']").click()
                obs.wait_for_function("() => document.querySelector('#current').textContent === 'Browser smoke test'")
                # A different user opening the first controller URL gets their own room.
                other = second_user.new_page()
                watch(other)
                other.goto(page.url)
                other.wait_for_function("() => document.querySelector('#relayStatus').textContent === 'OBS relay connected'")
                assert other.url != page.url
                other.locator('#lfx').select_option('clean')
                other.locator('#url').fill('https://example.com/second-user')
                other.locator('#ttl').fill('Second user song')
                other.locator('#llrc').fill('[00:00]Second user lyrics')
                other.locator('#add').click()
                other.locator("#list [data-a='go']").click()
                second_obs = second_viewer.new_page()
                watch(second_obs)
                second_obs.goto(other.locator('#obsurl').input_value())
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
                # Verify the bundled visualizer and its nested iframe receive viewer authentication.
                page.locator("#lfx").select_option("folia-classic")
                obs.wait_for_function("() => document.body.dataset.folia === 'on'")
                folia = obs.frame_locator("#foliaFrame")
                folia.locator("#root > *").first.wait_for(timeout=20000)
                assert "#view=" in obs.locator("#foliaFrame").get_attribute("src")
                if "--all-effects" in sys.argv:
                    for mode in sorted(backend.EFFECTS - {"folia-classic", "jizura", "clean"}):
                        page.locator("#lfx").select_option(mode)
                        if mode.startswith("folia-"):
                            obs.locator(f'#foliaFrame[data-mode="{mode}"]').wait_for()
                            folia.locator("#root > *").first.wait_for(timeout=20000)
                        obs.wait_for_timeout(800)
                    print("All visualizer modes loaded.")
                page.locator("#lfx").select_option("jizura")
                obs.wait_for_function("() => document.body.dataset.jizura === 'on'")
                page.locator("#lfx").select_option("clean")
                obs.wait_for_function("() => document.querySelector('#current').textContent === 'Browser smoke test' && document.body.dataset.folia === 'off'")
                page.locator("#rotateobs").click()
                page.wait_for_function("() => document.querySelector('#msg').textContent.startsWith('Previous OBS link revoked.')")
                obs.wait_for_function("() => document.querySelector('#current').textContent.includes('revoked')")
                new_link = page.locator("#obsurl").input_value()
                assert old_link != new_link
                obs.goto(new_link)
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
