const {test}=require('node:test');
const assert=require('node:assert/strict');
const {settle,virtualTime,deferred,makeHarness,song}=require('./playback_fixtures.cjs');
const modules=Promise.all([import('../src/services/playback.mjs'),import('../src/services/lifecycle.mjs'),import('../src/domain/playback-clock.mjs'),import('../src/adapters/youtube-player.mjs')]);

test('lifecycle owns timers/listeners, suspends once, resumes once and disposes terminally',async()=>{
  const [,{createLifecycle}]=await modules,time=virtualTime(),scope=createLifecycle(time.platform,time.now),target=new EventTarget();
  let ticks=0,once=0,events=0;
  scope.interval(()=>ticks++,100);scope.timeout(()=>once++,500);scope.listen(target,'test',()=>events++);
  time.advance(200);target.dispatchEvent(new Event('test'));assert.equal(ticks,2);assert.equal(events,1);
  scope.suspend();scope.suspend();assert.equal(scope.activeTimerCount,0);time.advance(1000);target.dispatchEvent(new Event('test'));assert.equal(ticks,2);assert.equal(events,1);
  scope.resume();scope.resume();time.advance(300);assert.equal(ticks,5);assert.equal(once,1);
  scope.dispose();scope.dispose();time.advance(1000);target.dispatchEvent(new Event('test'));
  assert.equal(time.jobs.size,0);assert.equal(scope.timerCount,0);assert.equal(events,1);assert.equal(scope.signal.aborted,true);
  scope.interval(()=>ticks++,1);assert.equal(time.jobs.size,0);
});

test('monotonic fallback/countdown pause without drift and lyric changes leave audio version alone',async()=>{
  const [,,{createPlaybackClock,audiblePosition,isTimeDiscontinuity}]=await modules,time=virtualTime(),clock=createPlaybackClock(time.now);
  clock.start();time.advance(1000);assert.equal(clock.elapsed(),1);clock.pause();time.advance(2000);assert.equal(clock.elapsed(),1);
  clock.resume();time.advance(500);assert.equal(clock.elapsed(),1.5);clock.reset();clock.countdown(3);time.advance(1000);clock.pause();
  time.advance(5000);assert.equal(clock.remaining(),2);clock.resume({fallback:false,countdown:true});time.advance(1000);assert.equal(clock.remaining(),1);
  const version=clock.audioVersion;clock.lyricsChanged();assert.equal(clock.audioVersion,version);clock.seek();assert.equal(clock.audioVersion,version+1);
  assert.equal(audiblePosition(5,{delay:.2,rate:2}),4.6);
  assert.equal(isTimeDiscontinuity({now:0,position:0,playing:true,rate:1},{now:250,position:.25}),false);
  assert.equal(isTimeDiscontinuity({now:0,position:0,playing:true,rate:1},{now:250,position:20}),true);
});

test('one playback owner starts idempotently and stop/dispose release every track timer',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options);
  engine.start();engine.start();assert.equal(h.creates,1);
  for(let i=0;i<20;i++){engine.load(song());await settle();assert.equal(h.time.jobs.size,1)}
  assert.equal(h.players.filter(player=>!player.destroyed).length,1);
  engine.stop();assert.equal(h.time.jobs.size,0);assert.equal(engine.getSnapshot().mode,'');
  engine.dispose();engine.dispose();assert.equal(h.pitch.disposed,true);assert.deepEqual(h.capture.disposed,{preserveCapture:false});
  assert.equal(engine.load(song()),false);engine.start();assert.equal(h.time.jobs.size,0);
});

test('countdown freezes while paused and Play completes it only once',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options);
  engine.load(song(),{countdown:3});await settle();h.time.advance(1000);assert.equal(engine.state.countdownRemaining,2);
  engine.togglePause();h.time.advance(2000);assert.equal(engine.state.countdownRemaining,2);assert.equal(h.players[0].getPlayerState(),-1);
  engine.togglePause();h.time.advance(1000);assert.equal(engine.state.countdownRemaining,1);
  engine.play();assert.equal(engine.state.counting,false);assert.equal(h.players[0].getPlayerState(),1);assert.equal(h.time.jobs.size,1);
  engine.play();assert.equal(h.time.jobs.size,1);engine.dispose();
});

test('late API readiness and obsolete player callbacks cannot recreate an old song',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness();h.slowReady=true;const engine=createPlayback(h.options);
  engine.load(song());const old=h.pendingReady[0];engine.load(song({title:'Second'}));assert.equal(old.signal.aborted,true);
  old.job.resolve(true);await settle();assert.equal(h.players.length,0);
  h.pendingReady[1].job.resolve(true);await settle();assert.equal(h.players.length,1);
  const player=h.players[0];engine.stop();player.options.events.onStateChange({data:0,target:player});player.options.events.onReady({target:player});
  assert.equal(h.advances,0);assert.equal(engine.state.mode,'');engine.dispose();
});

