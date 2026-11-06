const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();
  
  await page.goto('file:///C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/.user_uploaded/media_1793126981776_dee0743f.jpg');
  await page.waitForTimeout(500);

  const res = await page.evaluate(() => {
    const img = document.querySelector('img');
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    // Corner colors (background parchment)
    return {
      w, h,
      tl: [d[0], d[1], d[2]],
      tr: [d[(w-1)*4], d[(w-1)*4+1], d[(w-1)*4+2]],
      bl: [d[(h-1)*w*4], d[(h-1)*w*4+1], d[(h-1)*w*4+2]],
      br: [d[((h-1)*w + (w-1))*4], d[((h-1)*w + (w-1))*4+1], d[((h-1)*w + (w-1))*4+2]]
    };
  });

  console.log('Sampled Background corners:', res);
  await browser.close();
})();
