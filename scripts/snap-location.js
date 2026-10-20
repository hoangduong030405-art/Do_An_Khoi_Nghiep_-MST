const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext({
    viewport: { width: 412, height: 915 },
    permissions: ['geolocation'],
    geolocation: { latitude: 16.4697, longitude: 107.5779, accuracy: 25 }
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/app/', { waitUntil: 'networkidle' });

  // Click locate button
  await page.click('#huegoLocateBtn');
  await page.waitForTimeout(1500);

  // Take screenshot
  await page.screenshot({ path: 'scratch/screenshot_app_location.png' });
  console.log('Saved scratch/screenshot_app_location.png');

  // Open weather dropdown
  await page.click('#weatherPill');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scratch/screenshot_app_weather_dropdown.png' });
  console.log('Saved scratch/screenshot_app_weather_dropdown.png');

  await browser.close();
})();