test('stop aborts pending server lookup and late results never mount another media element',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options);
  engine.load(song());await settle();h.players[0].options.events.onError({data:150});await settle();
  assert.equal(engine.state.lookupPending,true);const signal=h.lookupSignal;engine.stop();assert.equal(signal.aborted,true);await settle();
  assert.equal(h.media.length,0);assert.equal(engine.state.lookupPending,false);assert.equal(h.time.jobs.size,0);engine.dispose();
});

test('server lookup timeout releases its job and error bursts schedule one skip',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options);
  engine.load(song());await settle();h.players[0].options.events.onError({data:150});await settle();h.time.advance(55000);await settle();
  assert.equal(engine.state.lookupPending,false);assert.ok(h.messages.some(message=>message.includes('timed out')));
  for(let i=0;i<30;i++)h.players[0].options.events.onError({data:100});
  assert.equal(h.time.jobs.size,2);h.time.advance(1500);assert.equal(h.advances,1);engine.dispose();
});

test('HTML media range, pause/resume, seek and lyric invalidation share the correct clock',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options);
  engine.load(song({url:'http://localhost:8000/song.mp4',s:10,e:30}));await settle();const element=h.media[0];
  element.dispatchEvent(new Event('loadedmetadata'));assert.equal(element.currentTime,10);assert.equal(engine.state.duration,20);
  element.currentTime=15;const version=engine.state.audioVersion;assert.equal(engine.elapsed(),5);
  engine.invalidateLyrics();assert.equal(engine.state.audioVersion,version);
  element.currentTime=20;element.dispatchEvent(new Event('seeked'));assert.equal(engine.state.audioVersion,version+1);assert.equal(engine.elapsed(),10);
  engine.togglePause();assert.equal(engine.state.paused,true);engine.togglePause();await settle();assert.equal(engine.state.paused,false);
  element.currentTime=30.2;h.time.advance(250);assert.equal(h.advances,1);engine.dispose();assert.equal(element.released,true);
});

test('pending pitch preparation cannot attach or start audio after Stop',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness();h.slowPitch=true;const engine=createPlayback(h.options);
  engine.load(song({url:'http://localhost:8000/song.mp4',pitch:2}));await settle();assert.equal(engine.state.pitchBusy,true);
  engine.stop();h.pitchGate.resolve();await settle();assert.equal(h.pitch.element,null);assert.equal(h.media[0].paused,true);
  assert.equal(engine.state.pitchBusy,false);assert.equal(h.time.jobs.size,0);engine.dispose();
});

test('end delay with tab audio advances once and is cancelled by switching tracks',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options);h.capture.active=true;h.capture.delay=.2;
  engine.load(song());await settle();h.players[0].change(0);assert.equal(h.advances,0);
  engine.load(song({title:'Second'}));await settle();h.time.advance(300);assert.equal(h.advances,0);
  h.players[1].change(0);h.time.advance(200);assert.equal(h.advances,1);h.time.advance(1000);assert.equal(h.advances,1);engine.dispose();
});

test('suspension keeps the player and position, then resumes without duplicate timers',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options);
  engine.load(song());await settle();h.time.advance(1000);const player=h.players[0];engine.suspend();engine.suspend();
  assert.equal(h.time.jobs.size,0);h.time.advance(10000);assert.equal(engine.elapsed(),1);
  engine.resume();engine.resume();await settle();assert.equal(h.players.length,1);assert.equal(h.players[0],player);assert.equal(h.time.jobs.size,1);
  h.time.advance(250);assert.equal(engine.elapsed(),1.25);engine.dispose({preserveCapture:true});assert.deepEqual(h.capture.disposed,{preserveCapture:true});
});

test('suspended countdown and MC use frozen monotonic anchors',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options);
  engine.load(song(),{countdown:3});await settle();h.time.advance(1000);engine.suspend();h.time.advance(10000);
  assert.equal(engine.state.countdownRemaining,2);engine.resume();h.time.advance(2000);assert.equal(engine.state.counting,false);
  engine.load({mc:1,memo:'Break',dur:30});h.time.advance(1000);engine.togglePause();h.time.advance(5000);assert.equal(engine.elapsed(),1);
  engine.togglePause();h.time.advance(250);assert.equal(engine.elapsed(),1.25);engine.dispose();
});

test('snapshots are read-only and lyric settings never reset the player',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options),seen=[];
  const unsub=engine.subscribe(state=>seen.push(state));engine.load(song());await settle();const player=h.players[0];
  const state=engine.getSnapshot();assert.equal(Object.isFrozen(state),true);assert.equal(state.playing,true);
  const version=state.audioVersion;engine.invalidateLyrics();engine.invalidateLyrics();assert.equal(engine.state.audioVersion,version);
  assert.equal(h.players[0],player);unsub();engine.dispose();assert.equal(h.time.jobs.size,0);
});

