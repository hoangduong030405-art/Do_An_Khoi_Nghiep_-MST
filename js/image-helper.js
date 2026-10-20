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
    appUrl: window.location.origin ? (window.location.origin + '/app/') : './app/',
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

  // 4. Lấy đường dẫn ảnh an toàn cho thẻ địa danh
  window.resolvePlaceImage = function(place) {
    if (!place) {
      return window.generateDynamicSvgPlaceholder('tour', 'Địa danh Huế');
    }

    const v = place.vertical || place.v || 'tour';
    const name = place.name_vi || place.name || '';

    // Nếu đã bị đánh dấu hidden hoặc missing hoặc broken thì dùng thẳng SVG
    if (place.imageStatus === 'hidden' || place.imageStatus === 'missing' || place.imageStatus === 'broken') {
      return window.generateDynamicSvgPlaceholder(v, name);
    }

    // Nếu có coverPhotoUrl hợp lệ
    const candidate = place.coverPhotoUrl || place.img;
    if (candidate && typeof candidate === 'string' && candidate.trim()) {
      // Nếu là URL local không tồn tại (/images/...)
      if (candidate.startsWith('/images/pois/')) {
        return window.generateDynamicSvgPlaceholder(v, name);
      }
      return candidate;
    }

    return window.generateDynamicSvgPlaceholder(v, name);
  };

  // 5. Trình xử lý onerror cho mọi thẻ <img> trong ứng dụng
  window.handleImgError = function(img, vertical, name) {
    if (!img) return;
    img.onerror = null; // Chặn đệ quy vô hạn

    const v = vertical || img.getAttribute('data-vertical') || 'tour';
    const n = name || img.getAttribute('data-name') || img.alt || '';

    img.src = window.generateDynamicSvgPlaceholder(v, n);
    img.classList.add('is-svg-fallback');
  };

  // Khởi động đồng bộ config
  window.syncPublicConfig();

})(window);
