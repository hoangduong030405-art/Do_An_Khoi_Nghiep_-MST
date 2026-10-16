const http = require('http');
const path = require('path');
const fs = require('fs');

function request(options, data = null, isBinary = false) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      if (isBinary) {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks) });
        });
      } else {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(body) });
          } catch {
            resolve({ status: res.statusCode, headers: res.headers, body });
          }
        });
      }
    });
    req.on('error', reject);
    if (data) {
      if (Buffer.isBuffer(data)) {
        req.write(data);
      } else {
        req.write(typeof data === 'string' ? data : JSON.stringify(data));
      }
    }
    req.end();
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`\n❌ KIỂM TRA THẤT BẠI: ${message}`);
    process.exit(1);
  }
}

async function run() {
  console.log('===============================================================');
  console.log('       HUEGO COMPREHENSIVE LIVE VERIFICATION SUITE');
  console.log('===============================================================\n');

  const ts = Date.now();
  const userAEmail = `demo.usera.${ts}@huego.vn`;
  const userBEmail = `demo.userb.${ts}@huego.vn`;

  // 1. REGISTER & LOGIN
  console.log('--- BƯỚC 1: ĐĂNG KÝ VÀ ĐĂNG NHẬP (USER A & USER B) ---');
  const regARes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/auth/register', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: userAEmail, password: 'Password123!', fullName: 'Du Khách A' });
  assert(regARes.status === 201, `Đăng ký User A thất bại (Status ${regARes.status})`);
  const tokenA = regARes.body?.accessToken;
  const userAId = regARes.body?.user?.id;
  assert(Boolean(tokenA && userAId), 'Thiếu token hoặc userId User A');
  console.log(`[PASS] Đăng ký User A thành công: ID = ${userAId}`);

  const regBRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/auth/register', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: userBEmail, password: 'Password123!', fullName: 'Du Khách B' });
  assert(regBRes.status === 201, `Đăng ký User B thất bại (Status ${regBRes.status})`);
  const tokenB = regBRes.body?.accessToken;
  const userBId = regBRes.body?.user?.id;
  assert(Boolean(tokenB && userBId), 'Thiếu token hoặc userId User B');
  console.log(`[PASS] Đăng ký User B thành công: ID = ${userBId}`);

  // 2. DANH SÁCH ĐỊA DANH QUANH TỌA ĐỘ ĐẠI NỘI
  console.log('\n--- BƯỚC 2: TRUY VẤN ĐỊA DANH QUANH TỌA ĐỘ ĐẠI NỘI (/geofencing/nearby) ---');
  const nearbyRes = await request({
    hostname: 'localhost', port: 3000,
    path: '/api/v1/geofencing/nearby?lat=16.4697&lng=107.5779&radius=150',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenA}` }
  });
  assert(nearbyRes.status === 200, `Truy vấn nearby thất bại (Status ${nearbyRes.status})`);
  const nearbyPlaces = Array.isArray(nearbyRes.body) ? nearbyRes.body : nearbyRes.body?.places || [];
  assert(nearbyPlaces.length >= 2, 'Cần tìm thấy ít nhất 2 địa danh quanh Đại Nội');
  console.log(`[PASS] Tìm thấy ${nearbyPlaces.length} địa danh trong bán kính:`);
  nearbyPlaces.forEach(p => {
    console.log(`   - [${p.name}] khoảng cách: ${p.distanceMeters.toFixed(1)}m, bán kính: ${p.geofenceRadiusMeters}m`);
  });

  // 3. MỞ KHÓA ĐẠI NỘI BẰNG PLACEID CỤ THỂ
  console.log('\n--- BƯỚC 3: MỞ KHÓA ĐẠI NỘI BẰNG PLACEID CỤ THỂ ---');
  const daiNoi = nearbyPlaces.find(p => p.slug === 'dai-noi-hue' || p.name.includes('Đại Nội'));
  assert(Boolean(daiNoi), 'Không tìm thấy Đại Nội trong danh sách');

  const unlockDaiNoiRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/geofencing/unlock', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, {
    latitude: 16.4697, longitude: 107.5779,
    placeId: daiNoi.id,
    accuracy: 10
  });
  assert(unlockDaiNoiRes.status === 201 && unlockDaiNoiRes.body?.unlocked === true, 'Mở khóa Đại Nội thất bại');
  assert(unlockDaiNoiRes.body?.placeId === daiNoi.id, 'PlaceId mở khóa không khớp');
  console.log(`[PASS] Mở khóa Đại Nội thành công: +${unlockDaiNoiRes.body?.rewardPoints} GP, Tổng điểm: ${unlockDaiNoiRes.body?.totalGreenPoints}`);

  // 4. MỞ KHÓA TIẾP ĐIỆN THÁI HÒA CÙNG KHU VỰC CHỒNG LẤN
  console.log('\n--- BƯỚC 4: MỞ KHÓA ĐIỆN THÁI HÒA TẠI CÙNG VÙNG CHỒNG LẤN ---');
  const thaiHoa = nearbyPlaces.find(p => p.slug === 'dien-thai-hoa' || p.name.includes('Thái Hòa'));
  assert(Boolean(thaiHoa), 'Không tìm thấy Điện Thái Hòa trong danh sách');

  const unlockThaiHoaRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/geofencing/unlock', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, {
    latitude: 16.4697, longitude: 107.5779,
    placeId: thaiHoa.id,
    accuracy: 10
  });
  assert(unlockThaiHoaRes.status === 201 && unlockThaiHoaRes.body?.unlocked === true, 'Mở khóa Điện Thái Hòa thất bại');
  console.log(`[PASS] Mở khóa Điện Thái Hòa thành công: +${unlockThaiHoaRes.body?.rewardPoints} GP, Tổng điểm: ${unlockThaiHoaRes.body?.totalGreenPoints}`);

  // 5. MỞ KHÓA LẠI ĐẠI NỘI (PHẢI BỊ TỪ CHỐI)
  console.log('\n--- BƯỚC 5: MỞ KHÓA TRÙNG LẶP (PHẢI BỊ TỪ CHỐI) ---');
  const repeatUnlockRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/geofencing/unlock', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, {
    latitude: 16.4697, longitude: 107.5779,
    placeId: daiNoi.id,
    accuracy: 10
  });
  assert(repeatUnlockRes.status === 201 && repeatUnlockRes.body?.unlocked === false, 'Mở khóa trùng phải bị từ chối');
  assert(repeatUnlockRes.body?.message?.includes('trước đó rồi'), 'Sai thông báo mở khóa trùng');
  console.log(`[PASS] Mở khóa trùng bị từ chối chính xác: "${repeatUnlockRes.body?.message}"`);

  // 6. MỞ KHÓA TỌA ĐỘ Ở XA
  console.log('\n--- BƯỚC 6: MỞ KHÓA TỌA ĐỘ Ở XA (HÀ NỘI) ---');
  const farUnlockRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/geofencing/unlock', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, {
    latitude: 21.0285, longitude: 105.8542,
    accuracy: 10
  });
  assert(farUnlockRes.status === 201 && farUnlockRes.body?.unlocked === false, 'Tọa độ xa phải bị từ chối');
  console.log(`[PASS] Mở khóa tọa độ xa bị từ chối: "${farUnlockRes.body?.message}"`);

  // 7. QR CODE SAI
  console.log('\n--- BƯỚC 7: MỞ KHÓA BẰNG MÃ QR SAI / ĐOÁN TRƯỚC ---');
  const badQrRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/geofencing/unlock', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, { qrToken: 'HUEGO-QR-CHUA-THIEN-MU-2026' });
  assert(badQrRes.status === 201 && badQrRes.body?.unlocked === false, 'QR sai phải bị từ chối');
  console.log(`[PASS] QR sai bị từ chối: "${badQrRes.body?.message}"`);

  // 8. QR CODE THẬT TỪ ADMIN
  console.log('\n--- BƯỚC 8: MỞ KHÓA BẰNG MÃ QR THẬT (LẤY TỪ ADMIN SECURE ENDPOINT) ---');
  const adminLoginRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/auth/login', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'tourist.demo@huego.vn', password: 'Huego@2026' });
  assert(adminLoginRes.status === 200 && adminLoginRes.body?.user?.role === 'ADMIN', 'Đăng nhập admin thất bại');
  const adminToken = adminLoginRes.body?.accessToken;

  const adminTokensRes = await request({
    hostname: 'localhost', port: 3000, path: '/admin/places/qr-tokens', method: 'GET',
    headers: { 'Authorization': `Bearer ${adminToken}` }
  });
  assert(adminTokensRes.status === 200 && Array.isArray(adminTokensRes.body), 'Không thể lấy danh sách QR token từ admin');
  const thienMuPlace = adminTokensRes.body.find(p => p.slug === 'chua-thien-mu' || p.name?.includes('Thiên Mụ'));
  assert(Boolean(thienMuPlace && thienMuPlace.qrToken), 'Không tìm thấy QR token của Chùa Thiên Mụ');
  assert(thienMuPlace.qrToken.length >= 32, 'QR Token phải có độ dài an toàn >= 32 ký tự hex');

  const qrGoodRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/geofencing/unlock', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, { qrToken: thienMuPlace.qrToken });
  assert(qrGoodRes.status === 201 && qrGoodRes.body?.unlocked === true, 'Mở khóa QR hợp lệ thất bại');
  console.log(`[PASS] QR hợp lệ Chùa Thiên Mụ thành công: +${qrGoodRes.body?.rewardPoints} GP, Tổng điểm: ${qrGoodRes.body?.totalGreenPoints}`);

  // 9. VƯỢT TRẦN ĐIỂM NGÀY (500 GP)
  console.log('\n--- BƯỚC 9: KIỂM SOÁT GIAN LẬN: TRẦN ĐIỂM NGÀY 500 GP ---');
  const { Client } = require('pg');
  const pgClient = new Client({ connectionString: 'postgres://postgres:huego_secure_password_2026@localhost:5432/huego_db' });
  await pgClient.connect();
  
  // Find a valid place to associate mock points with
  const freePlaceRes = await pgClient.query(`SELECT id FROM places WHERE id != $1 AND id != $2 AND id != $3 LIMIT 1`, [daiNoi.id, thaiHoa.id, thienMuPlace.id]);
  const freePlaceId = freePlaceRes.rows[0].id;

  await pgClient.query(`
    INSERT INTO user_unlocks ("id", "userId", "placeId", "pointsAwarded", "distanceMeters", "unlockedAt")
    VALUES (uuid_generate_v4(), $1, $2, 400, 10, NOW());
  `, [userAId, freePlaceId]);

  const ngoMonRes = await pgClient.query(`SELECT id, latitude, longitude FROM places WHERE slug = 'cong-ngo-mon' OR id = 'heritage-ngo-mon' LIMIT 1;`);
  const ngoMon = ngoMonRes.rows[0];
  await pgClient.end();

  const unlockCapRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/geofencing/unlock', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, { latitude: ngoMon.latitude, longitude: ngoMon.longitude, placeId: ngoMon.id, accuracy: 10 });
  
  assert(unlockCapRes.status === 201 && unlockCapRes.body?.unlocked === false, 'Vượt trần điểm phải trả về unlocked: false');
  assert(unlockCapRes.body?.message?.includes('vượt giới hạn'), `Thiếu thông báo vượt giới hạn trần điểm ngày (Nhận được: ${unlockCapRes.body?.message})`);
  console.log(`[PASS] Vượt trần điểm ngày bị chặn chính xác: "${unlockCapRes.body?.message}"`);

  // 10. LỘ TRÌNH LƯU VÀO DB VÀ CÁCH LY CHỦ SỞ HỮU
  console.log('\n--- BƯỚC 10: QUẢN LÝ LỘ TRÌNH VÀO DB & BẢO VỆ CHỦ SỞ HỮU ---');
  const createItinRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/itinerary', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, {
    title: 'Lộ Trình Cố Đô Của User A',
    date: '2026-10-16',
    placeIds: ['8f8b0596-f5ee-449e-8c31-9cb6be62b662', 'tu-duc-tomb-01', 'minh-mang-tomb-02']
  });
  assert(createItinRes.status === 201 && createItinRes.body?.id, 'Tạo lộ trình thất bại');
  const itinId = createItinRes.body?.id;
  console.log(`[PASS] User A tạo lộ trình thành công trong PostgreSQL: ID = ${itinId}`);

  // User B đọc lộ trình của User A -> Phải bị 403 Forbidden
  const idorItinRes = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/itinerary/${itinId}`, method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenB}` }
  });
  assert(idorItinRes.status === 403, `User B phải bị 403 khi đọc lộ trình User A (Nhận được ${idorItinRes.status})`);
  console.log(`[PASS] Bảo vệ quyền sở hữu lộ trình: User B nhận HTTP 403 Forbidden`);

  // 11. ĐÓNG GÓP CỘNG ĐỒNG VÀ ADMIN PHÊ DUYỆT CỘNG ĐIỂM
  console.log('\n--- BƯỚC 11: ĐÓNG GÓP CỘNG ĐỒNG VÀO DATABASE & ADMIN DUYỆT ---');
  const submitCrowdRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/crowdsource/submit', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, {
    userId: userAId,
    placeName: 'Quán Trà Thảo Mộc Cung Đình Mới Mở',
    address: '88 Kim Long, TP Huế',
    latitude: 16.4560,
    longitude: 107.5600,
    environmentType: 'INDOOR',
    categoryCode: 'CAFE',
    description: 'Trà sen hảo hạng bọc lá sen tự nhiên ven sông Bạch Yến.',
  });
  assert(submitCrowdRes.status === 201 && submitCrowdRes.body?.id, 'Gửi đóng góp thất bại');
  const submissionId = submitCrowdRes.body?.id;
  assert(submissionId.length === 36, `ID phải là UUID v4 hợp lệ: ${submissionId}`);
  console.log(`[PASS] Đóng góp được ghi vào DB với UUID thật: ${submissionId}`);

  // Admin duyệt đóng góp
  const approveRes = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/crowdsource/${submissionId}/approve`, method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` }
  }, { pointsAwarded: 15 });
  assert(approveRes.status === 201 || approveRes.status === 200, 'Admin duyệt thất bại');
  const appStatus = approveRes.body?.submission?.status || approveRes.body?.status;
  assert(appStatus === 'APPROVED', 'Trạng thái sau duyệt phải là APPROVED');
  console.log(`[PASS] Admin duyệt đóng góp thành công: Status = ${appStatus}`);

  // 12. UPLOAD ẢNH MINH CHỨNG
  console.log('\n--- BƯỚC 12: UPLOAD ẢNH ĐÓNG GÓP (MULTIPART/FORM-DATA, MAGIC BYTES) ---');
  const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
  // Real minimal valid 1x1 PNG bytes
  const realPngBuffer = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082', 'hex');
  const pre = Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="proof.png"\r\nContent-Type: image/png\r\n\r\n`);
  const post = Buffer.from(`\r\n--${boundary}--\r\n`);
  const multipartBody = Buffer.concat([pre, realPngBuffer, post]);

  const uploadRes = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/crowdsource/upload', method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': multipartBody.length,
      'Authorization': `Bearer ${tokenA}`
    }
  }, multipartBody, false);
  assert(uploadRes.status === 201 && uploadRes.body?.success === true, 'Upload ảnh thật thất bại');
  const uploadedFilename = uploadRes.body?.filename;
  console.log(`[PASS] Upload ảnh minh chứng thành công: File = ${uploadedFilename}, URL = ${uploadRes.body?.imageUrl}`);

  // 13. CẤP CHỨNG NHẬN ĐIỆN TỬ
  console.log('\n--- BƯỚC 13: CẤP CHỨNG NHẬN E-CERTIFICATE (>= 3 ĐỊA DANH VÀ >= 60 GP) ---');
  const certRes = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/gamification/certificate/${userAId}`, method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenA}` }
  });
  const certCode = certRes.body?.certCode || certRes.body?.certificateCode;
  assert(certRes.status === 201 && Boolean(certCode), `Cấp chứng nhận thất bại: ${JSON.stringify(certRes.body)}`);
  assert(certCode.startsWith('HUEGO-CERT-'), 'Mã chứng nhận phải bắt đầu bằng HUEGO-CERT-');
  console.log(`[PASS] Cấp Chứng nhận E-Certificate thành công: Mã = ${certCode}`);

  // 14. TẢI FILE PDF CHỨNG NHẬN
  console.log('\n--- BƯỚC 14: XUẤT VÀ TẢI FILE PDF CHỨNG NHẬN ---');
  const pdfRes = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/gamification/certificate/${certCode}/pdf`, method: 'GET'
  }, null, true);
  assert(pdfRes.status === 200, `Tải PDF thất bại (Status ${pdfRes.status})`);
  assert(pdfRes.headers['content-type'] === 'application/pdf', 'Header Content-Type phải là application/pdf');
  assert(pdfRes.body.slice(0, 4).toString() === '%PDF', 'Nội dung file phải có magic bytes %PDF');
  console.log(`[PASS] Tải file PDF thành công: Kích thước = ${pdfRes.body.length} bytes, Header = "${pdfRes.body.slice(0, 8).toString().trim()}"`);

  // 15. TRANG TRA CỨU VÀ XÁC THỰC CÔNG KHAI
  console.log('\n--- BƯỚC 15: TRANG TRA CỨU VÀ XÁC THỰC CÔNG KHAI (/verify/:code) ---');
  const verifyWebRes = await request({
    hostname: 'localhost', port: 3000, path: `/verify/${certCode}`, method: 'GET'
  });
  assert(verifyWebRes.status === 200, `Trang xác thực web trả về status ${verifyWebRes.status}`);
  assert(typeof verifyWebRes.body === 'string' && verifyWebRes.body.includes(certCode), 'Trang xác thực thiếu thông tin mã chứng nhận');
  console.log(`[PASS] Trang web xác thực công khai hiển thị đúng thông tin: HTTP 200 OK`);

  console.log('\n===============================================================');
  console.log('       TẤT CẢ 15 BƯỚC KIỂM THỬ ĐẦU-CUỐI ĐỀU THÀNH CÔNG!');
  console.log('===============================================================');
  process.exit(0);
}

run().catch((err) => {
  console.error('\n❌ LỖI TRONG QUÁ TRÌNH KIỂM TRA:', err);
  process.exit(1);
});
