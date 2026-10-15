import { appRuntime } from './app/feature-runtime.mjs';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { persistence } from './services/persistence.mjs';
const h = React.createElement;
function YoutubeResults({
  results,
  active,
  onSelect
}) {
  const duration = value => {
    if (!Number.isFinite(value) || value <= 0) return '';
    const seconds = Math.floor(value),
      hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60,
      remainder = seconds % 60;
    return `${hours ? `${hours}:` : ''}${hours ? String(minutes).padStart(2, '0') : minutes}:${String(remainder).padStart(2, '0')}`;
  };
  return h(React.Fragment, null, results.map((video, index) => {
    const length = duration(video.duration);
    return h('div', {
      key: video.id,
      className: 'youtube-result',
      id: `youtube-result-${index}`,
      tabIndex: -1,
      role: 'option',
      'aria-selected': index === active,
      'aria-label': video.title + (video.channel ? ` — ${video.channel}` : '') + (length ? ` · ${length}` : ''),
      onMouseDown: event => {
        if (event.button === 0) event.preventDefault();
      },
      onClick: () => onSelect(index)
    }, h('div', {
      className: 'youtube-thumbnail'
    }, h('img', {
      src: `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`,
      alt: '',
      loading: 'lazy',
      decoding: 'async',
      referrerPolicy: 'no-referrer'
    }), length && h('span', null, length)), h('div', {
      className: 'youtube-result-copy'
    }, h('strong', null, video.title), h('small', null, video.channel || 'YouTube')), h('span', {
      className: 'youtube-select',
      'aria-hidden': 'true'
    }, '↗'));
  }));
}
function YoutubeSearch() {
  const [query, setQuery] = useState('');
  const [preferKaraoke, setPreferKaraoke] = useState(() => {
    return persistence.preferences.get('preferKaraoke') !== 'false';
  });
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(-1);
  const [searchState, setSearchState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [menuMaxHeight, setMenuMaxHeight] = useState(480);
  const [language, setLanguage] = useState(() => window.ManokaraI18n?.language || 'en');
  const hostRef = useRef(null),
    inputRef = useRef(null),
    menuRef = useRef(null),
    listRef = useRef(null);
  const timerRef = useRef(0),
    controllerRef = useRef(null),
    revisionRef = useRef(0);
  const pendingKeyRef = useRef(''),
    resultsKeyRef = useRef(''),
    composingRef = useRef(false);
  const closeRef = useRef(null),
    resizeRef = useRef(null);
  const cacheRef = useRef(new Map());
  const text = value => window.ManokaraI18n?.text(value) || value;
  const normalizedQuery = query.trim().replace(/\s+/g, ' ');
  const requestKey = `${normalizedQuery}|${preferKaraoke}`;
  function resizeMenu() {
    const menu = menuRef.current;
    if (!menu || !open) return;
    const top = menu.getBoundingClientRect().top;
    setMenuMaxHeight(Math.max(120, Math.min(480, innerHeight - top - 12)));
  }
  function cancelSearch() {
    clearTimeout(timerRef.current);
    revisionRef.current++;
    controllerRef.current?.abort();
    controllerRef.current = null;
    pendingKeyRef.current = '';
  }
  function close() {
    cancelSearch();
    setOpen(false);
    setActive(-1);
    if (searchState === 'loading') setSearchState('idle');
  }
  closeRef.current = close;
  resizeRef.current = resizeMenu;
  function editQuery(value) {
    cancelSearch();
    setQuery(value);
    setResults([]);
    setActive(-1);
    resultsKeyRef.current = '';
    setSearchState('idle');
    setErrorMessage('');
    setOpen(true);
  }
  async function runSearch(term = normalizedQuery, karaoke = preferKaraoke) {
    if (composingRef.current) return;
    const request = term.trim().replace(/\s+/g, ' '),
      key = `${request}|${karaoke}`;
    if (!request) {
      setOpen(true);
      setSearchState('idle');
      return;
    }
    if (pendingKeyRef.current === key) {
      setOpen(true);
      return;
    }
    cancelSearch();
    const current = revisionRef.current;
    setResults([]);
    setActive(-1);
    resultsKeyRef.current = '';
    setErrorMessage('');
    const cached = cacheRef.current.get(key);
    if (cached && cached.expires > Date.now()) {
      setResults(cached.results);
      resultsKeyRef.current = key;
      setSearchState(cached.results.length ? 'results' : 'empty');
      setOpen(true);
      return;
    }
    const abort = new AbortController();
    controllerRef.current = abort;
    pendingKeyRef.current = key;
    setSearchState('loading');
    setOpen(true);
    try {
      const service = appRuntime.commands.actions('youtubeSearch').search;
      if (!service) throw new Error('YouTube search is not ready yet.');
      const response = await service({
        query: request,
        karaoke,
        signal: abort.signal
      });
      const data = await response.json();
      if (current !== revisionRef.current || abort.signal.aborted) return;
      if (!response.ok) throw Error(response.status === 404 ? 'Restart the updated server to enable YouTube search.' : data.error || 'YouTube search is temporarily unavailable. Try again or search on YouTube.');
      if (!Array.isArray(data.results)) throw Error('YouTube search is temporarily unavailable. Try again or search on YouTube.');
      const normalized = data.results.filter(item => item && typeof item.id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(item.id) && typeof item.title === 'string').slice(0, 8).map(item => ({
        id: item.id,
        title: item.title.slice(0, 512),
        channel: typeof item.channel === 'string' ? item.channel.slice(0, 160) : '',
        duration: typeof item.duration === 'number' ? item.duration : null
      }));
      cacheRef.current.delete(key);
      cacheRef.current.set(key, {
        results: normalized,
        expires: Date.now() + 120000
      });
      while (cacheRef.current.size > 30) cacheRef.current.delete(cacheRef.current.keys().next().value);
      resultsKeyRef.current = key;
      setResults(normalized);
      setSearchState(normalized.length ? 'results' : 'empty');
    } catch (error) {
      if (current !== revisionRef.current || abort.signal.aborted) return;
      setSearchState('error');
      setErrorMessage(error.name === 'TimeoutError' ? 'YouTube search took too long. Try again.' : error.name === 'TypeError' ? 'Could not connect. Check your connection and try again.' : error.message || 'YouTube search is temporarily unavailable. Try again or search on YouTube.');
      setResults([]);
      setActive(-1);
    } finally {
      if (current === revisionRef.current) {
        controllerRef.current = null;
        pendingKeyRef.current = '';
      }
    }
  }
  function selectResult(index) {
    const video = results[index];
    if (!video) return;
    if (appRuntime.commands.actions('youtube')?.choose(video) !== false) close();else inputRef.current?.focus({
      preventScroll: true
    });
  }
  function highlight(index) {
    if (!results.length) return;
    const next = (index + results.length) % results.length;
    setActive(next);
    requestAnimationFrame(() => listRef.current?.querySelector(`#youtube-result-${next}`)?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest'
    }));
  }
  function onKeyDown(event) {
    if (composingRef.current || event.isComposing) return;
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      event.stopPropagation();
      close();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (results.length) highlight(active < 0 ? event.key === 'ArrowDown' ? 0 : results.length - 1 : active + (event.key === 'ArrowDown' ? 1 : -1));else if (normalizedQuery.length >= 2) runSearch();
    } else if (event.key === 'Enter' && open && active >= 0) {
      event.preventDefault();
      selectResult(active);
    }
  }
  useEffect(() => {
    if (!open || isComposing || normalizedQuery.length < 2 || resultsKeyRef.current === requestKey || searchState === 'loading') return;
    timerRef.current = setTimeout(() => runSearch(normalizedQuery, preferKaraoke), 850);
    return () => clearTimeout(timerRef.current);
  }, [open, normalizedQuery, preferKaraoke, searchState, isComposing]);
  useEffect(() => {
    const changed = () => setLanguage(window.ManokaraI18n?.language || 'en');
    const outside = event => {
      if (!hostRef.current?.contains(event.target)) closeRef.current?.();
    };
    const resize = () => resizeRef.current?.();
    window.addEventListener('manokara:languagechange', changed);
    window.addEventListener('resize', resize);
    document.addEventListener('pointerdown', outside, true);
    return () => {
      window.removeEventListener('manokara:languagechange', changed);
      window.removeEventListener('resize', resize);
      document.removeEventListener('pointerdown', outside, true);
      cancelSearch();
    };
  }, []);
  useLayoutEffect(() => {
    if (open) resizeMenu();
  }, [open, language]);
  const messages = {
    idle: 'Type a song or artist. Search starts after 2 characters.',
    loading: 'Searching YouTube…',
    results: 'Choose a video to fill the song editor.',
    empty: 'No matching videos. Try another name.'
  };
  const status = searchState === 'error' ? text(errorMessage) : text(messages[searchState] || messages.idle);
  const externalTerm = normalizedQuery || 'karaoke';
  const externalQuery = preferKaraoke && !/karaoke|カラオケ/i.test(externalTerm) ? `${externalTerm} karaoke` : externalTerm;
  const externalUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(externalQuery)}`;
  return <div className="header-search" ref={hostRef} role="search" aria-label={text('Find music on YouTube')}>
    <form id="musicSearchForm" className="music-search-form" onSubmit={event => {
      event.preventDefault();
      runSearch();
    }}>
      <svg className="icon" aria-hidden="true"><use href="./manokara-icons.svg#magnifying-glass" /></svg>
      <input ref={inputRef} id="musicSearch" type="search" maxLength={160} placeholder={text('Find a song on YouTube…')} aria-label={text('Find a song on YouTube')} role="combobox" aria-autocomplete="list" aria-expanded={open} aria-activedescendant={active >= 0 ? `youtube-result-${active}` : undefined} aria-controls="youtubeResults" autoComplete="off" spellCheck={false} value={query} onChange={event => editQuery(event.target.value)} onFocus={() => setOpen(true)} onKeyDown={onKeyDown} onCompositionStart={() => {
        composingRef.current = true;
        setIsComposing(true);
        cancelSearch();
      }} onCompositionEnd={event => {
        composingRef.current = false;
        setIsComposing(false);
        editQuery(event.currentTarget.value);
      }} />
      <label className="karaoke-search-toggle" title={text('Prefer karaoke versions')}>
        <input type="checkbox" checked={preferKaraoke} onChange={event => {
          const value = event.target.checked;
          setPreferKaraoke(value);
          persistence.preferences.set('preferKaraoke', String(value));
          editQuery(query);
          inputRef.current?.focus({
            preventScroll: true
          });
        }} /><span>{text('Karaoke')}</span>
      </label>
      <button className="ghost icon-button" type="submit" aria-label={text('Search YouTube')} title={text('Search YouTube')}><svg className="icon" aria-hidden="true"><use href="./manokara-icons.svg#caret-right" /></svg></button>
    </form>
    <div ref={menuRef} id="musicSearchMenu" className="music-search-menu" hidden={!open} style={{
      maxHeight: menuMaxHeight
    }} onBlurCapture={() => setTimeout(() => {
      if (!hostRef.current?.contains(document.activeElement)) close();
    }, 0)}>
      <div className="music-search-heading">
        <span id="musicSearchStatus" role="status" aria-live="polite">{status}</span>
        <button className="ghost icon-button" type="button" aria-label={text('Close search results')} title={text('Close search results')} onClick={() => {
          inputRef.current?.focus({
            preventScroll: true
          });
          close();
        }}><svg className="icon" aria-hidden="true"><use href="./manokara-icons.svg#x" /></svg></button>
      </div>
      <div ref={listRef} id="youtubeResults" className="youtube-results" role="listbox" aria-label={text('YouTube search results')} aria-busy={searchState === 'loading'}>
        <YoutubeResults results={results} active={active} onSelect={selectResult} />
      </div>
      <div className="music-search-footer">
        <small>↑ ↓ {text('to choose')} · Enter {text('to select')}</small>
        <a href={externalUrl} target="_blank" rel="noopener noreferrer">{text('Search on YouTube')}<svg className="icon" aria-hidden="true"><use href="./manokara-icons.svg#arrow-up-right" /></svg></a>
      </div>
    </div>
  </div>;
}
function TourOverlay({
  state
}) {
  const action = name => () => appRuntime.commands.actions('tour')?.[name]?.();
  return <div className="tour-overlay" hidden={!state.open}>
    <div className="tour-mask" /><div className="tour-mask" /><div className="tour-mask" /><div className="tour-mask" />
    <div className="tour-spotlight" aria-hidden="true" />
    <section className="tour-card" role="dialog" aria-modal="true" aria-labelledby="tourTitle" aria-describedby="tourBody">
      <div className="tour-top">
        <span className="tour-eyebrow">{state.eyebrow}</span>
        <select value={state.language} aria-label={state.languageLabel} onChange={event => appRuntime.commands.actions('tour')?.setLanguage(event.target.value)}>
          <option value="vi">Tiếng Việt</option><option value="en">English</option>
        </select>
        <button className="ghost tour-close" type="button" data-tour="close" aria-label={state.closeLabel} title={state.closeLabel} onClick={action('close')}>×</button>
      </div>
      <p className="tour-progress" aria-live="polite">{state.progress}</p>
      <h2 id="tourTitle">{state.title}</h2>
      <p id="tourBody">{state.body}</p>
      <div className="tour-track" aria-hidden="true"><div className="tour-meter" style={{
          width: `${state.meter}%`
        }} /></div>
      <div className="tour-actions">
        <button className="ghost" type="button" data-tour="skip" onClick={action('close')}>{state.skipLabel}</button>
        <div>
          <button className="s" type="button" data-tour="back" disabled={state.backDisabled} onClick={action('back')}>{state.backLabel}</button>
          <button type="button" data-tour="next" onClick={action('next')}>{state.nextLabel}</button>
        </div>
      </div>
    </section>
  </div>;
}
function AppHeader() {
  const [language, setLanguage] = useState(() => window.ManokaraI18n?.language || 'en');
  const icon = name => h('svg', {
    className: 'icon',
    'aria-hidden': 'true'
  }, h('use', {
    href: `./manokara-icons.svg#${name}`
  }));
  useEffect(() => {
    const changed = () => setLanguage(window.ManokaraI18n?.language || 'en');
    window.addEventListener('manokara:languagechange', changed);
    return () => window.removeEventListener('manokara:languagechange', changed);
  }, []);
  return h('div', {
    className: 'app-header-react-grid'
  }, h('div', {
    className: 'brand'
  }, h('div', {
    className: 'brand-mark'
  }, icon('cactus')), h('h1', null, 'manokara')), h(YoutubeSearch), h('div', {
    className: 'header-actions'
  }, h('label', {
    className: 'language-control'
  }, h('select', {
    id: 'language',
    'aria-label': 'Interface language',
    value: language,
    onChange: event => window.ManokaraI18n?.setLanguage(event.target.value)
  }, h('option', {
    value: 'vi'
  }, 'Tiếng Việt'), h('option', {
    value: 'en'
  }, 'English'))), h('button', {
    className: 's',
    id: 'help',
    type: 'button',
    title: 'Open the guided tour',
    'aria-haspopup': 'dialog',
    onClick: () => window.ManokaraTour?.open()
  }, h('span', {
    className: 'help-symbol',
    'aria-hidden': 'true'
  }, '?'), h('span', null, 'Help')), h('div', {
    className: 'connection'
  }, icon('broadcast'), h('span', {
    id: 'relayStatus',
    role: 'status'
  }, 'Connecting to OBS…')), h('button', {
    className: 's',
    id: 'transpose',
    type: 'button',
    title: 'Change song key',
    onClick: () => appRuntime.commands.actions('dialog')?.openTranspose()
  }, icon('sliders-horizontal'), h('span', null, 'Key')), h('button', {
    className: 's',
    id: 'theme',
    type: 'button',
    title: 'Switch between light and dark theme',
    'aria-label': 'Switch color theme',
    onClick: () => {
      const root = document.documentElement;
      const current = root.dataset.theme || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
      root.dataset.theme = current === 'dark' ? 'light' : 'dark';
      persistence.preferences.set('theme', root.dataset.theme);
    }
  }, icon('circle-half'), h('span', null, 'Theme'))));
}
function AppFooter() {
  const [language, setLanguage] = useState(() => window.ManokaraI18n?.language || 'en');
  useEffect(() => {
    const changed = () => setLanguage(window.ManokaraI18n?.language || 'en');
    window.addEventListener('manokara:languagechange', changed);
    return () => window.removeEventListener('manokara:languagechange', changed);
  }, []);
  const text = key => window.ManokaraI18n?.text(key) || key;
  return <>
    <span lang={language}>{text('Sing your way. Your setlist, your room.')}</span>
    <details lang={language}>
      <summary>{text('Credits & licenses')}<svg className="icon" aria-hidden="true"><use href="./manokara-icons.svg#caret-right" /></svg></summary>
      <div className="credits-links">
        <a href="/sources/FOLIA-MAJOR-NOTICE.txt">{text('Folia notices')}</a>
        <a href="/sources/FOLIA-MAJOR-SOURCE.zip">{text('Folia source')}</a>
        <a href="/sources/FOLIA-INTEGRATION-SOURCE/manokara-folia.tsx">{text('Integration source')}</a>
        <a href="/sources/JIZURA-LICENSE.txt">{text('JIZURA license')}</a>
        <a href="/romaji-assets/NOTICES.txt">{text('Romaji notices')}</a>
        <a href="/ui-assets/NOTICES.txt">{text('Interface fonts & icons')}</a>
      </div>
    </details>
  </>;
}
function KaraokeWorkspaceShell() {
  return <main id="grid" tabIndex={-1} role="tabpanel" aria-labelledby="main-karaoke">
    <aside className="card" id="setlistSide" aria-labelledby="setlistTitle" />
    <div id="maincol"><div id="playerReactRoot" /></div>
    <section className="card" id="workspace" aria-label="OBS output settings"><div id="obsSettingsReactRoot" /></section>
    <aside className="card" id="side" aria-labelledby="lyricsTitle" />
  </main>;
}
function OverlayStudioSurface() {
  const [view, setView] = useState(() => window.ManokaraStudio?.view || {
    target: 'playlist',
    selected: 'current'
  });
  useLayoutEffect(() => {
    const changed = event => setView(event.detail || window.ManokaraStudio?.view || {
      target: 'playlist',
      selected: 'current'
    });
    window.addEventListener('manokara:studioviewchange', changed);
    return () => window.removeEventListener('manokara:studioviewchange', changed);
  }, []);
  const text = key => window.ManokaraStudio?.text?.(key) || window.ManokaraI18n?.text(key) || key;
  const copy = key => <span data-studio-copy={key}>{text(key)}</span>;
  const option = (value, label) => <option key={value} value={value} data-studio-copy={label}>{text(label)}</option>;
  const field = (label, id, type = 'text', props = {}) => <label className="field" key={id}><span data-studio-copy={label}>{text(label)}</span><input id={id} type={type} {...props} /></label>;
  const descriptions = {
    glass: 'Broadcast dashboard',
    paper: 'A paper setlist',
    minimal: 'Let the type speak',
    card: 'Artwork in the spotlight',
    vinyl: 'At the turntable',
    signal: 'A compact lower third'
  };
  const themes = window.ManokaraOverlay?.themes || ['glass', 'paper', 'minimal', 'card', 'vinyl', 'signal'];
  return <div className="studio-react-shell">
    <div id="studioPresets" className="studio-presets" role="group" aria-label="Playlist presets">
      {themes.map(theme => <button key={theme} className="studio-preset" data-theme-preset={theme}>
        <span className={`preset-art ${theme}`} data-theme-preview={theme} aria-hidden="true" />
        <span className="preset-name" data-studio-copy={theme[0].toUpperCase() + theme.slice(1)}>{text(theme[0].toUpperCase() + theme.slice(1))}</span>
        <small className="preset-description" data-studio-copy={descriptions[theme]}>{text(descriptions[theme])}</small>
      </button>)}
    </div>
    <div className="studio-body">
      <section className="card studio-preview-pane" aria-labelledby="studioPreviewTitle">
        <div className="studio-preview-toolbar">
          <h3 id="studioPreviewTitle">{copy('Live preview')}</h3>
          <div className="row">
            <select id="studioData" aria-label="Preview data">{option('sample', 'Sample data')}{option('live', 'Live data')}</select>
            <select id="studioBgView" aria-label="Preview background">{option('checker', 'Checkerboard')}{option('dark', 'Dark')}{option('light', 'Light')}{option('scene', 'Scene guide')}</select>
            <label className="inline-check"><input id="studioBoth" type="checkbox" />{copy('Both overlays')}</label>
          </div>
          <div className="studio-history-tools">
            <button className="s" data-action="expand" aria-haspopup="dialog" aria-expanded="false">{copy('View larger')}</button>
            <button className="s" data-action="undo">{copy('Undo')}</button><button className="s" data-action="redo">{copy('Redo')}</button><button className="ghost" data-action="reset">{copy('Reset layout')}</button>
          </div>
        </div>
        <div className="studio-preview-space">
          <div id="studioPreview" className="studio-preview" data-bg="checker"><div id="studioCanvas" /><div id="studioEmpty" className="studio-empty" role="status" hidden /></div>
          <span id="studioFrameBadge" className="studio-frame-badge" />
        </div>
        <small className="studio-source-note">{copy('Drag blocks to move; resize with handles. Arrow keys nudge or resize. Preview background is local; OBS remains transparent.')}</small>
        <div className="studio-link"><input id="studioObsUrl" readOnly aria-label="Overlay OBS URL" /><button data-action="copy">{copy('Copy OBS link')}</button><button className="s" data-action="open">{copy('Open output')}</button></div>
        <small className="studio-source-note"><b id="studioSourceSize" /> · {copy('Use these dimensions for both OBS Browser Sources. Keep this page open while singing.')}</small>
        <div id="studioStatus" className="studio-status" role="status" />
      </section>
      <aside className="card studio-controls" aria-label="Overlay settings">
        <details className="studio-section studio-accordion" open>
          <summary><span>{copy('Output frame')}</span><small>{copy('Canvas dimensions')}</small></summary>
          <label className="field">{copy('Frame size')}<select id="studioFrame">{option('1920x1080', 'Landscape 1080p')}{option('1280x720', 'Landscape 720p')}{option('1080x1920', 'Portrait')}</select></label>
        </details>
        <details id="studioLyricSettings" className="studio-section studio-accordion" hidden>
          <summary><span>{copy('Lyrics appearance')}</span><small>{copy('Settings here are shared with Karaoke → OBS output.')}</small></summary>
          <div id="studioLyricControlHost" />
        </details>
        <details id="studioLayoutSection" className="studio-section studio-accordion">
          <summary><span>{copy('Layout')}</span><small>{copy('Panel structure')}</small></summary>
          <label className="field">{copy('Layout mode')}<select id="studioLayout">{option('separate', 'Separate blocks')}{option('unified', 'One unified panel')}</select></label>
          <small id="studioGroupNote">{copy('Move and resize the whole panel. Select a section below to edit its text.')}</small>
        </details>
        <details id="studioBlockSection" className="studio-section studio-accordion" open>
          <summary><span>{copy('Blocks')}</span><small>{copy('Choose what to edit')}</small></summary>
          <div id="studioBlocks" className={`studio-blocks${view.target === 'lyrics' ? ' studio-blocks-single' : ''}`} role="group" aria-label={text('Blocks')}>
            {(view.target === 'lyrics' ? ['lyric'] : ['current', 'list', 'next']).map(key => {
              const labels = {
                current: 'Now Singing',
                list: 'Song List',
                next: 'Next On',
                lyric: 'Lyric viewport'
              };
              return <button key={key} className="s" type="button" data-select={key} aria-pressed={view.selected === key}>{text(labels[key])}</button>;
            })}
          </div>
          <label className="inline-check"><input id="studioVisible" type="checkbox" />{copy('Show this block')}</label>
        </details>
        <details id="studioGeometry" className="studio-section studio-accordion" open>
          <summary><span>{copy('Position & size')}</span><small>{copy('Drag on preview or enter values')}</small></summary>
          <div className="studio-fields">
            {field('X', 'studioX', 'number', {
              min: '0',
              step: 'any'
            })}
            {field('Y', 'studioY', 'number', {
              min: '0',
              step: 'any'
            })}
            {field('Width', 'studioW', 'number', {
              min: '32',
              step: 'any'
            })}
            {field('Height', 'studioH', 'number', {
              min: '32',
              step: 'any'
            })}
          </div>
          <label className="inline-check studio-aspect-lock"><input id="studioAspectLock" type="checkbox" />{copy('Keep aspect ratio')}<small id="studioAspectRatio" /></label>
          <div className="studio-position-actions">
            <button className="s" data-action="top-center">{copy('Top center')}</button><button className="s" data-action="center">{copy('Center block')}</button><button className="s" data-action="bottom-center">{copy('Bottom center')}</button>
          </div>
          <div id="studioCompactSettings">
            <label id="studioAutoFitField" className="inline-check"><input id="studioAutoFit" type="checkbox" />{copy('Fit frame to lyrics')}</label>
            <small id="studioAutoFitNote">{copy('Fits the longest lines in this song. Manual position or size edits turn this off.')}</small>
            <small>{copy('Text effects use a compact frame. Scene effects and Keep centre free use the full lyric viewport.')}</small>
          </div>
        </details>
        <details id="blockTypography" className="studio-section studio-accordion">
          <summary><span>{copy('Typography')}</span><small>{copy('Text style')}</small></summary>
          {field('Heading', 'studioLabel', 'text', {
            maxLength: 80
          })}
          <div className="studio-fields">{field('Text size', 'studioSize', 'number', {
              min: 12,
              max: 96
            })}
            <label className="field">{copy('Alignment')}<select id="studioAlign">{option('left', 'Left')}{option('center', 'Center')}{option('right', 'Right')}</select></label>
          </div>
          <label className="inline-check"><input id="studioBold" type="checkbox" />{copy('Bold')}</label>
        </details>
        <details id="playlistAppearance" className="studio-section studio-accordion">
          <summary><span>{copy('Appearance')}</span><small>{copy('Colors and song list')}</small></summary>
          <div className="studio-fields">
            {field('Text', 'studioFg', 'color')}{field('Accent', 'studioAccent', 'color')}{field('Panel', 'studioBg', 'color')}
            {field('Panel opacity', 'studioOpacity', 'number', {
              min: 0,
              max: 1,
              step: 0.05
            })}
            {field('Corner radius', 'studioRadius', 'number', {
              min: 0,
              max: 80
            })}
            <label className="field">{copy('Font')}<select id="studioFont">{option('system', 'System')}{option('geist', 'Geist')}{option('serif', 'Serif')}{option('mono', 'Mono')}</select></label>
          </div>
          <label className="field">{copy('List content')}<select id="studioListMode">{option('all', 'Whole setlist')}{option('upcoming', 'Upcoming songs')}{option('history', 'Sung history')}</select></label>
          {field('Static list limit', 'studioLimit', 'number', {
            min: 1,
            max: 20
          })}
          <label id="studioAutoScrollField" className="inline-check"><input id="studioAutoScroll" type="checkbox" />{copy('Auto-scroll song list')}</label>
          <div id="studioScrollSettings"><div className="studio-fields">
            {field('Scroll speed (px/s)', 'studioScrollSpeed', 'number', {
                min: 8,
                max: 80,
                step: 1
              })}
            {field('Pause at each end (s)', 'studioScrollPause', 'number', {
                min: 0,
                max: 10,
                step: 0.5
              })}
          </div><small>{copy('Auto-scroll shows the whole list. Short lists stay still.')}</small></div>
          <label className="inline-check"><input id="studioNumbering" type="checkbox" />{copy('Show numbers')}</label>
          <label className="inline-check"><input id="studioProgress" type="checkbox" />{copy('Show progress')}</label>
          <label className="inline-check"><input id="studioHideIdle" type="checkbox" />{copy('Hide when idle')}</label>
          <button className="ghost" data-action="history">{copy('Clear sung history')}</button>
        </details>
        <details className="studio-section studio-accordion studio-export">
          <summary><span>{copy('Layout files')}</span><small>{copy('Save or restore a layout')}</small></summary>
          <button className="s" data-action="export">{copy('Export layout')}</button><button className="s" data-action="import">{copy('Import layout')}</button>
          <input id="studioImport" type="file" accept=".json,application/json" hidden />
        </details>
      </aside>
    </div>
  </div>;
}
function OverlayStudioShell() {
  return <OverlayStudioSurface />;
}
function OverlayStudioHeader() {
  const [target, setTarget] = useState(() => window.ManokaraStudio?.view?.target || 'playlist');
  const [language, setLanguage] = useState(() => window.ManokaraI18n?.language || 'en');
  const labels = language === 'vi' ? {
    eyebrow: 'CHỈNH OVERLAY',
    title: 'Playlist & Lyric Overlay',
    description: 'Chọn giao diện, kéo các khối trên phần xem trước rồi sao chép link vào OBS.',
    playlist: 'Playlist',
    lyrics: 'Lời bài hát',
    tabs: 'Loại overlay'
  } : {
    eyebrow: 'OVERLAY STUDIO',
    title: 'Playlist & Lyric Overlay',
    description: 'Choose a style, arrange blocks in the preview, then copy the OBS link.',
    playlist: 'Playlist',
    lyrics: 'Lyrics',
    tabs: 'Overlay type'
  };
  React.useEffect(() => {
    const targetChanged = event => setTarget(event.detail === 'lyrics' ? 'lyrics' : 'playlist');
    const languageChanged = () => setLanguage(window.ManokaraI18n?.language || 'en');
    window.addEventListener('manokara:overlaytargetchange', targetChanged);
    window.addEventListener('manokara:languagechange', languageChanged);
    return () => {
      window.removeEventListener('manokara:overlaytargetchange', targetChanged);
      window.removeEventListener('manokara:languagechange', languageChanged);
    };
  }, []);
  const select = value => window.ManokaraStudio?.showTarget(value);
  const onTabKeyDown = event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' || event.key === 'ArrowLeft' && target === 'lyrics' ? 'playlist' : event.key === 'End' || event.key === 'ArrowRight' && target === 'playlist' ? 'lyrics' : target;
    select(next);
    event.currentTarget.querySelector(`[data-overlay-tab="${next}"]`)?.focus();
  };
  return h('div', {
    className: 'studio-heading'
  }, h('div', {
    className: 'studio-heading-copy'
  }, h('span', {
    className: 'eyebrow'
  }, labels.eyebrow), h('h1', null, labels.title), h('p', null, labels.description)), h('div', {
    className: 'studio-targets',
    role: 'tablist',
    'aria-label': labels.tabs,
    onKeyDown: onTabKeyDown
  }, h('button', {
    className: 's',
    type: 'button',
    role: 'tab',
    'data-overlay-tab': 'playlist',
    'aria-selected': target === 'playlist',
    tabIndex: target === 'playlist' ? 0 : -1,
    onClick: () => select('playlist')
  }, labels.playlist), h('button', {
    className: 's',
    type: 'button',
    role: 'tab',
    'data-overlay-tab': 'lyrics',
    'aria-selected': target === 'lyrics',
    tabIndex: target === 'lyrics' ? 0 : -1,
    onClick: () => select('lyrics')
  }, labels.lyrics)));
}
function MainWorkspaceTabs() {
  const [current, setCurrent] = useState(() => window.ManokaraStudio?.main || 'karaoke');
  const [language, setLanguage] = useState(() => window.ManokaraI18n?.language || 'en');
  const labels = language === 'vi' ? {
    karaoke: 'Karaoke',
    overlay: 'Overlay',
    name: 'Không gian làm việc chính'
  } : {
    karaoke: 'Karaoke',
    overlay: 'Overlay',
    name: 'Main workspace'
  };
  React.useEffect(() => {
    const changed = event => setCurrent(event.detail === 'playlist' ? 'playlist' : 'karaoke');
    const languageChanged = () => setLanguage(window.ManokaraI18n?.language || 'en');
    window.addEventListener('manokara:mainviewchange', changed);
    window.addEventListener('manokara:languagechange', languageChanged);
    return () => {
      window.removeEventListener('manokara:mainviewchange', changed);
      window.removeEventListener('manokara:languagechange', languageChanged);
    };
  }, []);
  const select = value => window.ManokaraStudio?.showMain(value);
  const onKeyDown = event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' || event.key === 'ArrowLeft' && current === 'playlist' ? 'karaoke' : event.key === 'End' || event.key === 'ArrowRight' && current === 'karaoke' ? 'playlist' : current;
    select(next);
    event.currentTarget.querySelector(`[data-main-tab="${next}"]`)?.focus();
  };
  return h('div', {
    className: 'main-tabs-control',
    role: 'tablist',
    'aria-label': labels.name,
    onKeyDown
  }, h('button', {
    id: 'main-karaoke',
    type: 'button',
    role: 'tab',
    'data-main-tab': 'karaoke',
    'aria-controls': 'grid',
    'aria-selected': current === 'karaoke',
    tabIndex: current === 'karaoke' ? 0 : -1,
    onClick: () => select('karaoke')
  }, labels.karaoke), h('button', {
    id: 'main-playlist',
    type: 'button',
    role: 'tab',
    'data-main-tab': 'playlist',
    'aria-controls': 'playlistStudio',
    'aria-selected': current === 'playlist',
    tabIndex: current === 'playlist' ? 0 : -1,
    title: 'Playlist and lyrics overlays',
    onClick: () => select('playlist')
  }, labels.overlay));
}
export { AppFooter, AppHeader, KaraokeWorkspaceShell, MainWorkspaceTabs, OverlayStudioHeader, OverlayStudioShell, TourOverlay };
