# Deploy Manokara

Keep the project in `$HOME/manokara` and run it as your normal user. Python serves the frontend and lyric relay on `127.0.0.1:8000`. Caddy is not required. You manage Cloudflare Tunnel and cron independently.

## Install once

From your project folder on the VPS:

```sh
cd "$HOME/manokara"
python -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
sudo pacman -S --needed yt-dlp ffmpeg deno python-curl_cffi
```

Use Python 3.12 or newer. The app is public and requires no password or account.

The hostname in `start-manokara.sh` is already set to `https://mano.del4yowo.id.vn`; change it if needed. If your checkout is somewhere other than `$HOME/manokara`, change the two paths in the last line. The complete script is:

```sh
#!/bin/sh
export MANOKARA_ORIGIN="https://mano.del4yowo.id.vn"
export MANOKARA_DATA_DIR="$HOME/.local/state/manokara"
export MANOKARA_YTDLP_ENABLED=1
export MANOKARA_YTDLP_IMPERSONATE=chrome

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

Open `https://mano.del4yowo.id.vn`, select **OBS output**, and copy the OBS URL into an OBS Browser Source. A private room opens automatically. OBS links grant read-only access; **Replace link** revokes the old link. OBS does not need cookies.

Keep port 8000 private. Avoid Cloudflare HTML/JavaScript rewriting such as Rocket Loader, which can break the script hashes in the content security policy. Leave HTML and relay responses uncached. Any tunnel access rules must let visitors load the public app and let OBS load its page, assets, and `/__lyric-state` without an interactive login.

## Runtime behavior

### Playlist overlay and layout editor

Deploy the updated controller/session/i18n/tour/server along with `manokara_overlay.py`, `manokara-overlay.js`, `manokara-studio.js` / `.css`, `manokara-playlist.html` / `.css`, `manokara-viewer.js` / `.css`, `manokara-obs.html` and `manokara-lyrics-view.html`. Restart Python so its asset manifest, content security policy and state validation include the new files, then reload the controller and existing OBS source. No new dependency or build step is needed.

The original lyric URL still works. In the main **Playlist** tab, copy a separate playlist URL into another OBS Browser Source. Use the frame dimensions shown by the editor for both sources. Viewer tokens remain in URL fragments and both outputs follow the same room/revocation rules. The playlist transfers bounded song metadata and layout settings, never executable theme HTML/CSS from uploads. JSON layout imports accept only Manokara's data schema. The request body limit is 384 KiB to accommodate bounded playlist metadata alongside lyrics; existing lyric length checks remain in place.

### YouTube videos that cannot be embedded

The normal YouTube player is tried first. On embedded-player errors 5, 101 or 150, the app tries server playback using yt-dlp and FFmpeg. The supplied start script enables this with `MANOKARA_YTDLP_ENABLED=1` and uses Chrome impersonation with `MANOKARA_YTDLP_IMPERSONATE=chrome`. Both tools and Deno must be in the server account's PATH; install compatible yt-dlp-ejs if your yt-dlp package requires it. You can use Node instead by setting `MANOKARA_YTDLP_JS_RUNTIME=node`. Unset the enabled variable to run with embedded playback only.

When YouTube's oEmbed title lookup fails, the app fetches the title through the same server-side yt-dlp configuration. Titles fill the Add song form or update the saved song if you add it before the lookup finishes. Existing songs using their URL as a title are repaired when played; custom titles are preserved. Title lookups share the four-process lookup limit, are rate limited, and do not allocate or replace video stream tickets.

Video and audio streams are resolved just before playback and remuxed into fragmented MP4 through stdout. Media and signed URLs are never saved to disk or SQLite. Streaming still transfers media bytes: the VPS receives the video and relays it through your tunnel, consuming its bandwidth. The fallback supports public/unlisted, unrestricted recorded videos up to two hours, selects H.264/AAC up to 720p, and bounds lookups to four, active video streams to eight globally/two per browser, and each transfer to 256 MiB. OBS remains a separate read-only lyric output. Other browsers and OBS links cannot use your video relay.

The fallback supports the app's pause, countdown and Start/End controls. Start cuts can align near video keyframes; use live lyric sync if needed. Arbitrary seeking to unbuffered portions is unavailable with this pipe stream. Cookies and yt-dlp do not change the uploader's embedding permission or guarantee that YouTube will supply playable streams.

