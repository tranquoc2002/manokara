import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { appRuntime } from '../../app/feature-runtime.mjs';
import { useFeature, useSongDraft } from '../../shared/use-feature-store.js';
import { lyricFonts } from '../../manokara-fonts.js';
const h = React.createElement;
export function PlayerControls({
  state
}) {
  const icon = name => h('svg', {
    className: 'icon',
    'aria-hidden': 'true'
  }, h('use', {
    href: `./manokara-icons.svg#${name}`
  }));
  const action = name => () => appRuntime.commands.actions('player')?.[name]?.();
  return h(React.Fragment, null, h('div', {
    className: 'transport-buttons'
  }, h('button', {
    className: 'ghost icon-button',
    id: 'prev',
    type: 'button',
    title: state.previous,
    'aria-label': state.previous,
    onClick: action('previous')
  }, icon('skip-back')), h('button', {
    id: 'play',
    type: 'button',
    onClick: action('play')
  }, icon('play'), h('span', null, state.play)), h('button', {
    className: 'ghost',
    id: 'pause',
    type: 'button',
    onClick: action('pause')
  }, icon(state.paused ? 'play' : 'pause'), h('span', null, state.paused ? state.resume : state.pause)), h('button', {
    className: 'ghost icon-button',
    id: 'next',
    type: 'button',
    title: state.next,
    'aria-label': state.next,
    onClick: action('next')
  }, icon('skip-forward')), h('button', {
    className: 'ghost',
    id: 'stop',
    type: 'button',
    onClick: action('stop')
  }, icon('stop'), h('span', null, state.stop))), h('div', {
    className: 'key-control',
    'aria-label': state.keyLabel
  }, h('span', {
    className: 'key-label'
  }, state.keyLabel), h('button', {
    className: 'ghost',
    type: 'button',
    'data-pitch-step': '-1',
    'aria-label': state.lower,
    disabled: !state.canPitch || state.key <= -12,
    onClick: () => appRuntime.commands.actions('player')?.stepKey(-1)
  }, '−'), h('output', {
    'data-pitch-value': ''
  }, state.key > 0 ? `+${state.key}` : String(state.key)), h('button', {
    className: 'ghost',
    type: 'button',
    'data-pitch-step': '1',
    'aria-label': state.raise,
    disabled: !state.canPitch || state.key >= 12,
    onClick: () => appRuntime.commands.actions('player')?.stepKey(1)
  }, '+'), h('button', {
    className: 'ghost',
    type: 'button',
    'data-pitch-reset': '',
    title: state.originalKey,
    'aria-label': state.originalKey,
    disabled: !state.canPitch || state.key === 0,
    onClick: action('resetKey')
  }, '↺')), h('label', {
    className: 'volume-control'
  }, icon('speaker-high'), h('input', {
    type: 'range',
    id: 'vol',
    min: 0,
    max: 100,
    value: state.volume,
    'aria-label': state.volumeLabel,
    onChange: event => appRuntime.commands.actions('player')?.setVolume(Number(event.target.value))
  })));
}
export function TransposeDialogShell({
  state,
  onClose = appRuntime.commands.actions('dialog').closeTranspose
}) {
  const text = value => window.ManokaraI18n?.text(value) || value;
  return h('div', {
    id: 'transposeDialog',
    className: 'modal-backdrop',
    hidden: !state.open,
    role: 'presentation',
    onClick: event => {
      if (event.target === event.currentTarget) onClose();
    }
  }, h('section', {
    className: 'modal-card',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'transposeTitle'
  }, h('div', {
    className: 'pitch-details'
  }, h('div', null, h('span', {
    className: 'eyebrow'
  }, 'Signalsmith Stretch'), h('h2', {
    id: 'transposeTitle'
  }, text('Song key'))), h('p', null, text('Raise or lower the key without changing the speed. Each song remembers its own setting.')), h('div', {
    className: 'key-control'
  }, h('button', {
    className: 's',
    type: 'button',
    'aria-label': text('Lower key'),
    onClick: () => appRuntime.commands.actions('player')?.stepKey(-1)
  }, '−'), h('output', {
    'aria-live': 'polite'
  }, state.key > 0 ? `+${state.key}` : String(state.key)), h('button', {
    className: 's',
    type: 'button',
    'aria-label': text('Raise key'),
    onClick: () => appRuntime.commands.actions('player')?.stepKey(1)
  }, '+'), h('button', {
    className: 'ghost',
    type: 'button',
    onClick: () => appRuntime.commands.actions('player')?.resetKey()
  }, text('Original key'))), h('small', {
    id: 'pitchStatus',
    'data-state': state.statusState,
    role: 'status',
    'aria-live': 'polite'
  }, state.status), h('div', {
    className: 'row tab-audio-actions'
  }, h('button', {
    id: 'startTabAudio',
    className: 's',
    type: 'button',
    onClick: () => appRuntime.commands.actions('player')?.startTabAudio()
  }, text(state.tabAudioActive ? 'Open audio window' : 'Start Tab Audio')), h('button', {
    id: 'stopTabAudio',
    className: 'ghost',
    type: 'button',
    disabled: !state.tabAudioActive && !state.tabAudioBusy,
    onClick: () => appRuntime.commands.actions('player')?.stopTabAudio()
  }, text('Stop Tab Audio'))), h('p', null, text('YouTube keeps its own player. Choose the Manokara tab and share tab audio in the audio window. Keep that window open while singing.')), h('small', null, text("Try small shifts first (±1–4 semitones). Large shifts can change the sound of a full mix. Lyrics compensate for the processor's audio delay.")), h('div', {
    className: 'row'
  }, h('button', {
    className: 's',
    id: 'transposeClose',
    type: 'button',
    onClick: onClose
  }, text('Close'))))));
}
