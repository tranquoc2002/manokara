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
 window.ManokaraLyricFX={play};
})();
