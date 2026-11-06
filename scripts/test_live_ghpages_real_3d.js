const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true, 
    channel: 'chrome'
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const url = 'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/landing.html?v=real_3d_master_' + Date.now();
  console.log('Testing live URL:', url);
  const resp = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
  console.log('HTTP Status:', resp.status());

  // Wait 5 seconds for intro animation and 3D flight
  await page.waitForTimeout(5000);

  // Check if real 3D mesh is present
  const hasReal3D = await page.evaluate(() => {
    return !!window.__scene_ready || document.getElementById('webgl-canvas') !== null;
  });
  console.log('Real 3D Canvas running:', hasReal3D);

  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_live_real_3d_verified.png' });
  console.log('Saved screenshot_live_real_3d_verified.png');

  console.log('Console Errors:', consoleErrors.length, consoleErrors);
  await browser.close();
})();
