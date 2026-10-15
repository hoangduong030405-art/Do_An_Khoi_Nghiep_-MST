# Hướng Dẫn Chạy Demo HUEGO Trên iPhone (1-Click)

**1. Cách chạy:** Bấm đúp vào file `start-demo.bat`. Máy sẽ tự bật Database, Backend, Build Flutter và lấy link Cloudflare.
**2. Cách mở trên iPhone:** Khi chạy xong, link (có /flutter/) sẽ tự động copy vào Clipboard và mã QR được lưu ở `link-qr.png`. Bạn có thể gửi link qua Zalo/Apple Notes hoặc mở camera iPhone quét mã QR để trải nghiệm trên Safari.
**3. Cách tắt:** Cửa sổ CMD sẽ hiện dòng chữ đỏ "Giữ máy tính mở...". Chỉ cần nhấn phím bất kỳ tại cửa sổ đó, toàn bộ tiến trình sẽ tự động tắt dọn dẹp.

**⚠️ 5 Lỗi thường gặp và cách xử lý:**
1. *Không mở được Docker:* Hãy mở ứng dụng Docker Desktop trên máy tính trước khi bấm chạy `start-demo.bat`.
2. *Lỗi chưa cài cloudflared:* Mở PowerShell quyền Admin và chạy `winget install --id Cloudflare.cloudflared`.
3. *Trắng trang (CanvasKit):* Đảm bảo đường truyền internet trên iPhone mạnh để tải bộ máy render.
4. *Báo cổng 3000 bị chiếm:* Chạy file `stop-demo.bat` để ép dọn dẹp các tiến trình bị kẹt từ lần chạy trước.
5. *Link Cloudflare không phản hồi:* Hãy tắt đi bằng `stop-demo.bat` và chạy lại, đôi khi đường hầm Cloudflare cấp phát chậm.
