import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('app')
export class MobilePreviewController {
  @Get()
  getMobileApp(@Res() res: Response) {
    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>HUEGO – Ứng Dụng Khám Phá Huế Thông Minh</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
  <style>
    :root {
      --royal-violet: #582C83;
      --royal-violet-dark: #371457;
      --imperial-gold: #D4AF37;
      --imperial-gold-light: #FDF4D8;
      --river-teal: #1E6B7B;
      --emerald-green: #2E7D32;
      --bg-cloud: #F8F9FC;
      --card-bg: #FFFFFF;
      --text-main: #111827;
      --text-muted: #6B7280;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }

    body {
      background: radial-gradient(circle at top center, #2e1647 0%, #160b24 60%, #0d0615 100%);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px 8px;
      overflow-x: hidden;
    }

    .top-controls {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
      color: white;
    }
    .top-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--imperial-gold);
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .view-mode-btn {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .view-mode-btn:hover { background: var(--imperial-gold); color: #000; }

    /* Realistic Titanium Phone Chassis Frame */
    .phone-container {
      width: 100%;
      max-width: 416px;
      height: 840px;
      background: #1C1917;
      border-radius: 50px;
      padding: 12px;
      box-shadow: 
        0 25px 70px rgba(0, 0, 0, 0.7),
        0 0 0 2px #44403C,
        0 0 0 5px #292524,
        inset 0 0 8px rgba(255,255,255,0.2);
      position: relative;
      transition: all 0.3s ease;
    }

    /* Fullscreen Mode */
    body.fullscreen-mode .phone-container {
      max-width: 100vw;
      height: 100vh;
      border-radius: 0;
      padding: 0;
      box-shadow: none;
      border: none;
    }
    body.fullscreen-mode .top-controls { display: none; }
    body.fullscreen-mode .dynamic-island { display: none; }

    .phone-screen {
      width: 100%;
      height: 100%;
      background: var(--bg-cloud);
      border-radius: 40px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    body.fullscreen-mode .phone-screen { border-radius: 0; }

    /* Dynamic Island */
    .dynamic-island {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 116px;
      height: 30px;
      background: #000;
      border-radius: 20px;
      z-index: 1000;
      box-shadow: 0 2px 6px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
    }
    .island-cam { width: 10px; height: 10px; background: #0D2818; border-radius: 50%; box-shadow: inset 0 0 3px #10B981; }
    .island-sensor { width: 8px; height: 8px; background: #1F2937; border-radius: 50%; }

    /* Status Bar */
    .status-bar {
      height: 44px;
      padding: 10px 24px 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      font-weight: 700;
      color: #111827;
      z-index: 999;
      background: transparent;
    }

    /* App Header Bar */
    .app-header {
      background: linear-gradient(135deg, var(--royal-violet) 0%, var(--royal-violet-dark) 100%);
      color: white;
      padding: 10px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 15px rgba(88, 44, 131, 0.25);
      z-index: 100;
    }
    .app-brand { display: flex; align-items: center; gap: 8px; }
    .app-brand h2 { font-size: 16px; font-weight: 800; letter-spacing: 0.5px; }
    .header-points-badge {
      background: linear-gradient(135deg, var(--imperial-gold), #B38F24);
      color: #111;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 4px;
      box-shadow: 0 2px 6px rgba(212, 175, 55, 0.4);
    }

    /* Content Area */
    .content-area {
      flex: 1;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .tab-view { display: none; height: 100%; width: 100%; flex-direction: column; overflow-y: auto; }
    .tab-view.active { display: flex; }

    /* TAB 1: BẢN ĐỒ */
    #tab-map { position: relative; height: 100%; overflow: hidden; }
    #map { width: 100%; height: 100%; }

    /* Category Filter Pills on Map */
    .map-filter-bar {
      position: absolute;
      top: 58px;
      left: 0;
      right: 0;
      z-index: 500;
      display: flex;
      gap: 6px;
      padding: 6px 12px;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
    }
    .map-filter-bar::-webkit-scrollbar { display: none; }

    /* Map Layer Toggle Pill */
    .map-layer-pill {
      position: absolute;
      bottom: 24px;
      left: 14px;
      z-index: 500;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border: 1.5px solid rgba(88, 44, 131, 0.25);
      border-radius: 20px;
      padding: 7px 13px;
      font-size: 11px;
      font-weight: 800;
      color: var(--royal-violet);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }
    .map-layer-pill:active { transform: scale(0.95); }
    .map-layer-pill:hover { background: #FAF5FF; }

    .filter-chip {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(88, 44, 131, 0.15);
      color: var(--text-main);
      padding: 6px 12px;
      border-radius: 18px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: all 0.2s;
    }
    .filter-chip.active {
      background: var(--royal-violet);
      color: white;
      border-color: var(--royal-violet);
      box-shadow: 0 4px 12px rgba(88, 44, 131, 0.35);
    }

    /* Floating Weather Banner */
    .weather-banner {
      position: absolute;
      top: 10px;
      left: 12px;
      right: 12px;
      z-index: 500;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border-radius: 18px;
      padding: 8px 12px;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
      border: 1px solid rgba(255,255,255,0.8);
    }
    .weather-icon { font-size: 24px; }
    .weather-info { flex: 1; }
    .weather-title { font-size: 13px; font-weight: 800; color: #1E293B; }
    .weather-desc { font-size: 11px; color: #64748B; margin-top: 1px; }
    .weather-btn {
      background: var(--royal-violet);
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }

    /* Place Details Bottom Sheet */
    .place-sheet {
      position: absolute;
      bottom: -100%;
      left: 0;
      right: 0;
      background: white;
      border-radius: 28px 28px 0 0;
      padding: 16px;
      box-shadow: 0 -10px 30px rgba(0,0,0,0.25);
      z-index: 600;
      transition: bottom 0.35s cubic-bezier(0.16, 1, 0.3, 1);
      max-height: 75%;
      overflow-y: auto;
    }
    .place-sheet.open { bottom: 0; }
    .sheet-handle { width: 40px; height: 4px; background: #E2E8F0; border-radius: 2px; margin: 0 auto 12px auto; }
    .sheet-img { width: 100%; height: 140px; border-radius: 16px; object-fit: cover; margin-bottom: 10px; }
    .sheet-title { font-size: 18px; font-weight: 800; color: var(--royal-violet); margin-bottom: 4px; }
    .sheet-address { font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 4px; margin-bottom: 10px; }
    .sheet-badges { display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; }
    .sheet-tag { font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 10px; background: #F1F5F9; color: #334155; }
    .sheet-tag.gp { background: #ECFDF5; color: #047857; font-weight: 800; }
    .sheet-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 8px; }
    .btn-action {
      padding: 10px;
      border-radius: 14px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border: none;
    }
    .btn-ai-voice { background: var(--royal-violet); color: white; }
    .btn-add-route { background: var(--imperial-gold-light); color: #854D0E; border: 1px solid var(--imperial-gold); }

    /* TAB 2: LỘ TRÌNH (ITINERARY) */
    .itinerary-container { padding: 16px; }
    .progress-box {
      background: linear-gradient(135deg, var(--royal-violet), #4A1D75);
      border-radius: 22px;
      padding: 18px;
      color: white;
      margin-bottom: 16px;
      box-shadow: 0 8px 25px rgba(88, 44, 131, 0.3);
    }
    .progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 13px; }
    .progress-bar-wrap { width: 100%; height: 10px; background: rgba(255,255,255,0.2); border-radius: 6px; overflow: hidden; margin-bottom: 8px; }
    .progress-bar-fill { height: 100%; width: 50%; background: var(--imperial-gold); border-radius: 6px; transition: width 0.5s ease; }
    .stops-list { display: flex; flex-direction: column; gap: 10px; }
    .stop-card {
      background: white;
      border-radius: 18px;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      border: 1.5px solid #F1F5F9;
    }
    .stop-card.visited { border-color: #86EFAC; background: #F0FDF4; }
    .stop-idx {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--royal-violet);
      color: white;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
    }
    .stop-card.visited .stop-idx { background: #22C55E; }
    .stop-info { flex: 1; }
    .stop-name { font-size: 14px; font-weight: 800; color: #1E293B; }
    .stop-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

    /* TAB 3: VÒNG QUAY (RANDOM WHEEL) */
    .wheel-container { padding: 16px; display: flex; flex-direction: column; align-items: center; text-align: center; }
    .wheel-intro {
      background: white;
      border-radius: 20px;
      padding: 14px;
      margin-bottom: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.04);
      border: 1px solid #E2E8F0;
      width: 100%;
    }
    .wheel-intro h3 { font-size: 15px; color: var(--royal-violet); font-weight: 800; margin-bottom: 4px; }
    .wheel-intro p { font-size: 12px; color: var(--text-muted); }
    .wheel-filter-chips { display: flex; gap: 6px; overflow-x: auto; width: 100%; margin-bottom: 18px; padding-bottom: 4px; }
    .wheel-canvas-wrap {
      position: relative;
      width: 290px;
      height: 290px;
      margin-bottom: 24px;
    }
    #wheel-canvas {
      width: 290px;
      height: 290px;
      border-radius: 50%;
      box-shadow: 0 10px 30px rgba(88, 44, 131, 0.35), 0 0 0 6px #FBBF24;
      transition: transform 4s cubic-bezier(0.15, 0.9, 0.2, 1);
    }
    .wheel-pointer {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 24px;
      height: 32px;
      background: #EF4444;
      clip-path: polygon(50% 100%, 0 0, 100% 0);
      z-index: 10;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
    }
    .wheel-center-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background: radial-gradient(circle, #FFF 0%, var(--imperial-gold) 100%);
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 13px;
      color: var(--royal-violet);
      cursor: pointer;
      user-select: none;
    }
    .spin-action-btn {
      background: linear-gradient(135deg, var(--royal-violet), #6B21A8);
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 20px;
      font-size: 15px;
      font-weight: 800;
      box-shadow: 0 6px 20px rgba(88, 44, 131, 0.4);
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .spin-action-btn:hover { transform: translateY(-2px); }

    /* TAB 4: CHAT O HUẾ AI */
    .chat-container { flex: 1; display: flex; flex-direction: column; height: 100%; background: #F8FAFC; }
    .chat-messages { flex: 1; padding: 14px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
    .chat-bubble { max-width: 82%; padding: 10px 14px; border-radius: 18px; font-size: 13px; line-height: 1.45; }
    .msg-ai { align-self: flex-start; background: white; color: var(--text-main); box-shadow: 0 2px 6px rgba(0,0,0,0.05); border-bottom-left-radius: 4px; }
    .msg-user { align-self: flex-end; background: var(--royal-violet); color: white; border-bottom-right-radius: 4px; }
    .ai-avatar-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .ai-avatar { width: 24px; height: 24px; border-radius: 50%; background: var(--imperial-gold); display: flex; align-items: center; justify-content: center; font-size: 12px; }
    .quick-chips-bar { display: flex; gap: 6px; overflow-x: auto; padding: 6px 14px; background: white; border-top: 1px solid #F1F5F9; }
    .quick-chip { background: #F1F5F9; padding: 5px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; color: #475569; cursor: pointer; white-space: nowrap; }
    .chat-input-row { padding: 10px 14px; background: white; border-top: 1px solid #E2E8F0; display: flex; gap: 8px; }
    .chat-input { flex: 1; border: 1px solid #E2E8F0; border-radius: 20px; padding: 8px 14px; font-size: 13px; outline: none; }
    .chat-send-btn { background: var(--royal-violet); color: white; border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

    /* TAB 5: ĐIỂM XANH & CHỨNG NHẬN */
    .green-container { padding: 16px; overflow-y: auto; }
    .green-stat-card {
      background: linear-gradient(135deg, var(--royal-violet) 0%, #4C1D95 100%);
      border-radius: 24px;
      padding: 20px;
      color: white;
      box-shadow: 0 10px 25px rgba(88, 44, 131, 0.3);
      margin-bottom: 16px;
    }
    .green-pts-val { font-size: 40px; font-weight: 800; color: var(--imperial-gold); margin: 6px 0; }
    .badges-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 14px; }
    .badge-card { background: white; border-radius: 16px; padding: 12px 6px; text-align: center; border: 1.5px solid #E2E8F0; }
    .badge-card.unlocked { border-color: var(--imperial-gold); background: #FFFDF5; }
    .badge-card h4 { font-size: 11px; margin-top: 6px; font-weight: 800; color: var(--text-main); }
    .badge-card p { font-size: 10px; color: var(--text-muted); margin-top: 2px; }

    /* Bottom Navigation Bar */
    .bottom-nav {
      height: 64px;
      background: white;
      border-top: 1px solid #E5E7EB;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-bottom: 6px;
      z-index: 100;
    }
    .nav-btn {
      border: none;
      background: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3px;
      color: #94A3B8;
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
      width: 20%;
      transition: color 0.2s;
    }
    .nav-btn.active { color: var(--royal-violet); }
    .nav-icon { font-size: 20px; }

    /* E-Certificate Royal Modal */
    .cert-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(8px);
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 14px;
    }
    .cert-frame {
      background: radial-gradient(circle at center, #2E104D 0%, #150626 100%);
      border: 3px solid var(--imperial-gold);
      border-radius: 28px;
      padding: 24px 18px;
      color: white;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(212, 175, 55, 0.3);
      max-width: 350px;
      width: 100%;
      animation: zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes zoomIn { 0% { transform: scale(0.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    .cert-seal { width: 54px; height: 54px; border-radius: 50%; background: var(--imperial-gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 10px auto; font-size: 28px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.5); }
    .cert-title-gold { font-family: 'Playfair Display', serif; color: var(--imperial-gold); font-size: 14px; font-weight: 800; letter-spacing: 2px; }
    .cert-main-heading { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 800; margin: 4px 0 12px 0; color: #FFF; }
    .cert-user-name { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 800; color: var(--imperial-gold); margin: 6px 0; }
    .cert-desc { font-size: 11px; line-height: 1.4; color: #E2E8F0; margin-bottom: 14px; }
    .cert-code-chip { background: rgba(255,255,255,0.1); border: 1px dashed var(--imperial-gold); padding: 6px 12px; border-radius: 12px; font-size: 11px; font-family: monospace; color: var(--imperial-gold); margin-bottom: 14px; display: inline-block; }
    .cert-share-btn { background: var(--imperial-gold); color: #000; border: none; padding: 10px 18px; border-radius: 14px; font-size: 13px; font-weight: 800; cursor: pointer; width: 100%; }
    .cert-close-btn { background: transparent; color: #94A3B8; border: none; font-size: 12px; margin-top: 10px; cursor: pointer; }
  </style>
</head>
<body>

  <div class="top-controls">
    <div class="top-title">📱 HUEGO SMART MOBILE SIMULATOR</div>
    <button class="view-mode-btn" onclick="toggleFullscreen()">🖥️ Phóng To / Toàn Màn Hình</button>
  </div>

  <div class="phone-container" id="phoneChassis">
    <div class="phone-screen">
      <div class="dynamic-island">
        <div class="island-cam"></div>
        <div class="island-sensor"></div>
      </div>

      <!-- Status Bar -->
      <div class="status-bar">
        <span id="live-clock">09:41</span>
        <span style="display: flex; gap: 4px; align-items: center;">5G 📶 🔋 100%</span>
      </div>

      <!-- App Header -->
      <div class="app-header">
        <div class="app-brand">
          <span>🏛️</span>
          <h2>HUEGO – Cố Đô Huế</h2>
        </div>
        <div class="header-points-badge" id="headerPointsBadge">
          <span>🌿</span>
          <span id="userTotalPoints">125 GP</span>
        </div>
      </div>

      <!-- Content Area -->
      <div class="content-area">

        <!-- TAB 1: BẢN ĐỒ HUẾ SỐ CHUYÊN SÂU -->
        <div class="tab-view active" id="tab-map">
          <!-- Weather Floating Banner -->
          <div class="weather-banner">
            <span class="weather-icon">🌧️</span>
            <div class="weather-info">
              <div class="weather-title">Mưa ngâu Cố Đô • 24.5°C</div>
              <div class="weather-desc">Mệ Huế gợi ý ưu tiên không gian trong nhà</div>
            </div>
            <button class="weather-btn" onclick="filterPlaces('INDOOR')">Đổi hướng</button>
          </div>

          <!-- Category Filter Bar (20+ địa danh) -->
          <div class="map-filter-bar">
            <div class="filter-chip active" onclick="filterCategory('ALL', this)">🌟 Tất cả (20+)</div>
            <div class="filter-chip" onclick="filterCategory('HISTORICAL', this)">🏛️ Di tích Cố Đô</div>
            <div class="filter-chip" onclick="filterCategory('CAFE', this)">☕ Cà phê sống ảo</div>
            <div class="filter-chip" onclick="filterCategory('CUISINE', this)">🍜 Món đặc sản</div>
            <div class="filter-chip" onclick="filterCategory('SCENIC_VIEW', this)">📸 View đêm & hoàng hôn</div>
            <div class="filter-chip" onclick="filterCategory('OUTSKIRTS_ECO', this)">🌲 Ngoại thành sinh thái</div>
            <div class="filter-chip" onclick="filterCategory('UTILITY', this)">🚲 Thuê xe & Cây xăng</div>
          </div>

          <!-- Leaflet Map Container -->
          <div id="map"></div>

          <!-- Map Layer Switcher Pill -->
          <div class="map-layer-pill" id="mapLayerPill" onclick="toggleMapType()" title="Đổi kiểu bản đồ (Google / Vệ tinh / Esri)">
            <span id="mapLayerIcon">🛰️</span> <span id="mapLayerText">Vệ tinh</span>
          </div>

          <!-- Bottom Sheet Chi Tiết Điểm Đến -->
          <div class="place-sheet" id="placeSheet">
            <div class="sheet-handle" onclick="closeSheet()"></div>
            <img id="sheetImg" class="sheet-img" src="" alt="Thumbnail" />
            <div class="sheet-title" id="sheetTitle">Tên Địa Danh</div>
            <div class="sheet-address" id="sheetAddress">📍 Địa chỉ</div>
            <div class="sheet-badges">
              <span class="sheet-tag gp" id="sheetGp">+25 GP</span>
              <span class="sheet-tag" id="sheetEnv">OUTDOOR</span>
              <span class="sheet-tag" id="sheetPrice">Miễn phí</span>
            </div>
            <p id="sheetDesc" style="font-size: 12px; color: #4B5563; line-height: 1.4; margin-bottom: 12px;"></p>
            <div class="sheet-actions">
              <button class="btn-action btn-ai-voice" onclick="playAiNarration()">
                <span>🎙️</span> Nghe AI Thuyết Minh
              </button>
              <button class="btn-action btn-add-route" onclick="addToItineraryFromSheet()">
                <span>➕</span> Thêm Vào Lộ Trình
              </button>
            </div>
          </div>
        </div>

        <!-- TAB 2: LỘ TRÌNH & CHỈ ĐƯỜNG ĐA ĐIỂM -->
        <div class="tab-view" id="tab-itinerary">
          <div class="itinerary-container">
            <div class="progress-box">
              <div class="progress-header">
                <span>Tiến độ khám phá hành trình</span>
                <strong id="itineraryPercentText" style="color: var(--imperial-gold); font-size: 16px;">67%</strong>
              </div>
              <div class="progress-bar-wrap">
                <div class="progress-bar-fill" id="itineraryProgressBar" style="width: 67%;"></div>
              </div>
              <p style="font-size: 11px; opacity: 0.9;" id="itineraryStatusMsg">
                Đã hoàn thành 2/3 điểm. Check-in nốt Cầu Tràng Tiền để mở khóa 100% và nhận Chứng nhận Hoàng Gia!
              </p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <h4 style="font-size: 14px; font-weight: 800; color: #1E293B;">Chuỗi Điểm Đến (Thứ Tự Tối Ưu)</h4>
              <button onclick="triggerSimulatedCheckIn()" style="background: var(--royal-violet); color: white; border: none; padding: 6px 12px; border-radius: 12px; font-size: 11px; font-weight: 700; cursor: pointer;">
                📍 Giả lập GPS Check-in
              </button>
            </div>

            <div class="stops-list" id="stopsContainer">
              <!-- Rendered via JS -->
            </div>
          </div>
        </div>

        <!-- TAB 3: VÒNG QUAY MAY MẮN (RANDOM WHEEL) -->
        <div class="tab-view" id="tab-wheel">
          <div class="wheel-container">
            <div class="wheel-intro">
              <h3>VÒNG QUAY QUYẾT ĐỊNH ĐIỂM ĐẾN 🎲</h3>
              <p>Phân vân không biết đi đâu? Chọn tiêu chí bên dưới và để vận may Huế chọn giúp bạn!</p>
            </div>

            <div class="wheel-filter-chips">
              <button class="filter-chip active" onclick="setWheelCategory('CAFE', this)">☕ Cà phê sống ảo</button>
              <button class="filter-chip" onclick="setWheelCategory('CUISINE', this)">🍜 Món ngon đặc sản</button>
              <button class="filter-chip" onclick="setWheelCategory('SCENIC_VIEW', this)">📸 Check-in view đẹp</button>
              <button class="filter-chip" onclick="setWheelCategory('OUTSKIRTS_ECO', this)">🌲 Ngoại thành</button>
            </div>

            <div class="wheel-canvas-wrap">
              <div class="wheel-pointer"></div>
              <canvas id="wheel-canvas" width="290" height="290"></canvas>
              <div class="wheel-center-btn" onclick="spinTheWheel()">QUAY</div>
            </div>

            <button class="spin-action-btn" onclick="spinTheWheel()">
              <span>✨</span> QUAY NGAY BẰNG VẬN MAY!
            </button>
          </div>
        </div>

        <!-- TAB 4: TRỢ LÝ O HUẾ AI 24/7 -->
        <div class="tab-view" id="tab-ai">
          <div class="chat-container">
            <div class="chat-messages" id="chatMessages">
              <div class="chat-bubble msg-ai">
                <div class="ai-avatar-row">
                  <div class="ai-avatar">👑</div>
                  <strong>Mệ Huế (AI Guide)</strong>
                </div>
                Dạ mệ chào quý khách! Mệ rất hân hạnh được đồng hành cùng bạn qua 13 đời vua triều Nguyễn và phong vị ẩm thực Cố Đô. Bạn đang muốn tìm hiểu về điển tích nào, hay cần mệ gợi ý điểm thưởng trà ngày mưa?
              </div>
            </div>

            <div class="quick-chips-bar">
              <div class="quick-chip" onclick="sendPrompt('Kể cho tôi nghe về lịch sử Cầu Tràng Tiền')">🌉 Cầu Tràng Tiền</div>
              <div class="quick-chip" onclick="sendPrompt('Món ăn vặt nào ngon nhất quanh Hoàng Thành?')">🍜 Bún bò & Cơm hến</div>
              <div class="quick-chip" onclick="sendPrompt('Quán cà phê muối nào chuẩn vị Huế?')">☕ Cà phê muối gốc</div>
              <div class="quick-chip" onclick="sendPrompt('Trời mưa Huế thì nên đi đâu?')">🌧️ Điểm ngày mưa</div>
            </div>

            <div class="chat-input-row">
              <input type="text" id="chatInput" class="chat-input" placeholder="Hỏi Mệ Huế về văn hóa, món ngon..." onkeypress="handleEnter(event)" />
              <button class="chat-send-btn" onclick="sendUserMessage()">➤</button>
            </div>
          </div>
        </div>

        <!-- TAB 5: ĐIỂM XANH & VINH DANH -->
        <div class="tab-view" id="tab-green">
          <div class="green-container">
            <div class="green-stat-card">
              <div style="font-size: 13px; opacity: 0.9;">Hồ Sơ Du Lịch Xanh Cố Đô</div>
              <div class="green-pts-val" id="profilePts">185 GP</div>
              <div style="font-size: 12px; color: #86EFAC;">🌱 Đã giảm thiểu 5.6 kg CO2 bằng xe đạp và đi bộ</div>
            </div>

            <h4 style="font-size: 14px; font-weight: 800; color: #1E293B; margin-bottom: 10px;">Huy Hiệu Đạt Được</h4>
            <div class="badges-grid">
              <div class="badge-card unlocked">
                <div style="font-size: 26px;">🥉</div>
                <h4>Khám Phá Sơ Khởi</h4>
                <p>Mở khóa di tích đầu tiên</p>
              </div>
              <div class="badge-card unlocked">
                <div style="font-size: 26px;">🌿</div>
                <h4>Chiến Binh Xanh</h4>
                <p>Tích lũy 100 Điểm Xanh</p>
              </div>
              <div class="badge-card">
                <div style="font-size: 26px; filter: grayscale(1);">👑</div>
                <h4>Học Giả Cố Đô</h4>
                <p>Khám phá 100% di tích</p>
              </div>
            </div>

            <div style="margin-top: 20px;">
              <button class="spin-action-btn" onclick="showRoyalCertificate()" style="background: linear-gradient(135deg, var(--imperial-gold), #B45309); color: #000;">
                <span>📜</span> Xem Chứng Nhận E-Certificate
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Navigation Bar (5 Tabs) -->
      <div class="bottom-nav">
        <button class="nav-btn active" onclick="switchTab('tab-map', this)">
          <span class="nav-icon">🗺️</span>
          <span>Bản Đồ</span>
        </button>
        <button class="nav-btn" onclick="switchTab('tab-itinerary', this)">
          <span class="nav-icon">🧭</span>
          <span>Lộ Trình</span>
        </button>
        <button class="nav-btn" onclick="switchTab('tab-wheel', this)">
          <span class="nav-icon">🎲</span>
          <span>Vòng Quay</span>
        </button>
        <button class="nav-btn" onclick="switchTab('tab-ai', this)">
          <span class="nav-icon">💬</span>
          <span>O Huế AI</span>
        </button>
        <button class="nav-btn" onclick="switchTab('tab-green', this)">
          <span class="nav-icon">👑</span>
          <span>Chứng Nhận</span>
        </button>
      </div>

      <!-- E-Certificate Modal Dialog -->
      <div class="cert-overlay" id="certOverlay">
        <div class="cert-frame">
          <div class="cert-seal">👑</div>
          <div class="cert-title-gold">CHỨNG NHẬN VINH DANH</div>
          <div class="cert-main-heading">DU LỊCH CỐ ĐÔ HUẾ</div>
          <div style="width: 80px; height: 1px; background: var(--imperial-gold); margin: 0 auto 10px auto;"></div>
          <div style="font-size: 11px; color: #CBD5E1;">Chứng nhận Du khách tự túc:</div>
          <div class="cert-user-name">NGUYỄN CỐ ĐÔ</div>
          <div class="cert-desc">
            Đã hoàn thành xuất sắc 100% các cột mốc trong Hành Trình Tinh Hoa Cố Đô bằng lối sống xanh, đi bộ và đạp xe bảo vệ di sản sông Hương.
          </div>
          <div class="cert-code-chip" id="certCodeDisplay">MÃ XÁC THỰC: HUEGO-CERT-2026-X89F</div>
          <button class="cert-share-btn" onclick="shareCertificate()">
            📱 Chia Sẻ Lên Facebook / Zalo
          </button>
          <button class="cert-close-btn" onclick="closeCert()">Đóng lại</button>
        </div>
      </div>

    </div>
  </div>

  <script>
    // Live Clock
    function updateClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      document.getElementById('live-clock').innerText = \`\${h}:\${m}\`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    function toggleFullscreen() {
      document.body.classList.toggle('fullscreen-mode');
    }

    // 20+ Iconic Hue Places Database
    const huePlaces = [
      { id: '1', name: 'Đại Nội Huế (Hoàng Thành)', cat: 'HISTORICAL', lat: 16.4697, lng: 107.5779, points: 30, env: 'OUTDOOR', price: '200.000đ', img: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375', desc: 'Kinh thành triều Nguyễn, di sản văn hóa thế giới UNESCO với kiến trúc cung điện tráng lệ.' },
      { id: '2', name: 'Chùa Thiên Mụ (Linh Mụ Tự)', cat: 'HISTORICAL', lat: 16.4529, lng: 107.5451, points: 25, env: 'OUTDOOR', price: 'Miễn phí', img: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647', desc: 'Ngôi chùa cổ kính hơn 400 năm tuổi soi bóng bên dòng sông Hương thơ mộng.' },
      { id: '3', name: 'Bảo tàng Cổ vật Cung đình', cat: 'HISTORICAL', lat: 16.4715, lng: 107.5812, points: 25, env: 'INDOOR', price: '50.000đ', img: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424', desc: 'Điện Long An lưu giữ ngàn bảo vật vàng son triều Nguyễn, không gian trong nhà mát mẻ.' },
      { id: '4', name: 'Lăng Khải Định (Ứng Lăng)', cat: 'HISTORICAL', lat: 16.3991, lng: 107.5905, points: 25, env: 'SEMI_OUTDOOR', price: '150.000đ', img: 'https://images.unsplash.com/photo-1548013146-72479768bada', desc: 'Tuyệt tác kiến trúc khảm sành sứ đỉnh cao Đông - Tây.' },
      { id: '5', name: 'Lăng Tự Đức (Khiêm Lăng)', cat: 'HISTORICAL', lat: 16.4328, lng: 107.5658, points: 25, env: 'SEMI_OUTDOOR', price: '150.000đ', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', desc: 'Lăng tẩm thi vị bậc nhất với hồ Lưu Khiêm và đảo Tịnh Khiêm.' },
      { id: '6', name: 'Cầu Tràng Tiền', cat: 'SCENIC_VIEW', lat: 16.4683, lng: 107.5947, points: 20, env: 'OUTDOOR', price: 'Miễn phí', img: 'https://images.unsplash.com/photo-1528127269322-539801943592', desc: 'Cây cầu biểu tượng 6 vài 12 nhịp bắc qua sông Hương, đổi màu lung linh về đêm.' },
      { id: '7', name: 'Cầu Dã Viên (Hoàng Hôn)', cat: 'SCENIC_VIEW', lat: 16.4592, lng: 107.5721, points: 20, env: 'OUTDOOR', price: 'Miễn phí', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', desc: 'Góc ngắm hoàng hôn đỏ rực buông xuống cồn Dã Viên yên bình.' },
      { id: '8', name: 'Đồi Vọng Cảnh', cat: 'OUTSKIRTS_ECO', lat: 16.4258, lng: 107.5512, points: 30, env: 'OUTDOOR', price: 'Miễn phí', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', desc: 'Nơi ngắm khúc uốn dòng sông Hương đẹp nhất từ trên cao thông reo lộng gió.' },
      { id: '9', name: 'Đồi Thiên An & Hồ Thủy Tiên', cat: 'OUTSKIRTS_ECO', lat: 16.4087, lng: 107.5756, points: 30, env: 'OUTDOOR', price: 'Miễn phí', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23', desc: 'Đồi thông lãng mạn và tượng Rồng khổng lồ nổi tiếng trên truyền thông thế giới.' },
      { id: '10', name: 'Rừng Ngập Mặn Rú Chá', cat: 'OUTSKIRTS_ECO', lat: 16.5512, lng: 107.6189, points: 35, env: 'OUTDOOR', price: 'Miễn phí', img: 'https://images.unsplash.com/photo-1448375240586-882707db888b', desc: 'Khu rừng ngập mặn nguyên sinh duy nhất trên đầm phá Tam Giang rực rỡ mùa thu.' },
      { id: '11', name: 'Làng Hương Trầm Thủy Xuân', cat: 'HISTORICAL', lat: 16.4358, lng: 107.5647, points: 25, env: 'SEMI_OUTDOOR', price: 'Miễn phí', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', desc: 'Làng nghề hương trầm rực rỡ sắc màu, góc sống ảo áo dài quốc dân.' },
      { id: '12', name: 'Cà Phê Muối Gốc Nguyễn Huệ', cat: 'CAFE', lat: 16.4589, lng: 107.5898, points: 20, env: 'INDOOR', price: '25.000đ', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd', desc: 'Nơi khởi nguồn món cà phê muối béo mặn gây nghiện đất Cố Đô.' },
      { id: '13', name: 'Tân Cafe Vintage Cố Đô', cat: 'CAFE', lat: 16.4635, lng: 107.5882, points: 20, env: 'INDOOR', price: '35.000đ', img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24', desc: 'Không gian gạch thô hoài niệm thập niên 80s chụp ảnh cực chất.' },
      { id: '14', name: 'Không Gian Trà Cung Đình Kim Long', cat: 'CUISINE', lat: 16.4608, lng: 107.5601, points: 20, env: 'INDOOR', price: '60.000đ', img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3', desc: 'Thưởng trà thảo mộc 26 vị tiến vua trong nhà rường cổ kính ngày mưa.' },
      { id: '15', name: 'Bún Bò Huế Mụ Rơi', cat: 'CUISINE', lat: 16.4745, lng: 107.5862, points: 20, env: 'INDOOR', price: '45.000đ', img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43', desc: 'Bún bò chuẩn vị Huế nước hầm sả ruốc ngọt thanh thơm lừng.' },
      { id: '16', name: 'Cơm Hến Hoa Đông Cồn Hến', cat: 'CUISINE', lat: 16.4789, lng: 107.6012, points: 20, env: 'SEMI_OUTDOOR', price: '25.000đ', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624', desc: 'Tô cơm hến cay nồng tóp mỡ giòn rụm giữa dòng sông Hương.' },
      { id: '17', name: 'Bánh Bèo Nậm Lọc Bà Đỏ', cat: 'CUISINE', lat: 16.4615, lng: 107.5998, points: 20, env: 'INDOOR', price: '50.000đ', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', desc: 'Các món bánh Huế gia truyền tôm chấy đỏ au nức tiếng.' },
      { id: '18', name: 'Chè Hẻm 20 Món Hùng Vương', cat: 'CUISINE', lat: 16.4621, lng: 107.5932, points: 15, env: 'INDOOR', price: '15.000đ', img: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc', desc: '20 nồi chè ngọt mát: chè bắp, chè hạt sen long nhãn, chè khoai môn.' },
      { id: '19', name: 'Trạm Xe Đạp Xanh Hiển Nhơn', cat: 'UTILITY', lat: 16.4705, lng: 107.5815, points: 15, env: 'OUTDOOR', price: '10.000đ/h', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e', desc: 'Trạm xe đạp công cộng quét mã QR thông minh ngay cổng Đại Nội.' },
      { id: '20', name: 'Cây Xăng Petrolimex Lê Lợi', cat: 'UTILITY', lat: 16.4632, lng: 107.5862, points: 5, env: 'OUTDOOR', price: '24/7', img: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c', desc: 'Trạm cấp nhiên liệu tiêu chuẩn trung tâm bờ Nam sông Hương.' }
    ];

    // Initialize Leaflet Map with Google Maps & Esri Basemaps (100% Free, No Watermarks)
    let map, markersLayer;
    let currentTileLayer;
    let tileLayerIndex = 0;
    let tileLayers = [];

    function initMap() {
      map = L.map('map', { zoomControl: false }).setView([16.4697, 107.5779], 14);

      // 1. Google Maps Road (Tên đường tiếng Việt, sông Hương, cầu Tràng Tiền)
      const googleStreets = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps',
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20
      });

      // 2. Google Maps Hybrid (Ảnh vệ tinh chi tiết kèm tên đường & địa danh)
      const googleHybrid = L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps Vệ Tinh',
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20
      });

      // 3. Esri World Street Map (Hệ thống bản đồ địa lý mở Esri ArcGIS)
      const esriStreets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri ArcGIS',
        maxZoom: 19
      });

      tileLayers = [
        { name: 'Đường phố (Google)', nextText: 'Vệ tinh', icon: '🛰️', layer: googleStreets },
        { name: 'Vệ tinh (Google)', nextText: 'Esri Cố Đô', icon: '🏛️', layer: googleHybrid },
        { name: 'Bản đồ GIS (Esri)', nextText: 'Đường phố', icon: '🗺️', layer: esriStreets }
      ];

      currentTileLayer = googleStreets;
      currentTileLayer.addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      markersLayer = L.layerGroup().addTo(map);
      renderMapMarkers(huePlaces);
    }

    function toggleMapType() {
      if (!map || tileLayers.length === 0) return;
      map.removeLayer(currentTileLayer);
      tileLayerIndex = (tileLayerIndex + 1) % tileLayers.length;
      const nextConfig = tileLayers[tileLayerIndex];
      currentTileLayer = nextConfig.layer;
      currentTileLayer.addTo(map);

      const iconEl = document.getElementById('mapLayerIcon');
      const textEl = document.getElementById('mapLayerText');
      if (iconEl) iconEl.textContent = nextConfig.icon;
      if (textEl) textEl.textContent = nextConfig.nextText;
      showToast('Chế độ: ' + nextConfig.name);
    }

    function showToast(msg) {
      let toast = document.getElementById('appToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'appToast';
        toast.style.cssText = 'position:fixed; bottom:70px; left:50%; transform:translateX(-50%); background:rgba(15,23,42,0.92); color:white; padding:8px 16px; border-radius:20px; font-size:12px; font-weight:700; z-index:9999; backdrop-filter:blur(8px); transition:opacity 0.3s; pointer-events:none; box-shadow:0 4px 14px rgba(0,0,0,0.3);';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.style.opacity = '1';
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, 2200);
    }

    function renderMapMarkers(places) {
      markersLayer.clearLayers();
      places.forEach(p => {
        let pinColor = '#582C83';
        let pinIcon = '🏛️';
        if (p.cat === 'CAFE') { pinColor = '#D97706'; pinIcon = '☕'; }
        if (p.cat === 'CUISINE') { pinColor = '#DC2626'; pinIcon = '🍜'; }
        if (p.cat === 'SCENIC_VIEW') { pinColor = '#1E6B7B'; pinIcon = '📸'; }
        if (p.cat === 'OUTSKIRTS_ECO') { pinColor = '#15803D'; pinIcon = '🌲'; }
        if (p.cat === 'UTILITY') { pinColor = '#2563EB'; pinIcon = '🚲'; }

        const customIcon = L.divIcon({
          className: 'custom-pin',
          html: \`<div style="background:\${pinColor}; width:34px; height:34px; border-radius:50%; border:2.5px solid white; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(0,0,0,0.3); font-size:16px;">\${pinIcon}</div>\`,
          iconSize: [34, 34],
          iconAnchor: [17, 17]
        });

        const marker = L.marker([p.lat, p.lng], { icon: customIcon }).addTo(markersLayer);
        marker.on('click', () => showPlaceDetails(p));

        // Radar Geofence circle
        L.circle([p.lat, p.lng], {
          radius: 40,
          color: '#D4AF37',
          fillColor: '#D4AF37',
          fillOpacity: 0.18,
          weight: 1.5
        }).addTo(markersLayer);
      });
    }

    let activePlace = null;
    function showPlaceDetails(place) {
      activePlace = place;
      document.getElementById('sheetImg').src = place.img;
      document.getElementById('sheetTitle').innerText = place.name;
      document.getElementById('sheetAddress').innerText = '📍 ' + (place.lat.toFixed(4) + ', ' + place.lng.toFixed(4));
      document.getElementById('sheetGp').innerText = '+' + place.points + ' GP';
      document.getElementById('sheetEnv').innerText = place.env;
      document.getElementById('sheetPrice').innerText = place.price;
      document.getElementById('sheetDesc').innerText = place.desc;
      document.getElementById('placeSheet').classList.add('open');
    }

    function closeSheet() {
      document.getElementById('placeSheet').classList.remove('open');
    }

    function filterCategory(cat, el) {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
      if (cat === 'ALL') {
        renderMapMarkers(huePlaces);
      } else {
        const filtered = huePlaces.filter(p => p.cat === cat);
        renderMapMarkers(filtered);
      }
    }

    function filterPlaces(env) {
      const filtered = huePlaces.filter(p => p.env === env);
      renderMapMarkers(filtered);
      alert('AI đã chuyển sang các điểm tham quan trong nhà ngày mưa!');
    }

    function playAiNarration() {
      if (!activePlace) return;
      alert('🎙️ Mệ Huế: "Dạ thưa quý khách, chào mừng người ghé thăm ' + activePlace.name + '. ' + activePlace.desc + '"');
    }

    // TAB 2: ITINERARY LOGIC
    let itineraryStops = [
      { id: 1, name: 'Đại Nội Huế (Hoàng Thành)', desc: '08:30 • Mở khóa thành công (+30 GP)', visited: true },
      { id: 2, name: 'Bảo tàng Cổ vật Cung đình', desc: '10:00 • Mở khóa thành công (+25 GP)', visited: true },
      { id: 3, name: 'Cầu Tràng Tiền (Ngắm Sông Hương)', desc: '16:30 • Chờ check-in bán kính 35m', visited: false }
    ];

    function renderItinerary() {
      const container = document.getElementById('stopsContainer');
      container.innerHTML = '';
      itineraryStops.forEach((s, idx) => {
        const card = document.createElement('div');
        card.className = 'stop-card ' + (s.visited ? 'visited' : '');
        card.innerHTML = \`
          <div class="stop-idx">\${s.visited ? '✓' : idx + 1}</div>
          <div class="stop-info">
            <div class="stop-name">\${s.name}</div>
            <div class="stop-sub">\${s.desc}</div>
          </div>
          <div style="font-size: 18px; color: #94A3B8;">⋮⋮</div>
        \`;
        container.appendChild(card);
      });
    }

    function triggerSimulatedCheckIn() {
      itineraryStops[2].visited = true;
      itineraryStops[2].desc = 'Vừa mở khóa tại chỗ (+20 GP)';
      document.getElementById('itineraryPercentText').innerText = '100%';
      document.getElementById('itineraryProgressBar').style.width = '100%';
      document.getElementById('itineraryStatusMsg').innerText = '🎉 XUẤT SẮC! Bạn đã hoàn thành 100% Lộ trình Du lịch Cố Đô!';
      document.getElementById('userTotalPoints').innerText = '185 GP';
      document.getElementById('profilePts').innerText = '185 GP';
      renderItinerary();
      showRoyalCertificate();
    }

    function showRoyalCertificate() {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      document.getElementById('certOverlay').style.display = 'flex';
    }

    function closeCert() {
      document.getElementById('certOverlay').style.display = 'none';
    }

    function shareCertificate() {
      alert('Đã tạo liên kết chia sẻ Chứng nhận Hoàng Gia! Bạn có thể lưu ảnh hoặc đăng lên Facebook Stories / Zalo.');
      closeCert();
    }

    function addToItineraryFromSheet() {
      if (!activePlace) return;
      itineraryStops.push({
        id: itineraryStops.length + 1,
        name: activePlace.name,
        desc: 'Mới thêm vào lộ trình • Bán kính 35m',
        visited: false
      });
      renderItinerary();
      closeSheet();
      alert('Đã thêm [' + activePlace.name + '] vào lộ trình của bạn!');
    }

    // TAB 3: FORTUNE WHEEL LOGIC
    const wheelCanvas = document.getElementById('wheel-canvas');
    const ctx = wheelCanvas.getContext('2d');
    const wheelLabels = [
      'Cà Phê Muối', 'Đại Nội Huế', 'Chè 20 Món', 'Đồi Vọng Cảnh',
      'Cầu Tràng Tiền', 'Lăng Khải Định', 'Trà Kim Long', 'Làng Hương'
    ];
    const wheelColors = ['#582C83', '#D4AF37', '#1E6B7B', '#E65100', '#2E7D32', '#C2185B', '#00897B', '#F57F17'];

    function drawWheel() {
      const numSlices = wheelLabels.length;
      const arc = (2 * Math.PI) / numSlices;
      const radius = wheelCanvas.width / 2;
      ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

      for (let i = 0; i < numSlices; i++) {
        const angle = i * arc;
        ctx.beginPath();
        ctx.fillStyle = wheelColors[i];
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, angle, angle + arc);
        ctx.lineTo(radius, radius);
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + arc / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Plus Jakarta Sans';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.fillText(wheelLabels[i], radius - 20, 4);
        ctx.restore();
      }
    }
    drawWheel();

    let isSpinning = false;
    let currentDeg = 0;
    function spinTheWheel() {
      if (isSpinning) return;
      isSpinning = true;
      const winningIdx = Math.floor(Math.random() * wheelLabels.length);
      const sliceAngle = 360 / wheelLabels.length;
      const extraSpins = 360 * 5;
      const targetAngle = extraSpins + (360 - (winningIdx * sliceAngle + sliceAngle / 2));
      currentDeg += targetAngle;

      wheelCanvas.style.transform = 'rotate(' + currentDeg + 'deg)';

      setTimeout(() => {
        isSpinning = false;
        confetti({ particleCount: 100, spread: 60 });
        alert('🎉 VÒNG QUAY ĐÃ QUYẾT ĐỊNH: [' + wheelLabels[winningIdx] + ']! Hãy bắt đầu di chuyển đến đây ngay nào!');
      }, 4200);
    }

    function setWheelCategory(cat, el) {
      document.querySelectorAll('.wheel-filter-chips .filter-chip').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
    }

    // TAB 4: CHAT AI LOGIC
    function sendUserMessage() {
      const input = document.getElementById('chatInput');
      const text = input.value.trim();
      if (!text) return;

      appendChat('msg-user', text);
      input.value = '';

      setTimeout(() => {
        let aiReply = 'Dạ thưa quý khách, mệ đã ghi nhận! Huế mùa ni rất đẹp, người nhớ ghé thử ly cà phê muối hoặc dạo bước ngắm hoàng hôn trên cầu Tràng Tiền nhen.';
        if (text.toLowerCase().includes('cầu tràng tiền')) {
          aiReply = 'Dạ, Cầu Tràng Tiền được hãng Eiffel thiết kế gồm 6 vài 12 nhịp thép duyên dáng soi bóng sông Hương. Buổi tối người ghé phố đi bộ chân cầu ăn bánh mì bột lọc giòn rụm là tuyệt nhất!';
        } else if (text.toLowerCase().includes('mưa')) {
          aiReply = 'Mưa Huế nổi tiếng lãng mạn nhưng se lạnh. Mệ khuyên người ghé Bảo tàng Cổ vật Cung đình hoặc vào nhà rường Kim Long uống tách trà sen nóng nhen!';
        }
        appendChat('msg-ai', aiReply);
      }, 800);
    }

    function appendChat(cls, text) {
      const container = document.getElementById('chatMessages');
      const bubble = document.createElement('div');
      bubble.className = 'chat-bubble ' + cls;
      if (cls === 'msg-ai') {
        bubble.innerHTML = \`<div class="ai-avatar-row"><div class="ai-avatar">👑</div><strong>Mệ Huế (AI Guide)</strong></div>\${text}\`;
      } else {
        bubble.innerText = text;
      }
      container.appendChild(bubble);
      container.scrollTop = container.scrollHeight;
    }

    function sendPrompt(text) {
      document.getElementById('chatInput').value = text;
      sendUserMessage();
    }

    function handleEnter(e) {
      if (e.key === 'Enter') sendUserMessage();
    }

    // NAVIGATION TABS
    function switchTab(tabId, el) {
      document.querySelectorAll('.tab-view').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      el.classList.add('active');

      if (tabId === 'tab-map') {
        setTimeout(() => map.invalidateSize(), 150);
      }
    }

    // Startup
    window.addEventListener('load', () => {
      initMap();
      renderItinerary();
    });
  </script>
</body>
</html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  }

  @Get('connect')
  getConnectGuide(@Res() res: Response) {
    const wifiUrl = 'http://192.168.1.156:3000/app';
    const tunnelUrl = 'https://tame-icons-win.loca.lt/app';
    const tunnelPass = '42.112.83.248';

    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Kết Nối Điện Thoại – HUEGO App</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      background: radial-gradient(circle at top, #1E102D 0%, #0F172A 100%);
      color: #F8FAFC;
      font-family: 'Plus Jakarta Sans', sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .card-wrap {
      max-width: 840px;
      width: 100%;
      background: #1E293B;
      border: 1px solid #334155;
      border-radius: 28px;
      padding: 32px;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0,0,0,0.6);
    }
    h1 { color: #D4AF37; font-size: 24px; margin-bottom: 6px; font-weight: 800; }
    p.sub { color: #94A3B8; font-size: 14px; margin-bottom: 24px; }
    .grid-methods {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      text-align: left;
    }
    @media (max-width: 768px) {
      .grid-methods { grid-template-columns: 1fr; }
    }
    .box-method {
      background: #0F172A;
      border: 1.5px solid #334155;
      border-radius: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .box-title { font-size: 15px; font-weight: 800; color: white; margin-bottom: 6px; }
    .badge-tag { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 800; margin-bottom: 14px; }
    .qr-holder { background: white; padding: 10px; border-radius: 16px; margin-bottom: 12px; display: inline-block; }
    .url-box {
      background: #1E293B;
      color: #38BDF8;
      padding: 8px 12px;
      border-radius: 10px;
      font-size: 13px;
      font-family: monospace;
      word-break: break-all;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 8px;
    }
    .note-text { font-size: 12px; color: #94A3B8; line-height: 1.4; }
  </style>
</head>
<body>
  <div class="card-wrap">
    <h1>📱 QUÉT MÃ ĐỂ MỞ APP TRÊN ĐIỆN THOẠI CỦA BẠN</h1>
    <p class="sub">Mở Camera hoặc ứng dụng Zalo trên điện thoại quét 1 trong 2 mã dưới đây:</p>

    <div class="grid-methods">
      <!-- CÁCH 1: QUA WI-FI NỘI BỘ -->
      <div class="box-method">
        <div class="box-title">CÁCH 1: DÙNG MẠNG WI-FI</div>
        <div class="badge-tag" style="background: #582C83; color: white;">Khuyên Dùng • Tốc Độ Cao</div>
        <div class="qr-holder">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(wifiUrl)}" width="180" height="180" alt="QR WiFi" />
        </div>
        <div class="url-box">${wifiUrl}</div>
        <div class="note-text">
          Yêu cầu: Điện thoại và máy tính kết nối <strong>cùng mạng Wi-Fi</strong>.
        </div>
      </div>

      <!-- CÁCH 2: QUA 4G / INTERNET TỪ XA -->
      <div class="box-method">
        <div class="box-title">CÁCH 2: DÙNG 4G / 5G BẤT KỲ ĐÂU</div>
        <div class="badge-tag" style="background: #059669; color: white;">Không Cần Chung Wi-Fi</div>
        <div class="qr-holder">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(tunnelUrl)}" width="180" height="180" alt="QR 4G" />
        </div>
        <div class="url-box">${tunnelUrl}</div>
        <div class="note-text">
          Nếu trang yêu cầu <em>"Tunnel Password"</em>, bạn nhập: <strong style="color: #FBBF24;">${tunnelPass}</strong> rồi bấm <strong>Submit</strong> là vào ngay!
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  }
}
