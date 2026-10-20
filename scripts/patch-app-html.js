const fs = require('fs');
let html = fs.readFileSync('web-hue4u/public/app/index.html', 'utf8');

// 1. Add location-service.js to head if not present
if (!html.includes('src="../js/location-service.js"')) {
  html = html.replace(
    '<script src="../js/image-helper.js"></script>',
    '<script src="../js/image-helper.js"></script>\n  <script src="../js/location-service.js"></script>'
  );
  console.log('1. Added location-service.js to head');
}

// 2. Replace weather-banner CSS with sleek Weather Widget CSS & Zoom control positioning
const oldWeatherCss = `    /* Floating Weather Banner */
    .weather-banner {
      position: absolute;
      bottom: 24px;
      right: 14px;
      z-index: 500;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(12px);
      border-radius: 18px;
      padding: 6px 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(88,44,131,0.15);
      max-width: 210px;
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
    }`;

const newWeatherCss = `    /* Leaflet Zoom control position cleanly above location controls */
    .leaflet-bottom.leaflet-right .leaflet-control-zoom {
      margin-bottom: 125px !important;
      margin-right: 14px !important;
      border-radius: 14px !important;
      overflow: hidden !important;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16) !important;
      border: 1.5px solid rgba(88, 44, 131, 0.18) !important;
    }

    /* Sleek Floating Weather Pill & Popup Dropdown (Top Right of Map) */
    .weather-widget-container {
      position: absolute;
      top: 10px;
      right: 12px;
      z-index: 500;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      font-family: inherit;
    }
    .weather-pill {
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1.5px solid rgba(88, 44, 131, 0.18);
      border-radius: 20px;
      padding: 5px 12px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
      cursor: pointer;
      user-select: none;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .weather-pill:active { transform: scale(0.96); }
    .weather-pill:hover { background: #FAF5FF; border-color: rgba(88, 44, 131, 0.35); }
    .weather-icon { font-size: 15px; line-height: 1; }
    .weather-pill-text {
      font-size: 11.5px;
      font-weight: 700;
      color: #1E293B;
      white-space: nowrap;
    }
    .weather-arrow {
      font-size: 10px;
      color: var(--royal-violet);
      transition: transform 0.2s ease;
      margin-left: 2px;
    }
    .weather-widget-container.active .weather-arrow {
      transform: rotate(180deg);
    }
    .weather-card-popup {
      display: none;
      margin-top: 6px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: 16px;
      border: 1px solid rgba(88, 44, 131, 0.15);
      box-shadow: 0 8px 24px rgba(46, 16, 101, 0.18);
      padding: 12px 14px;
      width: 250px;
      animation: weatherFadeDown 0.2s ease;
    }
    .weather-widget-container.active .weather-card-popup {
      display: block;
    }
    .weather-popup-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 8px;
    }
    .weather-title {
      font-size: 12.5px;
      font-weight: 800;
      color: #0F172A;
      line-height: 1.3;
    }
    .weather-desc {
      font-size: 10.5px;
      color: #64748B;
      line-height: 1.35;
      margin-top: 2px;
    }
    .weather-popup-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px dashed #E2E8F0;
    }
    .weather-btn {
      background: #F1F5F9;
      color: #334155;
      border: 1px solid #CBD5E1;
      border-radius: 10px;
      padding: 6px 8px;
      font-size: 10.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }
    .weather-btn:active { transform: scale(0.96); }
    .weather-btn.primary {
      background: var(--royal-violet);
      color: #FFFFFF;
      border-color: var(--royal-violet);
    }
    @keyframes weatherFadeDown {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }`;

const normHtml = html.replace(/\r\n/g, '\n');
if (normHtml.includes(oldWeatherCss)) {
  html = normHtml.replace(oldWeatherCss, newWeatherCss);
  console.log('2. Replaced weather CSS');
} else {
  console.log('2. Could not match old weather CSS directly');
}

// 3. Replace Weather HTML Banner with Weather Pill Container
const oldWeatherHtml = `          <!-- Weather Floating Compact Banner -->
          <div class="weather-banner" id="weatherBanner">
            <span class="weather-icon" id="weatherIcon">⛅</span>
            <div class="weather-info">
              <div class="weather-title" id="weatherTitle">Huế 27°C • Dịu mát</div>
              <div class="weather-desc" id="weatherDesc">Gợi ý khám phá di sản Cố Đô</div>
            </div>
            <div style="display:flex; gap:4px; align-items:center;">
              <button class="weather-btn" id="rainSimBtn" onclick="toggleRainSimulation()" title="Bật/Tắt mô phỏng thời tiết mưa để kiểm tra tự thích ứng" style="background:#475569; font-size:10px; padding:4px 6px;">🌧️ Mưa: TẮT</button>
              <button class="weather-btn" id="weatherFilterBtn" onclick="applyWeatherRecommendation()" style="font-size:10px; padding:4px 6px;">Đổi hướng</button>
            </div>
          </div>`;

