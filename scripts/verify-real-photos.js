const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('Testing portal homepage with real photos...');
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });

  const failedImages = [];
  page.on('response', res => {
    if (res.request().resourceType() === 'image' && res.status() >= 400) {
      failedImages.push({ url: res.url(), status: res.status() });
    }
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // 1. Check the 4 suggested journey cards
  const collections = await page.$$eval('#collections-grid .collection-card', els => els.map(e => ({
    title: e.querySelector('.collection-name')?.innerText,
    imgSrc: e.querySelector('.collection-img')?.getAttribute('src'),
    currentSrc: e.querySelector('.collection-img')?.currentSrc,
    naturalWidth: e.querySelector('.collection-img')?.naturalWidth,
    naturalHeight: e.querySelector('.collection-img')?.naturalHeight
  })));

  console.log('\n--- 4 HÀNH TRÌNH GỢI Ý ---');
  collections.forEach((c, idx) => {
    const isRealPhoto = c.currentSrc && (c.currentSrc.endsWith('.jpg') || c.currentSrc.endsWith('.png') || c.currentSrc.endsWith('.webp')) && !c.currentSrc.startsWith('data:image/svg');
    const isLoaded = c.naturalWidth > 0 && c.naturalHeight > 0;
    console.log(`[Card ${idx + 1}] ${c.title}:`);
    console.log(`  - Source: ${c.imgSrc}`);
    console.log(`  - URL: ${c.currentSrc}`);
    console.log(`  - Kích thước ảnh thật: ${c.naturalWidth}x${c.naturalHeight}px`);
    console.log(`  - Ảnh chụp thực tế: ${isRealPhoto ? '✅ ĐẠT' : '❌ CHƯA ĐẠT'}`);
    console.log(`  - Nạp thành công: ${isLoaded ? '✅ ĐẠT' : '❌ LỖI NẠP'}`);
  });

  // 2. Check places grid top cards
  const placeCards = await page.$$eval('#places-grid .place-card', els => els.slice(0, 8).map(e => ({
    name: e.querySelector('.place-name')?.innerText,
    imgSrc: e.querySelector('.place-card-img')?.getAttribute('src'),
    currentSrc: e.querySelector('.place-card-img')?.currentSrc,
    naturalWidth: e.querySelector('.place-card-img')?.naturalWidth,
    isSvg: (e.querySelector('.place-card-img')?.currentSrc || '').startsWith('data:image/svg')
  })));

  console.log('\n--- ĐỊA DANH HUẾ (8 thẻ đầu) ---');
  placeCards.forEach(p => {
    console.log(`  - ${p.name}: ${p.isSvg ? 'SVG Fallback' : 'Ảnh thật (' + p.naturalWidth + 'px)'} -> ${(p.currentSrc || '').slice(0, 60)}...`);
  });

  console.log('\nFailed image requests count:', failedImages.length);
  if (failedImages.length > 0) {
    console.log('Failed images sample:', failedImages.slice(0, 5));
  }

  // 3. Take screenshot
  await page.screenshot({ path: 'scratch/portal_with_real_photos.png', fullPage: false });
  console.log('\nSaved screenshot to scratch/portal_with_real_photos.png');

  await browser.close();
})();
