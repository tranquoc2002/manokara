/* Header YouTube search: cancellable metadata requests and an accessible combobox. */
(() => {
  'use strict';
  function init({ready,endpoint,api,choose}) {
    const $=selector=>document.querySelector(selector),host=$('.header-search'),input=$('#musicSearch'),menu=$('#musicSearchMenu'),list=$('#youtubeResults'),status=$('#musicSearchStatus'),karaoke=$('#preferKaraoke'),external=$('#openYouTubeSearch');
    const translate=value=>ManokaraI18n.text(value);
    let timer,controller,revision=0,results=[],active=-1,state='idle',errorSource='',resultsKey='',pendingKey='',composing=false;
    const cache=new Map(),query=()=>input.value.trim().replace(/\s+/g,' '),key=()=>query()+'|'+karaoke.checked;
    function resize() {
      if(menu.hidden)return;
      menu.style.maxHeight=Math.max(120,Math.min(480,innerHeight-menu.getBoundingClientRect().top-12))+'px';
    }
    function show() {menu.hidden=false;input.setAttribute('aria-expanded','true');resize()}
    function cancel() {clearTimeout(timer);revision++;controller?.abort();controller=null;pendingKey=''}
    function close() {
      cancel();menu.hidden=true;input.setAttribute('aria-expanded','false');input.removeAttribute('aria-activedescendant');
      active=-1;for(const node of list.children)node.setAttribute('aria-selected','false');
      if(state==='loading'){state='idle';render()}
    }
    function duration(value) {
      if(!Number.isFinite(value)||value<=0)return '';
      const seconds=Math.floor(value),h=Math.floor(seconds/3600),m=Math.floor(seconds/60)%60,s=seconds%60;
      return (h?h+':'+String(m).padStart(2,'0'):String(m))+':'+String(s).padStart(2,'0');
    }
    function render() {
      const messages={idle:'Type a song or artist. Search starts after 2 characters.',loading:'Searching YouTube…',results:'Choose a video to fill the song editor.',empty:'No matching videos. Try another name.',error:errorSource};
      status.textContent=translate(messages[state]);
      list.setAttribute('aria-busy',String(state==='loading'));
      list.replaceChildren();
      if(state==='results')results.forEach((video,index)=>{
        const option=document.createElement('div');option.className='youtube-result';option.id='youtube-result-'+index;option.tabIndex=-1;option.setAttribute('role','option');option.setAttribute('aria-selected',String(index===active));
        // Keep mouse focus in the combobox until click runs. Otherwise blur's timer can
        // hide the option between mousedown and mouseup, losing the selection entirely.
        // tabindex also keeps touch/assistive focus inside the search rather than on body.
        option.addEventListener('mousedown',event=>{if(event.button===0)event.preventDefault()});
        const thumbnail=document.createElement('div');thumbnail.className='youtube-thumbnail';
        const image=document.createElement('img');image.src='https://i.ytimg.com/vi/'+video.id+'/mqdefault.jpg';image.alt='';image.loading='lazy';image.decoding='async';image.referrerPolicy='no-referrer';thumbnail.appendChild(image);
        const length=duration(video.duration);if(length){const tag=document.createElement('span');tag.textContent=length;thumbnail.appendChild(tag)}
        const copy=document.createElement('div');copy.className='youtube-result-copy';
        const title=document.createElement('strong');title.textContent=video.title;
        const channel=document.createElement('small');channel.textContent=video.channel||'YouTube';copy.append(title,channel);
        const arrow=document.createElement('span');arrow.className='youtube-select';arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');
        option.setAttribute('aria-label',video.title+(video.channel?' — '+video.channel:'')+(length?' · '+length:''));
        option.append(thumbnail,copy,arrow);option.addEventListener('click',()=>select(index));list.appendChild(option);
      });
      if(active>=0&&state==='results')input.setAttribute('aria-activedescendant','youtube-result-'+active);else input.removeAttribute('aria-activedescendant');
      const url=new URL('https://www.youtube.com/results');let term=query()||'karaoke';if(karaoke.checked&&!/karaoke|カラオケ/i.test(term))term+=' karaoke';url.searchParams.set('search_query',term);external.href=url.href;
      resize();
    }
    function highlight(index) {
      if(!results.length)return;
      active=(index+results.length)%results.length;
      [...list.children].forEach((node,i)=>node.setAttribute('aria-selected',String(i===active)));
      input.setAttribute('aria-activedescendant','youtube-result-'+active);
      list.children[active]?.scrollIntoView({block:'nearest',inline:'nearest'});
    }
    function select(index) {
      const video=results[index];if(!video)return;
      if(choose(video)!==false)close();else input.focus({preventScroll:true});
    }
    async function search() {
      if(composing)return;
      const term=query(),requestKey=key();if(!term){show();state='idle';render();return}
      if(state==='loading'&&pendingKey===requestKey){show();return}
      cancel();const current=revision;results=[];active=-1;resultsKey='';errorSource='';
      const saved=cache.get(requestKey);
      if(saved&&saved.expires>Date.now()){results=saved.results;resultsKey=requestKey;state=results.length?'results':'empty';render();show();return}
      controller=new AbortController();const abort=controller;pendingKey=requestKey;state='loading';render();show();
      try {
        await ready;if(abort.signal.aborted||current!==revision)return;
        const response=await api(endpoint(),{query:term,karaoke:karaoke.checked},{signal:AbortSignal.any([abort.signal,AbortSignal.timeout(24000)])});
        const data=await response.json();if(current!==revision||abort.signal.aborted)return;
        if(!response.ok)throw Error(response.status===404?'Restart the updated server to enable YouTube search.':data.error||'YouTube search is temporarily unavailable. Try again or search on YouTube.');
        if(!Array.isArray(data.results))throw Error('YouTube search is temporarily unavailable. Try again or search on YouTube.');
        results=data.results.filter(item=>item&&typeof item.id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(item.id)&&typeof item.title==='string').slice(0,8).map(item=>({id:item.id,title:item.title.slice(0,512),channel:typeof item.channel==='string'?item.channel.slice(0,160):'',duration:typeof item.duration==='number'?item.duration:null}));
        cache.delete(requestKey);cache.set(requestKey,{results,expires:Date.now()+120000});while(cache.size>30)cache.delete(cache.keys().next().value);
        resultsKey=requestKey;state=results.length?'results':'empty';render();
      } catch(error) {
        if(current!==revision||abort.signal.aborted)return;
        state='error';errorSource=error.name==='TimeoutError'?'YouTube search took too long. Try again.':error.message||'YouTube search is temporarily unavailable. Try again or search on YouTube.';
        if(error.name==='TypeError')errorSource='Could not connect. Check your connection and try again.';
        results=[];active=-1;render();
      } finally {if(current===revision){controller=null;pendingKey=''}}
    }
    function edited() {
      cancel();results=[];active=-1;resultsKey='';state='idle';render();show();
      if(!composing&&query().length>=2)timer=setTimeout(search,850);
    }
    input.addEventListener('input',edited);
    input.addEventListener('compositionstart',()=>{composing=true;cancel()});
    input.addEventListener('compositionend',()=>{composing=false;edited()});
    input.addEventListener('focus',()=>{show();if(query().length>=2&&resultsKey!==key()&&state!=='loading')timer=setTimeout(search,850)});
    karaoke.addEventListener('change',()=>{try{localStorage.setItem('manokaraPreferKaraoke',String(karaoke.checked))}catch(_){}edited();input.focus({preventScroll:true})});
    $('#musicSearchForm').addEventListener('submit',event=>{event.preventDefault();search()});
    input.addEventListener('keydown',event=>{
      if(composing||event.isComposing)return;
      if(event.key==='Escape'&&!menu.hidden){event.preventDefault();event.stopPropagation();close()}
      else if(event.key==='ArrowDown'||event.key==='ArrowUp') {
        event.preventDefault();show();if(results.length)highlight(active<0?(event.key==='ArrowDown'?0:results.length-1):active+(event.key==='ArrowDown'?1:-1));else if(query().length>=2)search();
      } else if(event.key==='Enter'&&!menu.hidden&&active>=0){event.preventDefault();select(active)}
    });
    $('#closeMusicSearch').addEventListener('click',()=>{input.focus({preventScroll:true});close()});
    document.addEventListener('pointerdown',event=>{if(!host.contains(event.target))close()},true);
    host.addEventListener('focusout',()=>{setTimeout(()=>{if(!host.contains(document.activeElement))close()},0)});
    window.addEventListener('resize',resize);
    window.addEventListener('manokara:languagechange',render);
    window.addEventListener('pagehide',cancel,{once:true});
    try{const saved=localStorage.getItem('manokaraPreferKaraoke');if(saved==='false')karaoke.checked=false}catch(_){}
    render();
  }
  window.ManokaraSearch={init};
})();
