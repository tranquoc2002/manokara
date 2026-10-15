/* Shared DOM renderer. Build the standalone OBS asset with npm run build:overlay. */
import { themes, compactLyrics, clone, defaults, normalize } from '../domain/overlay-layout.mjs';
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
