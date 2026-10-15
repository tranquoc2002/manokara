import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { appRuntime } from '../../app/feature-runtime.mjs';
import { useFeature, useSongDraft } from '../../shared/use-feature-store.js';
import { lyricFonts } from '../../manokara-fonts.js';
const h = React.createElement;
export function OBSSettings({
  state
}) {
  const icon = name => <svg className="icon" aria-hidden="true"><use href={`./manokara-icons.svg#${name}`} /></svg>;
  return <section className="tabpanel" id="panel-green" role="region" aria-label="OBS output">    <div className="output-connect">      <div><h2>Take your lyrics live.</h2><p>Your own output for OBS or a second screen.</p></div>      <button className="s" id="lwin" type="button" onClick={() => appRuntime.commands.actions('obs')?.openLyricsWindow()}>{icon('arrow-up-right')}Open lyrics window</button>    </div>    <label className="field"><span>OBS Browser Source URL</span><div className="obs-link"><input id="obsurl" readOnly value={state.obsUrl} aria-label="OBS Browser Source URL" /><button id="copyobs" type="button" onClick={() => appRuntime.commands.actions('obs')?.copyUrl()}>{icon('link')}Copy link</button></div></label>    <div className="obs-note"><small>Paste this into an OBS Browser Source. Keep it active.</small><button className="ghost" id="rotateobs" type="button" title="Revoke the previous OBS link and create a new one" onClick={() => appRuntime.commands.actions('obs')?.rotateLink()}>Replace link</button></div>    <button className="s" id="editLyricLayout" type="button">Edit lyric layout</button>    <div id="obsLyricSettingsReactRoot" />  </section>;
}
export function SongStyleSettings({
  state
}) {
  const text = value => window.ManokaraI18n?.text(value) || value;
  return <section className="song-style-settings" aria-label={text('Song animation settings')}>
    <label className="inline-check"><input id="rememberSongStyle" type="checkbox" checked={state.songStyleSaved} disabled={!state.songStyleEnabled} onChange={event => appRuntime.commands.actions('obs')?.rememberSongStyle(event.target.checked)} />
      {text('Save animation settings for this song')}</label>
    <small id="songStyleStatus" role="status">{text(state.songStyleEnabled ? state.songStyleSaved ? 'Animation changes save automatically for this song.' : 'Using the shared animation settings.' : 'Select a song to save its animation settings.')}</small>
    {state.songStyleEnabled && <small className="song-style-title" title={state.songStyleTitle}>{state.songStyleTitle}</small>}
  </section>;
}
export function OBSAppearanceSettings({
  state
}) {
  const controls = useFeature('outputValues');
  const icon = name => <svg className="icon" aria-hidden="true"><use href={`./manokara-icons.svg#${name}`} /></svg>;
  const text = value => window.ManokaraI18n?.text(value) || value;
  const change = event => appRuntime.commands.actions('obs')?.settingChanged(event.currentTarget.id);
  return <> <section className="section-divider" aria-label={text("Lyric animation")}>      <h3>Lyric animation</h3><SongStyleSettings state={state} />      <div className="settings-grid">        <label className="field wide"><span>Visual style</span><select id="lfx" value={controls.lfx} onChange={event => {
            appRuntime.controls.set('lfx', event.currentTarget.value);
            change(event);
          }}>          <option value="jizura">JIZURA Auto · full effects</option><option value="karaoke-classic">Classic karaoke · two-line sweep</option>          <optgroup label="Folia Major · original visualizers">            <option value="folia-classic">Folia · Luminous</option><option value="folia-cadenza">Folia · Mindscape</option><option value="folia-partita">Folia · Cloud Steps</option><option value="folia-fume">Folia · Fume</option><option value="folia-tilt">Folia · Tilt</option><option value="folia-claddagh">Folia · Claddagh</option><option value="folia-monet">Folia · Monet</option><option value="folia-diorama">Folia · Diorama</option><option value="folia-pendolo">Folia · Pendolo</option><option value="folia-sonnet">Folia · Sonnet</option><option value="folia-tempera">Folia · Tempera</option><option value="folia-lumiere">Folia · Lumiere</option>          </optgroup>          <option value="tempera">Tempera · ink</option><option value="sonnet">Sonnet · kinetic focus</option><option value="lumiere">Lumiere · light reveal</option><option value="hanabi">Hanabi · character burst</option><option value="clean">Clean fade</option><option value="word-pop">Word pop</option><option value="neon">Neon sweep</option><option value="glitch">Glitch hit</option>        </select></label>        <label className="field"><span>Background</span><select id="lbgmode" value={controls.lbgmode} onChange={event => {
            appRuntime.controls.set('lbgmode', event.currentTarget.value);
            change(event);
          }}><option value="transparent">Transparent</option><option value="green">Green screen</option></select></label>        <label className="field"><span>Color palette</span><select id="ltheme" value={controls.ltheme} onChange={event => {
            appRuntime.controls.set('ltheme', event.currentTarget.value);
            change(event);
          }}><option value="effect">Effect palette</option><option value="white">White</option><option value="cyan">Ice cyan</option><option value="rose">Rose</option><option value="amber">Amber</option><option value="violet">Violet</option><option value="mint">Mint</option></select></label>        <label className="field"><span>Text size</span><div className="settings-inline"><input type="range" id="lsz" min="24" max="160" aria-label="Output text size" disabled={state.jizura} value={controls.lsz} onChange={event => {
              appRuntime.controls.set('lsz', event.currentTarget.value);
              change(event);
            }} /></div></label>        <label className="field" hidden={state.classic}><span>Text color</span><input type="color" id="lcol" disabled={state.jizura} value={controls.lcol} onChange={event => {
            appRuntime.controls.set('lcol', event.currentTarget.value);
            change(event);
          }} /></label>        <label id="classicColorField" className="field" hidden={!state.classic}><span>Sung highlight</span><input type="color" id="lclassiccolor" value={controls.lclassiccolor} onChange={event => {
            appRuntime.controls.set('lclassiccolor', event.currentTarget.value);
            change(event);
          }} /></label>      </div>      <small id="classicHint" hidden={!state.classic}>Two alternating lines, white words and a sung highlight. Enhanced LRC follows word timestamps; regular LRC estimates the sweep. Choose Sung highlight or a color palette for the sweep (blue by default).</small>      <div className="row spaced"><button className="s" id="lrandom" type="button" title={state.randomTitle} disabled={!state.jizura} onClick={() => appRuntime.commands.actions('obs')?.randomizeJizura()}>{icon('shuffle')}Shuffle JIZURA style</button></div>      <div className="output-reaction"><button className="s" id="audioReaction" type="button">Enable audio reaction</button><small id="audioStatus">Share the karaoke tab with tab audio enabled. No recording.</small></div>    </section>    <section className="section-divider" aria-label="Output typography">      <h3>Type &amp; layout</h3>      <div className="type-settings">        <label className="field"><span>Font family</span><select id="lfont" disabled={state.jizura} value={controls.lfont} onChange={event => {
            appRuntime.controls.set('lfont', event.currentTarget.value);
            change(event);
          }}>{lyricFonts.map(([name], index) => <option key={index} value={index}>{text(name)}</option>)}</select></label>        <label className="field"><span>Custom font</span><input id="lfc" maxLength="120" placeholder="An installed or Google font" disabled={state.jizura} value={controls.lfc} onChange={event => {
            appRuntime.controls.set('lfc', event.currentTarget.value);
            change(event);
          }} /></label>        <label className="inline-check"><input type="checkbox" id="lbold" disabled={state.jizura} checked={controls.lbold} onChange={event => {
            appRuntime.controls.set('lbold', event.currentTarget.checked);
            change(event);
          }} />Bold lyrics</label>      </div>      <small className="setting-help">Fonts marked “online” load from Google Fonts. Installed fonts work locally.</small>      <div id="centerRow">        <div className="layout-options">          <div className="row">            <label className="inline-check"><input type="checkbox" id="lcenter" checked={controls.lcenter} onChange={event => {
                appRuntime.controls.set('lcenter', event.currentTarget.checked);
                change(event);
              }} />Keep centre free</label>            <label className="field"><span>Output frame</span><select id="lshape" value={controls.lshape} onChange={event => {
                appRuntime.controls.set('lshape', event.currentTarget.value);
                change(event);
              }}><option value="auto">Automatic</option><option value="wide">Landscape</option><option value="tall">Portrait</option></select></label>          </div>          <div className="cf-preview" id="cfpreview" data-shape={state.shape} style={{
            opacity: state.centerFree ? 1 : .42
          }} title={state.centerTitle}><span className="cf-free" /><i className="cf-line cf-a" /><i className="cf-line cf-b" /></div>        </div>        <small id="centerHint">{state.centerHint}</small>      </div>    </section>  </>;
}
