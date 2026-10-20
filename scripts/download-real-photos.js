const https = require('https');
const fs = require('fs');
const path = require('path');

const targets = [
  // 4 Hành trình gợi ý (Hero cards)
  {
    searchTerm: 'Ngo Mon Gate Hue',
    dest: 'web-hue4u/public/img/hero/di-san-trieu-nguyen.jpg',
    label: 'Di sản Triều Nguyễn (Ngọ Môn)'
  },
  {
    searchTerm: 'Bun bo Hue',
    dest: 'web-hue4u/public/img/hero/am-thuc-cung-dinh-dan-gian.jpg',
    label: 'Ẩm thực Cung đình & Dân gian (Bún Bò Huế)'
  },
  {
    searchTerm: 'Truong Tien Bridge Hue night',
    dest: 'web-hue4u/public/img/hero/ca-phe-song-huong.jpg',
    label: 'Cà phê Bên Bờ Sông Hương (Cầu Trường Tiền)'
  },
  {
    searchTerm: 'Thien Mu Pagoda Hue',
    dest: 'web-hue4u/public/img/hero/chua-co-xu-hue.jpg',
    label: 'Chốn Thiền Môn & Chùa Cổ (Chùa Thiên Mụ)'
  },

  // Địa danh di sản Cố Đô (POIs)
  {
    searchTerm: 'Imperial City Hue',
    dest: 'web-hue4u/public/images/pois/dai-noi-hue.jpg',
    label: 'Đại Nội Huế'
  },
  {
    searchTerm: 'Thai Hoa Palace Hue',
    dest: 'web-hue4u/public/images/pois/dien-thai-hoa.jpg',
    label: 'Điện Thái Hòa'
  },
  {
    searchTerm: 'Meridian Gate Hue',
    dest: 'web-hue4u/public/images/pois/ngo-mon.jpg',
    label: 'Ngọ Môn'
  },
  {
    searchTerm: 'Nine Dynastic Urns Hue',
    dest: 'web-hue4u/public/images/pois/cuu-dinh.jpg',
    label: 'Cửu Đỉnh'
  },
  {
    searchTerm: 'Thien Mu Pagoda',
    dest: 'web-hue4u/public/images/pois/chua-thien-mu.jpg',
    label: 'Chùa Thiên Mụ'
  },
  {
    searchTerm: 'Tu Duc Tomb Hue',
    dest: 'web-hue4u/public/images/pois/lang-tu-duc.jpg',
    label: 'Lăng Tự Đức'
  },
  {
    searchTerm: 'Khai Dinh Tomb Hue',
    dest: 'web-hue4u/public/images/pois/lang-khai-dinh.jpg',
    label: 'Lăng Khải Định'
  },
  {
    searchTerm: 'Minh Mang Tomb Hue',
    dest: 'web-hue4u/public/images/pois/lang-minh-mang.jpg',
    label: 'Lăng Minh Mạng'
  },
  {
    searchTerm: 'Truong Tien Bridge Hue',
    dest: 'web-hue4u/public/images/pois/cau-trang-tien.jpg',
    label: 'Cầu Trường Tiền'
  },
  {
    searchTerm: 'Dong Ba Market Hue',
    dest: 'web-hue4u/public/images/pois/cho-dong-ba.jpg',
    label: 'Chợ Đông Ba'
  },
  {
    searchTerm: 'An Dinh Palace Hue',
    dest: 'web-hue4u/public/images/pois/cung-an-dinh.jpg',
    label: 'Cung An Định'
  },
  {
    searchTerm: 'Thanh Toan Bridge Hue',
    dest: 'web-hue4u/public/images/pois/cau-ngoi-thanh-toan.jpg',
    label: 'Cầu Ngói Thanh Toàn'
  },
  {
    searchTerm: 'Perfume River Hue',
    dest: 'web-hue4u/public/images/pois/song-huong.jpg',
    label: 'Sông Hương'
  },
  {
    searchTerm: 'Tam Giang Lagoon Hue',
    dest: 'web-hue4u/public/images/pois/pha-tam-giang.jpg',
    label: 'Phá Tam Giang'
  },
  {
    searchTerm: 'Hon Chen Temple Hue',
    dest: 'web-hue4u/public/images/pois/dien-hon-chen.jpg',
    label: 'Điện Hòn Chén'
  },
  {
    searchTerm: 'Tinh Tam Lake Hue',
    dest: 'web-hue4u/public/images/pois/ho-tinh-tam.jpg',
    label: 'Hồ Tịnh Tâm'
  }
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'HuegoTourismApp/1.0 (dev@huego.vn)' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(destPath);
    const req = https.get(url, { headers: { 'User-Agent': 'HuegoTourismApp/1.0 (dev@huego.vn)' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    });
    req.on('error', err => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function getPhotoUrl(searchTerm) {
  const searchApi = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&srnamespace=6&format=json`;
  const searchRes = await fetchJson(searchApi);
  const items = searchRes.query && searchRes.query.search ? searchRes.query.search : [];
  if (items.length === 0) return null;

  // Lấy các file có đuôi jpg/jpeg/png
  const candidate = items.find(it => /\.(jpe?g|png|webp)$/i.test(it.title)) || items[0];
  if (!candidate) return null;

  const infoApi = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(candidate.title)}&prop=imageinfo&iiprop=url&format=json`;
  const infoRes = await fetchJson(infoApi);
  const pages = infoRes.query ? Object.values(infoRes.query.pages) : [];
  if (pages.length > 0 && pages[0].imageinfo && pages[0].imageinfo.length > 0) {
    return pages[0].imageinfo[0].url.split('?')[0];
  }
  return null;
}

(async () => {
  console.log(`Starting real photo acquisition for ${targets.length} targets...\n`);
  for (const item of targets) {
    try {
      console.log(`Searching for: ${item.label} ("${item.searchTerm}")...`);
      const imgUrl = await getPhotoUrl(item.searchTerm);
      if (!imgUrl) {
        console.log(`  ❌ Not found on Wikimedia: ${item.label}`);
        continue;
      }
      console.log(`  -> Downloading: ${imgUrl}`);
      await downloadFile(imgUrl, item.dest);
      const stat = fs.statSync(item.dest);
      console.log(`  ✅ SAVED: ${item.dest} (${Math.round(stat.size / 1024)} KB)`);
    } catch (err) {
      console.error(`  ❌ Error for ${item.label}:`, err.message);
    }
  }
  console.log('\nAll downloads finished!');
})();
