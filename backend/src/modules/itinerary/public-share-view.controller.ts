import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { ItineraryService } from './itinerary.service';
import { Public } from '../auth/decorators/public.decorator';

function escapeHtml(str: any): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

@ApiTags('Public Route View (/s/:token)')
@Controller('s')
export class PublicShareViewController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Public()
  @Get(':token')
  @ApiOperation({ summary: 'Xem trang web công khai của lộ trình chia sẻ' })
  async renderSharePage(
    @Param('token') token: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // 1. Tiêu đề bảo mật bắt buộc
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self' 'unsafe-inline' https://unpkg.com https://*.tile.openstreetmap.org https://cdn.jsdelivr.net data:; img-src 'self' data: https:;",
    );
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
    const rawPublicBase = process.env.PUBLIC_BASE_URL;
    const publicBaseUrl = rawPublicBase ? rawPublicBase.replace(/\/+$/, '') : `${proto}://${host}`;

    const clientIp = (req.headers['cf-connecting-ip'] as string) ||
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.ip ||
      '127.0.0.1';

    try {
      const data = await this.itineraryService.getSharedItinerary(token, clientIp);
      const html = this.generateHtml(data, token, publicBaseUrl);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch (err) {
      const errorHtml = this.generate404Html(publicBaseUrl);
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(404).send(errorHtml);
    }
  }

  private generateHtml(data: any, token: string, publicBaseUrl: string): string {
    const titleEscaped = escapeHtml(data.title);
    const sharedByEscaped = escapeHtml(data.sharedBy);
    const dateFormatted = data.date ? new Date(data.date).toLocaleDateString('vi-VN') : '';
    const lastUpdated = data.updatedAt
      ? new Date(data.updatedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
      : '';
    const ogDesc = `Lộ trình ${data.stops.length} điểm, ${data.totalDistanceKm} km tại Cố Đô Huế`;
    const ogImageUrl = `${publicBaseUrl}/img/hero/di-san-trieu-nguyen.jpg`;
    const canonicalUrl = `${publicBaseUrl}/s/${escapeHtml(token)}`;

    // Prepare stops JSON safely for Leaflet JS map
    const safeStopsJson = JSON.stringify(data.stops).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

    const stopsHtml = data.stops
      .map((s: any, idx: number) => {
        const nameEsc = escapeHtml(s.name);
        const catEsc = escapeHtml(s.category);
        const addrEsc = escapeHtml(s.address);
        const noteEsc = s.note ? escapeHtml(s.note) : '';
        const timeEsc = s.plannedStart ? escapeHtml(s.plannedStart.slice(0, 5)) : '';
        const photoEsc = escapeHtml(s.photo);

        return `
          <div class="timeline-item" data-stop-idx="${idx}">
            <div class="timeline-marker">${s.orderIndex}</div>
            <div class="timeline-card">
              <div class="timeline-card-img-wrap">
                <img src="${photoEsc}" alt="${nameEsc}" class="timeline-img" loading="lazy" onerror="this.src='/images/pois/dai-noi-hue.jpg'">
                ${timeEsc ? `<div class="timeline-time-badge">⏰ ${timeEsc}</div>` : ''}
              </div>
              <div class="timeline-body">
                <div class="timeline-header">
                  <span class="timeline-cat">${catEsc}</span>
                  <button type="button" class="btn-navigate" onclick="navigateStop(${s.latitude}, ${s.longitude}, '${nameEsc}')" title="Chỉ đường tới điểm này">
                    🧭 Chỉ đường
                  </button>
                </div>
                <h3 class="timeline-title">${nameEsc}</h3>
                <p class="timeline-addr">📍 ${addrEsc}</p>
                ${
                  noteEsc
                    ? `<div class="timeline-note"><span class="note-icon">📝</span> <span>${noteEsc}</span></div>`
                    : ''
                }
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${titleEscaped} — Lộ trình HUEGO</title>
  <meta name="robots" content="noindex, nofollow">
  <meta name="referrer" content="no-referrer">
  
  <!-- OpenGraph Metadata -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${titleEscaped} — Lộ trình Cố Đô Huế">
  <meta property="og:description" content="${ogDesc}">
  <meta property="og:image" content="${ogImageUrl}">
  <meta property="og:url" content="${canonicalUrl}">

  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>

  <style>
    :root {
      --royal-violet: #582C83;
      --royal-violet-dark: #3F1B63;
      --imperial-gold: #D4AF37;
      --bg-color: #F8FAFC;
      --card-bg: #FFFFFF;
      --text-main: #0F172A;
      --text-sub: #64748B;
      --border-color: #E2E8F0;
      --brand-red: #DC2626;
      --safe-top: env(safe-area-inset-top, 0px);
      --safe-bottom: env(safe-area-inset-bottom, 0px);
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-color: #0F172A;
        --card-bg: #1E293B;
        --text-main: #F8FAFC;
        --text-sub: #94A3B8;
        --border-color: #334155;
      }
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-main);
      line-height: 1.5;
      padding-bottom: calc(80px + var(--safe-bottom));
      -webkit-font-smoothing: antialiased;
    }
    .header-bar {
      background: linear-gradient(135deg, var(--royal-violet) 0%, var(--royal-violet-dark) 100%);
      color: white;
      padding: calc(16px + var(--safe-top)) 20px 20px;
      box-shadow: 0 4px 20px rgba(88, 44, 131, 0.25);
    }
    .header-content {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }
    .brand-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-weight: 800;
      font-size: 14px;
      color: var(--imperial-gold);
      letter-spacing: 0.5px;
      text-decoration: none;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px 16px;
    }
    .hero-card {
      background: var(--card-bg);
      border-radius: 16px;
      padding: 24px;
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      margin-bottom: 24px;
    }
    .route-title {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 8px;
    }
    .route-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      color: var(--text-sub);
      font-size: 13px;
      margin-bottom: 16px;
    }
    .metrics-bar {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
    }
    .metric-item {
      text-align: center;
      padding: 10px;
      background: var(--bg-color);
      border-radius: 12px;
    }
    .metric-val {
      font-size: 18px;
      font-weight: 800;
      color: var(--royal-violet);
    }
    .metric-lbl {
      font-size: 11px;
      color: var(--text-sub);
      margin-top: 2px;
    }
    /* Map Section */
    .map-wrap {
      background: var(--card-bg);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--border-color);
      margin-bottom: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    }
    #shareMap {
      width: 100%;
      height: 380px;
    }
    /* Timeline */
    .section-title {
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .timeline {
      position: relative;
      padding-left: 20px;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 17px;
      top: 20px;
      bottom: 40px;
      width: 2px;
      background: #CBD5E1;
    }
    .timeline-item {
      position: relative;
      margin-bottom: 20px;
      padding-left: 24px;
    }
    .timeline-marker {
      position: absolute;
      left: -20px;
      top: 12px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--royal-violet);
      color: var(--imperial-gold);
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      border: 3px solid var(--bg-color);
      z-index: 2;
      box-shadow: 0 2px 8px rgba(88, 44, 131, 0.3);
    }
    .timeline-card {
      background: var(--card-bg);
      border-radius: 14px;
      border: 1px solid var(--border-color);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    @media (min-width: 640px) {
      .timeline-card {
        flex-direction: row;
      }
      .timeline-card-img-wrap {
        width: 180px;
        min-width: 180px;
      }
    }
    .timeline-card-img-wrap {
      position: relative;
      height: 140px;
      background: #CBD5E1;
    }
    @media (min-width: 640px) {
      .timeline-card-img-wrap {
        height: auto;
      }
    }
    .timeline-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .timeline-time-badge {
      position: absolute;
      bottom: 8px;
      left: 8px;
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(4px);
      color: white;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
    }
    .timeline-body {
      padding: 14px 16px;
      flex: 1;
    }
    .timeline-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    .timeline-cat {
      font-size: 11px;
      font-weight: 700;
      color: var(--royal-violet);
      background: rgba(88, 44, 131, 0.08);
      padding: 2px 8px;
      border-radius: 4px;
    }
    .btn-navigate {
      min-height: 36px;
      padding: 0 12px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background: var(--bg-color);
      color: var(--text-main);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .timeline-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .timeline-addr {
      font-size: 12px;
      color: var(--text-sub);
      margin-bottom: 8px;
    }
    .timeline-note {
      font-size: 12px;
      color: #92400E;
      background: #FEF3C7;
      padding: 8px 12px;
      border-radius: 8px;
      border-left: 3px solid #D97706;
      display: flex;
      gap: 6px;
      align-items: flex-start;
    }
    /* Fixed Bottom Action Bar */
    .bottom-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--card-bg);
      border-top: 1px solid var(--border-color);
      padding: 12px 16px calc(12px + var(--safe-bottom));
      box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
      z-index: 1000;
    }
    .bottom-bar-inner {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      gap: 12px;
    }
    .btn-action {
      flex: 1;
      min-height: 44px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      text-decoration: none;
      border: none;
    }
    .btn-save {
      background: var(--royal-violet);
      color: var(--imperial-gold);
    }
    .btn-open-app {
      background: var(--bg-color);
      color: var(--text-main);
      border: 1px solid var(--border-color);
    }
    .leaflet-popup-content-wrapper {
      border-radius: 12px;
    }
  </style>
</head>
<body>

  <header class="header-bar">
    <div class="header-content">
      <a href="/app/" class="brand-badge">
        <span>🏛️</span> HUEGO — CỐ ĐÔ HUẾ
      </a>
      <a href="/app/" class="btn-navigate" style="background:rgba(255,255,255,0.15); color:white; border:none;">
        Mở ứng dụng
      </a>
    </div>
  </header>

  <main class="container">
    <div class="hero-card">
      <h1 class="route-title">${titleEscaped}</h1>
      <div class="route-meta">
        <span>👤 Người chia sẻ: <b>${sharedByEscaped}</b></span>
        ${dateFormatted ? `<span>📅 Ngày dự kiến: <b>${dateFormatted}</b></span>` : ''}
        ${lastUpdated ? `<span>🕒 Cập nhật lần cuối: <b>${lastUpdated}</b></span>` : ''}
      </div>

      <div class="metrics-bar">
        <div class="metric-item">
          <div class="metric-val">${data.stops.length}</div>
          <div class="metric-lbl">Điểm đến</div>
        </div>
        <div class="metric-item">
          <div class="metric-val">${data.totalDistanceKm} km</div>
          <div class="metric-lbl">Quãng đường</div>
        </div>
        <div class="metric-item">
          <div class="metric-val">${data.estimatedDurationMin}p</div>
          <div class="metric-lbl">Thời gian ước tính</div>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="map-wrap">
      <div id="shareMap"></div>
    </div>

    <!-- Timeline of Stops -->
    <h2 class="section-title">📍 Chi tiết hành trình (${data.stops.length} điểm)</h2>
    <div class="timeline">
      ${stopsHtml}
    </div>
  </main>

  <!-- Bottom Bar -->
  <div class="bottom-bar">
    <div class="bottom-bar-inner">
      ${
        data.allowCopy
          ? `<button class="btn-action btn-save" id="btnCopyItinerary" onclick="copyItinerary()">
              📥 Lưu về lộ trình của tôi
             </button>`
          : `<button class="btn-action btn-save" disabled style="opacity:0.6; cursor:not-allowed;">
              🔒 Lộ trình chỉ xem (không sao chép)
             </button>`
      }
      <a href="/app/" class="btn-action btn-open-app">
        🚀 Mở trong HUEGO
      </a>
    </div>
  </div>

  <!-- Leaflet JS -->
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
  <script>
    const stopsData = ${safeStopsJson};
    const currentToken = ${JSON.stringify(token)};

    // Khởi tạo bản đồ Leaflet
    const map = L.map('shareMap', { scrollWheelZoom: false }).setView([16.4673, 107.5905], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const latLngs = [];
    stopsData.forEach(s => {
      if (s.latitude && s.longitude) {
        const pt = [s.latitude, s.longitude];
        latLngs.push(pt);
        const icon = L.divIcon({
          className: 'custom-map-marker',
          html: '<div style="background:#582C83; color:#D4AF37; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:800; border:2px solid white; box-shadow:0 2px 6px rgba(0,0,0,0.3);">' + s.orderIndex + '</div>',
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });
        L.marker(pt, { icon }).addTo(map)
          .bindPopup('<b>' + s.orderIndex + '. ' + s.name + '</b><br><small>' + s.address + '</small>');
      }
    });

    if (latLngs.length > 1) {
      L.polyline(latLngs, { color: '#582C83', weight: 4, dashArray: '6, 8', opacity: 0.8 }).addTo(map);
      map.fitBounds(L.latLngBounds(latLngs), { padding: [40, 40] });
    } else if (latLngs.length === 1) {
      map.setView(latLngs[0], 15);
    }

    // Chỉ đường đa nền tảng (Apple Maps trên iOS, Google Maps còn lại)
    function navigateStop(lat, lng, label) {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
      if (isIOS) {
        window.open('maps://?daddr=' + lat + ',' + lng, '_blank');
      } else {
        window.open('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng, '_blank');
      }
    }

    // Sao chép lộ trình về tài khoản của tôi
    async function copyItinerary() {
      const btn = document.getElementById('btnCopyItinerary');
      if (btn) btn.disabled = true;

      const userToken = localStorage.getItem('huego_token');
      if (!userToken) {
        // Chưa đăng nhập -> Chuyển sang /app/ kèm tham số copy
        window.location.href = '/app/?action=copy_itinerary&token=' + encodeURIComponent(currentToken);
        return;
      }

      try {
        const res = await fetch('/api/v1/shared/' + encodeURIComponent(currentToken) + '/copy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken
          }
        });
        const data = await res.json();
        if (res.ok) {
          alert('🎉 ' + (data.message || 'Đã lưu thành công vào Lộ trình của bạn!'));
          window.location.href = '/app/';
        } else {
          alert(data.message || 'Không thể lưu bản sao lộ trình lúc này.');
          if (btn) btn.disabled = false;
        }
      } catch (err) {
        alert('Lỗi kết nối máy chủ khi lưu bản sao.');
        if (btn) btn.disabled = false;
      }
    }
  </script>
</body>
</html>`;
  }

  private generate404Html(publicBaseUrl: string): string {
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Liên kết không tồn tại hoặc đã hết hạn — HUEGO</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #F8FAFC;
      color: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 16px;
      text-align: center;
    }
    .box {
      background: white;
      padding: 40px 24px;
      border-radius: 16px;
      max-width: 440px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid #E2E8F0;
    }
    .icon { font-size: 54px; margin-bottom: 16px; }
    h1 { font-size: 20px; font-weight: 800; color: #582C83; margin-bottom: 12px; }
    p { font-size: 14px; color: #64748B; margin-bottom: 24px; line-height: 1.6; }
    .btn {
      display: inline-block;
      min-height: 44px;
      line-height: 44px;
      padding: 0 24px;
      background: #582C83;
      color: #D4AF37;
      font-weight: 700;
      text-decoration: none;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="icon">🔗</div>
    <h1>Liên kết không tồn tại hoặc đã hết hạn</h1>
    <p>Lộ trình này có thể đã bị chủ sở hữu thu hồi, đã hết thời hạn chia sẻ, hoặc liên kết bạn nhập chưa chính xác.</p>
    <a href="/app/" class="btn">Khám phá Lộ trình Huế</a>
  </div>
</body>
</html>`;
  }
}
