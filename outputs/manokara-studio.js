/* A visual editor for Manokara's original playlist presets and lyric viewport. */
(() => {
  'use strict';
  const O=ManokaraOverlay,storage='manokaraOverlayV1';let config=O.defaults();
  try{config=O.normalize(localStorage.getItem(storage))}catch(_){}
  let serialized=JSON.stringify(config),adapter,root,canvas,preview,playlist,lyricFrame,scale=1,target='playlist',selected='current',dataMode='sample',currentMain='karaoke',live=null,drag=null;
  const undo=[],redo=[],previewSubscribers=new Set();let demoStart=performance.now(),lastPreviewKey='',saveTimer,changed=false;
  const presetPreviews=[];
  let previewDialog;
  let aspectLocked=true;try{aspectLocked=localStorage.getItem('manokaraOverlayAspectLock')!=='false'}catch(_){}
  const presetDescriptions={glass:'Broadcast dashboard',paper:'A paper setlist',minimal:'Let the type speak',card:'Artwork in the spotlight',vinyl:'At the turntable',signal:'A compact lower third'};
  const vi={
    'Playlist appearance':'Giao diện playlist','Make room for your music.':'Canh một góc riêng cho buổi hát của bạn.',
    'Design your playlist and lyrics here. OBS follows your saved layout.':'Chỉnh playlist và khung lời ngay tại đây. OBS sẽ dùng bố cục bạn đã lưu.',
    'Playlist overlay':'Overlay playlist','Lyrics overlay':'Overlay lời','Glass':'Kính mờ','Paper':'Trang giấy','Minimal':'Tối giản','Card':'Thẻ bài hát','Vinyl':'Đĩa nhạc','Signal':'Thanh tín hiệu',
    'Broadcast dashboard':'Bảng setlist kính mờ','A paper setlist':'Setlist trên trang giấy','Let the type speak':'Chữ lớn, nền thoáng','Artwork in the spotlight':'Ảnh bìa làm điểm nhấn','At the turntable':'Một góc bàn đĩa','A compact lower third':'Thanh nhạc ở đáy khung',
    'Output frame':'Khung đầu ra','Frame size':'Kích thước khung','Landscape 1080p':'Khung ngang 1080p','Landscape 720p':'Khung ngang 720p','Portrait':'Khung dọc',
    'Blocks':'Các khối','Now Singing':'Bài đang hát','Song List':'Danh sách bài','Next On':'Bài tiếp theo','Lyric viewport':'Vùng hiển thị lời',
    'Show this block':'Hiện khối này','Position & size':'Vị trí và kích thước','Width':'Rộng','Height':'Cao','Typography':'Kiểu chữ','Heading':'Tiêu đề','Text size':'Cỡ chữ','Alignment':'Căn chữ','Left':'Trái','Center':'Giữa','Right':'Phải','Bold':'Chữ đậm',
    'Appearance':'Diện mạo','Text':'Chữ','Accent':'Màu nhấn','Panel':'Nền khối','Panel opacity':'Độ đậm nền','Corner radius':'Bo góc','Font':'Font','System':'Mặc định','Serif':'Có chân','Mono':'Đơn cách',
    'List content':'Nội dung danh sách','Whole setlist':'Cả setlist','Upcoming songs':'Bài sắp hát','Sung history':'Các bài đã hát','Visible songs':'Số bài hiển thị','Show numbers':'Hiện số thứ tự','Show progress':'Hiện tiến trình','Hide when idle':'Ẩn khi chưa có bài đang hát',
    'Live preview':'Xem trước','Sample data':'Dữ liệu mẫu','Live data':'Bài đang phát','Both overlays':'Cả hai overlay','Checkerboard':'Nền caro','Dark':'Nền tối','Light':'Nền sáng','Scene guide':'Mẫu bố cục livestream',
    'Undo':'Hoàn tác','Redo':'Làm lại','Reset layout':'Đặt lại bố cục','Center block':'Đặt giữa khung','Copy OBS link':'Sao chép link OBS','Open output':'Mở đầu ra','Connecting…':'Đang kết nối…',
    'View larger':'Xem lớn','Close preview':'Thu gọn',
    'Keep aspect ratio':'Giữ tỉ lệ rộng/cao',
    'No song is playing. Choose Sample data to arrange the lyrics.':'Chưa có bài đang phát. Chọn Dữ liệu mẫu để canh khung lời trước nhé.',
    'This song has no timed lyrics yet. Add LRC in Karaoke, or choose Sample data.':'Bài này chưa có lời LRC. Thêm lời ở Karaoke, hoặc chọn Dữ liệu mẫu để xem trước.',
    'This lyric block is hidden. Turn on Show this block to preview.':'Khung lời đang được ẩn. Bật Hiện khối này để xem trước nhé.',
    'Drag blocks to move; use the corner handle to resize. Arrow keys move the selected block.':'Kéo khối để di chuyển, kéo góc để đổi kích thước. Phím mũi tên giúp dịch khối đang chọn.',
    'Preview background stays on this page. Both OBS sources are transparent.':'Nền xem trước chỉ hiện trên trang này. Cả hai nguồn OBS đều trong suốt.',
    'Changes saved in this browser.':'Đã lưu chỉnh sửa trong trình duyệt này.','OBS link copied.':'Đã sao chép link OBS.','Select and copy the link.':'Chọn rồi sao chép link nhé.',
    'Export layout':'Xuất bố cục','Import layout':'Nhập bố cục','Layout imported.':'Đã nhập bố cục.','Could not import this layout.':'Chưa nhập được bố cục này.',
    'Playback keeps running when you switch tabs.':'Nhạc vẫn chạy khi bạn chuyển tab.',
    'Use the frame size above for both OBS Browser Sources. Keep this page open while playing.':'Đặt cả hai nguồn Browser trong OBS theo kích thước khung bên trên. Giữ trang này mở khi hát.',
    'Lyrics effects and colors are set in Karaoke → OBS output.':'Chọn hiệu ứng và màu lời ở Karaoke → Đầu ra OBS.',
    'Clear sung history':'Xóa lịch sử đã hát','Clear the sung history for this session?':'Xóa lịch sử bài đã hát của phiên này?',
    'Preview only · no song is started':'Chỉ xem mẫu · không phát bài hát','Storage unavailable. Layout remains in this window.':'Chưa lưu được vào trình duyệt. Bố cục vẫn được giữ trong cửa sổ này.'
  };
  const t=key=>ManokaraI18n.language==='vi'?(vi[key]||key):key;
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const displayNumber=value=>Math.round(value*1000)/1000;
  const copy=key=>'<span data-studio-copy="'+esc(key)+'">'+esc(t(key))+'</span>';
  function input(label,id,type='number',extra=''){return '<label class="field">'+copy(label)+'<input id="'+id+'" type="'+type+'" '+extra+'></label>'}
  function option(value,label){return '<option value="'+value+'" data-studio-copy="'+esc(label)+'">'+esc(t(label))+'</option>'}
  const names={current:'Now Singing',list:'Song List',next:'Next On',lyric:'Lyric viewport'};
  function status(message){root.querySelector('#studioStatus').textContent=t(message)}
  function remember(before){undo.push(before);if(undo.length>30)undo.shift();redo.length=0}
  function update(mutator,record=true){const before=serialized;mutator(config);config=O.normalize(config);serialized=JSON.stringify(config);if(before===serialized)return;if(record)remember(before);changed=true;clearTimeout(saveTimer);saveTimer=setTimeout(save,250);render();adapter.changed()}
  function save(){if(!changed)return;try{localStorage.setItem(storage,serialized);status('Changes saved in this browser.')}catch(_){status('Storage unavailable. Layout remains in this window.')}changed=false}
  function block(){return target==='lyrics'?config.lyric:config.playlist.blocks[selected]}
  function chooseMain(name){if(!root)return;currentMain=name==='playlist'?'playlist':'karaoke';document.getElementById('grid').hidden=currentMain!=='karaoke';root.hidden=currentMain!=='playlist';
    document.querySelectorAll('[data-main-tab]').forEach(button=>{const on=button.dataset.mainTab===currentMain;button.setAttribute('aria-selected',String(on));button.tabIndex=on?0:-1});
    // Suspend the expensive lyric preview when it is not on screen.
    if(currentMain==='karaoke'){if(previewDialog?.open)previewDialog.close();lyricFrame?.remove();lyricFrame=null;lastPreviewKey=''}else render();
  }
  function chooseTarget(name){target=name==='lyrics'?'lyrics':'playlist';if(target==='lyrics')selected='lyric';else if(selected==='lyric')selected='current';render()}
  function sample(){const time=((performance.now()-demoStart)/1000)%30;const titles=['I Really Want to Stay at Your House','Open Arms','夜に駆ける','Một ngày bình yên','Fly Me to the Moon'];return {...live,ready:true,title:titles[0],effect:live?.effect||'clean',lrc:'[00:00.00]Your song, your stage\n[00:05.00]Let the words follow the music\n[00:10.00]Một góc nhỏ cho lời hát\n[00:15.00]君の歌を聞かせて\n[00:20.00]Sing your way\n[00:25.00]Your song, your stage',romajiLrc:'',time,sampledAt:Date.now(),duration:30,playing:true,paused:false,counting:false,mc:false,playlistTime:time,timelineVersion:1,
    playlist:JSON.stringify({now:titles[0],next:titles[1],status:'playing',videoId:'',currentIndex:0,nextIndex:1,songs:titles.map((title,index)=>({title,index})),history:[{title:'Last song of the evening',index:4}]})}}
  function previewState(){return dataMode==='sample'?sample():(live||{ready:false})}
  function arrange(){
    if(!canvas)return;
    // Size the visible frame itself, so the checkerboard marks the OBS canvas.
    const space=preview.parentElement,w=space.clientWidth,h=space.clientHeight;
    if(!w||!h)return;
    const frameScale=Math.min(w/config.width,h/config.height);
    preview.style.width=config.width*frameScale+'px';
    preview.style.height=config.height*frameScale+'px';
    preview.style.aspectRatio=config.width+' / '+config.height;
    scale=O.fit(canvas,preview,config);
    arrangePresetPreviews();
  }
  function arrangePresetPreviews(){
    for(const item of presetPreviews){
      const {host,stage,bounds,crop}=item;if(!host.clientWidth||!host.clientHeight)continue;
      const s=(crop?Math.max:Math.min)((host.clientWidth-16)/bounds.w,(host.clientHeight-12)/bounds.h);
      Object.assign(stage.style,{transform:'scale('+s+')',left:((host.clientWidth-bounds.w*s)/2-bounds.x*s)+'px',top:((host.clientHeight-bounds.h*s)/2-bounds.y*s)+'px'});
    }
  }
  function buildPresetPreviews(){
    for(const theme of O.themes){
      const host=root.querySelector('[data-theme-preview="'+theme+'"]'),stage=document.createElement('div');stage.className='preset-canvas';host.append(stage);
      const preset=O.defaults(theme),renderer=O.createPlaylist(stage);
      renderer.render(preset,{now:'Blue hour',next:'Fly Me to the Moon',currentIndex:0,nextIndex:1,status:'paused',songs:[{index:0,title:'Blue hour'},{index:1,title:'Fly Me to the Moon'},{index:2,title:'夜に駆ける'}]});renderer.tick(74,210);
      // Preview the primary design at a readable scale, without the empty frame.
      for(const key of ['list','next'])renderer.nodes[key].node.hidden=true;
      const blocks=[preset.playlist.blocks.current],x=Math.min(...blocks.map(b=>b.x)),y=Math.min(...blocks.map(b=>b.y));
      const bounds={x,y,w:Math.max(...blocks.map(b=>b.x+b.w))-x,h:Math.max(...blocks.map(b=>b.y+b.h))-y};
      if(theme==='card'){bounds.x+=20;bounds.y+=20;bounds.w-=40;bounds.h=280}
      presetPreviews.push({host,stage,bounds,crop:theme==='card'});
    }
  }
  function expandPreview(){
    if(previewDialog.open){previewDialog.close();return}
    const pane=root.querySelector('.studio-preview-pane');previewDialog.append(pane);previewDialog.showModal();
    const button=pane.querySelector('[data-action="expand"]'),label=button.querySelector('[data-studio-copy]');label.dataset.studioCopy='Close preview';label.textContent=t('Close preview');button.setAttribute('aria-expanded','true');button.focus();arrange();
  }
  function ensureLyrics(show){if(show&&!lyricFrame){lyricFrame=document.createElement('iframe');lyricFrame.className='studio-lyric-preview';lyricFrame.title=t('Lyrics overlay');lyricFrame.allow='autoplay';lyricFrame.src='./manokara-lyrics-view.html?preview=1';canvas.insertBefore(lyricFrame,canvas.firstChild)}else if(!show&&lyricFrame){lyricFrame.remove();lyricFrame=null;lastPreviewKey=''}if(lyricFrame){O.geometry(lyricFrame,config.lyric);lyricFrame.hidden=!config.lyric.visible}}
  function tickPreview(){if(currentMain!=='playlist')return;const state=previewState();let data={};try{data=JSON.parse(state.playlist||'{}')}catch(_){}playlist.render(config,data);playlist.tick(state.playlistTime||0,state.duration);
    const empty=root.querySelector('#studioEmpty');let message='';if(target==='lyrics'){if(!config.lyric.visible)message='This lyric block is hidden. Turn on Show this block to preview.';else if(!state.counting&&!state.mc){if(state.ready===false||!state.title)message='No song is playing. Choose Sample data to arrange the lyrics.';else if(!state.lrc?.trim())message='This song has no timed lyrics yet. Add LRC in Karaoke, or choose Sample data.'}}
    const shown=t(message);if(empty.textContent!==shown)empty.textContent=shown;empty.hidden=!message;
    if(lyricFrame){const key=JSON.stringify([state.lrc,state.effect,state.title,state.playing,state.paused,state.time,state.sampledAt,state.centerFree,state.colorTheme,state.themeSeed,state.foreground,state.size,state.font]);if(key!==lastPreviewKey){lastPreviewKey=key;for(const fn of previewSubscribers)fn(state)}}}
  function render(){
    if(!root)return;const p=config.playlist,b=block();
    root.querySelectorAll('[data-target]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.target===target)));
    root.querySelector('#studioPresets').hidden=target==='lyrics';root.querySelector('#playlistAppearance').hidden=target==='lyrics';root.querySelector('#blockTypography').hidden=target==='lyrics';root.querySelector('#lyricLayoutNote').hidden=target!=='lyrics';
    const blocks=root.querySelector('#studioBlocks');blocks.replaceChildren();for(const key of target==='lyrics'?['lyric']:['current','list','next']){const button=document.createElement('button');button.className='s';button.dataset.select=key;button.setAttribute('aria-pressed',String(key===selected));button.textContent=t(names[key]);blocks.append(button)}
    const values={studioX:displayNumber(b.x),studioY:displayNumber(b.y),studioW:displayNumber(b.w),studioH:displayNumber(b.h),studioSize:b.size||64,studioLabel:b.label||'',studioAlign:b.align||'left',studioFg:p.foreground,studioAccent:p.accent,studioBg:p.background,studioOpacity:p.opacity,studioRadius:p.radius,studioFont:p.font,studioLimit:p.limit,studioListMode:p.listMode,studioFrame:config.width+'x'+config.height};
    for(const [id,value] of Object.entries(values)){const el=root.querySelector('#'+id);if(document.activeElement!==el)el.value=value}
    root.querySelector('#studioVisible').checked=b.visible;root.querySelector('#studioBold').checked=!!b.bold;root.querySelector('#studioNumbering').checked=p.numbering;root.querySelector('#studioProgress').checked=p.progress;root.querySelector('#studioHideIdle').checked=p.hideIdle;
    root.querySelector('#studioAspectLock').checked=aspectLocked;
    const aspect=b.w/b.h;root.querySelector('#studioAspectRatio').textContent=Math.abs(aspect-16/9)<.00001?'16:9':Math.abs(aspect-9/16)<.00001?'9:16':Math.abs(aspect-1)<.00001?'1:1':aspect.toFixed(2)+':1';
    root.querySelectorAll('[data-theme-preset]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.themePreset===p.theme)));
    root.querySelector('[data-action="undo"]').disabled=!undo.length;root.querySelector('[data-action="redo"]').disabled=!redo.length;
    for(const key of ['current','list','next']){const n=playlist.nodes[key].node;n.style.display=target==='lyrics'&&!root.querySelector('#studioBoth').checked?'none':''}
    canvas.querySelectorAll('.studio-hit').forEach(el=>el.remove());
    const keys=target==='lyrics'?['lyric']:['current','list','next'];
    for(const key of keys){const r=key==='lyric'?config.lyric:p.blocks[key];if(!r.visible)continue;const hit=document.createElement('button');hit.className='studio-hit';hit.dataset.hit=key;hit.setAttribute('aria-label',t(names[key]));hit.setAttribute('aria-pressed',String(key===selected));O.geometry(hit,r);hit.style.zIndex='40';const label=document.createElement('span');label.className='studio-hit-label';label.textContent=t(names[key]);hit.append(label);if(key===selected){const handle=document.createElement('span');handle.className='studio-resize';handle.dataset.resize='1';hit.append(handle)}canvas.append(hit)}
    const both=root.querySelector('#studioBoth').checked;ensureLyrics(currentMain==='playlist'&&(target==='lyrics'||both));
    root.querySelector('#studioSourceSize').textContent=config.width+' × '+config.height;
    const ratio=config.width/config.height;
    root.querySelector('#studioFrameBadge').textContent=config.width+' × '+config.height+' · '+(Math.abs(ratio-16/9)<.001?'16:9':Math.abs(ratio-9/16)<.001?'9:16':config.width+':'+config.height);
    root.querySelector('#studioObsUrl').value=adapter.url(target==='lyrics'?'lyrics':'playlist')||t('Connecting…');
    arrange();tickPreview();
  }
  function setFrame(value){const [w,h]=value.split('x').map(Number);update(c=>{const sx=w/c.width,sy=h/c.height;for(const b of [c.lyric,...Object.values(c.playlist.blocks)]){b.x*=sx;b.y*=sy;b.w*=sx;b.h*=sy;b.size*=Math.min(sx,sy)}c.width=w;c.height=h})}
  function resizeLocked(rect,original,factor){
    const min=Math.max(32/original.w,32/original.h),max=Math.min((config.width-rect.x)/original.w,(config.height-rect.y)/original.h);
    const amount=Math.min(max,Math.max(min,factor));rect.w=original.w*amount;rect.h=original.h*amount;
  }
  function startDrag(event){const hit=event.target.closest('[data-hit]');if(!hit||event.button!==0)return;event.preventDefault();selected=hit.dataset.hit;const initial=O.clone(block());drag={pointer:event.pointerId,x:event.clientX,y:event.clientY,rect:initial,before:serialized,resize:!!event.target.closest('[data-resize]'),locked:aspectLocked};preview.setPointerCapture(event.pointerId);render()}
  function moveDrag(event){if(!drag||drag.pointer!==event.pointerId)return;const dx=(event.clientX-drag.x)/scale,dy=(event.clientY-drag.y)/scale,r=block();if(drag.resize){if(drag.locked){const factor=1+(dx*drag.rect.w+dy*drag.rect.h)/(drag.rect.w**2+drag.rect.h**2);resizeLocked(r,drag.rect,factor)}else{r.w=Math.min(config.width-r.x,Math.max(32,drag.rect.w+dx));r.h=Math.min(config.height-r.y,Math.max(32,drag.rect.h+dy))}}else{r.x=Math.max(0,Math.min(config.width-r.w,drag.rect.x+dx));r.y=Math.max(0,Math.min(config.height-r.h,drag.rect.y+dy))}serialized=JSON.stringify(config);const hit=canvas.querySelector('[data-hit="'+selected+'"]');if(hit)O.geometry(hit,r);if(selected==='lyric'&&lyricFrame)O.geometry(lyricFrame,r);else if(playlist.nodes[selected])O.geometry(playlist.nodes[selected].node,r);for(const [key,id] of [['x','studioX'],['y','studioY'],['w','studioW'],['h','studioH']])root.querySelector('#'+id).value=Math.round(r[key])}
  function endDrag(event){if(!drag||drag.pointer!==event.pointerId)return;const before=drag.before;drag=null;if(preview.hasPointerCapture(event.pointerId))preview.releasePointerCapture(event.pointerId);if(before!==serialized){remember(before);changed=true;save();adapter.changed()}render();canvas.querySelector('[data-hit="'+selected+'"]')?.focus({preventScroll:true})}
  function init(integration){
    adapter=integration;root=document.getElementById('playlistStudio');
    root.innerHTML='<div class="studio-heading"><div><span class="eyebrow">'+copy('Playlist appearance')+'</span><h2>'+copy('Make room for your music.')+'</h2><p>'+copy('Design your playlist and lyrics here. OBS follows your saved layout.')+'</p></div><div class="studio-targets"><button class="s" data-target="playlist">'+copy('Playlist overlay')+'</button><button class="s" data-target="lyrics">'+copy('Lyrics overlay')+'</button></div></div>'+
      '<div id="studioPresets" class="studio-presets" role="group" aria-label="Playlist presets">'+O.themes.map(theme=>'<button class="studio-preset" data-theme-preset="'+theme+'"><span class="preset-art '+theme+'" data-theme-preview="'+theme+'" aria-hidden="true"></span><span class="preset-name">'+copy(theme[0].toUpperCase()+theme.slice(1))+'</span><small class="preset-description">'+copy(presetDescriptions[theme])+'</small></button>').join('')+'</div>'+
      '<div class="studio-body"><aside class="card studio-controls"><section><h3>'+copy('Output frame')+'</h3><label class="field">'+copy('Frame size')+'<select id="studioFrame">'+option('1920x1080','Landscape 1080p')+option('1280x720','Landscape 720p')+option('1080x1920','Portrait')+'</select></label></section>'+
      '<section class="studio-section"><h3>'+copy('Blocks')+'</h3><div id="studioBlocks" class="studio-blocks"></div><label class="inline-check"><input id="studioVisible" type="checkbox">'+copy('Show this block')+'</label></section>'+
      '<section class="studio-section"><h3>'+copy('Position & size')+'</h3><div class="studio-fields">'+input('X','studioX','number','min="0" step="any"')+input('Y','studioY','number','min="0" step="any"')+input('Width','studioW','number','min="32" step="any"')+input('Height','studioH','number','min="32" step="any"')+'</div><label class="inline-check studio-aspect-lock"><input id="studioAspectLock" type="checkbox">'+copy('Keep aspect ratio')+'<small id="studioAspectRatio"></small></label><button class="ghost" data-action="center">'+copy('Center block')+'</button></section>'+
      '<section id="blockTypography" class="studio-section"><h3>'+copy('Typography')+'</h3>'+input('Heading','studioLabel','text','maxlength="80"')+'<div class="studio-fields">'+input('Text size','studioSize','number','min="12" max="96"')+'<label class="field">'+copy('Alignment')+'<select id="studioAlign">'+option('left','Left')+option('center','Center')+option('right','Right')+'</select></label></div><label class="inline-check"><input id="studioBold" type="checkbox">'+copy('Bold')+'</label></section>'+
      '<small id="lyricLayoutNote">'+copy('Lyrics effects and colors are set in Karaoke → OBS output.')+'</small>'+
      '<section id="playlistAppearance" class="studio-section"><h3>'+copy('Appearance')+'</h3><div class="studio-fields">'+input('Text','studioFg','color')+input('Accent','studioAccent','color')+input('Panel','studioBg','color')+input('Panel opacity','studioOpacity','number','min="0" max="1" step="0.05"')+input('Corner radius','studioRadius','number','min="0" max="80"')+'<label class="field">'+copy('Font')+'<select id="studioFont">'+option('system','System')+option('geist','Geist')+option('serif','Serif')+option('mono','Mono')+'</select></label></div><label class="field">'+copy('List content')+'<select id="studioListMode">'+option('all','Whole setlist')+option('upcoming','Upcoming songs')+option('history','Sung history')+'</select></label>'+input('Visible songs','studioLimit','number','min="1" max="20"')+'<label class="inline-check"><input id="studioNumbering" type="checkbox">'+copy('Show numbers')+'</label><label class="inline-check"><input id="studioProgress" type="checkbox">'+copy('Show progress')+'</label><label class="inline-check"><input id="studioHideIdle" type="checkbox">'+copy('Hide when idle')+'</label><button class="ghost" data-action="history">'+copy('Clear sung history')+'</button></section>'+
      '<section class="studio-section studio-export"><button class="s" data-action="export">'+copy('Export layout')+'</button><button class="s" data-action="import">'+copy('Import layout')+'</button><input id="studioImport" type="file" accept=".json,application/json" hidden></section></aside>'+
      '<section class="card studio-preview-pane"><div class="studio-preview-toolbar"><h3 id="studioPreviewTitle">'+copy('Live preview')+'</h3><div class="row"><select id="studioData" aria-label="Preview data">'+option('sample','Sample data')+option('live','Live data')+'</select><select id="studioBgView" aria-label="Preview background">'+option('checker','Checkerboard')+option('dark','Dark')+option('light','Light')+option('scene','Scene guide')+'</select><label class="inline-check"><input id="studioBoth" type="checkbox">'+copy('Both overlays')+'</label></div><div class="studio-history-tools"><button class="s" data-action="expand" aria-haspopup="dialog" aria-expanded="false">'+copy('View larger')+'</button><button class="s" data-action="undo">'+copy('Undo')+'</button><button class="s" data-action="redo">'+copy('Redo')+'</button><button class="ghost" data-action="reset">'+copy('Reset layout')+'</button></div></div>'+
      '<div class="studio-preview-space"><div id="studioPreview" class="studio-preview" data-bg="checker"><div id="studioCanvas"></div><div id="studioEmpty" class="studio-empty" role="status" hidden></div></div><span id="studioFrameBadge" class="studio-frame-badge"></span></div><small class="studio-source-note">'+copy('Drag blocks to move; use the corner handle to resize. Arrow keys move the selected block.')+'</small><small class="studio-source-note">'+copy('Preview background stays on this page. Both OBS sources are transparent.')+'</small>'+
      '<div class="studio-link"><input id="studioObsUrl" readonly aria-label="Overlay OBS URL"><button data-action="copy">'+copy('Copy OBS link')+'</button><button class="s" data-action="open">'+copy('Open output')+'</button></div><small class="studio-source-note"><b id="studioSourceSize"></b> · '+copy('Use the frame size above for both OBS Browser Sources. Keep this page open while playing.')+'</small><div id="studioStatus" class="studio-status" role="status"></div></section></div>';
    canvas=root.querySelector('#studioCanvas');preview=root.querySelector('#studioPreview');playlist=O.createPlaylist(canvas);
    buildPresetPreviews();
    previewDialog=document.createElement('dialog');previewDialog.className='studio-large-preview';previewDialog.setAttribute('aria-labelledby','studioPreviewTitle');root.append(previewDialog);
    previewDialog.addEventListener('close',()=>{const pane=previewDialog.querySelector('.studio-preview-pane');if(!pane)return;root.querySelector('.studio-body').append(pane);const button=pane.querySelector('[data-action="expand"]'),label=button.querySelector('[data-studio-copy]');label.dataset.studioCopy='View larger';label.textContent=t('View larger');button.setAttribute('aria-expanded','false');arrange();if(currentMain==='playlist')button.focus({preventScroll:true})});
    window.ManokaraPreview={getSnapshot:previewState,subscribe(fn){previewSubscribers.add(fn);fn(previewState());return()=>previewSubscribers.delete(fn)}};
    document.querySelectorAll('[data-main-tab]').forEach(button=>button.addEventListener('click',()=>chooseMain(button.dataset.mainTab)));
    document.querySelector('.main-tabs').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?'karaoke':e.key==='End'?'playlist':currentMain==='karaoke'?'playlist':'karaoke';chooseMain(next);document.querySelector('[data-main-tab="'+next+'"]').focus()});
    root.addEventListener('click',async e=>{const button=e.target.closest('button');if(!button)return;if(button.dataset.target){chooseTarget(button.dataset.target);return}if(button.dataset.select){selected=button.dataset.select;render();return}
      if(button.dataset.themePreset){update(c=>{const p=O.defaults(button.dataset.themePreset).playlist;const sx=c.width/1920,sy=c.height/1080;for(const r of Object.values(p.blocks)){r.x*=sx;r.y*=sy;r.w*=sx;r.h*=sy;r.size*=Math.min(sx,sy)}c.playlist=p});return}
      const action=button.dataset.action;if(action==='expand'){expandPreview();return}if(action==='center')update(()=>{block().x=(config.width-block().w)/2;block().y=(config.height-block().h)/2});
      if(action==='reset')update(c=>{if(target==='lyrics')c.lyric={x:0,y:0,w:c.width,h:c.height,visible:true};else{const p=O.defaults(c.playlist.theme).playlist;const sx=c.width/1920,sy=c.height/1080;for(const r of Object.values(p.blocks)){r.x*=sx;r.y*=sy;r.w*=sx;r.h*=sy;r.size*=Math.min(sx,sy)}c.playlist=p}});
      if(action==='undo'||action==='redo'){const from=action==='undo'?undo:redo,to=action==='undo'?redo:undo;if(from.length){to.push(serialized);config=O.normalize(from.pop());serialized=JSON.stringify(config);changed=true;save();render();adapter.changed()}}
      if(action==='copy'){const url=adapter.url(target==='lyrics'?'lyrics':'playlist');if(!url)return;try{await navigator.clipboard.writeText(url);status('OBS link copied.')}catch(_){root.querySelector('#studioObsUrl').select();status('Select and copy the link.')}}
      if(action==='open'){const url=adapter.url(target==='lyrics'?'lyrics':'playlist');if(url){const output=new URL(url);output.searchParams.set('popup','1');window.open(output.href,'manokara-'+target,'width=1280,height=720')}}
      if(action==='history'&&confirm(t('Clear the sung history for this session?'))){adapter.clearHistory();tickPreview()}
      if(action==='export'){const blob=new Blob([JSON.stringify(config,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='manokara-overlay.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
      if(action==='import')root.querySelector('#studioImport').click();
    });
    const fieldMap={studioX:'x',studioY:'y',studioW:'w',studioH:'h',studioSize:'size',studioLabel:'label',studioAlign:'align',studioVisible:'visible',studioBold:'bold'};
    const appearanceMap={studioFg:'foreground',studioAccent:'accent',studioBg:'background',studioOpacity:'opacity',studioRadius:'radius',studioFont:'font',studioLimit:'limit',studioListMode:'listMode',studioNumbering:'numbering',studioProgress:'progress',studioHideIdle:'hideIdle'};
    root.addEventListener('change',async e=>{const el=e.target;
      if(el.id==='studioFrame'){setFrame(el.value);return}if(el.id==='studioData'){dataMode=el.value;demoStart=performance.now();lastPreviewKey='';tickPreview();return}if(el.id==='studioBgView'){preview.dataset.bg=el.value;return}if(el.id==='studioBoth'){render();return}
      if(el.id==='studioAspectLock'){aspectLocked=el.checked;try{localStorage.setItem('manokaraOverlayAspectLock',String(aspectLocked))}catch(_){}return}
      if(el.id==='studioImport'){try{const file=el.files?.[0];if(!file)return;if(file.size>16000)throw Error();const value=JSON.parse(await file.text());if(value.version!==1||!value.playlist||!value.lyric)throw Error();update(()=>{config=O.normalize(value)});status('Layout imported.')}catch(_){status('Could not import this layout.')}finally{el.value=''}return}
      if(fieldMap[el.id]||appearanceMap[el.id]){if(el.type==='number'&&(!el.value||!el.checkValidity())){render();return}const value=el.type==='checkbox'?el.checked:el.type==='number'?Number(el.value):el.value;update(c=>{if(fieldMap[el.id]){const key=fieldMap[el.id],b=block();if(aspectLocked&&(key==='w'||key==='h'))resizeLocked(b,O.clone(b),value/b[key]);else b[key]=value}else c.playlist[appearanceMap[el.id]]=value});if(['studioX','studioY','studioW','studioH'].includes(el.id))el.value=displayNumber(block()[fieldMap[el.id]])}
    });
    preview.addEventListener('pointerdown',startDrag);preview.addEventListener('pointermove',moveDrag);preview.addEventListener('pointerup',endDrag);preview.addEventListener('pointercancel',endDrag);
    preview.addEventListener('keydown',e=>{const hit=e.target.closest('[data-hit]');if(!hit||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();selected=hit.dataset.hit;const amount=e.shiftKey?10:1;update(()=>{const r=block();r.x=Math.min(config.width-r.w,Math.max(0,r.x+({ArrowLeft:-amount,ArrowRight:amount}[e.key]||0)));r.y=Math.min(config.height-r.h,Math.max(0,r.y+({ArrowUp:-amount,ArrowDown:amount}[e.key]||0)))});canvas.querySelector('[data-hit="'+selected+'"]')?.focus()});
    new ResizeObserver(arrange).observe(preview.parentElement);window.addEventListener('pagehide',save);
    window.addEventListener('manokara:languagechange',()=>{root.querySelectorAll('[data-studio-copy]').forEach(n=>n.textContent=t(n.dataset.studioCopy));render()});
    document.getElementById('editLyricLayout').addEventListener('click',()=>{chooseMain('playlist');chooseTarget('lyrics')});
    render();setInterval(tickPreview,100);
  }
  window.ManokaraStudio={init,showMain:chooseMain,showTarget:chooseTarget,get main(){return currentMain},get serialized(){return serialized},feed(snapshot){live=snapshot;if(root&&!root.hidden)tickPreview()},refresh:render};
})();