test('YouTube API loader shares one request and cleans up timeout/callback on cancellation',async()=>{
  const [,,,{createYouTubePlayer}]=await modules,time=virtualTime(),nodes=new Map();
  const previous=()=>{};let appends=0;
  const browser={onYouTubeIframeAPIReady:previous,...time.platform};
  const document={getElementById:id=>nodes.get(id),createElement:()=>({addEventListener(){},removeEventListener(){},remove(){nodes.delete(this.id)}}),
    head:{append(node){appends++;nodes.set(node.id,node)}}};
  const adapter=createYouTubePlayer({window:browser,document,root:()=>({replaceChildren(){}})});
  const a=new AbortController(),b=new AbortController();const first=adapter.ready(a.signal),second=adapter.ready(b.signal);
  assert.equal(appends,1);assert.equal(time.jobs.size,1);a.abort();assert.equal(await first,false);assert.equal(time.jobs.size,1);
  b.abort();assert.equal(await second,false);assert.equal(time.jobs.size,0);assert.equal(browser.onYouTubeIframeAPIReady,previous);
  const third=adapter.ready();browser.YT={Player:class{}};browser.onYouTubeIframeAPIReady();assert.equal(await third,true);
  assert.equal(time.jobs.size,0);assert.equal(browser.onYouTubeIframeAPIReady,previous);assert.equal(await adapter.ready(),true);
});

test('page restoration resumes a player whose API finished loading while suspended',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness();h.slowReady=true;const engine=createPlayback(h.options);
  engine.load(song());engine.suspend();h.pendingReady[0].job.resolve(true);await settle();
  assert.equal(h.players.length,1);assert.notEqual(h.players[0].getPlayerState(),1);
  engine.resume();await settle();assert.equal(h.players[0].getPlayerState(),1);assert.equal(engine.state.paused,false);
  engine.dispose();assert.equal(h.time.jobs.size,0);
});

test('suspension preserves a native audio route when its saved key has returned to zero',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness(),engine=createPlayback(h.options);
  engine.load(song({url:'http://localhost:8000/song.mp4',pitch:2}));await settle();
  const element=h.media[0];await engine.changeKey(0);assert.equal(h.pitch.element,element);
  engine.suspend();assert.equal(h.pitch.element,element);assert.equal(engine.state.activeTimers,0);
  engine.resume();await settle();assert.equal(h.pitch.element,element);assert.equal(element.paused,false);
  assert.equal(h.pitch.suspended,false);engine.dispose();
});

test('late pitch preparation errors from a suspended page cannot erase the saved key',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness();h.slowPitch=true;const engine=createPlayback(h.options);
  const item=song({url:'http://localhost:8000/song.mp4',pitch:2});engine.load(item);await settle();
  engine.suspend();h.pitchGate.reject(Error('Old preparation failed'));await settle();
  assert.equal(item.pitch,2);assert.equal(h.persists,0);assert.equal(h.media[0].paused,true);
  assert.equal(engine.state.pitchBusy,false);engine.dispose();assert.equal(h.time.jobs.size,0);
});

test('a player creation failure falls back without an unhandled asynchronous rejection',async()=>{
  const [{createPlayback}]=await modules,h=makeHarness();h.adapters.youtube.create=()=>{throw Error('API startup failed')};
  const engine=createPlayback(h.options);engine.load(song());await settle();
  assert.equal(engine.state.mode,'clk');assert.equal(h.adapters.youtube.fallbacks,1);
  assert.equal(h.time.jobs.size,1);engine.dispose();assert.equal(h.time.jobs.size,0);
});

test('a cancelled or timed-out API loader can retry with one script and timeout',async()=>{
  const [,,,{createYouTubePlayer}]=await modules,time=virtualTime(),nodes=new Map(),handlers=new Map();
  const browser={...time.platform};let appends=0;
  const document={getElementById:id=>nodes.get(id),createElement:()=>({addEventListener(type,handler){handlers.set(type,handler)},removeEventListener(type){handlers.delete(type)},remove(){nodes.delete(this.id)}}),head:{append(node){nodes.set(node.id,node);appends++}}};
  const adapter=createYouTubePlayer({window:browser,document,root:()=>({replaceChildren(){}})});
  const first=adapter.ready();time.advance(8000);assert.equal(await first,false);assert.equal(nodes.size,0);assert.equal(time.jobs.size,0);
  const second=adapter.ready();handlers.get('error')();assert.equal(await second,false);assert.equal(nodes.size,0);assert.equal(time.jobs.size,0);
  const third=adapter.ready();browser.YT={Player:class{}};browser.onYouTubeIframeAPIReady();assert.equal(await third,true);
  assert.equal(appends,3);assert.equal(time.jobs.size,0);assert.equal(handlers.size,0);
});
