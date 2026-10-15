const {test}=require('node:test');
const assert=require('node:assert/strict');
const modules=Promise.all([import('../src/services/feature-store.mjs'),import('../src/app/feature-runtime.mjs'),import('../src/features/song-editor/draft.mjs'),import('../src/services/lifecycle.mjs')]);

test('feature snapshots are cached, changes are notified once, and unsubscribe/dispose are terminal',async()=>{
  const [{createFeatureStore}]=await modules,store=createFeatureStore({active:0,title:'Song'}),first=store.getSnapshot();let calls=0;
  const off=store.subscribe(()=>calls++);assert.equal(store.getSnapshot(),first);assert.equal(Object.isFrozen(first),true);
  store.patch({active:0});assert.equal(calls,0);assert.equal(store.getSnapshot(),first);
  store.patch({active:1});assert.equal(calls,1);assert.equal(first.active,0);assert.notEqual(store.getSnapshot(),first);
  off();store.patch({active:2});assert.equal(calls,1);store.dispose();const last=store.getSnapshot();store.patch({active:3});assert.equal(store.getSnapshot(),last);
});

test('late-bound commands keep handler identity, replace providers and do not call an old provider after cleanup',async()=>{
  const [{createCommandRegistry}]=await modules,commands=createCommandRegistry(),actions=commands.actions('editor');let a=0,b=0;
  const action=actions.save;assert.equal(action,actions.save);assert.equal(action(),undefined);
  const stopA=commands.bind('editor',{save:()=>++a});action();const stopB=commands.bind('editor',{save:()=>++b});stopA();action();
  assert.equal(a,1);assert.equal(b,1);stopB();action();assert.equal(b,1);commands.dispose();assert.equal(actions.then,undefined);
});

test('feature updates are isolated and rows do not share mutable playback song identity',async()=>{
  const [,{createFeatureRuntime}]=await modules,runtime=createFeatureRuntime();let setlistUpdates=0,panelUpdates=0;
  runtime.stores.setlist.subscribe(()=>setlistUpdates++);runtime.stores.playerPanel.subscribe(()=>panelUpdates++);
  const songs=[{title:'First',url:'https://example.com/1',lrc:'[00:01]One'},{title:'Second',url:'https://example.com/2'}];
  runtime.ui.updateSetlist(songs,songs[1],{},String);const view=runtime.stores.setlist.getSnapshot();assert.equal(view.currentIndex,1);
  songs[1].title='Edited';songs.reverse();assert.equal(view.songs[1].title,'Second');assert.equal(Object.isFrozen(view.songs[1]),true);
  runtime.ui.updatePlayerPanelState({time:'00:01'});runtime.ui.updatePlayerPanelState({time:'00:01'});assert.equal(setlistUpdates,1);assert.equal(panelUpdates,1);
  runtime.ui.updateLibrary(songs,{});songs[0].title='Again';assert.equal(runtime.stores.library.getSnapshot().songs[0].title,'Edited');
  const lines=[{t:1,s:'Hello'}];runtime.ui.updateLiveLyrics({lines});lines[0].s='Changed';assert.equal(runtime.stores.liveLyrics.getSnapshot().lines[0].s,'Hello');
  runtime.dispose();assert.equal(runtime.stores.setlist.subscriberCount,0);
});

test('drafts preserve incomplete form input, LRC tags and native newline semantics',async()=>{
  const [,,{createSongDraft}]=await modules,draft=createSongDraft();draft.patch({st:'00:',en:'',loff:'-',songKey:'',llrc:'[offset:20]\r\n[00:01.23]<00:01.24>君\r次',unknown:'discard'});
  assert.equal(draft.get('st'),'00:');assert.equal(draft.get('loff'),'-');assert.equal(draft.get('llrc'),'[offset:20]\n[00:01.23]<00:01.24>君\n次');assert.equal(draft.get('unknown'),undefined);
  const revision=draft.revision;draft.patch({lyricsStatus:'Loading',romanizeBusy:true});assert.equal(draft.revision,revision);
  draft.set('ttl','New draft');assert.equal(draft.revision,revision+1);draft.set('saving',true);draft.reset();assert.equal(draft.get('saving'),true);assert.equal(draft.get('llrc'),'');
});

test('lifecycle relistening and unlisten release matching guarded handlers without growing cleanup',async()=>{
  const [,,,{createLifecycle}]=await modules,scope=createLifecycle(),target=new EventTarget();let calls=0;const listener=()=>calls++;
  for(let i=0;i<10;i++){scope.listen(target,'test',listener,true);scope.listen(target,'test',listener,true);assert.equal(scope.cleanupCount,1);target.dispatchEvent(new Event('test'));scope.unlisten(target,'test',listener,true);assert.equal(scope.cleanupCount,0);}
  assert.equal(calls,10);scope.dispose();assert.equal(scope.cleanupCount,0);
});
