const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle' });
  
  // Get first 16 cards in places-grid
  const cards = await page.$$eval('#places-grid .place-card', els => els.slice(0, 16).map(e => ({
    name: e.querySelector('h3, .place-name')?.innerText,
    imgSrc: e.querySelector('img')?.src
  })));
  
  console.log('Web Portal Cards Sample:');
  cards.forEach(c => console.log(' -', c.name, '=>', c.imgSrc));
  
  // Also check mobile app
  const appPage = await browser.newPage({ viewport: { width: 412, height: 915 } });
  await appPage.goto('http://localhost:3000/app/index.html', { waitUntil: 'networkidle' });
  
  const appResults = await appPage.evaluate(() => {
    const list = window.allPlaces || [];
    const bn = list.find(p => p.id === 'heritage-cho-ben-ngu' || (p.name && p.name.includes('Bến Ngự')));
    const hcm = list.find(p => p.id === 'heritage-bao-tang-ho-chi-minh-hue' || (p.name && p.name.includes('Hồ Chí Minh')));
    const boat = list.find(p => p.name && p.name.includes('Hue Royal Boat'));
    const nhaCo = list.find(p => p.name && p.name.includes('Vĩnh Thành'));
    const chuaDiDong = list.find(p => p.name && p.name.includes('Di Đông'));
    return {
      bnImg: bn ? (window.resolvePlaceImage ? window.resolvePlaceImage(bn) : bn.coverPhotoUrl) : null,
      hcmImg: hcm ? (window.resolvePlaceImage ? window.resolvePlaceImage(hcm) : hcm.coverPhotoUrl) : null,
      boatImg: boat ? (window.resolvePlaceImage ? window.resolvePlaceImage(boat) : boat.coverPhotoUrl) : null,
      nhaCoImg: nhaCo ? (window.resolvePlaceImage ? window.resolvePlaceImage(nhaCo) : nhaCo.coverPhotoUrl) : null,
      chuaDiDongImg: chuaDiDong ? (window.resolvePlaceImage ? window.resolvePlaceImage(chuaDiDong) : chuaDiDong.coverPhotoUrl) : null
    };
  });
  
  console.log('\nMobile App Evaluated Images:');
  console.log(' - Chợ Bến Ngự:', appResults.bnImg);
  console.log(' - Bảo tàng Hồ Chí Minh:', appResults.hcmImg);
  console.log(' - Hue Royal Boat:', appResults.boatImg);
  console.log(' - Nhà Cổ Vĩnh Thành:', appResults.nhaCoImg);
  console.log(' - Chùa Di Đông:', appResults.chuaDiDongImg);

  // Take screenshot for visual verification
  await page.screenshot({ path: 'scratch/verified_web_portal.png' });
  await appPage.screenshot({ path: 'scratch/verified_mobile_app.png' });
  
  await browser.close();
  console.log('\nVerification completed successfully!');
})();

