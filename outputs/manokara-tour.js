/* Contextual tours of the controller and overlay editor; playback and saved settings stay intact. */
(() => {
  'use strict';
  const karaokeSteps = [
    {target:'#setlistSide .section-head',
      en:['Your evening, one song at a time','Your songs live in this list. Click a song to play it; use its small buttons to edit, reorder or remove it. The list is saved in this browser.'],
      vi:['Danh sách bài của bạn','Các bài bạn thêm nằm ở đây. Bấm vào một bài để phát; các nút nhỏ bên cạnh giúp sửa, đổi thứ tự hoặc xóa bài. Danh sách được lưu ngay trên trình duyệt này.']},
    {target:'.header-search',
      en:['Find a song without hunting for links','Type a song or artist here. Karaoke prefers backing-track versions; switch it off for regular videos. Pick a result or use ↑/↓ and Enter to fill the song editor. Review the song and add lyrics before saving it to the setlist.'],
      vi:['Tìm bài ngay, khỏi đi sao chép link','Gõ tên bài hoặc ca sĩ ở đây. Bật Karaoke để ưu tiên bản nhạc hát; tắt nếu muốn tìm video thường. Bấm kết quả hoặc dùng ↑/↓ và Enter để điền vào phần thêm bài. Xem lại bài, thêm lời nếu cần rồi lưu vào danh sách nhé.']},
    {tab:'song',target:'.field-grid',
      en:['Start with a karaoke link','Paste a YouTube link or a direct audio/video URL. Manokara tries to fetch the title, and you can rename it whenever you like.'],
      vi:['Bắt đầu bằng một link karaoke','Dán link YouTube hoặc link trực tiếp đến file nhạc / video. Manokara sẽ thử lấy tên bài giúp bạn; bạn cũng có thể đặt lại tên cho dễ nhớ.']},
    {tab:'song',target:'.clip-row',
      en:['Sing the whole song, or just your favourite part','Start and End accept mm:ss or seconds. Leave End empty to play to the end. Lyric time zero corresponds to your chosen start point.'],
      vi:['Hát cả bài hoặc chọn đoạn bạn thích','Mốc bắt đầu và kết thúc nhận dạng phút:giây hoặc số giây. Để trống kết thúc nếu muốn phát hết bài. Thời gian 0 của lời tương ứng với điểm bắt đầu bạn chọn.']},
    {tab:'song',target:'.search-row',
      en:['Find the right lyrics','Search by song or artist, then choose a result below. Timed lyrics follow the music; plain lyrics need timing. If LRCLIB has no match, Lyricsify opens another place to look. Choose the same version as your karaoke audio.'],
      vi:['Tìm lời đúng bản bạn hát','Gõ tên bài hoặc ca sĩ, rồi chọn kết quả bên dưới. Lời có mốc thời gian sẽ chạy theo nhạc; lời thường cần gắn thêm thời gian. Chưa có trên LRCLIB thì thử Lyricsify nhé. Nhớ chọn bản khớp với nhạc karaoke của bạn.']},
    {tab:'song',target:'#llrc',
      en:['Already have an LRC? Bring it along','Paste your lyrics here, drop an .lrc file into this area, or use Import LRC above. Keep the [mm:ss.xx] timestamps: they tell every effect when each line should appear.'],
      vi:['Có file LRC rồi thì dùng luôn','Dán lời vào đây, thả file .lrc vào vùng này hoặc bấm Nhập file LRC ở phía trên. Giữ các mốc [phút:giây] nhé — mọi hiệu ứng dựa vào chúng để biết lúc nào hiện từng câu.']},
    {tab:'song',target:'.romaji-row',
      en:['Japanese lyrics, easier to read','Create Romaji adds Latin-letter readings without changing the original timecodes. Choose Original, Romaji or Japanese + Romaji. The first run needs to load a dictionary; review names and unusual readings before saving.'],
      vi:['Lời tiếng Nhật dễ đọc hơn','Tạo Romaji giúp thêm cách đọc bằng chữ Latin và giữ nguyên mốc thời gian gốc. Bạn chọn lời gốc, Romaji hoặc cả hai đều được. Lần đầu cần tải từ điển một chút; nhớ xem lại tên riêng và cách đọc trước khi lưu nhé.']},
    {tab:'song',target:'.form-actions',
      en:['Save your song','Add to setlist keeps the link and lyrics together. Song key saves a semitone shift for this song (0 is the original key). When editing, this button becomes Save changes. A positive lyric offset makes words appear earlier; a negative value makes them appear later.'],
      vi:['Lưu bài là sẵn sàng hát','Bấm Thêm vào danh sách để lưu cả link và lời. Tông bài hát lưu số nửa cung cần tăng giảm riêng cho bài này (0 là tông gốc). Khi sửa bài, nút sẽ thành Lưu thay đổi. Độ lệch lời dương cho chữ hiện sớm hơn, âm cho chữ hiện muộn hơn.']},
    {target:'.transport',
      en:['Take the stage','Play starts your set. Pause/Resume, previous, next and Stop are here, alongside volume. Below, Countdown gives you a moment before a song starts; set it to 0 to start straight away.'],
      vi:['Đến lúc cất giọng rồi','Bấm Phát để bắt đầu. Tạm dừng / Tiếp tục, bài trước, bài tiếp, Dừng và âm lượng đều ở đây. Đếm ngược bên dưới cho bạn vài giây chuẩn bị; đặt 0 nếu muốn vào bài ngay.']},
    {target:'.lyrics-footer',
      en:['Make the words match what you hear','Follow along in Live lyrics. If words are late, tap +0.5 s; if they are early, tap −0.5 s. Reset removes the offset. For plain lyrics, press T during playback to timestamp the next untimed line (outside text fields).'],
      vi:['Chỉnh cho lời khớp với nhạc','Theo dõi câu đang hát trong khung lời. Lời đến muộn thì bấm +0.5 s; đến sớm thì bấm −0.5 s. Đặt lại đưa độ lệch về 0. Với lời chưa có thời gian, bấm T khi đang phát để gắn mốc cho câu tiếp theo chưa được gắn; nhớ bấm ngoài ô nhập chữ nhé.']},
    {tab:'song',target:'#mcDetails',details:'#mcDetails',
      en:['Leave a little room between songs','Add an MC break for a note, introduction or a breather. Set its duration, then Add break. It joins your setlist and advances to the next item when its time is up.'],
      vi:['Chừa một chút thời gian giữa các bài','Thêm khoảng nghỉ để dẫn chuyện, giới thiệu bài hoặc lấy hơi. Nhập lời nhắc, thời lượng rồi bấm Thêm khoảng nghỉ. Mục này nằm trong danh sách và sẽ chuyển tiếp khi hết giờ.']},
    {tab:'output',target:'.obs-link',
      en:['Send the lyrics to OBS','Copy this link into the URL field of an OBS Browser Source. Keep the source active: disable “Shutdown source when not visible”. Keep this controller open while playing. Open lyrics window above gives you the same output in a separate window.'],
      vi:['Đưa lời sang OBS','Sao chép link này vào ô URL của nguồn Browser trong OBS. Giữ nguồn hoạt động: tắt “Shutdown source when not visible”. Khi hát, cứ để trang điều khiển này mở. Nút Mở cửa sổ lời phía trên sẽ cho bạn cùng đầu ra trong một cửa sổ riêng.']},
    {tab:'output',target:'.settings-grid',
      en:['Pick a look that suits your song','Choose JIZURA, Folia or another lyric style. Transparent keeps the glow and particles intact in OBS without chroma key; Green screen is also available. Pick a palette if you want different colours.'],
      vi:['Chọn hiệu ứng hợp với bài','Thử JIZURA, Folia hoặc các kiểu lời khác. Nền Trong suốt giữ được ánh sáng và hạt hiệu ứng trong OBS mà không cần lọc phông xanh. Bạn vẫn có thể chọn Phông xanh hoặc đổi bảng màu theo ý thích.']},
    {tab:'output',target:'.output-reaction',
      en:['Let supported Folia effects feel the music','Enable audio reaction, select the karaoke browser tab and tick Share tab audio. Only audio levels are shared, with no recording. This adds motion to supported effects; lyric timing still comes from the LRC, not automatic beat detection.'],
      vi:['Cho Folia chuyển động theo nhạc','Bật phản ứng theo nhạc, chọn tab karaoke rồi bật chia sẻ âm thanh của tab. Chỉ mức âm thanh được gửi đi, không ghi âm. Hiệu ứng hỗ trợ sẽ phản ứng theo nhạc; thời gian lời vẫn lấy từ LRC, chưa phải tự nhận nhịp để gắn thời gian.']},
    {tab:'output',target:'.type-settings',
      en:['Make the type your own','Adjust the font, size and bold setting for styles that support them. JIZURA controls its own typography, so those fields are disabled there. Use Shuffle JIZURA style above to try another motion, without changing the song.'],
      vi:['Chỉnh chữ theo ý bạn','Bạn có thể đổi phông, cỡ và chữ đậm với những kiểu có hỗ trợ. JIZURA tự quyết định kiểu chữ nên các ô này sẽ bị khóa khi chọn JIZURA. Muốn thử chuyển động khác, bấm Đổi ngẫu nhiên kiểu JIZURA ở phía trên — bài hát vẫn giữ nguyên.']},
    {tab:'output',target:'#centerRow',
      en:['Leave the middle for your character','Keep centre free puts alternating lines at the sides on wide frames, or above/below on tall ones. Some Folia scenes keep their original layout; the note here explains the selected effect. Match the frame shape to your OBS canvas.'],
      vi:['Chừa chỗ ở giữa cho nhân vật','Chừa trống giữa khung cho lời luân phiên hai bên khi khung ngang, hoặc trên / dưới khi khung dọc. Một số cảnh Folia giữ bố cục gốc; ghi chú ở đây sẽ nói rõ với hiệu ứng bạn đang chọn. Chọn dáng khung khớp với canvas OBS nhé.']},
    {target:'.header-actions',
      en:['You are ready — come back any time','Change the language or light/dark theme here. Key opens the built-in pitch controls: −/+ shifts by one semitone, Original key resets it. Each song remembers its key, and playback speed stays unchanged. YouTube key shifting needs server playback. Tap ? to revisit the guide.'],
      vi:['Vậy là sẵn sàng rồi nhé','Đổi ngôn ngữ hoặc giao diện sáng / tối ở đây. Nút Tông mở bộ chỉnh ngay trong app: −/+ đổi một nửa cung, Tông gốc để đặt lại. Mỗi bài nhớ tông riêng và tốc độ nhạc vẫn giữ nguyên. Đổi tông YouTube cần bật phát qua máy chủ. Khi cần xem lại, cứ bấm ? nhé.']}
  ];
  const overlaySteps = [
    {overlay:'playlist',target:'.studio-targets',
      en:['Two outputs, one editor','Playlist overlay shows the current song, setlist and next song. Lyrics overlay arranges the animated words. Each has its own OBS link. Switching between them keeps the music playing.'],
      vi:['Hai đầu ra, chỉnh ở cùng một chỗ','Overlay playlist hiện bài đang hát, danh sách bài và bài tiếp theo. Overlay lời dùng để canh khung chữ chạy. Mỗi phần có một link OBS riêng; bạn chuyển qua lại thì nhạc vẫn chạy nhé.']},
    {overlay:'playlist',target:'#studioPresets',
      en:['Choose a playlist design','Try Glass, Paper, Minimal, Card, Vinyl or Signal. Each changes the layout and visual treatment. Choosing a preset replaces the playlist appearance; you can then customize it below.'],
      vi:['Chọn kiểu playlist bạn thích','Thử Kính mờ, Trang giấy, Tối giản, Thẻ bài hát, Đĩa nhạc hoặc Thanh tín hiệu. Mỗi kiểu có bố cục và cách trình bày riêng. Chọn mẫu sẽ thay giao diện playlist hiện tại; sau đó bạn chỉnh tiếp ở bên dưới.']},
    {overlay:'playlist',target:'#studioFrame',
      en:['Match your OBS canvas','Choose a landscape or portrait frame. The preview keeps this aspect ratio. Use the displayed width and height for both OBS Browser Sources. Changing the frame scales your existing blocks.'],
      vi:['Chọn khung khớp với OBS','Chọn khung ngang hoặc dọc; phần xem trước sẽ giữ đúng tỉ lệ đó. Nhập cùng chiều rộng và chiều cao này cho hai nguồn Browser trong OBS. Đổi khung cũng sẽ co giãn các khối bạn đã đặt.']},
    {overlay:'playlist',target:'#studioLayoutSection',
      en:['Move each block, or keep them together','Separate blocks lets you position the current song, list and next song independently. One unified panel keeps them aligned so you can move and resize the whole playlist together.'],
      vi:['Tách từng khối hoặc gom cho dễ canh','Tách từng khối cho bạn đặt bài đang hát, danh sách và bài tiếp theo ở các vị trí riêng. Gom thành một bảng giữ chúng thẳng hàng để bạn kéo và đổi kích thước cả playlist cùng lúc.']},
    {overlay:'playlist',target:'#studioBlockSection',
      en:['Select the part you want to edit','Choose Now Singing, Song List or Next On. The controls below apply to that section. Show this block lets you hide it; in unified mode, position and size apply to the whole panel.'],
      vi:['Chọn phần muốn chỉnh','Bấm Bài đang hát, Danh sách bài hoặc Bài tiếp theo rồi chỉnh ở bên dưới. Bỏ chọn Hiện khối này nếu muốn ẩn phần đó. Khi gom thành một bảng, vị trí và kích thước sẽ áp dụng cho cả bảng.']},
    {overlay:'playlist',target:'#studioGeometry',
      en:['Position and resize without stretching','X and Y set the position; Width and Height set the size. Keep aspect ratio links width and height when resizing. You can also drag in the preview, resize from any of four corners or four edges, or use arrow keys; Shift moves in larger steps. Top center and Bottom center place the block quickly.'],
      vi:['Canh vị trí, đổi kích thước cho vừa','X và Y là vị trí; Rộng và Cao là kích thước. Bật Giữ tỉ lệ rộng/cao để phóng to, thu nhỏ mà không méo khung. Bạn cũng có thể kéo trong phần xem trước, kéo một trong 4 góc hoặc 4 cạnh để đổi cỡ, hoặc dùng phím mũi tên; giữ Shift để dịch nhanh hơn. Giữa trên và Giữa dưới giúp đặt khối nhanh vào hai vị trí đó.']},
    {overlay:'playlist',target:'#blockTypography',
      en:['Customize the headings and text','Rename the selected heading, adjust text size and alignment, or toggle bold. These settings are for the playlist; lyric fonts and effects have their own controls in Lyrics overlay.'],
      vi:['Chỉnh tiêu đề và chữ','Đổi tên tiêu đề đang chọn, cỡ chữ, căn trái / giữa / phải hoặc bật chữ đậm. Đây là phần chữ của playlist; font và hiệu ứng lời hát có bộ chỉnh riêng ở Overlay lời.']},
    {overlay:'playlist',target:'#playlistAppearance',
      en:['Colors and list content','Adjust text, accent and panel colors, opacity, corners and font. List content can show the whole setlist, upcoming songs or sung history. Numbers, progress and Hide when idle are optional.'],
      vi:['Đổi màu và chọn nội dung danh sách','Chỉnh màu chữ, màu nhấn, nền, độ đậm nền, bo góc và font. Danh sách có thể hiện cả setlist, các bài sắp hát hoặc những bài đã hát. Bạn cũng có thể bật số thứ tự, tiến trình và ẩn khi chưa phát bài.']},
    {overlay:'playlist',target:'#studioAutoScrollField',
      en:['Let viewers see the whole list','Auto-scroll moves long lists down and back up. Set its speed and the pause at each end below. Short lists stay still. With scrolling off, Static list limit controls how many songs appear.'],
      vi:['Cho người xem thấy hết danh sách','Bật tự cuộn để danh sách dài chạy xuống rồi quay lên. Chỉnh tốc độ và thời gian dừng ở mỗi đầu ngay bên dưới. Danh sách ngắn sẽ đứng yên; nếu tắt cuộn, Số bài khi tắt cuộn quyết định số bài được hiện.']},
    {overlay:'playlist',target:'.studio-preview-toolbar',
      en:['Preview before going live','Sample data helps you arrange the overlay without starting a song; Live data uses your current setlist and playback. Checkerboard, dark, light and scene backgrounds are only preview aids. Both overlays shows playlist and lyrics together.'],
      vi:['Xem trước rồi hãy lên sóng','Dữ liệu mẫu giúp canh overlay mà chưa cần phát bài; Bài đang phát lấy dữ liệu thật từ phiên hát. Nền caro, tối, sáng và mẫu livestream chỉ để dễ nhìn khi chỉnh. Bật Cả hai overlay để xem playlist và lời cùng nhau.']},
    {overlay:'playlist',target:'.studio-history-tools',
      en:['A closer look, and a way back','View larger opens a bigger preview. Undo and Redo move through layout edits; Reset layout restores the selected output’s layout. Your changes are saved automatically in this browser.'],
      vi:['Xem rõ hơn, sửa nhầm thì quay lại','Xem lớn mở khung xem trước rộng hơn. Hoàn tác và Làm lại giúp lùi / tiến qua các lần chỉnh bố cục; Đặt lại bố cục đưa đầu ra đang chọn về bố cục mặc định. Các chỉnh sửa được tự lưu trong trình duyệt này.']},
    {overlay:'playlist',target:'.studio-link',
      en:['Add the playlist to OBS','Copy this link into a separate OBS Browser Source for the playlist. Match its dimensions to the frame above. Keep Manokara open while singing and disable “Shutdown source when not visible” in OBS.'],
      vi:['Đưa playlist vào OBS','Sao chép link này vào một nguồn Browser riêng cho playlist. Đặt kích thước nguồn giống khung đã chọn phía trên. Khi hát, giữ Manokara mở và tắt “Shutdown source when not visible” trong OBS nhé.']},
    {overlay:'lyrics',target:'#studioLyricSettings',
      en:['Style your animated lyrics here','Choose the effect, transparency, palette, font and size here, just as in Karaoke → OBS output. These are shared settings. Classic karaoke also has a Sung highlight color; Keep centre free leaves space for your character in supported styles.'],
      vi:['Chỉnh hiệu ứng lời ngay tại đây','Chọn hiệu ứng, nền trong suốt, bảng màu, font và cỡ chữ giống phần Đầu ra OBS ở Karaoke. Hai nơi dùng chung một bộ setting. Karaoke cổ điển có thêm Màu quét; Chừa trống giữa khung giúp dành chỗ cho nhân vật với các kiểu có hỗ trợ.']},
    {overlay:'lyrics',target:'#studioGeometry',
      en:['Place the lyric viewport','The eight text effects use a compact frame fitted to the longest lines in the song; manual geometry edits turn auto-fit off. Scene effects and Keep centre free retain the full lyric viewport. Move or resize from any corner or edge; Keep aspect ratio preserves its shape. Effect and lyric content are unchanged; for Classic karaoke, word-timed LRC gives a more accurate sweep than line-only LRC.'],
      vi:['Đặt khung lời vào đúng chỗ','Tám hiệu ứng chữ dùng khung gọn ôm theo các câu dài nhất trong bài; chỉnh vị trí hoặc cỡ thủ công sẽ tắt tự ôm. Hiệu ứng dựng cảnh và Chừa trống giữa khung giữ vùng lời đầy đủ. Kéo mọi góc hoặc cạnh để đổi cỡ; Giữ tỉ lệ rộng/cao giúp khung không bị méo. Hiệu ứng và nội dung lời vẫn giữ nguyên; Karaoke cổ điển sẽ quét sát hơn nếu LRC có mốc từng từ thay vì chỉ từng câu.']},
    {overlay:'lyrics',target:'.studio-link',
      en:['The lyrics have their own OBS link','This is now the lyrics link. Copy it into your lyric Browser Source, keeping the playlist as a second source. The saved viewport and appearance apply to the lyric output.'],
      vi:['Lời hát có link OBS riêng','Link ở đây lúc này là link lời hát. Sao chép vào nguồn Browser dành cho lời; playlist vẫn là một nguồn riêng. Đầu ra lời sẽ dùng khung và giao diện bạn đã chỉnh.']},
    {overlay:'lyrics',target:'.studio-export',
      en:['Save a copy of your layout','Export layout downloads a JSON file for backup or another browser; Import layout restores one. It contains the overlay layout, not your songs. To revisit this guide, open Overlay and press ?; Karaoke has its own tour.'],
      vi:['Giữ một bản bố cục để dùng lại','Xuất bố cục tải file JSON để cất hoặc mang sang trình duyệt khác; Nhập bố cục mở lại file đó. File này lưu bố cục overlay, không kèm danh sách bài. Muốn xem lại hướng dẫn, vào Overlay rồi bấm ?; tab Karaoke có tour riêng nhé.']}
  ];
  const labels={en:{guide:'Getting started',overlayGuide:'Overlay guide',close:'Close guide',skip:'Skip guide',back:'Back',next:'Next',done:'Let’s sing',overlayDone:'Done',step:'Step',of:'of',language:'Guide language'},vi:{guide:'Làm quen với Manokara',overlayGuide:'Hướng dẫn chỉnh Overlay',close:'Đóng hướng dẫn',skip:'Bỏ qua',back:'Quay lại',next:'Tiếp',done:'Bắt đầu hát thôi',overlayDone:'Xong',step:'Bước',of:'/',language:'Ngôn ngữ hướng dẫn'}};
  let steps=karaokeSteps,root,card,focusRing,adapter,index=0,active=false,saved,frame=0,revision=0;
  const $=selector=>document.querySelector(selector);
  function bounds() {
    const view=window.visualViewport;
    return {left:view?.offsetLeft||0,top:view?.offsetTop||0,width:view?.width||innerWidth,height:view?.height||innerHeight};
  }
  function visibleRect(node,view) {
    const r=node.getBoundingClientRect();let left=Math.max(view.left+6,r.left-6),top=Math.max(view.top+6,r.top-6),right=Math.min(view.left+view.width-6,r.right+6),bottom=Math.min(view.top+view.height-6,r.bottom+6);
    for(let parent=node.parentElement;parent&&parent!==document.body;parent=parent.parentElement) {
      const style=getComputedStyle(parent),p=parent.getBoundingClientRect();
      if(/auto|scroll|hidden|clip/.test(style.overflowX)){left=Math.max(left,p.left);right=Math.min(right,p.right)}
      if(/auto|scroll|hidden|clip/.test(style.overflowY)){top=Math.max(top,p.top);bottom=Math.min(bottom,p.bottom)}
    }
    return {left,top,right:Math.max(left,right),bottom:Math.max(top,bottom),width:Math.max(0,right-left),height:Math.max(0,bottom-top)};
  }
  function place() {
    frame=0;if(!active)return;
    const target=$(steps[index].target);if(!target)return;
    const view=bounds(),r=visibleRect(target,view),gap=16,edge=12;
    root.style.setProperty('--tour-height',view.height+'px');
    root.style.setProperty('--tour-width',view.width+'px');
    card.style.width=Math.min(390,view.width-edge*2)+'px';
    card.style.maxHeight=Math.max(140,Math.min(view.height-edge*2,view.width<=620&&view.height>=500?view.height*.6:view.height))+'px';
    const size=card.getBoundingClientRect(),w=size.width,h=size.height;
    let x,y;
    if(view.width<=620){x=view.left+(view.width-w)/2;y=view.top+view.height-h-edge}
    else {
      const candidates=[
        {x:r.right+gap,y:r.top}, {x:r.left-w-gap,y:r.top},
        {x:r.left,y:r.bottom+gap}, {x:r.left,y:r.top-h-gap}
      ];
      const clampX=value=>Math.max(view.left+edge,Math.min(value,view.left+view.width-w-edge));
      const clampY=value=>Math.max(view.top+edge,Math.min(value,view.top+view.height-h-edge));
      const scored=candidates.map(c=>{
        const x=clampX(c.x),y=clampY(c.y),overlap=Math.max(0,Math.min(x+w,r.right)-Math.max(x,r.left))*Math.max(0,Math.min(y+h,r.bottom)-Math.max(y,r.top));
        return {x,y,score:overlap+Math.abs(c.x-x)+Math.abs(c.y-y)};
      }).sort((a,b)=>a.score-b.score);
      ({x,y}=scored[0]);
    }
    Object.assign(card.style,{left:x+'px',top:y+'px'});
    Object.assign(focusRing.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});
    // Four opaque regions dim the page without changing any target's stacking or layout.
    const masks=root.querySelectorAll('.tour-mask');
    const layouts=[{left:0,top:0,width:innerWidth,height:r.top},
      {left:0,top:r.bottom,width:innerWidth,height:Math.max(0,innerHeight-r.bottom)},
      {left:0,top:r.top,width:r.left,height:r.height},
      {left:r.right,top:r.top,width:Math.max(0,innerWidth-r.right),height:r.height}];
    masks.forEach((mask,i)=>{for(const [key,value] of Object.entries(layouts[i]))mask.style[key]=Math.max(0,value)+'px'});
  }
  function schedule(){if(active&&!frame)frame=requestAnimationFrame(place)}
  function resize(){if(active){revealTarget();schedule()}}
  function refreshCopy() {
    const lang=ManokaraI18n.language,l=labels[lang],[title,body]=steps[index][lang];
    root.querySelector('.tour-eyebrow').textContent=steps===overlaySteps?l.overlayGuide:l.guide;
    root.querySelector('#tourTitle').textContent=title;root.querySelector('#tourBody').textContent=body;
    root.querySelector('.tour-progress').textContent=`${l.step} ${index+1} ${l.of} ${steps.length}`;
    root.querySelector('.tour-meter').style.width=((index+1)/steps.length*100)+'%';
    const close=root.querySelector('[data-tour="close"]');close.setAttribute('aria-label',l.close);close.title=l.close;
    root.querySelector('[data-tour="skip"]').textContent=l.skip;
    root.querySelector('[data-tour="back"]').textContent=l.back;root.querySelector('[data-tour="back"]').disabled=index===0;
    root.querySelector('[data-tour="next"]').textContent=index===steps.length-1?(steps===overlaySteps?l.overlayDone:l.done):l.next;
    const language=root.querySelector('select');language.value=lang;language.setAttribute('aria-label',l.language);
    schedule();
  }
  function revealTarget() {
    const step=steps[index];adapter.showMain?.(steps===overlaySteps?'playlist':'karaoke');
    if(step.overlay&&ManokaraStudio.view.target!==step.overlay)ManokaraStudio.showTarget(step.overlay);
    if(step.tab)adapter.showTab(step.tab);
    if(step.details)$(step.details).open=true;
    const target=$(step.target);if(!target)return;
    target.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
  }
  function show(next) {
    index=Math.max(0,Math.min(next,steps.length-1));const current=++revision;
    refreshCopy();revealTarget();
    requestAnimationFrame(()=>{
      if(!active||current!==revision)return;place();
      // On a phone the guide sits below the highlighted field. Make room within its scroll pane.
      const view=bounds(),target=$(steps[index].target);if(!target)return;
      const r=target.getBoundingClientRect(),c=card.getBoundingClientRect();
      if(view.width<=620&&r.bottom>c.top-16) {
        let scroller=target.parentElement;
        while(scroller&&scroller!==document.body&&!(scroller.scrollHeight>scroller.clientHeight&&/auto|scroll/.test(getComputedStyle(scroller).overflowY)))scroller=scroller.parentElement;
        const amount=r.bottom-c.top+24;
        if(scroller&&scroller!==document.body)scroller.scrollTop+=amount;
        else window.scrollBy({top:amount,behavior:'instant'});
        place();
      }
      root.querySelector('[data-tour="next"]').focus({preventScroll:true});
    });
  }
  function keydown(event) {
    if(!active)return;
    if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();close();return}
    if(event.key==='Tab') {
      const controls=[...card.querySelectorAll('button:not([disabled]),select')],first=controls[0],last=controls.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
      return;
    }
    if(event.target.tagName==='SELECT')return;
    if(event.key==='ArrowRight'){event.preventDefault();advance()}
    if(event.key==='ArrowLeft'){event.preventDefault();show(index-1)}
  }
  function advance(){if(index===steps.length-1)close();else show(index+1)}
  function open() {
    if(active)return;
    if(!$('#transposeDialog').hidden)$('#transposeClose').click();
    const background=[...document.querySelectorAll('.app-header,.main-tabs,#grid,#playlistStudio,.app-footer')];
    saved={focus:document.activeElement,main:adapter.main?.()||'karaoke',overlay:ManokaraStudio.view,tab:$('#panel-song').hidden?'output':'song',
      details:[...document.querySelectorAll('main details')].map(node=>({node,open:node.open})),
      scroll:[...document.querySelectorAll('main,main *,#playlistStudio,#playlistStudio *')].filter(node=>node.scrollHeight>node.clientHeight||node.scrollWidth>node.clientWidth).map(node=>({node,top:node.scrollTop,left:node.scrollLeft})),
      x:scrollX,y:scrollY,background:background.map(node=>({node,inert:node.inert}))};
    steps=saved.main==='playlist'?overlaySteps:karaokeSteps;
    saved.background.forEach(({node})=>node.inert=true);
    active=true;root.hidden=false;
    document.addEventListener('keydown',keydown,true);document.addEventListener('scroll',schedule,true);
    window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);window.visualViewport?.addEventListener('scroll',schedule);
    show(0);
  }
  function close() {
    if(!active)return;active=false;revision++;root.hidden=true;
    cancelAnimationFrame(frame);frame=0;
    document.removeEventListener('keydown',keydown,true);document.removeEventListener('scroll',schedule,true);
    window.removeEventListener('resize',resize);window.visualViewport?.removeEventListener('resize',resize);window.visualViewport?.removeEventListener('scroll',schedule);
    saved.details.forEach(({node,open})=>node.open=open);adapter.showTab(saved.tab);adapter.showMain?.(saved.main);ManokaraStudio.restoreView(saved.overlay);
    saved.background.forEach(({node,inert})=>node.inert=inert);
    saved.scroll.forEach(({node,top,left})=>{node.scrollTop=top;node.scrollLeft=left});window.scrollTo({left:saved.x,top:saved.y,behavior:'instant'});
    const restore=saved.focus?.isConnected?saved.focus:$('#help');restore.focus({preventScroll:true});
  }
  function init(integration) {
    adapter=integration;
    root=document.createElement('div');root.className='tour-overlay';root.hidden=true;
    root.innerHTML='<div class="tour-mask"></div><div class="tour-mask"></div><div class="tour-mask"></div><div class="tour-mask"></div><div class="tour-spotlight" aria-hidden="true"></div><section class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tourTitle" aria-describedby="tourBody"><div class="tour-top"><span class="tour-eyebrow"></span><select><option value="vi">Tiếng Việt</option><option value="en">English</option></select><button class="ghost tour-close" data-tour="close">×</button></div><p class="tour-progress" aria-live="polite"></p><h2 id="tourTitle"></h2><p id="tourBody"></p><div class="tour-track" aria-hidden="true"><div class="tour-meter"></div></div><div class="tour-actions"><button class="ghost" data-tour="skip"></button><div><button class="s" data-tour="back"></button><button data-tour="next"></button></div></div></section>';
    document.body.appendChild(root);card=root.querySelector('.tour-card');focusRing=root.querySelector('.tour-spotlight');
    root.addEventListener('click',event=>{const action=event.target.closest('[data-tour]')?.dataset.tour;if(action==='close'||action==='skip')close();else if(action==='back')show(index-1);else if(action==='next')advance()});
    root.querySelector('select').addEventListener('change',event=>ManokaraI18n.setLanguage(event.target.value));
    window.addEventListener('manokara:languagechange',()=>{if(active)refreshCopy()});
    $('#help').addEventListener('click',open);
  }
  window.ManokaraTour={init,open,close,get active(){return active;}};
})();
