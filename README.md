# Manokara

🎤 **Hát karaoke, lên setlist và làm lyric motion ngay trên web.**

Tìm nhạc, chuẩn bị lời và đưa overlay lên OBS cho buổi hát hoặc livestream của bạn.

## Manokara có gì?

- **Tìm nhạc YouTube** ngay trên web hoặc dán link để thêm bài.
- **Setlist và kho bài hát riêng**, lưu lời đã căn, tự chuyển bài kèm countdown.
- **Tìm lời từ LRCLIB, NetEase, Zing MP3, QQ Music, AMLL TTML**, hỗ trợ timecode từng dòng/từng từ, nhập LRC/TTML và chỉnh khớp lời.
- **Chuyển lời tiếng Nhật sang romaji**, giữ nguyên timecode và cho phép sửa cách đọc.
- **Lyric motion từ JIZURA, Folia và karaoke cổ điển**, tùy chỉnh hiển thị và lưu animation riêng cho từng bài.
- **Overlay Studio cho lyric và playlist**, chỉnh bố cục trên web, nền trong suốt và chừa vùng giữa cho camera/model.
- **Đưa overlay vào OBS** bằng Browser Source; **đổi tông** qua Tab Audio và giữ player YouTube.
- **Tiếng Việt / English** cùng hướng dẫn từng bước ngay trong app.

## Chạy local

[Cài đặt lần đầu trên Windows](TECHNICAL.md#local-setup-windows). Sau khi cài xong, chạy trong thư mục project:

```powershell
npm run start
```

Mở **[localhost:8000/manokara.html](http://localhost:8000/manokara.html)**. Giữ terminal mở và dùng cùng địa chỉ/profile trình duyệt để truy cập dữ liệu đã lưu.

## Tài liệu

- [Cài đặt, phát triển và hướng dẫn chi tiết](TECHNICAL.md)
- [Triển khai lên server và cấu hình provider](DEPLOY.md)

Mọi người dùng thử rồi góp ý cho tớ nhé 🌵