const newWeatherHtml = `          <!-- Weather Floating Pill & Sleek Compact Dropdown -->
          <div class="weather-widget-container" id="weatherWidgetContainer">
            <div class="weather-pill" id="weatherPill" onclick="toggleWeatherWidget(event)" title="Xem chi tiết thời tiết Cố Đô">
              <span class="weather-icon" id="weatherIcon">⛅</span>
              <span class="weather-pill-text" id="weatherPillText">Huế 27°C • Dịu mát</span>
              <span class="weather-arrow">▾</span>
            </div>
            <div class="weather-card-popup" id="weatherCardPopup" onclick="event.stopPropagation()">
              <div class="weather-popup-header">
                <div style="flex:1;">
                  <div class="weather-title" id="weatherTitle">Huế 27°C • Dịu mát</div>
                  <div class="weather-desc" id="weatherDesc">Thời tiết thuận lợi cho các hoạt động di sản ngoài trời</div>
                </div>
              </div>
              <div class="weather-popup-actions">
                <button class="weather-btn" id="rainSimBtn" onclick="toggleRainSimulation()" title="Mô phỏng mưa">🌧️ Mưa: TẮT</button>
                <button class="weather-btn primary" id="weatherFilterBtn" onclick="applyWeatherRecommendation()">🏛️ Đổi hướng</button>
              </div>
            </div>
          </div>`;

if (html.includes(oldWeatherHtml)) {
  html = html.replace(oldWeatherHtml, newWeatherHtml);
  console.log('3. Replaced weather HTML');
} else {
  console.log('3. Could not match old weather HTML');
}

// 4. Update Header GPS badge
html = html.replace(
  '<span id="gpsAccuracyBadge" style="font-size:9px; background:rgba(255,255,255,0.15); padding:1px 5px; border-radius:8px; color:#E2E8F0;">📡 GPS: Đang dò...</span>',
  '<span id="gpsAccuracyBadge" onclick="if(window.huegoLocationUI){window.huegoLocationUI.onLocateBtnClick();}else{startGpsTracking();}" style="font-size:9px; background:rgba(255,255,255,0.15); padding:1px 5px; border-radius:8px; color:#E2E8F0; cursor:pointer;" title="Bấm để bật định vị">📡 GPS: Bật vị trí</span>'
);
console.log('4. Updated GPS accuracy badge');

// 5. Initialize HuegoMapLocationUI in initMap
const oldMapInit = `      markersClusterGroup = L.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 45
      }).addTo(map);`;

const newMapInit = `      markersClusterGroup = L.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        maxClusterRadius: 45
      }).addTo(map);

      // Khởi tạo bộ điều khiển Vị trí của tôi
      if (typeof HuegoMapLocationUI !== 'undefined') {
        window.huegoLocationUI = new HuegoMapLocationUI(map, {
          getNearbyPlaces: (lat, lng, count) => {
            if (!huePlaces) return [];
            return huePlaces.map(p => ({
              ...p,
              distance: window.HuegoLocationService.constructor.calculateDistanceMeters(lat, lng, p.lat, p.lng)
            })).sort((a, b) => a.distance - b.distance).slice(0, count);
          },
          onLocationUpdate: (pos) => {
            userLocation = pos;
            liveGpsAccuracy = pos.accuracy;
            const isGood = pos.accuracy <= 50;
            updateGpsBadge(pos.isSimulated ? 'Vị trí giả lập' : '±' + pos.accuracy + 'm', isGood);
          }
        });
      }`;

if (html.includes(oldMapInit)) {
  html = html.replace(oldMapInit, newMapInit);
  console.log('5. Added HuegoMapLocationUI to initMap');
} else {
  console.log('5. Could not match oldMapInit');
}

// 6. Update openSheet with distance & geofence
const oldSheetDist = `      // Tính cự ly từ vị trí người dùng
      let distText = place.lat.toFixed(4) + ', ' + place.lng.toFixed(4);
      if (userLocation) {
        const d = getDistanceKm(userLocation.lat, userLocation.lng, place.lat, place.lng);
        distText = (d < 1 ? Math.round(d * 1000) + ' m' : d.toFixed(1) + ' km') + ' • ' + (place.address || 'TP Huế');
      }
      document.getElementById('sheetAddress').innerText = '📍 ' + distText;`;

