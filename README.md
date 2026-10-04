# Manokara

Public browser karaoke and OBS lyrics with Folia and JIZURA visualizers. Anyone can open the app without an account or password. The Python backend creates private browser rooms and revocable read-only OBS links, so different users can broadcast different songs simultaneously.

Deploy on an Arch Linux VPS using the short [deployment guide](DEPLOY.md): install the Python requirements, set your hostname in `start-manokara.sh`, and run it as your normal user. Python serves both the frontend and relay on `127.0.0.1:8000`; you manage the tunnel and cron yourself.

Requires Python 3.12 or newer and an explicit origin. Setlists and preferences stay in the browser; room identities and anonymous browser credentials are stored in `$HOME/.local/state/manokara` by default. Caddy is not required.

Run security regression tests with `python -m pytest tests/test_security.py`. See the deployment guide for local development and the Chromium smoke test.

Shared lyric parsing and timing live in `outputs/manokara-core.js`; all visualizers consume the same timeline. Use `node --test tests/test_core.cjs` for clock/parser regressions and `python tests/browser_smoke.py --all-effects` for the controller and every output mode.

## Finding and importing lyrics

- **Search LRCLIB** returns lyrics directly in Manokara.
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
