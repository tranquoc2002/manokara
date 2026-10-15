# Tài liệu kỹ thuật Manokara

Hướng dẫn cài đặt, kiến trúc, OBS và các chức năng chi tiết. Xem [README](README.md) để đọc giới thiệu ngắn hoặc [DEPLOY](DEPLOY.md) để triển khai server.

## Mục lục

- [Cài local trên Windows](#local-setup-windows)
- [Frontend và chế độ phát triển](#frontend-migration)
- [Backend](#backend-boundaries)
- [Nguồn tìm lời](#finding-timed-lyrics)
- [Overlay Studio](#playlist-appearance-and-overlay-editor)
- [Classic karaoke](#classic-karaoke)
- [Đồng bộ OBS và audio reaction](#obs-timing-and-folia-audio-reaction)

## Local setup (Windows)

Cần Python 3.12+, Node.js 22.12+ và FFmpeg trong PATH. Chạy trong thư mục project:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt -r requirements-media.txt
npm ci
npm run build:react
npm run start
```

Mở [localhost:8000/manokara.html](http://localhost:8000/manokara.html). Giữ terminal mở; Ctrl+C để dừng. Những lần sau chỉ cần `npm run start`. Sau khi sửa frontend, chạy lại `npm run build:react` trước khi khởi động.

Để sửa giao diện với hot reload, chạy `npm run dev` và mở địa chỉ được in trong terminal. Dữ liệu trình duyệt gắn với từng origin; dùng lại cùng địa chỉ và profile để thấy setlist cũ.

## Setup and technical documentation

Public browser karaoke and OBS lyrics with Folia and JIZURA visualizers. Anyone can open the app without an account or password. The Python backend creates private browser rooms and revocable read-only OBS links, so different users can broadcast different songs simultaneously.

Deploy on an Arch Linux VPS using the short [deployment guide](DEPLOY.md): install the Python requirements, set your hostname in `start-manokara.sh`, and run it as your normal user. Python serves both the frontend and relay on `127.0.0.1:8000`; you manage the tunnel and cron yourself.

Requires Python 3.12 or newer and an explicit origin. Setlists and preferences stay in the browser; room identities and anonymous browser credentials are stored in `$HOME/.local/state/manokara` by default. Caddy is not required.

The start script enables a yt-dlp/FFmpeg video fallback with Chrome impersonation for YouTube embeds that cannot play. It streams through memory without saving media files; it uses VPS/tunnel bandwidth. See the deployment guide for dependencies, limits and optional server-side Firefox cookies.

Run security regression tests with `python -m pytest tests/test_security.py`. See the deployment guide for local development and the Chromium smoke test.

### Frontend migration

To use the built React UI at the original local address, run `npm run start` and open **http://localhost:8000/manokara.html** in the same browser/profile as before. This serves the current build with Python, using a fixed port rather than selecting another site address. If Manokara is already running there, the command prints its existing URL. A different service occupying port 8000 must be stopped from its own terminal. After source changes, run `npm run build:react` before starting this mode.

Browser data belongs to an exact origin: `localhost:8000`, `127.0.0.1:8000` and the Vite ports have separate setlists, settings and IndexedDB song libraries. An empty library on a new port does not establish that the original data was deleted. The React build keeps the existing storage names. Return to the original address and browser profile to inspect the original data; the starter does not transfer or overwrite either origin's data.

The frontend uses **React + Vite**. This fits Manokara's browser based workspace: Vite builds static files, while the existing Python server continues to handle sessions, relay, media and lyrics APIs. Next.js server rendering would add a second server runtime without helping the OBS Browser Sources or the current client side workflow. `src/manokara-react.jsx` mounts the app and connects its controller; `src/manokara-components.jsx` contains the shared header, YouTube search, guide, workspace and Overlay Studio screens. React also owns the setlist, player surface and controls, live lyrics, personal song library, Song Editor, transpose dialog and OBS appearance settings. Playback is delegated to `src/services/playback.mjs` through the controller; overlay editing uses `src/services/overlay-studio.mjs` with a DOM adapter in `src/manokara-studio.js`. Vite bundles the main page's browser services and Overlay Studio runtime; specialized lyric and playlist renderers remain standalone so frame timing and animation stay independent of React commits. The pitch module stays separate so its WASM processor keeps its stable asset URL. Overlay Studio keeps a frame matched preview as the main work area and puts settings in a right side inspector. Frame size, block selection and position controls are ready when the editor opens; less frequently used layout, typography, appearance and lyric controls stay in collapsible groups. The six preset cards stay compact on wide screens and scroll horizontally on narrower screens. At 1024 CSS pixels and below, the preview moves above the settings for a natural page flow. Rebuild with `npm run build:react`; it generates both `outputs/manokara-react.js` and the shared standalone `outputs/manokara-overlay.js` served by Python.

The Python implementation lives in the repository's `server/` package. Include that directory alongside `outputs/` when deploying and restart Python after backend updates. The compatible entry point remains `outputs/manokara_server.py`; `npm run start` and the existing shell launcher use it unchanged.

For local React development, run `npm run dev` from the project directory. The launcher starts Python and Vite together, automatically chooses available ports starting at 8000 and 5173, and sets the matching origin, API proxy and local HTTP configuration. Open the URL printed as **Open Manokara** and keep the terminal open. Press Ctrl+C to stop both processes started by the launcher. Existing servers are left running. Browser storage is tied to the selected frontend port, so a different port may show a different setlist. The launcher uses the existing `.venv` and `node_modules`; it does not install dependencies. `MANOKARA_DATA_DIR` can override the separate development database directory. YouTube streaming defaults to enabled and uses the existing yt-dlp, FFmpeg and Node dependencies.

For manual UI development, use two PowerShell terminals. In the first, run the Python backend with a separate development database:

```powershell
$env:MANOKARA_ORIGIN="http://localhost:5173"
$env:MANOKARA_ALLOW_HTTP="1"
$env:MANOKARA_DATA_DIR="$env:LOCALAPPDATA\manokara-dev"
.\.venv\Scripts\python.exe outputs/manokara_server.py
```

In the second terminal, run `npm run dev:react`, then open `http://localhost:5173/manokara.html`. Vite serves the existing output HTML and styles, loads React source directly with hot reload, and proxies `/__*` requests to Python on port 8000. The development database is separate from the normal local app data. Use the normal Python origin and the built `outputs/manokara-react.js` for production or the usual port-8000 local site.

If either default development port is already occupied, set `MANOKARA_PORT` for Python, `MANOKARA_VITE_PORT` for Vite, and `MANOKARA_BACKEND_ORIGIN` in the Vite terminal to `http://127.0.0.1:<Python port>`. Set `MANOKARA_ORIGIN` in the Python terminal to `http://localhost:<Vite port>` so the relay validates the browser origin.

Shared lyric parsing and timing live in `outputs/manokara-core.js`; all visualizers consume the same timeline. Use `node --test tests/test_core.cjs tests/test_output_relay.cjs` for clock/parser/relay regressions and `python tests/browser_smoke.py --all-effects` for the React controller, search, Overlay Studio and every output mode. Browser checks use deterministic YouTube/media fixtures; they do not guarantee that a particular public YouTube video permits embedding. Add `--screenshots` to save responsive Studio captures under `.state/react-qa/`, or `--studio-only` to check just that workspace. Install Playwright's Chromium first, or set `MANOKARA_TEST_BROWSER` to a compatible Chromium executable. Run the backend checks with `python -m pytest tests/test_security.py tests/test_media.py tests/test_relay_stream.py`.

### Backend boundaries

`server/app.py` composes the application; `server/runtime.py` owns each instance's repository, limiter, media service, relay and shutdown. `server/routes/` handles HTTP bodies, credentials, quotas and response transport. `server/repositories/rooms.py` owns SQLite credentials/rooms; `server/services/relay.py` owns process-local snapshots, writer leases and viewer capacity. `server/schemas/` validates snapshots and data-only overlay/playlist JSON. Host/origin checks, CSP, asset allowlisting and rate limiting live in `server/security/`. The YouTube process/stream service is `server/services/media.py`; the old media/schema import paths remain compatibility aliases.

The HTTP paths, cookie names, token derivation, SQLite tables and relay packet formats remain the same. Live scenes and quotas are scoped to one application process; run **one worker** as the existing launcher does. SQLite stores credentials/rooms, while setlists and song libraries remain in the browser. This refactor does not add a shared multi-worker relay or a community database.

Relay mutations perform lease checks and scene replacement synchronously after the request body is read. The route rechecks room access after reading a streamed body, so deletion or session expiry during upload cannot recreate a live room. SSE responses release their viewer reservation even if sending headers fails. Each relay wake creates a fresh event generation, including token rotation without a scene change; an already-set event must not keep an authorized reader looping without yielding. Runtime shutdown closes SQLite in a `finally` block if media cleanup fails, and invalid media-tool configuration is checked before opening the database.

Run `python -m pytest tests/test_security.py tests/test_media.py tests/test_relay_stream.py tests/test_backend_modules.py` for the existing contracts plus module identity, route compatibility, isolated runtimes, startup/shutdown failures, streamed-body races and stream cleanup. The launcher check uses a private temporary database/port and an unrelated working directory. `python tests/browser_smoke.py --all-effects` covers the actual server and browser/viewer flows with controlled media fixtures. No real user database or browser profile is used by these tests.

### Persistence boundary

`src/services/persistence.mjs` provides the main UI's setlist, output preferences, layout and song-library repositories. Pure song and lyric-appearance validation lives in `src/domain/`; browser storage and IndexedDB access live in `src/adapters/`. The existing `kpt2` array, `kpt_set` object, `manokaraOverlayV1` object and `manokara-library` version-1 `songs` store remain readable by earlier versions. LRC and Romaji text are retained through persistence, including Enhanced LRC tags; runtime lyric caches are excluded from saved records.

IndexedDB writes report success after transaction completion. Startup import inserts missing library songs atomically and keeps existing library records; generated library IDs are saved before import so reloads can resume. A malformed JSON entry is left intact when read. Before replacing it, storage retains its raw value under `manokaraRecoveryV1` (one latest recovery entry per affected key); if the recovery copy cannot be written, the original entry is kept and the save fails. This is local recovery data, not a server backup or an automatic restore feature.

Run `node --test tests/test_persistence.cjs` for repository and validation cases, and `python tests/browser_smoke.py --storage-only` for legacy browser data, transaction-abort and recovery cases using an isolated test profile.

### Playback boundary

`src/services/playback.mjs` owns one active player, countdown, playable range, key changes, Tab Audio coordination and track transitions. YouTube API loading and native media elements live in `src/adapters/youtube-player.mjs` and `src/adapters/media-element.mjs`. The controller selects songs, connects controls and publishes the existing OBS snapshots through this service. Switching workspaces or Stage preview does not create another player.

`src/domain/playback-clock.mjs` keeps fallback and countdown anchors on monotonic time. Audio discontinuities have a separate version from lyric changes: seeking can reset audio processing, while changing Live sync or lyrics does not flush captured audio. `src/services/lifecycle.mjs` owns controller and track timers, event listeners and cancellation. Track replacement and Stop cancel old API subscriptions, media lookups, delayed skips and end callbacks. A page-cache suspension pauses these scopes; returning resumes the retained player. Normal navigation disposes them while leaving an existing Tab Audio popup available to reconnect on reload.

The playback service exposes commands, `getSnapshot()`, `subscribe()` and terminal `dispose()`. Its snapshots are sampled on request. The UI consumes separate cached feature snapshots described below, while media clocks and output renderers stay outside React.

Run `node --test tests/test_playback.cjs` for deterministic lifecycle/clock/player cases and `python tests/browser_smoke.py --playback-only` for repeated switching, cancelled API/media requests, page transition cleanup and a real native WASM graph returning to key 0. The page transitions are synthetic; they do not prove the browser will admit a live capture page into its back/forward cache. `--pitch-only` exercises the popup processor with a synthetic capture source. Real OBS sound and device latency still need listening on the target device.

### Finding timed lyrics

Song Editor → **Find lyrics** searches **All sources** by default, or one provider from the source selector. LRCLIB, NetEase and AMLL TTML are supported; Musixmatch is available when the server has an authorized subtitle API key. **Results with real timestamps always come first, independent of provider.** Title/artist similarity and known media duration rank results within that group. Identical lyric timelines can share source links; different timing maps remain separate choices. Selecting a result closes the list and preserves the original timestamps. Its source is saved with the song in the setlist and My songs. More providers improve coverage; they do not automatically align a different instrumental recording.

Source failures, verification requirements and rate limits are displayed without discarding successful results from other providers. NetEase can require verification; Musixmatch remains visibly disabled without server configuration. **Lyricsify stays a separate button** for external lookup and local LRC import. See [provider deployment settings](DEPLOY.md#lyric-providers), including provider usage conditions and the required backend restart.

#### AMLL TTML and word timing

[AMLL TTML DB](https://github.com/amll-dev/amll-ttml-db) supplies community-authored TTML. Manokara searches its public metadata index independently of NetEase, then fetches up to four matching lyric files. Results identify **Word-timed lyrics · TTML** when every main line has word timing. Source and timing-author credits are retained with the saved song.

**Import LRC / TTML** also accepts a local `.ttml` file (maximum 500 KB), including file drops. TTML conversion uses the authenticated backend, so restart Python after updating. This supports AMLL's absolute timestamps, not every TTML subtitle profile. The app imports main lyrics; supplied translations, romanization, backing vocals and XML styling are omitted, with a notice when relevant. Overlapping lines retain their times, but single-active-line views may display only one part. Create Romaji after importing if needed.

TTML becomes Enhanced LRC with word starts plus protected `[mk-end:MM:SS.mmm]` line ends and `[mk-ends:seconds,...]` word ends. Classic karaoke and Folia consume these ends, preserving pauses between words; simpler styles use line timing. Blank cues clear instrumental gaps. These tags survive saving, Romaji conversion and the existing window/OBS relay without a database change. Keep timing tags intact when editing. A TTML source still needs to match the recording you sing to; it does not automatically compensate for a different intro or arrangement.

### React feature state

Views for setlist, library, Song Editor, live lyrics, player and OBS settings live under `src/features/`. `src/app/feature-runtime.mjs` supplies cached stores and scoped commands; `src/shared/use-feature-store.js` connects them with React's `useSyncExternalStore`. Unchanged patches keep their snapshot identity and do not notify subscribers. Setlist/library view rows are copies, so mutable playback song identity does not leak into React snapshots. The controller publishes feature state through an imported interface. React controls call imported commands; the old `window.Manokara*` aliases remain for compatible tooling and legacy integrations.

Song Editor draft fields and shared output controls use state as their data source. Moving between workspaces or changing interface language keeps the draft. Pending lyric searches are cancelled or ignored after reset/song changes; old Romaji tasks cannot replace a changed source. Save rejects a second concurrent submission and preserves edits made while the library write is pending. LRC tags and timecodes retain their contents; textarea line endings follow the existing browser normalization to LF.

`src/app/react-roots.jsx` retains one root per existing container. The app entry mounts once and disposes controller, Studio/guide scopes, Romaji worker, subscriptions and roots on terminal navigation. A live Tab Audio popup remains available to reconnect across ordinary reload. Multiple roots are retained because the existing Studio moves the shared settings container between workspaces. Studio geometry/history now live in an independent model; the DOM placement adapters, controller song mutations/session/relay orchestration and legacy i18n adapter still exist.

Check `node --test tests/test_feature_state.cjs` and `python tests/browser_smoke.py --features-only` for stable snapshots, command cleanup, controlled drafts, stale search/conversion callbacks, asynchronous saves and app disposal. The browser check uses a synthetic conversion worker for cancellation; it does not assess Japanese reading quality. The full `--all-effects` suite also checks responsive layouts and the shared settings/preview flows.

### Overlay Studio model

`src/services/overlay-studio.mjs` owns layout commands, selection, bounded undo/redo, gesture transactions and persistence. Pure schema, geometry and history live in `src/domain/overlay-*.mjs`. The DOM adapter displays read-only snapshots and connects browser measurement, controls and lifecycle. `src/features/overlay-studio/pointer-controller.mjs` coalesces pointer movement to animation frames and flushes the last movement before pointer release. A drag changes the local preview; releasing commits one undo step, saves and publishes the layout to OBS. Pointer cancellation, lost capture, workspace changes and disposal discard the uncommitted draft. A failed layout save stays dirty and can be retried on the next flush; it is not reported as saved.

`src/renderers/overlay.js` imports the same version-1 schema as Studio. `npm run build:react` first generates its standalone OBS bundle and then builds React. `npm run build:overlay` rebuilds only the standalone renderer; run it after renderer changes during Vite development to update the independent OBS pages. The existing layout JSON, localStorage key, output URLs and backend API remain unchanged. Text measurement remains in the browser renderer so compact lyric frames use the same rule in Studio and OBS. Media clocks and animation rendering stay outside React state.

Run `node --test tests/test_overlay_model.cjs` for schema compatibility, geometry, transaction/history and persistence failure cases. `python tests/browser_smoke.py --overlay-only` checks real pointer capture, storage, relay to a separate viewer context and reload. `--studio-only` covers responsive layouts, eight resize handles, ratio lock, presets, shared settings and guides. These browser fixtures do not measure frame rate or audio latency in OBS itself.

### Performance measurements

`tests/browser_performance.py` measures an isolated local Chromium session with a clock-only YouTube fixture, 100 setlist entries and 240 timed lyric lines. Cases cover idle, playback, Stage preview, Folia preview and live Overlay Studio. It records React root commits, CDP main-thread task/layout/heap metrics, headless RAF intervals, long tasks, estimated relay age and JSON/SSE body bytes. Output contains counters and artifact hashes, not room tokens or lyric contents. The test probe is never loaded by the app or served as an asset.

With Playwright/Chromium available (or `MANOKARA_TEST_BROWSER` pointing to an installed Chromium executable), run:

```powershell
.\.venv\Scripts\python.exe tests/browser_performance.py --label local --seconds 6 --repeats 3 --output .state/performance/local.json
.\.venv\Scripts\python.exe tests/browser_smoke.py --performance-only
.\.venv\Scripts\python.exe tests/browser_smoke.py --rotation-only
```

`--controller-bundle <saved-bundle.js>` replays an older controller bundle through an isolated browser route without overwriting the current build. Use identical probe, browser, fixtures and flags for before/after comparisons. Results under `.state/` are ignored by Git. CDP task occupancy is not whole-process CPU usage, headless RAF is not OBS FPS, and estimated relay age is not audible latency. Real OBS/CEF, hardware GPU rendering, music and tunnel behavior need measurements on the target setup.

The controller uploads only changed dynamic fields against its last acknowledged scene; static changes and a relay restart still send a full scene. Zero values and pause/countdown transitions remain authoritative. The upload cadence is unchanged. Studio live preview follows incoming scenes; its separate demo timer drives sample data, avoiding duplicate preview passes. Node and browser contract tests cover these behaviors.

### Live lyric preview

The **Your stage** header switches between **YouTube** and **Lyrics preview**. The preview shows the current song through the same renderer and saved layout as the OBS lyric output, including Folia, JIZURA, classic karaoke, Romaji and live sync. It is a view only; arrange the lyric frame in **Overlay**. Effect, colour, font and layout settings are shared across both workspaces. Switching the Stage view keeps the existing media player and its playback position. The preview receives local snapshots without opening another server relay reader, and its renderer is released when you return to YouTube or open the Overlay workspace. Check this workflow with `python tests/browser_smoke.py --stage-only`; add `--screenshots` to capture the desktop views.

### Per-song lyric animation settings

In **OBS output → Lyric animation** (also available in **Overlay → Lyrics overlay**), enable **Save animation settings for this song** (**Lưu setting animation cho bài này**) while the song is selected, then choose its lyric effect and settings. Effect, JIZURA style seed, colours, font, size, bold, background and centre-free options save automatically for that song. Switching songs restores the selected song's saved appearance; songs without a saved style use the shared default. Uncheck the option to return that song to the shared style. Countdown and the overlay's frame geometry remain shared. Saved appearances survive Song Editor changes and are kept in **My songs** when library saving is enabled, so clearing a setlist does not require recreating them.

**Live sync** applies the offset immediately to the lyrics panel, Stage preview, lyric window and OBS. **+0.5 s** shows lyrics earlier and **−0.5 s** shows them later; **Reset** returns the song to zero manual offset. The offset is saved to the setlist and to its linked personal library entry. Manual lyric timing changes do not flush Tab Audio buffers or change playback position. **Set line time / T** also persists newly timed lines to the linked library. Check these controls with `python tests/browser_smoke.py --lyrics-only`; the Tab Audio fixture additionally checks that lyric offset changes do not change the audio timeline.

### Built-in song key

**Tab Audio permission:** the browser's picker and sharing indicator are part of the web capture API. Manokara cannot auto-accept or hide them. Approval is needed once per capture session, not for every song or key change; leave the audio window open to reuse it through the setlist. Refreshing the main Manokara page now keeps the existing capture window/stream and reconnects its controls automatically. Output is muted during reconnection; the app waits up to 30 seconds for the same tab to return. Closing or refreshing the audio window, closing the source tab, or stopping sharing ends capture and requires another approval. If the browser itself ends capture during a source reload, the website cannot revive the stopped stream. A future companion extension could offer a different activation flow, but it is not part of this web build.

Use **Key / Tông** in the header or the **− / + / ↺** controls by the player. Each step is one semitone, from −12 to +12; ↺ restores the original key. **Song key** in the song editor saves a starting key for that setlist entry. Playback speed and LRC timestamps stay unchanged.

The bundled [Signalsmith Stretch](https://github.com/Signalsmith-Audio/signalsmith-stretch) Web Audio build uses WASM and AudioWorklet with split computation. Small shifts (±1–4 semitones) usually give a more natural full mix; large shifts can produce audible artifacts. The controller subtracts the processor and audio-device delay from the lyric clock sent to the window, editor and OBS, in addition to your manual lyric offset. This does not remove video/network buffering or guarantee an exact device latency estimate in every browser.

YouTube key shifting now uses **Tab Audio**, an experimental local capture mode. Open **Key → Start Tab Audio**, then **Choose Manokara tab** in the audio window. Select the original Manokara browser tab and turn on **Share tab audio** in the browser picker. Use an updated desktop Chrome or Edge on HTTPS or localhost. Keep the audio window open while singing. It processes the tab's live sound through Signalsmith; YouTube keeps the video, native timeline, volume and playback controls. Changing key, seeking or changing songs does not start another server audio stream. Saved song keys follow the setlist automatically while capture remains connected. Resetting key 0 bypasses pitch within that capture session; **Stop Tab Audio**, stopping browser sharing, or closing the audio window releases capture and restores the player's original sound. Your saved song keys are retained when capture stops. Capture permission must be granted again for a new session.

The audio window verifies the selected source using Capture Handle and requires suppression of the source tab's local sound to prevent doubled audio. It stops if another tab/window/screen is selected, tab audio is missing, the source changes or the browser cannot suppress original playback. Video capture is used only to identify and monitor the chosen tab; it is not displayed, recorded or uploaded. Audio also stays on the device. Processing occurs outside the captured tab to avoid feeding processed sound into itself. The lyric clock uses the original player time with estimated capture/processor/device delay compensation, plus your manual offset; actual hardware delay may still need adjustment. In OBS, capture the processed browser sound, such as Desktop Audio or application audio capture for the browser, and avoid adding the original source a second time. This mode remains experimental until verified with real music and OBS on your device.

Direct media can still use its local media-element pitch processor when Tab Audio is off; its source must allow CORS or be served from the same origin. While Tab Audio is connected, the local media processor is bypassed to avoid processing twice. Videos that cannot embed retain the server video fallback, which still requires yt-dlp/FFmpeg. The removed extra seek bar stays absent; use native player controls. The app's time label uses source metadata or your Start/End range, while a fallback server video's native timeline represents loaded fragments. Existing Chrome audio extensions should be disabled while Tab Audio is running to avoid combining two processors.

Deploy `outputs/manokara-pitch.js`, `outputs/manokara-pitch.css`, all three `outputs/manokara-tab-audio.*` files and the complete `outputs/pitch-assets/` directory alongside the updated controller/server. The vendor build is pinned to the commit recorded in `pitch-assets/SOURCE.txt`; its MIT license is included. Restart the Python server after updating the asset list and script policy. The pitch vendor assets are prebuilt; rebuild the React bundle when changing frontend source.

The controller has a spacious **Song editor** dialog, a setlist, live lyrics with sync controls, and **OBS output** settings. **My songs** is a personal library stored in this browser and site address; adding a song to a setlist does not remove it from the library, and clearing a setlist leaves the library intact. Existing setlist songs are copied into the library the first time the updated app opens. The library is local to that browser profile and site address; it is not shared between devices or accounts. The app adapts to phones and supports light/dark themes. The interface uses bundled Geist fonts and Phosphor SVG icons; the production server requires neither a Node.js runtime nor external font/icon requests. To rebuild the UI font/icon assets, use `npm ci --ignore-scripts` and `npm run build:ui`. Licenses ship in `outputs/ui-assets/NOTICES.txt`.

## Playlist appearance and overlay editor

Use the main **Karaoke / Overlay** tabs to switch between singing and overlay design. Playback continues while you work on the layout. Playlist includes six original Manokara presets: **Glass, Paper, Minimal, Card, Vinyl and Signal**. These are Manokara designs; no Singing Stream Savior theme files are bundled.

| Preset | Layout |
| --- | --- |
| Glass | Broadcast dashboard: wide current-song panel, highlighted queue and separate next-song card. |
| Paper | Editorial paper cover, ruled setlist and ticket-style next song. |
| Minimal | Large transparent typography with a vertical cue line. |
| Card | Large cover artwork with the queue beside it. |
| Vinyl | Horizontal turntable with a rotating record, centre label and tonearm. |
| Signal | Compact bottom strip with cover icon, progress rail and next song. |

Preset thumbnails use the actual overlay renderer. Select a preset to apply its new layout; **Undo** restores your previous edits. The editor keeps the saved positions until you choose another preset. List text scales down when needed to fit the block, with a minimum of 12 px; enlarge the block if you want to show many songs at a larger size. Record rotation follows play/pause and is disabled when reduced motion is enabled.

Use **View larger** to inspect or arrange an overlay in a larger preview with the same output aspect ratio. **Close preview** or Escape returns to the editor.

Choose **Layout mode → One unified panel** (**Bố cục playlist → Gom thành một bảng**) to stack Now Singing, Song List and Next On in one aligned panel. Move or resize the single outline to adjust all three together. Select each section in the sidebar to change its heading, typography or visibility. **Separate blocks** restores independent positioning. Changing presets keeps your chosen layout mode and unified panel position.

Enable **Auto-scroll song list** (**Tự cuộn danh sách lên/xuống**) to show the entire received list, moving down then back up with a pause at each end. Adjust speed and pause time in the editor. Headings and the current/next song stay fixed; short lists stay still. This works in the preview and Playlist OBS Browser Source for all six presets. The static list limit applies when scrolling is off. Reduced-motion settings disable scrolling and use the static list instead. Scrolling uses a continuous transform animation rather than rebuilding the list with every playback update.

**Keep aspect ratio** links Width and Height for the selected lyric or playlist block, including all four corners and four edges. It preserves that block's current proportions and limits resizing to the output frame. Turn it off to edit the two dimensions independently. The preference is saved in this browser.

The lyric preview shows a checkerboard through transparent areas in both interface themes. **Live data** displays a hint when no song is playing or the song has no LRC; **Sample data** lets you arrange the lyric viewport before playing. Separate windows opened from the controller also show a checkerboard when transparency is enabled. The copied OBS link retains an alpha background.

- Choose **Playlist overlay** to arrange **Now Singing**, **Song List** and **Next On** independently. Change headings, font, size, alignment, colors, panel opacity, corner radius and visibility. Song List can show the setlist, upcoming songs or the current session's sung history. OBS receives up to 120 song titles at a time, with the window following the active song; displayed titles are limited to 160 characters. History is cleared when the controller reloads.
- Choose **Lyrics overlay**, or **Edit lyric layout** in Karaoke → OBS output, to move/resize the complete lyric viewport. The lyric editor also includes the same effect, color, background, font, size, bold, audio-reaction and Keep centre free controls as Karaoke → OBS output. These settings are shared: switching workspaces preserves them and edits update the preview and active OBS/window outputs. Keep centre free applies within that viewport.
- Drag blocks, resize from any of the four corners or four edges, or enter X/Y/Width/Height. **Top center / Center block / Bottom center** quickly place a block. Arrow keys move a focused block or resize a focused handle; Shift uses larger steps. Undo/Redo, reset and JSON import/export are available. Layouts are saved in this browser.
- **Sample data** lets you design without starting a song. **Live data** uses the actual set. **Both overlays** helps compose them together. Checkerboard/light/dark/scene-guide backgrounds are preview aids and are not sent to OBS; the lyric background still follows its Transparent/Green screen setting.
- Copy the Playlist link into a **second OBS Browser Source**. The Lyrics link keeps its existing output URL. Match both OBS sources to the editor's frame size (1920×1080, 1280×720 or 1080×1920), and keep the controller open. Changes update the active sources through the same authenticated relay. **Replace link** revokes both viewer links; copy each new link afterward.

**Compact lyric frames:** Tempera, Sonnet, Lumiere, Hanabi, Clean fade, Word pop, Neon sweep and Glitch hit use a separate text-sized viewport. **Fit frame to lyrics** measures the longest lines in the song, with room for the previous line, Romaji and animation; it does not resize for each lyric cue. Manual position or size edits turn auto-fit off; enable it again to refit. The compact layout is saved separately from the full lyric viewport used by JIZURA, Folia, Classic karaoke and Keep centre free. OBS still uses the chosen canvas dimensions; only the lyric region within that canvas is compact.

The playlist uses HTML/CSS and the shared clock. Position-only edits do not reload the lyric iframe. The editor suspends its lyric preview when returning to Karaoke; OBS outputs keep their own playback feed.

### Help and interface language

Use **? Help / Hướng dẫn** in the header for a guided tour. Each step highlights the actual controls and opens the relevant studio tab. **Next / Tiếp**, **Back / Quay lại**, **Skip / Bỏ qua** and Escape let you navigate or leave. The tour follows the active main tab: **Karaoke** covers songs, lyrics, Romaji, playback, sync, MC breaks, OBS, effects and audio reaction; **Overlay** covers playlist presets, frame size, separate/unified layouts, block placement, aspect ratio, typography, colors, auto-scroll, preview, both OBS links, lyric settings and layout export/import. Closing it restores your previous tab, selected overlay and block, open sections and scroll position; your draft, saved settings and playback keep their state.

Choose **Tiếng Việt** or **English** in the header or inside the guide. The choice is remembered in this browser; the initial language follows the browser language. Interface labels and controller messages are translated, while song names, lyrics and LRC timecodes remain as entered. Translation and tour modules are bundled locally and add no external service or dependency.

After updating these files, restart the Python server and reload the controller so its asset manifest and HTML script policy include the new guide.

## Finding and importing lyrics

### Find a video from the header

Type a song or artist into the header search. After two characters and a short pause, a dropdown shows up to eight YouTube videos with thumbnails, channels and available durations. For a one-character title, press Enter. **Karaoke** prefers backing-track versions and can be switched off; the preference is remembered. Use ↑/↓ and Enter, or click a result. The selected video's link and title fill the Song editor; you can find lyrics and **Add to setlist** from there. Replacing a draft with unsaved edits asks first, and the current playback continues.

Search runs on the Python backend using yt-dlp's [flat search metadata](https://github.com/yt-dlp/yt-dlp#usage-and-options); no YouTube API key is needed. The server needs `yt-dlp` on PATH (already part of the VPS setup), or the `yt_dlp` package in its Python environment. Search also works when the video streaming fallback is disabled and does not require FFmpeg/Deno or download media. It uses two bounded lookup processes, short-lived result caches and request limits, separately from video playback lookups. If YouTube is temporarily unavailable, the dropdown offers **Search on YouTube**.

For a local environment without yt-dlp, install it with `.venv\Scripts\python.exe -m pip install -U yt-dlp`. Restart the Python server after updating the search assets and reload the page.

### Find and import lyrics

- **Find lyrics** combines enabled sources and returns lyrics directly in Manokara, always placing timed LRC before plain text. Choose **All sources** or an individual source; Musixmatch needs a server API key. See [Finding timed lyrics](#finding-timed-lyrics).
- **Lyricsify ↗** opens a search using the song/artist field. Download the matching `.lrc` there and use **Import LRC / TTML**, drop it on the lyric editor, or paste the copied text. This is an external search fallback, not an automated scraper/API integration.
- Imports retain the original LRC tags. Auto encoding handles UTF-8, BOM-marked UTF-16 and Shift_JIS; an encoding selector is available if needed. Title and duration metadata fill empty fields. Choose the recording/version that matches your karaoke audio and adjust Live sync if needed.

## Japanese / Romaji

1. Paste or import Japanese lyrics, then click **Create Romaji**.
2. Review/edit the generated Hepburn readings. Names, ambiguous Kanji and unusual readings in songs may need correction.
3. Choose **Original**, **Romaji**, or **Japanese + Romaji**, then **Add/Save** the song.

**Download Romaji LRC** exports your reviewed copy with the original timecodes. English-only lines stay unchanged and are not duplicated in dual mode.

The original LRC is stored separately from its Romaji copy. Timestamps (including repeated and Enhanced LRC tags), offset/metadata tags and blank lyric gaps are retained; edits that change them cannot be saved as an active Romaji version. Changing the original invalidates the previous conversion. The line-timing tool updates both copies together.

Romaji conversion runs in a local Web Worker before playback; the browser downloads approximately 18 MB of bundled dictionary/converter assets on first use and reuses cached dictionary files. Lyrics are not sent to a translation API. Saved songs retain their generated readings in local storage.

Romaji-only mode feeds the converted text to every existing visualizer. Dual mode uses the original lyric motion plus a smaller synchronized Romaji caption in both the popup and OBS Browser Source, with alternating caption zones for Keep centre free. This adds a readable caption rather than duplicating each effect. Folia uses Enhanced LRC word timestamps when supplied; ordinary LRC only has line timing, so intermediate word timing is approximate. Converting text spans separated by word tags can lose Japanese context, so review those readings carefully.

The prebuilt assets ship under `outputs/romaji-assets/`; production still only needs the Python server. To rebuild them, use Node.js with `npm ci --ignore-scripts` followed by `npm run build:romaji`. Dependencies are pinned in `package-lock.json`; license/IPADIC notices ship in `outputs/romaji-assets/NOTICES.txt`.

## Classic karaoke

Choose **Karaoke → OBS output → Visual style → Classic karaoke · two-line sweep** (**Karaoke cổ điển · quét màu hai dòng**) for two alternating lyric rows near the bottom of the frame. The active line fills from left to right; the other row previews the next line. Words start white with an outline, and the sung highlight defaults to blue. **Sung highlight** (**Màu quét**) selects any highlight color separately from the other effects; Color palette can also supply it. Choosing a custom highlight switches back to Effect palette so the selected color is used. This color is remembered in this browser. Font, size, bold, transparency, Keep centre free and the lyric viewport editor are supported in both the popup and OBS output.

Enhanced LRC word tags such as `[00:08.00]<00:08.00>Người <00:08.60>hỏi` provide real word timings. Ordinary LRC only provides line timings, so its sweep is estimated across the interval until the next timestamp; it cannot infer the singer's exact rhythm. Blank timed lines clear the lyrics for instrumental gaps. The sweep follows the shared playback clock for pause, seek and live sync, without restarting animations on relay updates. **Overlay → Lyrics overlay → Sample data** includes a timed Vietnamese example when this style is selected.

## OBS timing and Folia audio reaction

- OBS receives authenticated Server-Sent Events, with polling as a fallback. Repeated clock updates upload/download small patches rather than the whole LRC. The output compensates estimated transit time on both network legs and gently corrects small clock drift; one-way latency is estimated from round trips, so asymmetric routes and OBS audio buffering may still need Live sync adjustment.
- Popups in the same browser profile receive a direct BroadcastChannel feed while their controller owns the room. OBS uses its separate browser process and still receives the server stream. Running both the controller and OBS from the local server avoids tunnel latency; a local OBS URL cannot read a cloud server's room.
- **Enable audio reaction** lets you choose the karaoke tab and enable **Share tab audio** in Chrome/Edge. Only six audio energy levels are relayed; no recording/audio upload. Supported Folia effects react to these levels. This does not detect BPM or generate lyric timestamps. Disable it with **Stop audio reaction** or the browser's sharing control.
- Folia keeps continuous clock/audio data outside React, caches the theme across lyric changes, and preloads the selected renderer before playback. Complex effects can still cost CPU/GPU time, especially on first initialization or at high output resolutions. These changes do not guarantee a particular frame rate.
