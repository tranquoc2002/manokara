const settle = () => new Promise(resolve => setImmediate(resolve));
function virtualTime() {
  let time = 0, serial = 0;
  const jobs = new Map();
  const schedule = (fn, delay, interval) => { const id=++serial;jobs.set(id,{fn,at:time+delay,delay,interval});return id; };
  return {
    now: () => time, jobs,
    platform: { setTimeout: (fn,ms)=>schedule(fn,ms,false), clearTimeout: id=>jobs.delete(id),
      setInterval: (fn,ms)=>schedule(fn,ms,true),clearInterval:id=>jobs.delete(id),
      requestAnimationFrame:fn=>schedule(fn,16,false),cancelAnimationFrame:id=>jobs.delete(id) },
    advance(ms) {
      const until=time+ms;
      for(let guard=0;guard<100000;guard++){
        const next=[...jobs].filter(([,job])=>job.at<=until).sort((a,b)=>a[1].at-b[1].at||a[0]-b[0])[0];
        if(!next){time=until;return;}
        const [id,job]=next;time=job.at;
        if(job.interval)job.at+=job.delay;else jobs.delete(id);
        job.fn();
      }
      throw Error('Timer loop');
    }
  };
}
const deferred = () => { let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b});return{promise,resolve,reject}; };
function makeHarness() {
  const time=virtualTime(), players=[], media=[], messages=[], changes=[], stages=[], pendingReady=[];
  let advances=0,persists=0,creates=0,lookupSignal,lookupJob,slowReady=false,slowPitch=false;
  const pitchGate=deferred();
  const settings={volume:100,skip:true,language:'en'};
  const capture={active:false,busy:false,delay:0,open(){return true},sync(){},silence(){},stop(){this.active=false},suspend(){this.suspended=true},resume(){this.suspended=false},dispose(options){this.disposed=options}};
  const pitch={element:null,key:0,delay:.12,detach(){this.element=null;this.key=0},suspend(){this.suspended=true},async resume(){this.suspended=false},async flush(){this.flushed=(this.flushed||0)+1},async set(key){this.key=key},dispose(){this.disposed=true},
    async attach(element,key,current){if(slowPitch)await pitchGate.promise;if(!current())return false;this.element=element;this.key=key;return true}};
  class Video extends EventTarget {
    currentTime=0;duration=285;readyState=4;paused=true;ended=false;playbackRate=1;
    async play(){this.paused=false;this.dispatchEvent(new Event('play'))}
    pause(){this.paused=true;this.dispatchEvent(new Event('pause'))}
  }
  const adapters={
    youtube:{
      mount(){return{}},
      ready(signal){if(!slowReady)return Promise.resolve(true);const job=deferred();pendingReady.push({job,signal});return job.promise},
      create(node,options){
        let position=options.playerVars.start||0,anchor=time.now(),status=-1;
        const player={options,destroyed:false,
          getCurrentTime(){return position+(status===1?(time.now()-anchor)/1000:0)},getDuration(){return 285},getPlayerState(){return status},getPlaybackRate(){return 1},setVolume(value){this.volume=value},
          change(next){position=this.getCurrentTime();anchor=time.now();status=next;options.events.onStateChange({data:next,target:this})},
          playVideo(){this.change(1)},pauseVideo(){this.change(2)},seekTo(value){position=value;anchor=time.now()},destroy(){this.destroyed=true;status=-1}};
        players.push(player);queueMicrotask(()=>options.events.onReady({target:player}));return player;
      },destroy(player){player?.destroy()},fallback(){this.fallbacks=(this.fallbacks||0)+1}
    },
    mediaAdapter:{create(url,props){const element=new Video();element.src=url;element.volume=props.volume/100;if(props.crossOrigin)element.crossOrigin='anonymous';media.push(element);return element},
      mount(){},clear(){},release(element){element?.pause();if(element)element.released=true}},
    pitchFactory:{create(){creates++;return pitch}},captureFactory(config){capture.config=config;return capture},
    lookup(id,signal){lookupSignal=signal;lookupJob=deferred();signal.addEventListener('abort',()=>lookupJob.reject(signal.reason),{once:true});return lookupJob.promise}
  };
  return {time,players,media,messages,changes,stages,pendingReady,pitch,pitchGate,capture,settings,adapters,
    options:{...adapters,origin:'http://localhost:8000',youtubeId:url=>url?.includes('youtube')?'dz3sM6ygX_g':null,
      options:()=>settings,now:time.now,platform:time.platform,
      output:{stage:patch=>stages.push(patch),time(){},message:text=>messages.push(text),text:x=>x,format:x=>String(x),countdown(){}},
      callbacks:{changed:state=>changes.push(state),advance:()=>advances++,persist:()=>persists++,render(){},claim(){},title(){},replay(){return false}}},
    get advances(){return advances},get persists(){return persists},get creates(){return creates},get lookupSignal(){return lookupSignal},get lookupJob(){return lookupJob},
    set slowReady(value){slowReady=value},set slowPitch(value){slowPitch=value}
  };
}
const song = extra => ({title:'Song',url:'https://www.youtube.com/watch?v=dz3sM6ygX_g',s:0,e:null,off:0,pitch:0,...extra});
module.exports={settle,virtualTime,deferred,makeHarness,song};
