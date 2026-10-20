const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const http = require('http');
const { Client } = require('pg');

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
  console.log('       HUEGO FULL AUDIT & END-TO-END VERIFICATION SUITE');
  console.log('===============================================================\n');

  const dbName = process.env.DATABASE_NAME || 'huego_db';
  const pgClient = new Client({
    connectionString: `postgres://postgres:huego_secure_password_2026@localhost:5432/${dbName}`,
  });
  await pgClient.connect();

  const ts = Date.now();
  const userAEmail = `full.usera.${ts}@huego.vn`;
  const userBEmail = `full.userb.${ts}@huego.vn`;

  // 1. ĐĂNG KÝ USER A VÀ USER B
  console.log('--- [1/7] ĐĂNG KÝ VÀ PHÂN QUYỀN USER A VÀ USER B ---');
  const regA = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/auth/register', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: userAEmail, password: 'Password123!', fullName: 'Du Khách Toàn Diện A' });
  assert(regA.status === 201, `Đăng ký User A thất bại (Status ${regA.status})`);
  const tokenA = regA.body?.accessToken;
  const userAId = regA.body?.user?.id;

  const regB = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/auth/register', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: userBEmail, password: 'Password123!', fullName: 'Du Khách Toàn Diện B' });
  assert(regB.status === 201, `Đăng ký User B thất bại (Status ${regB.status})`);
  const tokenB = regB.body?.accessToken;
  const userBId = regB.body?.user?.id;
  console.log(`[PASS] Đã tạo User A (${userAId}) và User B (${userBId})`);

  // 2. LỘ TRÌNH LƯU DB VÀ KIỂM TRA PERSISTENCE
  console.log('\n--- [2/7] TẠO LỘ TRÌNH LƯU POSTGRESQL & KIỂM TRA TỒN TẠI BỀN VỮNG ---');
  const placesRes = await pgClient.query(`SELECT id FROM places LIMIT 3;`);
  assert(placesRes.rows.length >= 3, 'Cần ít nhất 3 địa danh trong DB');
  const placeIds = placesRes.rows.map(r => r.id);

  const createItin = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/itinerary', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, {
    title: 'Hành Trình Di Sản Bền Vững Huế',
    date: '2026-10-16',
    placeIds: placeIds,
  });
  assert(createItin.status === 201 && createItin.body?.id, 'Tạo lộ trình thất bại');
  const itinId = createItin.body?.id;
  console.log(`[PASS] Lộ trình đã tạo thành công trong DB với ID: ${itinId}`);

  // Kiểm tra trực tiếp bảng itineraries và itinerary_stops trong PostgreSQL
  const dbItin = await pgClient.query(`SELECT * FROM itineraries WHERE id = $1`, [itinId]);
  assert(dbItin.rows.length === 1, 'Không tìm thấy lộ trình trong bảng itineraries');
  const dbStops = await pgClient.query(`SELECT * FROM itinerary_stops WHERE "itineraryId" = $1 ORDER BY "orderIndex" ASC`, [itinId]);
  assert(dbStops.rows.length === placeIds.length, `Số điểm dừng không khớp: ${dbStops.rows.length} vs ${placeIds.length}`);
  console.log(`[PASS] PostgreSQL lưu trữ bền vững: 1 bản ghi itineraries và ${dbStops.rows.length} bản ghi itinerary_stops`);

  // Đọc lại qua API bằng User A -> Phải 200 OK
  const readItinA = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/itinerary/${itinId}`, method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenA}` }
  });
  assert(readItinA.status === 200 && readItinA.body?.title === 'Hành Trình Di Sản Bền Vững Huế', 'User A đọc lộ trình thất bại');
  console.log(`[PASS] User A đọc lại lộ trình hợp lệ: "${readItinA.body.title}" (${readItinA.body.stops.length} điểm dừng)`);

  // 3. USER B BỊ 403 KHI ĐỌC LỘ TRÌNH VÀ HỒ SƠ CỦA USER A
  console.log('\n--- [3/7] KIỂM TRA PHÂN QUYỀN SỞ HỮU (USER B BỊ 403) ---');
  const readItinB = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/itinerary/${itinId}`, method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenB}` }
  });
  assert(readItinB.status === 403, `User B phải nhận 403 khi đọc lộ trình của User A (Nhận được: ${readItinB.status})`);
  console.log(`[PASS] User B bị 403 Forbidden khi truy cập lộ trình của User A`);

  const readProfileB = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/gamification/profile/${userAId}`, method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenB}` }
  });
  assert(readProfileB.status === 403, `User B phải nhận 403 khi đọc hồ sơ của User A (Nhận được: ${readProfileB.status})`);
  console.log(`[PASS] User B bị 403 Forbidden khi truy cập hồ sơ Green Points của User A`);

  // 4. ĐÓNG GÓP CỘNG ĐỒNG, ADMIN DUYỆT VÀ CHỐNG CỘNG ĐIỂM 2 LẦN
  console.log('\n--- [4/7] CROWDSOURCING & DUYỆT ĐÓNG GÓP CỘNG ĐIỂM ĐÚNG 1 LẦN ---');
  const adminLogin = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/auth/login', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'tourist.demo@huego.vn', password: 'Huego@2026' });
  assert(adminLogin.status === 200, 'Đăng nhập admin thất bại');
  const adminToken = adminLogin.body?.accessToken;

  const crowdSub = await request({
    hostname: 'localhost', port: 3000, path: '/api/v1/crowdsource/submit', method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenA}` }
  }, {
    userId: userAId,
    placeName: 'Quán Bún Bò Huế Mụ Rơi Hẻm Cũ',
    address: '42 Nguyễn Huệ, TP Huế',
    latitude: 16.4601,
    longitude: 107.5902,
    environmentType: 'INDOOR',
    categoryCode: 'CUISINE',
    description: 'Bún bò nước dùng hầm xương tủy thơm mùi sả ruốc truyền thống.',
  });
  assert(crowdSub.status === 201 && crowdSub.body?.id, 'Gửi đóng góp thất bại');
  const crowdId = crowdSub.body?.id;

  // Admin duyệt lần 1 (+25 GP)
  const app1 = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/crowdsource/${crowdId}/approve`, method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` }
  }, { pointsAwarded: 25 });
  assert(app1.status === 201 || app1.status === 200, 'Admin duyệt lần 1 thất bại');
  assert(app1.body?.submission?.status === 'APPROVED' || app1.body?.status === 'APPROVED', 'Trạng thái phải là APPROVED');
  console.log(`[PASS] Admin duyệt lần 1 thành công (+25 GP)`);

  // Kiểm tra điểm User A trong bảng user_points
  const ptsAfter1 = await pgClient.query(`SELECT points FROM user_points WHERE "userId" = $1`, [userAId]);
  assert(ptsAfter1.rows[0]?.points === 25, `Điểm sau duyệt lần 1 phải là 25 (Thực tế: ${ptsAfter1.rows[0]?.points})`);

  // Admin duyệt lần 2 -> Phải từ chối, điểm không được cộng thêm
  const app2 = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/crowdsource/${crowdId}/approve`, method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminToken}` }
  }, { pointsAwarded: 25 });
  assert(app2.body?.success === false, 'Duyệt lần 2 phải trả về success: false');
  console.log(`[PASS] Chống duyệt lần 2: Đã từ chối ("${app2.body?.message}")`);

  const ptsAfter2 = await pgClient.query(`SELECT points FROM user_points WHERE "userId" = $1`, [userAId]);
  assert(ptsAfter2.rows[0]?.points === 25, 'Điểm người dùng không được tăng thêm ở lần duyệt thứ 2');
  console.log(`[PASS] Bảo vệ toàn vẹn điểm thưởng: Điểm của User A vẫn là 25 GP`);

  // 5. CẤP CHỨNG NHẬN VÀ TẢI PDF
  console.log('\n--- [5/7] CẤP CHỨNG NHẬN E-CERTIFICATE & TẢI FILE PDF ---');
  // Thêm 3 unlock để User A đủ điều kiện cấp chứng nhận (>= 3 địa danh và >= 60 GP)
  await pgClient.query(`
    INSERT INTO user_unlocks ("id", "userId", "placeId", "pointsAwarded", "distanceMeters", "unlockedAt")
    VALUES 
      (uuid_generate_v4(), $1, $2, 50, 10, NOW()),
      (uuid_generate_v4(), $1, $3, 30, 15, NOW()),
      (uuid_generate_v4(), $1, $4, 25, 20, NOW())
    ON CONFLICT DO NOTHING;
  `, [userAId, placeIds[0], placeIds[1], placeIds[2]]);
  await pgClient.query(`UPDATE user_points SET points = 105 WHERE "userId" = $1`, [userAId]);

  const certRes = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/gamification/certificate/${userAId}`, method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenA}` }
  });
  const certCode = certRes.body?.certCode || certRes.body?.certificateCode;
  assert(certRes.status === 201 && Boolean(certCode), 'Cấp chứng nhận thất bại');
  console.log(`[PASS] Cấp chứng nhận thành công: Mã = ${certCode}`);

  const pdfRes = await request({
    hostname: 'localhost', port: 3000, path: `/api/v1/gamification/certificate/${certCode}/pdf`, method: 'GET'
  }, null, true);
  assert(pdfRes.status === 200, `Tải PDF thất bại (Status ${pdfRes.status})`);
  assert(pdfRes.headers['content-type'] === 'application/pdf', 'Header Content-Type phải là application/pdf');
  assert(pdfRes.body.slice(0, 4).toString() === '%PDF', 'File PDF phải chứa magic bytes %PDF');
  console.log(`[PASS] Tải file PDF thành công: Kích thước ${pdfRes.body.length} bytes`);

  // 6. XÁC THỰC CÔNG KHAI /verify/:code
  console.log('\n--- [6/7] TRA CỨU VÀ XÁC THỰC TRỰC TUYẾN (/verify/:code) ---');
  const verifyRes = await request({
    hostname: 'localhost', port: 3000, path: `/verify/${certCode}`, method: 'GET'
  });
  assert(verifyRes.status === 200, `Trang /verify/:code trả về status ${verifyRes.status}`);
  assert(typeof verifyRes.body === 'string' && verifyRes.body.includes(certCode), 'Trang xác thực thiếu thông tin mã chứng nhận');
  console.log(`[PASS] Trang web xác thực công khai hiển thị đầy đủ thông tin: HTTP 200 OK`);

  // 7. KIỂM TRA BẢO MẬT KHÓA NGOẠI TRONG CƠ SỞ DỮ LIỆU
  console.log('\n--- [7/7] KIỂM TRA RÀNG BUỘC TOÀN VẸN KHÓA NGOẠI CSDL ---');
  let fkError = null;
  try {
    await pgClient.query(`
      INSERT INTO user_unlocks ("id", "userId", "placeId", "pointsAwarded", "distanceMeters", "unlockedAt")
      VALUES (uuid_generate_v4(), $1, 'dia-danh-khong-ton-tai-999', 50, 10, NOW());
    `, [userAId]);
  } catch (err) {
    fkError = err;
  }
  assert(fkError !== null && fkError.code === '23503', 'Database phải từ chối khi chèn placeId không tồn tại');
  console.log(`[PASS] PostgreSQL từ chối chèn placeId giả mạo với lỗi 23503 foreign_key_violation`);

  await pgClient.end();

  console.log('\n===============================================================');
  console.log('       TẤT CẢ CÁC BƯỚC KIỂM TRA FULL AUDIT ĐỀU THÀNH CÔNG!');
  console.log('===============================================================');
  process.exit(0);
}

run().catch((err) => {
  console.error('\n❌ LỖI TRONG QUÁ TRÌNH KIỂM TRA FULL:', err);
  process.exit(1);
});
