# Deploy Manokara

Keep the project in `$HOME/manokara` and run it as your normal user. Python serves the frontend and lyric relay on `127.0.0.1:8000`. Caddy is not required. You manage Cloudflare Tunnel and cron independently.

## Install once

From your project folder on the VPS:

```sh
cd "$HOME/manokara"
python -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

Use Python 3.12 or newer. The app is public and requires no password or account.

The hostname in `start-manokara.sh` is already set to `https://mano.del4yowo.id.vn`; change it if needed. If your checkout is somewhere other than `$HOME/manokara`, change the two paths in the last line. The complete script is:

```sh
#!/bin/sh
export MANOKARA_ORIGIN="https://mano.del4yowo.id.vn"
export MANOKARA_DATA_DIR="$HOME/.local/state/manokara"

umask 077
exec "$HOME/manokara/.venv/bin/python" "$HOME/manokara/outputs/manokara_server.py"
```

Start it with:

```sh
chmod 700 start-manokara.sh
./start-manokara.sh
```

The script runs in the foreground. Run it as the same user who owns your project, without `sudo`. It works regardless of the current working directory. The script does not install packages, start a tunnel, or create services.

## Database location and your startup error

The script uses `$HOME/.local/state/manokara`. Python creates that directory and its database automatically. If `MANOKARA_DATA_DIR` is unset, the backend uses `$XDG_STATE_HOME/manokara`, or `$HOME/.local/state/manokara` when XDG_STATE_HOME is unset.

`sqlite3.OperationalError: unable to open database file` with `/var/lib/manokara` means the account running Python cannot open/create the database there. Change your start script's data directory to:

```sh
export MANOKARA_DATA_DIR="$HOME/.local/state/manokara"
```

You do not need to create a system account or make `/var/lib` writable. A fresh state directory creates new rooms and invalidates old OBS links; copy a new OBS URL from the app. If you need to preserve existing rooms, stop the old server and copy its `relay.sqlite3` into the new directory with your user as owner and mode 600.

Startup now reports the failing directory and a writable-directory suggestion instead of an SQLite traceback for this error.

## Tunnel connection

Point your tunnel at `http://127.0.0.1:8000`. The request's Host header must match the hostname in `MANOKARA_ORIGIN`; preserve the public Host header or set the tunnel's HTTP Host Header to `mano.del4yowo.id.vn`.

A local check is:

```sh
curl --fail -H 'Host: mano.del4yowo.id.vn' http://127.0.0.1:8000/healthz
```

Open `https://mano.del4yowo.id.vn` and copy the OBS URL into an OBS Browser Source. A private room opens automatically. OBS links grant read-only access; "Replace OBS link" revokes the old link. OBS does not need cookies.

Keep port 8000 private. Avoid Cloudflare HTML/JavaScript rewriting such as Rocket Loader, which can break the script hashes in the content security policy. Leave HTML and relay responses uncached. Any tunnel access rules must let visitors load the public app and let OBS load its page, assets, and `/__lyric-state` without an interactive login.

## Runtime behavior

Each browser profile receives an automatic Secure, HttpOnly control cookie. It can control only the rooms it created; visiting someone else's controller URL opens your own room instead. Cookies must be enabled. Tabs in the same profile reuse its room; clicking a controller tab takes control of that room. Separate profiles, private windows, or devices receive separate rooms.

Different users can use OBS simultaneously with different songs. Each user copies their own OBS link from the app. Multiple OBS instances using the same link show the same room. Sharing an OBS link shares viewing access only; it never shares control.

Browser credentials last 30 days and renew when you open the app. Expired credentials and their rooms are cleaned up automatically; OBS links expire with their room. Clearing the control cookie or using a new browser creates a new room, and you must copy its new OBS link. There are no accounts or room recovery passwords. Allocation is rate limited and bounded to 128 rooms total, 8 per browser, and 1024 browser credentials to keep storage and memory bounded.

