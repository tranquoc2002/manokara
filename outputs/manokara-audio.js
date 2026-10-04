/* Optional tab-audio analysis. Only band levels are relayed; no audio is recorded or uploaded. */
(() => {
  'use strict';
  const ZERO = {audioPower:0,audioBass:0,audioLowMid:0,audioMid:0,audioVocal:0,audioTreble:0};
  function create(button, status) {
    let stream, context, analyser, bins, active = false;
    let statusSource='Share the karaoke tab with tab audio enabled. No recording.';
    const refresh=()=>{const translate=value=>globalThis.ManokaraI18n?.text(value)||value;button.textContent=translate(active?'Stop audio reaction':'Enable audio reaction');status.textContent=translate(statusSource)};
    window.addEventListener('manokara:languagechange',refresh);
    const stop = () => {
      active = false; stream?.getTracks().forEach(track => track.stop()); context?.close().catch(()=>{});
      stream = context = analyser = bins = null;
      statusSource='Share the karaoke tab with tab audio enabled. No recording.';refresh();
    };
    button.onclick = async () => {
      if (active) { stop(); return; }
      button.disabled = true;
      try {
        if (!navigator.mediaDevices?.getDisplayMedia) throw Error('Use Chrome or Edge over HTTPS / localhost to share tab audio.');
        stream = await navigator.mediaDevices.getDisplayMedia({video:true, audio:true, preferCurrentTab:true});
        if (!stream.getAudioTracks().length) throw Error('No tab audio selected. Choose the karaoke tab and enable Share tab audio.');
        context = new AudioContext({latencyHint:'interactive'}); await context.resume();
        analyser = context.createAnalyser(); analyser.fftSize = 2048; analyser.smoothingTimeConstant = .55;
        context.createMediaStreamSource(stream).connect(analyser);
        bins = new Uint8Array(analyser.frequencyBinCount); active = true;
        stream.getTracks().forEach(track => track.addEventListener('ended', stop, {once:true}));
        statusSource='Folia reacts to the selected tab audio. Lyrics follow the LRC timecodes.';refresh();
      } catch (error) { stop(); statusSource=error.message || 'Audio sharing cancelled.';refresh(); }
      finally { button.disabled = false; }
    };
    window.addEventListener('pagehide', stop, {once:true});
    refresh();
    return {
      sample() {
        if (!active || context?.state !== 'running' || !analyser) return ZERO;
        analyser.getByteFrequencyData(bins);
        const band = (lo, hi) => {
          const a = Math.max(0, Math.floor(lo * analyser.fftSize / context.sampleRate));
          const b = Math.min(bins.length, Math.ceil(hi * analyser.fftSize / context.sampleRate));
          let energy = 0; for (let i=a;i<b;i++) energy += (bins[i]/255)**2;
          return Math.min(1, Math.sqrt(energy/Math.max(1,b-a)));
        };
        return {audioPower:band(30,10000), audioBass:band(30,250), audioLowMid:band(250,500), audioMid:band(500,2000), audioVocal:band(2000,4000), audioTreble:band(4000,12000)};
      },
    };
  }
  globalThis.ManokaraAudio = {create};
})();
