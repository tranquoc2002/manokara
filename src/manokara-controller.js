import { appRuntime } from './app/feature-runtime.mjs';
import { createPlayback } from './services/playback.mjs';
import { createLifecycle } from './services/lifecycle.mjs';
import { createYouTubePlayer } from './adapters/youtube-player.mjs';
import { createMediaElement } from './adapters/media-element.mjs';
import { lyricFonts } from './manokara-fonts.js';
import { stagePreview } from './services/stage-preview.js';
import { createTabAudio } from './services/tab-audio.js';
import { persistence } from './services/persistence.mjs';
import { LYRIC_STYLE_FIELDS, normalizeLyricStyle as normalizePersistedStyle } from './domain/lyric-appearance.mjs';
import { createRelayPacket } from './domain/relay-packet.mjs';
import { LYRIC_PROVIDERS, LYRIC_SOURCE_STATUSES, readProviderCatalog, readLyricResults, readLyricSources, safeLyricSourceUrl, lyricImportNotice } from './services/lyric-search.mjs';
export function initManokaraController() {
  if (window.ManokaraController?.active) return window.ManokaraController;
  const uiText = ManokaraI18n.text,
    uiMarkup = ManokaraI18n.markup;
  const $ = s => document.querySelector(s);
  const runtime = createLifecycle();
  const {
    draft,
    controls
  } = appRuntime;
  function showStudioTab(name) {
    window.ManokaraStudio?.showMain('karaoke');
    if (name === 'song' && !$('#songEditorDialog').open) $('#songEditorDialog').showModal();
    if (name !== 'song' && $('#songEditorDialog').open) $('#songEditorDialog').close();
  }
  function openSongEditor() {
    if (edit >= 0 && !confirm(uiText('Discard the current song edits and start a new song?'))) return;
    if (edit >= 0) reset();
    showStudioTab('song');
    $('#panel-song').scrollTop = 0;
    $('#url').focus();
  }
  runtime.listen($('#songEditorDialog'), 'click', e => {
    if (e.target === $('#songEditorDialog')) $('#songEditorDialog').close();
  });
  runtime.listen($('#libraryDialog'), 'click', e => {
    if (e.target === $('#libraryDialog')) $('#libraryDialog').close();
  });
  runtime.listen($('#songEditorDialog'), 'close', () => runtime.frame(() => {
    // Let the dialog restore its opener. A delayed fallback must not steal
    // focus from a header search that the user has already started typing in.
    const active = document.activeElement;
    if (!window.ManokaraTour?.active && (active === document.body || $('#songEditorDialog').contains(active))) $('#openSongEditor')?.focus({
      preventScroll: true
    });
  }));
  const fmt = s => {
    s = Math.max(0, Math.round(s));
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  };
  const tp = ManokaraCore.timeValue;
  let items = [],
    ci = null,
    pos = 0,
    last = -1,
    edit = -1,
    res = [];
  let searchState = '';
  let searchStatuses = {}, lyricProviders = LYRIC_PROVIDERS.map(row => ({ ...row })), searchMediaDuration;
  const playback = createPlayback({
    youtube: createYouTubePlayer({
      root: () => $('#stageMediaRoot')
    }),
    mediaAdapter: createMediaElement({
      root: () => $('#stageMediaRoot')
    }),
    pitchFactory: ManokaraPitch,
    captureFactory: createTabAudio,
    origin: location.origin,
    youtubeId: value => yid(value),
    options: () => ({
      volume: Number(controls.get('vol') ?? 100),
      skip: controls.get("skip"),
      language: ManokaraI18n.language
    }),
    async lookup(id, signal) {
      await relayReady;
      if (signal.aborted) throw new DOMException('Cancelled', 'AbortError');
      return ManokaraPitch.lookup(ManokaraSession.api, relayUrl('/__youtube'), id, {
        signal
      });
    },
    output: {
      text: uiText,
      format: fmt,
      message: value => msg(value),
      stage: patch => {
        if (!runtime.disposed) appRuntime.ui.updatePlayerPanelState(patch);
      },
      time: value => setPlayerTime(value),
      countdown: refreshCountdown
    },
    callbacks: {
      changed: state => updatePlaybackState(state),
      persist: () => save(),
      render: () => render(),
      keyChanged: key => {
        if (edit >= 0 && items[edit] === ci) draft.set("songKey", key);
      },
      title: applySongTitle,
      claim: takeRelayOwnership,
      advance: () => go(nxt()),
      replay: song => {
        const index = items.indexOf(song);
        if (index < 0) return false;
        go(index);
        return true;
      }
    }
  });
  const mediaPlaying = () => playback.mediaPlaying();
  const elapsed = () => playback.elapsed();
  const audibleElapsed = () => playback.audibleElapsed();
  function refreshCountdown({
    visible,
    title,
    remaining
  }) {
    appRuntime.ui.updatePlayerPanelState({
      countdownVisible: visible,
      countdownTitle: visible ? title : '',
      countdownValue: visible ? String(Math.max(1, Math.ceil(remaining))) : '',
      countdownHint: uiText('Press Play to start now')
    });
  }
  function playerControlState(state = playback.getSnapshot()) {
    const key = ci && !ci.mc ? ManokaraPitch.clamp(ci.pitch) : 0;
    return {
      play: uiText('Play'),
      pause: uiText('Pause'),
      resume: uiText('Resume'),
      stop: uiText('Stop'),
      previous: uiText('Previous song'),
      next: uiText('Next song'),
      keyLabel: uiText('Key'),
      lower: uiText('Lower key'),
      raise: uiText('Raise key'),
      originalKey: uiText('Original key'),
      volumeLabel: uiText('Volume'),
      paused: state.paused,
      volume: Number(controls.get('vol') ?? 100),
      key,
      canPitch: !!ci && !ci.mc && !state.pitchBusy && !state.lookupPending && (state.mode !== 'yt' || state.ready)
    };
  }
  function updatePlayerControlView(state) {
    appRuntime.ui.updatePlayerControls(playerControlState(state));
  }
  const setPlayerNow = value => appRuntime.ui.updatePlayerPanelState({
    now: String(value ?? '')
  });
  const setPlayerTime = value => appRuntime.ui.updatePlayerPanelState({
    time: String(value ?? '')
  });
  function refreshPitch(state = playback.getSnapshot()) {
    appRuntime.ui.updateTransposeState({
      key: ci && !ci.mc ? ManokaraPitch.clamp(ci.pitch) : 0,
      status: uiText(state.pitchMessage),
      statusState: state.pitchStatusState,
      tabAudioActive: state.captureActive,
      tabAudioBusy: state.captureBusy
    });
    updatePlayerControlView(state);
  }
  let generatedTitle = '';
  const youtubeTitles = new Map();
  items = persistence.setlist.load().value;
  const save = () => {
    if (persistence.setlist.save(items).ok) return true;
    msg('Browser storage is full or unavailable. Changes remain in this window only.');
    return false;
  };
  let messageSource = '';
  const msg = value => {
    messageSource = value || '';
    appRuntime.ui.updatePlayerPanelState({
      message: uiText(messageSource)
    });
  };
  const lyricEditor = ManokaraLyricsEditor.create({
    draft,
    imported(metadata, _filename, ttml) {
      draft.patch({ lyricSourceLabel: '', lyricSourceUrl: '', lyricCopyright: '', lyricSources: '[]', lyricLoadStatus: '' });
      if (ttml) {
        draft.patch({ lyricSourceLabel: 'TTML file', lyricCopyright: ttml.copyright || '', lyricLoadStatus: lyricImportNotice(ttml.warnings, uiText) });
      }
      pickDur = metadata.duration;
      if (!draft.get("ttl") && metadata.title) draft.set("ttl", metadata.title.slice(0, 512));
      if (!draft.get("lq")) draft.set("lq", [metadata.title, metadata.artist].filter(Boolean).join(' '));
    },
    changed() {
      pickDur = undefined;
    },
    async convertTtml(source, signal) {
      await relayReady;
      if (runtime.disposed || signal.aborted) throw new DOMException('Cancelled', 'AbortError');
      const response = await window.ManokaraSession.api(relayUrl('/__lyrics/import-ttml'), { ttml: source }, {
        signal: AbortSignal.any([runtime.signal, signal, AbortSignal.timeout(15000)])
      });
      if (response.status === 404) throw Error('Restart the updated server to import TTML files.');
      const data = await response.json();
      if (!response.ok) throw Error(data.error || 'Could not import TTML.');
      return data;
    }
  });
  runtime.own(() => lyricEditor.dispose());
  let librarySongs = [],
    libraryUnavailable = false;
  const makeLibraryId = () => {
    try {
      return crypto.randomUUID();
    } catch (e) {
      return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
    }
  };
  const libraryAll = () => persistence.library.list();
  const libraryPut = song => persistence.library.put(song);
  const libraryDelete = id => persistence.library.remove(id);
  function renderLibrary() {
    const labels = {
      search: uiText('Search my songs'),
      placeholder: uiText('Song title or artist'),
      noMatches: uiText('No matching songs.'),
      empty: uiText('Your library is empty. Save a song from the editor to keep it here.'),
      listLabel: uiText('Saved songs'),
      lyricsSaved: uiText('Lyrics saved'),
      noLyrics: uiText('No lyrics'),
      add: uiText('Add'),
      remove: uiText('Remove from My songs')
    };
    appRuntime.ui.updateLibrary(librarySongs, labels);
    updateSetlistView();
  }
  async function refreshLibrary() {
    if (runtime.disposed) return;
    try {
      librarySongs = (await libraryAll()).filter(song => song && typeof song.libraryId === 'string' && typeof song.url === 'string');
      if (runtime.disposed) return;
      libraryUnavailable = false;
      renderLibrary();
    } catch (error) {
      libraryUnavailable = true;
      updateSetlistView();
    }
  }
  async function migrateSetlistToLibrary() {
    try {
      const existing = new Set((await libraryAll()).map(song => song.libraryId));
      if (runtime.disposed) return;
      const eligible = items.filter(song => !song.mc && song.librarySync !== false);
      let changed = false;
      for (const song of eligible) {
        if (!song.libraryId) {
          song.libraryId = makeLibraryId();
          changed = true;
        }
      }
      // Persist generated IDs first. An interrupted import can resume without duplicates.
      if (changed && !save()) {
        await refreshLibrary();
        return;
      }
      for (const song of eligible) {
        if (runtime.disposed) return;
        if (existing.has(song.libraryId)) continue;
        await persistence.library.insertMissing(song);
        existing.add(song.libraryId);
      }
      await refreshLibrary();
    } catch (error) {
      libraryUnavailable = true;
      updateSetlistView();
    }
  }
  async function openLibrary() {
    await refreshLibrary();
    if (runtime.disposed) return;
    $('#libraryDialog').showModal();
    $('#librarySearch').focus();
  }
  async function addLibrarySong(libraryId) {
    const song = librarySongs.find(item => item.libraryId === libraryId);
    if (!song) return;
    if (items.some(item => item.libraryId === song.libraryId)) {
      msg('This song is already in the setlist.');
      return;
    }
    const copy = {
      ...song,
      librarySync: true
    };
    delete copy._L;
    items.push(copy);
    const persisted = save();
    render();
    $('#libraryDialog').close();
    if (persisted) msg('Added from My songs.');
  }
  async function removeLibrarySong(libraryId) {
    const song = librarySongs.find(item => item.libraryId === libraryId);
    if (!song || !confirm(uiText('Remove this song from My songs? Copies already in a setlist will stay there.'))) return;
    const unlinked = items.map(item => {
      if (item.libraryId !== libraryId) return item;
      const copy = {
        ...item,
        librarySync: false
      };
      delete copy.libraryId;
      return copy;
    });
    // Persist unlinking first, so startup import cannot recreate a deleted song.
    if (!persistence.setlist.save(unlinked).ok) {
      msg('Could not save the setlist. The song was kept in My songs.');
      return;
    }
    try {
      await libraryDelete(song.libraryId);
      for (const item of new Set([...items, ci])) if (item?.libraryId === song.libraryId) {
        delete item.libraryId;
        item.librarySync = false;
      }
      save();
      await refreshLibrary();
      msg('Removed from My songs. Setlist copies are unchanged.');
    } catch (error) {
      save();
      msg('Could not update My songs. Please try again.');
    }
  }
  function clearSetlist() {
    if (!confirm(uiText('Remove all songs?'))) return;
    items = [];
    pos = 0;
    last = -1;
    reset();
    save();
    render();
    if (ci) msg('Setlist cleared. The current song keeps playing until it ends or you press Stop.');
  }
  function handleSetlistSong(i, a) {
    if (!Number.isInteger(i) || i < 0 || i >= items.length) return;
    if (a === 'go') {
      go(i);
      return;
    }
    if (a === 'ed') {
      cancelLyricSearch();
      searchState = '';
      res = [];
      renderSearchResults();
      showStudioTab('song');
      edit = i;
      generatedTitle = '';
      const it = items[i];
      appRuntime.ui.updateSongEditorView({
        title: uiText('Edit song'),
        saveLabel: uiText('Save changes'),
        editing: true
      });
      draft.set("saveToLibrary", it.librarySync !== false);
      draft.set("url", it.url);
      draft.set("ttl", it.title);
      draft.set("st", it.s ? fmt(it.s) : '');
      draft.set("en", it.e != null ? fmt(it.e) : '');
      draft.set("llrc", it.lrc || '');
      draft.patch({ lyricSourceLabel: it.lyricSource?.label || '', lyricSourceUrl: safeLyricSourceUrl(it.lyricSource?.url), lyricCopyright: it.lyricSource?.copyright || '', lyricSources: JSON.stringify(readLyricSources(it.lyricSource?.sources)) });
      searchMediaDuration = it.mediaDuration ? it.mediaDuration + (it.s || 0) : undefined;
      draft.set('lyricLoadStatus', '');
      draft.set("loff", it.off || 0);
      draft.set("songKey", ManokaraPitch.clamp(it.pitch));
      draft.set("lq", it.title);
      lyricEditor.load(it);
      $('#ftitle').scrollIntoView({
        block: 'nearest'
      });
      return;
    }
    if (!['del', 'up', 'dn'].includes(a)) return;
    const editing = edit >= 0 ? items[edit] : null,
      c = ci,
      k0 = c ? items.indexOf(c) : -1,
      w = k0 >= 0 ? k0 : pos;
    if (a === 'del') items.splice(i, 1);else {
      const j = a === 'up' ? i - 1 : i + 1;
      if (j >= 0 && j < items.length) [items[i], items[j]] = [items[j], items[i]];
    }
    if (editing) {
      const newEdit = items.indexOf(editing);
      if (newEdit < 0) reset();else edit = newEdit;
    }
    if (c) {
      const k = items.indexOf(c);
      if (k >= 0) pos = k;else {
        if (k0 >= 0) {
          pos = w;
          msg('Removed from the setlist. The current song keeps playing until it ends or you press Stop.');
        } else if (a === 'del' && i < pos) pos--;
      }
    }
    save();
    render();
  }
  runtime.own(appRuntime.commands.bind('setlist', {
    openLibrary,
    openEditor: openSongEditor,
    clear: clearSetlist,
    song: handleSetlistSong
  }));
  window.ManokaraSetlistActions = appRuntime.commands.actions('setlist');
  runtime.own(appRuntime.commands.bind('library', {
    add: addLibrarySong,
    remove: removeLibrarySong
  }));
  window.ManokaraLibraryActions = appRuntime.commands.actions('library');
  void migrateSetlistToLibrary();
  const relayPageId = (() => {
    try {
      return crypto.randomUUID();
    } catch (e) {
      return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
    }
  })();
  let relayRoom = '',
    relayInitialized = false;
  const relayReady = window.ManokaraSession.ready.then(info => {
    relayRoom = info.room;
    relayInitialized = true;
    appRuntime.ui.updateOBSSettingsState({
      obsUrl: window.ManokaraSession.obsUrl(false)
    });
    window.ManokaraStudio?.refresh();
    return info;
  });
  const relayUrl = path => {
    const url = new URL(path, location.href);
    url.searchParams.set('room', relayRoom);
    return url.href;
  };
  async function relayServerAction(action) {
    try {
      await relayReady;
      if (runtime.disposed && action !== 'release') return;
      return await window.ManokaraSession.api(relayUrl('/__lyric-owner'), {
        writerId: relayPageId,
        action
      }, {
        keepalive: action === 'release',
        ...(action === 'release' ? {} : {
          signal: runtime.signal
        })
      });
    } catch (e) {
      return undefined;
    }
  }
  let claimPending = false,
    lastClaim = -Infinity;
  function takeRelayOwnership() {
    if (runtime.disposed || runtime.suspended) return;
    if (claimPending || performance.now() - lastClaim < 750) return;
    lastClaim = performance.now();
    claimPending = true;
    relayServerAction('claim').then(r => {
      if (runtime.disposed || runtime.suspended) return;
      if (r?.ok) {
        relayUp = null;
        publishObsState();
      }
    }).finally(() => {
      claimPending = false;
    });
  }
  runtime.listen(document, 'pointerdown', event => {
    if (!ManokaraTour.active && !event.target.closest('#help')) takeRelayOwnership();
  }, true);
  runtime.listen(document, 'keydown', event => {
    if (!ManokaraTour.active && !event.target.closest('#help')) takeRelayOwnership();
  }, true);
  if (location.protocol === 'file:') $('#warn').hidden = false;
  function lyricDuration(it) {
    return it.e != null ? Math.max(0, it.e - (it.s || 0)) : it.mediaDuration || it.ldur || 180;
  }
  function getL(it) {
    const D = lyricDuration(it),
      raw = ManokaraLyrics.displayLrc(it),
      secondary = ManokaraLyrics.secondaryLrc(it),
      k = raw + '|' + secondary + '|' + D;
    if (it._L && it._L.k === k) return it._L.a;
    const parsed = ManokaraCore.parseLyrics(raw, D);
    if (secondary) {
      const second = ManokaraCore.parseLyrics(secondary, D).all;
      parsed.all.forEach((line, i) => line.romaji = second[i]?.x !== line.x ? second[i]?.x || '' : '');
    }
    it._L = {
      k,
      a: parsed.lines,
      all: parsed.all,
      timed: parsed.timed
    };
    return parsed.lines;
  }
  const yid = ManokaraCore.youtubeId;
  const cleanVideoTitle = value => typeof value === 'string' ? value.replace(/[\x00-\x1f\x7f]/g, ' ').trim().slice(0, 512) : '';
  function automaticTitle(it) {
    return !it.mc && (!it.title || it.title.trim() === it.url.trim());
  }
  function applySongTitle(it, title) {
    if (runtime.disposed) return;
    title = cleanVideoTitle(title);
    if (!title || !automaticTitle(it)) return;
    it.title = title;
    if (items.includes(it)) {
      save();
      render();
    }
    if (ci === it) {
      setPlayerNow(title);
      refreshCountdown({
        visible: playback.state.counting,
        title: ci.title,
        remaining: playback.state.countdownRemaining
      });
    }
  }
  function youtubeTitle(url) {
    const id = yid(url);
    if (!id) return Promise.resolve('');
    const cached = youtubeTitles.get(id);
    if (cached && cached.expires > Date.now()) return cached.promise;
    const promise = (async () => {
      try {
        const r = await fetch('https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + id), {
          signal: AbortSignal.any([runtime.signal, AbortSignal.timeout(4000)])
        });
        if (r.ok) {
          const title = cleanVideoTitle((await r.json()).title);
          if (title) return title;
        }
      } catch (e) {}
      await relayReady;
      const r = await window.ManokaraSession.api(relayUrl('/__youtube/title'), {
        videoId: id
      }, {
        signal: AbortSignal.any([runtime.signal, AbortSignal.timeout(55000)])
      });
      return r.ok ? cleanVideoTitle((await r.json()).title) : '';
    })().catch(() => '');
    youtubeTitles.delete(id);
    youtubeTitles.set(id, {
      promise,
      expires: Date.now() + 900000
    });
    while (youtubeTitles.size > 64) youtubeTitles.delete(youtubeTitles.keys().next().value);
    promise.then(title => {
      if (!title && youtubeTitles.get(id)?.promise === promise) youtubeTitles.delete(id);
    });
    return promise;
  }
  function fetchSongTitle(it) {
    if (automaticTitle(it)) {
      const url = it.url;
      youtubeTitle(url).then(title => {
        if (it.url === url) applySongTitle(it, title);
      });
    }
  }
  const idx = () => ci ? items.indexOf(ci) : -1;
  const nxt = () => {
    if (!ci) return 0;
    const k = idx();
    return k >= 0 ? k + 1 : pos;
  };
  const prv = () => {
    if (!ci) return 0;
    const k = idx();
    return Math.max(0, (k >= 0 ? k : pos) - 1);
  };
  const cdv = () => Math.max(0, Math.min(30, Math.floor(+controls.get("cdn")) || 0));
  function updatePlaybackState(playbackState = playback.getSnapshot()) {
    const state = !ci ? 'ready' : playbackState.counting ? 'countdown' : playbackState.paused ? 'paused' : playbackState.playing ? 'playing' : 'ready';
    appRuntime.ui.updatePlayerPanelState({
      playbackState: state,
      previewMessage: !ci ? 'Play a song to preview its lyrics.' : !playbackState.counting && !ci.mc && !ci.lrc?.trim() ? 'This song has no lyrics yet. Add lyrics in the song editor.' : '',
      playbackLabel: {
        ready: ci ? uiText('Ready') : uiText('Ready when you are'),
        countdown: uiText('Starting soon'),
        paused: uiText('Paused'),
        playing: uiText('Playing')
      }[state]
    });
    refreshPitch(playbackState);
  }
  function go(i) {
    if (runtime.disposed) return;
    takeRelayOwnership();
    pk = '';
    if (i < 0 || i >= items.length) {
      playback.stop();
      if (ci) {
        const k = idx();
        last = k >= 0 ? k : pos;
      }
      if (i >= items.length) last = -1;
      ci = null;
      applySongStyle(null);
      setPlayerNow(uiText('Nothing playing yet'));
      render();
      updPan();
      updatePlaybackState();
      if (i >= items.length) msg('Setlist finished. Ready for another song?');
      return;
    }
    ci = items[i];
    pos = last = i;
    applySongStyle(ci);
    render();
    msg('');
    setPlayerNow(ci.mc ? uiText('MC break') : ci.title);
    fetchSongTitle(ci);
    playback.load(ci, {
      countdown: cdv()
    });
    updPan();
  }
  function liveLyricsLabels() {
    return {
      title: uiText('Live lyrics'),
      smaller: uiText('Smaller lyric text'),
      larger: uiText('Larger lyric text'),
      lyrics: uiText('Lyrics'),
      chooseLyrics: uiText('Choose lyrics for this song'),
      original: uiText('Original'),
      romaji: uiText('Romaji'),
      both: uiText('Original + Romaji'),
      currentLyrics: uiText('Current song lyrics'),
      liveSync: uiText('Live sync'),
      currentSync: uiText('Current live sync offset'),
      reset: uiText('Reset'),
      syncHelp: uiText('Nudge the words to match what you hear. + shows lines earlier; − shows them later.'),
      setLineTime: uiText('Set line time')
    };
  }
  function updateLiveLyricsPanel(patch) {
    appRuntime.ui.updateLiveLyrics(patch);
  }
  function syncLiveLyricMode(statusOverride = '') {
    const available = !!ci && !ci.mc && ManokaraLyrics.validRomaji(ci),
      mode = available ? ManokaraLyrics.mode(ci) : 'original',
      status = statusOverride || (!ci ? 'Play a song to choose lyrics' : ci.mc ? 'Lyrics options are unavailable during a break' : available ? 'Auto-saved for this song' : 'Create Romaji in the song editor to enable it');
    updateLiveLyricsPanel({
      mode,
      modeDisabled: !ci || !!ci.mc,
      romajiAvailable: available,
      modeStatus: uiText(status),
      labels: liveLyricsLabels()
    });
  }
  function setLiveLyricMode(mode) {
    const it = ci;
    if (!it || it.mc || mode !== 'original' && !ManokaraLyrics.validRomaji(it)) {
      syncLiveLyricMode();
      return;
    }
    it.lyricMode = mode;
    if (edit >= 0 && items[edit] === it) draft.set("lyricMode", mode);
    save();
    syncLiveLyricMode();
    pk = '';
    panelActive = -2;
    updPan();
    publishObsState();
    if (it.libraryId && it.librarySync !== false) libraryPut(it).then(refreshLibrary).catch(() => syncLiveLyricMode('Saved to setlist; My songs could not be updated'));
  }
  function updateSetlistView() {
    const labels = {
      listLabel: uiText('Songs in your setlist'),
      mcBreak: uiText('MC break'),
      mcPrefix: uiText('MC break · '),
      announcement: uiText('Announcement'),
      lyricsReady: uiText(' · Lyrics ready').replace(/^\s*[·•]\s*/, ''),
      edit: uiText('Edit song'),
      moveUp: uiText('Move song up'),
      moveDown: uiText('Move song down'),
      remove: uiText('Remove from setlist'),
      setlist: uiText('Setlist'),
      mySongs: uiText('My songs'),
      libraryCount: libraryUnavailable ? '!' : librarySongs.length,
      addSong: uiText('Add a song'),
      emptyTitle: uiText('Every set starts somewhere.'),
      emptyHint: uiText('Add your first song, then make the evening yours.'),
      clear: uiText('Clear setlist'),
      savedBrowser: uiText('Saved in this browser'),
      kind: (_index, song) => yid(song.url) ? 'YouTube' : uiText('Media')
    };
    appRuntime.ui.updateSetlist(items, ci, labels, fmt);
  }
  function render() {
    showOff();
    refreshPitch();
    syncLiveLyricMode();
    updateSetlistView();
  }
  function reset() {
    cancelLyricSearch();
    searchState = '';
    res = [];
    renderSearchResults();
    edit = -1;
    appRuntime.ui.updateSongEditorView({
      title: uiText('Add a song'),
      saveLabel: uiText('Add to setlist'),
      editing: false
    });
    pickDur = undefined;
    searchMediaDuration = undefined;
    generatedTitle = '';
    draft.reset();
    lyricEditor.reset();
    draft.set("loff", 0);
    draft.set("songKey", 0);
    draft.set("saveToLibrary", true);
    draft.set('lyricLoadStatus', '');
    if ($('#songEditorDialog').open) $('#songEditorDialog').close();
  }
  function lyricsChanged() {
    draft.set('lyricLoadStatus', '');
  }
  async function saveSong() {
    if (runtime.disposed || draft.get('saving') || draft.get('importBusy')) return;
    const u = draft.get("url").trim();
    if (!/^https?:\/\//.test(u)) {
      msg('Paste a karaoke URL first.');
      return;
    }
    const start = tp(draft.get("st")),
      end = tp(draft.get("en"));
    if (Number.isNaN(start) || Number.isNaN(end) || end != null && end <= (start || 0)) {
      msg('Use valid times (mm:ss or seconds); End must be after Start.');
      return;
    }
    if (new TextEncoder().encode(JSON.stringify(draft.get("llrc"))).length > 230000) {
      msg('Lyrics are too long for the relay (maximum 230 KB).');
      return;
    }
    let lyricDraft;
    try {
      lyricDraft = lyricEditor.read();
    } catch (error) {
      msg(error.message);
      return;
    }
    const prior = edit >= 0 ? items[edit] : null;
    const it = {
      title: (draft.get("ttl").trim() || u).slice(0, 512),
      url: u,
      s: start || 0,
      e: end,
      lrc: draft.get("llrc"),
      lyricSource: draft.get('lyricSourceLabel') ? {
        label: draft.get('lyricSourceLabel'), url: safeLyricSourceUrl(draft.get('lyricSourceUrl')), copyright: draft.get('lyricCopyright'), sources: readLyricSources(draft.get('lyricSources'))
      } : null,
      ...lyricDraft,
      ldur: pickDur ?? (prior ? prior.ldur : undefined),
      off: +draft.get("loff") || 0,
      pitch: ManokaraPitch.clamp(draft.get("songKey")),
      ...(prior?.lyricStyle ? {
        lyricStyle: normalizeLyricStyle(prior.lyricStyle)
      } : {}),
      ...(prior?.libraryId ? {
        libraryId: prior.libraryId
      } : {})
    };
    const lyricBytes = new TextEncoder().encode(JSON.stringify({
      lrc: ManokaraLyrics.displayLrc(it),
      romajiLrc: ManokaraLyrics.secondaryLrc(it)
    })).length;
    if (lyricBytes > 230000) {
      msg('Combined output lyrics exceed 230 KB. Shorten the LRC or choose a single display language.');
      return;
    }
    draft.set('saving', true);
    const savingRevision = draft.revision;
    try {
      let savedItem = it;
      if (edit >= 0) {
        const existing = items[edit],
          pitchChanged = existing.pitch !== it.pitch,
          reloadCurrent = existing === ci && (existing.url !== it.url || existing.s !== it.s || existing.e !== it.e);
        Object.assign(existing, it);
        savedItem = existing;
        delete existing._L;
        if (existing === ci) {
          applySongStyle(existing);
          playback.refreshSongTiming();
          setPlayerNow(it.title);
          if (reloadCurrent || pitchChanged && playback.state.pitchBusy) go(edit);else if (pitchChanged) {
            const newPitch = existing.pitch;
            existing.pitch = ManokaraPitch.clamp(playback.appliedKey);
            playback.changeKey(newPitch);
          }
        }
      } else items.push(it);
      const keepLibrary = draft.get("saveToLibrary");
      savedItem.librarySync = keepLibrary;
      if (keepLibrary && !savedItem.libraryId) savedItem.libraryId = makeLibraryId();
      const persisted = save();
      render();
      let librarySaved = false;
      if (keepLibrary) {
        try {
          await libraryPut(savedItem);
          librarySaved = true;
          await refreshLibrary();
        } catch (error) {
          librarySaved = false;
        }
      }
      !runtime.disposed && draft.revision === savingRevision && reset();
      msg(persisted ? keepLibrary ? librarySaved ? 'Saved to setlist and My songs.' : 'Saved to setlist. My songs could not be updated.' : 'Saved to setlist.' : librarySaved ? 'Saved to My songs. The setlist could not be saved in this browser.' : 'Browser storage is full or unavailable. Changes remain in this window only.');
      fetchSongTitle(savedItem);
    } finally {
      draft.set('saving', false);
    }
  }
  function addMcBreak() {
    const duration = tp(draft.get("mcd"));
    if (!Number.isFinite(duration) || duration <= 0) {
      msg('Enter a positive MC duration (mm:ss or seconds).');
      return;
    }
    items.push({
      mc: 1,
      memo: draft.get("mcm"),
      dur: duration
    });
    draft.patch({
      mcm: '',
      mcd: ''
    });
    save();
    render();
  }
  async function urlChanged() {
    searchMediaDuration = undefined;
    const revision = draft.revision;
    const u = draft.get("url").trim(),
      before = draft.get("ttl"),
      query = draft.get("lq");
    if (!yid(u) || before.trim() && before.trim() !== u && before !== generatedTitle) return;
    const title = await youtubeTitle(u);
    if (runtime.disposed || revision !== draft.revision || !title || draft.get("url").trim() !== u || draft.get("ttl") !== before && draft.get("ttl").trim()) return;
    draft.set("ttl", generatedTitle = title);
    if (!draft.get("lq") || draft.get("lq") === query) draft.set("lq", title.replace(/\s*[\(\[【].*$/, ''));
  }
  function renderSearchResults() {
    const results = searchState === 'results' ? res.map(x => ({
      title: (x.trackName + ' — ' + x.artistName).slice(0, 700),
      kind: uiText(x.wordTimed ? 'Word-timed lyrics' : x.syncedLyrics ? 'Timed lyrics' : 'Plain lyrics') + (['ttml', 'yrc', 'qrc'].includes(x.format) ? ' · ' + x.format.toUpperCase() : ''),
      timed: !!x.syncedLyrics,
      sources: x.sources.map(source => ({ label: source.label, url: safeLyricSourceUrl(source.url) })),
      duration: x.duration ? fmt(x.duration) : '—'
    })) : [];
    const label = searchState === 'results' ? 'results' : searchState ? uiText(searchState) : '';
    const statuses = searchState === 'results' ? Object.entries(searchStatuses)
      .filter(([, status]) => !['ok', 'empty'].includes(status))
      .map(([id, status]) => ({ id, label: LYRIC_PROVIDERS.find(source => source.id === id)?.label || id,
        message: uiText(LYRIC_SOURCE_STATUSES[status] || LYRIC_SOURCE_STATUSES.unavailable) })) : [];
    appRuntime.ui.updateLyricSearchResults(label, results, { providers: lyricProviders, statuses, busy: searchState === 'Searching…' });
  }
  let lyricSearchController = null,
    lyricSearchRevision = 0;
  function cancelLyricSearch() {
    lyricSearchRevision++;
    lyricSearchController?.abort();
    lyricSearchController = null;
  }
  runtime.own(cancelLyricSearch);
  void relayReady.then(async () => {
    const response = await window.ManokaraSession.api(relayUrl('/__lyrics/providers'), {}, {
      signal: AbortSignal.any([runtime.signal, AbortSignal.timeout(8000)])
    });
    if (!response.ok) return;
    const data = await response.json();
    if (runtime.disposed || !Array.isArray(data.providers)) return;
    lyricProviders = readProviderCatalog(data.providers);
    if (draft.get('lyricProvider') !== 'auto' && !lyricProviders.some(source => source.id === draft.get('lyricProvider') && source.enabled)) draft.set('lyricProvider', 'auto');
    renderSearchResults();
  }).catch(() => {});
  function clearLyricSearch() {
    cancelLyricSearch();
    searchState = '';
    res = [];
    searchStatuses = {};
    renderSearchResults();
  }
  async function searchLyrics() {
    const q = draft.get("lq").trim() || draft.get("ttl").trim();
    if (!q) return;
    if (q.length > 200) {
      cancelLyricSearch();
      searchState = 'Enter a song or artist name (1–200 characters).';
      res = [];
      renderSearchResults();
      return;
    }
    cancelLyricSearch();
    const request = lyricSearchController = new AbortController(),
      revision = lyricSearchRevision, provider = draft.get('lyricProvider');
    const cancelTimeout = runtime.timeout(() => request.abort(), 16000);
    draft.set('lyricLoadStatus', '');
    searchState = 'Searching…';
    res = [];
    searchStatuses = {};
    renderSearchResults();
    try {
      await relayReady;
      if (runtime.disposed || revision !== lyricSearchRevision) return;
      if (request.signal.aborted) throw new DOMException('Timed out', 'AbortError');
      const response = await window.ManokaraSession.api(relayUrl('/__lyrics/search'), {
        query: q, provider, duration: searchMediaDuration > 0 ? searchMediaDuration : null
      }, {
        signal: AbortSignal.any([runtime.signal, request.signal])
      });
      const data = await response.json();
      if (runtime.disposed || revision !== lyricSearchRevision || q !== (draft.get('lq').trim() || draft.get('ttl').trim()) || provider !== draft.get('lyricProvider')) return;
      if (!response.ok) throw Error(response.status === 404 ? 'Restart the updated server to enable multi-source lyric search.' : data.error || 'Lyric search is temporarily unavailable.');
      res = readLyricResults(data.results);
      if (Array.isArray(data.providers)) lyricProviders = readProviderCatalog(data.providers);
      searchStatuses = data.statuses && typeof data.statuses === 'object' ? data.statuses : {};
      searchState = lyricProviders.some(source => source.enabled) ? 'results' : 'No lyric sources are enabled on the server.';
      renderSearchResults();
    } catch (e) {
      if (runtime.disposed || revision !== lyricSearchRevision) return;
      searchState = request.signal.aborted ? 'Lyric search took too long. Try again.' : e.message || 'Search failed. Check your connection.';
      renderSearchResults();
    } finally {
      cancelTimeout();
      if (lyricSearchController === request) lyricSearchController = null;
    }
  }
  function selectLyric(index) {
    const x = res[index];
    if (!x) return;
    cancelLyricSearch();
    draft.set("llrc", x.syncedLyrics || x.plainLyrics || '');
    draft.patch({ lyricSourceLabel: x.sources.map(source => source.label).join(' · '),
      lyricSourceUrl: safeLyricSourceUrl(x.sources.find(source => safeLyricSourceUrl(source.url))?.url), lyricCopyright: x.copyright || '', lyricSources: JSON.stringify(readLyricSources(x.sources)) });
    lyricEditor.sourceReplaced();
    pickDur = x.duration;
    const timed = !!x.syncedLyrics;
    draft.set("lyricLoadStatus", [uiText(timed ? 'Timed lyrics loaded. Save the song to keep them.' : 'Plain lyrics loaded. Save the song to keep them.'), lyricImportNotice(x.warnings, uiText)].filter(Boolean).join(' '));
    searchState = '';
    res = [];
    renderSearchResults();
    msg(timed ? 'Synced lyrics picked. Press Add/Save to keep them.' : 'Plain text only: it will scroll roughly evenly. During playback press T to time each line.');
  }
  runtime.own(appRuntime.commands.bind('editor', {
    searchLyrics,
    clearLyricSearch,
    selectLyric,
    save: saveSong,
    cancel: reset,
    addBreak: addMcBreak,
    urlChanged,
    lyricsChanged
  }));
  window.ManokaraSongEditorActions = appRuntime.commands.actions('editor');

  /* player controls */
  runtime.own(appRuntime.commands.bind('player', {
    play() {
      if (ci) {
        playback.play();
        return;
      }
      if (!items.length) {
        msg('Add a song first.');
        return;
      }
      go(last >= 0 && last < items.length ? last : 0);
    },
    pause: () => playback.togglePause(),
    stop() {
      go(-1);
      msg('Stopped. Press Play to start again.');
    },
    next() {
      go(nxt());
    },
    previous() {
      go(prv());
    },
    stepKey(amount) {
      playback.changeKey((ci?.pitch || 0) + amount);
    },
    resetKey() {
      playback.changeKey(0);
    },
    startTabAudio: () => playback.startTabAudio(),
    stopTabAudio: () => playback.stopTabAudio(),
    setVolume(value) {
      controls.set('vol', String(value));
      playback.setVolume(value);
      updatePlayerControlView();
    }
  }));
  window.ManokaraPlayerActions = appRuntime.commands.actions('player');
  updatePlayerControlView();
  const theme = persistence.preferences.get('theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
  const transposeDialog = $('#transposeDialog');
  const studioBackground = [...document.querySelectorAll('.app-header,.main-tabs,#grid,#playlistStudio,.app-footer')];
  function closeTranspose() {
    appRuntime.ui.setTransposeOpen(false);
    studioBackground.forEach(el => el.inert = false);
    $('#transpose').focus();
  }
  function openTranspose() {
    appRuntime.ui.setTransposeOpen(true);
    studioBackground.forEach(el => el.inert = true);
    runtime.frame(() => $('#transposeClose').focus());
  }
  runtime.own(appRuntime.commands.bind('dialog', {
    openTranspose,
    closeTranspose
  }));
  window.ManokaraDialogActions = appRuntime.commands.actions('dialog');
  runtime.listen(transposeDialog, 'keydown', e => {
    if (e.key !== 'Tab') return;
    const controls = [...transposeDialog.querySelectorAll('button:not([disabled]),a[href]')],
      first = controls[0],
      last = controls.at(-1);
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  runtime.listen(document, 'keydown', e => {
    if (e.key === 'Escape' && !transposeDialog.hidden) {
      e.preventDefault();
      closeTranspose();
    }
  });
  /* green-screen window */
  function showOff() {
    const it = ci,
      v = it && !it.mc ? Math.round((it.off || 0) * 10) / 10 : 0;
    updateLiveLyricsPanel({
      syncValue: uiText('Sync: ') + (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(1) + ' s' + (v > 0 ? uiText(' (lyrics earlier)') : v < 0 ? uiText(' (lyrics later)') : ''),
      syncColor: v ? 'var(--ac)' : '',
      syncDisabled: !it || !!it.mc,
      labels: liveLyricsLabels()
    });
  }
  function persistSongSettings(it) {
    const persisted = save();
    if (it.libraryId && it.librarySync !== false) {
      void libraryPut(it).then(async () => {
        await refreshLibrary();
        if (!persisted) msg('Saved to My songs. The setlist could not be saved in this browser.');
      }).catch(() => msg(persisted ? 'Saved to setlist; My songs could not be updated' : 'Browser storage is full or unavailable. Changes remain in this window only.'));
    }
    return persisted;
  }
  function setLyricOffset(value) {
    const it = ci;
    if (!it || it.mc) return;
    if (!Number.isFinite(value)) return;
    takeRelayOwnership();
    it.off = Math.round(value * 1000) / 1000;
    playback.invalidateLyrics();
    if (edit >= 0 && items[edit] === it) draft.set("loff", it.off);
    showOff();
    updPan();
    persistSongSettings(it);
    makeObsSnapshot();
    sendDirectSnapshot();
    void publishObsState();
  }
  const nudge = d => {
    if (ci && Number.isFinite(d)) setLyricOffset((Number(ci.off) || 0) + d);
  };
  const FONTS = lyricFonts.map((font, index) => index === 0 ? [uiText(font[0]), ...font.slice(1)] : font);
  const SF = ['cdn', ...LYRIC_STYLE_FIELDS];
  const S = persistence.preferences.loadOutput({
    fontCount: FONTS.length
  }).value;
  let themeSeed = Number(S.themeSeed) >>> 0;
  controls.patch({...Object.fromEntries(SF.filter(k=>S[k]!=null).map(k=>[k,S[k]])),lbold:S.lbold ?? true,lcenter:!!S.centerFree});
  const saveSet = () => {
    const style = readLyricStyle();
    if (ci && !ci.mc && ci.lyricStyle) {
      ci.lyricStyle = style;
      persistSongSettings(ci);
    } else defaultLyricStyle = style;
    const o = {};
    SF.forEach(k => o[k] = k === 'cdn' ? controls.get("cdn") : defaultLyricStyle[k]);
    o.lbold = defaultLyricStyle.lbold;
    o.centerFree = defaultLyricStyle.centerFree;
    o.themeSeed = defaultLyricStyle.themeSeed;
    o.fxv = 1;
    if (!persistence.preferences.saveOutput(o).ok) msg('Browser storage is full or unavailable. Changes remain in this window only.');
    syncSongStyleView();
  };
  const styleFields = LYRIC_STYLE_FIELDS;
  function readLyricStyle() {
    const style = {
      version: 1,
      lbold: controls.get("lbold"),
      centerFree: controls.get("lcenter"),
      themeSeed
    };
    styleFields.forEach(key => style[key] = controls.get(key));
    return style;
  }
  let defaultLyricStyle = readLyricStyle();
  function normalizeLyricStyle(value) {
    return normalizePersistedStyle(value, defaultLyricStyle, {
      fontCount: FONTS.length
    });
  }
  function syncSongStyleView() {
    appRuntime.ui.updateOBSSettingsState({
      songStyleEnabled: !!ci && !ci.mc,
      songStyleSaved: !!ci && !ci.mc && !!ci.lyricStyle,
      songStyleTitle: ci && !ci.mc ? ci.title : ''
    });
  }
  function applySongStyle(it) {
    const style = normalizeLyricStyle(it?.lyricStyle) || defaultLyricStyle;
    if (it?.lyricStyle?.lfx === 'folia-cappella') {
      it.lyricStyle = style;
      persistSongSettings(it);
    }
    controls.patch({...Object.fromEntries(styleFields.map(key=>[key,style[key]])),lbold:style.lbold,lcenter:style.centerFree});
    themeSeed = style.themeSeed;
    syncFxInputs();
    updateCenterPreview();
    syncSongStyleView();
  }
  function rememberSongStyle(enabled) {
    const it = ci;
    if (!it || it.mc) return;
    takeRelayOwnership();
    if (enabled) it.lyricStyle = readLyricStyle();else {
      delete it.lyricStyle;
      applySongStyle(null);
    }
    persistSongSettings(it);
    syncSongStyleView();
    makeObsSnapshot();
    sendDirectSnapshot();
    void publishObsState();
    msg(enabled ? 'Animation settings saved for this song. Further changes save automatically.' : 'This song now uses the shared animation settings.');
  }
  function syncFxInputs() {
    const effect = controls.get("lfx"),
      classic = effect === 'karaoke-classic',
      jizura = effect === 'jizura';
    appRuntime.ui.updateOBSSettingsState({
      classic,
      jizura,
      randomTitle: uiText(jizura ? 'Reroll the JIZURA lyric-motion style for the current song' : 'Select JIZURA to randomize its lyric-motion style'),
      language: ManokaraI18n.language
    });
  }
  function randomizeJizura() {
    if (controls.get("lfx") !== 'jizura') return;
    takeRelayOwnership();
    const seed = new Uint32Array(1);
    try {
      crypto.getRandomValues(seed);
      themeSeed = seed[0];
    } catch (e) {
      themeSeed = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
    }
    saveSet();
    makeObsSnapshot();
    sendDirectSnapshot();
    void publishObsState();
    msg('JIZURA lyric-motion style randomized. Click again to reroll.');
  }
  function updateCenterPreview() {
    let shape = controls.get("lshape");
    if (shape === 'auto') shape = innerHeight > innerWidth * 1.1 ? 'tall' : 'wide';
    const effect = controls.get("lfx");
    let hint;
    if (effect === 'folia-monet') hint = 'Monet keeps its original lyric-rail and portrait composition; alternating placement is not applied.';else if (effect === 'folia-pendolo') hint = 'Pendolo renders its clockwork layout as one scene, so Keep centre free is skipped.';else if (effect === 'folia-claddagh') hint = 'Claddagh already arranges lyrics around an open centre; its circular layout is preserved.';else if (['folia-fume', 'folia-sonnet', 'folia-tempera', 'folia-lumiere', 'folia-diorama'].includes(effect)) hint = 'This effect combines lyrics and motion in one full-frame scene, so Keep centre free is skipped to preserve the full-frame effect.';else hint = 'Lyrics alternate around the open centre; the Folia background and full-frame effects stay in place.';
    const centerFree = controls.get("lcenter");
    appRuntime.ui.updateOBSSettingsState({
      centerFree,
      shape,
      centerTitle: uiText(centerFree ? 'The dotted area stays clear for a character.' : 'Enable to keep the dotted centre area clear.'),
      centerHint: uiText(hint),
      language: ManokaraI18n.language
    });
  }
  updateCenterPreview();
  function settingChanged(id) {
    takeRelayOwnership();
    if (id === 'lclassiccolor') controls.set("ltheme", 'effect');
    saveSet();
    if (id === 'lfx') syncFxInputs();
    if (['lcenter', 'lshape', 'lfx'].includes(id)) updateCenterPreview();
    makeObsSnapshot();
    sendDirectSnapshot();
    void publishObsState();
  }
  runtime.listen(window, 'resize', updateCenterPreview);
  syncFxInputs();
  function openLyricsWindow() {
    if (!relayInitialized) {
      msg('Wait for the lyric relay to connect.');
      return;
    }
    const opened = window.open(window.ManokaraSession.obsUrl(true), 'kpt-lyrics', 'width=1280,height=720');
    if (!opened) msg('Popup blocked. Please allow popups.');else msg('Green-screen window opened. It shares the OBS effect output.');
  }
  let relayUp = null,
    publishPending = false,
    relayScene = null;
  const playlistHistory = [];
  let playlistLastSung = null,
    playlistHistoryCount = 0;
  function playlistMetadata() {
    const active = ci,
      playing = mediaPlaying(),
      currentIndex = idx(),
      nextIndex = ci ? nxt() : last >= 0 ? last + 1 : 0;
    if (!active) playlistLastSung = null;
    if (playing && active && !active.mc && playlistLastSung !== active) {
      playlistLastSung = active;
      playlistHistory.push({
        song: active,
        title: String(active.title).slice(0, 160),
        index: playlistHistoryCount++
      });
      if (playlistHistory.length > 120) playlistHistory.shift();
    }
    const songStart = Math.max(0, Math.floor(Math.max(0, currentIndex) / 120) * 120);
    return JSON.stringify({
      now: active ? active.mc ? uiText('MC break') : String(active.title).slice(0, 160) : '',
      next: items[nextIndex] ? items[nextIndex].mc ? uiText('MC break') : String(items[nextIndex].title).slice(0, 160) : '',
      videoId: active && !active.mc ? yid(active.url) || '' : '',
      currentIndex,
      nextIndex: nextIndex < items.length ? nextIndex : -1,
      status: !active ? 'ready' : playback.state.counting ? 'counting' : playback.state.paused ? 'paused' : active.mc ? 'mc' : playing ? 'playing' : 'ready',
      songs: items.slice(songStart, songStart + 120).map((song, index) => ({
        title: String(song.mc ? uiText('MC break') : song.title).slice(0, 160),
        index: index + songStart
      })),
      history: playlistHistory.filter(row => row.song !== active).map(({
        title,
        index
      }) => ({
        title,
        index
      }))
    });
  }
  const uploadLatency = ManokaraCore.createLatencyEstimator();
  const audioReaction = ManokaraAudio.create($('#audioReaction'), $('#audioStatus'));
  let directChannel = null,
    directChannelName = '';
  function sendDirectSnapshot() {
    const previewSnapshot = stagePreview.active ? makeObsSnapshot() : null;
    if (!relayInitialized || relayUp !== true) return;
    try {
      const token = new URL(window.ManokaraSession.obsUrl(false)).hash.slice(1),
        name = 'manokara-live-' + relayRoom + '-' + new URLSearchParams(token).get('view');
      if (name !== directChannelName) {
        directChannel?.close();
        directChannel = new BroadcastChannel(name);
        directChannelName = name;
      }
      directChannel.postMessage({
        snapshot: previewSnapshot || makeObsSnapshot(),
        sentAt: Date.now()
      });
    } catch (_) {}
  }
  runtime.interval(sendDirectSnapshot, 100);
  function setRelayStatus(ok, owned = true, detail = '') {
    const el = $('#relayStatus');
    if (!el) return;
    el.dataset.state = ok ? owned ? 'connected' : 'inactive' : 'error';
    if (ok) {
      el.textContent = owned ? uiText('OBS relay connected') : uiText('OBS relay active · another window controls lyrics');
    } else if (location.protocol === 'file:') {
      el.innerHTML = uiMarkup('OBS relay unavailable on file:// · <a href="http://localhost:8000/manokara.html">open server version</a>');
    } else if (location.protocol === 'https:') {
      el.textContent = uiText('Lyric relay unavailable · check deployment') + (detail ? ' · ' + String(uiText(String(detail))).replace(/[\r\n\x00-\x1f]/g, ' ').slice(0, 120) : '');
    } else {
      el.textContent = uiText('OBS relay unavailable · start the server');
    }
  }
  function makeObsSnapshot() {
    const it = ci,
      custom = controls.get("lfc").trim().replace(/["<>]/g, '');
    const font = custom ? '"' + custom + '"' : (FONTS[+controls.get("lfont")] || FONTS[0])[1];
    const remaining = playback.state.countdownRemaining;
    const fontDef = FONTS[+controls.get("lfont")] || FONTS[0],
      effect = controls.get("lfx");
    const googleFont = effect === 'jizura' ? '' : custom || fontDef[2] || '';
    const playing = mediaPlaying();
    const rawTime = !playback.state.counting && it && !it.mc ? audibleElapsed() : 0,
      time = rawTime + (it && !it.mc && !playback.state.counting ? it.off || 0 : 0);
    const snapshot = {
      writerId: relayPageId,
      ready: true,
      title: it && !it.mc ? it.title : '',
      lrc: it && !it.mc ? ManokaraLyrics.displayLrc(it) : '',
      romajiLrc: it && !it.mc ? ManokaraLyrics.secondaryLrc(it) : '',
      time,
      sampledAt: Date.now(),
      timelineVersion: playback.state.timelineVersion,
      playing,
      paused: !!playback.state.paused,
      counting: !!playback.state.counting,
      countdownRemaining: remaining,
      duration: it && !it.mc ? lyricDuration(it) : 0,
      mc: !!(it && it.mc),
      memo: it && it.mc ? it.memo || '' : '',
      size: +controls.get("lsz") || 64,
      foreground: effect === 'karaoke-classic' ? controls.get("lclassiccolor") : controls.get("lcol"),
      themeSeed,
      background: controls.get("lbgmode") === 'green' ? '#00ff00' : 'transparent',
      transparent: controls.get("lbgmode") !== 'green',
      bold: controls.get("lbold"),
      font,
      googleFont,
      effect,
      centerFree: controls.get("lcenter"),
      centerShape: controls.get("lshape"),
      colorTheme: controls.get("ltheme")
    };
    snapshot.overlay = window.ManokaraStudio.serialized;
    snapshot.playlist = playlistMetadata();
    snapshot.playlistTime = Math.max(0, rawTime);
    Object.assign(snapshot, playing ? audioReaction.sample() : {
      audioPower: 0,
      audioBass: 0,
      audioLowMid: 0,
      audioMid: 0,
      audioVocal: 0,
      audioTreble: 0
    });
    window.ManokaraStudio.feed(snapshot);
    stagePreview.feed(snapshot);
    return snapshot;
  }
  async function publishObsState() {
    if (runtime.disposed || runtime.suspended) return;
    if (publishPending || !relayInitialized || relayUp === 'inactive') return;
    publishPending = true;
    try {
      const snapshot = makeObsSnapshot();
      snapshot.uploadDelayMs = uploadLatency.oneWay();
      const started = performance.now();
      const { partial, packet } = createRelayPacket(snapshot, relayScene);
      const target = new URL(relayUrl('/__lyric-state'));
      if (partial) target.searchParams.set('patch', '1');
      const r = await window.ManokaraSession.api(target, packet, {
        signal: runtime.signal
      });
      if (r.status === 428) {
        relayScene = null;
        return;
      }
      if (r.status === 409) {
        if (relayUp !== 'inactive') setRelayStatus(true, false);
        relayUp = 'inactive';
        return;
      }
      if (!r.ok) {
        const failure = await r.json().catch(() => ({}));
        throw Error(failure.error || 'Relay returned HTTP ' + r.status + '.');
      }
      await r.json();
      relayScene = snapshot;
      uploadLatency.record(performance.now() - started);
      if (relayUp !== true) setRelayStatus(true);
      relayUp = true;
    } catch (e) {
      if (runtime.disposed) return;
      if (relayUp !== false) setRelayStatus(false, true, e.message || 'Network request failed.');
      relayUp = false;
    } finally {
      publishPending = false;
    }
  }
  async function copyObsUrl() {
    try {
      await navigator.clipboard.writeText(appRuntime.stores.obsSettings.getSnapshot().obsUrl);
      msg('OBS URL copied.');
    } catch (e) {
      if (runtime.disposed) return;
      $('#obsurl')?.select();
      msg('Select and copy the OBS URL.');
    }
  }
  async function rotateObsLink() {
    try {
      await window.ManokaraSession.rotate();
      appRuntime.ui.updateOBSSettingsState({
        obsUrl: window.ManokaraSession.obsUrl(false)
      });
      window.ManokaraStudio.refresh();
      msg('Previous OBS links revoked. Update both lyrics and playlist Browser Sources with their new URLs.');
    } catch (e) {
      msg(e.message);
    }
  }
  runtime.own(appRuntime.commands.bind('obs', {
    settingChanged,
    rememberSongStyle,
    randomizeJizura,
    openLyricsWindow,
    copyUrl: copyObsUrl,
    rotateLink: rotateObsLink
  }));
  window.ManokaraObsActions = appRuntime.commands.actions('obs');
  runtime.interval(publishObsState, 200);
  relayReady.then(() => publishObsState()).catch(e => {
    if (runtime.disposed || runtime.suspended) return;
    setRelayStatus(false, true, e.message);
    msg(e.message);
  });
  runtime.interval(() => {
    if (relayUp === true) relayServerAction('renew');
  }, 5000);
  var pickDur;
  /* right-hand lyrics panel */
  let pk = '',
    panelActive = -2,
    fs = 16,
    livePanelLines = [],
    livePanelEmpty = {
      primary: 'Your words will find their place here.',
      secondary: 'Add lyrics to a song to follow along.'
    },
    livePanelInfo = '';
  function updateLiveLyricsView(lines, active, empty = null, info = '') {
    livePanelLines = Array.isArray(lines) ? lines : [];
    livePanelEmpty = empty;
    livePanelInfo = info;
    const patch = {
      lines: livePanelLines,
      active,
      empty,
      info,
      source: ci && !ci.mc ? ci.lyricSource || null : null,
      fontSize: fs,
      labels: liveLyricsLabels()
    };
    appRuntime.ui.updateLiveLyrics(patch);
  }
  function fsz(d) {
    fs = Math.min(40, Math.max(11, fs + d));
    updateLiveLyricsView(livePanelLines, panelActive, livePanelEmpty, livePanelInfo);
  }
  function updPan() {
    const it = ci;
    if (!it || it.mc || !it.lrc) {
      const noLyrics = !!it && !it.mc;
      const key = noLyrics ? 'empty:no-lyrics' : 'empty:no-song';
      if (pk !== key) {
        pk = key;
        panelActive = -1;
        updateLiveLyricsView([], -1, {
          primary: uiText(noLyrics ? 'No lyrics for this song yet.' : 'Your words will find their place here.'),
          secondary: uiText(noLyrics ? 'Find or import lyrics in the song editor.' : 'Add lyrics to a song to follow along.')
        });
      }
      return;
    }
    const L = getL(it),
      k = it._L.k;
    if (k !== pk) {
      pk = k;
      panelActive = -2;
    }
    const t = playback.state.counting ? -1 : audibleElapsed() + (it.off || 0);
    let a = null;
    for (const q of L) {
      if (q.t <= t) a = q;else break;
    }
    const idx2 = a ? it._L.all.indexOf(a) : -1;
    if (idx2 === panelActive) return;
    panelActive = idx2;
    updateLiveLyricsView(it._L.all, idx2, null, it._L.timed ? '' : uiText('Plain text: scrolling is approximate. Press T on each line to time it.'));
  }
  runtime.interval(updPan, 150);
  function tap() {
    const it = ci;
    if (!it || it.mc || !it.lrc) {
      msg('Play a song with lyrics first.');
      return;
    }
    const raw = it.lrc.split(/\r?\n/),
      i = raw.findIndex(l => l.replace(/\[[^\]]*\]/g, '').trim() && !/^\s*\[\d+:\d{2}/.test(l));
    if (i < 0) {
      msg('All lines already have times.');
      return;
    }
    const t = Math.max(0, audibleElapsed() + (it.off || 0)),
      stamp = '[' + String(Math.floor(t / 60)).padStart(2, '0') + ':' + (t % 60).toFixed(2).padStart(5, '0') + ']';
    const romanized = ManokaraLyrics.validRomaji(it) ? it.romaji.lrc.split(/\r?\n/) : null;
    raw[i] = stamp + raw[i].trim();
    it.lrc = raw.join('\n');
    if (romanized) {
      romanized[i] = stamp + romanized[i].trim();
      it.romaji = {
        source: it.lrc,
        lrc: romanized.join('\n')
      };
    }
    playback.invalidateLyrics();
    persistSongSettings(it);
    updPan();
    makeObsSnapshot();
    sendDirectSnapshot();
    void publishObsState();
    msg('Timed line ' + (i + 1) + '.');
  }
  runtime.own(appRuntime.commands.bind('lyrics', {
    setMode: setLiveLyricMode,
    font: fsz,
    nudge,
    resetSync() {
      setLyricOffset(0);
    },
    tap
  }));
  window.ManokaraLyricsActions = appRuntime.commands.actions('lyrics');
  runtime.listen(document, 'keydown', e => {
    if (ManokaraTour.active || !transposeDialog.hidden || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(e.target.tagName) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 't' || e.key === 'T') tap();
  });
  function refreshLanguage() {
    appRuntime.ui.updatePlayerPanelState({
      language: ManokaraI18n.language
    });
    render();
    updatePlaybackState();
    refreshPitch();
    syncFxInputs();
    updateCenterPreview();
    syncLiveLyricMode();
    renderSearchResults();
    renderLibrary();
    refreshPitch();
    appRuntime.ui.updateSongEditorView({
      title: uiText(edit >= 0 ? 'Edit song' : 'Add a song'),
      saveLabel: uiText(edit >= 0 ? 'Save changes' : 'Add to setlist'),
      editing: edit >= 0
    });
    if (!ci) {
      appRuntime.ui.updatePlayerPanelState({
        stageMode: 'empty',
        stageTitle: '',
        stageNote: '',
        stageUrl: ''
      });
      setPlayerNow(uiText('Nothing playing yet'));
    } else if (ci.mc) {
      appRuntime.ui.updatePlayerPanelState({
        stageMode: 'mc',
        stageTitle: uiText('MC break'),
        stageNote: ci.memo || uiText('Take a moment between songs.')
      });
      setPlayerNow(uiText('MC break'));
    } else if (!yid(ci.url) && !/\.(mp4|mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(ci.url)) {
      appRuntime.ui.updatePlayerPanelState({
        stageMode: 'external',
        stageTitle: uiText('Open this link to play.'),
        stageNote: uiText('This media opens in a new tab. Your lyric clock is running here.'),
        stageUrl: ci.url,
        stageLinkLabel: uiText('Open media')
      });
    }
    if (!ci || ci.mc || !ci.lrc) {
      pk = '';
      updPan();
    } else if (ci._L) updateLiveLyricsView(livePanelLines, panelActive, null, ci._L.timed ? '' : uiText('Plain text: scrolling is approximate. Press T on each line to time it.'));
    if (playback.state.counting) {
      refreshCountdown({
        visible: true,
        title: ci.title,
        remaining: playback.state.countdownRemaining
      });
      setPlayerTime(uiText('Starting in ') + Math.ceil(playback.state.countdownRemaining) + ' s');
    }
    if (relayUp !== null) setRelayStatus(relayUp === true || relayUp === 'inactive', relayUp !== 'inactive');else $('#relayStatus').textContent = uiText('Connecting to OBS…');
    if (!relayInitialized) appRuntime.ui.updateOBSSettingsState({
      obsUrl: uiText('Connecting…')
    });
    msg(messageSource);
  }
  runtime.listen(window, 'manokara:languagechange', () => {
    render();
    renderLibrary();
    updatePlayerControlView();
  });
  ManokaraI18n.init();
  ManokaraStudio.init({
    changed: () => publishObsState(),
    url: kind => relayInitialized ? ManokaraSession.obsUrl(false, kind) : '',
    clearHistory() {
      playlistHistory.length = 0;
      playlistHistoryCount = 0;
      publishObsState();
    }
  });
  runtime.listen(window, 'manokara:languagechange', refreshLanguage);
  refreshLanguage();
  ManokaraTour.init({
    showTab: showStudioTab,
    showMain: ManokaraStudio.showMain,
    main: () => ManokaraStudio.main
  });
  runtime.own(appRuntime.commands.bind('youtubeSearch', {
    search: async ({
      query,
      karaoke,
      signal
    }) => {
      await relayReady;
      return window.ManokaraSession.api(relayUrl('/__youtube/search'), {
        query,
        karaoke
      }, {
        signal
      });
    }
  }));
  window.ManokaraYoutubeSearchService = appRuntime.commands.actions('youtubeSearch').search;
  function chooseYoutubeVideo(video) {
    const songPanel = $('#panel-song');
    if (yid(draft.get("url").trim()) === video.id) {
      showStudioTab('song');
      songPanel.scrollTop = 0;
      $('.field-grid').scrollIntoView({
        block: 'nearest',
        behavior: 'instant'
      });
      $('#ttl').focus({
        preventScroll: true
      });
      return true;
    }
    const hasDraft = edit >= 0 || ['url', 'ttl', 'st', 'en', 'llrc', 'romajiLrc'].some(id => draft.get(id).trim());
    if (hasDraft && !confirm(uiText('Replace the current song draft with this video? Unsaved edits will be discarded.'))) return false;
    reset();
    draft.set("url", 'https://www.youtube.com/watch?v=' + video.id);
    draft.set("ttl", video.title);
    draft.set("lq", video.title.replace(/\s*[\(\[【].*$/, ''));
    pickDur = video.duration ?? undefined;
    searchMediaDuration = video.duration ?? undefined;
    showStudioTab('song');
    songPanel.scrollTop = 0;
    $('.field-grid').scrollIntoView({
      block: 'nearest',
      behavior: 'instant'
    });
    $('#ttl').focus({
      preventScroll: true
    });
    msg('Video selected. Find lyrics if you like, then Add to setlist.');
    return true;
  }
  runtime.own(appRuntime.commands.bind('youtube', {
    choose: chooseYoutubeVideo
  }));
  window.ManokaraYoutubeActions = appRuntime.commands.actions('youtube');
  function dispose({
    navigation = false
  } = {}) {
    if (runtime.disposed) return;
    void relayServerAction('release');
    playback.dispose({
      preserveCapture: navigation
    });
    runtime.dispose();
    directChannel?.close();
    directChannel = null;
    persistence.library.close();
    audioReaction.dispose?.();
    window.removeEventListener('pagehide', pageHidden);
    window.removeEventListener('pageshow', pageShown);
  }
  function pageHidden(event) {
    if (event.persisted) {
      playback.suspend();
      audioReaction.stop?.();
      makeObsSnapshot();
      sendDirectSnapshot();
      void publishObsState();
      runtime.suspend();
      directChannel?.close();
      directChannel = null;
    } else dispose({
      navigation: true
    });
  }
  function pageShown(event) {
    if (!event.persisted || runtime.disposed) return;
    runtime.resume();
    playback.resume();
    relayScene = null;
    takeRelayOwnership();
    makeObsSnapshot();
    sendDirectSnapshot();
    void publishObsState();
  }
  window.addEventListener('pagehide', pageHidden);
  window.addEventListener('pageshow', pageShown);
  window.ManokaraController = {
    dispose,
    start: () => playback.start(),
    get active() {
      return !runtime.disposed;
    },
    getSnapshot: () => playback.getSnapshot(),
    diagnostics: () => ({
      timers: runtime.timerCount,
      activeTimers: runtime.activeTimerCount,
      listeners: runtime.cleanupCount,
      playback: playback.getSnapshot()
    })
  };
  playback.start();
  return window.ManokaraController;
}
