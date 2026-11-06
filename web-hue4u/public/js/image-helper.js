/**
 * HUEGO - Image & Shared Config Helper
 * Cung cấp thành phần xử lý ảnh thông minh, chống ô xám, tự tạo SVG dự phòng theo thương hiệu Cố Đô.
 */

(function(window) {
  'use strict';

  // 1. Cấu hình dùng chung mặc định
  window.HUEGO_CONFIG = {
    version: '1.0.0',
    appName: 'HUEGO - Du Lịch Khám Phá Cố Đô Huế',
    publicBaseUrl: window.location.origin || '',
    appUrl: (function() { try { return new URL('app/', window.location.href).href; } catch(e) { return './app/'; } })(),
    apiBase: '/api/v1',
    features: {
      demoMode: true,
      weatherEnabled: false,
      aiEnabled: true
    },
    thresholds: {
      dailyPointsCap: 500,
      geofenceRadiusMeters: 35
    }
  };

  // Tự đồng bộ cấu hình từ Backend API
  window.syncPublicConfig = async function() {
    try {
      const res = await fetch('/api/v1/config/public', { cache: 'no-cache' });
      if (res.ok) {
        const remoteConfig = await res.json();
        window.HUEGO_CONFIG = Object.assign({}, window.HUEGO_CONFIG, remoteConfig);
      }
    } catch (e) {
      // Dùng fallback an toàn tương đối khi offline hoặc chạy tĩnh
    }
  };

  // 2. Danh mục & Biểu tượng Cố Đô
  const CATEGORY_META = {
    tour: { name: 'Di tích & Thắng cảnh', icon: '🏛️', bg: '#582C83', accent: '#D4AF37' },
    fnb: { name: 'Ẩm thực Cố Đô', icon: '🍜', bg: '#7C2D12', accent: '#F59E0B' },
    cafe: { name: 'Cà phê & Trà Quán', icon: '☕', bg: '#451A03', accent: '#FBBF24' },
    stay: { name: 'Khách sạn & Homestay', icon: '🏨', bg: '#1E3A8A', accent: '#60A5FA' },
    specialty: { name: 'Đặc sản Quà Huế', icon: '🎁', bg: '#831843', accent: '#F472B6' },
    service: { name: 'Dịch vụ Tiện ích', icon: '🚗', bg: '#065F46', accent: '#34D399' }
  };

  // 2b. Kho ảnh chụp thực tế Cố Đô Huế theo danh mục (chất lượng cao, đường dẫn gốc tuyệt đối)
  const CATEGORY_REAL_PHOTOS = {
    tour: '/images/pois/dai-noi-hue.webp',
    fnb: '/images/pois/bun-bo-hue.webp',
    cafe: '/images/pois/ca-phe-muoi-hue.webp',
    stay: '/images/pois/homestay-hue.webp',
    specialty: '/images/pois/me-xung-hue.webp',
    service: '/images/pois/dich-vu-tien-ich-hue.webp',
    nature: '/images/pois/doi-vong-canh.webp'
  };

  // Chuẩn hoá URL tài nguyên (tương thích cả localhost:3000 và GitHub Pages /<repo-name>/)
  function normalizeAssetUrl(url) {
    if (!url || typeof url !== 'string') return url;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    
    // Nếu chạy trên GitHub Pages có tên repository
    let pathname = (typeof window !== 'undefined' && window.location && window.location.pathname) ? window.location.pathname : '';
    let repoPrefix = '';
    const match = pathname.match(/^(\/[^\/]+)\/(?:app\/|css\/|js\/|data\/|index\.html|map\.html|museum\.html|simulator\.html)?/);
    if (match && match[1] && match[1] !== '/app' && match[1] !== '/api' && match[1] !== '/portal' && !match[1].startsWith('/@')) {
      repoPrefix = match[1];
    }

    let clean = url;
    if (clean.startsWith('./')) clean = clean.slice(1);
    if (!clean.startsWith('/')) clean = '/' + clean;

    return repoPrefix ? (repoPrefix + clean) : clean;
  }
  window.normalizeAssetUrl = normalizeAssetUrl;

  // Lấy ảnh chụp thực tế theo danh mục và tên địa danh chính xác cao
  function getRealPhoto(vertical, name) {
    const n = (name || '').toLowerCase();

    // 1. Thuyền rồng / Ca Huế / Bến thuyền / Bao Vinh
    if (n.includes('thuyền rồng') || n.includes('ca huế') || n.includes('thuyen rong') || n.includes('du thuyền') || n.includes('bến thuyền') || n.includes('bao vinh') || n.includes('boat')) {
      return normalizeAssetUrl('/images/pois/thuyen-rong-song-huong.webp');
    }
    // 2. Cổ phục / Áo dài / Cho thuê trang phục
    if (n.includes('cổ phục') || n.includes('áo dài') || n.includes('ao dai') || n.includes('co phuc') || n.includes('nhat binh') || n.includes('nhật bình') || n.includes('trang phục')) {
      return normalizeAssetUrl('/images/pois/co-phuc-hue.webp');
    }
    // 3. Tranh mộc bản / Vẽ tranh / Mỹ thuật / Tranh tường
    if (n.includes('mộc bản') || n.includes('moc ban') || n.includes('tranh tường') || n.includes('tranh tuong') || n.includes('vẽ tranh') || n.includes('hội họa') || n.includes('tranh thêu')) {
      return normalizeAssetUrl('/images/pois/tranh-moc-ban-hue.webp');
    }
    // 4. Nhà cổ / Nhà rường / Vườn nhà cổ / Tôn nữ viên
    if (n.includes('nhà cổ') || n.includes('nhà rường') || n.includes('nha co') || n.includes('nha ruong') || n.includes('tôn nữ viên')) {
      return normalizeAssetUrl('/images/pois/nha-ruong-hue.webp');
    }
    // 5. Thanh trà Thủy Biều / Vườn cây
    if (n.includes('thanh trà') || n.includes('thủy biều') || n.includes('thuy bieu')) {
      return normalizeAssetUrl('/images/pois/thanh-tra-thuy-bieu.webp');
    }
    // 6. Cây cổ thụ / Cây bàng
    if (n.includes('cây bàng') || n.includes('cổ thụ') || n.includes('cây đa') || n.includes('cay bang') || n.includes('co thu')) {
      return normalizeAssetUrl('/images/pois/cay-co-thu-hue.webp');
    }
    // 7. Công ty du lịch / Lữ hành / Travel / Tourist
    if (n.includes('du lịch') || n.includes('travel') || n.includes('tourist') || n.includes('lữ hành') || n.includes('vietnamtourism')) {
      return normalizeAssetUrl('/images/pois/du-lich-hue-tour.webp');
    }
    // 8. Chùa chiền / Tự / Tịnh thất / Tu viện (xoay tua 2 ảnh kiến trúc chùa tuyệt đẹp)
    if (n.includes('chùa') || n.includes('chua ') || n.includes('tịnh thất') || n.includes('thiền viện') || n.includes('tu viện') || n.includes('niệm giang') || n.includes('tổ đình')) {
      const hash = n.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return hash % 2 === 0 ? normalizeAssetUrl('/images/pois/chua-co-hue.webp') : normalizeAssetUrl('/images/pois/chua-tam-quan.webp');
    }
    // 9. Lăng tẩm / Lăng mộ / Bia mộ (ảnh lăng tẩm Cố Đô Huế thực tế)
    if (n.includes('lăng ') || n.includes('lang ') || n.includes('lăng mộ') || n.includes('bia mộ') || n.includes('tomb')) {
      return normalizeAssetUrl('/images/pois/lang-kien-thai-vuong.webp');
    }
    // 10. Đình làng / Miếu / Đền
    if (n.includes('đình làng') || n.includes('dinh lang') || n.includes('miếu') || n.includes('đền thờ')) {
      return normalizeAssetUrl('/images/pois/dinh-lang-hue.webp');
    }
    // 11. Sửa xe máy / Garage ô tô
    if (n.includes('sửa xe') || n.includes('sua xe') || n.includes('gara') || n.includes('garage') || n.includes('vá xe') || n.includes('bảo trì xe') || n.includes('phụ tùng')) {
      return normalizeAssetUrl('/images/pois/sua-xe-hue.webp');
    }
    // 12. Rửa xe
    if (n.includes('rửa xe') || n.includes('rua xe') || n.includes('bãi rửa')) {
      return normalizeAssetUrl('/images/pois/rua-xe-hue.webp');
    }
    // 13. Cây xăng / Petrolimex
    if (n.includes('xăng') || n.includes('petrolimex') || n.includes('nhiên liệu')) {
      return normalizeAssetUrl('/images/pois/cay-xang-hue.webp');
    }
    // 14. Ngân hàng / ATM
    if (n.includes('ngân hàng') || n.includes('bank') || n.includes('atm') || n.includes('vietcombank') || n.includes('bidv') || n.includes('agribank') || n.includes('viettinbank')) {
      return normalizeAssetUrl('/images/pois/ngan-hang-atm.webp');
    }
    // 15. Giặt ủi / Giặt là
    if (n.includes('giặt') || n.includes('laundry')) {
      return normalizeAssetUrl('/images/pois/giat-ui-hue.webp');
    }
    // 16. Fastfood / Gà rán / Burger / Pizza
    if (n.includes('lotteria') || n.includes('kfc') || n.includes('jollibee') || n.includes('pizza') || n.includes('burger') || n.includes('gà rán') || n.includes('ga ran') || n.includes('fastfood') || n.includes('fast food') || n.includes('dookki')) {
      return normalizeAssetUrl('/images/pois/fastfood-hue.webp');
    }
    // 17. Bánh mì
    if (n.includes('bánh mì') || n.includes('banh mi')) {
      return normalizeAssetUrl('/images/pois/banh-mi-hue.webp');
    }
    // 18. Cơm hến / Bún hến
    if (n.includes('cơm hến') || n.includes('com hen') || n.includes('bún hến') || n.includes('bun hen')) {
      return normalizeAssetUrl('/images/pois/com-hen-hue.webp');
    }
    // 19. Bánh bèo / Nậm / Lọc / Bánh khoái / Bánh canh
    if (n.includes('bánh bèo') || n.includes('banh beo') || n.includes('bánh nậm') || n.includes('bánh lọc') || n.includes('bánh khoái') || n.includes('bánh canh')) {
      return normalizeAssetUrl('/images/pois/banh-beo-nam-loc.webp');
    }
    // 20. Chè Huế / Quán kem
    if (n.includes('chè ') || n.includes('che ') || n.includes('chè huế') || n.includes('tiệm kem') || n.includes('quán chè')) {
      return normalizeAssetUrl('/images/pois/che-hue.webp');
    }
    // 21. Quán chay / Ẩm thực chay
    if (n.includes('chay') || n.includes('quán ăn chay') || n.includes('cơm chay')) {
      return normalizeAssetUrl('/images/pois/am-thuc-chay-hue.webp');
    }
    // 22. Hải sản / Quán nhậu / Ốc
    if (n.includes('hải sản') || n.includes('hai san') || n.includes('quán nhậu') || n.includes('quán ốc') || n.includes('ốc ') || n.includes('seafood')) {
      return normalizeAssetUrl('/images/pois/hai-san-hue.webp');
    }
    // 23. Lẩu / Nướng / BBQ
    if (n.includes('lẩu') || n.includes('nướng') || n.includes('bbq') || n.includes('grill') || n.includes('hotpot')) {
      return normalizeAssetUrl('/images/pois/lau-nuong-hue.webp');
    }
    // 24. Tiệm bánh / Bakery
    if (n.includes('bakery') || n.includes('bánh kem') || n.includes('bánh ngọt') || n.includes('tiệm bánh')) {
      return normalizeAssetUrl('/images/pois/tiem-banh-hue.webp');
    }
    // 25. Trà sữa / Trà chanh
    if (n.includes('trà sữa') || n.includes('tra sua') || n.includes('trà chanh') || n.includes('toco') || n.includes('gong cha')) {
      return normalizeAssetUrl('/images/pois/tra-sua-hue.webp');
    }
    // 26. Cà phê
    if (n.includes('cafe') || n.includes('cà phê') || n.includes('coffee')) {
      return normalizeAssetUrl('/images/pois/ca-phe-muoi-hue.webp');
    }
    // 27. Bún bò Huế
    if (n.includes('bún bò') || n.includes('bun bo') || n.includes('quán bún')) {
      return normalizeAssetUrl('/images/pois/bun-bo-hue.webp');
    }
    // 28. Khách sạn / Hotel / Resort
    if (n.includes('hotel') || n.includes('resort') || n.includes('khách sạn')) {
      return normalizeAssetUrl('/images/pois/khach-san-hue.webp');
    }
    // 29. Homestay / Nhà nghỉ
    if (n.includes('homestay') || n.includes('nhà nghỉ')) {
      return normalizeAssetUrl('/images/pois/homestay-hue.webp');
    }
    // 30. Chợ Bến Ngự
    if (n.includes('bến ngự') || n.includes('ben ngu')) {
      return normalizeAssetUrl('/images/pois/cho-ben-ngu-market.webp');
    }
    // 31. Bảo tàng Hồ Chí Minh
    if (n.includes('hồ chí minh') || n.includes('ho chi minh')) {
      return normalizeAssetUrl('/images/pois/bao-tang-ho-chi-minh-hue.webp');
    }

    const v = vertical || 'tour';
    const photo = CATEGORY_REAL_PHOTOS[v] || CATEGORY_REAL_PHOTOS.tour;
    return normalizeAssetUrl(photo);
  }
  window.getRealPhoto = getRealPhoto;

  // 3. Sinh Data URI SVG trực tiếp dự phòng tuyệt đối (không sợ lỗi 404 mạng)
  window.generateDynamicSvgPlaceholder = function(vertical, name) {
    const meta = CATEGORY_META[vertical] || CATEGORY_META.tour;
    const safeTitle = (name || meta.name).replace(/[<>&"']/g, '');
    const displayTitle = safeTitle.length > 32 ? safeTitle.slice(0, 30) + '...' : safeTitle;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="100%" height="100%">
      <defs>
        <linearGradient id="bgG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E1B4B" />
          <stop offset="50%" stop-color="${meta.bg}" />
          <stop offset="100%" stop-color="#2E1065" />
        </linearGradient>
        <radialGradient id="glowG" cx="50%" cy="38%" r="45%">
          <stop offset="0%" stop-color="${meta.accent}" stop-opacity="0.3" />
          <stop offset="100%" stop-color="${meta.accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill="url(#bgG)" />
      <circle cx="200" cy="95" r="110" fill="url(#glowG)" />
      <rect x="10" y="10" width="380" height="230" rx="10" fill="none" stroke="${meta.accent}" stroke-width="1.5" stroke-opacity="0.35" stroke-dasharray="6 4" />
      <g transform="translate(200, 90)">
        <circle cx="0" cy="0" r="36" fill="#2E1065" stroke="${meta.accent}" stroke-width="2" />
        <text x="0" y="12" font-family="'Segoe UI', Arial, sans-serif" font-size="28" text-anchor="middle" fill="#FFFFFF">${meta.icon}</text>
      </g>
      <text x="200" y="160" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="15" font-weight="700" text-anchor="middle" fill="#FFFFFF">${displayTitle}</text>
      <text x="200" y="184" font-family="'Be Vietnam Pro', Arial, sans-serif" font-size="12" font-weight="600" text-anchor="middle" fill="${meta.accent}" letter-spacing="1">HUEGO • ${meta.name.toUpperCase()}</text>
    </svg>`;

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  // 4. Lấy đường dẫn ảnh an toàn cho thẻ địa danh (Ưu tiên ảnh chụp thực tế tuyệt đối)
  window.resolvePlaceImage = function(place) {
    if (!place) {
      return getRealPhoto('tour', '');
    }

    const v = place.vertical || place.v || 'tour';
    const name = place.name_vi || place.name || '';

    if (place.imageStatus === 'hidden' || place.imageStatus === 'missing' || place.imageStatus === 'broken') {
      return window.generateDynamicSvgPlaceholder ? window.generateDynamicSvgPlaceholder(v, name) : getRealPhoto(v, name);
    }

    // Nếu có coverPhotoUrl hoặc img hợp lệ
    const candidate = place.coverPhotoUrl || place.img;
    if (candidate && typeof candidate === 'string' && candidate.trim()) {
      if (candidate.startsWith('http://') || candidate.startsWith('https://')) {
        return candidate;
      }
      return normalizeAssetUrl(candidate);
    }

    // Nếu chưa có ảnh thực tế riêng, hiển thị thẻ SVG chuẩn nhận diện HUEGO theo đúng tên địa danh
    return window.generateDynamicSvgPlaceholder ? window.generateDynamicSvgPlaceholder(v, name) : getRealPhoto(v, name);
  };

  // 5. Trình xử lý onerror cho mọi thẻ <img> trong ứng dụng (Đảm bảo 100% không vỡ ảnh)
  window.handleImgError = function(img, vertical, name) {
    if (!img) return;
    const v = vertical || img.getAttribute('data-vertical') || 'tour';
    const n = name || img.getAttribute('data-name') || img.alt || '';

    img.onerror = null;
    img.src = window.generateDynamicSvgPlaceholder ? window.generateDynamicSvgPlaceholder(v, n) : getRealPhoto(v, n);
  };

  // Khởi động đồng bộ config
  window.syncPublicConfig();

})(window);
