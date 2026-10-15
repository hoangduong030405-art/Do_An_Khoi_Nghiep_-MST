# Hướng dẫn Kiểm thử Định vị bằng Máy ảo Android

Để quay video demo hoặc kiểm thử các tính năng nhận diện vị trí (Geofencing) của HUEGO, bạn có thể mô phỏng một lộ trình GPS di chuyển thực tế bằng máy ảo Android.

## 1. Tạo máy ảo Android
1. Mở **Android Studio**.
2. Chọn **Device Manager** (Biểu tượng thiết bị ở thanh công cụ).
3. Nhấn **Create Device**.
4. Chọn một thiết bị (ví dụ: Pixel 6, Pixel 7) và nhấn **Next**.
5. Tải và chọn một System Image (nên chọn bản **API 33** hoặc **34** có chữ "Google Play") -> Nhấn **Next**.
6. Đặt tên máy ảo và nhấn **Finish**.
7. Khởi động máy ảo bằng nút ▶️ (Play).

## 2. Mô phỏng Vị trí và Tuyến đường
1. Khi máy ảo đã chạy, hãy chú ý thanh công cụ nổi bên cạnh cửa sổ giả lập.
2. Nhấn vào nút **... (Extended controls)** ở dưới cùng của thanh công cụ.
3. Trong cửa sổ mới hiện ra, chọn mục **Location** ở menu bên trái.

### Cách 1: Đặt tọa độ tức thời (Single Point)
- Ở tab **Single points**, bạn có thể tìm kiếm tên địa điểm hoặc nhập tọa độ (Latitude / Longitude).
- Nhấn **Set Location** để máy ảo lập tức chuyển đến vị trí đó. 
- *Mẹo: Dùng tính năng này để dịch chuyển tức thời đến cửa Đại Nội (Lat: 16.4697, Lng: 107.5779) rồi mở khóa điểm!*

### Cách 2: Phát một tuyến đường (Routes)
1. Ở cửa sổ Location, chuyển sang tab **Routes**.
2. Tại đây, bạn có thể tải lên một file GPX (ví dụ file `trang_tien_to_dai_noi.gpx` đính kèm).
3. Nhấn nút **Load GPX/KML** ở góc dưới cùng bên phải.
4. Chọn file `trang_tien_to_dai_noi.gpx`.
5. Thiết lập tốc độ di chuyển (Playback speed).
6. Nhấn nút ▶️ **Play route** ở góc dưới. Máy ảo sẽ bắt đầu di chuyển dọc theo cầu Tràng Tiền qua đường Lê Duẩn đến cửa Đại Nội.

## 3. Chạy HUEGO
1. Mở HUEGO trên máy ảo bằng lệnh: `flutter run`
2. Đăng nhập và mở màn hình Bản Đồ.
3. Phát tuyến đường GPS như hướng dẫn ở bước 2.
4. Chờ xem ứng dụng tự động hiển thị thông báo "Mở khóa thành công" khi bạn đi vào bán kính của Đại Nội!
