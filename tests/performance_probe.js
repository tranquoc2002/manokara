/* Test-only instrumentation. Not imported by the application or served as an asset. */
(() => {
  let active = false, started = 0, previous = 0, commits = {}, calls = {}, frames = [], tasks = [], ages = [];
  let rowPropsChanged = 0, rowVisits = 0;
  const previousProps = new WeakMap();
  const bounded = (list, value) => { if (list.length < 6000) list.push(value); };
  const stats = values => {
    const sorted = [...values].sort((a,b) => a-b), total = sorted.reduce((sum,n) => sum+n, 0);
    const percentile = p => sorted.length ? sorted[Math.min(sorted.length-1, Math.floor(sorted.length*p))] : null;
    return {count:sorted.length, mean:sorted.length?total/sorted.length:null, p50:percentile(.5),
      p95:percentile(.95), max:sorted.at(-1)??null, total};
  };
  const wrap = (object, key, name) => {
    const original = object[key]; if (typeof original !== 'function') return;
    object[key] = function(...args) {
      if (!active) return original.apply(this,args);
      const begin=performance.now();
      try { return original.apply(this,args); }
      finally { const counter=calls[name]??={count:0,ms:0};counter.count++;counter.ms+=performance.now()-begin; }
    };
  };
  const intercept = (name, decorate) => {
    let value;
    Object.defineProperty(globalThis,name,{configurable:true,get:()=>value,set(next){value=next;decorate(next)}});
  };
  intercept('ManokaraOverlay', api => {
    for (const key of ['geometry','lyricRect']) wrap(api,key,'overlay.'+key);
    const original=api.createPlaylist;
    api.createPlaylist=function(...args){const renderer=original.apply(this,args);wrap(renderer,'render','playlist.render');wrap(renderer,'place','playlist.place');return renderer};
  });
  intercept('ManokaraStudio', api => wrap(api,'feed','studio.feed'));
  intercept('ManokaraLyrics', api => {
    for (const key of ['displayLrc','secondaryLrc']) wrap(api,key,'lyrics.'+key);
  });
  intercept('ManokaraRelay', api => {
    const original=api.connect;
    api.connect=options=>original({...options,receive(next,delay){
      if(active)bounded(ages,Math.max(0,Number(next.stateAgeMs)||0)+(Number(delay)||0));
      options.receive(next,delay);
    }});
  });
  globalThis.__REACT_DEVTOOLS_GLOBAL_HOOK__={supportsFiber:true,inject:()=>1,
    onCommitFiberRoot(_id,root){
      const name=root.containerInfo?.id||'anonymous';
      if(active)commits[name]=(commits[name]||0)+1;
      if(name==='side'){
        const stack=[root.current];
        while(stack.length){const fiber=stack.pop(),props=fiber.memoizedProps;
          if(fiber.tag===5&&typeof props?.className==='string'&&props.className.split(' ').includes('ln')){
            if(active){rowVisits++;if(previousProps.get(fiber.stateNode)!==props)rowPropsChanged++}
            previousProps.set(fiber.stateNode,props);
          }
          if(fiber.child)stack.push(fiber.child);if(fiber.sibling)stack.push(fiber.sibling);
        }
      }
    },
    onCommitFiberUnmount(){},checkDCE(){}};
  try { new PerformanceObserver(list=>{if(active)for(const entry of list.getEntries())bounded(tasks,entry.duration)}).observe({type:'longtask',buffered:false}); } catch (_) {}
  function frame(now){if(active&&previous)bounded(frames,now-previous);previous=active?now:0;requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  globalThis.__manokaraBench={
    start(){commits={};calls={};frames=[];tasks=[];ages=[];previous=0;rowPropsChanged=0;rowVisits=0;started=performance.now();active=true},
    finish(){active=false;return{elapsedMs:performance.now()-started,visibility:document.visibilityState,commits,calls,
      rowPropsChanged,rowVisits,frameIntervalMs:stats(frames),framesOver50ms:frames.filter(n=>n>50).length,
      longTaskMs:stats(tasks),relayEstimatedAgeMs:stats(ages)}}
  };
})();
