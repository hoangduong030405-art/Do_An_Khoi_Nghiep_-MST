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
  
  // Wait for 3D models to load & explosive intro animation
  await page.waitForTimeout(2800);

  // Check canvas
  const canvasValid = await page.evaluate(() => {
    const c = document.getElementById('webgl-canvas');
    return !!c && c.width > 0 && c.height > 0;
  });
  console.log('Canvas valid:', canvasValid);

  // Screenshot Hero after explosive intro
  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_explosive_hero.png' });
  console.log('Saved Explosive Hero screenshot');

  // Scroll to river experience & Dragon Boat
  console.log('Scrolling down to Thuyền Rồng Sông Hương...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1600);
  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_dragon_boat_river.png' });
  console.log('Saved Dragon Boat River screenshot');

  // Test release lantern from Dragon Boat
  page.on('dialog', async dialog => {
    console.log('Dialog message:', dialog.message());
    await dialog.accept();
  });
  await page.fill('#lantern-name', 'TS. Nguyễn Văn A - Ban Giám Khảo');
  await page.fill('#lantern-wish', 'Chúc HUEGO đạt giải nhất và Cố Đô Huế mãi rạng rỡ');
  await page.click('#btn-submit-lantern');
  await page.waitForTimeout(1600);
  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_lantern_from_dragon_boat.png' });
  console.log('Saved Lantern Released from Dragon Boat screenshot');

  const count = await page.$eval('#lantern-count', el => el.innerText);
  console.log('Lantern count after release:', count);

  console.log('Console Errors:', consoleErrors.length, consoleErrors);
  await browser.close();
})();
