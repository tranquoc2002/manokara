"""Explicit static manifest, safe paths and per-document CSP."""
import base64
import hashlib
import re
from ..config import ROOT

def asset_manifest():
    names = ["manokara.html", "manokara-obs.html", "manokara-folia.html", "manokara.ico", "manokara-react.js",
             "manokara-lyrics-view.html", "manokara-playlist.html",
             "manokara-overlay.js", "manokara-studio.css",
             "manokara-playlist.css", "manokara-viewer.js", "manokara-viewer.css",
             "manokara-ui.css", "manokara-icons.svg",
             "manokara-tour.css", "manokara-search.css",
             "manokara-effects.css", "manokara-effects.js", "manokara-jizura.js", "manokara-jizura-adapter.js",
             "manokara-core.js", "manokara-lyrics.js", "manokara-romaji-worker.js",
             "manokara-relay.js", "manokara-pitch.js", "manokara-pitch.css",
             "manokara-tab-audio.html", "manokara-tab-audio.js", "manokara-tab-audio.css"]
    result = {"/" + name: ROOT / name for name in names}
    for name in ("SignalsmithStretch.mjs", "LICENSE.txt", "SOURCE.txt"):
        result["/pitch-assets/" + name] = ROOT / "pitch-assets" / name
    for file in (ROOT / "ui-assets").iterdir():
        if file.is_file() and file.suffix in (".css", ".svg", ".woff2", ".txt"):
            result["/ui-assets/" + file.name] = file
    # Only the converter, dictionary blobs and notices are served from this directory.
    for file in (ROOT / "romaji-assets").rglob("*"):
        if file.is_file() and file.suffix in (".js", ".gz", ".txt"):
            result["/romaji-assets/" + file.relative_to(ROOT / "romaji-assets").as_posix()] = file
    for file in (ROOT / "folia-assets").iterdir():
        if file.suffix in (".js", ".css", ".png") and file.is_file():
            result["/folia-assets/" + file.name] = file
    # Explicit source/notice downloads; arbitrary files and the Python server are never assets.
    for name in ("FOLIA-MAJOR-SOURCE.zip", "FOLIA-MAJOR-LICENSE.txt", "FOLIA-MAJOR-NOTICE.txt", "JIZURA-LICENSE.txt", "JIZURA-THIRD-PARTY-NOTICES.md"):
        result["/sources/" + name] = ROOT / name
    for name in ("manokara-folia.tsx", "manokara-folia.html", "manokara-folia.css", "vite.manokara.config.mts", "ObsWebSourceApp.tsx"):
        result["/sources/FOLIA-INTEGRATION-SOURCE/" + name] = ROOT / "FOLIA-INTEGRATION-SOURCE" / name
    return result

def safe_asset(path):
    return path.is_file() and path.resolve().is_relative_to(ROOT) and not any(
        part.is_symlink() for part in (path, *path.parents) if part.is_relative_to(ROOT)
    )

def csp_for(path):
    hashes = []
    if path and path.suffix == ".html" and safe_asset(path):
        for attributes, code in re.findall(r"<script\b([^>]*)>(.*?)</script>", path.read_text(encoding="utf-8"), re.S | re.I):
            if not re.search(r"\bsrc\s*=", attributes, re.I):
                digest = base64.b64encode(hashlib.sha256(code.encode()).digest()).decode()
                hashes.append(f"'sha256-{digest}'")
    # The bundled Pixi renderer generates uniform/shader functions at runtime.
    # Scope that exception to Folia's viewer document, never the controller.
    pixi_eval = " 'unsafe-eval'" if path == ROOT / "manokara-folia.html" else ""
    # Signalsmith compiles its bundled WASM in the controller's AudioWorklet.
    # No JavaScript eval or generated blob script is needed.
    pitch_wasm = " 'wasm-unsafe-eval'" if path in (ROOT / "manokara.html", ROOT / "manokara-tab-audio.html", ROOT / "pitch-assets" / "SignalsmithStretch.mjs") else ""
    pixi_connect = " data: blob:" if path == ROOT / "manokara-folia.html" else ""
    return "; ".join([
        "default-src 'none'", "base-uri 'none'", "object-src 'none'", "frame-ancestors 'self'",
        "form-action 'self'", "script-src 'self' " + " ".join(hashes) + pixi_eval + pitch_wasm + " https://www.youtube.com https://s.ytimg.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdmirror.cn/npm/@fontsource/",
        "img-src 'self' data: blob: https:", "media-src 'self' blob: https:",
        "connect-src 'self' https://lrclib.net https://www.youtube.com https://fonts.googleapis.com https://fonts.gstatic.com" + pixi_connect,
        "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com", "worker-src 'self' blob:",
    ])
