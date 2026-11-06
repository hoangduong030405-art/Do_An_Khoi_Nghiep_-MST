const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();
  
  await page.goto('file:///C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/.user_uploaded/media_1793126981776_dee0743f.jpg');
  await page.waitForTimeout(500);

  const pngBase64 = await page.evaluate(() => {
    const img = document.querySelector('img');
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i+1];
      const b = d[i+2];

      // Check if pixel belongs to background parchment or pale mist
      // Parchment is beige/cream: high luminance, warm hue (r > g > b), low saturation
      const maxVal = Math.max(r, g, b);
      const minVal = Math.min(r, g, b);
      const diff = maxVal - minVal;

      // Pale background mountains or paper
      const isParchment = (r > 175 && g > 165 && b > 130 && diff < 45 && r >= g && g >= b);
      const isWhitePaper = (r > 235 && g > 235 && b > 230);
      const isDistantMountain = (r > 130 && r < 185 && g > 140 && g < 195 && b > 130 && b < 185 && diff < 20);

      // Check if it is Dragon (Green) or Phoenix (Red/Orange/Gold)
      const isGreenDragon = (g > r * 0.95 && g > b && g > 40 && (g - r > 5 || b - r > 10));
      const isRedPhoenix = (r > 120 && r > g * 1.15 && r > b * 1.3);
      const isGoldenEyeOrBeak = (r > 170 && g > 120 && b < 80);

      if ((isParchment || isWhitePaper || isDistantMountain) && !isGreenDragon && !isRedPhoenix && !isGoldenEyeOrBeak) {
        // Soft alpha fade for edges
        d[i+3] = 0; // Transparent
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return c.toDataURL('image/png').split(',')[1];
  });

  const buffer = Buffer.from(pngBase64, 'base64');
  fs.writeFileSync('web-hue4u/public/images/long_phung_master_transparent.png', buffer);
  fs.writeFileSync('backend/public/portal/images/long_phung_master_transparent.png', buffer);
  console.log('Saved transparent master artwork! Size:', buffer.length);
  await browser.close();
})();
