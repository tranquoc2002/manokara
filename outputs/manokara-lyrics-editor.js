/* Lyricsify fallback, LRC/TTML import and an editable, time-aligned Romaji draft. */
(() => {
  'use strict';
  const L=ManokaraLyrics, $=s=>document.querySelector(s);
  function create({imported=()=>{},changed=()=>{},convertTtml=null,draft=null}={}) {
    // The React editor owns draft values; standalone legacy callers can keep DOM fields.
    const attributes={llrc:{value:'llrc'},romajiLrc:{value:'romajiLrc'},lyricMode:{value:'lyricMode'},
      ttl:{value:'ttl'},lq:{value:'lq'},lrcEncoding:{value:'lrcEncoding'},
      romajiDetails:{open:'romajiOpen'},romanize:{disabled:'romanizeBusy'}};
    function field(id) {
      const target=$(id), mapping=attributes[id.slice(1)];
      if(!draft||!mapping)return target;
      return new Proxy(target,{get(object,key){if(mapping[key])return draft.get(mapping[key]);const value=object[key];return typeof value==='function'?value.bind(object):value},
        set(object,key,value){if(mapping[key])draft.set(mapping[key],value);else object[key]=value;return true}});
    }
    const cleanup=[], downloads=new Map();let disposed=false;
    function listen(target,type,callback,options){target.addEventListener(type,callback,options);cleanup.push(()=>target.removeEventListener(type,callback,options))}
    function click(id,callback){const element=$(id),previous=element.onclick;element.onclick=callback;cleanup.push(()=>{if(element.onclick===callback)element.onclick=previous})}
    const source=field('#llrc'), preview=field('#romajiLrc'), selector=field('#lyricMode'), status=$('#lyricsStatus');
    let draftSource='',epoch=0,worker=null,pending=null,fileEpoch=0,fileController=null;
    let statusSource='';
    const setStatus=(text,error=false)=>{if(disposed)return;statusSource=text;const translated=globalThis.ManokaraI18n?.text(text)||text;
      if(draft)draft.patch({lyricsStatus:translated,lyricsError:error});else{status.textContent=translated;status.classList.toggle('error',error)}};
    listen(window,'manokara:languagechange',()=>setStatus(statusSource,draft?draft.get('lyricsError'):status.classList.contains('error')));
    function availability() {
      const valid=!!preview.value&&draftSource===source.value&&!L.alignmentError(source.value,preview.value);
      if(draft)draft.set('romajiAvailable',valid);else for(const option of selector.options)option.disabled=option.value!=='original'&&!valid;
      return valid;
    }
    function clear() {
      epoch++;if(pending)stopWorker();draftSource='';preview.value='';selector.value='original';field('#romajiDetails').open=false;
      availability();setStatus('Drop an LRC or TTML file here, or paste lyrics. Romaji keeps the original timing.');
    }
    function cancelImport() {
      fileEpoch++;fileController?.abort();fileController=null;
      if(draft)draft.set('importBusy',false);
    }
    listen(source,'input',event=>{cancelImport();if(draft)draft.set('llrc',event.target.value);clear();changed()});
    listen(preview,'input',event=>{
      if(draft)draft.set('romajiLrc',event.target.value);
      const error=L.alignmentError(source.value,preview.value);availability();
      setStatus(error||'Romaji edited. Add/Save the song to keep your changes.',!!error);
    });
    listen(selector,'change',event=>{if(draft)draft.set('lyricMode',event.target.value);availability();setStatus('Display mode applies when you Add/Save this song.')});
    function stopWorker() {if(pending)clearTimeout(pending.timer);if(worker)worker.terminate();worker=null;pending=null;field('#romanize').disabled=false}
    function generate() {
      if(fileController){setStatus('Wait for the lyric import to finish.');return}
      const raw=source.value;
      if(!raw.trim()){setStatus('Paste or import Japanese lyrics first.',true);return}
      if(raw.length>200000){setStatus('Lyrics exceed the 200,000-character limit.',true);return}
      if(!L.hasJapanese(raw)){setStatus('No Japanese characters found in these lyrics.',true);return}
      if(pending){setStatus('Romaji conversion is already running.');return}
      const id=++epoch;
      field('#romanize').disabled=true;setStatus('Loading the local Japanese dictionary…');
      try {
        worker ||= new Worker('./manokara-romaji-worker.js');
        const timer=setTimeout(()=>{
          if(!pending||pending.id!==id)return;
          const stillCurrent=id===epoch;stopWorker();if(stillCurrent)setStatus('Conversion timed out. Check that the Japanese dictionary is deployed, then try again.',true);
        },120000);
        pending={id,timer};
        worker.onerror=()=>{
          if(!pending||pending.id!==id)return;
          clearTimeout(timer);const stillCurrent=id===epoch;stopWorker();
          if(stillCurrent)setStatus('Could not load the Japanese converter. Restart the updated server and reload this page.',true);
        };
        worker.onmessage=({data})=>{
          if(!pending||data.id!==pending.id)return;
          if(data.lrc===undefined&&!data.error){if(id===epoch)setStatus(data.loading?'Loading the local Japanese dictionary…':`Creating Romaji… ${data.progress}%`);return}
          clearTimeout(timer);pending=null;field('#romanize').disabled=false;
          if(id!==epoch||raw!==source.value)return;
          if(data.error){setStatus('Romaji conversion failed: '+data.error,true);return}
          const error=L.alignmentError(raw,data.lrc);
          if(error){setStatus(error,true);return}
          draftSource=raw;preview.value=data.lrc;selector.value='romaji';field('#romajiDetails').open=true;availability();
          setStatus('Romaji ready. Check names/readings, then Add/Save. All original LRC tags are preserved.');
        };
        worker.postMessage({id,source:raw});
      } catch(error){if(pending)clearTimeout(pending.timer);stopWorker();setStatus('Romaji unavailable: '+error.message,true)}
    }
    click('#romanize',generate);
    click('#exportRomaji',()=>{
      if(!availability()){setStatus(L.alignmentError(source.value,preview.value)||'Create valid Romaji before downloading.',true);return}
      const name=(field('#ttl').value.trim()||'lyrics').replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_').slice(0,100);
      const url=URL.createObjectURL(new Blob([preview.value],{type:'text/plain;charset=utf-8'}));
      const link=document.createElement('a');link.href=url;link.download=name+'.romaji.lrc';document.body.appendChild(link);link.click();link.remove();
      downloads.set(url,setTimeout(()=>{downloads.delete(url);URL.revokeObjectURL(url)},30000));
      setStatus('Romaji LRC downloaded with the original timecodes. Add/Save to keep it in the setlist too.');
    });
    click('#lyricsify',()=>{
      const query=field('#lq').value.trim()||field('#ttl').value.trim();
      const url=new URL('https://www.lyricsify.com/'+(query?'search':'lrc'));
      if(query)url.searchParams.set('q',query);
      window.open(url.href,'_blank','noopener');
      // noopener browsers may return null even when the new tab opened.
      setStatus('Find the matching LRC on Lyricsify, then import its download or paste the copied lyrics.');
    });
    async function importFile(file) {
      if(!file)return;
      if(!/\.(lrc|ttml)$/i.test(file.name)){setStatus('Choose an .lrc or .ttml file.',true);return}
      const isTtml=/\.ttml$/i.test(file.name);
      if(file.size>(isTtml?500000:512000)){setStatus('Lyric file is too large (maximum 500 KB).',true);return}
      cancelImport();if(pending)stopWorker();
      const current=fileEpoch,importRevision=epoch,previous=source.value,controller=new AbortController();
      fileController=controller;if(draft)draft.set('importBusy',true);
      setStatus(isTtml?'Reading TTML…':'Reading LRC…');
      const currentImport=()=>!disposed&&current===fileEpoch&&importRevision===epoch&&previous===source.value&&!controller.signal.aborted;
      try {
        const bytes=new Uint8Array(await file.arrayBuffer()), encoding=field('#lrcEncoding').value;
        let decoded,used=encoding;
        if(encoding==='auto') {
          if(bytes[0]===255&&bytes[1]===254){decoded=new TextDecoder('utf-16le',{fatal:true}).decode(bytes);used='UTF-16LE'}
          else if(bytes[0]===254&&bytes[1]===255){decoded=new TextDecoder('utf-16be',{fatal:true}).decode(bytes);used='UTF-16BE'}
          else try{decoded=new TextDecoder('utf-8',{fatal:true}).decode(bytes);used='UTF-8'}
          catch{decoded=new TextDecoder('shift_jis',{fatal:true}).decode(bytes);used='Shift_JIS'}
        } else decoded=new TextDecoder(encoding,{fatal:true}).decode(bytes);
        if(decoded.length>(isTtml?500000:200000)||/\u0000/.test(decoded))throw Error('Invalid or oversized text. Check the file encoding.');
        if(!currentImport())return;
        let ttml=null;
        if(isTtml){
          if(!convertTtml)throw Error('Restart the updated server to import TTML files.');
          ttml=await convertTtml(decoded,controller.signal);
          if(!currentImport())return;
          if(typeof ttml?.syncedLyrics!=='string'||ttml.syncedLyrics.length>200000)throw Error('Could not read this TTML file. Check its XML format.');
          decoded=ttml.syncedLyrics;
        }
        source.value=decoded;clear();
        changed();const metadata=L.fileMetadata(decoded);imported(metadata,file.name,ttml);
        setStatus(isTtml?'TTML imported. Review the lyrics, then Add/Save.':`Imported ${file.name} (${used}). Original timestamps and offset tags are retained.`);
      } catch(error){if(currentImport())setStatus('Import failed: '+(error.name==='TimeoutError'?'TTML import took too long. Try again.':error.message),true)}
      finally{if(current===fileEpoch){fileController=null;if(draft)draft.set('importBusy',false)}}
    }
    click('#importLrc',()=>$('#lrcFile').click());
    listen($('#lrcFile'),'change',event=>{const file=event.target.files[0];event.target.value='';importFile(file)});
    // Handle file drops only; normal textarea text editing is left to the browser.
    const zone=$('#lyricDraft');let dragDepth=0;
    listen(zone,'dragenter',event=>{if([...event.dataTransfer.types].includes('Files')){event.preventDefault();dragDepth++;zone.classList.add('dragging')}});
    listen(zone,'dragover',event=>{if([...event.dataTransfer.types].includes('Files')){event.preventDefault();event.dataTransfer.dropEffect='copy'}});
    listen(zone,'dragleave',()=>{if(--dragDepth<=0){dragDepth=0;zone.classList.remove('dragging')}});
    listen(zone,'drop',event=>{
      if(!event.dataTransfer.files.length)return;event.preventDefault();dragDepth=0;zone.classList.remove('dragging');
      if(event.dataTransfer.files.length!==1){setStatus('Import one lyric file at a time.',true);return}importFile(event.dataTransfer.files[0]);
    });
    clear();
    return {
      reset(){cancelImport();clear()},
      load(item){cancelImport();clear();if(L.validRomaji(item)){draftSource=source.value;preview.value=item.romaji.lrc;selector.value=L.mode(item);availability();field('#romajiDetails').open=selector.value!=='original';setStatus('Saved Romaji loaded. You can edit its text; keep the LRC tags unchanged.')}else if(item.romaji)setStatus('Saved Romaji no longer matches this LRC. Create Romaji again.',true)},
      read(){
        const valid=availability();
        if(selector.value!=='original'&&!valid)throw Error(L.alignmentError(source.value,preview.value)||'Create Romaji again after changing the original lyrics.');
        return {lyricMode:selector.value,romaji:valid?{source:source.value,lrc:preview.value}:undefined};
      },
      // Search results replace the source, so a translation from the previous source is invalid.
      sourceReplaced(){cancelImport();clear()},
      dispose(){if(disposed)return;cancelImport();disposed=true;epoch++;stopWorker();cleanup.splice(0).reverse().forEach(remove=>remove());for(const [url,timer] of downloads){clearTimeout(timer);URL.revokeObjectURL(url)}downloads.clear()},
    };
  }
  window.ManokaraLyricsEditor={create};
})();
