const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  console.log('--- Testing Web Portal Live ---');
  await page.goto('https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/', { waitUntil: 'networkidle' });
  
  // Verify suggested journey cards (#collections-grid)
  const journeyCards = await page.$$eval('#collections-grid .collection-card', els => els.map(e => ({
    title: e.querySelector('.collection-name')?.innerText,
    imgSrc: e.querySelector('.collection-img')?.getAttribute('src'),
    currentSrc: e.querySelector('.collection-img')?.currentSrc
  })));
  console.log('Journey cards:', JSON.stringify(journeyCards, null, 2));
  
  // Check ad card filtering and phone links
  const phoneLinks = await page.$$eval('#places-grid a[href^="tel:"]', els => els.length);
  const placesText = await page.$eval('#places-grid', el => el.innerText);
  console.log('Places grid phone links count:', phoneLinks);
  console.log('Places grid has BOOKING NOW:', placesText.includes('BOOKING NOW'));
  
  await page.screenshot({ path: 'scratch/live_portal_shot.png', fullPage: false });

  console.log('--- Testing App Live ---');
  const appPage = await browser.newPage({ viewport: { width: 412, height: 915 } });
  await appPage.goto('https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/app/', { waitUntil: 'networkidle' });
  
  const helperLoaded = await appPage.evaluate(() => typeof window.resolvePlaceImage === 'function');
  const audioCoverSrc = await appPage.evaluate(() => {
    const el = document.getElementById('audioCover');
    return el ? el.src.slice(0, 60) : null;
  });
  console.log('Image helper loaded in /app/:', helperLoaded);
  console.log('AudioCover src:', audioCoverSrc);
  
  await appPage.screenshot({ path: 'scratch/live_app_shot.png' });
  
  await browser.close();
  console.log('Done test successfully!');
})();
