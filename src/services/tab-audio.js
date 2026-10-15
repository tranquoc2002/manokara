/* The source tab keeps playback and its clock. A separate same-origin window
   processes its captured audio so processed sound cannot feed itself. */
export function createTabAudio({ getState, onStatus }) {
  // This identifies a live capture session, not stored capture permission.
  // Keep it through reload so the existing popup can find its opener again.
  let channel;
  try {
    channel = sessionStorage.getItem('manokaraTabAudioChannel');
    const navigation = performance.getEntriesByType('navigation')[0]?.type;
    // A window opened from this page can inherit a copy of sessionStorage.
    // Only reload may reuse its identity; a newly opened controller gets its own.
    if (navigation !== 'reload' || !/^[a-f0-9-]{36}$/.test(channel || '')) {
      channel = crypto.randomUUID(); sessionStorage.setItem('manokaraTabAudioChannel', channel);
    }
  } catch { channel = crypto.randomUUID(); }
  let popup = null, active = false, busy = false, delay = 0, sent = '', disposed = false, terminal = false;
  const supported = () => isSecureContext && !!navigator.mediaDevices?.setCaptureHandleConfig;
  function advertise() {
    if (!supported()) return false;
    try {
      navigator.mediaDevices.setCaptureHandleConfig({ handle: channel, exposeOrigin: true, permittedOrigins: [location.origin] });
      return true;
    } catch { return false; }
  }
  advertise();
  function status(message = '', error = false) {
    onStatus({ active, busy, delay, message, error, open: !!popup && !popup.closed });
  }
  function send(type, state) {
    if (!popup || popup.closed) return;
    popup.postMessage({ type, channel, state }, location.origin);
  }
  function sync(force = false) {
    if (disposed || terminal || !popup || popup.closed) return;
    const state = getState(), serialized = JSON.stringify(state);
    if (force || sent !== serialized) { sent = serialized; send('manokara:tab-audio-state', state); }
  }
  function open() {
    if (terminal || disposed) return false;
    if (!advertise()) { status('Tab Audio needs an updated Chrome or Edge on HTTPS / localhost.', true); return false; }
    if (!popup || popup.closed) {
      const url = new URL('./manokara-tab-audio.html', location.href);
      url.hash = new URLSearchParams({ channel, lang: getState().language }).toString();
      popup = window.open(url.href, 'manokara-tab-audio-' + channel, 'popup,width=480,height=640');
      sent = '';
    } else popup.focus();
    if (!popup) { status('Popup blocked. Please allow popups.', true); return false; }
    status(active ? '' : 'Choose the Manokara tab and share tab audio in the audio window.');
    sync(true);
    return true;
  }
  function receive(event) {
    if (disposed || event.origin !== location.origin || event.data?.channel !== channel) return;
    const data = event.data;
    if (!popup && data.type === 'manokara:tab-audio-hello') {
      // After reload, regain the existing window through its hello; opening a
      // named window here would require another gesture and could reload it.
      try {
        if (event.source?.opener !== window || event.source.location.pathname !== '/manokara-tab-audio.html') return;
        popup = event.source; sent = '';
      } catch { return; }
    }
    if (event.source !== popup) return;
    if (data.type === 'manokara:tab-audio-hello') { sync(true); return; }
    if (data.type !== 'manokara:tab-audio-status') return;
    active = data.active === true; busy = data.busy === true;
    delay = active ? Math.max(0, Math.min(3, Number(data.delay) || 0)) : 0;
    status(typeof data.message === 'string' ? data.message.slice(0, 240) : '', data.error === true);
  }
  window.addEventListener('message', receive);
  const checkPopup = () => {
    if (popup?.closed) {
      popup = null; sent = ''; active = busy = false; delay = 0;
      status('Tab Audio stopped. The player is using its original sound.');
    }
  };
  let monitor = setInterval(checkPopup, 1000);
  function detachForNavigation() {
    if (disposed) return;
    // The capture belongs to the popup, so refreshing the source page must not
    // close it or stop its tracks. It mutes output until this page reconnects.
    send('manokara:tab-audio-suspend'); disposed = true;
    clearInterval(monitor); monitor = null; window.removeEventListener('message', receive);
  }
  function dispose({ preserveCapture = false } = {}) {
    if (terminal) return;
    if (!preserveCapture) { send('manokara:tab-audio-stop'); try { popup?.close(); } catch {} }
    detachForNavigation(); terminal = true; active = busy = false; delay = 0;
    window.removeEventListener('pagehide', detachForNavigation);
    window.removeEventListener('pageshow', pageShown);
  }
  function resume() {
    if (terminal || !disposed) return;
    disposed = false; sent = ''; advertise();
    window.addEventListener('message', receive);
    if (monitor == null) monitor = setInterval(checkPopup, 1000);
    sync(true);
  }
  function pageShown(event) { if (event.persisted) resume(); }
  window.addEventListener('pagehide', detachForNavigation);
  window.addEventListener('pageshow', pageShown);
  return {
    open, sync, dispose, suspend: detachForNavigation, resume,
    stop() { send('manokara:tab-audio-stop'); },
    silence() { send('manokara:tab-audio-state', { ...getState(), key: 0, enabled: false }); sent = ''; },
    get active() { return active; }, get busy() { return busy; }, get delay() { return delay; }
  };
}
