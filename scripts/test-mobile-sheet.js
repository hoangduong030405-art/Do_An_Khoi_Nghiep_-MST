const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const appPage = await browser.newPage({ viewport: { width: 412, height: 915 } });
  
  await appPage.goto('http://localhost:3000/app/index.html', { waitUntil: 'networkidle' });
  await appPage.waitForTimeout(1000);
  
  // Test search for "Chợ Bến Ngự" in mobile search input
  const searchInput = await appPage.$('#searchInput, #mapSearchInput, input[type="search"], input[placeholder*="Tìm"]');
  if (searchInput) {
    await searchInput.fill('Chợ Bến Ngự');
    await appPage.waitForTimeout(500);
  }

  // Evaluate placeSheet image if place opened
  const testOpen = await appPage.evaluate(async () => {
    // Call openPlaceDetails if available
    const testP = {
      id: 'heritage-cho-ben-ngu',
      name: 'Chợ Bến Ngự',
      name_vi: 'Chợ Bến Ngự',
      coverPhotoUrl: '/images/pois/cho-ben-ngu-market.webp'
    };
    if (typeof window.openPlaceDetails === 'function') {
      window.openPlaceDetails(testP);
    }
    const imgEl = document.getElementById('sheetCover') || document.querySelector('#placeSheet img');
    return {
      resolvedImg: window.resolvePlaceImage(testP),
      sheetImgSrc: imgEl ? imgEl.src : null
    };
  });

  console.log('Test Open Place Details (Chợ Bến Ngự):', testOpen);

  // Take screenshot of opened sheet
  await appPage.screenshot({ path: 'scratch/mobile_ben_ngu_sheet.png' });
  
  await browser.close();
  console.log('Mobile sheet test completed!');
})();
