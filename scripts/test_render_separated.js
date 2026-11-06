const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1200, height: 700 } });
  const html = `
    <html>
    <body style="margin:0; background: linear-gradient(135deg, #1a091e, #2d121e); display:flex; align-items:center; justify-content:space-around; height:100vh;">
      <div style="text-align:center;">
        <h3 style="color:#FFF0B8; font-family:sans-serif; margin-bottom:10px;">HỎA PHƯỢNG (PHOENIX)</h3>
        <img src="file:///C:/Lap_Trinh_Ung_dung/web-hue4u/public/images/hoa_phuong_phoenix.png" style="max-height:500px; filter: drop-shadow(0 0 25px rgba(255,100,0,0.7));">
      </div>
      <div style="text-align:center;">
        <h3 style="color:#FFF0B8; font-family:sans-serif; margin-bottom:10px;">THANH LONG (JADE DRAGON)</h3>
        <img src="file:///C:/Lap_Trinh_Ung_dung/web-hue4u/public/images/thanh_long_dragon.png" style="max-height:500px; filter: drop-shadow(0 0 25px rgba(42,157,143,0.7));">
      </div>
    </body>
    </html>
  `;
  await page.setContent(html);
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/PREDATOR/.gemini/antigravity/brain/63418a43-da08-4ce7-b590-1f315a18fa7d/screenshot_separated_test.png' });
  console.log('Saved separated test screenshot!');
  await browser.close();
})();
