const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
require('../outputs/manokara-core.js');

function searchHarness(accept=true) {
  const timers=[];
  class Element {
    constructor(tag='div'){this.tagName=tag.toUpperCase();this.children=[];this.events={};this.attributes={};this.style={};this.value='';this.checked=true;this.hidden=true;this.tabIndex=undefined;}
    addEventListener(type,fn){(this.events[type]||=[]).push(fn)}
    fire(type,values={}){const event={target:this,button:0,preventDefault(){this.defaultPrevented=true},stopPropagation(){},...values};for(const fn of this.events[type]||[])fn(event);return event}
    setAttribute(name,value){this.attributes[name]=String(value)}
    removeAttribute(name){delete this.attributes[name]}
    appendChild(node){node.parent=this;this.children.push(node)}
    append(...nodes){nodes.forEach(node=>this.appendChild(node))}
    replaceChildren(){this.children=[]}
    contains(node){return this===node||this.children.some(child=>child.contains(node))}
    getBoundingClientRect(){return {top:40}}
    scrollIntoView(){}
    focus(){document.activeElement=this;this.fire('focus')}
  }
  const elements=Object.fromEntries(['.header-search','#musicSearch','#musicSearchMenu','#youtubeResults','#musicSearchStatus','#preferKaraoke','#openYouTubeSearch','#musicSearchForm','#closeMusicSearch'].map(selector=>[selector,new Element()]));
  const document={activeElement:null,querySelector:selector=>elements[selector],createElement:tag=>new Element(tag),addEventListener(){}};
  const input=elements['#musicSearch'],menu=elements['#musicSearchMenu'],list=elements['#youtubeResults'],host=elements['.header-search'];
  host.append(input,menu);menu.append(list);document.activeElement=input;
  const selections=[],video={id:'dz3sM6ygX_g',title:'Regression song',channel:'Test channel',duration:120};
  const context={document,window:{addEventListener(){}},ManokaraI18n:{text:value=>value},localStorage:{getItem:()=>null,setItem(){}},innerHeight:800,URL,Date,AbortController,AbortSignal,
    setTimeout:fn=>{timers.push(fn);return timers.length},clearTimeout(){}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'outputs/manokara-search.js'),'utf8'),context);
  context.window.ManokaraSearch.init({ready:Promise.resolve(),endpoint:()=>'/__youtube/search',api:async()=>({ok:true,json:async()=>({results:[video]})}),choose:item=>{selections.push(item);return accept}});
  const load=async()=>{input.value='Regression song';elements['#musicSearchForm'].fire('submit');await new Promise(setImmediate)};
  return {input,menu,list,host,document,selections,load,flush(){while(timers.length)timers.shift()()}};
}

test('mouse selection survives blur between mousedown and click',async()=>{
  const h=searchHarness();await h.load();assert.equal(h.menu.hidden,false);
  const option=h.list.children[0],down=option.fire('mousedown');
  // A nonfocusable option originally focused body here; focusout then hid the dropdown before click.
  if(!down.defaultPrevented){h.document.activeElement=null;h.host.fire('focusout')}
  h.flush();if(!h.menu.hidden)option.fire('click');
  assert.equal(down.defaultPrevented,true);assert.equal(option.tabIndex,-1);
  assert.equal(h.selections.length,1);assert.equal(h.selections[0].id,'dz3sM6ygX_g');assert.equal(h.menu.hidden,true);
});

test('ArrowDown and Enter select the same video',async()=>{
  const h=searchHarness();await h.load();h.input.fire('keydown',{key:'ArrowDown'});
  assert.equal(h.input.attributes['aria-activedescendant'],'youtube-result-0');
  h.input.fire('keydown',{key:'Enter'});assert.equal(h.selections.length,1);assert.equal(h.menu.hidden,true);
});

test('declining draft replacement keeps results available',async()=>{
  const h=searchHarness(false);await h.load();h.list.children[0].fire('click');h.flush();
  assert.equal(h.menu.hidden,false);assert.equal(h.document.activeElement,h.input);
});

test('Add to setlist saves a selected video without requiring lyrics',()=>{
  const html=fs.readFileSync(path.join(root,'outputs/manokara.html'),'utf8');
  const handler=html.slice(html.indexOf("$('#add').onclick="),html.indexOf("$('#addmc').onclick="));
  const fields=Object.fromEntries(['add','url','ttl','st','en','llrc','loff'].map(id=>[id,{value:''}]));
  fields.url.value='https://www.youtube.com/watch?v=dz3sM6ygX_g';fields.ttl.value='Regression song';fields.loff.value='0';
  const items=[],messages=[];let resets=0;
  const context={$:selector=>fields[selector.slice(1)],items,edit:-1,pickDur:120,tp:globalThis.ManokaraCore.timeValue,
    TextEncoder,ManokaraLyrics:{displayLrc:item=>item.lrc,secondaryLrc:()=>''},lyricEditor:{read:()=>({lyricMode:'original'})},
    msg:value=>messages.push(value),reset:()=>resets++,save:()=>true,render(){},fetchSongTitle(){}};
  vm.runInNewContext(handler,context);fields.add.onclick();
  assert.equal(items.length,1);assert.equal(items[0].url,fields.url.value);assert.equal(items[0].title,'Regression song');
  assert.equal(items[0].ldur,120);assert.equal(items[0].lrc,'');assert.equal(resets,1);assert.equal(messages.at(-1),'Saved.');
});