const newSheetDist = `      // Tính cự ly từ vị trí người dùng
      let distText = place.lat.toFixed(4) + ', ' + place.lng.toFixed(4);
      if (userLocation && typeof userLocation.lat === 'number') {
        const meters = window.HuegoLocationService ? window.HuegoLocationService.constructor.calculateDistanceMeters(userLocation.lat, userLocation.lng, place.lat, place.lng) : Math.round(getDistanceKm(userLocation.lat, userLocation.lng, place.lat, place.lng) * 1000);
        const dFormatted = window.HuegoLocationService ? window.HuegoLocationService.constructor.formatDistance(meters) : (meters + ' m');
        distText = 'Cách bạn ' + dFormatted + ' • ' + (place.address || 'TP Huế');
      }
      document.getElementById('sheetAddress').innerText = '📍 ' + distText;
      if (window.huegoLocationUI) {
        window.huegoLocationUI.showPlaceGeofence(place.lat, place.lng, place.name);
      }`;

if (html.includes(oldSheetDist)) {
  html = html.replace(oldSheetDist, newSheetDist);
  console.log('6. Updated sheet distance & geofence');
} else {
  console.log('6. Could not match oldSheetDist');
}

// 7. Clear geofence in closeSheet
const oldCloseSheet = `    function closeSheet() {
      document.getElementById('placeSheet').classList.remove('open');
    }`;
const newCloseSheet = `    function closeSheet() {
      document.getElementById('placeSheet').classList.remove('open');
      if (window.huegoLocationUI) window.huegoLocationUI.clearPlaceGeofence();
    }`;

if (html.includes(oldCloseSheet)) {
  html = html.replace(oldCloseSheet, newCloseSheet);
  console.log('7. Updated closeSheet');
} else {
  console.log('7. Could not match oldCloseSheet');
}

// 8. Update directions button to use client-side Apple/Google Maps url
const oldDir = `    function openGoogleMapsDirection() {
      if (!activePlace) return;
      const url = \`https://www.google.com/maps/dir/?api=1&destination=\${activePlace.lat},\${activePlace.lng}\`;
      window.open(url, '_blank');
    }`;
const newDir = `    function openGoogleMapsDirection() {
      if (!activePlace) return;
      const url = window.HuegoLocationService ? window.HuegoLocationService.constructor.getDirectionsUrl(activePlace.lat, activePlace.lng, activePlace.name) : \`https://www.google.com/maps/dir/?api=1&destination=\${activePlace.lat},\${activePlace.lng}\`;
      window.open(url, '_blank');
    }`;

if (html.includes(oldDir)) {
  html = html.replace(oldDir, newDir);
  console.log('8. Updated directions button');
} else {
  console.log('8. Could not match oldDir');
}

// 9. Update weather banner logic & toggleWeatherWidget
const oldWeatherBannerUI = `    function updateWeatherBannerUI() {
      const banner = document.getElementById('weatherBanner');
      const icon = document.getElementById('weatherIcon');
      const title = document.getElementById('weatherTitle');
      const desc = document.getElementById('weatherDesc');
      const simBtn = document.getElementById('rainSimBtn');
      if (!banner) return;`;

const newWeatherBannerUI = `    function toggleWeatherWidget(e) {
      if (e) e.stopPropagation();
      const c = document.getElementById('weatherWidgetContainer');
      if (c) c.classList.toggle('active');
    }
    document.addEventListener('click', (e) => {
      const c = document.getElementById('weatherWidgetContainer');
      if (c && c.classList.contains('active') && !c.contains(e.target)) {
        c.classList.remove('active');
      }
    });

    function updateWeatherBannerUI() {
      const pillText = document.getElementById('weatherPillText');
      const icon = document.getElementById('weatherIcon');
      const title = document.getElementById('weatherTitle');
      const desc = document.getElementById('weatherDesc');
      const simBtn = document.getElementById('rainSimBtn');`;

if (html.includes(oldWeatherBannerUI)) {
  html = html.replace(oldWeatherBannerUI, newWeatherBannerUI);
  console.log('9. Updated updateWeatherBannerUI & added toggleWeatherWidget');
} else {
  console.log('9. Could not match oldWeatherBannerUI');
}

