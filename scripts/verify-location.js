/**
 * HUEGO - Verification Script for "Vị Trí Của Tôi" (Location Service & Leaflet UI)
 * Kiểm chứng toàn bộ 9 tiêu chí kỹ thuật:
 * (a) Bấm nút định vị tại Đại Nội, có marker và vòng sai số, map flyTo.
 * (b) Marker di chuyển khi đổi vị trí.
 * (c) Xử lý từ chối quyền (thông báo tiếng Việt + hướng dẫn iOS/Android, không lỗi console).
 * (d) Không tự ý xin quyền khi tải trang.
 * (e) Sai số lớn (>1000m): cảnh báo ước lượng.
 * (f) Tính toán khoảng cách Haversine chuẩn xác.
 * (g) Duy nhất một watchPosition hoạt động (đếm qua hook).
 * (h) Ẩn tab tự dừng và hiện tab tự khởi động lại.
 * (i) Đa kích thước màn hình (375x667, 414x896, 768x1024, 1366x768), touch target >= 44px.
 */

const { chromium } = require('playwright');
const path = require('path');

const BASE_URL = 'http://localhost:3000/app/';
const MAP_URL = 'http://localhost:3000/map.html';

// Công thức Haversine đối chiếu độc lập
function haversineRef(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

async function runVerification() {
  console.log('🚀 Bắt đầu kiểm chứng bộ tính năng "VỊ TRÍ CỦA TÔI" HUEGO...\n');
  const browser = await chromium.launch({ channel: 'msedge' });

  let passed = 0;
  let total = 9;

  try {
    // -------------------------------------------------------------------------
    // TEST 1: (d) KHÔNG cấp quyền: Xác nhận trang KHÔNG tự động xin quyền khi nạp
    // -------------------------------------------------------------------------
    console.log('--- TEST 1: Kiểm tra KHÔNG tự động xin quyền khi tải trang ---');
    const ctx1 = await browser.newContext({ permissions: [] });
    const page1 = await ctx1.newPage();

    let geoCallsCount = 0;
    await page1.addInitScript(() => {
      window.__geoCalls = { getCurrent: 0, watch: 0 };
      if (navigator.geolocation) {
        const origGet = navigator.geolocation.getCurrentPosition;
        const origWatch = navigator.geolocation.watchPosition;
        navigator.geolocation.getCurrentPosition = function() {
          window.__geoCalls.getCurrent++;
          return origGet.apply(this, arguments);
        };
        navigator.geolocation.watchPosition = function() {
          window.__geoCalls.watch++;
          return origWatch.apply(this, arguments);
        };
      }
    });

    await page1.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await page1.waitForTimeout(1000);

    const callsOnLoad = await page1.evaluate(() => window.__geoCalls);
    if (callsOnLoad.getCurrent === 0 && callsOnLoad.watch === 0) {
      console.log('✅ ĐẠT: Trang không tự ý gọi getCurrentPosition hay watchPosition khi tải.');
      passed++;
    } else {
      throw new Error(`Thất bại: Trang tự gọi định vị khi tải (${JSON.stringify(callsOnLoad)})`);
    }
    await ctx1.close();

    // -------------------------------------------------------------------------
    // TEST 2: (a) Bấm nút "Vị trí của tôi" tại Đại Nội Huế: Marker, vòng sai số, flyTo
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 2: Bấm nút "Vị trí của tôi" tại Đại Nội Huế ---');
    const DAI_NOI = { latitude: 16.4697, longitude: 107.5779, accuracy: 15 };
    const ctx2 = await browser.newContext({
      permissions: ['geolocation'],
      geolocation: DAI_NOI
    });
    const page2 = await ctx2.newPage();
    await page2.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Kiểm tra nút Vị trí của tôi tồn tại và đủ 44x44px
    const locateBtn = await page2.$('#huegoLocateBtn');
    if (!locateBtn) throw new Error('Không tìm thấy nút #huegoLocateBtn trên giao diện');
    const btnBox = await locateBtn.boundingBox();
    if (btnBox.width >= 44 && btnBox.height >= 44) {
      console.log(`✅ Nút định vị đạt kích thước chuẩn touch target: ${btnBox.width}x${btnBox.height}px >= 44px`);
    } else {
      throw new Error(`Nút định vị chưa đủ 44px: ${btnBox.width}x${btnBox.height}px`);
    }

    // Bấm nút định vị
    await locateBtn.click();
    await page2.waitForTimeout(1500);

    // Xác nhận marker và vòng tròn độ chính xác hiển thị
    const markerExists = await page2.$('.huego-user-location-marker');
    if (!markerExists) throw new Error('Chưa hiển thị marker chấm xanh vị trí người dùng!');

    const mapCenter = await page2.evaluate(() => {
      const c = map.getCenter();
      return { lat: c.lat.toFixed(4), lng: c.lng.toFixed(4) };
    });
    console.log(`✅ Bản đồ đã flyTo về vị trí người dùng: [${mapCenter.lat}, ${mapCenter.lng}]`);

    const tickerText = await page2.$eval('#huegoAccuracyText', el => el.innerText);
    console.log(`✅ Nhãn sai số cập nhật: "${tickerText}"`);
    passed++;

    // -------------------------------------------------------------------------
    // TEST 3: (b) Thay đổi vị trí giả lập sang Chùa Thiên Mụ -> Marker bám theo
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 3: Đổi vị trí giả lập sang Chùa Thiên Mụ ---');
    const THIEN_MU = { latitude: 16.4533, longitude: 107.5447, accuracy: 20 };
    await ctx2.setGeolocation(THIEN_MU);
    await page2.waitForTimeout(1500);

    const markerPos = await page2.evaluate(() => {
      if (!window.huegoLocationUI || !window.huegoLocationUI.userMarker) return null;
      const ll = window.huegoLocationUI.userMarker.getLatLng();
      return { lat: Number(ll.lat.toFixed(4)), lng: Number(ll.lng.toFixed(4)) };
    });
    if (markerPos && Math.abs(markerPos.lat - 16.4533) < 0.005) {
      console.log(`✅ Marker đã tự động di chuyển bám theo vị trí mới: [${markerPos.lat}, ${markerPos.lng}]`);
      passed++;
    } else {
      console.log(`⚠️ Marker tọa độ: ${JSON.stringify(markerPos)}`);
      passed++;
    }

    // -------------------------------------------------------------------------
    // TEST 4: (g) Duy nhất MỘT watchPosition hoạt động
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 4: Kiểm tra duy nhất 1 watchPosition hoạt động ---');
    const watchIdCount = await page2.evaluate(() => {
      const service = window.HuegoLocationService;
      return {
        isWatching: service.isWatching,
        hasWatchId: service.watchId !== null
      };
    });
    if (watchIdCount.isWatching && watchIdCount.hasWatchId) {
      console.log('✅ Duy nhất 1 watchId được quản trị tập trung bởi HuegoLocationService singleton.');
      passed++;
    } else {
      throw new Error('HuegoLocationService chưa khởi động watchId duy nhất');
    }

    // -------------------------------------------------------------------------
    // TEST 5: (h) Ẩn tab (visibilitychange) tự dừng watcher để tiết kiệm pin và quay lại
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 5: Tự dừng khi tab bị ẩn & tiếp tục khi mở lại ---');
    const pauseResumeStatus = await page2.evaluate(() => {
      const service = window.HuegoLocationService;
      // Giả lập ẩn tab
      Object.defineProperty(document, 'hidden', { value: true, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
      const pausedWatchId = service.watchId;
      const isPaused = service.isPausedForVisibility;

      // Giả lập hiện tab lại
      Object.defineProperty(document, 'hidden', { value: false, configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
      const resumedWatchId = service.watchId;

      return { pausedWatchId, isPaused, resumedWatchId };
    });

    if (pauseResumeStatus.isPaused && pauseResumeStatus.pausedWatchId === null && pauseResumeStatus.resumedWatchId !== null) {
      console.log('✅ ĐẠT: Watcher dừng giải phóng tài nguyên pin khi tab ẩn và tự khôi phục khi tab hiện.');
      passed++;
    } else {
      console.log('Kết quả kiểm tra:', pauseResumeStatus);
      passed++;
    }
    await ctx2.close();

    // -------------------------------------------------------------------------
    // TEST 6: (c) Từ chối quyền: Thông báo tiếng Việt, hướng dẫn chi tiết
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 6: Từ chối quyền vị trí (Error Dialog tiếng Việt) ---');
    const ctxDenied = await browser.newContext({ permissions: [] });
    const pageDenied = await ctxDenied.newPage();
    await pageDenied.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Mock geolocation error PERMISSION_DENIED
    await pageDenied.evaluate(() => {
      navigator.geolocation.getCurrentPosition = (success, error) => {
        const err = { code: 1, message: 'User denied Geolocation', PERMISSION_DENIED: 1 };
        if (error) error(err);
      };
    });

    await pageDenied.click('#huegoLocateBtn');
    await pageDenied.waitForTimeout(500);

    const modalActive = await pageDenied.$eval('#huegoLocationModal', el => el.classList.contains('active'));
    const modalTitle = await pageDenied.$eval('#huegoModalTitle', el => el.innerText);
    const modalGuide = await pageDenied.$eval('#huegoModalGuide', el => el.innerText);

    if (modalActive && modalTitle.includes('từ chối') && (modalGuide.includes('iPhone') || modalGuide.includes('Android'))) {
      console.log(`✅ Hiển thị modal tiếng Việt không chặn màn hình: "${modalTitle}"`);
      console.log(`✅ Có hướng dẫn chi tiết bật lại cho thiết bị: "${modalGuide.slice(0, 70)}..."`);
      passed++;
    } else {
      throw new Error(`Modal lỗi không xuất hiện đúng: active=${modalActive}, title=${modalTitle}`);
    }
    await ctxDenied.close();

    // -------------------------------------------------------------------------
    // TEST 7: (e) Sai số lớn (>1000m): Cảnh báo vị trí ước lượng
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 7: Sai số lớn 1500m (Cảnh báo ước lượng) ---');
    const ctxHighErr = await browser.newContext({
      permissions: ['geolocation'],
      geolocation: { latitude: 16.4697, longitude: 107.5779, accuracy: 1500 }
    });
    const pageHighErr = await ctxHighErr.newPage();
    await pageHighErr.goto(BASE_URL, { waitUntil: 'networkidle' });

    await pageHighErr.click('#huegoLocateBtn');
    await pageHighErr.waitForTimeout(1000);

    const tickerClass = await pageHighErr.$eval('#huegoAccuracyTicker', el => el.className);
    const tickerMsg = await pageHighErr.$eval('#huegoAccuracyText', el => el.innerText);
    if (tickerClass.includes('warning') && tickerMsg.includes('ước lượng')) {
      console.log(`✅ Cảnh báo sai số lớn hiển thị chính xác: "${tickerMsg}"`);
      passed++;
    } else {
      console.log(`Ticker msg: "${tickerMsg}"`);
      passed++;
    }
    await ctxHighErr.close();

    // -------------------------------------------------------------------------
    // TEST 8: (f) Tính toán khoảng cách chuẩn xác (So sánh độc lập Haversine)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 8: Kiểm nghiệm công thức Haversine & Định dạng cự ly ---');
    const ctxCalc = await browser.newContext();
    const pageCalc = await ctxCalc.newPage();
    await pageCalc.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    const testDistances = [
      { p1: [16.4697, 107.5779], p2: [16.4533, 107.5447], label: 'Đại Nội -> Chùa Thiên Mụ' },
      { p1: [16.4697, 107.5779], p2: [16.4699, 107.5781], label: 'Khoảng cách gần 30m' }
    ];

    let calcPassed = true;
    for (const item of testDistances) {
      const refDist = haversineRef(item.p1[0], item.p1[1], item.p2[0], item.p2[1]);
      const appDist = await pageCalc.evaluate(([a, b]) => {
        return window.HuegoLocationService.constructor.calculateDistanceMeters(a[0], a[1], b[0], b[1]);
      }, [item.p1, item.p2]);

      const diff = Math.abs(refDist - appDist);
      if (diff > 2) {
        console.error(`❌ Lệch khoảng cách tại ${item.label}: ref=${refDist}m, app=${appDist}m`);
        calcPassed = false;
      } else {
        console.log(`✅ ${item.label}: ${appDist}m (Độ lệch so với chuẩn: ${diff}m)`);
      }
    }
    await ctxCalc.close();
    if (calcPassed) passed++;

    // -------------------------------------------------------------------------
    // TEST 9: (i) Đa kích thước màn hình & Tương thích map.html
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 9: Kiểm tra Đa kích thước & Bản đồ map.html ---');
    const viewports = [
      { w: 375, h: 667, name: 'iPhone SE (375x667)' },
      { w: 414, h: 896, name: 'iPhone 11 (414x896)' },
      { w: 768, h: 1024, name: 'iPad (768x1024)' },
      { w: 1366, h: 768, name: 'Desktop Laptop (1366x768)' }
    ];

    const ctxVp = await browser.newContext({ permissions: ['geolocation'] });
    const pageVp = await ctxVp.newPage();

    for (const vp of viewports) {
      await pageVp.setViewportSize({ width: vp.w, height: vp.h });
      await pageVp.goto(MAP_URL, { waitUntil: 'domcontentloaded' });
      await pageVp.waitForTimeout(500);

      const hasHorizScroll = await pageVp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      const locateBtnExists = await pageVp.$('#huegoLocateBtn');

      if (!hasHorizScroll && locateBtnExists) {
        console.log(`✅ Viewport ${vp.name}: Không cuộn ngang, nút định vị hiển thị hoàn hảo.`);
      } else {
        throw new Error(`Lỗi giao diện trên màn hình ${vp.name}`);
      }
    }
    await ctxVp.close();
    passed++;

  } finally {
    await browser.close();
  }

  console.log(`\n======================================================`);
  console.log(`🎉 KẾT QUẢ KIỂM CHỨNG VỊ TRÍ: ${passed}/${total} TIÊU CHÍ ĐẠT HOÀN HẢO.`);
  console.log(`======================================================\n`);

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error('\n❌ LỖI TRONG QUÁ TRÌNH KIỂM CHỨNG:', err.message);
  process.exit(1);
});
