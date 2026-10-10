/* One relay connection per output. Embedded lyric effects share its clock feed. */
(() => {
  'use strict';
  const query=new URL(location.href).searchParams,room=query.get('room')||'',token=new URLSearchParams(location.hash.slice(1)).get('view')||'';
  const kind=document.body.dataset.output||'lyrics',stage=document.getElementById('overlayStage'),clock=ManokaraCore.createClock(),subscribers=new Set();
  const popup=query.get('popup')==='1';document.body.dataset.popup=String(popup);document.body.dataset.transparent='true';
  let state=null,config=ManokaraOverlay.defaults(),directAt=-Infinity,revoked=false,layoutKey='';
  const playlist=kind==='playlist'?ManokaraOverlay.createPlaylist(stage):null;
  let frame;
  if(!playlist){frame=document.createElement('iframe');frame.id='lyricViewport';frame.title='Lyrics';frame.allow='autoplay';frame.src='./manokara-lyrics-view.html?room='+encodeURIComponent(room)+'#view='+encodeURIComponent(token);stage.append(frame)}
  const fresh=()=>state?{...state,time:clock.time(),sampledAt:Date.now(),stateAgeMs:0,countdownRemaining:clock.countdown()}:null;
  window.ManokaraOutput={room,time:()=>clock.time(),getSnapshot:fresh,audio:()=>state?.playing&&!state.paused&&clock.age()<1000?state:null,subscribe(fn){subscribers.add(fn);if(state)fn(fresh());return()=>subscribers.delete(fn)}};
  function arrange(){ManokaraOverlay.fit(stage,document.documentElement,config);if(frame){const rect=ManokaraOverlay.lyricRect(config,state);ManokaraOverlay.geometry(frame,rect);frame.hidden=!rect.visible}}
  function accept(next,delay=0){
    state=next?.ready===false?null:clock.accept(next,performance.now(),delay);
    const transparent=kind==='playlist'||state?.transparent!==false;document.body.dataset.transparent=String(transparent);
    if(popup)document.body.style.backgroundColor=transparent?'transparent':state.background||'#00ff00';
    if(state)state.playlistTime=(next.playlistTime||0)+(state.time-(next.time||0));
    const value=state?.overlay||'';if(value!==layoutKey){layoutKey=value;config=ManokaraOverlay.normalize(value);if(playlist)arrange()}
    if(frame)arrange();
    for(const fn of subscribers)fn(fresh()||{ready:false});
    if(playlist){let data={};try{data=JSON.parse(state?.playlist||'{}')}catch(_){}playlist.render(config,data);if(!state)playlist.root.hidden=true}
  }
  const url=new URL('/__lyric-state',location.href);url.searchParams.set('room',room);
  ManokaraRelay.connect({url:url.href,token,receive(next,delay){if(performance.now()-directAt>750)accept(next,delay)},revoked(){revoked=true;directAt=-Infinity;accept({ready:false});document.getElementById('viewerStatus').textContent='OBS link expired or revoked. Copy a new link from Manokara.'}});
  try{const channel=new BroadcastChannel('manokara-live-'+room+'-'+token);channel.onmessage=({data})=>{if(revoked||!data?.snapshot)return;directAt=performance.now();accept(data.snapshot,Math.max(0,Math.min(200,Date.now()-Number(data.sentAt||Date.now()))))};window.addEventListener('pagehide',()=>channel.close(),{once:true})}catch(_){}
  function tick(){if(playlist&&state)playlist.tick((state.playlistTime||0)+(clock.time()-(state.time||0)),state.duration);requestAnimationFrame(tick)}
  requestAnimationFrame(tick);setInterval(()=>{if(document.hidden&&playlist&&state)playlist.tick((state.playlistTime||0)+(clock.time()-(state.time||0)),state.duration)},200);
  window.addEventListener('resize',arrange);arrange();
})();