// Also update weather text setters inside updateWeatherBannerUI
html = html.replace(
  `        if (title) title.innerText = \`Mưa Cố Đô • \${liveWeather && liveWeather.tempCelsius ? liveWeather.tempCelsius : 24.5}°C\${staleTag}\`;`,
  `        const tR = liveWeather && liveWeather.tempCelsius ? liveWeather.tempCelsius : 24.5;
        if (pillText) pillText.innerText = \`Huế \${tR}°C • Mưa\`;
        if (title) title.innerText = \`Mưa Cố Đô • \${tR}°C\${staleTag}\`;`
);
html = html.replace(
  `        if (title) title.innerText = \`Huế \${liveWeather && liveWeather.tempCelsius ? liveWeather.tempCelsius : 27}°C • Dịu mát\${staleTag}\`;`,
  `        const tF = liveWeather && liveWeather.tempCelsius ? liveWeather.tempCelsius : 27;
        if (pillText) pillText.innerText = \`Huế \${tF}°C • Dịu mát\`;
        if (title) title.innerText = \`Huế \${tF}°C • Dịu mát\${staleTag}\`;`
);

// 10. Update startGpsTracking to use HuegoLocationService and remove auto call from load
const oldTracking = `    // D. Giám sát GPS Thực tế liên tục (navigator.geolocation.watchPosition)
    function startGpsTracking() {
      if (!('geolocation' in navigator)) {
        updateGpsBadge('GPS: Không hỗ trợ', false);
        return;
      }
      navigator.geolocation.watchPosition(
        (pos) => {
          userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: Math.round(pos.coords.accuracy),
            timestamp: pos.timestamp || Date.now()
          };
          liveGpsAccuracy = userLocation.accuracy;
          const isGood = liveGpsAccuracy <= 50;
          updateGpsBadge('GPS: ±' + liveGpsAccuracy + 'm', isGood);
        },
        (err) => {
          console.warn('GPS watch error:', err.message);
          updateGpsBadge('GPS: Chưa định vị', false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 3000 }
      );
    }`;

const newTracking = `    // D. Giám sát GPS dùng chung qua HuegoLocationService (chỉ bật khi người dùng thao tác)
    function startGpsTracking() {
      if (!window.HuegoLocationService) return;
      window.HuegoLocationService.requestLocation(
        (pos) => {
          userLocation = pos;
          liveGpsAccuracy = pos.accuracy;
          const isGood = liveGpsAccuracy <= 50;
          updateGpsBadge(pos.isSimulated ? 'Vị trí giả lập' : '±' + liveGpsAccuracy + 'm', isGood);
        },
        (err) => {
          console.warn('GPS error:', err.message);
          updateGpsBadge('GPS: Chưa định vị', false);
        }
      );
    }`;

if (html.includes(oldTracking)) {
  html = html.replace(oldTracking, newTracking);
  console.log('10. Updated startGpsTracking');
} else {
  console.log('10. Could not match oldTracking');
}

// Check startup listener - remove auto startGpsTracking() on load!
html = html.replace(
  `    window.addEventListener('load', () => {
      initMap();
      renderItinerary();
      initAuth();
      loadLiveWeather();
      startGpsTracking();
    });`,
  `    window.addEventListener('load', () => {
      initMap();
      renderItinerary();
      initAuth();
      loadLiveWeather();
      // KHÔNG tự động gọi startGpsTracking() khi nạp trang để bảo đảm quyền riêng tư và quy định iOS Safari
    });`
);
console.log('11. Removed automatic startGpsTracking on page load');

// 12. Check simulated location in performRealUnlock
const oldUnlockCheck = `      if (!currentUser || !authToken) {
        showToast('Vui lòng vào thử demo hoặc đăng nhập trước khi check-in.');
        openAuthModal();
        return false;
      }`;
const newUnlockCheck = `      if (!currentUser || !authToken) {
        showToast('Vui lòng vào thử demo hoặc đăng nhập trước khi check-in.');
        openAuthModal();
        return false;
      }
      if (userLocation && userLocation.isSimulated) {
        showToast('⚠️ Bạn đang dùng Vị trí giả lập (Demo). Mở khóa nhận điểm GP yêu cầu tọa độ GPS thực tế của thiết bị!');
        return false;
      }`;

if (html.includes(oldUnlockCheck)) {
  html = html.replace(oldUnlockCheck, newUnlockCheck);
  console.log('12. Added simulated location protection in performRealUnlock');
}

fs.writeFileSync('web-hue4u/public/app/index.html', html, 'utf8');
console.log('ALL APP PATCHES APPLIED TO web-hue4u/public/app/index.html');
