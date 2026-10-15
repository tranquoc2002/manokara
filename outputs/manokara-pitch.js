/* Local Signalsmith Stretch graph for media elements or a captured tab stream. */
(() => {
  'use strict';
  const CONFIG = {blockMs:120, intervalMs:30, splitComputation:true};
  // The existing dialog focuses Close when opening; keep its heading visible on small screens.
  document.addEventListener('click', event => {
    if (event.target.closest('#transpose')) {
      const card=document.querySelector('#transposeDialog .modal-card');
      if (card) card.scrollTop=0;
    }
  });
  const clamp = value => Math.max(-12, Math.min(12, Math.round(Number(value) || 0)));
  const videoFailures=new Map(), endpointFailures=new Map();
  async function lookup(api, endpoint, videoId, options) {
    const key=endpoint+'|'+videoId, now=Date.now();
    const endpointBlock=endpointFailures.get(endpoint);
    const blocked=endpointBlock && endpointBlock.until>now ? endpointBlock : videoFailures.get(key);
    if (blocked && blocked.until>now) throw Error(blocked.message);
    endpointFailures.delete(endpoint);videoFailures.delete(key);
    const response=await api(endpoint,{videoId},options);
    const data=await response.json();
    if (!response.ok) {
      const message=data.error || 'Server playback is unavailable.';
      if ([429,502,503].includes(response.status)) {
        const retry=Math.max(1,Math.min(300,Number(response.headers.get('Retry-After')) || 60));
        const failure={message,until:Date.now()+retry*1000};
        videoFailures.set(key,failure);
        if (response.status===429) endpointFailures.set(endpoint,failure);
        while (videoFailures.size>32) videoFailures.delete(videoFailures.keys().next().value);
      }
      throw Error(message);
    }
    return data;
  }
  function create(onFailure) {
    let context, stretch, ready, source, element, output, semitones=0, latency=0, generation=0;
    let disposed=false;
    const pending=new Set();
    const timeout=(promise,ms=10000)=>new Promise((resolve,reject)=>{
      let settled=false;
      const finish=(value,error)=>{if(settled)return;settled=true;clearTimeout(timer);pending.delete(cancel);error?reject(value):resolve(value)};
      const cancel=()=>finish(Error('Pitch processor disposed.'),true);
      const timer=setTimeout(()=>finish(Error('Pitch processor took too long to start. Try again.'),true),ms);
      pending.add(cancel);Promise.resolve(promise).then(value=>finish(value,false),error=>finish(error,true));
      if(disposed)cancel();
    });
    const sources=new WeakMap();
    function resume() {
      if(disposed)return Promise.reject(Error('Pitch processor disposed.'));
      if (!isSecureContext || !window.AudioContext || !window.AudioWorkletNode) {
        return Promise.reject(Error('Pitch needs Chrome or Edge on HTTPS / localhost.'));
      }
      context ||= new AudioContext({latencyHint:'interactive'});
      // Called from the Play/key gesture, before loading the module or waiting for the server.
      return context.resume();
    }
    function prepare() {
      const resumed=resume();
      if (!ready) ready=(async () => {
        const {default:factory}=await import('./pitch-assets/SignalsmithStretch.mjs');
        // Use the same-origin module itself as the worklet, avoiding generated blob scripts.
        factory.moduleUrl=new URL('./pitch-assets/SignalsmithStretch.mjs',location.href).href;
        const activeContext=context;
        const node=await factory(activeContext, {numberOfInputs:1, numberOfOutputs:1, outputChannelCount:[2]});
        if(disposed||context!==activeContext){node.disconnect();node.port.close();throw Error('Pitch processor disposed.')}
        stretch=node;
        stretch.onprocessorerror=() => {
          if(disposed||stretch!==node)return;
          const active=!!source;bypass();
          if(active)onFailure?.('Pitch processor stopped. Original key is playing; press a key button to retry.');
          stretch=null;ready=null;node.port.close();
        };
        await timeout(stretch.configure(CONFIG));
        latency=Number(await timeout(stretch.latency())) || 0;
      })().catch(error => {ready=null;throw error;});
      return timeout(Promise.all([resumed,ready]));
    }
    function bypass() {
      source?.disconnect();stretch?.disconnect();
      if (source) source.connect(destination());
      semitones=0;
    }
    function destination() {
      if (!output) {output=context.createGain();output.connect(context.destination);}
      return output;
    }
    function setEnabled(enabled) {
      if (context) destination().gain.setTargetAtTime(enabled ? 1 : 0,context.currentTime,.01);
    }
    function detach() {
      generation++;
      source?.disconnect();stretch?.disconnect();
      source=null;element=null;semitones=0;
      context?.suspend().catch(() => {});
    }
    function suspend() {
      // A MediaElementAudioSource stays bound to its element for life. Keep the
      // route when caching the page, including an already bypassed (key 0) source.
      generation++;
      context?.suspend().catch(() => {});
    }
    async function attach(media, value, isCurrent=() => true) {
      const my=++generation;
      await prepare();
      if (my!==generation || !isCurrent()) return false;
      // Never capture an opaque remote media response: Web Audio would silently mute it.
      const url=new URL(media.currentSrc || media.src,location.href);
      if (url.origin!==location.origin && media.crossOrigin!=='anonymous') {
        throw Error('This media link needs CORS permission for pitch. Use a same-origin or CORS-enabled link.');
      }
      source?.disconnect();stretch.disconnect();
      await timeout(stretch.configure(CONFIG)); // clear the previous track's audio buffers
      if (my!==generation || !isCurrent()) return false;
      element=media;
      source=sources.get(media);
      if (!source) {source=context.createMediaElementSource(media);sources.set(media,source);}
      await set(value);
      return true;
    }
    async function attachStream(stream, value, isCurrent=() => true) {
      const my=++generation;
      await prepare();
      if (my!==generation || !isCurrent()) return false;
      if (!stream.getAudioTracks().some(track => track.readyState==='live')) throw Error('Share tab audio to use Tab Audio.');
      source?.disconnect();stretch.disconnect();
      await timeout(stretch.configure(CONFIG));
      if (my!==generation || !isCurrent()) return false;
      element=null;semitones=0;
      source=context.createMediaStreamSource(new MediaStream(stream.getAudioTracks()));
      await set(value);
      return true;
    }
    async function set(value) {
      const next=clamp(value), my=generation;
      if (!source) return;
      if (!next) {bypass();return;}
      try {
        await prepare();
        if (my!==generation || !source) return;
        if (!semitones) {
          await timeout(stretch.configure(CONFIG));
          if (my!==generation || !source) return;
          await timeout(stretch.schedule({active:true, semitones:next, output:context.currentTime}));
          if (my!==generation || !source) return;
          source.disconnect();source.connect(stretch);stretch.connect(destination());
        } else {
          await timeout(stretch.schedule({active:true, semitones:next, output:context.currentTime+latency}));
          if (my!==generation) return;
        }
        semitones=next;
      } catch (error) {if (my===generation) bypass();throw error;}
    }
    async function flush() {
      const my=generation;
      if (!semitones || !stretch) return;
      try {
        await timeout(stretch.configure(CONFIG));
        if (my===generation && semitones) await timeout(stretch.schedule({active:true, semitones, output:context.currentTime}));
      } catch (_) {}
    }
    function dispose(){
      if(disposed)return;disposed=true;detach();
      for(const cancel of [...pending])cancel();
      stretch?.port.close();context?.close().catch(()=>{});
      stretch=null;ready=null;output=null;context=null;
      window.removeEventListener('pagehide',pageHidden);
    }
    function pageHidden(event){if(event.persisted)suspend();else dispose()}
    window.addEventListener('pagehide',pageHidden);
    return {prepare,resume,attach,attachStream,set,setEnabled,detach,suspend,flush,dispose,
      get element(){return element;}, get key(){return semitones;},
      get delay(){return source ? (semitones ? latency : 0)+(context.baseLatency || 0)+(context.outputLatency || 0) : 0;}
    };
  }
  window.ManokaraPitch={create,clamp,lookup};
})();
