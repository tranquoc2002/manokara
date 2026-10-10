/* Local Signalsmith Stretch audio graph. No tab capture, media upload or extension. */
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
  const timeout = (promise, ms=10000) => {
    let timer;
    return Promise.race([promise, new Promise((_, reject) => {
      timer=setTimeout(() => reject(Error('Pitch processor took too long to start. Try again.')), ms);
    })]).finally(() => clearTimeout(timer));
  };
  function create(onFailure) {
    let context, stretch, ready, source, element, semitones=0, latency=0, generation=0;
    const sources=new WeakMap();
    function resume() {
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
        stretch=await factory(context, {numberOfInputs:1, numberOfOutputs:1, outputChannelCount:[2]});
        stretch.onprocessorerror=() => {
          bypass();
          onFailure?.('Pitch processor stopped. Original key is playing; press a key button to retry.');
          const broken=stretch;stretch=null;ready=null;broken?.port.close();
        };
        await timeout(stretch.configure(CONFIG));
        latency=Number(await timeout(stretch.latency())) || 0;
      })().catch(error => {ready=null;throw error;});
      return timeout(Promise.all([resumed,ready]));
    }
    function bypass() {
      source?.disconnect();stretch?.disconnect();
      if (source) source.connect(context.destination);
      semitones=0;
    }
    function detach() {
      generation++;
      source?.disconnect();stretch?.disconnect();
      source=null;element=null;semitones=0;
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
          source.disconnect();source.connect(stretch);stretch.connect(context.destination);
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
    window.addEventListener('pagehide', () => {detach();stretch?.port.close();context?.close().catch(() => {});});
    return {prepare,resume,attach,set,detach,flush,
      get element(){return element;}, get key(){return semitones;},
      get delay(){return source ? (semitones ? latency : 0)+(context.baseLatency || 0)+(context.outputLatency || 0) : 0;}
    };
  }
  window.ManokaraPitch={create,clamp,lookup};
})();
