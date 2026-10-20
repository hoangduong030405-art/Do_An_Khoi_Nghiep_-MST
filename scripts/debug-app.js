const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage();
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE_ERROR:', err.message));
  page.on('response', res => {
    if (res.status() >= 400) console.log('HTTP_ERR:', res.status(), res.url());
  });

  await page.goto('http://localhost:3000/app/', { waitUntil: 'networkidle' });
  const hasService = await page.evaluate(() => typeof window.HuegoLocationService);
  const hasUI = await page.evaluate(() => typeof window.HuegoMapLocationUI);
  const btn = await page.$('#huegoLocateBtn');
  console.log('hasService:', hasService, 'hasUI:', hasUI, 'btnExists:', !!btn);
  await browser.close();
})();
