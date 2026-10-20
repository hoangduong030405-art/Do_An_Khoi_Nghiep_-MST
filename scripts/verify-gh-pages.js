const { chromium } = require('playwright');

async function testSite() {
  console.log('--- STARTING PLAYWRIGHT VERIFICATION ON GITHUB PAGES ---');
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  
  // 1. Portal Web Home
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const errors = [];
    const failedUrls = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('requestfailed', req => failedUrls.push(req.url()));

    console.log('\n[1] Checking Portal Web: https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/');
    const res = await page.goto('https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/', { waitUntil: 'networkidle' });
    console.log('HTTP Status:', res.status());
    console.log('Page Title:', await page.title());
    
    // Check 4 collection cards
    const cardImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.journey-card img, .collections-grid img, [data-collection-id] img')).map(img => ({
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      }));
    });
    console.log('Journey Card Images inspected:', cardImages.length);
    cardImages.forEach((img, i) => {
      console.log(` Card Image ${i+1}: ${img.src} (natural: ${img.naturalWidth}x${img.naturalHeight})`);
    });

    console.log('Console Errors:', errors.length);
    console.log('Failed Requests:', failedUrls.length);
    await page.close();
  }

  // 2. Mobile Web App
  {
    const page = await browser.newPage({ 
      viewport: { width: 390, height: 844 }, // iPhone 14
      isMobile: true,
      hasTouch: true
    });
    const errors = [];
    const failedUrls = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('requestfailed', req => failedUrls.push(req.url()));

    console.log('\n[2] Checking Mobile App: https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/app/');
    const res = await page.goto('https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/app/', { waitUntil: 'networkidle' });
    console.log('HTTP Status:', res.status());

    // Switch to Map tab
    await page.click('button[onclick*="tab-map"]');
    await page.waitForTimeout(1500);

    // Verify weather pill
    const weatherPill = await page.$('.weather-pill');
    if (weatherPill) {
      const weatherText = await weatherPill.innerText();
      console.log('Weather Pill Found:', weatherText.trim().replace(/\n+/g, ' '));
      const box = await weatherPill.boundingBox();
      console.log(`Weather Pill BoundingBox: top=${box.y}, x=${box.x}, width=${box.width}, height=${box.height}`);
    } else {
      console.log('Weather Pill: not found');
    }

    // Verify location button
    const myLocBtn = await page.$('#huegoLocateBtn');
    if (myLocBtn) {
      console.log('Location Button: Found (#huegoLocateBtn)');
    } else {
      console.log('Location Button: not found');
    }

    console.log('Console Errors:', errors.length);
    console.log('Failed Requests:', failedUrls.length);
    await page.close();
  }

  // 3. Map Page
  {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    console.log('\n[3] Checking Map Page: https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/map.html');
    const res = await page.goto('https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/map.html', { waitUntil: 'networkidle' });
    console.log('HTTP Status:', res.status());
    const myLocBtn = await page.$('#huegoLocateBtn');
    console.log('Location Button on map.html:', myLocBtn ? 'Found (#huegoLocateBtn)' : 'Not found');
    await page.close();
  }

  await browser.close();
  console.log('\n--- VERIFICATION FINISHED SUCCESSFULLY ---');
}

testSite().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
