/* Manokara adapter for the JIZURA Canvas renderer; upstream modules are in manokara-jizura.js. */
(()=>{
 'use strict';
 let renderer=null,plan=null,planKey='',fontJob=null,sourceKey='',sourceLrc='';
 const hash=s=>{let h=2166136261;for(const c of String(s||'')){h^=c.codePointAt(0);h=Math.imul(h,16777619)}return h>>>0};
 const seeded=seed=>{let x=seed>>>0;return()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}};
 function lyricInput(raw,duration){
  const inputKey=String(raw||'')+'|'+duration;
  if(inputKey===sourceKey)return sourceLrc;
  sourceKey=inputKey;
  const parsed=ManokaraCore.parseLyrics(raw,duration).lines;
  if(!parsed.length)return sourceLrc='';
  return sourceLrc=parsed.map(line=>{const t=Math.max(0,line.t),m=Math.floor(t/60),s=(t%60).toFixed(3).padStart(6,'0');return `[${String(m).padStart(2,'0')}:${s}]${line.x}`}).join('\n');
 }
 function makePlan(s,raw,key,shape){
  const seed=hash((s.title||'')+'|'+raw+(s.themeSeed?'|'+s.themeSeed:'')),p=J.defaultProject();
  p.title='';p.artist='';p.lyrics=raw;p.aspect=shape==='tall'?'9:16':'16:9';p.res=720;p.lang='auto';p.keyBg=s.transparent===false?'green':null;
  p.extra=true;p.wa=true;p.horror=true;p.typo=true;p.kinetic=true;
  p.style=J.STYLE_ORDER[seed%J.STYLE_ORDER.length]||'noir';p.mood=null;p.seed=seed||1;
  p.timing=Object.assign({},p.timing,{offset:0,snap:false,tail:.2,lineScale:1});
  if(J.omakase)Object.assign(p,J.omakase(p,seeded(seed||1)));
  p.centerFree=!!s.centerFree;p.centerDir=shape==='tall'?'tb':'lr';
  planKey=key;plan=J.plan(p);
  const themes={white:{fg:'#FFFFFF',sub:'#D1D5DB',accent:'#FFFFFF',accent2:'#CBD5E1'},cyan:{fg:'#67E8F9',sub:'#CFFAFE',accent:'#22D3EE',accent2:'#A5F3FC'},rose:{fg:'#FDA4AF',sub:'#FFE4E6',accent:'#FB7185',accent2:'#FBCFE8'},amber:{fg:'#FCD34D',sub:'#FEF3C7',accent:'#F59E0B',accent2:'#FDE68A'},violet:{fg:'#C4B5FD',sub:'#EDE9FE',accent:'#A78BFA',accent2:'#DDD6FE'},mint:{fg:'#6EE7B7',sub:'#D1FAE5',accent:'#34D399',accent2:'#A7F3D0'}};
  const palette=themes[s.colorTheme];if(palette&&plan.style&&plan.style.schemes)plan.style={...plan.style,schemes:plan.style.schemes.map(sc=>Object.assign({},sc,palette,{ink:palette.fg,ghostA:palette.accent,ghostB:palette.accent2,grad:[palette.accent,palette.accent2]}))};
  if(p.centerFree&&plan.zones){
   for(const cut of plan.cuts){
    if(cut.line<0||cut.layout==='interlude'||!cut.zone||!cut.utext)continue;
    const zone=plan.zones[(cut.line|0)%2?1:0];cut.companion=null;cut.zone=Object.assign({},zone);
    cut.text=cut.utext;cut.lineText=cut.utext;cut.words=J.chunkText(cut.utext);
    const layout=J.LAYOUTS[cut.layout];if(layout&&layout.plan)cut.params=layout.plan(J.rng(J.h(cut.seed,23)),{text:cut.text,n:[...cut.text.replace(/\s+/g,'')].length,W:zone.w,H:zone.h,dur:cut.dur},plan.style);
   }
  }
  renderer=new J.Renderer();return raw;
 }
 function draw(canvas,s){
  if(!canvas||!s||!s.title||s.counting||s.mc||!s.lrc)return false;
  if(!window.J||!J.Renderer)return false;
  try{
   const shape=s.centerShape==='wide'||s.centerShape==='tall'?s.centerShape:(canvas.clientHeight>canvas.clientWidth*1.1?'tall':'wide');
   const raw=lyricInput(s.lrc,s.duration),key=(s.title||'')+'|'+raw+'|'+s.duration+'|'+shape+'|'+!!s.centerFree+'|'+!!s.transparent+'|'+s.colorTheme+'|'+s.themeSeed;
   if(key!==planKey){makePlan(s,raw,key,shape);canvas.width=plan.W;canvas.height=plan.H;
    fontJob=J.ensureFonts(raw,J.fontsOfPlan(plan)).catch(()=>{});
   }
   const ctx=canvas.getContext('2d',{alpha:true});
   const now=Number(s.time)||0,age=s.playing&&!s.paused?Math.max(0,(Date.now()-(Number(s.sampledAt)||Date.now()))/1000):0;
   renderer.frame(ctx,plan,now+age,{scale:canvas.width/plan.W,transparent:s.transparent!==false});
   return true;
  }catch(e){console.error('JIZURA renderer:',e);return false}
 }
 window.ManokaraJizura={draw};
})();
