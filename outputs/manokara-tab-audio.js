/* Local-only tab capture. Video is retained only to identify the selected tab;
   it is never displayed, recorded or uploaded. Audio output lives outside it. */
const params = new URLSearchParams(location.hash.slice(1));
const channel = params.get('channel');
const parent = window.opener;
const $ = id => document.getElementById(id);
const vi = {
  'Keep YouTube playing in Manokara. This window changes the sound from that tab.': 'Cứ phát YouTube trong Manokara như bình thường. Cửa sổ này sẽ đổi tông âm thanh của tab đó.',
  'Choose the Manokara tab, not this audio window.': 'Chọn tab Manokara đang phát nhạc, đừng chọn cửa sổ âm thanh này nhé.',
  'Turn on Share tab audio in the browser dialog.': 'Bật “Chia sẻ âm thanh của thẻ” trong hộp thoại trình duyệt.',
  'Keep this window open while singing; change key in Manokara.': 'Giữ cửa sổ này mở khi hát; chỉnh tông ngay trong Manokara.',
  'Current song': 'Bài đang phát', 'Song key': 'Tông bài hát', 'Choose Manokara tab': 'Chọn tab Manokara',
  'Stop Tab Audio': 'Dừng Tab Audio', 'Waiting for Manokara…': 'Đang kết nối với Manokara…',
  'Choose the Manokara tab and share tab audio in the audio window.': 'Bấm chọn tab Manokara rồi bật chia sẻ âm thanh nhé.',
  'Tab Audio connected. Change key in Manokara.': 'Tab Audio đã kết nối. Bạn chỉnh tông trong Manokara nhé.',
  'Tab Audio stopped. The player is using its original sound.': 'Đã dừng Tab Audio. Player đang phát âm thanh gốc.',
  'Tab Audio needs an updated Chrome or Edge on HTTPS / localhost.': 'Tab Audio cần Chrome hoặc Edge mới, mở qua HTTPS hoặc localhost nhé.',
  'Open Tab Audio from Manokara.': 'Mở cửa sổ Tab Audio từ Manokara nhé.',
  'Select the original Manokara tab, not a window, screen or another tab.': 'Bạn chọn đúng tab Manokara gốc nhé, đừng chọn cửa sổ, màn hình hay tab khác.',
  'Share tab audio to use Tab Audio.': 'Bạn cần bật “Chia sẻ âm thanh của thẻ” để đổi tông nhé.',
  'This browser cannot silence the original tab audio. Tab Audio was stopped to avoid doubled sound.': 'Trình duyệt chưa tắt được tiếng gốc của tab. Tab Audio đã dừng để tránh bị chồng hai lớp tiếng.',
  'Tab audio sharing was cancelled. The player keeps its original sound.': 'Bạn đã hủy chia sẻ âm thanh. Player vẫn phát tiếng gốc nhé.',
  'Could not start Tab Audio. Try choosing the Manokara tab again.': 'Chưa bật được Tab Audio. Bạn thử chọn lại tab Manokara nhé.',
  'The shared tab changed. Select Manokara again.': 'Tab đang chia sẻ đã thay đổi. Bạn chọn lại Manokara nhé.',
  'Tab Audio processor stopped. The player is using its original sound.': 'Bộ đổi tông vừa dừng. Player đang phát âm thanh gốc nhé.',
  'Manokara was closed. Tab Audio has stopped.': 'Manokara đã đóng. Tab Audio cũng đã dừng.',
  'Reconnecting to Manokara…': 'Đang nối lại với Manokara…',
  'Manokara did not reconnect. Select the tab again.': 'Chưa nối lại được với Manokara. Bạn chọn tab lại nhé.',
  'All sound in the selected tab is processed locally. No microphone or music upload. For OBS, capture the processed browser sound.': 'Âm thanh của tab bạn chọn được xử lý ngay trên máy. Không dùng mic, không tải nhạc lên server. Trong OBS, hãy thu âm thanh trình duyệt đã xử lý.',
  'Estimated audio delay': 'Độ trễ âm thanh ước tính', 'Waiting for the browser audio picker…': 'Đang chờ bạn chọn tab trong trình duyệt…'
};
let state = { language: params.get('lang') === 'vi' ? 'vi' : 'en', key: 0, title: '', enabled: false, sequence: 0, version: 0 };
let initialized = false, stream = null, active = false, busy = false, revision = 0;
let statusText = 'Waiting for Manokara…', statusError = false, appliedKey = null, appliedSequence = null, appliedVersion = null;
let applying = false, pendingState = false, reconnecting = false, reconnectTimer = null;
let parentDocument;
try { parentDocument = parent?.document; } catch {}
const text = value => state.language === 'vi' ? vi[value] || value : value;
const captureDelay = () => Math.max(0, Math.min(1, Number(stream?.getAudioTracks()[0]?.getSettings().latency) || 0));
const pitch = window.ManokaraPitch.create(() => stop('Tab Audio processor stopped. The player is using its original sound.', true));
function notify(message = statusText) {
  parent?.postMessage({ type: 'manokara:tab-audio-status', channel, active: active && !reconnecting,
    busy: busy || reconnecting, error: statusError,
    delay: active && !reconnecting ? captureDelay() + pitch.delay : 0, message }, location.origin);
}
function draw() {
  document.documentElement.lang = state.language;
  for (const [id, value] of Object.entries({
    intro: 'Keep YouTube playing in Manokara. This window changes the sound from that tab.',
    step1: 'Choose the Manokara tab, not this audio window.',
    step2: 'Turn on Share tab audio in the browser dialog.',
    step3: 'Keep this window open while singing; change key in Manokara.',
    songLabel: 'Current song', keyLabel: 'Song key', start: 'Choose Manokara tab', stop: 'Stop Tab Audio',
    note: 'All sound in the selected tab is processed locally. No microphone or music upload. For OBS, capture the processed browser sound.'
  })) $(id).textContent = text(value);
  $('song').textContent = state.title || '—';
  $('key').textContent = state.key > 0 ? '+' + state.key : String(state.key);
  $('status').textContent = text(statusText);
  $('status').dataset.state = statusError ? 'error' : reconnecting ? 'reconnecting' : active ? 'connected' : 'ready';
  $('latency').textContent = active ? text('Estimated audio delay') + ': ' + Math.round((captureDelay() + pitch.delay) * 1000) + ' ms' : '';
  $('start').disabled = !initialized || busy || active;
  $('stop').disabled = !active && !busy;
}
function status(message, error = false) { statusText = message; statusError = error; draw(); notify(message); }
function stop(message = 'Tab Audio stopped. The player is using its original sound.', error = false) {
  ++revision; active = busy = false;
  clearTimeout(reconnectTimer); reconnectTimer = null; reconnecting = false; pendingState = false;
  const previous = stream; stream = null;
  pitch.setEnabled(false); pitch.detach();
  previous?.getTracks().forEach(track => track.stop());
  appliedKey = appliedSequence = appliedVersion = null;
  status(message, error);
}
function correctTab(video) {
  const handle = video.getCaptureHandle?.();
  return video.getSettings().displaySurface === 'browser' && handle?.handle === channel && handle.origin === location.origin;
}
function parentIsManokara() {
  try { return parent && !parent.closed && parent.location.origin === location.origin &&
    ['/manokara.html', '/'].includes(parent.location.pathname); } catch { return false; }
}
function hello() {
  if (parent && channel) parent.postMessage({ type: 'manokara:tab-audio-hello', channel }, location.origin);
}
function suspendForReload() {
  if (!active || reconnecting) return;
  reconnecting = true; initialized = false;
  state = { ...state, enabled: false }; pitch.setEnabled(false);
  status('Reconnecting to Manokara…');
  reconnectTimer = setTimeout(() => {
    if (reconnecting) stop('Manokara did not reconnect. Select the tab again.', true);
  }, 30000);
}
function sourceChanged(video) {
  if (correctTab(video)) { hello(); return; }
  // During a reload Capture Handle briefly becomes null. Keep the live stream
  // muted until the same source/opener advertises its handle and sends state.
  if (!video.getCaptureHandle?.() && parentIsManokara()) { suspendForReload(); hello(); return; }
  stop('The shared tab changed. Select Manokara again.', true);
}
async function applyState() {
  if (!active || busy || reconnecting || applying) return;
  applying = true;
  const my = revision;
  try {
    while (active && !reconnecting && my === revision) {
      pendingState = false;
      const desired = { ...state };
      if (!desired.enabled || desired.sequence !== appliedSequence) pitch.setEnabled(false);
      if (desired.sequence !== appliedSequence || desired.version !== appliedVersion) {
        await pitch.flush();
        if (!active || reconnecting || my !== revision) return;
        appliedSequence = desired.sequence; appliedVersion = desired.version;
      }
      if (desired.key !== appliedKey) {
        await pitch.set(desired.key);
        if (!active || reconnecting || my !== revision) return;
        appliedKey = desired.key;
      }
      pitch.setEnabled(desired.enabled);
      if (state.key === appliedKey && state.sequence === appliedSequence && state.version === appliedVersion) break;
    }
    if (active && !reconnecting && my === revision) { draw(); notify('Tab Audio connected. Change key in Manokara.'); }
  } catch { if (my === revision) stop('Tab Audio processor stopped. The player is using its original sound.', true); }
  finally { applying = false; if (active && !busy && !reconnecting && pendingState) void applyState(); }
}
async function start() {
  if (!initialized || busy || active) return;
  const devices = navigator.mediaDevices;
  if (!isSecureContext || !devices?.getDisplayMedia || !devices.getSupportedConstraints().suppressLocalAudioPlayback ||
      !('getCaptureHandle' in MediaStreamTrack.prototype)) {
    status('Tab Audio needs an updated Chrome or Edge on HTTPS / localhost.', true); return;
  }
  const my = ++revision;
  busy = true; status('Waiting for the browser audio picker…');
  // Invoke both operations inside this button gesture; permission cannot be
  // requested by a remote message or saved between capture sessions.
  const prepared = pitch.prepare();
  prepared.catch(() => {});
  let selected;
  try {
    const [graph, capture] = await Promise.allSettled([prepared, devices.getDisplayMedia({
      video: { displaySurface: 'browser', frameRate: { ideal: 1, max: 1 }, width: { ideal: 320 } },
      audio: { suppressLocalAudioPlayback: true, echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      selfBrowserSurface: 'exclude', systemAudio: 'exclude', windowAudio: 'exclude',
      monitorTypeSurfaces: 'exclude', surfaceSwitching: 'exclude'
    })]);
    if (capture.status === 'fulfilled') selected = capture.value;
    if (my !== revision) { selected?.getTracks().forEach(track => track.stop()); return; }
    if (capture.status === 'rejected') throw capture.reason;
    if (graph.status === 'rejected') throw graph.reason;
    const video = selected.getVideoTracks()[0], audio = selected.getAudioTracks()[0];
    if (!video || !correctTab(video)) throw Error('Select the original Manokara tab, not a window, screen or another tab.');
    if (!audio) throw Error('Share tab audio to use Tab Audio.');
    if (audio.getSettings().suppressLocalAudioPlayback !== true) {
      await audio.applyConstraints({ suppressLocalAudioPlayback: true });
      if (audio.getSettings().suppressLocalAudioPlayback !== true) throw Error('This browser cannot silence the original tab audio. Tab Audio was stopped to avoid doubled sound.');
    }
    if (my !== revision) { selected.getTracks().forEach(track => track.stop()); return; }
    stream = selected;
    for (const track of stream.getTracks()) track.addEventListener('ended', () => { if (my === revision) stop(); }, { once: true });
    video.addEventListener('capturehandlechange', () => {
      if (my === revision) sourceChanged(video);
    });
    pitch.setEnabled(false);
    const attachedKey = state.key;
    await pitch.attachStream(stream, attachedKey, () => my === revision);
    if (my !== revision) return;
    appliedKey = attachedKey; appliedSequence = state.sequence; appliedVersion = state.version;
    pitch.setEnabled(state.enabled); active = true; busy = false;
    status('Tab Audio connected. Change key in Manokara.');
    void applyState();
  } catch (error) {
    selected?.getTracks().forEach(track => track.stop());
    if (my !== revision) return;
    const cancelled = ['NotAllowedError', 'AbortError'].includes(error.name);
    const message = cancelled ? 'Tab audio sharing was cancelled. The player keeps its original sound.' :
      Object.hasOwn(vi, error.message) ? error.message : 'Could not start Tab Audio. Try choosing the Manokara tab again.';
    stop(message, !cancelled);
  }
}
window.addEventListener('message', event => {
  if (!parent || event.source !== parent || event.origin !== location.origin || event.data?.channel !== channel) return;
  if (event.data.type === 'manokara:tab-audio-stop') { stop(); return; }
  if (event.data.type === 'manokara:tab-audio-suspend') { suspendForReload(); return; }
  if (event.data.type !== 'manokara:tab-audio-state') return;
  const value = event.data.state;
  if (!value || typeof value !== 'object') return;
  const first = !initialized;
  initialized = true;
  state = { key: ManokaraPitch.clamp(value.key), title: String(value.title || '').slice(0, 512),
    language: value.language === 'vi' ? 'vi' : 'en', enabled: value.enabled === true,
    sequence: Number(value.sequence) || 0, version: Number(value.version) || 0 };
  try { parentDocument = parent.document; } catch {}
  if (reconnecting && stream && parentIsManokara() && correctTab(stream.getVideoTracks()[0])) {
    clearTimeout(reconnectTimer); reconnectTimer = null; reconnecting = false;
    statusText = 'Tab Audio connected. Change key in Manokara.'; statusError = false;
  }
  pendingState = true;
  if (first && !active && !busy) statusText = 'Choose the Manokara tab and share tab audio in the audio window.';
  draw(); void applyState();
});
$('start').addEventListener('click', () => void start());
$('stop').addEventListener('click', () => stop());
window.addEventListener('pagehide', () => stop(), { once: true });
setInterval(() => {
  if (!parentIsManokara()) {
    if (active || busy) stop('Manokara was closed. Tab Audio has stopped.');
    return;
  }
  try { if (parent.document !== parentDocument) { parentDocument = parent.document; suspendForReload(); } } catch {}
  hello();
}, 1000);
draw();
if (parent && channel) hello();
else status('Open Tab Audio from Manokara.', true);
