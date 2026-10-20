const https = require('https');

const urls = [
  'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/',
  'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/data/collections.json',
  'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/img/hero/di-san-trieu-nguyen.svg',
  'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/img/placeholders/placeholder-tour.svg',
  'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/js/image-helper.js',
  'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/app/',
  'https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/app/index.html'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => { if (data.length < 500) data += chunk; });
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          length: res.headers['content-length'],
          snippet: data.slice(0, 100).replace(/\r?\n/g, ' ')
        });
      });
    });
    req.on('error', (err) => resolve({ url, error: err.message }));
    req.setTimeout(8000, () => { req.abort(); resolve({ url, error: 'TIMEOUT' }); });
    req.end();
  });
}

(async () => {
  for (const u of urls) {
    const res = await checkUrl(u);
    if (res.error) {
      console.log(`❌ ${res.error} -> ${res.url}`);
    } else {
      console.log(`✅ ${res.status} [${res.contentType}] ${res.length ? res.length + 'B' : ''} -> ${res.url}`);
    }
  }
})();