When upgrading from the operator-password version, the server migrates the database and discards the old shared-operator rooms and sessions. Browser setlists and preferences stay intact. Reload the app and replace existing OBS links with the new ones. Remove any old `MANOKARA_PASSWORD_HASH` line from your own start script; password generation and login have been removed.

Setlists and preferences stay in the browser. Room identities, viewer-token versions, and unexpired sessions survive restarts in the state database. Live playback resets after a restart and an open controller publishes it again. Run one Python process; the script does not supervise or restart it.

The output and Folia share one clock and one relay reader. Clock samples use server-reported age, so controller and OBS devices can have different wall clocks. A disconnected clock extrapolates for at most 15 seconds. Keep the OBS Browser Source active to avoid background shutdown.

The controller CSP prohibits dynamic JavaScript evaluation. Folia's viewer document has a scoped `unsafe-eval` exception for Pixi's shader/uniform compilation. Public hashed Folia assets use immutable caching; HTML, credentials, and relay state remain `no-store`. Access logs are disabled.

## Updates and tests

Stop the server, update the project and install its requirements, then run your start script again. Keep your configured script and state directory when updating. Back up the state directory with the server stopped. Restart after editing HTML so CSP hashes are recomputed.

```sh
.venv/bin/python -m pip install -r requirements-dev.txt
.venv/bin/python -m pytest tests/test_security.py
node --test tests/test_core.cjs
```

For real-browser tests:

```sh
.venv/bin/python -m pip install playwright==1.63.0
.venv/bin/python -m playwright install chromium
.venv/bin/python tests/browser_smoke.py --all-effects
```

These tests start/stop their own temporary local server. Set `MANOKARA_TEST_BROWSER` to an installed Chromium/Edge executable if preferred. Browser playback cases use a deterministic YouTube API fixture; they do not establish that any particular public video permits embedding.

Node is used for shared-clock unit tests and optional Romaji asset rebuilds; production only runs Python. External font/media providers still need to be reachable for their functionality.

For local HTTP development only, set `MANOKARA_ORIGIN=http://localhost:8000` and `MANOKARA_ALLOW_HTTP=1`, then invoke the Python entry point directly. Local HTTP is restricted to loopback hostnames. On Windows use `.venv\Scripts\python.exe` and PowerShell `$env:MANOKARA_*` assignments.

Deploy the entire `outputs/romaji-assets/` directory along with the new lyric editor/worker scripts. The Japanese dictionary and converter are prebuilt (approximately 18 MB); no translation service or new Python dependency is required. They load only when **Create Romaji** is clicked and are cacheable public assets. Restart the Python server after updating so its asset allowlist includes the new files, reload the controller, and Refresh the OBS Browser Source. A new controller sends a `romajiLrc` field, so the old server must be updated even for Original mode.

To rebuild Romaji assets from pinned dependencies, run `npm ci --ignore-scripts` and `npm run build:romaji` from the repository root. This is a developer step; normal deployment uses the committed bundle and dictionary. **Lyricsify ↗** opens external search and **Import LRC** reads the downloaded file locally; the backend does not scrape Lyricsify.

## Source and notices

The public `/sources/` URLs deliberately expose the bundled Folia source archive, its integration source, and third-party licenses/notices. Links are available from the controller page. Keep them when deploying updates. Arbitrary directories, Python source, dotfiles, and symlinked files are not served. See the bundled Folia notice for upstream licensing and usage terms.

To rebuild Folia, unpack the provided upstream source archive, copy `manokara-folia.tsx` and `manokara-folia.css` from `outputs/FOLIA-INTEGRATION-SOURCE` into `src/`, copy its HTML and Vite configuration into the upstream root, and copy `ObsWebSourceApp.tsx` into `src/components/obs/`. The shared `manokara-core.js` must be available in Vite's public directory. Install the upstream locked dependencies and run Vite with `vite.manokara.config.mts`. Copy the resulting `folia-assets` and generated module/preload/stylesheet tags into the output entry page, retaining its authenticated source bootstrap and shared-core script. Deploy the integration source alongside the generated bundles.
