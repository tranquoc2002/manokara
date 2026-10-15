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

### Lyric providers

After updating an existing installation, run `.venv/bin/python -m pip install -r requirements.txt` and restart Python. Multi-source search runs through authenticated `/__lyrics/search` and `/__lyrics/providers` endpoints; TTML file import uses `/__lyrics/import-ttml`. The production requirements include HTTPX. No separate worker, Node process or lyric database is needed. Allow outbound HTTPS to `lrclib.net`, `music.163.com`, `raw.githubusercontent.com` and, when enabled, `api.musixmatch.com`.

The default catalog is LRCLIB, NetEase and AMLL TTML, plus Musixmatch when its API key is configured. Searches run concurrently and rank actual timed lyrics before plain text, then match title/artist and known media duration. There is no provider preference. Each adapter fetches a bounded candidate set, so the combined list is not an exhaustive catalog search. NetEase uses an undocumented endpoint without account cookies; verification or regional restrictions appear as a source warning. Other sources continue to return results.

Optional environment variables belong in your **private** start script or environment, never committed frontend code:

```sh
# Restrict the enabled sources if needed (default: all four, with Musixmatch key-gated).
export MANOKARA_LYRIC_PROVIDERS="lrclib,netease,amll,musixmatch"
# Optional licensed Musixmatch API access, including track.subtitle.get permission.
export MANOKARA_MUSIXMATCH_API_KEY="your-key"
```

Leave optional key variables unset when unused. Musixmatch stays disabled without its key; desktop/session token workarounds are not used. An enabled key can still lack subtitle rights, in which case the UI reports the access problem. Follow the provider's applicable display, territory, caching and OBS/broadcast licensing conditions; supplying a key does not grant additional usage rights.

Manokara shows source links in search, the editor and live lyrics, and keeps source metadata with saved songs. A short RAM cache, bounded request budgets and upstream `Retry-After` cooldowns limit repeated calls. There is no catalog mirroring or lyric cache on disk. Each complete search has up to six concurrent jobs globally and a ten-second provider budget; identical in-flight searches share one job. Cached responses have a total 8 MiB/96-entry limit. Lyricsify retains its separate external search/import button.

NetEase search candidates are cached for one minute and successful lyric details for five minutes. Verification/error payloads returned with HTTP 200 are not cached, and searching again during a cooldown does not extend its deadline. For the same query and duration, a source failure can reuse a successful result up to five minutes old, clearly labeled as recent results; this shares the existing bounded RAM cache. A successful empty response clears that fallback. This reduces disappearing results during brief outages, but does not guarantee upstream availability or bypass verification.

