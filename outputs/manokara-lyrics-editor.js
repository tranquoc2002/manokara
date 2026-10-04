/* Lyricsify fallback, local LRC import and an editable, time-aligned Romaji draft. */
(() => {
  'use strict';
  const L=ManokaraLyrics, $=s=>document.querySelector(s);
  function create({imported=()=>{},changed=()=>{}}={}) {
    const source=$('#llrc'), preview=$('#romajiLrc'), selector=$('#lyricMode'), status=$('#lyricsStatus');
    let draftSource='',epoch=0,worker=null,pending=null,fileEpoch=0;
    const setStatus=(text,error=false)=>{status.textContent=text;status.classList.toggle('error',error)};
    function availability() {
      const valid=!!preview.value&&draftSource===source.value&&!L.alignmentError(source.value,preview.value);
      for(const option of selector.options)option.disabled=option.value!=='original'&&!valid;
      return valid;
    }
    function clear() {
      epoch++;draftSource='';preview.value='';selector.value='original';$('#romajiDetails').open=false;
      availability();setStatus('Drop an LRC file here, or paste lyrics. Romaji keeps the original timing.');
    }
    source.addEventListener('input',()=>{clear();changed()});
    preview.addEventListener('input',()=>{
      const error=L.alignmentError(source.value,preview.value);availability();
      setStatus(error||'Romaji edited. Add/Save the song to keep your changes.',!!error);
    });
    selector.addEventListener('change',()=>{availability();setStatus('Display mode applies when you Add/Save this song.')});
    function stopWorker() {if(worker)worker.terminate();worker=null;pending=null;$('#romanize').disabled=false}
    function generate() {
      const raw=source.value;
      if(!raw.trim()){setStatus('Paste or import Japanese lyrics first.',true);return}
      if(raw.length>200000){setStatus('Lyrics exceed the 200,000-character limit.',true);return}
      if(!L.hasJapanese(raw)){setStatus('No Japanese characters found in these lyrics.',true);return}
      if(pending){setStatus('Romaji conversion is already running.');return}
      const id=++epoch;
      $('#romanize').disabled=true;setStatus('Loading the local Japanese dictionary…');
      try {
        worker ||= new Worker('./manokara-romaji-worker.js');
        const timer=setTimeout(()=>{
          const stillCurrent=id===epoch;stopWorker();if(stillCurrent)setStatus('Conversion timed out. Check that the Japanese dictionary is deployed, then try again.',true);
        },120000);
        pending={id,timer};
        worker.onerror=()=>{
          clearTimeout(timer);const stillCurrent=id===epoch;stopWorker();
          if(stillCurrent)setStatus('Could not load the Japanese converter. Restart the updated server and reload this page.',true);
        };
        worker.onmessage=({data})=>{
          if(!pending||data.id!==pending.id)return;
          if(data.lrc===undefined&&!data.error){if(id===epoch)setStatus(data.loading?'Loading the local Japanese dictionary…':`Creating Romaji… ${data.progress}%`);return}
          clearTimeout(timer);pending=null;$('#romanize').disabled=false;
          if(id!==epoch||raw!==source.value)return;
          if(data.error){setStatus('Romaji conversion failed: '+data.error,true);return}
          const error=L.alignmentError(raw,data.lrc);
          if(error){setStatus(error,true);return}
          draftSource=raw;preview.value=data.lrc;selector.value='romaji';$('#romajiDetails').open=true;availability();
          setStatus('Romaji ready. Check names/readings, then Add/Save. All original LRC tags are preserved.');
        };
        worker.postMessage({id,source:raw});
      } catch(error){if(pending)clearTimeout(pending.timer);stopWorker();setStatus('Romaji unavailable: '+error.message,true)}
    }
    $('#romanize').onclick=generate;
    $('#exportRomaji').onclick=()=>{
      if(!availability()){setStatus(L.alignmentError(source.value,preview.value)||'Create valid Romaji before downloading.',true);return}
      const name=($('#ttl').value.trim()||'lyrics').replace(/[<>:"/\\|?*\u0000-\u001f]/g,'_').slice(0,100);
      const url=URL.createObjectURL(new Blob([preview.value],{type:'text/plain;charset=utf-8'}));
      const link=document.createElement('a');link.href=url;link.download=name+'.romaji.lrc';document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
      setStatus('Romaji LRC downloaded with the original timecodes. Add/Save to keep it in the setlist too.');
    };
    $('#lyricsify').onclick=()=>{
      const query=$('#lq').value.trim()||$('#ttl').value.trim();
      const url=new URL('https://www.lyricsify.com/'+(query?'search':'lrc'));
      if(query)url.searchParams.set('q',query);
      window.open(url.href,'_blank','noopener');
      // noopener browsers may return null even when the new tab opened.
      setStatus('Find the matching LRC on Lyricsify, then import its download or paste the copied lyrics.');
    };
    async function importFile(file) {
      if(!file)return;
      if(!/\.lrc$/i.test(file.name)){setStatus('Choose a .lrc file.',true);return}
      if(file.size>512000){setStatus('LRC file is too large (maximum 500 KB).',true);return}
      const current=++fileEpoch,importRevision=epoch,previous=source.value;
      try {
        const bytes=new Uint8Array(await file.arrayBuffer()), encoding=$('#lrcEncoding').value;
        let decoded,used=encoding;
        if(encoding==='auto') {
          if(bytes[0]===255&&bytes[1]===254){decoded=new TextDecoder('utf-16le',{fatal:true}).decode(bytes);used='UTF-16LE'}
          else if(bytes[0]===254&&bytes[1]===255){decoded=new TextDecoder('utf-16be',{fatal:true}).decode(bytes);used='UTF-16BE'}
          else try{decoded=new TextDecoder('utf-8',{fatal:true}).decode(bytes);used='UTF-8'}
          catch{decoded=new TextDecoder('shift_jis',{fatal:true}).decode(bytes);used='Shift_JIS'}
        } else decoded=new TextDecoder(encoding,{fatal:true}).decode(bytes);
        if(decoded.length>200000||/\u0000/.test(decoded))throw Error('Invalid or oversized text. Check the file encoding.');
        if(current!==fileEpoch||importRevision!==epoch||previous!==source.value)return;
        source.value=decoded;clear();
        changed();const metadata=L.fileMetadata(decoded);imported(metadata,file.name);
        setStatus(`Imported ${file.name} (${used}). Original timestamps and offset tags are retained.`);
      } catch(error){if(current===fileEpoch)setStatus('Import failed: '+error.message,true)}
    }
    $('#importLrc').onclick=()=>$('#lrcFile').click();
    $('#lrcFile').onchange=event=>{const file=event.target.files[0];event.target.value='';importFile(file)};
    // Handle file drops only; normal textarea text editing is left to the browser.
    const zone=$('#lyricDraft');let dragDepth=0;
    zone.addEventListener('dragenter',event=>{if([...event.dataTransfer.types].includes('Files')){event.preventDefault();dragDepth++;zone.classList.add('dragging')}});
    zone.addEventListener('dragover',event=>{if([...event.dataTransfer.types].includes('Files')){event.preventDefault();event.dataTransfer.dropEffect='copy'}});
    zone.addEventListener('dragleave',()=>{if(--dragDepth<=0){dragDepth=0;zone.classList.remove('dragging')}});
    zone.addEventListener('drop',event=>{
      if(!event.dataTransfer.files.length)return;event.preventDefault();dragDepth=0;zone.classList.remove('dragging');
      if(event.dataTransfer.files.length!==1){setStatus('Import one LRC file at a time.',true);return}importFile(event.dataTransfer.files[0]);
    });
    clear();
    return {
      reset(){fileEpoch++;clear()},
      load(item){fileEpoch++;clear();if(L.validRomaji(item)){draftSource=source.value;preview.value=item.romaji.lrc;selector.value=L.mode(item);availability();$('#romajiDetails').open=selector.value!=='original';setStatus('Saved Romaji loaded. You can edit its text; keep the LRC tags unchanged.')}else if(item.romaji)setStatus('Saved Romaji no longer matches this LRC. Create Romaji again.',true)},
      read(){
        const valid=availability();
        if(selector.value!=='original'&&!valid)throw Error(L.alignmentError(source.value,preview.value)||'Create Romaji again after changing the original lyrics.');
        return {lyricMode:selector.value,romaji:valid?{source:source.value,lrc:preview.value}:undefined};
      },
      // Search results replace the source, so a translation from the previous source is invalid.
      sourceReplaced(){fileEpoch++;clear()},
    };
  }
  window.ManokaraLyricsEditor={create};
})();
