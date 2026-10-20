const https = require('https');

const queries = [
  'Ngo Mon',
  'Dai Noi Hue',
  'Bun bo Hue',
  'Truong Tien Bridge',
  'Perfume River Hue',
  'Thien Mu Pagoda',
  'Khai Dinh Tomb',
  'Tu Duc Tomb',
  'Minh Mang Tomb',
  'Dong Ba Market',
  'An Dinh Palace',
  'Thanh Toan Bridge'
];

function searchWikimedia(query) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=3&prop=imageinfo&iiprop=url|size&format=json`;
    const req = https.get(url, { headers: { 'User-Agent': 'HuegoTourism/1.0 (dev@huego.vn)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query ? Object.values(json.query.pages) : [];
          const results = pages.map(p => ({
            title: p.title,
            url: p.imageinfo && p.imageinfo[0] ? p.imageinfo[0].url : null,
            width: p.imageinfo && p.imageinfo[0] ? p.imageinfo[0].width : 0,
            height: p.imageinfo && p.imageinfo[0] ? p.imageinfo[0].height : 0
          })).filter(r => r.url && (r.url.endsWith('.jpg') || r.url.endsWith('.png') || r.url.endsWith('.jpeg')));
          resolve({ query, results });
        } catch (e) {
          resolve({ query, error: e.message });
        }
      });
    });
    req.on('error', err => resolve({ query, error: err.message }));
  });
}

(async () => {
  for (const q of queries) {
    const res = await searchWikimedia(q);
    console.log(`\n=== QUERY: ${q} ===`);
    if (res.results && res.results.length > 0) {
      res.results.forEach(r => console.log(`  - ${r.title} (${r.width}x${r.height}):\n    ${r.url}`));
    } else {
      console.log('  No image found or error:', res.error);
    }
  }
})();
