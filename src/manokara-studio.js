import { createLifecycle } from './services/lifecycle.mjs';
/* A visual editor for Manokara's original playlist presets and lyric viewport. */
import { persistence } from './services/persistence.mjs';
import { createOverlayStudio } from './services/overlay-studio.mjs';
import { createOverlayPointer } from './features/overlay-studio/pointer-controller.mjs';
const ManokaraStudio = (() => {
  'use strict';

  const lifecycle = createLifecycle();
  const O = ManokaraOverlay;
  const model = createOverlayStudio({ repository: persistence.layout, preferences: persistence.preferences,
    getScene: previewState, measureLyrics: (layout, scene) => O.lyricRect(layout, scene) });
  let config = model.getSnapshot().document, adapter, root, canvas, preview, playlist, lyricFrame,
    scale = 1, target = 'playlist', selected = 'current', dataMode = 'sample', currentMain = 'karaoke', live = null, pointer;
  const previewSubscribers = new Set(), presetPreviews = [], sharedLyricControls = [];
  let demoStart = performance.now(), lastPreviewKey = '', previewDialog, ownedPreview;
  let aspectLocked = model.getSnapshot().aspectLocked;
  const presetDescriptions = {
    glass: 'Broadcast dashboard',
    paper: 'A paper setlist',
    minimal: 'Let the type speak',
    card: 'Artwork in the spotlight',
    vinyl: 'At the turntable',
    signal: 'A compact lower third'
  };
  const vi = {
    'Overlay editor': 'Chỉnh overlay',
    'Design your playlist and lyrics here. OBS follows your saved layout.': 'Chỉnh playlist và khung lời ngay tại đây. OBS sẽ dùng bố cục bạn đã lưu.',
    'Playlist overlay': 'Overlay playlist',
    'Lyrics overlay': 'Overlay lời',
    'Glass': 'Kính mờ',
    'Paper': 'Trang giấy',
    'Minimal': 'Tối giản',
    'Card': 'Thẻ bài hát',
    'Vinyl': 'Đĩa nhạc',
    'Signal': 'Thanh tín hiệu',
    'Broadcast dashboard': 'Bảng setlist kính mờ',
    'A paper setlist': 'Setlist trên trang giấy',
    'Let the type speak': 'Chữ lớn, nền thoáng',
    'Artwork in the spotlight': 'Ảnh bìa làm điểm nhấn',
    'At the turntable': 'Một góc bàn đĩa',
    'A compact lower third': 'Thanh nhạc ở đáy khung',
    'Output frame': 'Khung đầu ra',
    'Canvas dimensions': 'Kích thước khung hình',
    'Frame size': 'Kích thước khung',
    'Landscape 1080p': 'Khung ngang 1080p',
    'Landscape 720p': 'Khung ngang 720p',
    'Portrait': 'Khung dọc',
    'Layout': 'Bố cục',
    'Panel structure': 'Kiểu sắp xếp khối',
    'Choose what to edit': 'Chọn khối để chỉnh',
    'Drag on preview or enter values': 'Kéo ở phần xem trước hoặc nhập số',
    'Text style': 'Kiểu chữ',
    'Colors and song list': 'Màu sắc và danh sách bài',
    'Layout files': 'Tệp bố cục',
    'Save or restore a layout': 'Lưu hoặc khôi phục bố cục',
    'Layout mode': 'Bố cục playlist',
    'Separate blocks': 'Tách từng khối',
    'One unified panel': 'Gom thành một bảng',
    'Whole playlist': 'Bảng playlist',
    'Move and resize the whole panel. Select a section below to edit its text.': 'Kéo và đổi kích thước cả bảng. Chọn từng phần bên dưới để chỉnh chữ.',
    'Auto-scroll song list': 'Tự cuộn danh sách lên/xuống',
    'Scroll speed (px/s)': 'Tốc độ cuộn (px/giây)',
    'Pause at each end (s)': 'Dừng ở mỗi đầu (giây)',
    'Auto-scroll shows the whole list. Short lists stay still.': 'Khi bật cuộn, toàn bộ danh sách sẽ xuất hiện lần lượt. Danh sách ngắn sẽ đứng yên.',
    'Static list limit': 'Số bài khi tắt cuộn',
    'Blocks': 'Các khối',
    'Now Singing': 'Bài đang hát',
    'Song List': 'Danh sách bài',
    'Next On': 'Bài tiếp theo',
    'Lyric viewport': 'Vùng hiển thị lời',
    'Show this block': 'Hiện khối này',
    'Position & size': 'Vị trí và kích thước',
    'Width': 'Rộng',
    'Height': 'Cao',
    'Typography': 'Kiểu chữ',
    'Heading': 'Tiêu đề',
    'Text size': 'Cỡ chữ',
    'Alignment': 'Căn chữ',
    'Left': 'Trái',
    'Center': 'Giữa',
    'Right': 'Phải',
    'Bold': 'Chữ đậm',
    'Appearance': 'Diện mạo',
    'Text': 'Chữ',
    'Accent': 'Màu nhấn',
    'Panel': 'Nền khối',
    'Panel opacity': 'Độ đậm nền',
    'Corner radius': 'Bo góc',
    'Font': 'Font',
    'System': 'Mặc định',
    'Serif': 'Có chân',
    'Mono': 'Đơn cách',
    'List content': 'Nội dung danh sách',
    'Whole setlist': 'Cả setlist',
    'Upcoming songs': 'Bài sắp hát',
    'Sung history': 'Các bài đã hát',
    'Visible songs': 'Số bài hiển thị',
    'Show numbers': 'Hiện số thứ tự',
    'Show progress': 'Hiện tiến trình',
    'Hide when idle': 'Ẩn khi chưa có bài đang hát',
    'Live preview': 'Xem trước',
    'Sample data': 'Dữ liệu mẫu',
    'Live data': 'Bài đang phát',
    'Both overlays': 'Cả hai overlay',
    'Checkerboard': 'Nền caro',
    'Dark': 'Nền tối',
    'Light': 'Nền sáng',
    'Scene guide': 'Mẫu bố cục livestream',
    'Undo': 'Hoàn tác',
    'Redo': 'Làm lại',
    'Reset layout': 'Đặt lại bố cục',
    'Center block': 'Đặt giữa khung',
    'Copy OBS link': 'Sao chép link OBS',
    'Open output': 'Mở đầu ra',
    'Connecting…': 'Đang kết nối…',
    'View larger': 'Xem lớn',
    'Close preview': 'Thu gọn',
    'Keep aspect ratio': 'Giữ tỉ lệ rộng/cao',
    'No song is playing. Choose Sample data to arrange the lyrics.': 'Chưa có bài đang phát. Chọn Dữ liệu mẫu để canh khung lời trước nhé.',
    'This song has no timed lyrics yet. Add LRC in Karaoke, or choose Sample data.': 'Bài này chưa có lời LRC. Thêm lời ở Karaoke, hoặc chọn Dữ liệu mẫu để xem trước.',
    'This lyric block is hidden. Turn on Show this block to preview.': 'Khung lời đang được ẩn. Bật Hiện khối này để xem trước nhé.',
    'Drag blocks to move; resize with handles. Arrow keys nudge or resize. Preview background is local; OBS remains transparent.': 'Kéo khối để di chuyển, dùng tay nắm để đổi cỡ. Phím mũi tên giúp dịch hoặc đổi cỡ. Nền xem trước chỉ hiện trên trang này; OBS vẫn trong suốt.',
    'Top center': 'Giữa trên',
    'Bottom center': 'Giữa dưới',
    'Fit frame to lyrics': 'Khung ôm sát lời',
    'Fits the longest lines in this song. Manual position or size edits turn this off.': 'Khung ôm theo các câu dài nhất trong bài. Chỉnh vị trí hoặc kích thước thủ công sẽ tắt chế độ này.',
    'Text effects use a compact frame. Scene effects and Keep centre free use the full lyric viewport.': 'Hiệu ứng chữ dùng khung gọn. Hiệu ứng dựng cảnh và Chừa trống giữa khung dùng vùng lời đầy đủ.',
    'Resize top left': 'Kéo góc trên trái',
    'Resize top': 'Kéo cạnh trên',
    'Resize top right': 'Kéo góc trên phải',
    'Resize right': 'Kéo cạnh phải',
    'Resize bottom right': 'Kéo góc dưới phải',
    'Resize bottom': 'Kéo cạnh dưới',
    'Resize bottom left': 'Kéo góc dưới trái',
    'Resize left': 'Kéo cạnh trái',
    'Changes saved in this browser.': 'Đã lưu chỉnh sửa trong trình duyệt này.',
    'OBS link copied.': 'Đã sao chép link OBS.',
    'Select and copy the link.': 'Chọn rồi sao chép link nhé.',
    'Export layout': 'Xuất bố cục',
    'Import layout': 'Nhập bố cục',
    'Layout imported.': 'Đã nhập bố cục.',
    'Could not import this layout.': 'Chưa nhập được bố cục này.',
    'Playback keeps running when you switch tabs.': 'Nhạc vẫn chạy khi bạn chuyển tab.',
    'Use these dimensions for both OBS Browser Sources. Keep this page open while singing.': 'Dùng kích thước này cho cả hai nguồn Browser của OBS. Giữ trang mở khi hát.',
    'Lyrics effects and colors are set in Karaoke → OBS output.': 'Chọn hiệu ứng và màu lời ở Karaoke → Đầu ra OBS.',
    'Lyrics appearance': 'Giao diện lời hát',
    'Settings here are shared with Karaoke → OBS output.': 'Chỉnh ở đây cũng cập nhật phần Đầu ra OBS trong Karaoke.',
    'Clear sung history': 'Xóa lịch sử đã hát',
    'Clear the sung history for this session?': 'Xóa lịch sử bài đã hát của phiên này?',
    'Preview only · no song is started': 'Chỉ xem mẫu · không phát bài hát',
    'Storage unavailable. Layout remains in this window.': 'Chưa lưu được vào trình duyệt. Bố cục vẫn được giữ trong cửa sổ này.'
  };
  const t = key => ManokaraI18n.language === 'vi' ? vi[key] || key : key;
  const displayNumber = value => Math.round(value * 1000) / 1000;
  const names = {
    current: 'Now Singing',
    list: 'Song List',
    next: 'Next On',
    lyric: 'Lyric viewport',
    group: 'Whole playlist'
  };
  function status(message) {
    if (!root || lifecycle.disposed) return;
    root.querySelector('#studioStatus').textContent = t(message);
  }

  function save() { model.flush(); }
  function unified() { return model.unified(); }
  function compact() { return model.compact(); }

  function displayBlock() { return model.displayRect(); }

  function textBlock() { return model.textRect(); }
  function syncLyricSettings() {
    const show = currentMain === 'playlist' && target === 'lyrics',
      host = root.querySelector('#studioLyricControlHost');
    root.querySelector('#studioLyricSettings').hidden = !show;
    // Move the independent React root as one host. Its React children stay under
    // the same root while the controls move between the two workspaces.
    for (const {
      node,
      marker
    } of sharedLyricControls) {
      if (show) {
        if (node.parentElement !== host) host.append(node);
      } else if (node.parentNode !== marker.parentNode) marker.before(node);
    }
  }
  function chooseMain(name) {
    if (!root) return;
    pointer?.cancel();
    currentMain = name === 'playlist' ? 'playlist' : 'karaoke';
    document.getElementById('grid').hidden = currentMain !== 'karaoke';
    document.getElementById('playlistStudio').hidden = currentMain !== 'playlist';
    window.dispatchEvent(new CustomEvent('manokara:mainviewchange', {
      detail: currentMain
    }));
    syncLyricSettings();
    // Suspend the expensive lyric preview when it is not on screen.
    if (currentMain === 'karaoke') {
      if (previewDialog?.open) previewDialog.close();
      lyricFrame?.remove();
      lyricFrame = null;
      lastPreviewKey = '';
    } else render();
  }
  function chooseTarget(name) {
    pointer?.cancel(); model.setTarget(name);
    window.dispatchEvent(new CustomEvent('manokara:overlaytargetchange', { detail: target }));
  }
  function sample() {
    const time = (performance.now() - demoStart) / 1000 % 30;
    const titles = ['I Really Want to Stay at Your House', 'Open Arms', '夜に駆ける', 'Một ngày bình yên', 'Fly Me to the Moon', 'Plastic Love', 'Có em', 'Pretender', 'City of Stars', 'Lemon', 'Chúng ta của hiện tại', 'Stay with Me'];
    return {
      ...live,
      ready: true,
      title: titles[0],
      effect: live?.effect || 'clean',
      lrc: live?.effect === 'karaoke-classic' ? '[00:00.00]<00:00.00>Người <00:00.65>hỏi <00:01.20>anh <00:01.85>rằng <00:02.70>vì <00:03.35>sao <00:04.05>trời <00:04.85>lại <00:05.65>mưa<00:07.60>\n[00:08.00]<00:08.00>Người <00:08.60>hỏi <00:09.20>vì <00:09.80>sao <00:10.40>mình <00:11.00>không <00:11.60>giữ <00:12.20>được <00:12.80>nhau <00:13.40>nữa<00:15.60>\n[00:16.00]Một câu hát nối thêm một câu hát\n[00:24.00]Cùng hát theo dòng lời của bạn\n[00:28.00]' : '[00:00.00]Your song, your stage\n[00:05.00]Let the words follow the music\n[00:10.00]Một góc nhỏ cho lời hát\n[00:15.00]君の歌を聞かせて\n[00:20.00]Sing your way\n[00:25.00]Your song, your stage',
      romajiLrc: '',
      time,
      sampledAt: Date.now(),
      duration: 30,
      playing: true,
      paused: false,
      counting: false,
      mc: false,
      playlistTime: time,
      timelineVersion: 1,
      playlist: JSON.stringify({
        now: titles[0],
        next: titles[1],
        status: 'playing',
        videoId: '',
        currentIndex: 0,
        nextIndex: 1,
        songs: titles.map((title, index) => ({
          title,
          index
        })),
        history: [{
          title: 'Last song of the evening',
          index: 4
        }]
      })
    };
  }
  function previewState() {
    return dataMode === 'sample' ? sample() : live || {
      ready: false
    };
  }
  function arrange() {
    if (!canvas) return;
    // Size the visible frame itself, so the checkerboard marks the OBS canvas.
    const space = preview.parentElement,
      w = space.clientWidth,
      h = space.clientHeight;
    if (!w || !h) return;
    const frameScale = Math.min(w / config.width, h / config.height);
    preview.style.width = config.width * frameScale + 'px';
    preview.style.height = config.height * frameScale + 'px';
    preview.style.aspectRatio = config.width + ' / ' + config.height;
    scale = O.fit(canvas, preview, config);
    canvas.style.setProperty('--studio-handle-scale', String(1 / scale));
    arrangePresetPreviews();
  }
  function arrangePresetPreviews() {
    for (const item of presetPreviews) {
      const {
        host,
        stage,
        bounds,
        crop
      } = item;
      if (!host.clientWidth || !host.clientHeight) continue;
      const s = (crop ? Math.max : Math.min)((host.clientWidth - 16) / bounds.w, (host.clientHeight - 12) / bounds.h);
      Object.assign(stage.style, {
        transform: 'scale(' + s + ')',
        left: (host.clientWidth - bounds.w * s) / 2 - bounds.x * s + 'px',
        top: (host.clientHeight - bounds.h * s) / 2 - bounds.y * s + 'px'
      });
    }
  }
  function buildPresetPreviews() {
    for (const theme of O.themes) {
      const host = root.querySelector('[data-theme-preview="' + theme + '"]'),
        stage = document.createElement('div');
      stage.className = 'preset-canvas';
      host.append(stage);
      const preset = O.defaults(theme),
        renderer = O.createPlaylist(stage);
      renderer.render(preset, {
        now: 'Blue hour',
        next: 'Fly Me to the Moon',
        currentIndex: 0,
        nextIndex: 1,
        status: 'paused',
        songs: [{
          index: 0,
          title: 'Blue hour'
        }, {
          index: 1,
          title: 'Fly Me to the Moon'
        }, {
          index: 2,
          title: '夜に駆ける'
        }]
      });
      renderer.tick(74, 210);
      // Preview the primary design at a readable scale, without the empty frame.
      for (const key of ['list', 'next']) renderer.nodes[key].node.hidden = true;
      const blocks = [preset.playlist.blocks.current],
        x = Math.min(...blocks.map(b => b.x)),
        y = Math.min(...blocks.map(b => b.y));
      const bounds = {
        x,
        y,
        w: Math.max(...blocks.map(b => b.x + b.w)) - x,
        h: Math.max(...blocks.map(b => b.y + b.h)) - y
      };
      if (theme === 'card') {
        bounds.x += 20;
        bounds.y += 20;
        bounds.w -= 40;
        bounds.h = 280;
      }
      presetPreviews.push({
        host,
        stage,
        renderer,
        bounds,
        crop: theme === 'card'
      });
    }
  }
  function expandPreview() {
    if (previewDialog.open) {
      previewDialog.close();
      return;
    }
    const pane = root.querySelector('.studio-preview-pane');
    previewDialog.append(pane);
    previewDialog.showModal();
    const button = pane.querySelector('[data-action="expand"]'),
      label = button.querySelector('[data-studio-copy]');
    label.dataset.studioCopy = 'Close preview';
    label.textContent = t('Close preview');
    button.setAttribute('aria-expanded', 'true');
    button.focus();
    arrange();
  }
  function ensureLyrics(show) {
    if (show && !lyricFrame) {
      lyricFrame = document.createElement('iframe');
      lyricFrame.className = 'studio-lyric-preview';
      lyricFrame.title = t('Lyrics overlay');
      lyricFrame.allow = 'autoplay';
      lyricFrame.src = './manokara-lyrics-view.html?preview=1';
      canvas.insertBefore(lyricFrame, canvas.firstChild);
    } else if (!show && lyricFrame) {
      lyricFrame.remove();
      lyricFrame = null;
      lastPreviewKey = '';
    }
    if (lyricFrame) {
      const rect = O.lyricRect(config, previewState());
      O.geometry(lyricFrame, rect);
      lyricFrame.hidden = !rect.visible;
    }
  }
  function tickPreview() {
    if (currentMain !== 'playlist') return;
    const state = previewState();
    let data = {};
    try {
      data = JSON.parse(state.playlist || '{}');
    } catch (_) {}
    playlist.render(config, data);
    playlist.tick(state.playlistTime || 0, state.duration);
    const empty = root.querySelector('#studioEmpty');
    let message = '';
    if (target === 'lyrics') {
      if (!displayBlock().visible) message = 'This lyric block is hidden. Turn on Show this block to preview.';else if (!state.counting && !state.mc) {
        if (state.ready === false || !state.title) message = 'No song is playing. Choose Sample data to arrange the lyrics.';else if (!state.lrc?.trim()) message = 'This song has no timed lyrics yet. Add LRC in Karaoke, or choose Sample data.';
      }
    }
    const shown = t(message);
    if (empty.textContent !== shown) empty.textContent = shown;
    empty.hidden = !message;
    if (lyricFrame) {
      const rect = O.lyricRect(config, state);
      O.geometry(lyricFrame, rect);
      lyricFrame.hidden = !rect.visible;
      const hit = canvas.querySelector('[data-hit="lyric"]');
      if (hit && !pointer?.active) O.geometry(hit, rect);
      if (target === 'lyrics' && !pointer?.active) {
        for (const [key, id] of [['x', 'studioX'], ['y', 'studioY'], ['w', 'studioW'], ['h', 'studioH']]) {
          const input = root.querySelector('#' + id);
          if (document.activeElement !== input) input.value = displayNumber(rect[key]);
        }
        const ratio = rect.w / rect.h;
        root.querySelector('#studioAspectRatio').textContent = Math.abs(ratio - 16 / 9) < .00001 ? '16:9' : Math.abs(ratio - 9 / 16) < .00001 ? '9:16' : Math.abs(ratio - 1) < .00001 ? '1:1' : ratio.toFixed(2) + ':1';
      }
      const key = JSON.stringify([state.lrc, state.romajiLrc, state.effect, state.title, state.playing, state.paused, state.time, state.sampledAt, state.centerFree, state.colorTheme, state.themeSeed, state.foreground, state.size, state.font, state.bold]);
      if (key !== lastPreviewKey) {
        lastPreviewKey = key;
        for (const fn of previewSubscribers) fn(state);
      }
    }
  }
  function render() {
    if (!root) return;
    const p = config.playlist,
      b = displayBlock(),
      text = textBlock();
    syncLyricSettings();
    root.querySelectorAll('[data-target]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.target === target)));
    root.querySelector('#studioLayoutSection').hidden = target === 'lyrics';
    root.querySelector('#studioGroupNote').hidden = !unified();
    root.querySelector('#studioPresets').hidden = target === 'lyrics';
    root.querySelector('#playlistAppearance').hidden = target === 'lyrics';
    root.querySelector('#blockTypography').hidden = target === 'lyrics';
    root.querySelector('#studioCompactSettings').hidden = target !== 'lyrics';
    root.querySelector('#studioAutoFitField').hidden = !compact();
    root.querySelector('#studioAutoFitNote').hidden = !compact();
    root.querySelector('#studioAutoFit').checked = config.lyricCompact.autoFit;
    const values = {
      studioX: displayNumber(b.x),
      studioY: displayNumber(b.y),
      studioW: displayNumber(b.w),
      studioH: displayNumber(b.h),
      studioSize: text.size || 64,
      studioLabel: text.label || '',
      studioAlign: text.align || 'left',
      studioFg: p.foreground,
      studioAccent: p.accent,
      studioBg: p.background,
      studioOpacity: p.opacity,
      studioRadius: p.radius,
      studioFont: p.font,
      studioLimit: p.limit,
      studioListMode: p.listMode,
      studioFrame: config.width + 'x' + config.height,
      studioLayout: p.layout,
      studioScrollSpeed: p.scrollSpeed,
      studioScrollPause: p.scrollPause
    };
    for (const [id, value] of Object.entries(values)) {
      const el = root.querySelector('#' + id);
      if (document.activeElement !== el) el.value = value;
    }
    root.querySelector('#studioVisible').checked = text.visible;
    root.querySelector('#studioBold').checked = !!text.bold;
    root.querySelector('#studioAutoScroll').checked = p.autoScroll;
    root.querySelector('#studioScrollSettings').hidden = !p.autoScroll;
    root.querySelector('#studioLimit').disabled = p.autoScroll;
    root.querySelector('#studioNumbering').checked = p.numbering;
    root.querySelector('#studioProgress').checked = p.progress;
    root.querySelector('#studioHideIdle').checked = p.hideIdle;
    root.querySelector('#studioAspectLock').checked = aspectLocked;
    const aspect = b.w / b.h;
    root.querySelector('#studioAspectRatio').textContent = Math.abs(aspect - 16 / 9) < .00001 ? '16:9' : Math.abs(aspect - 9 / 16) < .00001 ? '9:16' : Math.abs(aspect - 1) < .00001 ? '1:1' : aspect.toFixed(2) + ':1';
    root.querySelectorAll('[data-theme-preset]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themePreset === p.theme)));
    root.querySelector('[data-action="undo"]').disabled = !model.getSnapshot().canUndo;
    root.querySelector('[data-action="redo"]').disabled = !model.getSnapshot().canRedo;
    playlist.root.style.display = target === 'lyrics' && !root.querySelector('#studioBoth').checked ? 'none' : '';
    canvas.querySelectorAll('.studio-hit').forEach(el => el.remove());
    const keys = target === 'lyrics' ? ['lyric'] : unified() ? ['group'] : ['current', 'list', 'next'];
    for (const key of keys) {
      const r = key === 'lyric' ? b : key === 'group' ? p.group : p.blocks[key];
      if (!r.visible) continue;
      const hit = document.createElement('div');
      hit.className = 'studio-hit';
      hit.dataset.hit = key;
      hit.tabIndex = 0;
      hit.setAttribute('role', 'group');
      hit.setAttribute('aria-label', t(names[key]));
      hit.dataset.selected = String(key === 'group' || key === selected);
      O.geometry(hit, r);
      hit.style.zIndex = '40';
      const label = document.createElement('span');
      label.className = 'studio-hit-label';
      label.textContent = t(names[key]);
      hit.append(label);
      if (key === 'group' || key === selected) {
        for (const [dir, name] of Object.entries({
          nw: 'top left',
          n: 'top',
          ne: 'top right',
          e: 'right',
          se: 'bottom right',
          s: 'bottom',
          sw: 'bottom left',
          w: 'left'
        })) {
          const handle = document.createElement('button');
          handle.type = 'button';
          handle.className = 'studio-resize';
          handle.dataset.resize = dir;
          handle.setAttribute('aria-label', t('Resize ' + name));
          hit.append(handle);
        }
      }
      canvas.append(hit);
    }
    const both = root.querySelector('#studioBoth').checked;
    ensureLyrics(currentMain === 'playlist' && (target === 'lyrics' || both));
    root.querySelector('#studioSourceSize').textContent = config.width + ' × ' + config.height;
    const ratio = config.width / config.height;
    root.querySelector('#studioFrameBadge').textContent = config.width + ' × ' + config.height + ' · ' + (Math.abs(ratio - 16 / 9) < .001 ? '16:9' : Math.abs(ratio - 9 / 16) < .001 ? '9:16' : config.width + ':' + config.height);
    root.querySelector('#studioObsUrl').value = adapter.url(target === 'lyrics' ? 'lyrics' : 'playlist') || t('Connecting…');
    arrange();
    tickPreview();
    window.dispatchEvent(new CustomEvent('manokara:studioviewchange', {
      detail: {
        target,
        selected
      }
    }));
  }

  function paintGesture() {
    const r = displayBlock();
    const hit = canvas.querySelector('[data-hit="' + (unified() ? 'group' : selected) + '"]');
    if (hit) O.geometry(hit, r);
    if (selected === 'lyric' && lyricFrame) O.geometry(lyricFrame, r);
    else if (unified()) playlist.place(config);
    else if (playlist.nodes[selected]) O.geometry(playlist.nodes[selected].node, r);
    for (const [key, id] of [['x', 'studioX'], ['y', 'studioY'], ['w', 'studioW'], ['h', 'studioH']]) root.querySelector('#' + id).value = displayNumber(r[key]);
  }

  function init(integration) {
    if (root || lifecycle.disposed) return;
    adapter = integration;
    root = document.getElementById('playlistStudio');
    const lyricSettings = document.getElementById('obsLyricSettingsReactRoot');
    if (lyricSettings) {
      const marker = document.createComment('lyric-settings-home');
      lyricSettings.after(marker);
      sharedLyricControls.push({
        node: lyricSettings,
        marker
      });
    }
    canvas = root.querySelector('#studioCanvas');
    preview = root.querySelector('#studioPreview');
    playlist = O.createPlaylist(canvas);
    buildPresetPreviews();
    pointer = createOverlayPointer({ model, element: preview, scale: () => scale,
      focus: () => canvas.querySelector('[data-hit="' + (unified() ? 'group' : selected) + '"]')?.focus({ preventScroll: true }) });
    lifecycle.own(model.subscribe((state, event) => {
      ({ document: config, target, selected, aspectLocked } = state);
      if (event.kind === 'saved') {
        status(event.ok ? 'Changes saved in this browser.' : 'Storage unavailable. Layout remains in this window.');
      } else if (event.kind === 'preview') paintGesture();
      else {
        render();
        if (event.kind === 'document') adapter.changed();
      }
    }));
    previewDialog = document.createElement('dialog');
    previewDialog.className = 'studio-large-preview';
    previewDialog.setAttribute('aria-labelledby', 'studioPreviewTitle');
    root.append(previewDialog);
    lifecycle.listen(previewDialog, 'close', () => {
      const pane = previewDialog.querySelector('.studio-preview-pane');
      if (!pane) return;
      root.querySelector('.studio-body').append(pane);
      const button = pane.querySelector('[data-action="expand"]'),
        label = button.querySelector('[data-studio-copy]');
      label.dataset.studioCopy = 'View larger';
      label.textContent = t('View larger');
      button.setAttribute('aria-expanded', 'false');
      arrange();
      if (currentMain === 'playlist') button.focus({
        preventScroll: true
      });
    });
    window.ManokaraPreview = ownedPreview = {
      getSnapshot: previewState,
      subscribe(fn) {
        if (lifecycle.disposed) return () => {};
        previewSubscribers.add(fn);
        fn(previewState());
        return () => previewSubscribers.delete(fn);
      }
    };
    lifecycle.listen(root, 'click', async e => {
      const button = e.target.closest('button');
      if (!button) return;
      if (button.dataset.target) {
        chooseTarget(button.dataset.target);
        return;
      }
      if (button.dataset.select) {
        model.select(button.dataset.select);
        return;
      }
      if (button.dataset.themePreset) {
        model.preset(button.dataset.themePreset);
        return;
      }
      const action = button.dataset.action;
      if (action === 'expand') {
        expandPreview();
        return;
      }
      if (['center', 'top-center', 'bottom-center'].includes(action)) model.center(action);
      if (action === 'reset') model.reset();
      if (action === 'undo') model.undo();
      if (action === 'redo') model.redo();
      if (action === 'copy') {
        const url = adapter.url(target === 'lyrics' ? 'lyrics' : 'playlist');
        if (!url) return;
        try {
          await navigator.clipboard.writeText(url);
          status('OBS link copied.');
        } catch (_) {
          if (!root || lifecycle.disposed) return;
          root.querySelector('#studioObsUrl').select();
          status('Select and copy the link.');
        }
      }
      if (action === 'open') {
        const url = adapter.url(target === 'lyrics' ? 'lyrics' : 'playlist');
        if (url) {
          const output = new URL(url);
          output.searchParams.set('popup', '1');
          window.open(output.href, 'manokara-' + target, 'width=1280,height=720');
        }
      }
      if (action === 'history' && confirm(t('Clear the sung history for this session?'))) {
        adapter.clearHistory();
        tickPreview();
      }
      if (action === 'export') {
        const blob = new Blob([JSON.stringify(config, null, 2)], {
            type: 'application/json'
          }),
          url = URL.createObjectURL(blob),
          a = document.createElement('a');
        a.href = url;
        a.download = 'manokara-overlay.json';
        a.click();
        const revoke = lifecycle.own(() => URL.revokeObjectURL(url));
        lifecycle.timeout(revoke, 1000);
      }
      if (action === 'import') root.querySelector('#studioImport').click();
    });
    const fieldMap = {
      studioX: 'x',
      studioY: 'y',
      studioW: 'w',
      studioH: 'h',
      studioSize: 'size',
      studioLabel: 'label',
      studioAlign: 'align',
      studioVisible: 'visible',
      studioBold: 'bold'
    };
    const appearanceMap = {
      studioFg: 'foreground',
      studioAccent: 'accent',
      studioBg: 'background',
      studioOpacity: 'opacity',
      studioRadius: 'radius',
      studioFont: 'font',
      studioLimit: 'limit',
      studioListMode: 'listMode',
      studioNumbering: 'numbering',
      studioProgress: 'progress',
      studioHideIdle: 'hideIdle',
      studioAutoScroll: 'autoScroll',
      studioScrollSpeed: 'scrollSpeed',
      studioScrollPause: 'scrollPause'
    };
    lifecycle.listen(root, 'change', async e => {
      const el = e.target;
      if (el.id === 'studioAutoFit') { model.setAutoFit(el.checked); return; }
      if (el.id === 'studioLayout') { model.setLayout(el.value); return; }
      if (el.id === 'studioFrame') { model.setFrame(el.value); return; }
      if (el.id === 'studioData') {
        pointer.cancel();
        dataMode = el.value;
        demoStart = performance.now();
        lastPreviewKey = '';
        render();
        return;
      }
      if (el.id === 'studioBgView') {
        preview.dataset.bg = el.value;
        return;
      }
      if (el.id === 'studioBoth') {
        render();
        return;
      }
      if (el.id === 'studioAspectLock') {
        model.setAspectLocked(el.checked);
        return;
      }
      if (el.id === 'studioImport') {
        try {
          const file = el.files?.[0];
          if (!file) return;
          if (file.size > 16000) throw Error();
          const value = JSON.parse(await file.text());
          if (lifecycle.disposed) return;
          model.importLayout(value);
          status('Layout imported.');
        } catch (_) {
          status('Could not import this layout.');
        } finally {
          el.value = '';
        }
        return;
      }
      if (fieldMap[el.id] || appearanceMap[el.id]) {
        if (el.type === 'number' && (!el.value || !el.checkValidity())) {
          render();
          return;
        }
        const value = el.type === 'checkbox' ? el.checked : el.type === 'number' ? Number(el.value) : el.value;
        if (fieldMap[el.id]) model.setField(fieldMap[el.id], value);
        else model.setAppearance(appearanceMap[el.id], value);
        if (['studioX', 'studioY', 'studioW', 'studioH'].includes(el.id)) el.value = displayNumber(displayBlock()[fieldMap[el.id]]);
      }
    });
    lifecycle.listen(preview, 'pointerdown', pointer.start);
    lifecycle.listen(preview, 'pointermove', pointer.move);
    lifecycle.listen(preview, 'pointerup', pointer.end);
    lifecycle.listen(preview, 'pointercancel', pointer.end);
    lifecycle.listen(preview, 'lostpointercapture', pointer.end);
    lifecycle.listen(preview, 'keydown', e => {
      const hit = e.target.closest('[data-hit]');
      if (!hit || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
      e.preventDefault();
      model.select(hit.dataset.hit);
      const amount = e.shiftKey ? 10 : 1,
        dx = {
          ArrowLeft: -amount,
          ArrowRight: amount
        }[e.key] || 0,
        dy = {
          ArrowUp: -amount,
          ArrowDown: amount
        }[e.key] || 0,
        dir = e.target.closest('[data-resize]')?.dataset.resize;
      model.transform(dx, dy, dir);
      const current = canvas.querySelector('[data-hit="' + (unified() ? 'group' : selected) + '"]');
      (dir ? current?.querySelector('[data-resize="' + dir + '"]') : current)?.focus({
        preventScroll: true
      });
    });
    const resizeObserver=new ResizeObserver(arrange);resizeObserver.observe(preview.parentElement);lifecycle.own(()=>resizeObserver.disconnect());
    lifecycle.listen(window, 'pagehide', () => { pointer.cancel(); save(); });
    lifecycle.listen(window, 'manokara:languagechange', render);
    lifecycle.listen(document.getElementById('editLyricLayout'), 'click', () => {
      chooseMain('playlist');
      chooseTarget('lyrics');
    });
    render();
    // Live scenes already arrive through feed(). Sample scenes own their 10 Hz demo clock.
    lifecycle.interval(() => { if (dataMode === 'sample') tickPreview(); }, 100);
  }
  return {
    init,
    showMain: chooseMain,
    showTarget: chooseTarget,
    text: t,
    get main() {
      return currentMain;
    },
    get view() {
      return {
        target,
        selected
      };
    },
    restoreView(view) {
      pointer?.cancel(); model.restoreView(view);
    },
    get serialized() {
      return model.serialized;
    },
    feed(snapshot) {
      const wasCompact = compact();
      live = snapshot;
      if (wasCompact !== compact()) pointer?.cancel();
      if (root && currentMain === 'playlist' && !document.getElementById('playlistStudio')?.hidden) {
        if (wasCompact !== compact()) render();else if (dataMode === 'live') tickPreview();
      }
    },
    refresh: render,
    dispose() {
      if (lifecycle.disposed) return;
      pointer?.dispose(); model.dispose(); lifecycle.dispose();
      previewSubscribers.clear();
      if (window.ManokaraPreview === ownedPreview) delete window.ManokaraPreview;
      playlist?.destroy();
      for (const item of presetPreviews) { item.renderer.destroy(); item.stage.remove(); }
      presetPreviews.length = 0;
      lyricFrame?.remove(); lyricFrame = null;
      if (previewDialog?.open) previewDialog.close();
      previewDialog?.remove();
      root = null;
    }
  };
})();
window.ManokaraStudio = ManokaraStudio;
export default ManokaraStudio;
