/**
 * HUEGO - Image & Shared Config Helper
 * Cung cấp thành phần xử lý ảnh thông minh, chống ảnh giả mạo, tự tạo SVG dự phòng theo thương hiệu Cố Đô.
 */

(function(window) {
  'use strict';

  // 1. Cấu hình dùng chung mặc định
  window.HUEGO_CONFIG = {
    version: '1.0.1',
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

  // 3. Sinh Data URI SVG trực tiếp dự phòng tuyệt đối - Đúng 100% tên địa danh, không bao giờ nhầm sang ảnh khác
  window.generateDynamicSvgPlaceholder = function(vertical, name) {
    const meta = CATEGORY_META[vertical] || CATEGORY_META.tour;
    const safeTitle = (name || meta.name).replace(/[<>&"']/g, '');
    const displayTitle = safeTitle.length > 28 ? safeTitle.slice(0, 26) + '...' : safeTitle;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#180D2B" />
          <stop offset="50%" stop-color="${meta.bg}" />
          <stop offset="100%" stop-color="#2E1065" />
        </linearGradient>
        <radialGradient id="goldGlow" cx="50%" cy="38%" r="50%">
          <stop offset="0%" stop-color="${meta.accent}" stop-opacity="0.35" />
          <stop offset="100%" stop-color="${meta.accent}" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill="url(#bgGrad)" />
      <circle cx="200" cy="92" r="115" fill="url(#goldGlow)" />
      <rect x="12" y="12" width="376" height="226" rx="12" fill="none" stroke="${meta.accent}" stroke-width="1.5" stroke-opacity="0.4" stroke-dasharray="6 4" />
      <g transform="translate(200, 88)">
        <circle cx="0" cy="0" r="38" fill="#2E1065" stroke="${meta.accent}" stroke-width="2" />
        <text x="0" y="13" font-family="'Segoe UI', -apple-system, Arial, sans-serif" font-size="30" text-anchor="middle" fill="#FFFFFF">${meta.icon}</text>
      </g>
      <text x="200" y="158" font-family="'Plus Jakarta Sans', -apple-system, Arial, sans-serif" font-size="16" font-weight="700" text-anchor="middle" fill="#FFFFFF">${displayTitle}</text>
      <text x="200" y="184" font-family="'Be Vietnam Pro', -apple-system, Arial, sans-serif" font-size="12" font-weight="600" text-anchor="middle" fill="${meta.accent}" letter-spacing="1.2">HUEGO • ${meta.name.toUpperCase()}</text>
      <text x="200" y="206" font-family="'Be Vietnam Pro', -apple-system, Arial, sans-serif" font-size="10" font-weight="500" text-anchor="middle" fill="#E2E8F0" opacity="0.75">Cố Đô Huế • Di Tích & Danh Thắng</text>
    </svg>`;

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  // Lấy ảnh chụp thực tế theo danh mục (chỉ dùng ảnh Cố Đô Huế thực tế, không dùng ảnh ngoại lai)
  function getRealPhoto(vertical, name) {
    const n = (name || '').toLowerCase();

    // 1. Chợ Bến Ngự
    if (n.includes('bến ngự') || n.includes('ben ngu')) {
      return normalizeAssetUrl('/images/pois/cho-ben-ngu.webp');
    }
    // 2. Chợ Đông Ba
    if (n.includes('đông ba') || n.includes('dong ba')) {
      return normalizeAssetUrl('/images/pois/cho-dong-ba.webp');
    }
    // 3. Bảo tàng Hồ Chí Minh Huế
    if (n.includes('hồ chí minh') || n.includes('ho chi minh')) {
      return normalizeAssetUrl('/images/pois/bao-tang-ho-chi-minh-hue.webp');
    }
    // 4. Đại Nội Huế / Ngọ Môn
    if (n.includes('đại nội') || n.includes('ngo mon') || n.includes('ngọ môn') || n.includes('hoàng thành')) {
      return normalizeAssetUrl('/images/pois/dai-noi-hue.webp');
    }
    // 5. Chùa Thiên Mụ
    if (n.includes('thiên mụ') || n.includes('thien mu')) {
      return normalizeAssetUrl('/images/pois/chua-thien-mu.webp');
    }
    // 6. Cầu Tràng Tiền
    if (n.includes('tràng tiền') || n.includes('trường tiền') || n.includes('trang tien')) {
      return normalizeAssetUrl('/images/pois/cau-trang-tien.webp');
    }

    // Các địa danh khác chưa có ảnh riêng -> Sinh SVG chuẩn nhận diện HUEGO chính xác tên địa danh
    return window.generateDynamicSvgPlaceholder(vertical, name);
  }
  window.getRealPhoto = getRealPhoto;

  // 4. Lấy đường dẫn ảnh an toàn cho thẻ địa danh (Ưu tiên ảnh chụp thực tế tuyệt đối)
  window.resolvePlaceImage = function(place) {
    if (!place) {
      return window.generateDynamicSvgPlaceholder('tour', 'Địa danh Huế');
    }

    const v = place.vertical || place.v || 'tour';
    const name = place.name_vi || place.name || '';

    // Khắc phục các ca đặc thù di sản
    const nLower = name.toLowerCase();
    if (nLower.includes('bến ngự') || nLower.includes('ben ngu')) {
      return normalizeAssetUrl('/images/pois/cho-ben-ngu.webp');
    }
    if (nLower.includes('hồ chí minh') || nLower.includes('ho chi minh')) {
      return normalizeAssetUrl('/images/pois/bao-tang-ho-chi-minh-hue.webp');
    }

    if (place.imageStatus === 'hidden' || place.imageStatus === 'missing' || place.imageStatus === 'broken') {
      return window.generateDynamicSvgPlaceholder(v, name);
    }

    // Nếu có coverPhotoUrl hoặc img hợp lệ
    let candidate = place.coverPhotoUrl || place.img;
    if (candidate && typeof candidate === 'string' && candidate.trim()) {
      candidate = candidate.trim();
      // Chuyển pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev sang cdn.hue4u.com cho đồng nhất và ổn định
      if (candidate.includes('pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev')) {
        candidate = candidate.replace('https://pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev', 'https://cdn.hue4u.com');
      }
      if (candidate.startsWith('http://') || candidate.startsWith('https://')) {
        return candidate;
      }
      return normalizeAssetUrl(candidate);
    }

    // Nếu chưa có ảnh thực tế riêng, hiển thị thẻ SVG chuẩn nhận diện HUEGO theo đúng tên địa danh
    return window.generateDynamicSvgPlaceholder(v, name);
  };

  // 5. Trình xử lý onerror cho mọi thẻ <img> trong ứng dụng (Đảm bảo 100% không vỡ ảnh, không nhảy ảnh sai)
  window.handleImgError = function(img, vertical, name) {
    if (!img) return;
    const v = vertical || img.getAttribute('data-vertical') || 'tour';
    const n = name || img.getAttribute('data-name') || img.alt || '';

    img.onerror = null;
    img.src = window.generateDynamicSvgPlaceholder(v, n);
  };

  // Khởi động đồng bộ config
  window.syncPublicConfig();

})(window);
