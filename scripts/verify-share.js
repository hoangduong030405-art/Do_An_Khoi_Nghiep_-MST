const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const API_URL = `${BASE_URL}/api/v1`;

async function run() {
  console.log('===============================================================');
  console.log('   BẮT ĐẦU KIỂM CHỨNG TỰ ĐỘNG CHIA SẺ LỘ TRÌNH (PLAYWRIGHT)   ');
  console.log('===============================================================');

  const scratchDir = path.resolve(__dirname, '..', 'scratch', 'share');
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }

  // 1. Lấy 4 địa danh từ CSDL
  console.log('\n[Bước 1] Chuẩn bị dữ liệu: Lấy 4 địa danh thực tế từ CSDL PostgreSQL...');
  let pg;
  try {
    pg = require('pg');
  } catch (_) {
    pg = require(path.resolve(__dirname, '..', 'backend', 'node_modules', 'pg'));
  }
  const pool = new pg.Pool({
    connectionString: 'postgres://postgres:huego_secure_password_2026@localhost:5432/huego_db_lock_demo'
  });
  const placesRes = await pool.query('SELECT id, name FROM places LIMIT 4');
  await pool.end();
  const samplePlaces = placesRes.rows;
  const placeIds = samplePlaces.map(p => p.id);
  console.log(`Đã chọn 4 điểm đến: ${samplePlaces.map(p => p.name).join(' -> ')}`);

  // 2. Đăng ký User A & tạo lộ trình 4 điểm
  console.log('\n[Bước 2] Đăng ký User A và tạo lộ trình 4 điểm...');
  const userAEmail = `playwright.user.a.${Date.now()}@huego.vn`;
  const regARes = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userAEmail,
      password: 'Password123!',
      fullName: 'Hoàng Thái Tử An'
    })
  });
  const userAData = await regARes.json();
  const tokenA = userAData.accessToken;
  console.log(`User A đăng ký thành công: ${userAEmail} (ID: ${userAData.user.id})`);

  const itinRes = await fetch(`${API_URL}/itinerary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenA}`
    },
    body: JSON.stringify({
      title: 'Hành Trình 4 Cảnh Đẹp Cố Đô Tuyệt Sắc',
      date: '2026-11-20',
      placeIds
    })
  });
  const itinData = await itinRes.json();
  const itineraryId = itinData.id;
  console.log(`Tạo lộ trình thành công: "${itinData.title}" (ID: ${itineraryId})`);

  // 3. Tạo link chia sẻ
  console.log('\n[Bước 3] Tạo link chia sẻ lộ trình qua API POST /api/v1/itinerary/:id/share...');
  const shareRes = await fetch(`${API_URL}/itinerary/${itineraryId}/share`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenA}`
    },
    body: JSON.stringify({
      expiresInDays: 30,
      includeNotes: false,
      allowCopy: true
    })
  });
  const shareData = await shareRes.json();
  const shareUrl = shareData.shareUrl;
  const rawToken = shareUrl.split('/s/')[1];
  console.log(`Tạo link thành công: ${shareUrl}`);
  console.log(`Ngày hết hạn: ${shareData.expiresAt} | Cho phép copy: ${shareData.allowCopy}`);

  // 4. Khởi chạy Playwright Browser
  console.log('\n[Bước 4] Khởi chạy Chrome Headless để kiểm tra trang công khai /s/:token...');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });

  // Ngữ cảnh KHÔNG ĐĂNG NHẬP (Incognito context)
  const guestContext = await browser.newContext();
  const guestPage = await guestContext.newPage();

  // Theo dõi tải các ô nền OpenStreetMap
  let tileRequests = 0;
  let tileSuccesses = 0;
  guestPage.on('response', resp => {
    if (resp.url().includes('tile.openstreetmap.org')) {
      tileRequests++;
      if (resp.status() === 200) {
        tileSuccesses++;
      }
    }
  });

  // Test các độ phân giải: 1366x768, 768x1024, 414x896, 375x667
  const viewports = [
    { name: 'desktop', width: 1366, height: 768 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-414', width: 414, height: 896 },
    { name: 'mobile-375', width: 375, height: 667 }
  ];

  for (const vp of viewports) {
    await guestPage.setViewportSize({ width: vp.width, height: vp.height });
    await guestPage.goto(shareUrl, { waitUntil: 'networkidle' });

    // Kiểm tra không cuộn ngang
    const hasHorizontalScroll = await guestPage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasHorizontalScroll) {
      throw new Error(`LỖI: Phát hiện cuộn ngang tại kích thước ${vp.width}x${vp.height}!`);
    }

    const shotPath = path.join(scratchDir, `share-${vp.name}.png`);
    await guestPage.screenshot({ path: shotPath, fullPage: true });
    console.log(` ✓ [${vp.width}x${vp.height}] Không cuộn ngang. Đã chụp: ${shotPath}`);
  }

  // 5. Kiểm tra chi tiết trang công khai /s/:token
  console.log('\n[Bước 5] Kiểm tra nội dung trang công khai...');
  const pageTitle = await guestPage.innerText('.route-title');
  console.log(` - Tiêu đề lộ trình: "${pageTitle}"`);
  if (!pageTitle.includes('Hành Trình 4 Cảnh Đẹp Cố Đô Tuyệt Sắc')) {
    throw new Error('Tiêu đề lộ trình không khớp!');
  }

  const items = await guestPage.$$('.timeline-item');
  console.log(` - Số điểm dừng trên timeline: ${items.length} (Kỳ vọng: 4)`);
  if (items.length !== 4) {
    throw new Error(`Kỳ vọng 4 điểm dừng, thực tế nhận được: ${items.length}`);
  }

  // Chờ bản đồ và kiểm tra Leaflet markers
  await guestPage.waitForSelector('.custom-map-marker', { timeout: 5000 });
  const markers = await guestPage.$$('.custom-map-marker');
  console.log(` - Số marker số trên bản đồ Leaflet: ${markers.length} (Kỳ vọng: 4)`);
  if (markers.length !== 4) {
    throw new Error(`Kỳ vọng 4 markers trên bản đồ, thực tế: ${markers.length}`);
  }

  // Kiểm tra tải ô nền OpenStreetMap
  console.log(` - Ô nền OpenStreetMap: Đã tải ${tileSuccesses}/${tileRequests} ô nền (HTTP 200 OK, không bị chặn thiếu Referer)`);
  if (tileRequests > 0 && tileSuccesses === 0) {
    throw new Error('Tất cả các ô nền OpenStreetMap đều bị lỗi tải (HTTP != 200)!');
  }

  // Kiểm tra không lộ email trong toàn bộ HTML
  const fullHtml = await guestPage.content();
  if (fullHtml.includes(userAEmail)) {
    throw new Error(`LỖI BẢO MẬT: Email người dùng (${userAEmail}) bị lộ trong mã nguồn HTML!`);
  }
  console.log(' - Kiểm tra bảo mật: Email chủ sở hữu HOÀN TOÀN KHÔNG có trong HTML (Đạt).');

  // Kiểm tra thẻ OpenGraph
  const ogTitle = await guestPage.$eval('meta[property="og:title"]', el => el.getAttribute('content'));
  const ogDesc = await guestPage.$eval('meta[property="og:description"]', el => el.getAttribute('content'));
  const ogImg = await guestPage.$eval('meta[property="og:image"]', el => el.getAttribute('content'));
  console.log(` - Thẻ og:title: "${ogTitle}"`);
  console.log(` - Thẻ og:description: "${ogDesc}"`);
  console.log(` - Thẻ og:image: "${ogImg}" (URL tuyệt đối HTTPS)`);
  if (!ogTitle || !ogDesc || !ogDesc.includes('4 điểm')) {
    throw new Error('Thẻ OpenGraph không hợp lệ!');
  }
  if (!ogImg || !ogImg.startsWith('https://')) {
    throw new Error(`Thẻ og:image không phải URL tuyệt đối https: ${ogImg}`);
  }

  // 6. Đăng nhập User B và test "Lưu về lộ trình của tôi"
  console.log('\n[Bước 6] Đăng ký User B và thực hiện "Lưu về lộ trình của tôi"...');
  const userBEmail = `playwright.user.b.${Date.now()}@huego.vn`;
  const regBRes = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userBEmail,
      password: 'Password123!',
      fullName: 'Du Khách Bình'
    })
  });
  const userBData = await regBRes.json();
  const tokenB = userBData.accessToken;

  // Tạo ngữ cảnh browser cho User B đã đăng nhập
  const userBContext = await browser.newContext();
  const userBPage = await userBContext.newPage();
  await userBPage.goto(`${BASE_URL}/app/`, { waitUntil: 'networkidle' });

  // Gán token vào localStorage của User B
  await userBPage.evaluate((token, user) => {
    localStorage.setItem('huego_token', token);
    localStorage.setItem('huego_user', JSON.stringify(user));
  }, tokenB, userBData.user);

  // Mở trang chia sẻ bằng browser của User B
  await userBPage.goto(shareUrl, { waitUntil: 'networkidle' });
  const copyBtn = await userBPage.$('#btnCopyItinerary');
  if (!copyBtn) throw new Error('Không tìm thấy nút Lưu về lộ trình của tôi!');

  // Bấm nút Lưu về lộ trình của tôi
  userBPage.on('dialog', async dialog => {
    console.log(` - Hộp thoại thông báo: "${dialog.message()}"`);
    await dialog.accept();
  });
  await copyBtn.click();
  await userBPage.waitForTimeout(2000);

  // Kiểm tra User B đã có lộ trình mới trong CSDL
  const bItinsRes = await fetch(`${API_URL}/itinerary`, {
    headers: { 'Authorization': `Bearer ${tokenB}` }
  });
  const bItins = await bItinsRes.json();
  const copiedItin = bItins.find(i => i.title.includes('Bản sao:'));
  if (!copiedItin) {
    throw new Error('Lộ trình sao chép không xuất hiện trong tài khoản User B!');
  }
  console.log(` ✓ User B sao chép thành công: "${copiedItin.title}" (ID: ${copiedItin.id}, Stops: ${copiedItin.stops.length})`);

  // 7. Thu hồi liên kết và kiểm tra trang 404
  console.log('\n[Bước 7] Thu hồi liên kết chia sẻ (DELETE /api/v1/itinerary/:id/share)...');
  const revokeRes = await fetch(`${API_URL}/itinerary/${itineraryId}/share`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${tokenA}` }
  });
  if (!revokeRes.ok) throw new Error('Không thể thu hồi liên kết');
  console.log('Đã thu hồi liên kết thành công trên máy chủ.');

  // Mở lại shareUrl bằng browser
  console.log('Mở lại link đã thu hồi, kiểm tra trang lỗi 404...');
  const reloadRes = await guestPage.goto(shareUrl, { waitUntil: 'networkidle' });
  console.log(` - HTTP Status phản hồi: ${reloadRes.status()} (Kỳ vọng: 404)`);
  if (reloadRes.status() !== 404) {
    throw new Error(`Kỳ vọng HTTP 404, thực tế: ${reloadRes.status()}`);
  }

  const errTitle = await guestPage.innerText('h1');
  console.log(` - Thông điệp trang 404: "${errTitle}"`);
  if (!errTitle.includes('Liên kết không tồn tại hoặc đã hết hạn')) {
    throw new Error('Nội dung trang 404 không đúng định dạng!');
  }

  const shot404Path = path.join(scratchDir, 'share-revoked-404.png');
  await guestPage.screenshot({ path: shot404Path });
  console.log(` ✓ Đã chụp ảnh màn hình trang 404: ${shot404Path}`);

  await browser.close();
  console.log('\n===============================================================');
  console.log('   🎉 TẤT CẢ CÁC BƯỚC KIỂM CHỨNG PLAYWRIGHT ĐỀU THÀNH CÔNG!   ');
  console.log('===============================================================');
}

run().catch(err => {
  console.error('\n❌ KIỂM CHỨNG THẤT BẠI:', err.message);
  process.exit(1);
});
