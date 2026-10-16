# NGUỒN GỐC DỮ LIỆU ĐỊA ĐIỂM & HÌNH ẢNH — DỰ ÁN HUEGO

Tài liệu này công bố minh bạch nguồn gốc dữ liệu theo yêu cầu quản trị dữ liệu dự án HUEGO (Đồ án khởi nghiệp - MST).

---

## 1. KHO DỮ LIỆU 4.352 ĐỊA ĐIỂM (`places_all.json`)

- **Tổng số lượng**: 4.352 điểm toạ độ địa lý phủ kín Thành phố Huế và các khu vực lân cận.
- **Nguồn gốc dữ liệu**:
  - Dữ liệu toạ độ (`lat`, `lng`), tên địa danh (`name_vi`, `name_en`), địa chỉ, xếp hạng (`googleRating`), số lượng đánh giá (`googleReviewCount`) được trích xuất (cào / crawled) từ dữ liệu công khai trên Google Places / OpenStreetMap tại khu vực Cố Đô Huế.
  - Phân loại ngành: Chia làm 7 phân hệ chính (`tour`, `fnb`, `cafe`, `stay`, `specialty`, `nature`, `service`) kết hợp với nhãn điểm tự động `confidence` và `demand_score`.
- **Mục đích sử dụng**: Phục vụ duyệt bản đồ tĩnh (Leaflet MarkerCluster), tìm kiếm, phân loại và lọc trực quan trên Web Portal và ứng dụng di động. Không dùng trực tiếp cho hệ thống tính điểm thưởng cốt lõi.

---

## 2. NGUỒN GỐC HÌNH ẢNH (`coverPhotoUrl`)

- **Nơi lưu trữ**:
  - 4.209 hình ảnh được lưu trữ trên Cloudflare R2 Object Storage tại tên miền:  
    `https://pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev/places/...`
  - Một số ảnh di tích mẫu sử dụng liên kết từ Wikimedia Commons và Unsplash.
- **Bản quyền & Tác quyền**:
  - Tác giả cụ thể của từng bức ảnh được cào: **Không xác định** (Unspecified public web assets).
  - Khuyến nghị thương mại: Khi dự án tiến vào giai đoạn thương mại hóa chính thức (Phase 2), toàn bộ ảnh đại diện của các đối tác và di tích trọng điểm sẽ được thay thế bằng hình ảnh chụp thực tế có ký hợp đồng ủy quyền tác quyền hoặc ảnh do người dùng đóng góp (Crowdsourced Creative Commons).

---

## 3. DANH SÁCH 53 ĐỊA DANH MỞ KHÓA TRONG POSTGRESQL (`places`)

- **Nguồn gốc**:
  - 23 địa danh cốt lõi từ bảng seed PostGIS ban đầu (`backend/database/seeds/01_init_postgis_and_seed.sql`).
  - 30 di tích di sản Huế UNESCO từ `web-hue4u/data/heritage_30_sites.json` được chuẩn hóa toạ độ, bán kính geofence (20m - 50m) và điểm thưởng Green Points (50 / 30 / 20 / 10).
- **Mục đích**: Đây là **nguồn sự thật duy nhất (Single Source of Truth)** cho toàn bộ quy trình mở khóa GPS Geofencing, cấp thẻ chứng nhận, quét mã QR và cộng điểm xanh Green Points trên server backend NestJS.

---

## 4. RỦI RO BẢN QUYỀN & KHUYẾN NGHỊ PHÁP LÝ

- **Thực trạng**: Toàn bộ tập dữ liệu 4.352 điểm toạ độ và hình ảnh kèm theo được thu thập (cào/scraped) từ các nguồn web công cộng (Google Places, mạng xã hội, các trang blog du lịch). Tác giả gốc và điều khoản giấy phép của phần lớn các bức ảnh này hiện **chưa xác định (Unspecified/Unknown License)**.
- **Rủi ro**: Việc lưu trữ và phục vụ công khai các hình ảnh này trên CDN/Cloudflare R2 có nguy cơ vi phạm quyền tác giả theo Luật Sở hữu trí tuệ nếu các chủ sở hữu khiếu nại (DMCA / Takedown Request).
- **Khuyến nghị & Lộ trình xử lý**:
  1. Trong giai đoạn thử nghiệm/nghiên cứu (Proof of Concept - Demo): Cho phép sử dụng nội bộ để kiểm thử giao diện và thuật toán định vị.
  2. **Trước khi thương mại hóa (Production Release)**:
     - Bắt buộc rà soát và thay thế toàn bộ ảnh chưa rõ nguồn gốc bằng ảnh có giấy phép Creative Commons (CC-BY, CC0) hoặc mua bản quyền từ các nhiếp ảnh gia địa phương Huế.
     - Phát động chương trình Crowdsourcing để cộng đồng du khách và người dân địa phương tự chụp và đăng tải ảnh gốc (kèm điều khoản chia sẻ bản quyền cho nền tảng HUEGO).
     - Bổ sung cơ chế báo cáo vi phạm bản quyền (Report Copyright) tại chân trang để xử lý kịp thời khi có yêu cầu từ chủ sở hữu.

