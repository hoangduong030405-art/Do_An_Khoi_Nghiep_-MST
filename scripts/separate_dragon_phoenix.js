const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage();
  
  await page.goto('file:///C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/.user_uploaded/media_1793126981776_dee0743f.jpg');
  await page.waitForTimeout(500);

  const images = await page.evaluate(() => {
    const img = document.querySelector('img');
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    // Canvas for Dragon
    const cDragon = document.createElement('canvas');
    cDragon.width = w;
    cDragon.height = h;
    const ctxD = cDragon.getContext('2d');
    ctxD.drawImage(img, 0, 0);
    const dData = ctxD.getImageData(0, 0, w, h);
    const dd = dData.data;

    // Canvas for Phoenix
    const cPhoenix = document.createElement('canvas');
    cPhoenix.width = w;
    cPhoenix.height = h;
    const ctxP = cPhoenix.getContext('2d');
    ctxP.drawImage(img, 0, 0);
    const pData = ctxP.getImageData(0, 0, w, h);
    const pd = pData.data;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = dd[i];
        const g = dd[i+1];
        const b = dd[i+2];

        const maxVal = Math.max(r, g, b);
        const minVal = Math.min(r, g, b);
        const diff = maxVal - minVal;

        const isParchment = (r > 175 && g > 165 && b > 130 && diff < 45 && r >= g && g >= b);
        const isWhitePaper = (r > 230 && g > 230 && b > 225);
        const isDistantMountain = (r > 125 && r < 185 && g > 135 && g < 195 && b > 125 && b < 185 && diff < 22);
        const isBackground = (isParchment || isWhitePaper || isDistantMountain);

        // Dragon features: Green jade, white horns, beige belly plates, green mane
        const isGreen = (g > r * 0.95 && g > b && g > 45 && (g - r > 4 || b - r > 8));
        const isDragonBeige = (x > 380 && r > 160 && g > 140 && b > 110 && diff < 55); // Belly
        const isDragonHead = (x > 400 && y < 280 && !isBackground);
        const isDragonClaw = (x > 600 && !isBackground);
        const isDragonBody = (x > 450 && !isBackground);

        // Phoenix features: Red/Orange feathers, golden breast, peacock tail
        const isRedOrange = (r > 110 && r > g * 1.15 && r > b * 1.3);
        const isGoldenFeather = (r > 170 && g > 110 && b < 85);
        const isPhoenixHeadOrWing = (x < 460 && (isRedOrange || isGoldenFeather));
        const isPeacockTail = (x < 520 && y > 350 && (isRedOrange || isGoldenFeather || (b > r && b > g))); // blue eyes in tail

        // Apply to Dragon
        if (isBackground || (isPhoenixHeadOrWing && !isGreen) || (isPeacockTail && !isGreen && x < 360)) {
          dd[i+3] = 0; // Hide
        }

        // Apply to Phoenix
        if (isBackground || (isDragonBody && !isRedOrange) || (isDragonHead && !isRedOrange)) {
          pd[i+3] = 0; // Hide
        }
      }
    }

    ctxD.putImageData(dData, 0, 0);
    ctxP.putImageData(pData, 0, 0);

    return {
      dragon: cDragon.toDataURL('image/png').split(',')[1],
      phoenix: cPhoenix.toDataURL('image/png').split(',')[1]
    };
  });

  fs.writeFileSync('web-hue4u/public/images/thanh_long_dragon.png', Buffer.from(images.dragon, 'base64'));
  fs.writeFileSync('backend/public/portal/images/thanh_long_dragon.png', Buffer.from(images.dragon, 'base64'));
  fs.writeFileSync('web-hue4u/public/images/hoa_phuong_phoenix.png', Buffer.from(images.phoenix, 'base64'));
  fs.writeFileSync('backend/public/portal/images/hoa_phuong_phoenix.png', Buffer.from(images.phoenix, 'base64'));
  console.log('Successfully saved both separated Dragon and Phoenix master assets!');
  await browser.close();
})();
