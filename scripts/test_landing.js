const { chromium } = require('playwright');
const path = require('path');

const artifactDir = 'C:\\Users\\PREDATOR\\.gemini\\antigravity\\brain\\63418a43-da08-4ce7-b590-1f315a18fa7d';

async function testLanding() {
  console.log('--- KIỂM TRA TRANG LANDING PAGE 3D (landing.html) VỚI PLAYWRIGHT ---');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  });

  const consoleLogs = [];
  const errors = [];

  page.on('console', msg => {
    const text = `[Console ${msg.type().toUpperCase()}] ${msg.text()}`;
    consoleLogs.push(text);
    if (msg.type() === 'error') errors.push(text);
  });

  page.on('pageerror', err => {
    errors.push(`[PAGE ERROR] ${err.message}`);
  });

  const localLandingUrl = 'file:///' + path.resolve(__dirname, '../web-hue4u/public/landing.html').replace(/\\/g, '/');
  console.log('Navigating to:', localLandingUrl);

  try {
    const res = await page.goto(localLandingUrl, { waitUntil: 'load', timeout: 30000 });
    console.log('Page loaded successfully');

    // Đợi Three.js khởi tạo và render vài frame
    await page.waitForTimeout(3000);

    // Chụp ảnh màn hình Hero Section (Dịu mát)
    const ssHero = path.join(artifactDir, 'screenshot_landing_hero.png');
    await page.screenshot({ path: ssHero, fullPage: false });
    console.log('Saved Hero Screenshot:', ssHero);

    // Test FEATURE 1: Switch Weather to Sunset
    console.log('\n[Test 1] Testing Weather Switch to Sunset...');
    await page.click('button:has-text("Hoàng hôn")');
    await page.waitForTimeout(2000);
    const ssSunset = path.join(artifactDir, 'screenshot_landing_sunset.png');
    await page.screenshot({ path: ssSunset, fullPage: false });
    console.log('Saved Sunset Screenshot:', ssSunset);

    // Test Switch to Rain
    console.log('\n[Test 1b] Testing Weather Switch to Rain...');
    await page.click('button:has-text("Mưa phùn")');
    await page.waitForTimeout(2000);

    // Cuộn xuống Footer Sông Hương (FEATURE 3)
    console.log('\n[Test 2] Scrolling to River Footer Section...');
    await page.evaluate(() => {
      document.getElementById('river-section').scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(3000);

    const ssRiver = path.join(artifactDir, 'screenshot_landing_river.png');
    await page.screenshot({ path: ssRiver, fullPage: false });
    console.log('Saved River Footer Screenshot:', ssRiver);

    // Test Release Lantern
    console.log('\n[Test 3] Testing Release Lotus Lantern...');
    await page.fill('#wish-author', 'Ban Giám Khảo Khởi Nghiệp');
    await page.fill('#wish-content', 'Dự án HUEGO xuất sắc 10/10!');
    await page.click('button:has-text("Thả Hoa Đăng Lên Sông Hương")');
    await page.waitForTimeout(3000);

    const ssLanternReleased = path.join(artifactDir, 'screenshot_landing_lantern_released.png');
    await page.screenshot({ path: ssLanternReleased, fullPage: false });
    console.log('Saved Lantern Released Screenshot:', ssLanternReleased);

    // Kiểm tra số lượng hoa đăng
    const counterText = await page.innerText('#lantern-counter');
    console.log('Lantern Counter after release:', counterText);

    // Kiểm tra WebGL Canvas
    const canvasExists = await page.evaluate(() => {
      const c = document.getElementById('webgl-canvas');
      return !!c && c.width > 0 && c.height > 0;
    });
    console.log('WebGL Canvas initialized and active:', canvasExists);

    console.log('\nTotal Console Errors:', errors.length);
    if (errors.length > 0) {
      console.log('Errors:', errors);
    }

  } catch (err) {
    console.error('Test Error:', err);
  } finally {
    await browser.close();
    console.log('--- TEST HOÀN TẤT ---');
  }
}

testLanding().catch(console.error);
