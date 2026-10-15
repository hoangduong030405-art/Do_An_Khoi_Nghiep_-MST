# HUEGO – ỨNG DỤNG KHÁM PHÁ HUẾ THÔNG MINH
> **Nền tảng Du lịch Tương tác Cố Đô: Định vị GPS Geofencing, Trợ lý AI Mệ Huế, Lịch trình theo Thời tiết & Du lịch Xanh (Green Points).**

---

## 🏛️ 1. TỔNG QUAN DỰ ÁN
**HUEGO** là giải pháp công nghệ du lịch thông minh toàn diện dành cho Thành phố Huế, hướng tới đối tượng du khách tự túc (18–35 tuổi), khách quốc tế và người dân bản địa. 

Ứng dụng kết hợp giữa di sản văn hóa nghìn năm với các công nghệ mũi nhọn:
- **Bản đồ số & Geofencing (PostGIS)**: Tự động phát hiện và mở khóa cột mốc di tích khi du khách đến gần trong bán kính 35 mét.
- **Trợ lý AI "Mệ Huế" (Gemini API & RAG)**: Trò chuyện song ngữ Việt - Anh, am hiểu sâu sắc lịch sử 13 đời vua triều Nguyễn và phong vị ẩm thực cố đô.
- **Hệ thống thích ứng thời tiết thông minh (OpenWeatherMap)**: Tự động chuyển đổi các điểm ngoài trời (*Outdoor*) sang các không gian trong nhà (*Indoor*) như bảo tàng, nhà vườn, trà thất khi trời đổ mưa ngâu Huế hoặc nắng gắt (>37°C).
- **Gamification & Green Tourism**: Tích lũy Green Points khi đi bộ, đạp xe xanh quanh sông Hương và cấp **Chứng nhận điện tử (E-Certificate)** khi hoàn thành hành trình.
- **Đóng góp cộng đồng (Crowdsourcing)**: Thu thập các điểm ăn uống, góc văn hóa bí mật từ người dân địa phương qua hàng đợi kiểm duyệt Admin.
- **Mô-đun Doanh thu (Affiliate)**: Tiếp thị liên kết với các chuỗi xe đạp công cộng, khách sạn di sản, nhà hàng đặc sản.

---

## 🏗️ 2. CẤU TRÚC DỰ ÁN TRÊN VISUAL STUDIO CODE

```text
C:\Lap_Trinh_Ung_dung\
├── .vscode/                     # Cấu hình Visual Studio Code tối ưu
│   ├── settings.json            # Format on save, font, PostGIS SQL connection
│   ├── launch.json              # Phím tắt F5 Debug Backend (NestJS) và Mobile (Flutter)
│   └── extensions.json          # Gợi ý Extension khuyên dùng (Dart, ESLint, SQLTools, Docker)
│
├── backend/                     # BACKEND & WEB PORTAL (NestJS + TypeScript)
│   ├── src/
│   │   ├── main.ts              # Entry point, Swagger docs setup
│   │   ├── modules/
│   │   │   ├── mobile-preview/  # Web Simulator chạy trực tiếp ứng dụng (/app)
│   │   │   ├── admin/           # Web Quản trị di tích & QR Check-in (/admin)
│   │   │   ├── portal/          # Web Portal dữ liệu di sản Cố Đô
│   │   │   ├── geofencing/      # Core API: ST_DWithin GPS check, Unlocking (+GP)
│   │   │   ├── places/          # Tọa độ di sản, bán kính radar, lọc theo không gian
│   │   │   ├── ai-assistant/    # Trợ lý Mệ Huế (Gemini Flash & Heuristic engine)
│   │   │   ├── weather/         # OpenWeatherMap sync & cảnh báo thời tiết
│   │   │   ├── gamification/    # Green Points, Badges, E-Certificate
│   │   │   ├── crowdsource/     # Đóng góp địa điểm từ cộng đồng & hàng đợi duyệt
│   │   │   └── affiliate/       # Theo dõi hoa hồng đối tác xe đạp/khách sạn
│   ├── package.json
│   └── tsconfig.json
│
├── mobile/                      # FRONTEND MOBILE (Flutter Cross-Platform)
│   ├── lib/
│   │   ├── main.dart            # Điều hướng màn hình chính
│   │   ├── features/
│   │   │   ├── map/             # Bản đồ số tương tác, radar geofence, banner thời tiết
│   │   │   ├── ai_guide/        # Giao diện chat trực tiếp với Mệ Huế AI
│   │   │   ├── gamification/    # Hồ sơ Điểm Xanh, huy hiệu cố đô & xuất E-Cert
│   │   │   └── itinerary/       # Lập lịch trình & Vòng quay may mắn di sản
│   └── pubspec.yaml
│
├── web-hue4u/                   # NỀN TẢNG WEB BẢN ĐỒ DI SẢN CỐ ĐÔ (Node.js/Express)
│   ├── public/                  # Giao diện bản đồ, Audio thuyết minh & Di tích 3D
│   ├── data/                    # Cơ sở dữ liệu di sản, bảo vật, bộ sưu tập
│   ├── server.js                # Web server Node.js
│   └── package.json
│
├── docker-compose.yml           # Khởi chạy PostGIS 16, MongoDB 7.0, Redis 7.2
└── README.md
```

---

## 🚀 3. HƯỚNG DẪN KHỞI CHẠY TRÊN VISUAL STUDIO CODE

### Bước 1: Khởi động Cơ sở Dữ liệu PostGIS & NoSQL
Mở Terminal trong VS Code tại thư mục `C:\Lap_Trinh_Ung_dung` và chạy:
```bash
docker-compose up -d
```
> Lệnh trên sẽ tự động dựng container PostgreSQL tích hợp PostGIS 3.4 và nạp sẵn toàn bộ tọa độ các di tích tiêu biểu: Đại Nội, Chùa Thiên Mụ, Lăng Khải Định, Cầu Tràng Tiền, Bảo tàng Cổ vật Cung đình...

### Bước 2: Khởi chạy Backend NestJS
```bash
cd backend
npm install
npm run start:dev
```
- Server hoạt động tại: `http://localhost:3000`
- Giao diện trải nghiệm Swagger API đầy đủ: `http://localhost:3000/api/docs`

### Bước 3: Khởi chạy Frontend Mobile (Flutter)
```bash
cd mobile
flutter pub get
flutter run
```

---

## 🎯 4. CÁC API TRỌNG TÂM ĐÃ KIỂM NGHIỆM

1. **POST** `/api/v1/geofencing/unlock`
   - Nhận tọa độ GPS (`latitude`, `longitude`, `userId`).
   - Sử dụng hàm không gian `ST_DWithin` của PostGIS để đo khoảng cách thực tế trên mặt cầu WGS84.
   - Khi `distance <= 35m`, tự động mở khóa và tích điểm **Green Points**.

2. **POST** `/api/v1/ai-guide/chat`
   - Trò chuyện với **Mệ Huế** về điển tích lịch sử triều Nguyễn, thơ ca, các món ăn đặc sắc xứ Huế.

3. **POST** `/api/v1/ai-guide/adapt-itinerary`


https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/
   - Phân tích thời tiết thực tế từ trạm khí tượng Huế. Nếu trời mưa ngâu hoặc nắng gắt (>37°C), tự động thay thế các địa điểm `OUTDOOR` thành `INDOOR` (nhà rường thưởng trà, bảo tàng cổ vật cung đình).

4. **GET** `/api/v1/weather/hue-current`
   - Trả về nhiệt độ, độ ẩm và khuyến nghị hành vi du lịch thời gian thực.
