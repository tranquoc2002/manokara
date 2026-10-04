/* Runs entirely in a local worker; no lyrics are sent to a third-party API. */
importScripts('./romaji-assets/kuroshiro-kuromoji-1.2.0-1.1.0.min.js', './manokara-lyrics.js');
let engineReady;
const cache=new Map();
function engine() {
  if(!engineReady)engineReady=(async()=>{
    const {Kuroshiro,KuromojiAnalyzer}=ManokaraJapanese;
    const converter=new Kuroshiro();
    // kuromoji uses POSIX path.join, so use a same-origin path rather than an absolute URL.
    await converter.init(new KuromojiAnalyzer({dictPath:new URL('./romaji-assets/ipadic-0.1.2/',self.location.href).pathname}));
    return converter;
  })().catch(error=>{engineReady=null;throw error});
  return engineReady;
}
self.onmessage=async({data})=>{
  const {id,source}=data;
  if(typeof source!=='string'||source.length>200000){self.postMessage({id,error:'Lyrics exceed the 200,000-character limit.'});return}
  try {
    self.postMessage({id,progress:0,loading:true});
    const converter=await engine();
    const lrc=await ManokaraLyrics.romanize(source,async text=>{
      if(cache.has(text))return cache.get(text);
      const result=await converter.convert(text,{to:'romaji',mode:'spaced',romajiSystem:'hepburn'});
      if(cache.size>=1024)cache.delete(cache.keys().next().value);
      cache.set(text,result);return result;
    },progress=>self.postMessage({id,progress}));
    if(lrc.length>200000)throw Error('Generated Romaji exceeds 200,000 characters. Shorten the lyric input.');
    self.postMessage({id,lrc});
  } catch(error){self.postMessage({id,error:String(error.message||error)})}
};
