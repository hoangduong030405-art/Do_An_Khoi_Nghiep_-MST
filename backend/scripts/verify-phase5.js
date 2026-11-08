const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const http = require('http');
const fs = require('fs');
const { execSync } = require('child_process');
const { Client } = require('pg');
const { chromium } = require('playwright');

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

async function runPhase5Verification() {
  console.log('===============================================================');
  console.log('       HUEGO PHASE 5 COMPREHENSIVE VERIFICATION SUITE          ');
  console.log('===============================================================\n');

  // TEST 1: KIỂM TRA FLUTTER WEB BUILD & ZERO 404 CONSOLE
  console.log('--- [1/5] KIỂM TRA FLUTTER WEB BUILD & TRUY CẬP /flutter/ ---');
  const webIndexPath = path.resolve(__dirname, '..', '..', 'mobile', 'build', 'web', 'index.html');
  assert(fs.existsSync(webIndexPath), `File mobile/build/web/index.html không tồn tại: ${webIndexPath}`);
  const webIndexContent = fs.readFileSync(webIndexPath, 'utf8');
  assert(webIndexContent.includes('<base href="/flutter/">'), 'mobile/build/web/index.html thiếu <base href="/flutter/">');
  console.log('[PASS] Đã xác thực thẻ <base href="/flutter/"> trong mobile/build/web/index.html');

  // Playwright truy cập /flutter/
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const flutterPage = await browser.newPage();
  const console404s = [];
  flutterPage.on('response', res => {
    if (res.status() === 404) {
      console404s.push(res.url());
    }
  });

  await flutterPage.goto('http://localhost:3000/flutter/', { waitUntil: 'networkidle', timeout: 35000 });
  assert(console404s.length === 0, `Phát hiện lỗi 404 khi tải Flutter Web: ${console404s.join(', ')}`);
  console.log(`[PASS] Playwright mở http://localhost:3000/flutter/ đạt 0 lỗi 404 console`);
  await flutterPage.close();

  // TEST 2: KIỂM TRA API TTS THUYẾT MINH
  console.log('\n--- [2/5] KIỂM TRA API TTS THUYẾT MINH ÂM THANH THẬT ---');
  const ttsText = encodeURIComponent('Chùa Thiên Mụ');
  const ttsRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: `/api/v1/ai-guide/tts?lang=vi&text=${ttsText}`,
    method: 'GET',
  }, null, true);

  assert(ttsRes.status === 200, `API TTS trả về status ${ttsRes.status} (kỳ vọng 200)`);
  assert(ttsRes.headers['content-type'] === 'audio/mpeg', `Content-Type kỳ vọng 'audio/mpeg', thực tế '${ttsRes.headers['content-type']}'`);
  assert(ttsRes.body.length > 1000, `Buffer âm thanh quá nhỏ: ${ttsRes.body.length} bytes (kỳ vọng > 1000 bytes)`);
  console.log(`[PASS] API TTS stream audio/mpeg thành công: ${ttsRes.body.length} bytes audio data`);

  // Kết nối DB để hỗ trợ Test 3 & 4
  const dbName = process.env.DATABASE_NAME || 'huego_db';
  const pgClient = new Client({
    connectionString: `postgres://postgres:huego_secure_password_2026@localhost:5432/${dbName}`,
  });
  await pgClient.connect();

  const ts = Date.now();
  const userAEmail = `phase5.user.${ts}@huego.vn`;

  // Đăng ký User A
  const regRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/auth/register',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  }, {
    email: userAEmail,
    password: 'Password123!',
    fullName: 'Du Khách Phase 5',
  });
  assert(regRes.status === 201, `Đăng ký User A thất bại: ${JSON.stringify(regRes.body)}`);
  const tokenA = regRes.body.accessToken;
  const userAId = regRes.body.user.id;
  console.log(`[INIT] User A tạo thành công: ID = ${userAId}`);

  // TEST 3: KIỂM TRA API CHIA SẺ LỘ TRÌNH & TRANG WEB CÔNG KHAI /s/:token
  console.log('\n--- [3/5] KIỂM TRA API CHIA SẺ LỘ TRÌNH & TRANG CÔNG KHAI /s/:token ---');
  const placesRes = await pgClient.query('SELECT id, name FROM places LIMIT 3');
  const placeIds = placesRes.rows.map(p => p.id);

  // Tạo lộ trình cho User A
  const itinRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/itinerary',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenA}`,
    },
  }, {
    title: 'Hành Trình Khám Phá Di Sản Cố Đô Phase 5',
    date: '2026-11-25',
    placeIds: placeIds,
  });
  assert(itinRes.status === 201, `Tạo lộ trình thất bại: ${JSON.stringify(itinRes.body)}`);
  const itineraryId = itinRes.body.id;

  // Gọi API Share
  const shareRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: `/api/v1/itinerary/${itineraryId}/share`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenA}`,
    },
  }, {
    expiresInDays: 7,
    includeNotes: true,
    allowCopy: true,
  });
  assert(shareRes.status === 201, `Chia sẻ lộ trình thất bại: ${JSON.stringify(shareRes.body)}`);
  assert(Boolean(shareRes.body.shareUrl), 'Phản hồi thiếu shareUrl');
  const shareUrl = shareRes.body.shareUrl;
  console.log(`[PASS] API Share tạo liên kết thành công: ${shareUrl}`);

  // Dùng Playwright mở trang chia sẻ công khai /s/:token
  const sharePage = await browser.newPage();
  const shareResp = await sharePage.goto(shareUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  assert(shareResp.status() === 200, `Trang chia sẻ trả về status ${shareResp.status()}`);
  const pageContent = await sharePage.content();
  assert(pageContent.includes(placesRes.rows[0].name), `Trang chia sẻ thiếu tên địa danh ${placesRes.rows[0].name}`);
  console.log(`[PASS] Playwright mở trang chia sẻ công khai HTTP 200 và hiển thị chuẩn các điểm dừng`);
  await sharePage.close();
  await browser.close();

  // TEST 4: KIỂM TRA E-CERTIFICATE PDF
  console.log('\n--- [4/5] KIỂM TRA E-CERTIFICATE PDF & MAGIC BYTES ---');
  // Thêm điều kiện đủ điểm để cấp chứng nhận cho User A
  await pgClient.query(`
    INSERT INTO user_unlocks ("id", "userId", "placeId", "pointsAwarded", "distanceMeters", "unlockedAt")
    VALUES 
      (uuid_generate_v4(), $1, $2, 50, 10, NOW()),
      (uuid_generate_v4(), $1, $3, 30, 15, NOW()),
      (uuid_generate_v4(), $1, $4, 25, 20, NOW())
    ON CONFLICT DO NOTHING;
  `, [userAId, placeIds[0], placeIds[1], placeIds[2]]);
  
  await pgClient.query(`
    INSERT INTO user_points ("userId", "points")
    VALUES ($1, 250)
    ON CONFLICT ("userId") DO UPDATE SET points = 250;
  `, [userAId]);

  const certRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: `/api/v1/gamification/certificate/${userAId}`,
    method: 'POST',
    headers: { 'Authorization': `Bearer ${tokenA}` },
  });
  assert(certRes.status === 201, `Cấp chứng nhận thất bại: ${JSON.stringify(certRes.body)}`);
  const certCode = certRes.body?.certCode || certRes.body?.certificateCode;
  assert(Boolean(certCode), 'Thiếu mã chứng nhận trong phản hồi');
  console.log(`[PASS] Cấp chứng nhận thành công: Mã = ${certCode}`);

  const pdfRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: `/api/v1/gamification/certificate/${certCode}/pdf`,
    method: 'GET',
  }, null, true);
  assert(pdfRes.status === 200, `Tải PDF thất bại: Status ${pdfRes.status}`);
  assert(pdfRes.headers['content-type'] === 'application/pdf', 'Content-Type phải là application/pdf');
  assert(pdfRes.body.slice(0, 4).toString() === '%PDF', 'File PDF phải bắt đầu bằng magic bytes %PDF');
  console.log(`[PASS] Tải file PDF thành công: Kích thước ${pdfRes.body.length} bytes, Magic bytes %PDF chuẩn`);

  await pgClient.end();

  // TEST 5: PHÂN TÍCH CÚ PHÁP FLUTTER (flutter analyze)
  console.log('\n--- [5/5] PHÂN TÍCH CÚ PHÁP FLUTTER (flutter analyze) ---');
  const flutterPath = 'C:\\Users\\PREDATOR\\flutter\\bin';
  const analyzeOutput = execSync(`flutter analyze`, {
    cwd: path.resolve(__dirname, '..', '..', 'mobile'),
    env: { ...process.env, Path: `${process.env.Path};${flutterPath}` },
    encoding: 'utf8',
  });
  console.log(analyzeOutput.trim());
  assert(analyzeOutput.includes('No issues found'), `flutter analyze phát hiện lỗi:\n${analyzeOutput}`);
  console.log('[PASS] Flutter analyze đạt 0 lỗi, 0 cảnh báo (No issues found)');

  console.log('\n===============================================================');
  console.log('       🎉 TOÀN BỘ 5/5 BÀI TEST PHASE 5 ĐẠT KẾT QUẢ PASS 100%   ');
  console.log('===============================================================\n');
}

runPhase5Verification().catch((err) => {
  console.error('\n❌ LỖI NGOẠI LỆ TRONG QUÁ TRÌNH KIỂM CHỨNG:', err);
  process.exit(1);
});
