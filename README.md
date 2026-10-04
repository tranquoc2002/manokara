# Manokara

Public browser karaoke and OBS lyrics with Folia and JIZURA visualizers. Anyone can open the app without an account or password. The Python backend creates private browser rooms and revocable read-only OBS links, so different users can broadcast different songs simultaneously.

Deploy on an Arch Linux VPS using the short [deployment guide](DEPLOY.md): install the Python requirements, set your hostname in `start-manokara.sh`, and run it as your normal user. Python serves both the frontend and relay on `127.0.0.1:8000`; you manage the tunnel and cron yourself.

Requires Python 3.12 or newer and an explicit origin. Setlists and preferences stay in the browser; room identities and anonymous browser credentials are stored in `$HOME/.local/state/manokara` by default. Caddy is not required.

The start script enables a yt-dlp/FFmpeg video fallback with Chrome impersonation for YouTube embeds that cannot play. It streams through memory without saving media files; it uses VPS/tunnel bandwidth. See the deployment guide for dependencies, limits and optional server-side Firefox cookies.

Run security regression tests with `python -m pytest tests/test_security.py`. See the deployment guide for local development and the Chromium smoke test.

Shared lyric parsing and timing live in `outputs/manokara-core.js`; all visualizers consume the same timeline. Use `node --test tests/test_core.cjs` for clock/parser regressions and `python tests/browser_smoke.py --all-effects` for the controller and every output mode.

The controller has separate **Song editor** and **OBS output** tabs, a setlist, and a live lyrics pane with sync controls. It adapts to phones and supports light/dark themes. The interface uses bundled Geist fonts and Phosphor SVG icons; normal deployment requires no Node.js build or external font/icon requests. To rebuild those assets, use `npm ci --ignore-scripts` and `npm run build:ui`. Licenses ship in `outputs/ui-assets/NOTICES.txt`.

## Help and interface language

Use **? Help / Hướng dẫn** in the header for a guided tour. Each step highlights the actual controls and opens the relevant studio tab. **Next / Tiếp**, **Back / Quay lại**, **Skip / Bỏ qua** and Escape let you navigate or leave. The guide covers adding songs, finding/importing lyrics, Romaji, playback, sync, MC breaks, OBS, effects and audio reaction. Closing it restores your previous tab, open sections and scroll position; your draft and playback keep their state.

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

## OBS timing and Folia audio reaction

- OBS receives authenticated Server-Sent Events, with polling as a fallback. Repeated clock updates upload/download small patches rather than the whole LRC. The output compensates estimated transit time on both network legs and gently corrects small clock drift; one-way latency is estimated from round trips, so asymmetric routes and OBS audio buffering may still need Live sync adjustment.
- Popups in the same browser profile receive a direct BroadcastChannel feed while their controller owns the room. OBS uses its separate browser process and still receives the server stream. Running both the controller and OBS from the local server avoids tunnel latency; a local OBS URL cannot read a cloud server's room.
- **Enable audio reaction** lets you choose the karaoke tab and enable **Share tab audio** in Chrome/Edge. Only six audio energy levels are relayed; no recording/audio upload. Supported Folia effects react to these levels. This does not detect BPM or generate lyric timestamps. Disable it with **Stop audio reaction** or the browser's sharing control.
- Folia keeps continuous clock/audio data outside React, caches the theme across lyric changes, and preloads the selected renderer before playback. Complex effects can still cost CPU/GPU time, especially on first initialization or at high output resolutions. These changes do not guarantee a particular frame rate.
