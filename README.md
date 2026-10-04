# Manokara

Browser karaoke and OBS lyrics with Folia and JIZURA visualizers. The Python backend provides authenticated controller sessions, isolated rooms, and revocable read-only OBS access.

Deploy on an Arch Linux VPS using the short [deployment guide](DEPLOY.md): install the Python requirements, add your password hash to `start-manokara.sh`, and run it as your normal user. Python serves both the frontend and relay on `127.0.0.1:8000`; you manage the tunnel and cron yourself.

Requires Python 3.12 or newer. The server requires an explicit origin and a generated operator password hash. Setlists and preferences stay in the browser; room identities and sessions are stored in `$HOME/.local/state/manokara` by default. Caddy is not required.

Run security regression tests with `python -m pytest tests/test_security.py`. See the deployment guide for local development and the Chromium smoke test.

Shared lyric parsing and timing live in `outputs/manokara-core.js`; all visualizers consume the same timeline. Use `node --test tests/test_core.cjs` for clock/parser regressions and `python tests/browser_smoke.py --all-effects` for the controller and every output mode.
