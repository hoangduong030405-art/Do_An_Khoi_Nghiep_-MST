const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
  
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'networkidle' });
  
  // Click pagination page 2 or next
  const paginationLinks = await page.$$('.pagination-btn, .page-btn, .pagination a, button');
  for (const btn of paginationLinks) {
    const txt = await btn.innerText();
    if (txt.trim() === '2') {
      await btn.click();
      await page.waitForTimeout(1000);
      break;
    }
  }

  await page.evaluate(() => {
    const el = document.getElementById('places-grid');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  
  await page.screenshot({ path: 'scratch/verified_pagodas_page2.png' });
  await browser.close();
  console.log('Saved pagodas screenshot!');
})();
