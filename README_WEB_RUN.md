# Hướng dẫn chạy Flutter Web qua Cloudflare Tunnel cho iPhone

Để thử nghiệm phiên bản Web của HUEGO trên trình duyệt Safari của iPhone (nhằm lấy tọa độ GPS thực tế), hãy làm theo các bước sau bằng PowerShell trên Windows.

## Bước 1: Build ứng dụng Flutter Web
Mở PowerShell, di chuyển vào thư mục `mobile` và chạy lệnh build:
```powershell
cd C:\Lap_Trinh_Ung_dung\mobile
flutter build web --release --dart-define=API_BASE_URL=/api/v1
```
Lệnh này sẽ tạo ra bản build tĩnh tại thư mục `mobile/build/web`. (Thực ra do đã thiết lập trong `app_config.dart` nên tự động lấy `/api/v1` làm mặc định cho Web, nhưng ta có thể truyền tường minh để chắc chắn).

## Bước 2: Khởi động Backend NestJS
Backend NestJS đã được cấu hình để phục vụ ứng dụng web tĩnh tại đường dẫn `/flutter`.
Mở một cửa sổ PowerShell mới, vào thư mục `backend` và chạy:
```powershell
cd C:\Lap_Trinh_Ung_dung\backend
npm run start
```
(Server sẽ chạy ở `http://localhost:3000`)

## Bước 3: Mở Cloudflare Tunnel
Để iPhone có thể truy cập được ứng dụng web trên máy chủ cục bộ thông qua HTTPS (bắt buộc HTTPS để xin quyền Vị trí của trình duyệt), hãy dùng Cloudflared.
Mở một cửa sổ PowerShell mới và chạy lệnh:
```powershell
cloudflared tunnel --url http://localhost:3000
```
Bạn sẽ nhận được một đường link ngẫu nhiên có đuôi `trycloudflare.com` trong log, ví dụ: `https://abcd-1234.trycloudflare.com`

## Bước 4: Truy cập trên iPhone
1. Mở Safari trên iPhone.
2. Truy cập vào đường link `https://abcd-1234.trycloudflare.com/flutter` (nhớ thêm `/flutter` ở cuối).
3. Cho phép quyền truy cập Vị trí khi trình duyệt yêu cầu.
4. Trải nghiệm mở khóa địa điểm dựa trên tọa độ GPS thực tế.

## Lưu ý đối với máy ảo Android Emulator
Nếu bạn đang chạy ứng dụng Flutter trực tiếp trên máy ảo Android (không qua Web), thì không cần Cloudflare. Ứng dụng sẽ tự động kết nối API qua địa chỉ `http://10.0.2.2:3000/api/v1`.

## Lưu ý về Cấu hình Native
Chạy nền CHƯA được kiểm thử trên thiết bị thật.
