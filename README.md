# Manokara

Browser karaoke and OBS lyrics with Folia and JIZURA visualizers. The Python backend provides authenticated controller sessions, isolated rooms, and revocable read-only OBS access.

Deploy on an Arch Linux VPS using the [deployment guide](DEPLOY.md). Cloudflare Tunnel forwards to `127.0.0.1:8000`; Workers and Pages are not used.

Requires Python 3.12 or newer. The server requires an explicit origin and a generated operator password hash. Setlists and preferences stay in the browser; room identities and sessions are stored outside the web assets directory.

Run security regression tests with `python -m pytest tests/test_security.py`. See the deployment guide for local development and the Chromium smoke test.