Chrome impersonation requires yt-dlp's curl-cffi support, provided by Arch's [python-curl_cffi package](https://archlinux.org/packages/extra/x86_64/python-curl_cffi/). Check `yt-dlp --list-impersonate-targets` if needed. Unset `MANOKARA_YTDLP_IMPERSONATE` to disable impersonation. It applies to yt-dlp's requests; FFmpeg uses its own transport for media.

Firefox cookies are optional and disabled by default. To use a dedicated Firefox profile belonging to the server account, add these lines to your private start script:

```sh
export MANOKARA_YTDLP_FIREFOX_COOKIES=1
export MANOKARA_YTDLP_FIREFOX_PROFILE="$HOME/.mozilla/firefox/your-profile"
```

The profile variable can be omitted to use yt-dlp's default Firefox profile. Cookies are read only by server subprocesses; there is no cookie upload form or browser-visible cookie data. Use a separate profile/account: a public relay shares its request volume, and stale/account-specific cookies can make videos fail that work without cookies. Private, members-only, age-restricted, live and DRM content remains rejected. An unavailable video shows an error and respects **Skip unavailable songs**.

### Rooms and OBS

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
.venv/bin/python -m pytest tests -q
node --test tests/test_core.cjs tests/test_output_relay.cjs
```

For real-browser tests:

```sh
.venv/bin/python -m pip install playwright==1.63.0
.venv/bin/python -m playwright install chromium
.venv/bin/python tests/browser_smoke.py --all-effects
```

These tests start/stop their own temporary local server. Set `MANOKARA_TEST_BROWSER` to an installed Chromium/Edge executable if preferred. Browser playback cases use a deterministic YouTube API fixture; they do not establish that any particular public video permits embedding.

Node is used for shared-clock unit tests and optional Romaji asset rebuilds, and can replace Deno for yt-dlp. The web server runs Python. External font/media providers still need to be reachable for their functionality.

For local HTTP development only, set `MANOKARA_ORIGIN=http://localhost:8000` and `MANOKARA_ALLOW_HTTP=1`, then invoke the Python entry point directly. Local HTTP is restricted to loopback hostnames. On Windows use `.venv\Scripts\python.exe` and PowerShell `$env:MANOKARA_*` assignments.

Deploy the entire `outputs/romaji-assets/` directory along with the new lyric editor/worker scripts. The Japanese dictionary and converter are prebuilt (approximately 18 MB); no translation service or new Python dependency is required. They load only when **Create Romaji** is clicked and are cacheable public assets. Restart the Python server after updating so its asset allowlist includes the new files, reload the controller, and Refresh the OBS Browser Source. A new controller sends a `romajiLrc` field, so the old server must be updated even for Original mode.

To rebuild Romaji assets from pinned dependencies, run `npm ci --ignore-scripts` and `npm run build:romaji` from the repository root. This is a developer step; normal deployment uses the committed bundle and dictionary. **Lyricsify ↗** opens external search and **Import LRC** reads the downloaded file locally; the backend does not scrape Lyricsify.

## Live OBS updates

Deploy `manokara-relay.js`, `manokara-audio.js`, the updated controller/core/server and the rebuilt Folia entry/bundles together, then restart Python and refresh both the controller and OBS source. OBS uses `GET /__lyric-state?room=…&stream=1` with its existing Authorization header and `Content-Type: text/event-stream`. Preserve that content type through Cloudflare Tunnel; do not cache/buffer the endpoint. Normal polling remains available when streaming cannot connect. Keep one backend worker, as room playback/events live in that process. Audio sharing requires a secure context (HTTPS or local loopback) and explicit user selection of a tab with audio enabled.

Cloudflare documents its streaming content-type requirement in [Tunnel troubleshooting](https://developers.cloudflare.com/tunnel/troubleshooting/). The app sends no recording, only six energy levels; actual lyric/word timing comes from LRC, not audio beat detection.

## Updating the interface

Deploy the updated `outputs/manokara.html`, `outputs/manokara-obs.html`, `outputs/manokara_server.py`, `outputs/manokara-ui.css`, `outputs/manokara-icons.svg` and the entire `outputs/ui-assets/` directory together. Restart your existing Python process using your start script and reload the page and OBS source. Fonts and icons are prebuilt and served by Python; no new service or build step is needed on the VPS. Keep the other existing output assets when updating.

The header's YouTube search also needs the updated `outputs/manokara_media.py`, `outputs/manokara-search.js`, `outputs/manokara-search.css` and `outputs/manokara-i18n.js`. Keep the guide assets (`manokara-tour.js` / `.css`) too. The VPS setup already installs yt-dlp, which search uses without an API key. Flat searches do not depend on `MANOKARA_YTDLP_ENABLED`, FFmpeg or a JavaScript runtime. If yt-dlp is absent, install it on PATH or in the server's Python environment with `.venv/bin/python -m pip install -U yt-dlp`. No cookie sharing is used for search. YouTube can still reject or temporarily throttle requests; the dropdown retains an external YouTube search link.

## Source and notices

The public `/sources/` URLs deliberately expose the bundled Folia source archive, its integration source, and third-party licenses/notices. Links are available from the controller page. Keep them when deploying updates. Arbitrary directories, Python source, dotfiles, and symlinked files are not served. See the bundled Folia notice for upstream licensing and usage terms.

To rebuild Folia, unpack the provided upstream source archive, copy `manokara-folia.tsx` and `manokara-folia.css` from `outputs/FOLIA-INTEGRATION-SOURCE` into `src/`, copy its HTML and Vite configuration into the upstream root, and copy `ObsWebSourceApp.tsx` into `src/components/obs/`. The shared `manokara-core.js` must be available in Vite's public directory. Install the upstream locked dependencies and run Vite with `vite.manokara.config.mts`. Copy the resulting `folia-assets` and generated module/preload/stylesheet tags into the output entry page, retaining its authenticated source bootstrap and shared-core script. Deploy the integration source alongside the generated bundles.
