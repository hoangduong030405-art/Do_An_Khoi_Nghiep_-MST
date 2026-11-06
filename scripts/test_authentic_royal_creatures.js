const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true, 
    channel: 'chrome',
    args: ['--allow-file-access-from-files']
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  const url = 'file:///C:/Lap_Trinh_Ung_dung/web-hue4u/public/landing.html';
  console.log('Navigating to local:', url);
  await page.goto(url, { waitUntil: 'load' });
  
  // Wait 4.5 seconds for 3D models to load & intro animation
  await page.waitForTimeout(4500);

  // Check canvas
  const canvasValid = await page.evaluate(() => {
    const c = document.getElementById('webgl-canvas');
    return !!c && c.width > 0 && c.height > 0;
  });
  console.log('Canvas valid:', canvasValid);

  // Screenshot Hero with Flock of White Cranes & Royal Birds
  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_authentic_royal_hero.png' });
  console.log('Saved screenshot_authentic_royal_hero.png');

  // Scroll down to Sông Hương & Koi Carp
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1600);
  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_river_koi_carp.png' });
  console.log('Saved screenshot_river_koi_carp.png');

  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console Errors:', consoleErrors);
  }
  await browser.close();
})();
