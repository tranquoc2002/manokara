import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { appRuntime } from '../../app/feature-runtime.mjs';
import { useFeature, useSongDraft } from '../../shared/use-feature-store.js';
import { lyricFonts } from '../../manokara-fonts.js';
const h = React.createElement;
export function StageLyricsPreview({
  message,
  text
}) {
  const disconnect = useRef(null);
  useEffect(() => () => disconnect.current?.(), []);
  const loaded = event => {
    disconnect.current?.();
    // Capture the parent feed's cleanup before the iframe document is removed.
    // Removing this view releases the subscriber as well as the renderer.
    try {
      disconnect.current = event.currentTarget.contentWindow.ManokaraOutput?.disconnectPreview;
    } catch {
      disconnect.current = null;
    }
  };
  return <div id="stageLyricsPreview" className="stage-lyric-preview" role="region" aria-label={text('Lyrics preview')}>
    <iframe id="stageLyricsFrame" src="./manokara-obs.html?preview=stage" title={text('Current song lyric preview')} allow="autoplay" onLoad={loaded} />
    {message && <div className="stage-preview-message" role="status"><svg className="icon" aria-hidden="true"><use href="./manokara-icons.svg#music-notes" /></svg><p>{text(message)}</p></div>}
  </div>;
}
export function PlayerPanel({
  state
}) {
  const controls = useFeature('outputValues');
  const [stageView, setStageView] = useState('media');
  const [karaokeVisible, setKaraokeVisible] = useState(true);
  useEffect(() => {
    const changed = event => setKaraokeVisible(event.detail === 'karaoke');
    window.addEventListener('manokara:mainviewchange', changed);
    return () => window.removeEventListener('manokara:mainviewchange', changed);
  }, []);
  const previewSelected = stageView === 'lyrics';
  const showPreview = previewSelected && karaokeVisible;
  const text = value => window.ManokaraI18n?.text(value) || value;
  const icon = name => <svg className="icon" aria-hidden="true"><use href={'./manokara-icons.svg#' + name} /></svg>;
  return <section className="card" id="player" aria-label="Karaoke player">
    <div className="player-head">
      <span className="eyebrow">Your stage</span>
      <div className="stage-view-switch" role="group" aria-label={text('Stage view')}>
        <button id="stageMediaButton" type="button" aria-pressed={!previewSelected} aria-controls="stageMediaRoot" onClick={() => setStageView('media')}>YouTube</button>
        <button id="stageLyricsButton" type="button" aria-pressed={previewSelected} aria-controls="stageLyricsPreview" onClick={() => setStageView('lyrics')}>{text('Lyrics preview')}</button>
      </div>
      <span className="playback-state" id="playbackState" data-state={state.playbackState}>{state.playbackLabel}</span>
    </div>
    <div id="stage">
      <div id="stageMediaRoot" inert={showPreview ? '' : undefined} aria-hidden={showPreview || undefined} />
      {showPreview && <StageLyricsPreview message={state.previewMessage} text={text} />}
      {!showPreview && state.stageMode === 'empty' && <div className="stage-empty">
        <div className="stage-glyph">{icon('waveform')}</div>
        <h2>{text('Your next song starts here.')}</h2>
        <p>{text('Add a karaoke link, find your lyrics,')}<br />{text('and let your voice take the lead.')}</p>
        <button className="stage-add" type="button" onClick={() => appRuntime.commands.actions('setlist')?.openEditor()}>{icon('plus')}{text('Add your first song')}</button>
      </div>}
      {!showPreview && state.stageMode === 'mc' && <div className="stage-empty mc-stage">
        <div className="stage-glyph">{icon('microphone-stage')}</div><h2>{state.stageTitle}</h2><p>{state.stageNote}</p>
      </div>}
      {!showPreview && state.stageMode === 'external' && <div className="stage-empty">
        <div className="stage-glyph">{icon('link')}</div><h2>{state.stageTitle}</h2><p>{state.stageNote}</p>
        <a className="stage-add" href={state.stageUrl} target="_blank" rel="noopener">{state.stageLinkLabel} {icon('arrow-up-right')}</a>
      </div>}
      {!showPreview && state.countdownVisible && <div id="ov">
        <b>{state.countdownTitle}</b><span>{state.countdownValue}</span><small>{state.countdownHint}</small>
      </div>}
    </div>
    <div className="now-row">
      <b id="now">{state.now}</b><span className="mu" id="time">{state.time}</span>
      <a id="yt" href={state.youtubeUrl || '#'} target="_blank" rel="noopener" hidden={!state.youtubeUrl}><span>Open on YouTube</span>{icon('arrow-up-right')}</a>
    </div>
    <div className="transport" id="transportReactRoot" />
    <div className="player-options">
      <div className="row">
        <label className="inline-check"><input type="checkbox" id="skip" checked={controls.skip} onChange={event => {
            appRuntime.controls.set('skip', event.currentTarget.checked);
          }} />Skip unavailable songs</label>
        <label className="countdown-control">Countdown<input type="number" id="cdn" min="0" max="30" aria-label="Countdown seconds" value={controls.cdn} onChange={event => {
            appRuntime.controls.set('cdn', event.currentTarget.value);
            (() => appRuntime.commands.actions('obs')?.settingChanged('cdn'))(event);
          }} />s</label>
      </div>
      <div id="msg" role="status" aria-live="polite">{state.message}</div>
    </div>
  </section>;
}
