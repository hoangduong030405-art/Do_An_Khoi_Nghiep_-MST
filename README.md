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

### Bước 2: Cấu hình biến môi trường và Khởi chạy Backend NestJS
Tạo file `backend/.env` từ `backend/.env.example`. Các biến môi trường quan trọng:
- `PUBLIC_BASE_URL`: Địa chỉ gốc của hệ thống dùng để tạo link xác thực trong mã QR của chứng nhận E-Certificate (mặc định: `http://localhost:3000`).
- `TRUST_PROXY`: Đặt `true` khi backend chạy sau reverse proxy (Nginx, Traefik, Tunnel) để lấy IP thật từ `X-Forwarded-For`.
- `BEHIND_CLOUDFLARE`: Đặt `true` khi chạy sau Cloudflare Tunnel để lấy IP từ header `CF-Connecting-IP`.
- `MAX_DAILY_GREEN_POINTS`: Trần điểm xanh tối đa được nhận trong một ngày theo giờ Việt Nam (mặc định: `500`).

```bash
cd backend
npm install
npm run migration:run
npm run seed
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


   - Phân tích thời tiết thực tế từ trạm khí tượng Huế. Nếu trời mưa ngâu hoặc nắng gắt (>37°C), tự động thay thế các địa điểm `OUTDOOR` thành `INDOOR` (nhà rường thưởng trà, bảo tàng cổ vật cung đình).

4. **GET** `/api/v1/weather/hue-current`
   - Trả về nhiệt độ, độ ẩm và khuyến nghị hành vi du lịch thời gian thực.

---

## 🔒 5. CHÍNH SÁCH ĐỊNH VỊ & BẢO VỆ QUYỀN RIÊNG TƯ (LOCATION PRIVACY)

- **Xử lý trên thiết bị (On-Device Processing):** Tọa độ GPS của người dùng hoàn toàn được tính toán và hiển thị trực tiếp trên trình duyệt máy khách (Leaflet map, tính khoảng cách Haversine). Không có bất kỳ luồng định vị ngầm nào tự động gửi tọa độ liên tục lên máy chủ.
- **Minh bạch khi xin quyền:** Không tự động hỏi quyền định vị khi tải trang. Quyền vị trí chỉ được kích hoạt khi người dùng chủ động bấm nút "Vị trí của tôi" (User Gesture, tương thích chặt chẽ với iOS Safari & Android Chrome).
- **Chỉ gửi khi tương tác có chủ đích:** Tọa độ GPS chỉ được gửi về máy chủ khi người dùng chủ động bấm **"Check-in Mở Khóa GPS"** để đối chiếu với vòng địa giới Geofencing 35m của di sản nhằm chống gian lận và cấp điểm Green Points (GP).
- **Vị trí giả lập (Demo Mode):** Chỉ hỗ trợ cho mục đích kiểm thử giao diện trên máy tính bàn. Vị trí giả lập không được cấp quyền mở khóa nhận điểm di sản thật.

---

## 🛡️ 6. QUYỀN RIÊNG TƯ CỦA CHIA SẺ LỘ TRÌNH (ITINERARY SHARING PRIVACY)

- **Không lưu Token thô:** Khóa token chia sẻ (24 bytes base64url) được băm một chiều bằng chuẩn mật mã **SHA-256** trước khi lưu vào bảng `itinerary_shares`. Máy chủ không lưu trữ token thô; token chỉ được hiển thị một lần duy nhất cho chủ sở hữu khi vừa sinh liên kết.
- **Ngăn chặn rò rỉ qua Referer & Search Engines:** Trang công khai `/s/:token` được bảo vệ bằng các tiêu đề an toàn nghiêm ngặt: `Referrer-Policy: no-referrer` (ngăn token bị gửi sang các liên kết ngoài như Google Maps, Apple Maps), `X-Robots-Tag: noindex, nofollow`, `<meta name="robots" content="noindex, nofollow">` (chặn công cụ tìm kiếm thu thập chỉ mục), và `Cache-Control: no-store`.
- **Dữ liệu tối thiểu & Ẩn danh danh tính:** API công khai (`/api/v1/shared/:token`) tuyệt đối **không trả về** email, userId, ID nội bộ cơ sở dữ liệu, điểm thưởng Green Points, vị trí GPS thời gian thực, hay lịch sử check-in của chủ sở hữu. Người chia sẻ chỉ hiển thị tên hiển thị công khai hoặc nhãn ẩn danh "Một du khách HUEGO".
- **Bảo vệ ghi chú cá nhân:** Ghi chú tại từng điểm dừng (`note`) mặc định **bị ẩn hoàn toàn**. Ghi chú chỉ được gửi ra ngoài khi chủ sở hữu chủ động bật tùy chọn "Kèm ghi chú của tôi" (`includeNotes = true`).
- **Phản hồi 404 thống nhất & Chống tấn công Timing:** Tất cả các trường hợp liên kết không tồn tại, token sai, liên kết đã bị thu hồi (`revokedAt`), hoặc quá hạn sử dụng (`expiresAt`) đều trả về cùng một phản hồi mã `404 Not Found` với thông điệp đồng nhất "Liên kết không tồn tại hoặc đã hết hạn". Việc so sánh băm token được thực hiện bằng hàm so sánh thời gian cố định `crypto.timingSafeEqual`.
- **Chính sách vòng đời & Xóa liên kết theo tầng (Cascade):** Mỗi lộ trình chỉ có tối đa 1 liên kết hoạt động tại một thời điểm; khi tạo link mới, link cũ sẽ bị vô hiệu hóa tức thì. Khi người dùng xóa lộ trình hoặc xóa tài khoản, toàn bộ các bản ghi liên kết chia sẻ liên quan tự động bị xóa triệt để nhờ ràng buộc khóa ngoại `ON DELETE CASCADE`.

WEB
https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/
APP
https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/app/
