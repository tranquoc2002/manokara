# Manokara

🎤 **Hát karaoke, lên setlist và làm lyric motion ngay trên web.**

Sau một thời gian tớ hoàn thiện, **Manokara đã ra mắt rồi ạ!** Một chiếc web nhỏ để mọi người chuẩn bị bài hát và thêm chút hiệu ứng cho những buổi hát hay livestream của mình ✨

## Website tớ có gì?

- 🔎 **Tìm nhạc YouTube ngay trên web** — tìm tên bài, chọn kết quả là có sẵn link. Bạn dán link YouTube vào cũng được nhé.
- 📋 **Lên setlist cho cả buổi livestream** — thêm và sắp xếp bài hát, tự chuyển bài kèm countdown. Chuẩn bị trước một danh sách là có ngay buổi hát như một show nhạc nhỏ của riêng mình.
- 📝 **Tìm và chỉnh lời bài hát** — tìm lời có sẵn hoặc nhập LRC (lời bài hát có mốc thời gian), rồi chỉnh thời gian chạy cho khớp nhạc.
- 🇯🇵 **Chuyển lời tiếng Nhật sang romaji** — giữ nguyên timecode của LRC để lời vẫn chạy đúng nhịp. Tớ vẫn đang hoàn thiện phần này; một số chữ Kanji, tên riêng hoặc cách đọc trong bài hát có thể cần bạn sửa lại một chút.
- ✨ **Nhiều hiệu ứng lyric motion từ JIZURA và Folia** — thêm chuyển động cho lời bài hát, với nút chọn ngẫu nhiên kiểu chuyển động của JIZURA để đổi không khí mỗi lần hát.
- 🎨 **Tùy chỉnh phần hiển thị lyric** — đổi font, kích thước và bảng màu theo các lựa chọn mà từng hiệu ứng hỗ trợ.
- 🫧 **Đưa lyric vào OBS** — dùng cửa sổ riêng hoặc OBS Browser Source, hỗ trợ nền trong suốt để ghép lên cảnh livestream dễ hơn.
- 🎵 **Đổi tông ngay trong app** — tăng giảm từng nửa cung bằng Signalsmith Stretch, giữ nguyên tốc độ và lưu tông riêng cho mỗi bài. YouTube cần bật phát qua máy chủ; lời hát được bù độ trễ âm thanh cho cả cửa sổ riêng và OBS.
- 🧍 **Chừa trống giữa khung hình** — đặt model VTuber, camera hoặc video của bạn ở giữa; lyric sẽ chạy quanh vùng trống với những hiệu ứng hỗ trợ **Keep centre free**.
- 🌐 **Có tiếng Việt và hướng dẫn từng bước** — bấm nút **? Hướng dẫn** để làm quen với các chức năng ngay trên web.

Mọi người dùng thử rồi góp ý cho tớ nhé. Tớ sẽ tiếp tục hoàn thiện thêm để Manokara ngày càng dễ dùng hơn ạ 🌵

## Setup and technical documentation

Public browser karaoke and OBS lyrics with Folia and JIZURA visualizers. Anyone can open the app without an account or password. The Python backend creates private browser rooms and revocable read-only OBS links, so different users can broadcast different songs simultaneously.

Deploy on an Arch Linux VPS using the short [deployment guide](DEPLOY.md): install the Python requirements, set your hostname in `start-manokara.sh`, and run it as your normal user. Python serves both the frontend and relay on `127.0.0.1:8000`; you manage the tunnel and cron yourself.

Requires Python 3.12 or newer and an explicit origin. Setlists and preferences stay in the browser; room identities and anonymous browser credentials are stored in `$HOME/.local/state/manokara` by default. Caddy is not required.

The start script enables a yt-dlp/FFmpeg video fallback with Chrome impersonation for YouTube embeds that cannot play. It streams through memory without saving media files; it uses VPS/tunnel bandwidth. See the deployment guide for dependencies, limits and optional server-side Firefox cookies.

Run security regression tests with `python -m pytest tests/test_security.py`. See the deployment guide for local development and the Chromium smoke test.

Shared lyric parsing and timing live in `outputs/manokara-core.js`; all visualizers consume the same timeline. Use `node --test tests/test_core.cjs` for clock/parser regressions and `python tests/browser_smoke.py --all-effects` for the controller and every output mode.

### Built-in song key

Use **Key / Tông** in the header or the **− / + / ↺** controls by the player. Each step is one semitone, from −12 to +12; ↺ restores the original key. **Song key** in the song editor saves a starting key for that setlist entry. Playback speed and LRC timestamps stay unchanged.

The bundled [Signalsmith Stretch](https://github.com/Signalsmith-Audio/signalsmith-stretch) Web Audio build uses WASM and AudioWorklet with split computation. Small shifts (±1–4 semitones) usually give a more natural full mix; large shifts can produce audible artifacts. The controller subtracts the processor and audio-device delay from the lyric clock sent to the window, editor and OBS, in addition to your manual lyric offset. This does not remove video/network buffering or guarantee an exact device latency estimate in every browser.

At key 0, YouTube normally uses its embedded player. A nonzero key switches to the existing same-origin server stream, retaining the song position and pause state; this may take a moment to load and consumes server/tunnel bandwidth. Subsequent key changes do not reload the stream. Resetting to 0 bypasses pitch processing while keeping that stream. The server must have streaming enabled and its dependencies installed (see [DEPLOY.md](DEPLOY.md)). If preparation fails, the app reports the reason and returns to the original key. Direct media needs a same-origin response or CORS permission; for a remote CORS-enabled link, choose the key in the editor before starting the song. Existing Chrome extensions can still be used separately, but avoid applying two pitch processors to the same playback.

Deploy `outputs/manokara-pitch.js`, `outputs/manokara-pitch.css` and the complete `outputs/pitch-assets/` directory alongside the updated controller/server. The vendor build is pinned to the commit recorded in `pitch-assets/SOURCE.txt`; its MIT license is included. Restart the Python server after updating the asset list and script policy. No npm build is required.

The controller has separate **Song editor** and **OBS output** tabs, a setlist, and a live lyrics pane with sync controls. It adapts to phones and supports light/dark themes. The interface uses bundled Geist fonts and Phosphor SVG icons; normal deployment requires no Node.js build or external font/icon requests. To rebuild those assets, use `npm ci --ignore-scripts` and `npm run build:ui`. Licenses ship in `outputs/ui-assets/NOTICES.txt`.

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

- **Find lyrics** searches LRCLIB and returns lyrics directly in Manokara.
- **Lyricsify ↗** opens a search using the song/artist field. Download the matching `.lrc` there and use **Import LRC**, drop it on the lyric editor, or paste the copied text. This is an external search fallback, not an automated scraper/API integration.
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
