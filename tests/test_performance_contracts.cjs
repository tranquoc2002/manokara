const test = require('node:test');
const assert = require('node:assert/strict');
const modules = Promise.all([import('../src/domain/relay-packet.mjs')]);
const scene = () => ({writerId:'writer-A',ready:true,title:'Same song',lrc:'[00:01.23]<00:01.24>歌',
  romajiLrc:'',effect:'clean',time:1,playlistTime:1,sampledAt:1000,timelineVersion:1,
  playing:true,paused:false,counting:false,countdownRemaining:0,uploadDelayMs:10,
  audioPower:0,audioBass:0,audioLowMid:0,audioMid:0,audioVocal:0,audioTreble:0,
  overlay:'layout-v1',playlist:'same playlist'});

test('relay sends a full scene on first send and every static change', async () => {
  const [{createRelayPacket}] = await modules, before=scene();
  const first=createRelayPacket(before,null);assert.equal(first.partial,false);assert.equal(first.packet,before);
  for(const key of ['title','lrc','romajiLrc','effect','timelineVersion','overlay','playlist']) {
    const next={...before,[key]:key==='timelineVersion'?2:'changed'};
    assert.equal(createRelayPacket(next,before).partial,false,key);
  }
});
test('relay patches include the writer and only changed dynamic fields; merging reproduces the full scene', async () => {
  const [{createRelayPacket}] = await modules, before=scene(),next={...before,time:1.2,playlistTime:1.2,sampledAt:1200};
  const {partial,packet}=createRelayPacket(next,before);
  assert.equal(partial,true);assert.deepEqual(packet,{writerId:'writer-A',time:1.2,playlistTime:1.2,sampledAt:1200});
  assert.deepEqual({...before,...packet},next);
  assert.deepEqual(createRelayPacket(before,before).packet,{writerId:'writer-A'});
  Object.freeze(before);Object.freeze(next);
  assert.doesNotThrow(()=>createRelayPacket(next,before));
});
test('pause/countdown/audio values including zeros remain authoritative, based on the last acknowledged scene', async () => {
  const [{createRelayPacket}] = await modules, before=scene();
  const changed={...before,playing:false,paused:true,counting:true,countdownRemaining:4,audioPower:.9,audioBass:.5};
  const first=createRelayPacket(changed,before);assert.deepEqual({...before,...first.packet},changed);
  const reset={...changed,playing:true,paused:false,counting:false,countdownRemaining:0,audioPower:0,audioBass:0};
  const second=createRelayPacket(reset,changed);assert.deepEqual({...changed,...second.packet},reset);
  // A request that has not been acknowledged never becomes the comparison baseline.
  const latest={...before,time:2};assert.deepEqual({...before,...createRelayPacket(latest,before).packet},latest);
});
test('added and removed fields force full replacement instead of leaving stale merged state', async () => {
  const [{createRelayPacket}] = await modules, before=scene(),removed={...before};delete removed.lrc;
  assert.equal(createRelayPacket(removed,before).partial,false);
  const swapped={...removed,newField:'x'};assert.equal(Object.keys(swapped).length,Object.keys(before).length);
  assert.equal(createRelayPacket(swapped,before).partial,false);
  assert.equal(createRelayPacket({...before,memo:'Added'},before).partial,false);
  // Clearing the acknowledged scene after HTTP 428/restart forces the next complete scene.
  assert.equal(createRelayPacket(before,null).partial,false);
});
