const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 800, height: 800 } });
  const html = `
    <html>
    <body style="margin:0; background: #1a091e; display:flex; align-items:center; justify-content:center; height:100vh;">
      <img src="file:///C:/Lap_Trinh_Ung_dung/web-hue4u/public/images/long_phung_master_transparent.png" style="max-width:90%; filter: drop-shadow(0 0 30px rgba(229,193,88,0.6));">
    </body>
    </html>
  `;
  await page.setContent(html);
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_extracted_long_phung.png' });
  console.log('Saved test rendering of extracted master artwork!');
  await browser.close();
})();
