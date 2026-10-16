/**
 * Hue4U - Backend Server & API
 * Phục vụ website du lịch Huế với toàn bộ 4.352 địa điểm, bản đồ số, cẩm nang và bảo tàng 3D.
 * Chạy độc lập bằng Node.js thuần (Zero-dependency) hoặc Express.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

// Cổng mặc định 3100: NestJS là server chính duy nhất trên cổng 3000.
// server.js chỉ dùng khi cần chạy giao diện tĩnh độc lập mà không cần database.
const PORT = process.env.PORT || 3100;
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(__dirname, 'public');

// Tải dữ liệu vào bộ nhớ để truy vấn cực nhanh (In-Memory indexing)
let placesAll = [];
let placesByVertical = {};
let collections = [];
let museumArtifacts = [];
let travelGuides = {};
let essentials = {};
let heritageSites = [];

try {
  placesAll = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'places_all.json'), 'utf8'));
  placesByVertical = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'places_by_vertical.json'), 'utf8'));
  collections = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'collections.json'), 'utf8'));
  museumArtifacts = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'museum_artifacts.json'), 'utf8'));
  travelGuides = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'travel_guides.json'), 'utf8'));
  essentials = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'essentials.json'), 'utf8'));
  heritageSites = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'heritage_30_sites.json'), 'utf8'));
  console.log(`[Data Loaded] ${placesAll.length} địa điểm, ${museumArtifacts.length} bảo vật 3D, ${collections.length} bộ sưu tập.`);
} catch (err) {
  console.error('[Data Load Error]', err.message);
}

// Bảng ánh xạ MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.wasm': 'application/wasm'
};

// Tính khoảng cách Haversine (km) giữa 2 toạ độ
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Bán kính Trái Đất (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Chuẩn hóa tiếng Việt tìm kiếm không dấu
function removeVietnameseTones(str) {
  if (!str) return '';
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase();
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // --- REST API ROUTES ---
  if (pathname.startsWith('/api/')) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // GET /api/v1/weather/hue-current
    if (pathname === '/api/v1/weather/hue-current' || pathname === '/api/weather') {
      res.writeHead(200);
      res.end(JSON.stringify({
        tempCelsius: 27,
        condition: 'Clouds',
        description: 'Trời thu Cố Đô dịu mát, thoáng đãng, rất thích hợp tham quan Đại Nội và ngắm sông Hương',
        isRaining: false,
        humidity: 75,
        windSpeedKm: 12
      }));
      return;
    }

    // POST /api/v1/ai-guide/chat
    if ((pathname === '/api/v1/ai-guide/chat' || pathname === '/api/chat') && req.method === 'POST') {
      let bodyData = '';
      req.on('data', chunk => { bodyData += chunk; });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(bodyData || '{}');
          const q = (parsed.question || '').toLowerCase();
          let answer = '';

          if (q.includes('ăn vặt') || q.includes('hoàng thành') || q.includes('đại nội') || q.includes('bánh ép') || q.includes('chè')) {
            answer = 'Dạ Mệ chào người nhen! Quanh khu vực Hoàng Thành (Đại Nội) là cả một thiên đường ăn vặt nổi tiếng của Cố Đô:\\n\\n1. **Bánh ép dẻo Nhật Lệ**: Ghé quán Bánh ép Cây Dừa (73 Nhật Lệ) hoặc quán Cây Điệp, bánh ép nóng hổi cuộn rau răm chấm mắm ớt tỏi chua ngọt siêu dính!\\n2. **Chè bột lọc bọc heo quay**: Quán Mợ Tôn Đích (20 Đinh Tiên Hoàng ngay cửa Thượng Tứ) — viên chè dai giòn bọc thịt heo quay mằn mặn ngọt bùi độc nhất vô nhị.\\n3. **Bánh tráng nướng bờ hồ Lê Huân**: Ngồi mát rượi ngắm hồ sen và tường thành rêu phong.\\n4. **Khay bánh bèo - nậm - lọc**: Ghé đường Đinh Tiên Hoàng hoặc kiệt 104 Kim Long dĩa bánh tôm cháy thơm phức nhen!';
          } else if (q.includes('cà phê') || q.includes('cà phê muối') || q.includes('uống')) {
            answer = 'Dạ, người muốn uống cà phê muối chuẩn vị thì ghé ngay số 10 Nguyễn Lương Định hoặc số 142 Đặng Thái Thân (sát vách Thành Nội) nghe! Lớp bọt kem mặn béo ngậy quyện cà phê đậm đà thơm ngát!';
          } else if (q.includes('lăng') || q.includes('chiều') || q.includes('tham quan')) {
            answer = 'Dạ nếu có 1 buổi chiều, Mệ khuyên người nên ghé **Lăng Tự Đức (Khiêm Lăng)** trước tiên! Nơi đây mang đúng hồn cốt trầm mặc, thi ca của xứ Huế với hồ sen Lưu Khiêm và rừng thông reo vi vu. Trên đường về, người tiện ghé check-in làng hương Thủy Xuân và ngắm hoàng hôn buông xuống trên Đồi Vọng Cảnh nhen!';
          } else if (q.includes('tràng tiền') || q.includes('sông hương')) {
            answer = 'Cầu Tràng Tiền 6 vài 12 nhịp bắc qua dòng Hương Giang thơ mộng. Tầm 17h chiều người dạo bước trên cầu ngắm hoàng hôn, rồi ghé phố đi bộ Nguyễn Đình Chiểu ăn bánh mì bột lọc Tràng Tiền thì tuyệt vời không chi bằng!';
          } else {
            answer = 'Dạ Mệ nghe người hỏi rồi nhen! Cố Đô Huế mỗi tấc đất một câu chuyện lịch sử, người muốn Mệ chỉ đường đi đâu, tìm quán ngon hay nghe giai thoại lăng tẩm cứ nhắn Mệ nghe!';
          }

          res.writeHead(200);
          res.end(JSON.stringify({
            answer,
            source: 'huego-gemini',
            timestamp: new Date().toISOString()
          }));
        } catch (e) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Dữ liệu không hợp lệ' }));
        }
      });
      return;
    }

    // GET /api/heritage-sites
    if (pathname === '/api/heritage-sites') {
      res.writeHead(200);
      res.end(JSON.stringify(heritageSites));
      return;
    }

    // GET /api/map-points (Tối ưu tải nhanh 4.352 điểm cho bản đồ và cluster)
    if (pathname === '/api/map-points') {
      const v = query.vertical || 'all';
      let pts = placesAll.filter(p => p.lat && p.lng);
      if (v !== 'all' && v !== 'heritage') {
        pts = pts.filter(p => p.vertical === v);
      }
      const compact = pts.map(p => ({
        id: p.id,
        name: p.name_vi || p.name,
        lat: p.lat,
        lng: p.lng,
        v: p.vertical,
        cat: Array.isArray(p.subcategory) ? p.subcategory[0] : (p.category || p.vertical),
        r: p.googleRating,
        img: p.coverPhotoUrl
      }));
      res.writeHead(200);
      res.end(JSON.stringify(compact));
      return;
    }

    // 1. GET /api/stats
    if (pathname === '/api/stats') {
      const stats = {
        totalPlaces: placesAll.length,
        categories: {
          tour: placesByVertical.tour ? placesByVertical.tour.length : 0,
          fnb: placesByVertical.fnb ? placesByVertical.fnb.length : 0,
          cafe: placesByVertical.cafe ? placesByVertical.cafe.length : 0,
          stay: placesByVertical.stay ? placesByVertical.stay.length : 0,
          specialty: placesByVertical.specialty ? placesByVertical.specialty.length : 0,
          service: placesByVertical.service ? placesByVertical.service.length : 0
        },
        museumArtifacts: museumArtifacts.length,
        collections: collections.length
      };
      res.writeHead(200);
      res.end(JSON.stringify(stats));
      return;
    }

    // 2. GET /api/places (Lọc, tìm kiếm, phân trang)
    if (pathname === '/api/places') {
      const vertical = query.vertical || 'all';
      const q = (query.q || '').trim();
      const page = parseInt(query.page, 10) || 1;
      const limit = Math.min(parseInt(query.limit, 10) || 20, 100);
      const sortBy = query.sortBy || 'rating'; // rating, reviews, name

      let items = vertical !== 'all' && placesByVertical[vertical] 
        ? placesByVertical[vertical] 
        : placesAll;

      // Tìm kiếm từ khóa (theo tên tiếng Việt, tiếng Anh, địa chỉ, phân loại)
      if (q) {
        const cleanQ = removeVietnameseTones(q);
        items = items.filter(p => {
          const nameNorm = removeVietnameseTones(p.name || p.name_vi || '');
          const addrNorm = removeVietnameseTones(p.address || p.address_vi || '');
          const subNorm = Array.isArray(p.subcategory) ? removeVietnameseTones(p.subcategory.join(' ')) : '';
          return nameNorm.includes(cleanQ) || addrNorm.includes(cleanQ) || subNorm.includes(cleanQ);
        });
      }

      // Sắp xếp
      if (sortBy === 'rating') {
        items = [...items].sort((a, b) => (b.googleRating || 0) - (a.googleRating || 0));
      } else if (sortBy === 'reviews') {
        items = [...items].sort((a, b) => (b.googleReviewCount || 0) - (a.googleReviewCount || 0));
      } else if (sortBy === 'name') {
        items = [...items].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      }

      const total = items.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const pagedItems = items.slice(startIndex, startIndex + limit);

      const response = {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        items: pagedItems
      };

      res.writeHead(200);
      res.end(JSON.stringify(response));
      return;
    }

    // 3. GET /api/places/:id
    if (pathname.startsWith('/api/places/')) {
      const id = pathname.replace('/api/places/', '');
      const place = placesAll.find(p => p.id === id);
      if (place) {
        res.writeHead(200);
        res.end(JSON.stringify(place));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Không tìm thấy địa điểm', id }));
      }
      return;
    }

    // 4. GET /api/collections
    if (pathname === '/api/collections') {
      res.writeHead(200);
      res.end(JSON.stringify(collections));
      return;
    }

    // 5. GET /api/museum
    if (pathname === '/api/museum') {
      res.writeHead(200);
      res.end(JSON.stringify(museumArtifacts));
      return;
    }

    // 6. GET /api/guides
    if (pathname === '/api/guides') {
      res.writeHead(200);
      res.end(JSON.stringify(travelGuides));
      return;
    }

    // 7. GET /api/essentials
    if (pathname === '/api/essentials') {
      res.writeHead(200);
      res.end(JSON.stringify(essentials));
      return;
    }

    // 8. GET /api/nearby (Tìm quanh vị trí GPS)
    if (pathname === '/api/nearby') {
      const userLat = parseFloat(query.lat) || 16.4637; // Tọa độ mặc định trung tâm Huế
      const userLng = parseFloat(query.lng) || 107.5908;
      const radiusKm = parseFloat(query.radius) || 5;
      const limit = parseInt(query.limit, 10) || 30;

      const nearbyPlaces = placesAll
        .filter(p => p.lat && p.lng)
        .map(p => ({
          ...p,
          distanceKm: parseFloat(getDistanceKm(userLat, userLng, p.lat, p.lng).toFixed(2))
        }))
        .filter(p => p.distanceKm <= radiusKm)
        .sort((a, b) => a.distanceKm - b.distanceKm)
        .slice(0, limit);

      res.writeHead(200);
      res.end(JSON.stringify({
        center: { lat: userLat, lng: userLng },
        radiusKm,
        totalFound: nearbyPlaces.length,
        items: nearbyPlaces
      }));
      return;
    }

    // 404 cho API không xác định
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
    return;
  }

  // --- STATIC FILE SERVING ---
  let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
  
  // Hỗ trợ thư mục (phục vụ index.html bên trong thư mục)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!path.extname(filePath)) {
    // Hỗ trợ clean URLs như /explore -> /index.html, /map -> /map.html, v.v.
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else if (pathname === '/explore') {
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 fallback
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found - Hue4U</h1><p><a href="/">Quay về trang chủ</a></p>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

function startServer(port) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Cổng ${port} đang bận, thử cổng ${port + 1}...`);
      server.close();
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });

  server.listen(port, () => {
    console.log(`======================================================`);
    console.log(`✨ HUE4U WEB APP ĐANG CHẠY THÀNH CÔNG!`);
    console.log(`🌐 Local URL: http://localhost:${port}`);
    console.log(`📂 Thư mục dự án: ${__dirname}`);
    console.log(`🏛️  Số địa điểm đã cào: ${placesAll.length}`);
    console.log(`🎨 Bảo vật 3D hoàng cung: ${museumArtifacts.length}`);
    console.log(`======================================================`);
  });
}

startServer(PORT || 3001);
