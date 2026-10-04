const {test} = require('node:test');
const assert = require('node:assert/strict');
require('../outputs/manokara-core.js');
const {parseLyrics, timeValue, youtubeId, createClock} = globalThis.ManokaraCore;

test('LRC supports metadata, repeated timestamps, offsets and blank gaps', () => {
  const p = parseLyrics('[ar:Artist]\n[offset:-500]\n[00:01.20][00:03]Xin chào\n[00:04]\nplain');
  assert.equal(p.timed, true);
  assert.deepEqual(p.lines.map(x => [x.t, x.x]), [[.7, 'Xin chào'], [2.5, 'Xin chào'], [3.5, '']]);
  assert.equal(parseLyrics('[ti:Title]').lines.length, 0);
  assert.deepEqual(parseLyrics('A\nB', 10).lines.map(x => x.t), [0, 5]);
});

test('time fields reject invalid values', () => {
  assert.equal(timeValue(''), null);
  assert.equal(timeValue('01:30.5'), 90.5);
  assert.equal(timeValue('3.25'), 3.25);
  for (const value of ['-2', '1:60', 'abc', '1:2:3', 'Infinity']) assert.ok(Number.isNaN(timeValue(value)));
});

test('YouTube IDs only come from supported hosts', () => {
  for (const url of ['https://youtu.be/dz3sM6ygX_g', 'https://youtube.com/watch?v=dz3sM6ygX_g', 'https://www.youtube.com/shorts/dz3sM6ygX_g']) assert.equal(youtubeId(url), 'dz3sM6ygX_g');
  assert.equal(youtubeId('https://evil.example/?v=dz3sM6ygX_g'), null);
});

const snap = extra => ({title:'Song',lrc:'[00:00]Hello',timelineVersion:1,playing:true,paused:false,time:10,sampledAt:1,...extra});

test('output clock ignores device wall-clock skew and smooths small sample jitter', () => {
  const clock = createClock();
  clock.accept(snap({stateAgeMs:200}), 0);
  assert.equal(clock.time(300), 10.5);
  clock.accept(snap({time:10.2,stateAgeMs:50}), 300);
  assert.equal(clock.time(600), 10.8);
});

test('seeks, offset changes and pause are authoritative', () => {
  const clock = createClock();
  clock.accept(snap({}), 0);
  clock.accept(snap({time:9.9,timelineVersion:2}), 200);
  assert.equal(clock.time(200), 9.9);
  clock.accept(snap({time:2}), 300);
  assert.equal(clock.time(300), 2);
  clock.accept(snap({time:2.1,playing:false,paused:true}), 400);
  assert.equal(clock.time(2400), 2.1);
});

test('countdown stops while paused and disconnected clocks are bounded', () => {
  const clock = createClock();
  clock.accept(snap({playing:false,counting:true,countdownRemaining:5,stateAgeMs:200}), 0);
  assert.equal(clock.countdown(800), 4);
  clock.accept(snap({playing:false,counting:true,paused:true,countdownRemaining:4}), 1000);
  assert.equal(clock.countdown(9000), 4);
  clock.accept(snap({}), 10000);
  assert.equal(clock.time(60000), 25);
  const stale = clock.accept(snap({stateAgeMs:60000}), 61000);
  assert.equal(stale.playing, false);
  assert.equal(clock.time(90000), 25);
});

test('JIZURA colour overrides leave the original effect palette intact', () => {
  const vm = require('node:vm');
  const fs = require('node:fs');
  const style = {schemes:[{fg:'#112233',accent:'#445566'}]};
  const rendered = [];
  const J = {
    STYLE_ORDER:['noir'], defaultProject:() => ({timing:{}}),
    plan:() => ({style,W:1280,H:720,cuts:[]}),
    Renderer:class {frame(ctx, plan) {rendered.push(plan.style.schemes[0].fg);}},
    ensureFonts:async () => {}, fontsOfPlan:() => [],
  };
  const sandbox = {J,window:{J},console,ManokaraCore,Date};
  vm.runInNewContext(fs.readFileSync(require.resolve('../outputs/manokara-jizura-adapter.js'),'utf8'), sandbox);
  const canvas = {clientWidth:1280,clientHeight:720,getContext:() => ({})};
  const input = {title:'Test',lrc:'[00:00]Hello',duration:10,time:1,transparent:true,colorTheme:'white'};
  assert.equal(sandbox.window.ManokaraJizura.draw(canvas,input), true);
  assert.equal(style.schemes[0].fg, '#112233');
  assert.equal(sandbox.window.ManokaraJizura.draw(canvas,{...input,colorTheme:'effect'}), true);
  assert.deepEqual(rendered, ['#FFFFFF','#112233']);
});
