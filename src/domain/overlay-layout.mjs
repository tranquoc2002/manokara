/** Version 1 layout schema shared by Studio and the independent OBS renderers. */
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

export { themes, compactLyrics, clone, defaults, normalize };
