import { clampSongPitch } from '../domain/song.mjs';
import { createPlaybackClock, audiblePosition, isTimeDiscontinuity } from '../domain/playback-clock.mjs';
import { createLifecycle } from './lifecycle.mjs';

/** A single playback owner. Adapters perform browser work; callbacks connect UI/persistence. */
export function createPlayback({
  youtube,
  mediaAdapter,
  pitchFactory,
  captureFactory,
  lookup,
  youtubeId: yid,
  origin,
  options = () => ({}),
  output = {},
  callbacks = {},
  platform = globalThis,
  now = () => performance.now()
}) {
  const lifetime = createLifecycle(platform, now),
    clock = createPlaybackClock(now);
  let track = createLifecycle(platform, now),
    currentSong = null,
    mode = '',
    counting = false,
    cancelCountdown = null,
    fbPend = null,
    dur = null,
    media = null,
    mediaStart = 0,
    yt = null,
    ytOk = false,
    tok = 0,
    paused = false,
    mediaLookup = null,
    pitchBusy = false,
    pitchJob = 0,
    pitchMessage = 'Play a song to change its key.',
    pitchStatusState = '',
    captureActive = false,
    captureDelay = 0,
    playbackSample = null,
    started = false,
    advancing = false,
    resumePlayback = false,
    cancelFailure = null,
    cancelFinish = null;
  const subscribers = new Set();
  const uiText = value => output.text?.(value) ?? value;
  const fmt = value => output.format?.(value) ?? String(value);
  const msg = value => {
    if (!lifetime.disposed && !lifetime.suspended) output.message?.(value);
  };
  const isCurrent = my => !lifetime.disposed && my === tok;
  const isPitchCurrent = (my, job) => isCurrent(my) && job === pitchJob && !lifetime.suspended;
  const pitch = pitchFactory.create(text => {
    if (lifetime.disposed) return;
    if (currentSong && !currentSong.mc) {
      currentSong.pitch = 0;
      callbacks.persist?.(currentSong);
      callbacks.render?.();
    }
    pitchMessage = text;
    refreshPitch('error');
  });
  const tabAudio = captureFactory({
    getState: () => ({
      key: currentSong && !currentSong.mc ? clampSongPitch(currentSong.pitch) : 0,
      title: currentSong?.title || '',
      language: options().language || 'en',
      enabled: !!currentSong && !currentSong.mc && !counting && (mode === 'yt' ? ytOk : mode === 'media' ? !!media : !!yid(currentSong.url)),
      sequence: tok,
      version: clock.audioVersion
    }),
    onStatus(result) {
      if (lifetime.disposed) return;
      if (result.active && pitch.element) void pitch.set(0).catch(() => {});
      if (captureActive !== result.active || Math.abs(captureDelay - result.delay) > .005) clock.lyricsChanged();
      captureActive = result.active;
      captureDelay = result.delay;
      pitchMessage = result.active ? currentSong?.pitch ? 'Key applied. Saved for this song.' : 'Original key.' : result.message || 'Tab Audio stopped. The player is using its original sound.';
      refreshPitch(result.error ? 'error' : '');
      if (result.message) msg(pitchMessage);
    }
  });
  function notify() {
    if (!started || lifetime.disposed || lifetime.suspended) return;
    const value = snapshot();
    callbacks.changed?.(value);
    for (const listener of subscribers) listener(value);
  }
  function mediaRate() {
    try {
      return mode === 'yt' ? Number(yt?.getPlaybackRate?.()) || 1 : mode === 'media' ? media?.playbackRate || 1 : 1;
    } catch (_) {
      return 1;
    }
  }
  function snapshot() {
    return Object.freeze({
      mode,
      counting,
      paused,
      duration: dur,
      ready: ytOk,
      lookupPending: !!mediaLookup,
      pitchBusy,
      pitchMessage,
      pitchStatusState,
      countdownRemaining: counting ? clock.remaining() : 0,
      position: elapsed(),
      audiblePosition: audibleElapsed(),
      playing: mediaPlaying(),
      sequence: tok,
      timelineVersion: clock.timelineVersion,
      audioVersion: clock.audioVersion,
      captureActive: tabAudio.active,
      captureBusy: tabAudio.busy,
      captureDelay: tabAudio.delay,
      started,
      disposed: lifetime.disposed,
      suspended: lifetime.suspended,
      timers: track.timerCount,
      activeTimers: track.activeTimerCount,
      listeners: track.cleanupCount
    });
  }
  function refreshPitch(state = null) {
    if (state !== null) pitchStatusState = state;
    notify();
    tabAudio.sync();
  }
  function updatePlaybackState() {
    notify();
    tabAudio.sync();
  }
  function setPauseUI(value) {
    if (counting && paused !== value) {
      if (value) clock.pause();else clock.resume({
        fallback: false,
        countdown: true
      });
    }
    paused = value;
    updatePlaybackState();
  }
  function ovShow() {
    output.countdown?.({
      visible: !!counting && !!currentSong,
      title: currentSong?.title || '',
      remaining: counting ? clock.remaining() : 0
    });
  }
  function setPlayerTime(value) {
    if (!lifetime.disposed && !lifetime.suspended) output.time?.(value);
  }
  function advance() {
    if (advancing || lifetime.disposed || lifetime.suspended) return;
    advancing = true;
    callbacks.advance?.();
  }
  function clearAll() {
    tok++;
    clock.reset();
    track.dispose();
    track = createLifecycle(platform, now);
    tabAudio.silence();
    playbackSample = null;
    pitch.detach();
    pitchJob++;
    pitchBusy = false;
    mediaLookup?.abort();
    mediaLookup = null;
    youtube.destroy(yt);
    yt = null;
    ytOk = false;
    mediaAdapter.release(media);
    media = null;
    mediaStart = 0;
    currentSong = null;
    mode = '';
    counting = false;
    cancelCountdown = null;
    cancelFailure = cancelFinish = null;
    fbPend = null;
    dur = null;
    paused = false;
    advancing = false;
    mediaAdapter.clear();
    output.time?.('00:00 / 00:00');
    output.stage?.({
      youtubeUrl: '',
      stageMode: 'empty',
      stageTitle: '',
      stageNote: '',
      stageUrl: '',
      countdownVisible: false,
      countdownTitle: '',
      countdownValue: ''
    });
  }
  function mediaPlaying() {
    if (!currentSong || currentSong.mc || counting || paused) return false;
    if (mode === 'media') return !!media && !media.paused && !media.ended && media.readyState >= 2;
    if (mode === 'yt') {
      try {
        return ytOk && yt.getPlayerState() === 1;
      } catch (e) {
        return false;
      }
    }
    return clock.running;
  }
  async function playMedia() {
    const el = media,
      my = tok;
    if (!el || pitchBusy || lifetime.suspended) return;
    try {
      if (pitch.element === el) await pitch.resume();
      if (isCurrent(my) && media === el && !lifetime.suspended) await el.play();
    } catch (error) {
      if (isCurrent(my) && media === el && !lifetime.suspended) {
        setPauseUI(true);
        if (error.name === 'NotAllowedError') msg('Playback was blocked. Press Play to start the media.');else if (error.name !== 'AbortError') playbackFailure('Server video stream could not play. Try again.', my);
      }
    }
  }
  function endCount(my) {
    if (!isCurrent(my) || !counting) return;
    counting = false;
    setPauseUI(false);
    cancelCountdown?.();
    cancelCountdown = null;
    clock.finishCountdown();
    ovShow();
    if (fbPend) {
      const f = fbPend;
      fbPend = null;
      fbFrame(f[0], f[1]);
      return;
    }
    if (media) playMedia();else if (mode === 'yt' && yt && ytOk) {
      yt.playVideo();
    }
  }
  function fbFrame(id, it) {
    mode = 'clk';
    if (counting) {
      fbPend = [id, it];
      return;
    }
    output.stage({
      stageMode: 'media'
    });
    youtube.fallback(id, it);
    clock.start();
    if (paused || lifetime.suspended) clock.pause();
    msg('YouTube API could not load: Pause is unavailable and lyric timing is approximate.');
  }
  function playbackFailure(text, my) {
    if (!isCurrent(my)) return;
    msg(text + ' Open it on YouTube to check.');
    scheduleSkip(my);
  }
  function scheduleSkip(my) {
    if (!options().skip || cancelFailure || !isCurrent(my)) return;
    cancelFailure = track.timeout(() => {
      cancelFailure = null;
      if (isCurrent(my)) advance();
    }, 1500);
  }
  async function startServerVideo(id, it, my) {
    if (!isCurrent(my) || mediaLookup) return;
    const controller = new AbortController();
    const cancelLookupTimeout = track.timeout(() => controller.abort(new Error('Media lookup timed out.')), 55000);
    mediaLookup = controller;
    let processingJob = null;
    refreshPitch();
    msg('Embedded playback is unavailable. Trying server playback…');
    try {
      if (!isCurrent(my)) return;
      const data = await lookup(id, AbortSignal.any([controller.signal, track.signal]));
      if (!isCurrent(my)) return;
      callbacks.title?.(it, data.title);
      const source = new URL(data.url, origin);
      if (source.origin !== origin || source.pathname !== '/__youtube/media') throw Error('Invalid video stream.');
      source.searchParams.set('start', String(it.s || 0));
      const el = mediaAdapter.create(source.href, {
        volume: options().volume
      });
      it.mediaDuration = Math.max(0, data.duration - (it.s || 0));
      dur = it.e != null ? it.e - (it.s || 0) : it.mediaDuration;
      mediaStart = 0;
      if (yt) {
        try {
          yt.destroy();
        } catch (_) {}
        yt = null;
      }
      ytOk = false;
      output.stage({
        stageMode: 'media'
      });
      mediaAdapter.mount(el);
      media = el;
      mode = 'media';
      track.listen(el, 'play', () => {
        if (isCurrent(my)) setPauseUI(false);
      });
      track.listen(el, 'pause', () => {
        if (isCurrent(my) && !counting) setPauseUI(true);
      });
      track.listen(el, 'seeked', () => {
        if (isCurrent(my)) {
          clock.seek();
          void pitch.flush();
          updatePlaybackState();
        }
      });
      track.listen(el, 'ended', () => {
        if (!isCurrent(my)) return;
        if (elapsed() + 3 < it.mediaDuration && (it.e == null || elapsed() + 3 < dur)) playbackFailure('Server video stream was interrupted.', my);else finishMedia(my);
      });
      track.listen(el, 'error', () => playbackFailure('Server video stream could not play. Try again.', my));
      if (it.pitch && !tabAudio.active && !lifetime.suspended) {
        processingJob = ++pitchJob;
        pitchBusy = true;
        refreshPitch();
        await pitch.attach(el, it.pitch, () => isPitchCurrent(my, processingJob) && media === el && !tabAudio.active);
        if (!isPitchCurrent(my, processingJob)) return;
      }
      if (!isCurrent(my)) return;
      if (tabAudio.active && pitch.element === el) await pitch.set(0);
      pitchBusy = false;
      el.controls = true;
      pitchMessage = it.pitch ? 'Key applied. Saved for this song.' : 'Original key.';
      tabAudio.sync();
      refreshPitch('');
      clock.lyricsChanged();
      ovShow();
      msg('Playing video through the server.');
      if (!counting && !paused) playMedia();
    } catch (error) {
      if (isCurrent(my) && !track.signal.aborted && (processingJob === null || isPitchCurrent(my, processingJob))) {
        playbackFailure(error.message, my);
      }
    } finally {
      cancelLookupTimeout();
      if (mediaLookup === controller) mediaLookup = null;
      if (isCurrent(my) && (processingJob === null || processingJob === pitchJob)) {
        pitchBusy = false;
        refreshPitch(pitchStatusState);
      }
    }
  }
  function finishMedia(my) {
    cancelFinish?.();
    cancelFinish = track.timeout(() => {
      cancelFinish = null;
      if (isCurrent(my) && media?.ended) advance();
    }, Math.ceil((tabAudio.active ? tabAudio.delay : pitch.delay) * 1000));
  }
  async function prepareMedia(el, it, my) {
    if (!isCurrent(my) || lifetime.suspended) return;
    const job = ++pitchJob;
    if (!it.pitch || tabAudio.active) {
      tabAudio.sync();
      if (!counting && !paused) playMedia();
      return;
    }
    pitchBusy = true;
    el.controls = false;
    pitchMessage = 'Preparing key-shifted audio…';
    refreshPitch();
    try {
      await pitch.attach(el, it.pitch, () => isPitchCurrent(my, job) && media === el && !tabAudio.active);
      if (!isPitchCurrent(my, job)) return;
      if (tabAudio.active && pitch.element === el) await pitch.set(0);
      pitchMessage = 'Key applied. Saved for this song.';
      refreshPitch('');
    } catch (error) {
      if (!isPitchCurrent(my, job)) return;
      it.pitch = 0;
      callbacks.persist?.(currentSong);
      pitchMessage = error.message;
      msg(pitchMessage);
      refreshPitch('error');
    } finally {
      if (isPitchCurrent(my, job)) {
        el.controls = true;
        pitchBusy = false;
        refreshPitch(pitchStatusState);
        if (!counting && !paused) playMedia();
      }
    }
  }
  function startTabAudio() {
    if (lifetime.disposed || lifetime.suspended) return;
    // A directly processed media element must feed original sound into capture.
    if (pitch.element) void pitch.set(0);
    tabAudio.open();
  }
  async function changeKey(value) {
    const it = currentSong,
      my = tok;
    if (!it || it.mc || pitchBusy || mediaLookup || lifetime.suspended || lifetime.disposed) return;
    const key = clampSongPitch(value);
    if (key === clampSongPitch(it.pitch)) return;
    const before = clampSongPitch(it.pitch);
    it.pitch = key;
    callbacks.persist?.(currentSong);
    callbacks.render?.();
    callbacks.keyChanged?.(key);
    if (tabAudio.active) {
      tabAudio.sync();
      pitchMessage = key ? 'Key applied. Saved for this song.' : 'Original key.';
      refreshPitch('');
      return;
    }
    if (mode === 'yt' || mode === 'clk' && yid(it.url)) {
      if (!key) {
        pitchMessage = 'Original key.';
        refreshPitch('');
        return;
      }
      startTabAudio();
      return;
    }
    if (!media) {
      it.pitch = before;
      callbacks.persist?.(currentSong);
      pitchMessage = 'This source cannot change key. Use YouTube or a media link.';
      refreshPitch('error');
      return;
    }
    pitchBusy = true;
    const job = ++pitchJob;
    pitchMessage = 'Preparing key-shifted audio…';
    refreshPitch();
    try {
      if (pitch.element !== media) {
        if (key) await pitch.attach(media, key, () => isPitchCurrent(my, job) && currentSong === it && !tabAudio.active);
      } else await pitch.set(key);
      if (!isPitchCurrent(my, job)) return;
      if (tabAudio.active && pitch.element) await pitch.set(0);
      clock.lyricsChanged();
      pitchMessage = key ? 'Key applied. Saved for this song.' : 'Original key.';
      refreshPitch('');
    } catch (error) {
      if (!isPitchCurrent(my, job)) return;
      it.pitch = pitch.key;
      callbacks.persist?.(currentSong);
      pitchMessage = error.message;
      refreshPitch('error');
      msg(pitchMessage);
    } finally {
      if (isPitchCurrent(my, job)) {
        pitchBusy = false;
        callbacks.render?.();
        refreshPitch(pitchStatusState);
      }
    }
  }
  function startYT(id, it, my) {
    output.stage({
      stageMode: 'media'
    });
    const mount = youtube.mount();
    youtube.ready(track.signal).then(ok => {
      if (!isCurrent(my)) return;
      if (!ok) {
        fbFrame(id, it);
        return;
      }
      const pv = {
        origin: origin,
        autoplay: counting || paused ? 0 : 1,
        start: Math.floor(it.s || 0),
        playsinline: 1,
        rel: 0
      };
      if (it.e != null) pv.end = Math.ceil(it.e);
      yt = youtube.create(mount, {
        videoId: id,
        playerVars: pv,
        events: {
          onReady: e => {
            if (!isCurrent(my)) return;
            ytOk = true;
            const length = e.target.getDuration();
            if (length > 0) {
              it.mediaDuration = Math.max(0, length - (it.s || 0));
              dur = it.e != null ? it.e - (it.s || 0) : it.mediaDuration;
            }
            tabAudio.sync();
            pitchMessage = it.pitch ? tabAudio.active ? 'Key applied. Saved for this song.' : 'Start Tab Audio to apply the saved key. The player is using its original sound.' : 'Original key.';
            refreshPitch('');
            e.target.setVolume(options().volume);
            if (!counting && !paused && !lifetime.suspended) e.target.playVideo();
          },
          onStateChange: e => {
            if (!isCurrent(my) || counting) return;
            if (lifetime.suspended) {
              if (e.data === 1) e.target?.pauseVideo();
              return;
            }
            if (e.data === 0) {
              if (tabAudio.active) {
                cancelFinish?.();
                cancelFinish = track.timeout(() => {
                  cancelFinish = null;
                  if (isCurrent(my) && yt?.getPlayerState() === 0) advance();
                }, Math.ceil(tabAudio.delay * 1000));
              } else advance();
            } else if (e.data === 1) {
              callbacks.claim?.();
              setPauseUI(false);
            } else if (e.data === 2) setPauseUI(true);
          },
          onError: e => {
            if (!isCurrent(my)) return;
            const code = Number(e?.data);
            if ([5, 101, 150].includes(code)) {
              startServerVideo(id, it, my);
              return;
            }
            const reason = {
              2: 'Invalid video ID or URL.',
              100: 'Video is unavailable, private, or has been removed.',
              153: 'YouTube did not receive a referrer/client identity. Open Manokara from localhost or HTTPS, not file://.'
            }[code] || 'YouTube could not play this video.';
            playbackFailure(`YouTube error ${code || 'unknown'}: ${reason}`, my);
          }
        }
      });
    }).catch(() => {
      if (isCurrent(my)) fbFrame(id, it);
    });
  }
  function elapsed() {
    const it = currentSong;
    if (!it || counting) return 0;
    if (mode === 'media') return media ? media.currentTime - mediaStart : 0;
    if (mode === 'yt') {
      if (!yt || !ytOk) return 0;
      try {
        return yt.getCurrentTime() - (it.s || 0);
      } catch (e) {
        return 0;
      }
    }
    return clock.elapsed();
  }
  function audibleElapsed() {
    return audiblePosition(elapsed(), {
      rate: mediaRate(),
      delay: tabAudio.active ? tabAudio.delay : mode === 'media' ? pitch.delay : 0
    });
  }
  function togglePause() {
    if (!currentSong || lifetime.disposed || lifetime.suspended) return;
    callbacks.claim?.();
    const it = currentSong;
    if (counting) {
      setPauseUI(!paused);
      return;
    }
    if (mode === 'media') {
      media && (media.paused ? playMedia() : media.pause());
    } else if (mode === 'yt') {
      if (!ytOk) return;
      const st = yt.getPlayerState();
      st === 1 || st === 3 ? yt.pauseVideo() : yt.playVideo();
    } else if (mode === 'clk') {
      if (clock.running) {
        clock.pause();
        setPauseUI(true);
      } else {
        clock.resume();
        setPauseUI(false);
      }
    } else msg('Pause is not available for this link.');
  }
  function load(song, {
    countdown = 0
  } = {}) {
    if (lifetime.disposed || lifetime.suspended || !song) return false;
    start();
    clearAll();
    currentSong = song;
    pitchMessage = song?.pitch ? 'Preparing key-shifted audio…' : 'Original key.';
    refreshPitch('');
    const it = song,
      my = tok;
    const id = it.mc ? null : yid(it.url),
      direct = !it.mc && !id && /\.(mp4|mp3|wav|ogg|m4a|aac|flac)(\?|$)/i.test(it.url),
      seconds = id || direct ? Math.max(0, Math.min(30, Math.floor(Number(countdown) || 0))) : 0;
    if (seconds > 0) {
      counting = true;
      clock.countdown(seconds);
    }
    dur = it.mc ? it.dur : it.e != null ? it.e - (it.s || 0) : null;
    if (it.mc) {
      mode = 'clk';
      clock.start();
      output.stage?.({
        stageMode: 'mc',
        stageTitle: uiText('MC break'),
        stageNote: it.memo || uiText('Take a moment between songs.')
      });
    } else if (id) {
      mode = 'yt';
      output.stage?.({
        stageMode: 'media',
        youtubeUrl: 'https://www.youtube.com/watch?v=' + id + '&t=' + Math.floor(it.s || 0)
      });
      startYT(id, it, my);
    } else if (direct) {
      mode = 'media';
      mediaStart = it.s || 0;
      output.stage?.({
        stageMode: 'media'
      });
      const element = mediaAdapter.create(it.url, {
        volume: options().volume,
        crossOrigin: !!it.pitch && !tabAudio.active && new URL(it.url).origin !== origin
      });
      media = element;
      track.listen(element, 'loadedmetadata', () => {
        it.mediaDuration = Number.isFinite(element.duration) ? Math.max(0, element.duration - (it.s || 0)) : undefined;
        element.currentTime = it.s || 0;
        if (dur == null && it.mediaDuration != null) dur = it.mediaDuration;
      });
      track.listen(element, 'seeked', () => {
        clock.seek();
        void pitch.flush();
        updatePlaybackState();
      });
      track.listen(element, 'ended', () => finishMedia(my));
      track.listen(element, 'play', () => {
        if (pitch.element === element) void pitch.resume().catch(() => {});
        setPauseUI(false);
      });
      track.listen(element, 'pause', () => {
        if (!counting) setPauseUI(true);
      });
      track.listen(element, 'error', () => {
        if (it.pitch && element.crossOrigin === 'anonymous') {
          it.pitch = 0;
          callbacks.persist?.(it);
          if (callbacks.replay?.(it)) {
            msg('This media link did not allow pitch processing. Playing the original key.');
            return;
          }
        }
        msg('Could not load this media.');
        scheduleSkip(my);
      });
      mediaAdapter.mount(element);
      void prepareMedia(element, it, my);
    } else {
      mode = 'clk';
      clock.start();
      output.stage?.({
        stageMode: 'external',
        stageTitle: uiText('Open this link to play.'),
        stageNote: uiText('This media opens in a new tab. Your lyric clock is running here.'),
        stageUrl: it.url,
        stageLinkLabel: uiText('Open media')
      });
    }
    if (counting) {
      ovShow();
      setPlayerTime(uiText('Starting in ') + seconds + ' s');
      cancelCountdown = track.interval(() => {
        if (clock.remaining() <= 0) {
          endCount(my);
          return;
        }
        ovShow();
        setPlayerTime(uiText('Starting in ') + Math.ceil(clock.remaining()) + ' s');
      }, 100);
    }
    track.interval(() => {
      if (mode === 'yt' && ytOk) {
        const sample = {
          now: now(),
          position: elapsed(),
          playing: mediaPlaying(),
          rate: mediaRate()
        };
        if (isTimeDiscontinuity(playbackSample, sample)) clock.seek();
        playbackSample = sample;
        if (dur == null) {
          let length = 0;
          try {
            length = yt.getDuration();
          } catch (_) {}
          if (length > 0) {
            it.mediaDuration = Math.max(0, length - (it.s || 0));
            dur = it.e != null ? it.e - (it.s || 0) : it.mediaDuration;
          }
        }
      }
      updatePlaybackState();
      if (counting) return;
      if (dur != null && !paused && audibleElapsed() >= dur) {
        advance();
        return;
      }
      setPlayerTime(fmt(elapsed()) + ' / ' + (dur != null ? fmt(dur) : '--:--'));
    }, 250);
    notify();
    return true;
  }
  function start() {
    if (started || lifetime.disposed) return;
    started = true;
    notify();
  }
  function stop() {
    if (lifetime.disposed) return;
    clearAll();
    pitchMessage = 'Play a song to change its key.';
    refreshPitch('');
  }
  function suspend() {
    if (lifetime.disposed || lifetime.suspended) return;
    resumePlayback = !!currentSong && !paused;
    if (counting || mode === 'clk') clock.pause();
    paused = !!currentSong;
    playbackSample = null;
    pitchJob++;
    pitchBusy = false;
    track.suspend();
    lifetime.suspend();
    tabAudio.suspend?.();
    pitch.suspend?.();
    try {
      media?.pause();
      if (ytOk) yt?.pauseVideo();
    } catch (_) {}
  }
  function resume() {
    if (lifetime.disposed || !lifetime.suspended) return;
    lifetime.resume();
    track.resume();
    tabAudio.resume?.();
    if (resumePlayback && currentSong) {
      if (!counting) paused = false;
      if (counting) setPauseUI(false);else if (mode === 'clk') {
        clock.resume();
        setPauseUI(false);
      } else if (mode === 'media' && media) {
        if (media.readyState >= 1 && media.currentTime < mediaStart) media.currentTime = mediaStart;
        if (dur == null && Number.isFinite(media.duration)) {
          currentSong.mediaDuration = Math.max(0, media.duration - mediaStart);
          dur = currentSong.mediaDuration;
        }
        paused = false;
        void prepareMedia(media, currentSong, tok);
      } else if (mode === 'yt' && ytOk) yt.playVideo();
    }
    resumePlayback = false;
    notify();
  }
  function dispose({
    preserveCapture = false
  } = {}) {
    if (lifetime.disposed) return;
    clearAll();
    track.dispose();
    lifetime.dispose();
    started = false;
    tabAudio.dispose({
      preserveCapture
    });
    pitch.dispose?.();
    subscribers.clear();
  }
  return {
    start,
    load,
    stop,
    suspend,
    resume,
    dispose,
    changeKey,
    startTabAudio,
    play() {
      if (!currentSong || lifetime.disposed || lifetime.suspended) return;
      if (counting) endCount(tok);else if (paused) togglePause();
    },
    togglePause,
    stopTabAudio: () => tabAudio.stop(),
    setVolume(value) {
      if (lifetime.disposed) return;
      if (media) media.volume = Math.max(0, Math.min(100, Number(value) || 0)) / 100;
      if (yt && ytOk) yt.setVolume(value);
      notify();
    },
    refreshSongTiming() {
      if (currentSong) {
        dur = currentSong.mc ? currentSong.dur : currentSong.e != null ? currentSong.e - (currentSong.s || 0) : currentSong.mediaDuration ?? null;
        clock.lyricsChanged();
        notify();
      }
    },
    invalidateLyrics() {
      if (!lifetime.disposed) clock.lyricsChanged();
    },
    elapsed,
    audibleElapsed,
    mediaPlaying,
    getSnapshot: snapshot,
    subscribe(listener) {
      if (lifetime.disposed) return () => {};
      subscribers.add(listener);
      listener(snapshot());
      return () => subscribers.delete(listener);
    },
    get state() {
      return snapshot();
    },
    get appliedKey() {
      return pitch.key;
    }
  };
}
