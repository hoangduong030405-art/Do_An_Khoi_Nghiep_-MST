# HUE4U — NỀN TẢNG DU LỊCH THÔNG MINH CỐ ĐÔ HUẾ
> Toàn bộ dữ liệu, mô hình giao diện, bản đồ số và bảo tàng 3D từ Hue4U (https://hue4u.com/explore) được tái hiện trọn vẹn tại thư mục **C:\dự án mật**.

---

## 🌟 TỔNG QUAN HỆ THỐNG ĐÃ CÀO & DỰNG LẠI

### 1. Dữ liệu Đã Cào Toàn Diện (`data/`)
- **4.352 địa điểm du lịch & dịch vụ tại Huế** (`places_all.json` ~ 3.4 MB)
  - 🏛️ **Di tích & Tour**: 513 điểm (Đại Nội Huế, Lăng Khải Định, Lăng Tự Đức, Minh Mạng, Chùa Thiên Mụ, Cung An Định...)
  - 🍜 **Ẩm thực & Quán ngon**: 1.000 điểm (Bún bò Huế, cơm hến, bánh bèo nậm lọc, nem lụi, chè cung đình...)
  - ☕ **Cà phê & Chill**: 714 quán (Cà phê muối xứ Huế, quán ven sông Hương, view hoàng thành...)
  - 🏨 **Lưu trú & Nghỉ dưỡng**: 897 khách sạn, resort, homestay, villa Huế
  - 🎁 **Đặc sản làm quà**: 228 cơ sở (Mè xửng, nón bài thơ, trà cung đình, tôm chua...)
  - 🚗 **Dịch vụ du lịch**: 1.000 dịch vụ (Thuê xe, thuyền rồng sông Hương, hướng dẫn viên...)
- **10 Bảo vật Hoàng gia Triều Nguyễn 3D** (`museum_artifacts.json` & các file mô hình `.glb` trong `public/models/`)
  - Ngai của Hoàng đế
  - Kiệu vua
  - Quả cầu Cửu Long
  - Bộ xăm hường
  - Chậu cành vàng lá ngọc
  - Bức phù điêu
  - Thư bút Tự Huấn Lục
  - Tô sứ ký kiểu
  - Lư hương
  - Hộp đựng sách
- **Hành trình gợi ý & Bộ sưu tập** (`collections.json`)
- **Cẩm nang du lịch & Lịch trình 1-2-3 ngày** (`travel_guides.json`)
- **Đường dây nóng y tế & Hỗ trợ du khách** (`essentials.json`)
- **5.075 URL sitemap chuẩn SEO** (`sitemap_urls.json`)

---

## 🚀 CÁCH KHỞI CHẠY WEB APP

Hệ thống được thiết kế **Zero-dependency** (chạy trực tiếp bằng Node.js có sẵn không cần tải thêm thư viện phức tạp).

### Cách 1: Chạy trực tiếp bằng Node.js
```bash
cd "C:\dự án mật"
node server.js
```

Sau đó mở trình duyệt truy cập:
👉 **http://localhost:3000**

---

## 🏛️ CẤU TRÚC CÁC TRANG & TÍNH NĂNG TRÊN WEB

| Trang | Đường dẫn | Chức năng chính |
|---|---|---|
| **Khám phá Huế (Explore)** | `http://localhost:3000/` | Tìm kiếm trực tiếp, lọc 6 danh mục, thẻ địa điểm kèm ảnh bìa, đánh giá sao, phân trang, popup xem chi tiết |
| **Bản đồ số Du lịch** | `http://localhost:3000/map.html` | Bản đồ OpenStreetMap tương tác, hiển thị toạ độ GPS thực của các di tích & quán ăn Huế |
| **Bảo tàng số 3D** | `http://localhost:3000/museum.html` | Xoay 360°, phóng to thu nhỏ 10 bảo vật triều Nguyễn bằng Google Model Viewer WebGL |
| **Cẩm nang Huế** | `http://localhost:3000/hue.html` | Lộ trình mẫu 1 ngày, 2 ngày, 3 ngày theo khung giờ, kinh nghiệm & bí kíp du lịch |
| **Mô phỏng 1 ngày** | `http://localhost:3000/simulator.html` | Trải nghiệm 'Sống thử 1 ngày ở Huế' với 4 chặng lựa chọn tạo lịch trình cá nhân |
| **Khẩn cấp & Hỗ trợ** | `http://localhost:3000/essentials.html` | Danh bạ cứu hộ 113, 114, 115, bệnh viện lớn và hotline Sở Du lịch Huế |

---

## 📡 TÀI LIỆU REST API NỘI BỘ

Server cung cấp sẵn bộ API phục vụ cho cả web và ứng dụng di động:
- `GET /api/stats` - Thống kê tổng quan dữ liệu
- `GET /api/places?vertical=tour&page=1&limit=24&q=dai-noi` - Tìm kiếm và phân trang
- `GET /api/places/:id` - Chi tiết 1 địa điểm cụ thể
- `GET /api/collections` - Danh sách bộ sưu tập
- `GET /api/museum` - Danh sách bảo vật 3D
- `GET /api/guides` - Cẩm nang & lịch trình
- `GET /api/essentials` - Danh bạ cứu hộ & y tế
- `GET /api/nearby?lat=16.4637&lng=107.5908&radius=5` - Tìm địa điểm gần toạ độ GPS
