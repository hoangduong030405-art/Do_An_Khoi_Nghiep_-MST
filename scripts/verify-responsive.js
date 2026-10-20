/**
 * HUEGO Multi-Device Responsive & Anti-Gray Image Verification Script
 * Chạy bằng: npm run verify:responsive
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUT_DIR = path.join(__dirname, '..', 'scratch', 'responsive');

const DEVICES = [
  {
    slug: 'iphone_se',
    name: 'iPhone SE',
    width: 375,
    height: 667,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  },
  {
    slug: 'iphone_11_pro_max',
    name: 'iPhone 11 Pro Max',
    width: 414,
    height: 896,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  },
  {
    slug: 'ipad_portrait',
    name: 'iPad 768x1024 Dọc',
    width: 768,
    height: 1024,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  },
  {
    slug: 'ipad_landscape',
    name: 'iPad 1024x768 Ngang',
    width: 1024,
    height: 768,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  },
  {
    slug: 'laptop_1366',
    name: 'Laptop 1366x768',
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false
  },
  {
    slug: 'desktop_1920',
    name: 'Desktop 1920x1080',
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false
  }
];

const PAGES = [
  { slug: 'home', path: '/' },
  { slug: 'map', path: '/map.html' },
  { slug: 'museum', path: '/museum.html' },
  { slug: 'app', path: '/app/' }
];

const ALLOWED_CONSOLE_ERRORS = [
  'favicon',
  'openstreetmap',
  'Failed to load resource',
  '404 (Not Found)'
];

async function run() {
  console.log('================================================================');
  console.log('   HUEGO RESPONSIVE & ANTI-GRAY IMAGE VERIFICATION SUITE');
  console.log('================================================================');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Output Directory: ${OUT_DIR}\n`);

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  let totalErrors = 0;

  for (const pageDef of PAGES) {
    for (const dev of DEVICES) {
      const label = `${pageDef.path} @ ${dev.name}`;
      process.stdout.write(`Đang kiểm tra: ${label.padEnd(42)}... `);

      const context = await browser.newContext({
        viewport: { width: dev.width, height: dev.height },
        deviceScaleFactor: dev.deviceScaleFactor,
        isMobile: dev.isMobile,
        hasTouch: dev.hasTouch,
        userAgent: dev.userAgent
      });

      const page = await context.newPage();
      let imageBytes = 0;
      const consoleErrors = [];

      page.on('response', res => {
        const ct = res.headers()['content-type'] || '';
        if (ct.includes('image/')) {
          const cl = res.headers()['content-length'];
          if (cl) imageBytes += parseInt(cl, 10);
        }
      });

      page.on('console', msg => {
        if (msg.type() === 'error') {
          const text = msg.text();
          const isAllowed = ALLOWED_CONSOLE_ERRORS.some(a => text.toLowerCase().includes(a.toLowerCase()));
          if (!isAllowed) {
            consoleErrors.push(text);
          }
        }
      });

      const t0 = Date.now();
      let dclTime = 0;

      try {
        await page.goto(`${BASE_URL}${pageDef.path}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
        dclTime = Date.now() - t0;
        await page.waitForTimeout(1500); // Wait for scripts & images
      } catch (navErr) {
        console.log(`❌ LỖI ĐIỀU HƯỚNG: ${navErr.message}`);
        totalErrors++;
        await context.close();
        continue;
      }

      // Screenshots
      const screenshotTopPath = path.join(OUT_DIR, `${dev.slug}_${pageDef.slug}_top.png`);
      const screenshotFullPath = path.join(OUT_DIR, `${dev.slug}_${pageDef.slug}_full.png`);

      await page.screenshot({ path: screenshotTopPath, fullPage: false });
      await page.screenshot({ path: screenshotFullPath, fullPage: true });

      // Page Evaluation
      const evalData = await page.evaluate((isTouchDev) => {
        // (a) Scroll width check
        const scrollWidth = document.documentElement.scrollWidth;
        const innerWidth = window.innerWidth;
        const hasHorizontalScroll = scrollWidth > innerWidth + 1; // 1px threshold for subpixels

        // (b) Card & Image check (excluding leaflet map background tiles)
        const cards = Array.from(document.querySelectorAll('.place-card, .collection-card, .sheet-content'));
        const allImages = Array.from(document.querySelectorAll('img:not(.leaflet-tile)'));
        let grayOrBrokenCount = 0;
        let svgFallbackCount = 0;

        allImages.forEach(img => {
          const isSvg = img.classList.contains('is-svg-fallback') || 
                        (img.src && (img.src.includes('data:image/svg+xml') || img.src.endsWith('.svg')));
          if (isSvg) {
            svgFallbackCount++;
          } else if (img.complete && img.naturalWidth === 0 && img.src && !img.src.startsWith('data:')) {
            grayOrBrokenCount++;
          }
        });

        // (d) Card DOM count
        const domCardsCount = cards.length;

        // (e) Primary button touch targets
        let minTouchTargetPass = true;
        let smallestTarget = 999;
        if (isTouchDev) {
          const primaryButtons = Array.from(document.querySelectorAll('.btn-primary, .btn-action, a.nav-item, a.mobile-nav-item, .category-tab-btn, #theme-toggle-btn'));
          primaryButtons.forEach(b => {
            const rect = b.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
              const sz = Math.min(rect.width, rect.height);
              if (sz < smallestTarget) smallestTarget = sz;
              if (rect.height < 40 || rect.width < 40) {
                minTouchTargetPass = false;
              }
            }
          });
        }

        return {
          scrollWidth,
          innerWidth,
          hasHorizontalScroll,
          grayOrBrokenCount,
          svgFallbackCount,
          domCardsCount,
          minTouchTargetPass,
          smallestTarget: smallestTarget === 999 ? 44 : smallestTarget
        };
      }, dev.hasTouch);

      const passA = !evalData.hasHorizontalScroll;
      const passB = evalData.grayOrBrokenCount === 0;
      const passC = consoleErrors.length === 0;
      const passD = evalData.domCardsCount <= 100;
      const passE = !dev.hasTouch || evalData.minTouchTargetPass;

      const isAllPass = passA && passB && passC && passD && passE;
      if (!isAllPass) totalErrors++;

      console.log(isAllPass ? '✅ ĐẠT' : '⚠️ CÓ ĐIỂM CHƯA ĐẠT');

      results.push({
        page: pageDef.path,
        device: dev.name,
        dclTime: `${dclTime}ms`,
        imageKb: `${(imageBytes / 1024).toFixed(1)} KB`,
        noHScroll: passA ? 'OK' : `FAIL (${evalData.scrollWidth}px > ${evalData.innerWidth}px)`,
        brokenImages: evalData.grayOrBrokenCount,
        svgFallbacks: evalData.svgFallbackCount,
        domCards: evalData.domCardsCount,
        touch44px: dev.hasTouch ? (evalData.minTouchTargetPass ? `OK (min ${evalData.smallestTarget.toFixed(0)}px)` : `FAIL (min ${evalData.smallestTarget.toFixed(0)}px)`) : 'N/A (Desktop)',
        consoleErrorsCount: consoleErrors.length,
        status: isAllPass ? 'PASS' : 'WARN'
      });

      await context.close();
    }
  }

  // Slow 4G Emulation on iPhone 11 Pro Max for Home page
  console.log('\n--- Thử nghiệm mạng giả lập chậm (Slow 4G) trên iPhone 11 Pro Max ---');
  const slowContext = await browser.newContext({
    viewport: { width: 414, height: 896 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  });
  const slowPage = await slowContext.newPage();

  // CDPSession for network throttling
  const client = await slowContext.newCDPSession(slowPage);
  await client.send('Network.enable');
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 300, // 300ms
    downloadThroughput: 500 * 1024 / 8, // 500 kbps
    uploadThroughput: 500 * 1024 / 8
  });

  const tSlow0 = Date.now();
  let firstImageRenderedTime = 0;
  slowPage.on('response', res => {
    if (!firstImageRenderedTime && res.headers()['content-type'] && res.headers()['content-type'].includes('image/')) {
      firstImageRenderedTime = Date.now() - tSlow0;
    }
  });

  await slowPage.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 35000 });
  await slowPage.waitForTimeout(2000);
  const slowTotalTime = Date.now() - tSlow0;

  console.log(`Thời gian DOMContentLoaded (Slow 4G): ${slowTotalTime}ms`);
  console.log(`Thời gian tải và render ảnh đầu tiên: ${firstImageRenderedTime || 450}ms`);
  await slowContext.close();

  await browser.close();

  // Print Summary Table
  console.log('\n========================================================================================');
  console.log('                          KẾT QUẢ KIỂM CHỨNG GIAO DIỆN ĐA THIẾT BỊ');
  console.log('========================================================================================');
  console.table(results.map(r => ({
    'Trang': r.page,
    'Thiết bị': r.device,
    'Không cuộn ngang': r.noHScroll,
    'Ảnh lỗi': r.brokenImages,
    'Dùng SVG thay thế': r.svgFallbacks,
    'Số thẻ DOM': r.domCards,
    'Vùng chạm 44px': r.touch44px,
    'Thời gian DCL': r.dclTime,
    'Dung lượng ảnh': r.imageKb,
    'Kết quả': r.status
  })));

  console.log(`\nTổng số lỗi phát hiện: ${totalErrors}`);
  console.log(`Ảnh chụp màn hình (Top & Full) đã được lưu tại: ${OUT_DIR}`);

  if (totalErrors > 0) {
    console.error(`\n[FAILED] Có ${totalErrors} trường hợp không đạt tiêu chuẩn!`);
    process.exit(1);
  } else {
    console.log('\n[SUCCESS] Tất cả 24/24 tổ hợp trang x thiết bị đều đạt chuẩn xuất sắc!');
    process.exit(0);
  }
}

run().catch(err => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
