/* Lightweight lyric motion presets for Manokara green-screen output. */
(()=>{
 const names=new Set(['clean','word-pop','neon','glitch','tempera','sonnet','lumiere','hanabi']);
 function play(node,text,effect){
  if(!node)return;
  effect=names.has(effect)?effect:'clean';
  const cls='fx-'+effect;
  node.className='c '+cls;
  node.replaceChildren();
  if(effect==='clean')node.textContent=text;
  else if(effect==='hanabi'){
   let index=0;
   for(const ch of Array.from(String(text||''))){
    if(/\s/.test(ch)){node.append(document.createTextNode(ch));continue}
    const span=document.createElement('span');span.className='fx-char';span.textContent=ch;
    span.style.setProperty('--i',Math.min(index++,32));node.append(span);
   }
  }
  else {
   const words=String(text||'').split(/(\s+)/);let index=0;
   for(const part of words){
    if(!part)continue;
    if(/^\s+$/.test(part)){node.append(document.createTextNode(part));continue}
    const span=document.createElement('span');span.className='fx-word';span.textContent=part;
    span.style.setProperty('--i',Math.min(index,12));
    span.style.animationDelay=Math.min(index*(effect==='sonnet'?95:effect==='tempera'?48:effect==='lumiere'?82:75),720)+'ms';node.append(span);index++;
   }
  }
  void node.offsetWidth;
 }
 // The classic sweep is driven by the shared playback clock, never a new timer
 // per word. Pausing, seeking and relay updates therefore preserve its position.
 function createClassic(host){
  const root=document.createElement('div');root.className='classic-karaoke';root.hidden=true;host.append(root);
  const slots=[0,1].map(index=>{const row=document.createElement('div');row.className='classic-row';row.dataset.row=String(index);const content=document.createElement('div');content.className='classic-line';row.append(content);root.append(row);return{row,content,key:'',words:[],fitKey:''}});
  const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter(undefined,{granularity:'word'}):null;
  let parsed='',entries=[],byRaw=new Map(),layoutKey='';
  const fontsChanged=()=>{for(const slot of slots)slot.fitKey=''};document.fonts?.addEventListener('loadingdone',fontsChanged);
  const clamp=value=>Math.max(0,Math.min(1,value));
  function parts(text){return segmenter?[...segmenter.segment(text)].map(part=>part.segment):(text.match(/\s+|[^\s]+/gu)||[])}
  function compile(lines,duration){
   entries=[];byRaw=new Map();
   lines.forEach((line,rawIndex)=>{
    if(!line.x)return;
    const end=Math.max(line.t+.01,lines[rawIndex+1]?.t??(duration>line.t?duration:line.t+5));
    const exact=line.words?.length&&line.words.map(word=>word.x).join('').trim()===line.x&&line.words.every((word,i)=>i===0||word.t>=line.words[i-1].t);
    const spans=exact?line.words.map((word,i)=>({text:i===0?word.x.trimStart():i===line.words.length-1?word.x.trimEnd():word.x,start:Math.max(line.t,Math.min(end,word.t)),end:Math.max(line.t,Math.min(end,line.words[i+1]?.t??end))})):[{text:line.x,start:line.t,end}];
    const tokens=[];
    for(const span of spans){const chunks=parts(span.text),weights=chunks.map(text=>Math.max(.2,Array.from(text.normalize('NFC')).length*(/^\s+$/.test(text)?.35:1))),total=weights.reduce((a,b)=>a+b,0);let cursor=0;
     chunks.forEach((text,i)=>{const start=span.start+(span.end-span.start)*cursor/total;cursor+=weights[i];tokens.push({text,start,end:span.start+(span.end-span.start)*cursor/total})});
    }
    const entry={rawIndex,index:entries.length,text:line.x,start:line.t,end,tokens};entries.push(entry);byRaw.set(rawIndex,entry);
   });
  }
  function fill(slot,entry){
   const key=entry?entry.rawIndex+'|'+entry.text:'';slot.row.hidden=!entry;if(key===slot.key)return;slot.key=key;slot.fitKey='';slot.words=[];slot.content.replaceChildren();
   if(!entry)return;
   for(const token of entry.tokens){
    if(/^\s+$/.test(token.text)){slot.content.append(document.createTextNode(token.text));continue}
    const word=document.createElement('span');word.className='classic-word';
    const base=document.createElement('span');base.className='classic-base';base.textContent=token.text;
    const paint=document.createElement('span');paint.className='classic-fill';paint.textContent=token.text;paint.setAttribute('aria-hidden','true');word.append(base,paint);slot.content.append(word);slot.words.push({...token,paint,last:-1});
   }
  }
  function fit(slot,size){
   if(slot.row.hidden)return;const key=[slot.key,layoutKey].join('|');if(key===slot.fitKey)return;
   if(!slot.row.clientWidth||!slot.row.clientHeight)return;
   slot.content.style.fontSize=size+'px';let font=size;
   for(let i=0;i<3;i++){const ratio=Math.min(1,slot.row.clientWidth/Math.max(1,slot.content.scrollWidth),slot.row.clientHeight/Math.max(1,slot.content.scrollHeight));if(ratio>=.99)break;font=Math.max(9,font*ratio*.96);slot.content.style.fontSize=font+'px'}
   slot.fitKey=key;
  }
  function draw(state,lines,time,shape,highlight){
   root.hidden=false;
   const key=(state.lrc||'')+'|'+state.duration;
   if(key!==parsed){parsed=key;compile(lines,Number(state.duration)||0);for(const slot of slots)slot.key='!'}
   const size=Math.max(9,(Number(state.size)||64)*Math.min(innerWidth/1920,innerHeight/1080));
   const nextLayout=[innerWidth,innerHeight,state.centerFree,shape,size,state.font,state.bold,highlight].join('|');
   if(nextLayout!==layoutKey){layoutKey=nextLayout;root.dataset.center=state.centerFree?'on':'off';root.dataset.shape=shape;root.style.setProperty('--classic-highlight',highlight)}
   let low=0,high=lines.length;while(low<high){const mid=(low+high)>>>1;if(lines[mid].t<=time)low=mid+1;else high=mid}
   const current=byRaw.get(low-1),chosen=[null,null];let activeIndex=current?.index??0;
   if(current&&time<current.end){chosen[current.index%2]=current;const next=entries[current.index+1];if(next)chosen[1-current.index%2]=next}
   else{let a=0,b=entries.length;while(a<b){const mid=(a+b)>>>1;if(entries[mid].start<=time)a=mid+1;else b=mid}const next=entries[a];if(next&&next.start-time<=5){activeIndex=next.index;chosen[next.index%2]=next;if(entries[a+1])chosen[1-next.index%2]=entries[a+1]}}
   slots.forEach((slot,index)=>{fill(slot,chosen[index]);fit(slot,size);for(const word of slot.words){const amount=time<word.start?0:word.end<=word.start?1:clamp((time-word.start)/(word.end-word.start));const percent=Math.round(amount*1000)/10;if(percent!==word.last){word.paint.style.clipPath='inset(0 '+(100-percent)+'% 0 0)';word.last=percent}}});
   return activeIndex;
  }
  return{draw,hide(){root.hidden=true},destroy(){document.fonts?.removeEventListener('loadingdone',fontsChanged);root.remove()}};
 }
 window.ManokaraLyricFX={play,createClassic};
})();
