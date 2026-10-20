const fs = require('fs');
let txt = fs.readFileSync('README.md', 'utf8');

const addition = `
---

## 🔒 5. CHÍNH SÁCH ĐỊNH VỊ & BẢO VỆ QUYỀN RIÊNG TƯ (LOCATION PRIVACY)

- **Xử lý trên thiết bị (On-Device Processing):** Tọa độ GPS của người dùng hoàn toàn được tính toán và hiển thị trực tiếp trên trình duyệt máy khách (Leaflet map, tính khoảng cách Haversine). Không có bất kỳ luồng định vị ngầm nào tự động gửi tọa độ liên tục lên máy chủ.
- **Minh bạch khi xin quyền:** Không tự động hỏi quyền định vị khi tải trang. Quyền vị trí chỉ được kích hoạt khi người dùng chủ động bấm nút "Vị trí của tôi" (User Gesture, tương thích chặt chẽ với iOS Safari & Android Chrome).
- **Chỉ gửi khi tương tác có chủ đích:** Tọa độ GPS chỉ được gửi về máy chủ khi người dùng chủ động bấm **"Check-in Mở Khóa GPS"** để đối chiếu với vòng địa giới Geofencing 35m của di sản nhằm chống gian lận và cấp điểm Green Points (GP).
- **Vị trí giả lập (Demo Mode):** Chỉ hỗ trợ cho mục đích kiểm thử giao diện trên máy tính bàn. Vị trí giả lập không được cấp quyền mở khóa nhận điểm di sản thật.
`;

txt = txt.replace(/(\r?\n)\s*WEB\s*(\r?\n)/, '\n' + addition + '\nWEB\n');
fs.writeFileSync('README.md', txt, 'utf8');
console.log('SUCCESS: README.md updated');
