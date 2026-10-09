/* Original Manokara layouts. Shared by the editor and both OBS outputs. */
(() => {
  'use strict';
  const themes = ['glass', 'paper', 'minimal', 'card', 'vinyl', 'signal'];
  const clone = value => JSON.parse(JSON.stringify(value));
  const number = (value, fallback, min, max) => Number.isFinite(Number(value)) ? Math.min(max, Math.max(min, Number(value))) : fallback;
  const color = (value, fallback) => /^#[\da-f]{6}$/i.test(value || '') ? value : fallback;
  function defaults(theme = 'glass') {
    const block = (x,y,w,h,size,label) => ({x,y,w,h,size,label,visible:true,align:'left',bold:false});
    const value = {version:1,width:1920,height:1080,lyric:{x:0,y:0,w:1920,h:1080,visible:true},
      playlist:{theme:themes.includes(theme)?theme:'glass',foreground:'#ffffff',accent:'#b9dcc7',background:'#15221d',opacity:.72,
        radius:22,font:'system',limit:8,listMode:'all',numbering:true,progress:true,hideIdle:false,
        blocks:{current:block(88,88,640,280,42,'Now Singing'),list:block(88,384,440,528,27,'Song List'),next:block(544,384,360,208,29,'Next On')}}};
    const p=value.playlist;
    if(theme==='paper'){p.foreground='#433c35';p.background='#faf3df';p.accent='#aa5139';p.opacity=.97;p.radius=3;p.font='serif';
      p.blocks={current:block(96,88,580,288,42,'Now Singing'),list:block(96,392,580,504,28,'Song List'),next:block(700,120,320,264,30,'Next On')}}
    if(theme==='minimal'){p.opacity=0;p.radius=0;p.font='geist';p.accent='#e4f0ca';
      p.blocks={current:block(96,96,760,248,52,'Now Singing'),list:block(96,360,560,528,30,'Song List'),next:block(96,912,760,112,28,'Next On')}}
    if(theme==='card'){p.accent='#dfc3f9';p.background='#211b32';p.radius=28;p.opacity=.93;
      p.blocks={current:block(96,88,460,580,38,'Now Singing'),list:block(580,88,460,580,27,'Song List'),next:block(96,692,460,164,29,'Next On')}}
    if(theme==='vinyl'){p.accent='#efca92';p.background='#29241f';p.opacity=.94;p.radius=18;
      p.blocks={current:block(96,88,940,336,42,'Now Singing'),list:block(96,448,520,504,27,'Song List'),next:block(640,448,396,208,30,'Next On')}}
    if(theme==='signal'){p.accent='#8ee3dd';p.background='#10282b';p.opacity=.92;p.radius=16;
      p.blocks={current:block(80,836,1100,164,38,'Now Singing'),list:block(80,216,560,580,28,'Song List'),next:block(1196,836,644,164,30,'Next On')};p.blocks.list.visible=false}
    return value;
  }
  function normalize(raw) {
    const d=defaults();let source=raw;
    try{if(typeof source==='string')source=JSON.parse(source)}catch(_){source=null}
    if(!source||typeof source!=='object')return d;
    d.width=Math.round(number(source.width,1920,320,3840));d.height=Math.round(number(source.height,1080,240,2160));
    function rect(raw,base){raw=raw||{};const w=number(raw.w,Math.min(base.w,d.width),32,d.width),h=number(raw.h,Math.min(base.h,d.height),32,d.height);return {...base,x:number(raw.x,Math.min(base.x,d.width-w),0,d.width-w),y:number(raw.y,Math.min(base.y,d.height-h),0,d.height-h),w,h,visible:raw.visible!==false}}
    d.lyric=rect(source.lyric,d.lyric);
    const p=source.playlist||{},out=d.playlist;
    out.theme=themes.includes(p.theme)?p.theme:'glass';out.foreground=color(p.foreground,out.foreground);out.accent=color(p.accent,out.accent);out.background=color(p.background,out.background);
    out.opacity=number(p.opacity,out.opacity,0,1);out.radius=number(p.radius,out.radius,0,80);
    out.font=['system','geist','serif','mono'].includes(p.font)?p.font:'system';
    out.limit=Math.round(number(p.limit,8,1,20));out.listMode=['all','upcoming','history'].includes(p.listMode)?p.listMode:'all';
    out.numbering=p.numbering!==false;out.progress=p.progress!==false;out.hideIdle=p.hideIdle===true;
    for(const key of ['current','list','next']){const b=p.blocks?.[key]||{},base=out.blocks[key];out.blocks[key]={...rect(b,base),size:number(b.size,base.size,12,96),label:String(b.label??base.label).slice(0,80),align:['left','center','right'].includes(b.align)?b.align:'left',bold:b.bold===true}}
    return d;
  }
  const geometry=(node,rect)=>Object.assign(node.style,{left:rect.x+'px',top:rect.y+'px',width:rect.w+'px',height:rect.h+'px'});
  function fit(stage,container,config){const scale=Math.min(container.clientWidth/config.width,container.clientHeight/config.height)||1;Object.assign(stage.style,{width:config.width+'px',height:config.height+'px',transform:'scale('+scale+')',left:(container.clientWidth-config.width*scale)/2+'px',top:(container.clientHeight-config.height*scale)/2+'px'});return scale}
  const fonts={system:'system-ui,"Yu Gothic",sans-serif',geist:'"Geist Variable",system-ui,sans-serif',serif:'Georgia,"Yu Mincho",serif',mono:'"Cascadia Code",Consolas,monospace'};
  function createPlaylist(stage) {
    const root=document.createElement('div');root.className='playlist-output';stage.appendChild(root);
    const nodes={};let lastConfig='',lastData='',config=defaults(),state={},progress,progressText,playbackMarker,pendingListFit=true;
    for(const key of ['current','list','next']){
      const node=document.createElement('section');node.className='playlist-block';node.dataset.block=key;
      const heading=document.createElement('h2'),content=document.createElement('div');content.className='playlist-content';node.append(heading,content);root.append(node);nodes[key]={node,heading,content};
    }
    const textNode=(tag,text,cls)=>{const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;return el};
    function fitList(){
      const {node,heading,content}=nodes.list;
      if(node.hidden){pendingListFit=false;return}if(!node.clientHeight)return;
      content.style.fontSize='';const style=getComputedStyle(node),head=getComputedStyle(heading);
      const available=node.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)-heading.offsetHeight-parseFloat(head.marginBottom);
      let size=config.playlist.blocks.list.size;
      for(let i=0;i<2&&available>0&&content.scrollHeight>available&&size>12;i++){size=Math.max(12,size*available/content.scrollHeight*.97);content.style.fontSize=size+'px'}
      pendingListFit=false;
    }
    function render(nextConfig,nextState){
      config=normalize(nextConfig);state=nextState||{};const p=config.playlist;
      const ckey=JSON.stringify(p);if(ckey!==lastConfig){lastConfig=ckey;pendingListFit=true;root.dataset.theme=p.theme;root.style.color=p.foreground;root.style.fontFamily=fonts[p.font];root.style.setProperty('--playlist-accent',p.accent);root.style.setProperty('--playlist-surface',p.background+Math.round(p.opacity*255).toString(16).padStart(2,'0'));root.style.setProperty('--playlist-radius',p.radius+'px');
        for(const [key,{node,heading}] of Object.entries(nodes)){const b=p.blocks[key];geometry(node,b);node.style.fontSize=b.size+'px';node.style.textAlign=b.align;node.style.fontWeight=b.bold?'700':'400';node.dataset.bold=String(b.bold);heading.textContent=b.label}}
      const active=!!state.now;root.hidden=p.hideIdle&&!active;
      for(const [key,{node}] of Object.entries(nodes))node.hidden=!p.blocks[key].visible;
      root.dataset.playing=state.status==='playing'?'true':'false';
      const marker=({playing:'●',paused:'Ⅱ',counting:'…',mc:'MC',ready:'○'})[state.status]||'○';
      if(playbackMarker&&playbackMarker.textContent!==marker)playbackMarker.textContent=marker;
      // Playback status only toggles CSS; it must not rebuild the record/artwork.
      const dkey=JSON.stringify([state.now,state.next,state.videoId,state.currentIndex,state.nextIndex,state.songs,state.history,p.theme,p.progress,p.numbering,p.listMode,p.limit]);
      if(dkey===lastData){if(pendingListFit)fitList();return}lastData=dkey;pendingListFit=true;
      const cur=nodes.current.content;cur.replaceChildren();progress=null;progressText=null;playbackMarker=null;
      if(['card','vinyl','signal'].includes(p.theme)){
        const art=document.createElement('div');art.className='playlist-art';
        const fallback=textNode('div','','playlist-art-fallback');fallback.setAttribute('aria-hidden','true');fallback.append(textNode('span','m','playlist-art-monogram'));art.append(fallback);
        if(/^[\w-]{11}$/.test(state.videoId||'')){const img=document.createElement('img');img.alt='';img.referrerPolicy='no-referrer';img.src='https://i.ytimg.com/vi/'+state.videoId+'/mqdefault.jpg';img.addEventListener('error',()=>img.remove(),{once:true});art.append(img)}cur.append(art);
      }
      cur.append(textNode('div',state.now||'—','playlist-song-title'));
      if(active){playbackMarker=textNode('small',marker,'playlist-state');cur.append(playbackMarker)}
      if(p.numbering&&state.currentIndex>=0)cur.append(textNode('small',String(state.currentIndex+1).padStart(2,'0'),'playlist-position'));
      if(p.progress){const row=textNode('div','','playlist-progress');progress=textNode('i','');row.append(progress);progressText=textNode('small','','playlist-time');cur.append(row,progressText)}
      let songs=Array.isArray(state.songs)?state.songs:[];
      if(p.listMode==='upcoming')songs=songs.filter(s=>s.index>=state.nextIndex&&state.nextIndex>=0);
      if(p.listMode==='history')songs=Array.isArray(state.history)?state.history:[];
      // Page the full list around the current item so later songs do not disappear.
      let start=0;if(p.listMode==='all'){const i=songs.findIndex(s=>s.index===state.currentIndex);if(i>=p.limit)start=Math.floor(i/p.limit)*p.limit}
      const list=nodes.list.content;list.replaceChildren();
      for(const song of songs.slice(start,start+p.limit)){const row=textNode('div','','playlist-list-row');row.dataset.current=String(song.index===state.currentIndex&&p.listMode!=='history');if(p.numbering)row.append(textNode('span',String(song.index+1).padStart(2,'0'),'playlist-index'));row.append(textNode('span',song.title,'playlist-list-title'));list.append(row)}
      if(!list.childNodes.length)list.append(textNode('div','—','playlist-empty'));
      nodes.next.content.replaceChildren(textNode('div',state.next||'—','playlist-song-title'));
      if(p.numbering&&state.nextIndex>=0)nodes.next.content.append(textNode('span',String(state.nextIndex+1).padStart(2,'0'),'playlist-next-number'));
      fitList();
    }
    function tick(time,duration){if(!progress)return;const seconds=Math.max(0,Number(time)||0),total=Math.max(0,Number(duration)||0);progress.style.transform='scaleX('+Math.min(1,total?seconds/total:0)+')';const format=n=>Math.floor(n/60)+':'+String(Math.floor(n%60)).padStart(2,'0');const value=format(seconds)+(total?' / '+format(total):'');if(progressText.textContent!==value)progressText.textContent=value}
    return {root,nodes,render,tick,destroy:()=>root.remove()};
  }
  window.ManokaraOverlay={themes,defaults,normalize,clone,geometry,fit,createPlaylist};
})();
