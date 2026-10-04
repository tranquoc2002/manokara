"""Local Manokara web server with a small lyric-state relay for OBS."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Lock
from urllib.parse import urlsplit
import json
import os
import subprocess


ROOT = Path(__file__).resolve().parent
HOST = "127.0.0.1"
PORT = 8000
STATE = {"ready": False}
STATE_LOCK = Lock()
RELAY_LOCK = Lock()
RELAY_WRITER_ID = None
RELAY_WRITER_LOCKED = False
APP_URL = f"http://localhost:{PORT}/manokara.html"
DATA_ROOT = Path(os.environ.get("LOCALAPPDATA", Path.home())) / "Manokara"


def find_browser():
    roots = [os.environ.get("PROGRAMFILES(X86)"), os.environ.get("ProgramFiles"), os.environ.get("LOCALAPPDATA")]
    candidates = []
    for root in filter(None, roots):
        candidates.extend([
            Path(root) / "Microsoft" / "Edge" / "Application" / "msedge.exe",
            Path(root) / "Google" / "Chrome" / "Application" / "chrome.exe",
        ])
    return next((candidate for candidate in candidates if candidate.is_file()), None)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if urlsplit(self.path).path == "/__lyric-state":
            with STATE_LOCK:
                snapshot = dict(STATE)
            self._json(snapshot)
            return
        super().do_GET()

    def do_POST(self):
        global RELAY_WRITER_ID, RELAY_WRITER_LOCKED
        route = urlsplit(self.path).path
        if route == "/__lyric-owner":
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if length <= 0 or length > 1024:
                    self._json({"error": "Invalid request size."}, 413)
                    return
                payload = json.loads(self.rfile.read(length))
                writer_id = payload.get("writerId") if isinstance(payload, dict) else None
                action = payload.get("action") if isinstance(payload, dict) else None
                if not isinstance(writer_id, str) or not writer_id or len(writer_id) > 128 or action not in ("claim", "renew", "release"):
                    self._json({"error": "Invalid writer request."}, 400)
                    return
            except (ValueError, json.JSONDecodeError):
                self._json({"error": "Invalid JSON."}, 400)
                return
            with RELAY_LOCK:
                if action == "claim":
                    RELAY_WRITER_LOCKED = True
                    RELAY_WRITER_ID = writer_id
                    accepted = True
                elif action == "release":
                    accepted = RELAY_WRITER_ID == writer_id
                    if accepted:
                        RELAY_WRITER_ID = None
                else:
                    accepted = RELAY_WRITER_ID == writer_id
            self._json({"ok": accepted}, 200 if accepted else 409)
            return
        if route == "/__open-browser":
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if length <= 0 or length > 1024:
                    self._json({"error": "Invalid request size."}, 413)
                    return
                payload = json.loads(self.rfile.read(length))
                target = payload.get("target") if isinstance(payload, dict) else None
                if target not in ("app", "install"):
                    self._json({"error": "Unknown browser destination."}, 400)
                    return
                browser = find_browser()
                if browser is None:
                    self._json({"error": "Microsoft Edge or Google Chrome was not found."}, 503)
                    return
                profile = DATA_ROOT / "BrowserProfile"
                profile.mkdir(parents=True, exist_ok=True)
                is_edge = browser.name.lower() == "msedge.exe"
                store_url = (
                    "https://microsoftedge.microsoft.com/addons/detail/transpose-%E2%96%B2%E2%96%BC-pitch-%E2%96%B9-spee/nakcigkhphkecnebinpgpdpbjfjgilkl"
                    if is_edge else
                    "https://chromewebstore.google.com/detail/transpose-pitch-%E2%96%B8-speed-%E2%96%B8/ioimlbgefgadofblnajllknopjboejda"
                )
                destination = store_url if target == "install" else APP_URL
                subprocess.Popen([
                    str(browser), f"--user-data-dir={profile}", "--new-window", destination,
                ], stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                   creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0))
                self._json({"ok": True, "message": f"Đã mở {browser.parent.parent.name} với profile riêng của Manokara."})
            except (ValueError, json.JSONDecodeError):
                self._json({"error": "Invalid JSON."}, 400)
            except OSError as error:
                self._json({"error": f"Browser launch failed: {error}"}, 500)
            return
        if route != "/__lyric-state":
            self.send_error(404)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 1_000_000:
                self.send_error(413)
                return
            payload = json.loads(self.rfile.read(length))
            if not isinstance(payload, dict):
                self.send_error(400)
                return
        except (ValueError, json.JSONDecodeError):
            self.send_error(400)
            return
        writer_id = payload.get("writerId")
        with RELAY_LOCK:
            if isinstance(writer_id, str) and writer_id:
                if not RELAY_WRITER_LOCKED:
                    RELAY_WRITER_LOCKED = True
                    RELAY_WRITER_ID = writer_id
                accepted = RELAY_WRITER_ID == writer_id
            else:
                accepted = not RELAY_WRITER_LOCKED
        if not accepted:
            self._json({"error": "Another Manokara window currently owns the lyric relay."}, 409)
            return
        with STATE_LOCK:
            STATE.clear()
            STATE.update(payload)
        self._json({"ok": True})


if __name__ == "__main__":
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Manokara is serving {ROOT} at http://localhost:{PORT}/manokara.html")
    print("OBS lyric output: http://localhost:8000/manokara-obs.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nManokara server stopped.")
    finally:
        server.server_close()
