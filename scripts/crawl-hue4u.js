const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  const jsonResponses = [];
  page.on('response', async res => {
    const u = res.url();
    const ct = res.headers()['content-type'] || '';
    if (ct.includes('application/json') || u.includes('/api/')) {
      try {
        const text = await res.text();
        jsonResponses.push({ url: u, data: text.slice(0, 500) });
        if (text.includes('places') || text.includes('coverPhotoUrl') || text.includes('name')) {
          fs.writeFileSync('scratch/hue4u_api_sample.json', text);
          console.log('Saved JSON response from:', u);
        }
      } catch (e) {}
    }
  });

  console.log('Navigating to https://hue4u.com/explore?cat=imperial ...');
  await page.goto('https://hue4u.com/explore?cat=imperial', { waitUntil: 'networkidle' });

  // Extract all cards / links / images
  const cards = await page.$$eval('article, .card, [class*="card"], [class*="Place"], [class*="item"]', els => els.map(e => {
    const img = e.querySelector('img');
    const h = e.querySelector('h1, h2, h3, h4, [class*="title"], [class*="name"]');
    return {
      title: h ? h.innerText.trim() : '',
      imgSrc: img ? (img.getAttribute('src') || img.currentSrc) : '',
      html: e.className
    };
  }).filter(c => c.title && c.imgSrc));

  console.log('Cards found:', cards.length);
  console.log(JSON.stringify(cards.slice(0, 10), null, 2));

  // Check script tags with __NEXT_DATA__
  const nextData = await page.evaluate(() => {
    const el = document.getElementById('__NEXT_DATA__');
    if (el) {
      try { return JSON.parse(el.innerText); } catch(e){}
    }
    return null;
  });

  if (nextData) {
    console.log('Found __NEXT_DATA__! Writing to scratch/hue4u_next_data.json');
    fs.writeFileSync('scratch/hue4u_next_data.json', JSON.stringify(nextData, null, 2));
  } else {
    console.log('No __NEXT_DATA__ tag found (Next 13/14 App Router likely)');
  }

  // Also extract all images on the page
  const allImgs = await page.$$eval('img', els => els.map(i => ({
    src: i.getAttribute('src') || i.currentSrc,
    alt: i.getAttribute('alt')
  })));
  console.log('Total images on page:', allImgs.length);
  console.log(JSON.stringify(allImgs.slice(0, 15), null, 2));

  await browser.close();
})();

