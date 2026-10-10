/* Original Manokara layouts. Shared by the editor and both OBS outputs. */
(() => {
  'use strict';
  const themes = ['glass', 'paper', 'minimal', 'card', 'vinyl', 'signal'];
  const compactEffects=new Set(['tempera','sonnet','lumiere','hanabi','clean','word-pop','neon','glitch']);
  const compactLyrics=state=>compactEffects.has(state?.effect)&&!state.centerFree;
  const clone = value => JSON.parse(JSON.stringify(value));
  const number = (value, fallback, min, max) => Number.isFinite(Number(value)) ? Math.min(max, Math.max(min, Number(value))) : fallback;
  const color = (value, fallback) => /^#[\da-f]{6}$/i.test(value || '') ? value : fallback;
  function defaults(theme = 'glass') {
    const block = (x,y,w,h,size,label) => ({x,y,w,h,size,label,visible:true,align:'left',bold:false});
    const value = {version:1,width:1920,height:1080,lyric:{x:0,y:0,w:1920,h:1080,visible:true},lyricCompact:{x:160,y:800,w:1600,h:240,visible:true,autoFit:true},
      playlist:{theme:themes.includes(theme)?theme:'glass',foreground:'#ffffff',accent:'#b9dcc7',background:'#15221d',opacity:.72,
        radius:22,font:'system',limit:8,listMode:'all',numbering:true,progress:true,hideIdle:false,
        layout:'separate',group:{x:88,y:88,w:640,h:840,visible:true},autoScroll:false,scrollSpeed:24,scrollPause:2,
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
    d.lyricCompact={...rect(source.lyricCompact,d.lyricCompact),autoFit:source.lyricCompact?.autoFit!==false};
    const p=source.playlist||{},out=d.playlist;
    out.theme=themes.includes(p.theme)?p.theme:'glass';out.foreground=color(p.foreground,out.foreground);out.accent=color(p.accent,out.accent);out.background=color(p.background,out.background);
    out.opacity=number(p.opacity,out.opacity,0,1);out.radius=number(p.radius,out.radius,0,80);
    out.font=['system','geist','serif','mono'].includes(p.font)?p.font:'system';
    out.limit=Math.round(number(p.limit,8,1,20));out.listMode=['all','upcoming','history'].includes(p.listMode)?p.listMode:'all';
    out.numbering=p.numbering!==false;out.progress=p.progress!==false;out.hideIdle=p.hideIdle===true;
    out.layout=p.layout==='unified'?'unified':'separate';out.group=rect(p.group,out.group);
    out.autoScroll=p.autoScroll===true;out.scrollSpeed=number(p.scrollSpeed,24,8,80);out.scrollPause=number(p.scrollPause,2,0,10);
    for(const key of ['current','list','next']){const b=p.blocks?.[key]||{},base=out.blocks[key];out.blocks[key]={...rect(b,base),size:number(b.size,base.size,12,96),label:String(b.label??base.label).slice(0,80),align:['left','center','right'].includes(b.align)?b.align:'left',bold:b.bold===true}}
    return d;
  }
  const geometry=(node,rect)=>Object.assign(node.style,{left:rect.x+'px',top:rect.y+'px',width:rect.w+'px',height:rect.h+'px'});
  let measureCanvas,measurementKey='',measurement;
  document.fonts?.addEventListener('loadingdone',()=>{measurementKey=''});
  // Measure the entire lyric text, not each displayed line, so motion never
  // changes the editing frame during playback. The same rule serves OBS.
  function lyricRect(config,state){
    if(!compactLyrics(state))return config.lyric;
    const base=config.lyricCompact;if(!base.autoFit)return base;
    const [family,...variants]=String(state.googleFont||'').split(':'),variant=variants.join(':');
    const fontHref=family&&(!variant||/^[\w;@_-]+$/.test(variant))?'https://fonts.googleapis.com/css2?family='+encodeURIComponent(family).replace(/%20/g,'+')+(variant?':'+variant:'')+'&display=swap':'';
    const oldFont=document.getElementById('manokara-measure-font');
    if(fontHref){if(!oldFont||oldFont.getAttribute('href')!==fontHref){const link=oldFont||document.createElement('link');link.id='manokara-measure-font';link.rel='stylesheet';link.href=fontHref;if(!oldFont)document.head.append(link)}}else oldFont?.remove();
    const size=Math.max(24,Math.min(160,Number(state.size)||64));
    const key=JSON.stringify([config.width,config.height,state.lrc,state.romajiLrc,state.title,state.font,state.googleFont,state.bold,size]);
    if(key!==measurementKey){
      measurementKey=key;measureCanvas??=document.createElement('canvas');const ctx=measureCanvas.getContext('2d');
      const font=state.font||'system-ui,"Yu Gothic",sans-serif',weight=state.bold===false?400:800;
      const texts=ManokaraCore.parseLyrics(state.lrc||'',state.duration).lines.map(line=>line.x).filter(Boolean);
      if(!texts.length)texts.push(state.title||'Your song, your stage');
      const secondary=ManokaraCore.parseLyrics(state.romajiLrc||'',state.duration).lines.map(line=>line.x).filter(Boolean);
      const pad=Math.ceil(size*.65),limit=Math.max(80,config.width*.92-pad*2);
      ctx.font=weight+' '+size+'px '+font;
      const widest=Math.max(...texts.map(text=>ctx.measureText(text).width),...secondary.map(text=>ctx.measureText(text).width*.48));
      const w=Math.min(config.width,Math.max(160,Math.min(limit,widest)+pad*2)),contentW=Math.max(1,w-pad*2);
      function rows(text,multiplier){ctx.font=weight+' '+size*multiplier+'px '+font;let count=1,used=0;
        for(const token of text.split(/(\s+)/)){const width=ctx.measureText(token).width;if(used&&used+width>contentW){count++;used=0}if(width>contentW){count+=Math.ceil(width/contentW)-1;used=width%contentW}else used+=width}return count}
      const currentRows=Math.max(...texts.map(text=>rows(text,1))),previousRows=texts.length>1?Math.max(...texts.map(text=>rows(text,.55))):0;
      const romajiRows=secondary.length?Math.max(...secondary.map(text=>rows(text,.48))):0;
      const h=Math.min(config.height,Math.max(96,Math.ceil(pad*2+size*1.15*(currentRows+previousRows*.55+romajiRows*.48)+size*.4*((previousRows?1:0)+(romajiRows?1:0)))));
      measurement={w,h};
    }
    const {w,h}=measurement;
    return {...base,w,h,x:Math.max(0,Math.min(config.width-w,base.x+(base.w-w)/2)),y:Math.max(0,Math.min(config.height-h,base.y+base.h-h))};
  }
  function fit(stage,container,config){const scale=Math.min(container.clientWidth/config.width,container.clientHeight/config.height)||1;Object.assign(stage.style,{width:config.width+'px',height:config.height+'px',transform:'scale('+scale+')',left:(container.clientWidth-config.width*scale)/2+'px',top:(container.clientHeight-config.height*scale)/2+'px'});return scale}
  const fonts={system:'system-ui,"Yu Gothic",sans-serif',geist:'"Geist Variable",system-ui,sans-serif',serif:'Georgia,"Yu Mincho",serif',mono:'"Cascadia Code",Consolas,monospace'};
  function createPlaylist(stage) {
    const root=document.createElement('div');root.className='playlist-output';stage.appendChild(root);
    const group=document.createElement('div');group.className='playlist-group';root.append(group);
    const nodes={};let lastConfig='',lastData='',lastList='',config=defaults(),state={},progress,progressText,playbackMarker,pendingListFit=true,scrollAnimation,scrollKey='';
    const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
    for(const key of ['current','list','next']){
      const node=document.createElement('section');node.className='playlist-block';node.dataset.block=key;
      const heading=document.createElement('h2'),content=document.createElement('div');content.className='playlist-content';node.append(heading,content);root.append(node);nodes[key]={node,heading,content};
    }
    const textNode=(tag,text,cls)=>{const el=document.createElement(tag);el.textContent=text;if(cls)el.className=cls;return el};
    const track=document.createElement('div');track.className='playlist-list-track';nodes.list.content.append(track);
    function place(nextConfig){
      const p=nextConfig.playlist,unified=p.layout==='unified';root.dataset.layout=p.layout;group.hidden=!unified;
      if(unified){
        Object.assign(group.style,{left:p.group.x+'px',top:p.group.y+'px',width:'640px',height:'840px',transform:'scale('+p.group.w/640+','+p.group.h/840+')'});
        const visible=['current','list','next'].filter(key=>p.blocks[key].visible);
        let y=0;const heights={current:280,next:160};const fixed=visible.reduce((n,key)=>n+(heights[key]||0),0);
        for(const key of ['current','list','next']){const node=nodes[key].node;if(node.parentElement!==group)group.append(node);const h=key==='list'?840-fixed:key==='current'&&!visible.includes('list')?840-(visible.includes('next')?160:0):heights[key];geometry(node,{x:0,y,w:640,h:visible.length===1?840:h});if(p.blocks[key].visible)y+=visible.length===1?840:h}
      }else for(const [key,{node}] of Object.entries(nodes)){if(node.parentElement!==root)root.append(node);geometry(node,p.blocks[key])}
    }
    function stopScroll(){scrollAnimation?.cancel();scrollAnimation=null;scrollKey='';track.style.transform=''}
    function fitList(){
      const {node,heading,content}=nodes.list;
      if(node.hidden){pendingListFit=false;return}if(!node.clientHeight)return;
      content.style.fontSize='';content.style.height='';const style=getComputedStyle(node),head=getComputedStyle(heading);
      const available=node.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)-heading.offsetHeight-parseFloat(head.marginBottom);
      if(config.playlist.autoScroll&&!reducedMotion.matches){
        content.style.height=Math.max(0,available)+'px';content.dataset.scroll='true';
        const distance=Math.max(0,track.scrollHeight-Math.max(0,available));
        if(distance>1){
          const p=config.playlist,key=JSON.stringify([distance,p.scrollSpeed,p.scrollPause]);
          if(key!==scrollKey){const phase=scrollAnimation?((scrollAnimation.currentTime||0)/scrollAnimation.effect.getTiming().duration)%1:0;stopScroll();scrollKey=key;
            const travel=distance/p.scrollSpeed,hold=p.scrollPause,total=2*(travel+hold),bottom='translateY(-'+distance+'px)';
            scrollAnimation=track.animate([{transform:'translateY(0)',offset:0},{transform:'translateY(0)',offset:hold/total},{transform:bottom,offset:(hold+travel)/total},{transform:bottom,offset:(2*hold+travel)/total},{transform:'translateY(0)',offset:1}],{duration:total*1000,iterations:Infinity,easing:'linear'});scrollAnimation.currentTime=phase*total*1000;
          }
        }else stopScroll();
      }else{
        delete content.dataset.scroll;stopScroll();
      let size=parseFloat(getComputedStyle(node).fontSize);
      for(let i=0;i<2&&available>0&&content.scrollHeight>available&&size>12;i++){size=Math.max(12,size*available/content.scrollHeight*.97);content.style.fontSize=size+'px'}
      }
      pendingListFit=false;
    }
    function render(nextConfig,nextState){
      config=normalize(nextConfig);state=nextState||{};const p=config.playlist;
      const ckey=JSON.stringify(p);if(ckey!==lastConfig){lastConfig=ckey;pendingListFit=true;root.dataset.theme=p.theme;root.style.color=p.foreground;root.style.fontFamily=fonts[p.font];root.style.setProperty('--playlist-accent',p.accent);root.style.setProperty('--playlist-surface',p.background+Math.round(p.opacity*255).toString(16).padStart(2,'0'));root.style.setProperty('--playlist-radius',p.radius+'px');
        place(config);for(const [key,{node,heading}] of Object.entries(nodes)){const b=p.blocks[key];const fontScale=p.layout==='unified'?Math.min(config.width/1920,config.height/1080):1;node.style.fontSize=b.size/fontScale+'px';node.style.textAlign=b.align;node.style.fontWeight=b.bold?'700':'400';node.dataset.bold=String(b.bold);heading.textContent=b.label}}
      const active=!!state.now;root.hidden=(p.hideIdle&&!active)||(p.layout==='unified'&&(!p.group.visible||!Object.values(p.blocks).some(b=>b.visible)));
      for(const [key,{node}] of Object.entries(nodes))node.hidden=!p.blocks[key].visible;
      root.dataset.playing=state.status==='playing'?'true':'false';
      const marker=({playing:'●',paused:'Ⅱ',counting:'…',mc:'MC',ready:'○'})[state.status]||'○';
      if(playbackMarker&&playbackMarker.textContent!==marker)playbackMarker.textContent=marker;
      // Playback status only toggles CSS; it must not rebuild the record/artwork.
      const scrolling=p.autoScroll&&!reducedMotion.matches;
      const dkey=JSON.stringify([state.now,state.next,state.videoId,state.currentIndex,state.nextIndex,state.songs,state.history,p.theme,p.progress,p.numbering,p.listMode,p.limit,scrolling]);
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
      const visibleSongs=scrolling?songs.slice(0,120):songs.slice(start,start+p.limit);
      const listKey=JSON.stringify([visibleSongs,p.numbering]);
      if(listKey!==lastList){lastList=listKey;stopScroll();track.replaceChildren();
        for(const song of visibleSongs){const row=textNode('div','','playlist-list-row');row.dataset.index=String(song.index);if(p.numbering)row.append(textNode('span',String(song.index+1).padStart(2,'0'),'playlist-index'));row.append(textNode('span',song.title,'playlist-list-title'));track.append(row)}
        if(!track.childNodes.length)track.append(textNode('div','—','playlist-empty'));
      }
      for(const row of track.querySelectorAll('.playlist-list-row'))row.dataset.current=String(Number(row.dataset.index)===state.currentIndex&&p.listMode!=='history');
      nodes.next.content.replaceChildren(textNode('div',state.next||'—','playlist-song-title'));
      if(p.numbering&&state.nextIndex>=0)nodes.next.content.append(textNode('span',String(state.nextIndex+1).padStart(2,'0'),'playlist-next-number'));
      fitList();
    }
    function tick(time,duration){if(!progress)return;const seconds=Math.max(0,Number(time)||0),total=Math.max(0,Number(duration)||0);progress.style.transform='scaleX('+Math.min(1,total?seconds/total:0)+')';const format=n=>Math.floor(n/60)+':'+String(Math.floor(n%60)).padStart(2,'0');const value=format(seconds)+(total?' / '+format(total):'');if(progressText.textContent!==value)progressText.textContent=value}
    const motionChange=()=>{lastData='';pendingListFit=true;render(config,state)};reducedMotion.addEventListener('change',motionChange);
    return {root,nodes,render,tick,place,destroy:()=>{stopScroll();reducedMotion.removeEventListener('change',motionChange);root.remove()}};
  }
  window.ManokaraOverlay={themes,defaults,normalize,clone,geometry,fit,createPlaylist,compactLyrics,lyricRect};
})();
