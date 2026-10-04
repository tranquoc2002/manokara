# Deploy Manokara

Keep the project in `$HOME/manokara` and run it as your normal user. Python serves the frontend and lyric relay on `127.0.0.1:8000`. Caddy is not required. You manage Cloudflare Tunnel and cron independently.

## Install once

From your project folder on the VPS:

```sh
cd "$HOME/manokara"
python -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
.venv/bin/python outputs/manokara_server.py hash-password
```

Use Python 3.12 or newer. The last command asks for your operator password (at least 10 characters) and prints a hash. Copy its complete output, including the `scrypt:` prefix.

Edit `start-manokara.sh` and paste that hash into `MANOKARA_PASSWORD_HASH`. The hostname is already set to `https://mano.del4yowo.id.vn`; change it if needed. If your checkout is somewhere other than `$HOME/manokara`, change the two paths in the last line.

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

Open `https://mano.del4yowo.id.vn`, sign in with your operator password, and copy the OBS URL into an OBS Browser Source. OBS links grant read-only access; "Replace OBS link" revokes the old link. OBS does not need your operator login cookie.

Keep port 8000 private. Avoid Cloudflare HTML/JavaScript rewriting such as Rocket Loader, which can break the script hashes in the content security policy. Leave HTML and relay responses uncached. If you use Cloudflare Access, allow the OBS page, its assets, and `/__lyric-state` to load without an interactive login; the app still validates viewer tokens and operator sessions.

## Runtime behavior

One trusted operator password is shared by signed-in controllers. Browser rooms are separate; clicking a controller claims its room. Operator sessions last 12 hours, and changing the password hash then restarting revokes existing operator sessions. OBS links remain valid until rotated or their room is deleted.

Setlists and preferences stay in the browser. Room identities, viewer-token versions, and unexpired sessions survive restarts in the state database. Live playback resets after a restart and an open controller publishes it again. Run one Python process; the script does not supervise or restart it.

The output and Folia share one clock and one relay reader. Clock samples use server-reported age, so controller and OBS devices can have different wall clocks. A disconnected clock extrapolates for at most 15 seconds. Keep the OBS Browser Source active to avoid background shutdown.

The controller/login CSP prohibits dynamic JavaScript evaluation. Folia's viewer document has a scoped `unsafe-eval` exception for Pixi's shader/uniform compilation. Public hashed Folia assets use immutable caching; HTML, credentials, and relay state remain `no-store`. Access logs are disabled.

## Updates and tests

Stop the server, update the project and install its requirements, then run your start script again. Keep your configured script and state directory when updating; do not commit your password hash. Back up the state directory with the server stopped. Restart after editing HTML so CSP hashes are recomputed.

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

For local HTTP development only, set `MANOKARA_ORIGIN=http://localhost:8000` and `MANOKARA_ALLOW_HTTP=1`, then invoke the Python entry point directly. Local HTTP is restricted to loopback hostnames. On Windows use `.venv\Scripts\python.exe` and PowerShell `$env:MANOKARA_*` assignments.

## Source and notices

The public `/sources/` URLs deliberately expose the bundled Folia source archive, its integration source, and third-party licenses/notices. Links are available from the login and controller pages. Keep them when deploying updates. Arbitrary directories, Python source, dotfiles, and symlinked files are not served. See the bundled Folia notice for upstream licensing and usage terms.

To rebuild Folia, unpack the provided upstream source archive, copy `manokara-folia.tsx` and `manokara-folia.css` from `outputs/FOLIA-INTEGRATION-SOURCE` into `src/`, copy its HTML and Vite configuration into the upstream root, and copy `ObsWebSourceApp.tsx` into `src/components/obs/`. The shared `manokara-core.js` must be available in Vite's public directory. Install the upstream locked dependencies and run Vite with `vite.manokara.config.mts`. Copy the resulting `folia-assets` and generated module/preload/stylesheet tags into the output entry page, retaining its authenticated source bootstrap and shared-core script. Deploy the integration source alongside the generated bundles.
