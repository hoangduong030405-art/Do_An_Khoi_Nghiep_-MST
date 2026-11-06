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

  const url = 'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/landing.html?v=authentic_birds_' + Date.now();
  console.log('Testing live URL:', url);
  const resp = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
  console.log('HTTP Status:', resp.status());

  // Wait 5 seconds for intro and 3D flight
  await page.waitForTimeout(5000);

  // Check canvas
  const canvasValid = await page.evaluate(() => {
    const c = document.getElementById('webgl-canvas');
    return !!c && c.width > 0 && c.height > 0;
  });
  console.log('Real 3D Canvas running:', canvasValid);

  // Verify text
  const heroBadge = await page.$eval('.hero-ui', el => el.innerText.substring(0, 80)).catch(() => 'none');
  console.log('Hero text preview:', heroBadge.replace(/\n/g, ' '));

  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_live_authentic_birds.png' });
  console.log('Saved screenshot_live_authentic_birds.png');

  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console Errors:', consoleErrors);
  }
  await browser.close();
})();
