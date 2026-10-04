/* Lossless LRC text conversion: timeline tokens are immutable, including Enhanced LRC. */
(() => {
  'use strict';
  const japanese = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヵヶ]/u;
  const japaneseRun = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヵヶ]+/gu;
  const protectedTokens = () => /\[[^\]\r\n]*\]|<\d{1,3}:\d{2}(?:[.:]\d+)?\s*>/g;
  const splitLines = value => String(value || '').split(/\r\n|\r|\n/);
  function textParts(line) {
    const parts = []; let start = 0;
    for (const match of line.matchAll(protectedTokens())) {
      parts.push({text:line.slice(start,match.index), token:false}, {text:match[0], token:true});
      start = match.index + match[0].length;
    }
    parts.push({text:line.slice(start),token:false});
    return parts;
  }
  function alignmentError(source, candidate) {
    const a=splitLines(source), b=splitLines(candidate);
    if(a.length!==b.length)return 'Keep the same number of lines as the original LRC.';
    for(let i=0;i<a.length;i++) {
      const tags = line => [...line.matchAll(protectedTokens())].map(m=>m[0]);
      const text = line => textParts(line).filter(p=>!p.token).map(p=>p.text).join('').trim();
      if(JSON.stringify(tags(a[i]))!==JSON.stringify(tags(b[i])))return `Line ${i+1}: keep every timestamp and metadata tag unchanged.`;
      if(Boolean(text(a[i]))!==Boolean(text(b[i])))return `Line ${i+1}: keep blank lyric gaps unchanged.`;
    }
    return '';
  }
  async function romanize(source, convert, progress=()=>{}) {
    const pieces=String(source).split(/(\r\n|\r|\n)/), result=[];
    for(let i=0;i<pieces.length;i++) {
      if(/^(?:\r\n|\r|\n)$/.test(pieces[i])){result.push(pieces[i]);continue}
      const out=[];
      const parts=textParts(pieces[i]);
      for(let j=0;j<parts.length;j++) {
        const part=parts[j];
        if(part.token||!japanese.test(part.text)){out.push(part.text);continue}
        let start=0;
        // Only Japanese runs are converted. English, punctuation and LRC tags remain byte-for-byte.
        for(const match of part.text.matchAll(japaneseRun)) {
          out.push(part.text.slice(start,match.index),await convert(match[0]));start=match.index+match[0].length;
        }
        out.push(part.text.slice(start));
        // Word-tag boundaries need a separator after romanization (Japanese normally has no spaces).
        if(/^<\d/.test(parts[j+1]?.text||'')&&japanese.test(part.text.slice(-1)))out.push(' ');
      }
      result.push(out.join(''));
      if(i%20===0)progress(Math.round((i+1)/pieces.length*100));
    }
    const value=result.join(''), error=alignmentError(source,value);
    if(error)throw Error(error);
    return value;
  }
  const validated=new WeakMap();
  function validRomaji(item) {
    if(!item||typeof item!=='object')return false;
    const romaji=item.romaji;
    if(!romaji||romaji.source!==item.lrc||typeof romaji.lrc!=='string'||romaji.lrc.length>200000)return false;
    const previous=validated.get(item);
    if(previous&&previous.source===item.lrc&&previous.result===romaji.lrc)return previous.valid;
    const valid=!alignmentError(item.lrc,romaji.lrc);
    validated.set(item,{source:item.lrc,result:romaji.lrc,valid});return valid;
  }
  function mode(item) {return validRomaji(item)&&['romaji','both'].includes(item.lyricMode)?item.lyricMode:'original'}
  function displayLrc(item) {return mode(item)==='romaji'?item.romaji.lrc:String(item?.lrc||'')}
  const secondaryLrc = item => mode(item)==='both'?item.romaji.lrc:'';
  function fileMetadata(source) {
    const title=String(source).match(/^\s*\[ti:([^\]]+)\]/im)?.[1]?.trim()||'';
    const artist=String(source).match(/^\s*\[ar:([^\]]+)\]/im)?.[1]?.trim()||'';
    const length=String(source).match(/^\s*\[length:\s*(\d+):(\d{2}(?:\.\d+)?)\s*\]/im);
    const duration=length&&Number(length[2])<60?Number(length[1])*60+Number(length[2]):undefined;
    return {title,artist,duration};
  }
  const hasJapanese=source=>splitLines(source).some(line=>textParts(line).some(part=>!part.token&&japanese.test(part.text)));
  globalThis.ManokaraLyrics = {romanize,alignmentError,validRomaji,mode,displayLrc,secondaryLrc,fileMetadata,hasJapanese};
})();
