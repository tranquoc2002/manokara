/* Controller-only translations. Song titles, lyrics and user input are never translated. */
(() => {
  'use strict';
  const vi = {
    'Too many requests. Try again shortly.':'Bạn vừa thử hơi nhiều lần. Chờ một chút rồi thử lại nhé.',
    'Too many video lookups. Try again shortly.':'Máy chủ đang lấy nhạc cho vài lượt phát khác. Chờ một chút nhé.',
    'YouTube stream lookup failed. Try again or open the video on YouTube.':'Chưa lấy được luồng nhạc YouTube. Thử lại sau hoặc mở video trên YouTube nhé.',
    'YouTube stream lookup failed or timed out.':'Lấy luồng nhạc YouTube bị lỗi hoặc chờ quá lâu. Thử lại sau nhé.',
    'YouTube blocked the server stream lookup. Embedded playback can still work; key shifting is unavailable for this source right now.':'YouTube đang chặn máy chủ lấy luồng nhạc. Trình phát nhúng có thể vẫn chạy, nhưng nguồn này hiện chưa đổi tông được.',
    'YouTube is limiting stream lookups. Wait a minute before trying again.':'YouTube đang hạn chế lấy luồng nhạc. Bạn chờ khoảng một phút rồi thử lại nhé.',
    'yt-dlp is outdated. Update the server environment with: python -m pip install -U "yt-dlp[default]".':'yt-dlp trên máy chủ đã cũ. Cập nhật trong môi trường chạy server bằng: python -m pip install -U "yt-dlp[default]".',
    'YouTube needs an up-to-date JavaScript runtime and yt-dlp-ejs. Update "yt-dlp[default]" and use Node 22+ or Deno 2.3+.':'YouTube cần bộ xử lý JavaScript và yt-dlp-ejs mới. Hãy cập nhật "yt-dlp[default]", dùng Node từ 22 hoặc Deno từ 2.3 nhé.',
    'This media link did not allow pitch processing. Playing the original key.':'Nguồn nhạc chưa cho phép đổi tông. App đang phát lại ở tông gốc nhé.',
    'Key':'Tông', 'Change song key':'Đổi tông bài hát', 'Song key':'Tông bài hát',
    'Lower key':'Giảm tông', 'Raise key':'Tăng tông', 'Original key':'Tông gốc',
    'Saved song key in semitones':'Tông lưu cho bài hát (nửa cung)',
    'Raise or lower the key without changing the speed. Each song remembers its own setting.':'Tăng giảm tông mà vẫn giữ tốc độ nhạc. Mỗi bài sẽ nhớ tông bạn đã chọn.',
    'YouTube uses server playback when key shifting is on. The server needs yt-dlp, FFmpeg and Deno or Node. Media links need to allow audio processing.':'Khi đổi tông YouTube, app sẽ phát nhạc qua máy chủ. Máy chủ cần yt-dlp, FFmpeg và Deno hoặc Node. Với link media, nguồn nhạc cần cho phép xử lý âm thanh.',
    "Try small shifts first (±1–4 semitones). Large shifts can change the sound of a full mix. Lyrics compensate for the processor's audio delay.":'Bạn thử tăng giảm ít trước nhé (±1–4 nửa cung). Đổi quá nhiều có thể làm âm thanh biến dạng. Lời hát được bù độ trễ của bộ xử lý âm thanh.',
    'Play a song to change its key.':'Phát một bài để chỉnh tông nhé.', 'Preparing key-shifted audio…':'Đang chuẩn bị nhạc đổi tông…',
    'Key applied. Saved for this song.':'Đã đổi tông và lưu cho bài hát này.', 'Original key.':'Đang phát ở tông gốc.',
    'Pitch needs Chrome or Edge on HTTPS / localhost.':'Đổi tông cần Chrome hoặc Edge, mở qua HTTPS hoặc localhost nhé.',
    'Pitch processor took too long to start. Try again.':'Bộ đổi tông khởi động hơi lâu. Bạn thử lại nhé.',
    'This media link needs CORS permission for pitch. Use a same-origin or CORS-enabled link.':'Link nhạc này chưa cho phép xử lý âm thanh. Hãy dùng link cùng máy chủ hoặc nguồn cho phép CORS nhé.',
    'Pitch processor stopped. Original key is playing; press a key button to retry.':'Bộ đổi tông vừa dừng. Nhạc đang phát ở tông gốc; bấm tăng hoặc giảm tông để thử lại nhé.',
    'This source cannot change key. Use YouTube or a media link.':'Nguồn này chưa đổi tông được. Hãy dùng YouTube hoặc link media nhé.',
    'YouTube key shifting needs server playback enabled (MANOKARA_YTDLP_ENABLED=1). See DEPLOY.md.':'Đổi tông YouTube cần bật phát qua máy chủ (MANOKARA_YTDLP_ENABLED=1). Xem hướng dẫn trong DEPLOY.md nhé.',
    'Find music on YouTube':'Tìm nhạc trên YouTube', 'Find a song on YouTube…':'Tìm bài hát trên YouTube…', 'Find a song on YouTube':'Tìm bài hát trên YouTube',
    'Prefer karaoke versions':'Ưu tiên phiên bản karaoke', 'Search YouTube':'Tìm trên YouTube', 'Close search results':'Đóng kết quả tìm kiếm', 'YouTube search results':'Kết quả tìm trên YouTube',
    '↑ ↓ to choose · Enter to select':'↑ ↓ để chọn · Enter để dùng', 'Search on YouTube':'Mở tìm trên YouTube',
    'Type a song or artist. Search starts after 2 characters.':'Gõ tên bài hoặc ca sĩ. Từ 2 ký tự là tự tìm; tên ngắn hơn thì bấm Enter nhé.',
    'Searching YouTube…':'Đang tìm trên YouTube…', 'Choose a video to fill the song editor.':'Chọn một video để điền vào phần thêm bài hát.',
    'No matching videos. Try another name.':'Chưa tìm thấy video phù hợp. Thử tên khác nhé.',
    'Restart the updated server to enable YouTube search.':'Khởi động lại máy chủ sau khi cập nhật để dùng tìm kiếm YouTube nhé.',
    'YouTube search is temporarily unavailable. Try again or search on YouTube.':'Chưa tìm được trên YouTube lúc này. Thử lại hoặc bấm Mở tìm trên YouTube nhé.',
    'YouTube search took too long. Try again.':'YouTube trả lời hơi lâu. Thử lại nhé.', 'Could not connect. Check your connection and try again.':'Chưa kết nối được. Kiểm tra mạng rồi thử lại nhé.',
    'YouTube search needs yt-dlp on the server. You can still search on YouTube.':'Máy chủ cần cài yt-dlp để tìm ngay trong app. Bạn vẫn có thể bấm Mở tìm trên YouTube nhé.',
    'YouTube search needs a working yt-dlp installation on the server.':'yt-dlp trên máy chủ chưa chạy được. Kiểm tra cài đặt rồi thử lại nhé.',
    'YouTube search is busy. Try again in a moment.':'Tìm kiếm YouTube đang bận. Chờ một chút rồi thử lại nhé.',
    'Enter a song or artist name (1–160 characters).':'Nhập tên bài hoặc ca sĩ, dài từ 1 đến 160 ký tự nhé.',
    'Too many requests. Try again shortly.':'Bạn tìm hơi nhanh rồi. Chờ một chút và thử lại nhé.',
    'Replace the current song draft with this video? Unsaved edits will be discarded.':'Đổi bài đang soạn sang video này nhé? Phần sửa chưa lưu sẽ bị bỏ.',
    'Video selected. Find lyrics if you like, then Add to setlist.':'Đã chọn video. Bạn có thể tìm thêm lời rồi bấm Thêm vào danh sách nhé.',
    'Manokara — your karaoke studio':'Manokara — góc hát của bạn',
    'Skip to studio':'Đi đến khu vực hát',
    'Connecting to OBS…':'Đang kết nối OBS…', 'Connecting…':'Đang kết nối…',
    'Pitch and speed with Transpose':'Chỉnh tông và tốc độ bằng Transpose',
    'Switch between light and dark theme':'Đổi giao diện sáng / tối', 'Switch color theme':'Đổi giao diện sáng / tối', 'Theme':'Giao diện',
    'Pitch, speed & loops':'Tông, tốc độ và phát lặp', 'Make it your key.':'Hát ở tông hợp với bạn.',
    'Transpose is a browser extension for pitch, speed, and loops. Install it in the browser profile you use for Manokara.':'Transpose là tiện ích trình duyệt để chỉnh tông, tốc độ và phát lặp. Hãy cài vào trình duyệt bạn đang dùng để mở Manokara.',
    'Install Transpose using the button below.':'Bấm nút bên dưới để cài Transpose.',
    'Open Manokara in a browser window with the extension toolbar visible.':'Mở Manokara trong cửa sổ trình duyệt có thanh tiện ích.',
    'Play a song, then open Transpose from the toolbar.':'Phát một bài rồi mở Transpose trên thanh tiện ích.',
    'If the extension does not detect embedded video, allow access to Manokara and YouTube, then try its':'Nếu tiện ích chưa nhận ra video, hãy cho phép truy cập Manokara và YouTube, rồi thử chế độ',
    'mode. A new window uses your current browser profile.':'Cửa sổ mới sẽ dùng cùng hồ sơ trình duyệt của bạn.',
    'Install Transpose':'Cài Transpose', 'Open Manokara window':'Mở cửa sổ Manokara', 'Close':'Đóng',
    'Open Manokara through its configured server URL.':'Hãy mở Manokara bằng địa chỉ máy chủ đã thiết lập.',
    'The lyric relay requires the Python server. See DEPLOY.md for setup.':'Đồng bộ lời cần máy chủ Python. Xem cách thiết lập trong DEPLOY.md.',
    'Setlist':'Danh sách bài', 'Add a song':'Thêm bài hát', 'Every set starts somewhere.':'Bắt đầu với bài bạn thích nhé.',
    'Add your first song, then make the evening yours.':'Thêm bài đầu tiên rồi hát theo cách của bạn.',
    'Songs in your setlist':'Các bài trong danh sách', 'Clear setlist':'Xóa danh sách', 'Saved in this browser':'Được lưu trên trình duyệt này',
    'Karaoke player':'Trình phát karaoke', 'Your stage':'Sân khấu của bạn', 'Ready when you are':'Sẵn sàng khi bạn muốn hát',
    'Your next song starts here.':'Bài hát tiếp theo bắt đầu ở đây.',
    'Add a karaoke link, find your lyrics,':'Dán link karaoke, tìm lời bài hát,', 'and let your voice take the lead.':'rồi cất giọng thôi.',
    'Add your first song':'Thêm bài đầu tiên', 'Nothing playing yet':'Chưa phát bài nào', 'Open on YouTube':'Mở trên YouTube',
    'Previous song':'Bài trước', 'Next song':'Bài tiếp', 'Play':'Phát', 'Pause':'Tạm dừng', 'Resume':'Tiếp tục', 'Stop':'Dừng', 'Volume':'Âm lượng',
    'Skip unavailable songs':'Bỏ qua bài không phát được', 'Countdown':'Đếm ngược', 'Countdown seconds':'Số giây đếm ngược',
    'Song and output settings':'Cài đặt bài hát và đầu ra', 'Studio tools':'Công cụ', 'Song editor':'Soạn bài hát', 'OBS output':'Đầu ra OBS', 'More below':'Còn ở bên dưới',
    "A karaoke link, a few lyrics, and you're ready.":'Có link karaoke và lời bài hát là sẵn sàng rồi.',
    'Karaoke link':'Link karaoke', 'Song title':'Tên bài hát', 'Paste a YouTube or media URL':'Dán link YouTube hoặc file nhạc / video', 'Fetched automatically':'Tự lấy từ link nếu có',
    'Start at':'Bắt đầu từ', 'End at':'Kết thúc tại', 'Full song':'Hết bài',
    'Play the whole song or choose a section. End is optional.':'Hát cả bài hoặc chọn một đoạn. Có thể để trống mốc kết thúc.',
    'Song lyrics':'Lời bài hát', 'Bring the words along':'Thêm lời để hát cùng', 'Search lyrics by song or artist':'Tìm lời theo tên bài hoặc ca sĩ', 'Song or artist':'Tên bài hát hoặc ca sĩ',
    'Find lyrics':'Tìm lời', 'Search Lyricsify in a new browser tab':'Tìm trên Lyricsify trong cửa sổ mới', 'Lyric search results':'Kết quả tìm lời',
    'Import LRC':'Nhập file LRC', 'Encoding':'Mã hóa', 'Auto · UTF-8 / Shift_JIS':'Tự chọn · UTF-8 / Shift_JIS',
    'Original lyrics LRC':'Lời gốc dạng LRC',
    '[00:12.00] Your first line…\n[00:16.50] Your next line…\n\nPaste lyrics or drop an .lrc file here.':'[00:12.00] Câu hát đầu tiên…\n[00:16.50] Câu hát tiếp theo…\n\nDán lời hoặc thả file .lrc vào đây.',
    'Create Romaji':'Tạo Romaji', 'Display':'Hiển thị', 'Original lyrics':'Lời gốc', 'Japanese + Romaji':'Tiếng Nhật + Romaji',
    'Review / edit Romaji':'Xem và sửa Romaji',
    'Edit readings only. Keep timestamps, metadata and blank lines unchanged. In dual mode, Romaji appears below the original words.':'Bạn có thể sửa cách đọc, nhưng hãy giữ nguyên mốc thời gian, thông tin bài và dòng trống. Khi chọn cả hai, Romaji sẽ nằm dưới lời gốc.',
    'Romaji lyrics LRC':'Lời Romaji dạng LRC', 'Download Romaji LRC':'Tải LRC Romaji',
    'Lyric offset':'Lệch thời gian lời', 'Lyric offset in seconds':'Độ lệch lời tính bằng giây', 'Cancel edit':'Hủy sửa', 'Add to setlist':'Thêm vào danh sách', 'Save changes':'Lưu thay đổi', 'Edit song':'Sửa bài hát',
    'Add an MC break':'Thêm khoảng nghỉ / dẫn chuyện', 'Your note or announcement':'Ghi chú hoặc lời dẫn của bạn', 'MC break note':'Nội dung lời dẫn', 'MC break duration':'Thời lượng nghỉ', 'Add break':'Thêm khoảng nghỉ',
    'Take your lyrics live.':'Đưa lời bài hát lên màn hình.', 'Your own output for OBS or a second screen.':'Dùng với OBS hoặc mở ở màn hình thứ hai.',
    'Open lyrics window':'Mở cửa sổ lời', 'OBS Browser Source URL':'Link nguồn trình duyệt OBS', 'Copy link':'Sao chép link',
    'Paste this into an OBS Browser Source. Keep it active.':'Dán vào nguồn Browser của OBS và giữ nguồn hoạt động.',
    'Revoke the previous OBS link and create a new one':'Vô hiệu hóa link OBS cũ và tạo link mới', 'Replace link':'Đổi link',
    'Output appearance':'Giao diện đầu ra', 'A style for your sound':'Chọn kiểu chuyển động bạn thích', 'Visual style':'Hiệu ứng lời',
    'JIZURA Auto · full effects':'JIZURA tự động · đầy đủ hiệu ứng', 'Folia Major · original visualizers':'Folia Major · hiệu ứng gốc',
    'Tempera · ink':'Tempera · nét mực', 'Sonnet · kinetic focus':'Sonnet · chuyển động chữ', 'Lumiere · light reveal':'Lumiere · ánh sáng', 'Hanabi · character burst':'Hanabi · chữ bung nở',
    'Sung highlight':'Màu quét',
    'Classic karaoke · two-line sweep':'Karaoke cổ điển · quét màu hai dòng',
    'Two alternating lines, white words and a sung highlight. Enhanced LRC follows word timestamps; regular LRC estimates the sweep. Choose Sung highlight or a color palette for the sweep (blue by default).':'Hai dòng lời thay nhau, chữ trắng và màu quét theo câu hát. LRC có mốc từng từ sẽ quét theo mốc đó; LRC thường sẽ ước lượng nhịp quét. Chọn Màu quét hoặc bảng màu để đổi màu chạy theo lời (mặc định là xanh dương).',
    'Clean fade':'Hiện / ẩn nhẹ nhàng', 'Word pop':'Chữ bật lên', 'Neon sweep':'Vệt sáng neon', 'Glitch hit':'Nhiễu glitch',
    'Background':'Nền', 'Transparent':'Trong suốt', 'Green screen':'Phông xanh', 'Color palette':'Bảng màu', 'Effect palette':'Màu của hiệu ứng',
    'White':'Trắng', 'Ice cyan':'Xanh băng', 'Rose':'Hồng', 'Amber':'Vàng hổ phách', 'Violet':'Tím', 'Mint':'Xanh bạc hà',
    'Text size':'Cỡ chữ', 'Output text size':'Cỡ chữ đầu ra', 'Text color':'Màu chữ', 'Shuffle JIZURA style':'Đổi ngẫu nhiên kiểu JIZURA', 'Randomize JIZURA lyric motion':'Đổi ngẫu nhiên chuyển động lời JIZURA',
    'Enable audio reaction':'Bật phản ứng theo nhạc', 'Stop audio reaction':'Tắt phản ứng theo nhạc',
    'Share the karaoke tab with tab audio enabled. No recording.':'Chia sẻ tab karaoke và bật âm thanh của tab. Không ghi âm.',
    'Folia reacts to the selected tab audio. Lyrics follow the LRC timecodes.':'Folia đang chuyển động theo nhạc của tab bạn chọn. Lời vẫn chạy theo mốc LRC.',
    'Use Chrome or Edge over HTTPS / localhost to share tab audio.':'Dùng Chrome hoặc Edge qua HTTPS / localhost để chia sẻ âm thanh tab.',
    'No tab audio selected. Choose the karaoke tab and enable Share tab audio.':'Chưa có âm thanh. Chọn tab karaoke và bật “Chia sẻ âm thanh của tab”.', 'Audio sharing cancelled.':'Đã hủy chia sẻ âm thanh.',
    'Output typography':'Chữ trên đầu ra', 'Type & layout':'Phông chữ và bố cục', 'Font family':'Phông chữ', 'Custom font':'Phông tự chọn', 'An installed or Google font':'Tên phông đã cài hoặc phông Google', 'Bold lyrics':'Chữ đậm',
    'Fonts marked “online” load from Google Fonts. Installed fonts work locally.':'Phông có chữ “online” được tải từ Google Fonts. Phông đã cài trên máy dùng được ngay.',
    'Keep centre free':'Chừa trống giữa khung', 'Output frame':'Dáng khung', 'Automatic':'Tự động', 'Landscape':'Ngang', 'Portrait':'Dọc',
    'The outlined area stays clear for a character':'Vùng được đánh dấu dành cho nhân vật hoặc video', 'Lyrics alternate around the open centre in supported effects.':'Với hiệu ứng hỗ trợ, lời sẽ luân phiên quanh vùng trống ở giữa.',
    'Live lyrics':'Lời đang hát', 'Smaller lyric text':'Giảm cỡ chữ lời', 'Larger lyric text':'Tăng cỡ chữ lời', 'A little guidance, right on cue.':'Theo lời, bắt đúng nhịp.', 'Current song lyrics':'Lời của bài đang phát',
    'Your words will find their place here.':'Lời bài hát sẽ hiện ở đây.', 'Add lyrics to a song to follow along.':'Thêm lời vào bài để hát theo nhé.',
    'Live sync':'Chỉnh khớp lời', 'Current live sync offset':'Độ lệch thời gian lời hiện tại', 'Sync: ':'Khớp lời: ', 'Reset':'Đặt lại',
    'Nudge the words to match what you hear. + shows lines earlier; − shows them later.':'Chỉnh để lời khớp với nhạc bạn nghe. + cho lời hiện sớm hơn; − cho lời hiện muộn hơn.', 'Set line time':'Gắn thời gian cho câu',
    'Sing your way. Your setlist, your room.':'Bài bạn chọn. Góc hát của bạn.', 'Credits & licenses':'Nguồn và giấy phép',
    'Folia notices':'Thông tin Folia', 'Folia source':'Mã nguồn Folia', 'Integration source':'Mã nguồn tích hợp', 'JIZURA license':'Giấy phép JIZURA', 'Romaji notices':'Thông tin Romaji', 'Interface fonts & icons':'Phông và biểu tượng giao diện',
    'Browser storage is full or unavailable. Changes remain in this window only.':'Trình duyệt không lưu được nữa. Thay đổi hiện chỉ còn trong cửa sổ này.',
    'Ready':'Sẵn sàng', 'Starting soon':'Sắp bắt đầu', 'Paused':'Đang tạm dừng', 'Playing':'Đang phát',
    'Playback was blocked. Press Play to start the media.':'Trình duyệt đang chặn tự phát. Bấm Phát để bắt đầu nhé.', 'Press Play to start now':'Bấm Phát để bắt đầu ngay',
    'YouTube API could not load: Pause is unavailable and lyric timing is approximate.':'Không tải được API YouTube: chưa dùng được Tạm dừng và lời chỉ chạy theo thời gian ước tính.',
    ' Open it on YouTube to check.':' Mở trên YouTube để kiểm tra nhé.', 'Embedded playback is unavailable. Trying server playback…':'Không phát nhúng được. Đang thử phát qua máy chủ…',
    'Server playback is unavailable.':'Chưa phát được qua máy chủ.', 'Invalid video stream.':'Luồng video không hợp lệ.', 'Server video stream was interrupted.':'Luồng video từ máy chủ bị ngắt.', 'Server video stream could not play. Try again.':'Chưa phát được video từ máy chủ. Thử lại nhé.', 'Playing video through the server.':'Đang phát video qua máy chủ.',
    'Invalid video ID or URL.':'Mã video hoặc link chưa đúng.', 'Video is unavailable, private, or has been removed.':'Video không khả dụng, đang riêng tư hoặc đã bị xóa.',
    'YouTube did not receive a referrer/client identity. Open Manokara from localhost or HTTPS, not file://.':'YouTube chưa nhận được thông tin nguồn truy cập. Hãy mở Manokara qua localhost hoặc HTTPS, thay vì file://.', 'YouTube could not play this video.':'YouTube chưa phát được video này.',
    'Setlist finished. Ready for another song?':'Đã hết danh sách. Thêm bài nữa nhé?', 'MC break':'Khoảng nghỉ', 'MC break · ':'Khoảng nghỉ · ', 'Announcement':'Lời dẫn', 'Take a moment between songs.':'Nghỉ một chút giữa các bài nhé.',
    'Could not load this media.':'Không tải được nhạc / video này.', 'Open this link to play.':'Mở link này để phát.', 'This media opens in a new tab. Your lyric clock is running here.':'Nhạc / video sẽ mở ở tab mới. Lời vẫn chạy theo đồng hồ tại đây.', 'Open media ':'Mở nhạc / video ',
    'Starting in ':'Bắt đầu sau ', ' · Lyrics ready':' · Có lời', 'Media':'Nhạc / video', 'Move up':'Đưa lên', 'Move song up':'Đưa bài lên', 'Move down':'Đưa xuống', 'Move song down':'Đưa bài xuống', 'Remove from setlist':'Xóa khỏi danh sách',
    'Removed from the setlist. The current song keeps playing until it ends or you press Stop.':'Đã xóa khỏi danh sách. Bài đang hát vẫn phát đến hết hoặc khi bạn bấm Dừng.',
    'Paste a karaoke URL first.':'Dán link karaoke trước nhé.', 'Use valid times (mm:ss or seconds); End must be after Start.':'Nhập thời gian dạng phút:giây hoặc số giây. Mốc kết thúc cần nằm sau mốc bắt đầu.',
    'Lyrics are too long for the relay (maximum 230 KB).':'Lời quá dài để đồng bộ (tối đa 230 KB).', 'Combined output lyrics exceed 230 KB. Shorten the LRC or choose a single display language.':'Tổng lời đầu ra vượt 230 KB. Rút ngắn LRC hoặc chọn hiển thị một ngôn ngữ nhé.',
    'Saved.':'Đã lưu.', 'Enter a positive MC duration (mm:ss or seconds).':'Nhập thời lượng nghỉ lớn hơn 0, dạng phút:giây hoặc số giây nhé.', 'Remove all songs?':'Xóa tất cả bài trong danh sách?',
    'Setlist cleared. The current song keeps playing until it ends or you press Stop.':'Đã xóa danh sách. Bài đang hát vẫn phát đến hết hoặc khi bạn bấm Dừng.',
    'Searching…':'Đang tìm…', 'Timed lyrics':'Lời có mốc thời gian', 'Plain lyrics':'Lời chưa có thời gian', 'No results.':'Chưa tìm thấy bài phù hợp.', 'Search failed. Check your connection.':'Chưa tìm được lời. Kiểm tra kết nối rồi thử lại nhé.',
    'Synced lyrics picked. Press Add/Save to keep them.':'Đã chọn lời có thời gian. Bấm Thêm / Lưu để giữ lại nhé.', 'Plain text only: it will scroll roughly evenly. During playback press T to time each line.':'Lời chưa có thời gian nên sẽ chạy theo nhịp ước tính. Khi phát nhạc, bấm T để gắn thời gian cho từng câu.',
    'Pause is not available for this link.':'Link này chưa hỗ trợ tạm dừng.', 'Add a song first.':'Thêm một bài trước nhé.', 'Stopped. Press Play to start again.':'Đã dừng. Bấm Phát để bắt đầu lại.',
    'Extension store opened. Install it in this browser.':'Đã mở cửa hàng tiện ích. Cài vào trình duyệt này nhé.', 'Manokara opened in this browser profile.':'Đã mở Manokara trong cùng hồ sơ trình duyệt.',
    ' (lyrics earlier)':' (lời sớm hơn)', ' (lyrics later)':' (lời muộn hơn)', 'System default':'Mặc định của máy',
    'Reroll the JIZURA lyric-motion style for the current song':'Chọn ngẫu nhiên một kiểu chuyển động JIZURA khác cho bài hiện tại', 'Select JIZURA to randomize its lyric-motion style':'Chọn JIZURA để đổi ngẫu nhiên kiểu chuyển động lời',
    'JIZURA lyric-motion style randomized. Click again to reroll.':'Đã đổi kiểu chuyển động JIZURA. Bấm lần nữa để chọn kiểu khác nhé.',
    'The dotted area stays clear for a character.':'Vùng nét đứt được chừa trống cho nhân vật.', 'Enable to keep the dotted centre area clear.':'Bật để chừa trống vùng nét đứt ở giữa.',
    'Monet keeps its original lyric-rail and portrait composition; alternating placement is not applied.':'Monet giữ bố cục gốc với dải lời và khung chân dung, nên không đổi lời sang hai bên.',
    'Pendolo renders its clockwork layout as one scene, so Keep centre free is skipped.':'Pendolo dựng cả bố cục đồng hồ thành một cảnh, nên không áp dụng chừa trống giữa khung.',
    'Claddagh already arranges lyrics around an open centre; its circular layout is preserved.':'Claddagh vốn xếp lời quanh vùng trống ở giữa, nên giữ nguyên bố cục vòng tròn.',
    'This effect combines lyrics and motion in one full-frame scene, so Keep centre free is skipped to preserve the full-frame effect.':'Hiệu ứng này ghép lời và chuyển động thành một cảnh toàn khung, nên giữ bố cục gốc thay vì chừa trống giữa khung.',
    'Lyrics alternate around the open centre; the Folia background and full-frame effects stay in place.':'Lời luân phiên quanh vùng trống ở giữa. Nền và hiệu ứng toàn khung của Folia vẫn giữ nguyên.',
    'Wait for the lyric relay to connect.':'Chờ kết nối đồng bộ lời một chút nhé.', 'Popup blocked. Please allow popups.':'Trình duyệt đang chặn cửa sổ mới. Cho phép popup để mở lời nhé.', 'Green-screen window opened. It shares the OBS effect output.':'Đã mở cửa sổ lời. Cửa sổ dùng cùng hiệu ứng với đầu ra OBS.',
    'OBS relay connected':'Đã kết nối OBS', 'OBS relay active · another window controls lyrics':'OBS đã kết nối · cửa sổ khác đang điều khiển lời',
    'OBS relay unavailable on file:// · ':'Chưa kết nối OBS qua file:// · ', 'open server version':'mở bản chạy trên máy chủ', 'Lyric relay unavailable · check deployment':'Chưa đồng bộ được lời · kiểm tra máy chủ', 'OBS relay unavailable · start the server':'Chưa kết nối OBS · hãy khởi động máy chủ',
    'OBS URL copied.':'Đã sao chép link OBS.', 'Select and copy the OBS URL.':'Chọn và sao chép link OBS nhé.', 'Previous OBS link revoked. Update your OBS Browser Source with this new URL.':'Link OBS cũ đã bị vô hiệu hóa. Dán link mới này vào nguồn Browser của OBS nhé.',
    'No lyrics for this song yet.':'Bài này chưa có lời.', 'Find or import lyrics in the song editor.':'Tìm hoặc nhập lời trong mục Soạn bài hát nhé.',
    'Plain text: scrolling is approximate. Press T on each line to time it.':'Lời chưa có thời gian nên chỉ chạy ước tính. Bấm T ở từng câu để gắn thời gian.', 'Play a song with lyrics first.':'Phát một bài có lời trước nhé.', 'All lines already have times.':'Tất cả câu đã có mốc thời gian rồi.',
    'Drop an LRC file here, or paste lyrics. Romaji keeps the original timing.':'Thả file LRC hoặc dán lời vào đây. Romaji sẽ giữ nguyên thời gian của lời gốc.',
    'Romaji edited. Add/Save the song to keep your changes.':'Đã sửa Romaji. Bấm Thêm / Lưu để giữ thay đổi nhé.', 'Display mode applies when you Add/Save this song.':'Chế độ hiển thị sẽ áp dụng khi bạn Thêm / Lưu bài này.',
    'Paste or import Japanese lyrics first.':'Dán hoặc nhập lời tiếng Nhật trước nhé.', 'Lyrics exceed the 200,000-character limit.':'Lời vượt giới hạn 200.000 ký tự.', 'No Japanese characters found in these lyrics.':'Chưa thấy chữ tiếng Nhật trong lời này.',
    'Romaji conversion is already running.':'Romaji đang được tạo, chờ một chút nhé.', 'Loading the local Japanese dictionary…':'Đang tải từ điển tiếng Nhật…',
    'Conversion timed out. Check that the Japanese dictionary is deployed, then try again.':'Tạo Romaji mất quá lâu. Kiểm tra từ điển tiếng Nhật trên máy chủ rồi thử lại nhé.',
    'Could not load the Japanese converter. Restart the updated server and reload this page.':'Chưa tải được bộ chuyển tiếng Nhật. Khởi động lại máy chủ đã cập nhật rồi tải lại trang nhé.',
    'Romaji conversion failed: ':'Chưa tạo được Romaji: ', 'Romaji unavailable: ':'Romaji chưa dùng được: ',
    'Romaji ready. Check names/readings, then Add/Save. All original LRC tags are preserved.':'Romaji đã sẵn sàng. Kiểm tra tên riêng và cách đọc rồi Thêm / Lưu nhé. Mọi thẻ LRC gốc được giữ nguyên.',
    'Create valid Romaji before downloading.':'Tạo bản Romaji hợp lệ rồi tải xuống nhé.',
    'Romaji LRC downloaded with the original timecodes. Add/Save to keep it in the setlist too.':'Đã tải LRC Romaji với thời gian gốc. Bấm Thêm / Lưu để giữ trong danh sách bài nữa nhé.',
    'Find the matching LRC on Lyricsify, then import its download or paste the copied lyrics.':'Tìm đúng bản LRC trên Lyricsify, rồi nhập file tải về hoặc dán lời đã sao chép.',
    'Choose a .lrc file.':'Chọn file .lrc nhé.', 'LRC file is too large (maximum 500 KB).':'File LRC quá lớn (tối đa 500 KB).', 'Invalid or oversized text. Check the file encoding.':'Nội dung không hợp lệ hoặc quá dài. Kiểm tra mã hóa của file nhé.',
    'Import failed: ':'Chưa nhập được file: ', 'Import one LRC file at a time.':'Nhập từng file LRC một nhé.',
    'Saved Romaji loaded. You can edit its text; keep the LRC tags unchanged.':'Đã mở Romaji đã lưu. Bạn có thể sửa chữ, nhớ giữ nguyên các thẻ LRC nhé.',
    'Saved Romaji no longer matches this LRC. Create Romaji again.':'Romaji đã lưu không còn khớp với lời gốc. Tạo lại Romaji nhé.',
    'Create Romaji again after changing the original lyrics.':'Sau khi sửa lời gốc, hãy tạo lại Romaji nhé.', 'Keep the same number of lines as the original LRC.':'Giữ số dòng giống LRC gốc nhé.',
    'Could not open browser session.':'Chưa mở được phiên sử dụng. Thử tải lại trang nhé.',
    'Could not open your browser session.':'Chưa mở được phiên sử dụng. Thử tải lại trang nhé.',
    'Could not open a room.':'Chưa tạo được phòng hát. Thử tải lại trang nhé.',
    'Could not replace the OBS link.':'Chưa đổi được link OBS. Thử lại nhé.',
    'Edit lyric layout':'Chỉnh bố cục lời', 'Main workspace':'Không gian làm việc', 'Playlist and lyrics overlays':'Overlay playlist và lời hát',
    'Previous OBS links revoked. Update both lyrics and playlist Browser Sources with their new URLs.':'Đã thu hồi các link OBS cũ. Cập nhật link mới cho cả nguồn lời và playlist trong OBS nhé.',
    'Help':'Hướng dẫn', 'Open the guided tour':'Mở hướng dẫn từng bước', 'Interface language':'Ngôn ngữ giao diện'
  };
  let language = /^vi\b/i.test(navigator.language || '') ? 'vi' : 'en';
  try { const saved=localStorage.getItem('manokaraLanguage'); if(['vi','en'].includes(saved))language=saved; } catch (_) {}
  const records=[],pageTitle=document.title;
  // Only called for strings supplied by the app, never for song titles or lyric text.
  function text(source) {
    source=String(source ?? ''); if(language==='en')return source;
    if(Object.hasOwn(vi,source))return vi[source];
    const normalized=source.trim().replace(/\s+/g,' ');
    if(Object.hasOwn(vi,normalized))return source.replace(source.trim(),vi[normalized]);
    let match=source.match(/^Creating Romaji… (\d+)%$/);
    if(match)return `Đang tạo Romaji… ${match[1]}%`;
    match=source.match(/^Imported (.+) \(([^)]+)\)\. Original timestamps and offset tags are retained\.$/);
    if(match)return `Đã nhập ${match[1]} (${match[2]}). Giữ nguyên thời gian và thẻ độ lệch gốc.`;
    match=source.match(/^Line (\d+): keep every timestamp and metadata tag unchanged\.$/);
    if(match)return `Dòng ${match[1]}: giữ nguyên mọi mốc thời gian và thẻ thông tin nhé.`;
    match=source.match(/^Line (\d+): keep blank lyric gaps unchanged\.$/);
    if(match)return `Dòng ${match[1]}: giữ nguyên khoảng trống giữa các câu nhé.`;
    match=source.match(/^Timed line (\d+)\.$/);
    if(match)return `Đã gắn thời gian cho câu ${match[1]}.`;
    const checkSuffix=' Open it on YouTube to check.';
    if(source.endsWith(checkSuffix))return text(source.slice(0,-checkSuffix.length))+vi[checkSuffix];
    match=source.match(/^YouTube error ([^:]+): (.+)$/);
    if(match)return `Lỗi YouTube ${match[1]}: ${text(match[2])}`;
    for(const prefix of ['Romaji conversion failed: ','Romaji unavailable: ','Import failed: ']) {
      if(source.startsWith(prefix))return vi[prefix]+text(source.slice(prefix.length));
    }
    return source;
  }
  const attributes=['title','aria-label','placeholder','label'];
  function collect(root, target) {
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
    let node=root;
    do {
      if(node.nodeType===1) {
        if(node.matches('script,style,svg,[data-no-i18n]')||node.closest('script,style,svg,[data-no-i18n]'))continue;
        for(const attr of attributes)if(node.hasAttribute(attr)) {
          const source=node.getAttribute(attr);if(Object.hasOwn(vi,source))target.push({node,attr,source});
        }
      } else if(node.nodeType===3 && !node.parentElement?.closest('script,style,svg,[data-no-i18n]')) {
        const source=node.nodeValue, key=source.trim().replace(/\s+/g,' ');
        if(Object.hasOwn(vi,key))target.push({node,source});
      }
    } while((node=walker.nextNode()));
  }
  function apply(records, connected=false) {
    for(const {node,attr,source} of records) {
      if(connected&&!node.isConnected)continue;
      if(attr)node.setAttribute(attr,text(source));else node.nodeValue=text(source);
    }
  }
  // Localize trusted, static UI markup before inserting it. Do not pass rendered song data.
  function html(source) {
    if(language==='en')return source;
    const template=document.createElement('template');template.innerHTML=source;
    const entries=[];collect(template.content,entries);apply(entries);return template.innerHTML;
  }
  // The controller also assembles HTML from static fragments. Translate only those literals.
  function markup(source) {
    if(language==='en')return source;
    return source.replace(/\b(title|aria-label)="([^"]*)"/g,(_,attr,value)=>`${attr}="${text(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;')}"`)
      .replace(/(^|>)([^<>]*)(?=<|$)/g,(_,before,value)=>before+text(value));
  }
  function refresh() {
    document.documentElement.lang=language;
    document.title=text(pageTitle);
    apply(records,true);
    const select=document.querySelector('#language');if(select)select.value=language;
  }
  function init() {
    // Dynamic text is refreshed by its owning module; retaining old text nodes would overwrite state.
    const dynamic='#relayStatus,#playbackState,#now,#time,#msg,#offv,#centerHint,#audioStatus,#lyricsStatus,#pitchStatus,[data-pitch-value],#ftitle,#songTabLabel,#add,#pause,#stage,#pan,#lres,#list,#lrandom';
    document.querySelectorAll(dynamic).forEach(node=>node.setAttribute('data-no-i18n',''));
    collect(document.body,records);
    document.querySelectorAll(dynamic).forEach(node=>node.removeAttribute('data-no-i18n'));
    refresh();
    document.querySelector('#language')?.addEventListener('change',event=>setLanguage(event.target.value));
  }
  function setLanguage(value) {
    if(!['vi','en'].includes(value)||value===language)return;
    language=value;try{localStorage.setItem('manokaraLanguage',value)}catch(_){}
    refresh();window.dispatchEvent(new CustomEvent('manokara:languagechange'));
  }
  window.ManokaraI18n={text,html,markup,init,setLanguage,get language(){return language;}};
})();
