# BÁO CÁO NGUỒN GỐC DỮ LIỆU & BẢN QUYỀN — DỰ ÁN HUEGO

Tài liệu này công bố minh bạch thực trạng nguồn gốc dữ liệu theo yêu cầu quản trị dữ liệu dự án HUEGO. Chỉ ghi nhận những thông tin đã được kiểm chứng thực tế trong repository.

---

## 1. KHO DỮ LIỆU 4.352 ĐỊA ĐIỂM & HÌNH ẢNH (`places_all.json`)

- **Số lượng**: 4.352 điểm toạ độ địa lý tại Thừa Thiên Huế.
- **Nguồn gốc dữ liệu**: Cào từ web (trích xuất tự động từ các nguồn dữ liệu web công khai).
- **Hình ảnh (`coverPhotoUrl`)**: Cào từ web, nguồn và giấy phép ảnh chưa xác minh.
- **Mục đích sử dụng**: Phục vụ duyệt bản đồ tĩnh (Leaflet MarkerCluster), tìm kiếm, phân loại và lọc trực quan trên Web Portal và ứng dụng di động. Không dùng cho hệ thống cộng điểm hay luật chơi cốt lõi.

---

## 2. BỘ SƯU TẬP HIỆN VẬT SỐ 3D (`.glb`) TRONG BẢO TÀNG SỐ (`museum.html`)

Dưới đây là danh sách toàn bộ 10 tệp tin mô hình 3D định dạng `.glb` lưu tại `web-hue4u/public/models/` và `backend/public/portal/models/`:

| Tên tệp tin `.glb` | Tiêu đề hiện vật | Tác giả / Người số hóa | Nguồn dữ liệu | Giấy phép |
| :--- | :--- | :--- | :--- | :--- |
| `bo-xam-huong.glb` | Bộ Xăm Hường | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |
| `buc-phu-dieu.glb` | Phù điêu thời Minh Mạng | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |
| `chau-canh-vang-la-ngoc.glb` | Cành vàng lá ngọc — chậu cây lựu | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |
| `hop-dung-sach.glb` | Hộp đựng sách sơn thếp | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |
| `kieu-vua.glb` | Kiệu Vua | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |
| `lu-huong.glb` | Lư hương | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |
| `ngai-hoang-de.glb` | Ngai của Hoàng đế | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |
| `qua-cau-cuu-long.glb` | Quả cầu Cửu Long | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |
| `thu-but-tu-huan-luc.glb` | Thủ bút Từ Huấn Lục | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |
| `to-su-ky-kieu.glb` | Tô sứ ký kiểu thời Minh Mạng | Không xác định | Trung tâm Bảo tồn Di tích Cố đô Huế (theo chú thích `museum_artifacts.json`) | Không xác định |

*Ghi chú*: Trong metadata nhị phân của các tệp tin `.glb` và trong repository không có tài liệu cấp phép bản quyền chính thức kèm theo. Vì vậy trạng thái giấy phép được ghi nhận chính xác là "Không xác định".

---

## 3. DANH SÁCH 46 ĐỊA DANH TRONG POSTGRESQL (`places`)

- **Nguồn gốc**: Dữ liệu 46 địa danh di tích, văn hóa và tiện ích Cố Đô Huế được chuẩn hóa thủ công, đã khử trùng lặp và lưu trữ trong `backend/data/clean_46_places.json`.
- **Mục đích**: Nguồn sự thật duy nhất (Single Source of Truth) phục vụ toàn bộ nghiệp vụ kiểm tra tọa độ GPS Geofencing, trần điểm ngày 500 GP, quét mã QR an toàn, cấp chứng nhận E-Certificate và lưu trữ lộ trình trên NestJS + PostgreSQL.

---

## 4. KHUYẾN NGHỊ VỀ MẶT PHÁP LÝ

- Do dữ liệu 4.352 điểm toạ độ và hình ảnh kèm theo được cào từ web mà nguồn và giấy phép ảnh chưa xác minh, việc sử dụng hiện tại chỉ phù hợp trong phạm vi nghiên cứu, trình diễn giải pháp công nghệ (demo đồ án khởi nghiệp).
- Khi đưa sản phẩm vào hoạt động thương mại hóa chính thức:
  1. Thay thế toàn bộ hình ảnh cào bằng ảnh chụp thực tế có hợp đồng ủy quyền tác quyền từ các nhiếp ảnh gia hoặc ảnh do cộng đồng tự nguyện chia sẻ qua cổng Crowdsourcing.
  2. Ký biên bản hợp tác chính thức với Trung tâm Bảo tồn Di tích Cố đô Huế hoặc các đơn vị số hóa di sản để có văn bản cấp phép sử dụng các mô hình 3D hiện vật.
