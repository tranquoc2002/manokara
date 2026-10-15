import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { appRuntime } from '../../app/feature-runtime.mjs';
import { useFeature, useSongDraft } from '../../shared/use-feature-store.js';
import { lyricFonts } from '../../manokara-fonts.js';
import { LYRIC_PROVIDERS, readLyricSources, safeLyricSourceUrl } from '../../services/lyric-search.mjs';
const h = React.createElement;
export function LyricSearchResults({ state, results, statuses = [] }) {
  const t = value => window.ManokaraI18n?.text(value) || value;
  return <div className="lyric-search-output" hidden={!state} data-no-i18n="">
    <ol id="lres" aria-label={t('Lyric search results')}>
      {state === 'results' ? results.length ? results.map((item, index) => <li key={`${item.title}-${index}`}>
        <button className="lyric-result-button" type="button" onClick={() => appRuntime.commands.actions('editor')?.selectLyric(index)}>
          <span className="lyric-result-copy"><span>{item.title}</span><small className={item.timed ? 'lyric-result-timed' : ''}>{item.kind}</small></span>
          <small>{item.duration}</small>
        </button>
        <div className="lyric-result-sources">{(item.sources || []).map((itemSource, sourceIndex) => <React.Fragment key={`${itemSource.label}-${sourceIndex}`}>
          {sourceIndex > 0 ? ' · ' : null}{itemSource.url ? <a href={itemSource.url} target="_blank" rel="noopener noreferrer">{itemSource.label} ↗</a> : itemSource.label}
        </React.Fragment>)}</div>
      </li>) : <li className="search-message">{t(statuses.length ? 'No lyrics returned. Some sources could not be reached.' : 'No results.')}</li> : state ? <li className="search-message" role="status">{state}</li> : null}
    </ol>
    {statuses.length > 0 ? <div className="lyric-source-notices" role="status">{statuses.map(itemSource => <small key={itemSource.id}>{itemSource.label}: {itemSource.message}</small>)}</div> : null}
  </div>;
}
export function SongEditorShell({
  view
}) {
  const draft = useSongDraft();
  const search = useFeature('lyricSearch');
  const providers = search.providers?.length ? search.providers : LYRIC_PROVIDERS;
  const sources = readLyricSources(draft.lyricSources);
  const t = value => window.ManokaraI18n?.text(value) || value;
  const icon = name => <svg className="icon" aria-hidden="true"><use href={`./manokara-icons.svg#${name}`} /></svg>;
  return <>    <div className="studio-dialog-head">      <div><span className="eyebrow">Manokara</span><h2 id="songDialogTitle">{view.title}</h2></div>      <button className="ghost icon-button" id="closeSongEditor" type="button" aria-label="Close song editor" onClick={() => document.getElementById('songEditorDialog')?.close()}>{icon('x')}</button>    </div>    <div id="songEditorMount">      <section className="tabpanel" id="panel-song" role="region" aria-labelledby="songDialogTitle">        <div className="panel-intro"><div><h2 id="ftitle">{view.title}</h2><p>A karaoke link, a few lyrics, and you're ready.</p></div></div>        <div className="field-grid">          <label className="field"><span>Karaoke link</span><input id="url" type="url" placeholder="Paste a YouTube or media URL" autoComplete="off" value={draft.url} onChange={event => {
              appRuntime.draft.set('url', event.currentTarget.value);
              (() => appRuntime.commands.actions('editor')?.urlChanged())(event);
            }} /></label>          <label className="field"><span>Song title</span><input id="ttl" maxLength="512" placeholder="Fetched automatically" autoComplete="off" value={draft.ttl} onChange={event => {
              appRuntime.draft.set('ttl', event.currentTarget.value);
            }} /></label>        </div>        <div className="clip-row">          <label className="field"><span>Start at</span><input id="st" placeholder="00:00" inputMode="decimal" value={draft.st} onChange={event => {
              appRuntime.draft.set('st', event.currentTarget.value);
            }} /></label>          <label className="field"><span>End at</span><input id="en" placeholder="Full song" inputMode="decimal" value={draft.en} onChange={event => {
              appRuntime.draft.set('en', event.currentTarget.value);
            }} /></label>          <small>Play the whole song or choose a section. End is optional.</small>        </div>        <section className="section-divider" aria-label="Song lyrics">          <h3>Bring the words along</h3>          <div className="search-row">
            <input id="lq" maxLength="200" aria-label="Search lyrics by song or artist" placeholder="Song or artist" value={draft.lq}
              onKeyDown={event => { if (event.key === 'Enter' && !event.nativeEvent.isComposing) { event.preventDefault(); appRuntime.commands.actions('editor')?.searchLyrics(); } }}
              onChange={event => { appRuntime.draft.set('lq', event.currentTarget.value); appRuntime.commands.actions('editor')?.clearLyricSearch(); }} />
            <button className="s" id="lsearch" type="button" aria-busy={search.busy || false} onClick={() => appRuntime.commands.actions('editor')?.searchLyrics()}>{icon('magnifying-glass')}Find lyrics</button>
            <button className="text-link" id="lyricsify" type="button" title="Search Lyricsify in a new browser tab">Lyricsify{icon('arrow-up-right')}</button>
          </div>
          <div className="lyric-source-controls" data-no-i18n="">
            <label htmlFor="lyricProvider">{t('Source')}<select id="lyricProvider" value={draft.lyricProvider} onChange={event => {
              appRuntime.draft.set('lyricProvider', event.currentTarget.value);
              appRuntime.commands.actions('editor')?.clearLyricSearch();
            }}><option value="auto">{t('All sources')}</option>{providers.map(itemSource => <option key={itemSource.id} value={itemSource.id} disabled={!itemSource.enabled}>{itemSource.label}{!itemSource.enabled ? ` · ${t(itemSource.reason === 'needs_key' ? 'Needs server API key' : 'Disabled on server')}` : ''}</option>)}</select></label>
            <small>{t('Timed lyrics first, regardless of source.')}</small>
          </div>
          <p id="lyricLoadStatus" className="lyric-load-status" role="status" aria-live="polite" hidden={!draft.lyricLoadStatus}>{draft.lyricLoadStatus}</p>
          <div id="lyricSearchResultsReactRoot" />
          {draft.lyricSourceLabel ? <p className="lyric-attribution" data-no-i18n="">{t('Lyrics source')}: {sources.length ? sources.map((itemSource, index) => <React.Fragment key={`${itemSource.id}-${index}`}>{index ? ' · ' : null}{itemSource.url ? <a href={itemSource.url} target="_blank" rel="noopener noreferrer">{itemSource.label} ↗</a> : itemSource.label}</React.Fragment>) : safeLyricSourceUrl(draft.lyricSourceUrl) ? <a href={safeLyricSourceUrl(draft.lyricSourceUrl)} target="_blank" rel="noopener noreferrer">{draft.lyricSourceLabel} ↗</a> : draft.lyricSourceLabel}{draft.lyricCopyright ? <small>{draft.lyricCopyright}</small> : null}</p> : null}
          <div id="lyricDraft">            <div className="editor-toolbar">              <button className="ghost" id="importLrc" type="button">{icon('upload-simple')}Import LRC / TTML</button>              <input id="lrcFile" type="file" accept=".lrc,.ttml" hidden />              <label>Encoding<select id="lrcEncoding" value={draft.lrcEncoding} onChange={event => {
                  appRuntime.draft.set('lrcEncoding', event.currentTarget.value);
                }}>                <option value="auto">Auto · UTF-8 / Shift_JIS</option><option value="utf-8">UTF-8</option><option value="shift_jis">Shift_JIS</option><option value="utf-16le">UTF-16LE</option>              </select></label>            </div>            <textarea id="llrc" aria-label="Original lyrics LRC" maxLength="200000" placeholder={'[00:12.00] Your first line…\n[00:16.50] Your next line…\n\nPaste lyrics or drop an .lrc or .ttml file here.'} value={draft.llrc} onChange={event => {
              appRuntime.draft.set('llrc', event.currentTarget.value);
              (() => appRuntime.commands.actions('editor')?.lyricsChanged())(event);
            }} />            <div className="romaji-row">              <button className="s" id="romanize" type="button" disabled={draft.romanizeBusy || draft.importBusy}>Create Romaji</button>              <label>Display<select id="lyricMode" value={draft.lyricMode} onChange={event => {
                  appRuntime.draft.set('lyricMode', event.currentTarget.value);
                }}><option value="original">Original lyrics</option><option value="romaji" disabled={!draft.romajiAvailable}>Romaji</option><option value="both" disabled={!draft.romajiAvailable}>Original + Romaji</option></select></label>            </div>            <details id="romajiDetails" open={draft.romajiOpen} onToggle={event => appRuntime.draft.set('romajiOpen', event.currentTarget.open)}>              <summary>Review / edit Romaji</summary>              <small>Edit readings only. Keep timestamps, metadata and blank lines unchanged. In dual mode, Romaji appears below the original words.</small>              <textarea id="romajiLrc" aria-label="Romaji lyrics LRC" maxLength="200000" spellCheck={false} value={draft.romajiLrc} onChange={event => {
                appRuntime.draft.set('romajiLrc', event.currentTarget.value);
              }} />              <button className="s" id="exportRomaji" type="button">{icon('download-simple')}Download Romaji LRC</button>            </details>            <small id="lyricsStatus" role="status" aria-live="polite" className={draft.lyricsError ? 'error' : ''}>{draft.lyricsStatus}</small>          </div>        </section>        <div className="form-actions">          <label className="pitch-song-field">Song key<input id="songKey" type="number" min="-12" max="12" step="1" aria-label="Saved song key in semitones" value={draft.songKey} onChange={event => {
              appRuntime.draft.set('songKey', event.currentTarget.value);
            }} /></label>          <label>Lyric offset<input type="number" id="loff" step="0.1" aria-label="Lyric offset in seconds" value={draft.loff} onChange={event => {
              appRuntime.draft.set('loff', event.currentTarget.value);
            }} />s</label>          <label className="inline-check library-save-check"><input type="checkbox" id="saveToLibrary" checked={draft.saveToLibrary} onChange={event => {
              appRuntime.draft.set('saveToLibrary', event.currentTarget.checked);
            }} />Keep in My songs</label>          <div className="row"><button className="ghost" id="cancel" type="button" hidden={!view.editing} onClick={() => appRuntime.commands.actions('editor')?.cancel()}>Cancel edit</button><button id="add" type="button" onClick={() => appRuntime.commands.actions('editor')?.save()} disabled={draft.saving || draft.importBusy}>{icon(view.editing ? 'check' : 'plus')}<span>{view.saveLabel}</span></button></div>        </div>        <details id="mcDetails">          <summary>Add an MC break</summary>          <div className="row"><input id="mcm" maxLength="4096" placeholder="Your note or announcement" aria-label="MC break note" value={draft.mcm} onChange={event => {
              appRuntime.draft.set('mcm', event.currentTarget.value);
            }} /><input id="mcd" placeholder="00:30" aria-label="MC break duration" value={draft.mcd} onChange={event => {
              appRuntime.draft.set('mcd', event.currentTarget.value);
            }} /><button className="s" id="addmc" type="button" onClick={() => appRuntime.commands.actions('editor')?.addBreak()}>{icon('plus')}Add break</button></div>        </details>      </section>    </div>  </>;
}
