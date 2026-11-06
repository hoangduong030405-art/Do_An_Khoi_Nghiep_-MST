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
  
  // Wait 4 seconds for explosive intro to finish and fly-in to orbit
  await page.waitForTimeout(4500);

  // Screenshot Hero at t=4.5s
  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_real_3d_orbit_1.png' });
  console.log('Saved screenshot_real_3d_orbit_1.png');

  // Wait another 2.5s for dynamic flight position
  await page.waitForTimeout(2500);
  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_real_3d_orbit_2.png' });
  console.log('Saved screenshot_real_3d_orbit_2.png');

  console.log('Console Errors:', consoleErrors.length, consoleErrors);
  await browser.close();
})();