AMLL needs no API key or NetEase session. Its public metadata index downloads lazily (maximum 8 MiB/20,000 records), is parsed into a separate RAM index and refreshes after one hour. Concurrent searches share that download; failed refreshes retain the prior index and report partial results. Only up to four matching TTML files are fetched per query (500 KB each). The first AMLL search can take longer while the index loads. If an existing private script sets `MANOKARA_LYRIC_PROVIDERS`, add `amll` there to enable it. Source links point to [AMLL TTML DB](https://github.com/amll-dev/amll-ttml-db); timing-author attribution is retained. Local TTML import remains available even if AMLL search is disabled. See [TTML support and timing limits](TECHNICAL.md#amll-ttml-and-word-timing).

### Build the frontend before deploying

The production VPS does not need Node.js. On the development machine, use Node.js 20.19+ or 22.12+ and npm to create the static React bundle from the pinned lockfile:

```sh
npm ci
npm run build:react
```

Deploy the generated `outputs/manokara-react.js` and `outputs/manokara-overlay.js`, updated HTML/CSS/assets, and the complete **`server/` package alongside `outputs/`**. `outputs/manokara_server.py` is a compatible launcher that imports this package; copying only `outputs/` is no longer sufficient. A normal checkout/update of the whole repository includes both directories. The Python server continues to serve the built frontend; it does not run Vite or a Node process.

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

## Cloudflare Managed Challenge with OBS excluded

Challenge the controller entry pages on `mano.del4yowo.id.vn`. In your domain's **Security > Security rules**, choose **Create rule > Custom rules**, name it `Manokara entry challenge`, and select **Edit expression**. Paste:

```text
(http.host eq "mano.del4yowo.id.vn"
 and http.request.uri.path in {"/" "/manokara.html"})
```

Set **Then take action** to **Managed Challenge**, then **Deploy**. Change the hostname if you use another domain. See Cloudflare's [custom rule setup](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) and [expression operators](https://developers.cloudflare.com/ruleset-engine/rules-language/operators/).

The path condition also matches controller links with query parameters, such as `/manokara.html?room=...`. It leaves these requests outside this rule:

| Traffic | Paths |
| --- | --- |
| OBS lyric and playlist pages | `/manokara-obs.html`, `/manokara-playlist.html` |
| Embedded lyric renderers | `/manokara-lyrics-view.html`, `/manokara-folia.html` |
| Live state, polling and latency probes | `/__lyric-state` (including `?room=...&stream=1`), `/healthz` |
| Static assets and app APIs | JavaScript, CSS, fonts, effect assets and the other `/__*` endpoints |

OBS uses its existing read-only viewer token; excluding a URL from this challenge does not grant room access. Do not use the presence of `room=` as an exemption, because controller URLs also contain it. The `#view=...` fragment is not sent to Cloudflare and cannot be used in a request rule.

This rule gates the main pages, not direct API requests. The backend's authentication, rate limits and resource limits continue to protect those endpoints. Managed Challenge reduces automated visits but does not guarantee blocking every bot or crawler. For stronger API verification, Cloudflare documents [Turnstile pre-clearance](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/); that would require a separate app integration. A challenge returns HTML and can break JSON requests, video streams and live lyrics if applied to those endpoints.

Other Cloudflare protections still apply independently. Narrow any existing hostname-wide challenge rules or Under Attack Mode configuration that also affects OBS. If **Bot Fight Mode** challenges OBS, it cannot be exempted with a WAF Skip rule; disable that feature or use a protection that supports scoped exceptions. See Cloudflare's [Bot Fight Mode limitations](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/#limitations). A blanket Skip rule for OBS is not required for the entry-page rule above.

After deploying the rule:

1. Open the main site in a fresh private browser window. Cloudflare may verify a human visitor automatically or ask for interaction; every visit will not necessarily show a checkbox.
2. Load both copied OBS source URLs in OBS without browser cookies. Confirm lyrics, Folia effects and the playlist update during playback.
3. If OBS or an API receives HTML, inspect **Security Events** for the responsible rule. Cloudflare marks challenge responses with [`cf-mitigated: challenge`](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/detect-response/). Normal relay responses should be JSON or `text/event-stream`.

Configure this rule in Cloudflare; no start-script change, frontend rebuild or Python restart is needed for the rule itself.

## Runtime behavior

### Backend package and upgrades

`server/app.py` composes routes, schemas, security, repositories and services. The launcher resolves the package/assets relative to its own filename, so the existing absolute-path shell command still works from another working directory. Keep the current `MANOKARA_DATA_DIR`, origin and single-worker launch settings. The credentials/room database schema and OBS token derivation are unchanged; moving the implementation does not require a fresh database or replacement OBS links.

Restart the Python process after deploying backend source changes. The already running process keeps its imported modules until restart; refreshing the web page alone does not load this update. Do not increase Uvicorn workers: live snapshots, writer leases, viewer capacity and media quotas remain in one process. The new Python files are not part of the public static asset manifest.

Run backend checks with `python -m pytest tests/test_security.py tests/test_media.py tests/test_relay_stream.py tests/test_backend_modules.py`. Test dependencies are in `requirements-dev.txt`; these checks use isolated temporary data, not the configured production database.

### Playlist overlay and layout editor

The Playlist and Overlay Studio interface and editor are included in `manokara-react.js`; build that bundle locally with `npm run build:react` before deploying. Keep `manokara-studio.css`, `manokara-overlay.js`, `manokara-playlist.html` / `.css`, `manokara-viewer.js` / `.css`, `manokara-obs.html` and `manokara-lyrics-view.html` for the editor and OBS renderers. The production server still runs Python only. Restart Python after updating so its asset manifest and content security policy include the new bundle, then reload the controller and existing OBS source.

The original lyric URL still works. In the main **Playlist** tab, copy a separate playlist URL into another OBS Browser Source. Use the frame dimensions shown by the editor for both sources. Viewer tokens remain in URL fragments and both outputs follow the same room/revocation rules. The playlist transfers bounded song metadata and layout settings, never executable theme HTML/CSS from uploads. JSON layout imports accept only Manokara's data schema. The request body limit is 384 KiB to accommodate bounded playlist metadata alongside lyrics; existing lyric length checks remain in place.

### YouTube videos that cannot be embedded

The normal YouTube player is tried first. On embedded-player errors 5, 101 or 150, the app tries server playback using yt-dlp and FFmpeg. The supplied start script enables this with `MANOKARA_YTDLP_ENABLED=1` and uses Chrome impersonation with `MANOKARA_YTDLP_IMPERSONATE=chrome`. Both tools and Deno must be in the server account's PATH; install compatible yt-dlp-ejs if your yt-dlp package requires it. You can use Node instead by setting `MANOKARA_YTDLP_JS_RUNTIME=node`. Unset the enabled variable to run with embedded playback only.

When YouTube's oEmbed title lookup fails, the app fetches the title through the same server-side yt-dlp configuration. Titles fill the Add song form or update the saved song if you add it before the lookup finishes. Existing songs using their URL as a title are repaired when played; custom titles are preserved. Title lookups share the four-process lookup limit, are rate limited, and do not allocate or replace video stream tickets.

Video and audio streams are resolved just before playback and remuxed into fragmented MP4 through stdout. Media and signed URLs are never saved to disk or SQLite. Streaming still transfers media bytes: the VPS receives the video and relays it through your tunnel, consuming its bandwidth. The fallback supports public/unlisted, unrestricted recorded videos up to two hours, selects H.264/AAC up to 720p, and bounds lookups to four, active video streams to eight globally/two per browser, and each transfer to 256 MiB. OBS remains a separate read-only lyric output. Other browsers and OBS links cannot use your video relay.

The fallback supports pause, countdown and Start/End. Its native media controls allow seeking within loaded fragments; they do not provide a complete-file timeline. The app's time label uses source metadata for the complete duration. The additional app seek bar was removed after user feedback. Start cuts can align near video keyframes; use live lyric sync if needed. Cookies and yt-dlp do not change the uploader's embedding permission or guarantee that YouTube will supply playable streams.

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

To rebuild Romaji assets from pinned dependencies, run `npm ci --ignore-scripts` and `npm run build:romaji` from the repository root. This is a developer step; normal deployment uses the committed bundle and dictionary. **Lyricsify ↗** opens external search and **Import LRC / TTML** reads downloaded LRC locally (TTML is converted by the authenticated backend); the backend does not scrape Lyricsify.

## Live OBS updates

Deploy `manokara-react.js` for the controller, plus `manokara-relay.js`, `manokara-core.js`, the server and rebuilt Folia entry/bundles. The controller bundle includes the session, audio and lyric editor modules; OBS viewers continue to load their standalone clock and relay files. Restart Python and refresh both the controller and OBS source. OBS uses `GET /__lyric-state?room=…&stream=1` with its existing Authorization header and `Content-Type: text/event-stream`. Preserve that content type through Cloudflare Tunnel; do not cache/buffer the endpoint. Normal polling remains available when streaming cannot connect. Keep one backend worker, as room playback/events live in that process. Audio sharing requires a secure context (HTTPS or local loopback) and explicit user selection of a tab with audio enabled.

Cloudflare documents its streaming content-type requirement in [Tunnel troubleshooting](https://developers.cloudflare.com/tunnel/troubleshooting/). The app sends no recording, only six energy levels; actual lyric/word timing comes from LRC, not audio beat detection.

## Updating the interface

Deploy the updated `outputs/manokara.html`, `outputs/manokara-react.js`, `outputs/manokara-obs.html`, `outputs/manokara_server.py`, `outputs/manokara-ui.css`, `outputs/manokara-icons.svg` and the entire `outputs/ui-assets/` directory together. Build the React bundle locally with `npm run build:react` before deploying; production still runs on the Python server and needs no Node service. Restart your existing Python process using your start script and reload the page and OBS source. Fonts and icons are prebuilt and served by Python. Keep the other existing output assets when updating.

The React bundle contains the YouTube search, guide, language, and Overlay Studio modules; deploy `outputs/manokara_media.py`, `outputs/manokara-react.js`, `outputs/manokara-search.css`, and `outputs/manokara-studio.css` together. The VPS setup already installs yt-dlp, which search uses without an API key. Flat searches do not depend on `MANOKARA_YTDLP_ENABLED`, FFmpeg or a JavaScript runtime. If yt-dlp is absent, install it on PATH or in the server's Python environment with `.venv/bin/python -m pip install -U yt-dlp`. No cookie sharing is used for search. YouTube can still reject or temporarily throttle requests; the dropdown retains an external YouTube search link.

## Source and notices

### Built-in pitch / song key

Main-page refresh keeps the existing Tab Audio window and stream alive. A sessionStorage channel is reused for reloads; newly opened controllers receive a fresh identity. The popup discovers its reloaded opener via same-origin messages and verifies the source Capture Handle before resuming output. A briefly null handle during reload pauses output with a 30-second reconnection limit. A different source, a closed opener or stopped browser tracks still ends capture. This reuses an already approved live stream; it does not store browser capture permission or bypass the picker. Refreshing the audio window itself still destroys its stream.

The experimental YouTube pitch path uses **Tab Audio**, with the original iframe as the playback clock. **Key → Start Tab Audio** opens `/manokara-tab-audio.html`; the user clicks **Choose Manokara tab**, selects the source tab and enables **Share tab audio**. The separate same-origin window uses `getDisplayMedia` → MediaStreamAudioSourceNode → Signalsmith AudioWorklet → local speakers. It does not request media from yt-dlp or transfer music through the tunnel. Capture Handle identifies the source tab, and `suppressLocalAudioPlayback` must be active before processing is allowed. A wrong source, missing audio, unsupported suppression or a source change stops capture and restores original playback. Capture processing stays outside the source tab to avoid feedback. The UI exchanges only saved key, title, language, track/timeline identity and status; messages are checked against the popup/opener, same origin and per-page channel. Video is not displayed, recorded or uploaded. No microphone access is used.

Keep the audio window open, including when returning to Manokara to seek, pause or change key. One capture session follows the setlist's saved keys. Resetting key 0 bypasses DSP while keeping the session; **Stop Tab Audio**, stopping browser sharing or closing either window releases capture. Settings remain saved. The browser requires a user gesture and a new picker approval when capture starts again. This needs an updated desktop Chrome/Edge on HTTPS or localhost, with Capture Handle and original-audio suppression support. OBS must capture the processed browser audio; do not mix an additional unprocessed source. The lyric clock compensates using estimated capture/processor/device latency, which cannot guarantee exact physical device synchronization.

`python tests/browser_smoke.py --pitch-only` exercises the real WASM/AudioWorklet with a synthetic stream and capture picker fixture, including key reuse, native seeking, saved keys and failure cleanup. It does not establish real browser capture support, listening quality or OBS routing on the user's device. Verify those manually before relying on this experimental mode in a stream. The extra app seek bar and the separate YouTube audio source have been removed. The video fallback remains available for embed errors.

Include `manokara-pitch.js`, `manokara-pitch.css`, `manokara-tab-audio.html`, `manokara-tab-audio.js`, `manokara-tab-audio.css` and `pitch-assets/` when deploying. Rebuild the React bundle and restart Python to load the updated allowlist and narrowly scoped `wasm-unsafe-eval` policy for the capture page/AudioWorklet. JavaScript eval remains disabled. Display capture is permitted for the controller/capture page and denied on other served resources; camera/microphone access remains denied.

Tab Audio does not need yt-dlp/FFmpeg. The YouTube video fallback still uses the streaming route and requires `MANOKARA_YTDLP_ENABLED=1` and yt-dlp, FFmpeg, plus Deno or Node on the server account's PATH. The supplied VPS start script already enables fallback streaming. For local PowerShell:

```powershell
$env:MANOKARA_YTDLP_ENABLED="1"
# Use Node if Deno is not installed (Node must be on PATH).
$env:MANOKARA_YTDLP_JS_RUNTIME="node"
.\.venv\Scripts\python.exe outputs/manokara_server.py
```

Keep your existing `MANOKARA_ORIGIN`, `MANOKARA_ALLOW_HTTP` and data-directory settings. Install the media dependencies in the same virtual environment as the server:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements-media.txt
```

On Linux, use `.venv/bin/python -m pip install -r requirements-media.txt`. The server prefers the yt-dlp executable alongside its Python interpreter, avoiding an older global installation on PATH. `MANOKARA_YTDLP_PATH` overrides that choice. For YouTube's JavaScript challenges, Node must be version 22+ or Deno 2.3+; the media requirements include the compatible local EJS solver and optional Chrome impersonation support. FFmpeg must also be available. If stream lookup reports an outdated yt-dlp, update that server environment with `python -m pip install -U "yt-dlp[default,curl-cffi]"`.

Successful public metadata is cached for five minutes; concurrent lookups for the same video share one extraction. Failed lookups wait up to one minute before another extraction, and the controller respects `Retry-After`. Extraction quotas still apply to new lookups; cache hits do not spend the expensive lookup quota. Stream tickets remain tied to the room and browser identity.

The relay detects FFmpeg's HLS `extension_picky` option and adjusts it only for validated YouTube HLS input, whose segment URLs can lack filename extensions. HTTPS transport restrictions and metadata validation still apply. This avoids newer FFmpeg builds rejecting otherwise playable AAC segments. Restart the server after updating the media backend.

YouTube can still reject fallback stream lookups; changing key no longer triggers those lookups for an embeddable video. A direct media source processed without Tab Audio must permit CORS or be served from the same origin. Use Chrome/Edge over HTTPS or localhost for AudioWorklet.

The public `/sources/` URLs deliberately expose the bundled Folia source archive, its integration source, and third-party licenses/notices. Links are available from the controller page. Keep them when deploying updates. Arbitrary directories, Python source, dotfiles, and symlinked files are not served. See the bundled Folia notice for upstream licensing and usage terms.

To rebuild Folia, unpack the provided upstream source archive, copy `manokara-folia.tsx` and `manokara-folia.css` from `outputs/FOLIA-INTEGRATION-SOURCE` into `src/`, copy its HTML and Vite configuration into the upstream root, and copy `ObsWebSourceApp.tsx` into `src/components/obs/`. The shared `manokara-core.js` must be available in Vite's public directory. Install the upstream locked dependencies and run Vite with `vite.manokara.config.mts`. Copy the resulting `folia-assets` and generated module/preload/stylesheet tags into the output entry page, retaining its authenticated source bootstrap and shared-core script. Deploy the integration source alongside the generated bundles.
