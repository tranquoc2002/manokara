const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
require('../outputs/manokara-core.js');

test('OBS decoder keeps the newest streaming patch and terminates on revocation', async () => {
  const received = [];
  let finish;
  const ended = new Promise(resolve => finish = resolve);
  const scene = {ready:true,lrc:'[00:00]Hello',time:1};
  const events = 'data: '+JSON.stringify({state:scene})+'\n\ndata: '+JSON.stringify({patch:{time:2}})+'\n\n';
  const body = new ReadableStream({start(controller) {
    controller.enqueue(new TextEncoder().encode(events));
    controller.enqueue(new TextEncoder().encode('event: revoked\ndata: {}\n\n'));
    controller.close();
  }});
  const sandbox = {ManokaraCore, performance, URL, TextDecoder, AbortController, AbortSignal,
    setInterval, clearInterval, setTimeout, clearTimeout, location:{href:'https://test.example/manokara-obs.html'},
    window:{addEventListener(){}}, fetch:async url => String(url).includes('stream=1')
      ? {ok:true,status:200,headers:{get:()=> 'text/event-stream'},body}
      : {ok:true,status:200,json:async()=>scene}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../outputs/manokara-relay.js'),'utf8'),sandbox);
  const relay = sandbox.ManokaraRelay.connect({url:'https://test.example/__lyric-state?room=test',token:'viewer',
    receive:next=>received.push(next), revoked:finish});
  try {
    await Promise.race([ended,new Promise((_,reject)=>{const id=setTimeout(()=>reject(Error('stream decoder stalled')),1000);id.unref()})]);
    assert.equal(received.length,2);
    assert.equal(received[1].time,2);
    assert.equal(received[1].lrc,scene.lrc);
  } finally { relay.stop(); }
});

test('optional tab audio yields bounded band levels and releases capture on Stop', async () => {
  const button = {}, status = {};
  let stops = 0, closes = 0, captureOptions;
  const audioTrack = {stop(){stops++},addEventListener(){}};
  const videoTrack = {stop(){stops++},addEventListener(){}};
  const stream = {getTracks:()=>[audioTrack,videoTrack],getAudioTracks:()=>[audioTrack]};
  const sandbox = {Uint8Array, window:{addEventListener(){}}, navigator:{mediaDevices:{async getDisplayMedia(options){captureOptions=options;return stream}}},
    AudioContext:class {
      state='running'; sampleRate=48000;
      async resume(){} async close(){closes++}
      createMediaStreamSource(){return{connect(){}}}
      createAnalyser(){return{frequencyBinCount:1024,getByteFrequencyData(array){array.fill(128)}}}
    }};
  vm.runInNewContext(fs.readFileSync(require.resolve('../outputs/manokara-audio.js'),'utf8'),sandbox);
  const audio = sandbox.ManokaraAudio.create(button,status);
  assert.ok(Object.values(audio.sample()).every(value=>value===0));
  await button.onclick();
  assert.equal(captureOptions.audio,true);
  assert.equal(button.textContent,'Stop audio reaction');
  assert.ok(Object.values(audio.sample()).every(value=>value>.49 && value<.51));
  await button.onclick();
  assert.ok(Object.values(audio.sample()).every(value=>value===0));
  assert.equal(stops,2);
  assert.equal(closes,1);
});
