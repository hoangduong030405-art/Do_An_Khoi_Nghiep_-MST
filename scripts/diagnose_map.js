const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const artifactDir = 'C:\\Users\\PREDATOR\\.gemini\\antigravity\\brain\\63418a43-da08-4ce7-b590-1f315a18fa7d';

async function diagnose() {
  console.log('--- BẮT ĐẦU CHẨN ĐOÁN LỖI MAP VỚI PLAYWRIGHT ---');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  const targets = [
    { name: 'Portal Map (map.html)', url: 'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/map.html' },
    { name: 'Mobile App (app/index.html)', url: 'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/app/' }
  ];

  for (const t of targets) {
    console.log(`\n========================================`);
    console.log(`Đang kiểm tra: ${t.name} -> ${t.url}`);
    console.log(`========================================`);
    const page = await context.newPage();

    const consoleLogs = [];
    const errors = [];
    const failedRequests = [];
    const tileRequests = [];

    page.on('console', msg => {
      const text = `[Console ${msg.type().toUpperCase()}] ${msg.text()}`;
      consoleLogs.push(text);
      if (msg.type() === 'error') {
        errors.push(text);
      }
    });

    page.on('pageerror', err => {
      errors.push(`[UNCAUGHT EXCEPTION] ${err.message}\n${err.stack}`);
    });

    page.on('requestfailed', req => {
      failedRequests.push({ url: req.url(), failure: req.failure() ? req.failure().errorText : 'unknown' });
    });

    page.on('response', res => {
      const u = res.url();
      if (u.includes('cartocdn') || u.includes('arcgisonline') || u.includes('openstreetmap.org')) {
        tileRequests.push({ url: u, status: res.status() });
      }
    });

    try {
      const response = await page.goto(t.url, { waitUntil: 'load', timeout: 30000 });
      console.log(`HTTP Status: ${response.status()}`);

      // Đợi thêm 4 giây để bản đồ Leaflet nạp tiles và render
      await page.waitForTimeout(4000);

      // Chụp màn hình
      const screenshotPath = path.join(artifactDir, `screenshot_${t.name.includes('Portal') ? 'portal_map' : 'mobile_app'}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      console.log(`Đã chụp ảnh màn hình lưu tại: ${screenshotPath}`);

      // Kiểm tra trạng thái map trong DOM
      const mapInfo = await page.evaluate(() => {
        const mapEl = document.getElementById('map') || document.getElementById('main-hue-map');
        const tiles = Array.from(document.querySelectorAll('.leaflet-tile')).map(img => ({
          src: img.src,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          className: img.className
        }));
        const markers = document.querySelectorAll('.leaflet-marker-icon').length;
        const clusters = document.querySelectorAll('.marker-cluster').length;
        const pane = document.querySelector('.leaflet-tile-pane');
        const container = mapEl ? {
          offsetWidth: mapEl.offsetWidth,
          offsetHeight: mapEl.offsetHeight,
          display: window.getComputedStyle(mapEl).display,
          visibility: window.getComputedStyle(mapEl).visibility
        } : null;

        return {
          hasMapElement: !!mapEl,
          container,
          tileCount: tiles.length,
          tilesSample: tiles.slice(0, 5),
          tilePaneHtml: pane ? pane.innerHTML.substring(0, 300) : null,
          markers,
          clusters,
          windowErrors: window.__errors || []
        };
      });

      console.log('DOM Map Info:', JSON.stringify(mapInfo, null, 2));
      console.log(`Tile Requests (${tileRequests.length}):`, tileRequests.slice(0, 5));
      console.log(`Failed Requests (${failedRequests.length}):`, failedRequests.slice(0, 5));
      console.log(`Errors (${errors.length}):`, errors);
      if (consoleLogs.length > 0) {
        console.log(`Console logs gần đây:`, consoleLogs.slice(-10));
      }

    } catch (e) {
      console.error(`Lỗi khi mở trang ${t.url}:`, e);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n--- KẾT THÚC CHẨN ĐOÁN ---');
}

diagnose().catch(console.error);
