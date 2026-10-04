# Rà soát Manokara — 04/10/2026

Nền để sửa: `f108f13ea610ff953659c2879bc91cd88aa92e89` (Added Linux deployment).
Đã đối chiếu trực tiếp: HEAD local và `main` trên GitHub cùng commit này.
Các thay đổi dưới đây được ghi nhận trong commit chứa báo cáo này. Deploy VPS thực hiện theo `DEPLOY.md`; push lên GitHub không tự xác nhận bản mới đã được deploy.

## Các sửa đổi

- Dùng chung bộ đọc LRC và clock cho controller, OBS, Folia và JIZURA. Hỗ trợ offset, timestamp lặp và dòng trống; giảm nhảy lùi do các mẫu thời gian đến lệch nhau.
- Server báo tuổi của snapshot bằng clock monotonic. OBS không còn tính thời gian từ đồng hồ của máy điều khiển; ngừng ngoại suy sau 15 giây mất kết nối.
- Folia dùng dữ liệu/clock của trang OBS chứa nó, loại bỏ vòng polling thứ hai và giữ document ổn định trong lúc hát. Chỉ tạo document mới khi chủ động đổi mode để cô lập context Pixi.
- Sửa countdown bị che bởi Folia, cảnh Folia mở mới khi đang pause, và dòng CJK dài bị ép chiều rộng về 0 trong vùng Keep centre free.
- Nền Folia dùng alpha trong suốt, bỏ blend nền xanh. Font được tải cho cả document chứa OBS và iframe Folia.
- Theme màu JIZURA không còn sửa trực tiếp palette gốc; chuyển lại Effect palette lấy được màu ban đầu.
- Sửa chỉnh bài đang phát, giữ đúng bài đang sửa khi đổi thứ tự, kiểm tra Start/End và thời lượng MC; phục hồi an toàn khi local storage không chứa dữ liệu đúng dạng.
- Sửa nút light/dark, lưu lựa chọn theme, giảm cập nhật panel lyric khi chưa đổi dòng, bỏ tràn ngang trên màn hình nhỏ.
- Cửa sổ controller không có quyền điều khiển ngừng publish; mở thêm controller không tự ghi đè bài đang phát. Có thể chuyển quyền bằng click/typing như trước.
- Giữ cơ chế đăng nhập, room riêng và viewer token chỉ đọc có thể thu hồi của commit mới. Các bundle Folia có tên theo hash được cache; HTML và dữ liệu riêng vẫn `no-store`.

Keep centre free áp dụng cho các lớp lyric riêng của Folia Classic, Cadenza, Partita, Tilt và Cappella. Các cảnh kết hợp chữ với canvas/3D hoặc có bố cục riêng giữ bố cục gốc; UI giải thích giới hạn khi chọn chúng.

## Kiểm tra

- Python: 27 test passed, 1 test symlink skipped do quyền Windows; có cảnh báo deprecation của Starlette TestClient với dependency HTTPX đang được commit.
- Node: 7 test passed — parsing, thời gian, jitter, seek, pause/countdown, mất kết nối và palette JIZURA.
- Browser: Edge/Chromium headless, server và database kiểm thử riêng. Toàn bộ 22 mode; login/logout, token rotation, OBS không cần cookie, CSP, popup, nhiều controller, countdown/buffering/seek, pause/reload, MC/Stop, sửa/reorder, dữ liệu lưu bị lỗi.
- Layout: 1920×1080, 1440×900, 1024×768 và 390×844. Không tràn ngang; desktop không cuộn toàn trang.
- Lyric dài: khung 1280×720 và 720×1280, có kiểm tra opacity khi mở mới ở trạng thái pause và chiều rộng/chiều cao của dòng CJK.
- Kiểm tra cú pháp các script/entry và `git diff --check`.

Chạy lại trong môi trường đã cài dependency:

```powershell
.venv/Scripts/python.exe -m pytest tests/test_security.py -q
node --test tests/test_core.cjs
$env:MANOKARA_TEST_BROWSER='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
.venv/Scripts/python.exe tests/browser_smoke.py --all-effects
```

Các ca playback dùng YouTube API giả lập để kiểm tra app một cách lặp lại được. Chưa xác nhận video YouTube cụ thể, OBS native khi minimize, hay dịch vụ systemd/Cloudflare Tunnel trên VPS thật. Bộ sửa không thay đổi quyền cho phép nhúng video của YouTube.

Sau cập nhật: restart server để nạp manifest/CSP mới, rồi reload controller và Refresh các Browser Source OBS. Hướng dẫn deploy và rebuild source Folia nằm trong `DEPLOY.md`.
