/**
 * HUEGO - Shared Location Service & Leaflet Map UI Controller
 * Quản lý một navigator.geolocation.watchPosition duy nhất cho toàn ứng dụng.
 * Tối ưu hóa pin, hỗ trợ iOS Safari, kiểm tra HTTPS, hiển thị tiếng Việt thân thiện.
 */

(function(window) {
  'use strict';

  // ==========================================
  // 1. CORE LOCATION SERVICE (SINGLETON)
  // ==========================================
  class LocationService {
    constructor() {
      this.state = 'idle'; // 'idle' | 'requesting' | 'active' | 'denied' | 'unavailable' | 'timeout' | 'insecure'
      this.lastPosition = null;
      this.watchId = null;
      this.listeners = new Set();
      this.stateListeners = new Set();
      this.errorListeners = new Set();
      this.headingListeners = new Set();
      this.isWatching = false;
      this.isPausedForVisibility = false;
      this.compassActive = false;
      this.currentHeading = null;
      this.orientationHandler = null;

      this.options = {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 15000
      };

      // Tự động dừng watcher khi ẩn tab để tiết kiệm pin tối đa
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (this.isWatching && this.watchId !== null) {
            this.isPausedForVisibility = true;
            this.stopWatchingInternal();
          }
        } else {
          if (this.isPausedForVisibility) {
            this.isPausedForVisibility = false;
            this.startWatchingInternal();
          }
        }
      });

      // Dọn watcher khi rời trang
      window.addEventListener('pagehide', () => this.destroy());
      window.addEventListener('beforeunload', () => this.destroy());
    }

    isSecure() {
      if (window.isSecureContext !== undefined) {
        return window.isSecureContext;
      }
      const proto = window.location.protocol;
      const host = window.location.hostname;
      return proto === 'https:' || host === 'localhost' || host === '127.0.0.1';
    }

    getFriendlyError(errCode) {
      if (!this.isSecure()) {
        return {
          code: 'insecure',
          title: 'Cần mở bằng liên kết HTTPS để dùng vị trí',
          message: 'Trình duyệt yêu cầu kết nối bảo mật HTTPS (hoặc localhost) để cấp quyền truy cập định vị.',
          guide: 'Vui lòng kiểm tra thanh địa chỉ trình duyệt và chuyển sang liên kết https://.'
        };
      }

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

      switch (errCode) {
        case 1: // PERMISSION_DENIED
        case 'denied':
          return {
            code: 'denied',
            title: 'Quyền vị trí bị từ chối',
            message: 'Ứng dụng cần quyền vị trí để định vị bạn trên bản đồ Cố Đô và chỉ đường tham quan.',
            guide: isIOS
              ? 'Trên iPhone/iPad: Mở Cài đặt > Quyền riêng tư & Bảo mật > Dịch vụ định vị > Safari Websites > Chọn "Khi dùng ứng dụng" và BẬT "Vị trí chính xác".'
              : 'Trên Android: Bấm biểu tượng 🔒 hoặc ⚙️ bên trái thanh địa chỉ > Quyền > Vị trí > Chọn "Cho phép".'
          };
        case 2: // POSITION_UNAVAILABLE
        case 'unavailable':
          return {
            code: 'unavailable',
            title: 'Dịch vụ định vị chưa sẵn sàng',
            message: 'Thiết bị chưa nhận được tín hiệu định vị. Vui lòng kiểm tra GPS đã bật chưa.',
            guide: 'Hãy bật Dịch vụ định vị (Location Services / GPS) trong cài đặt thiết bị và di chuyển ra khu vực thoáng.'
          };
        case 3: // TIMEOUT
        case 'timeout':
          return {
            code: 'timeout',
            title: 'Hết thời gian tìm tín hiệu GPS',
            message: 'Tín hiệu GPS yếu hoặc thiết bị phản hồi chậm.',
            guide: 'Vui lòng kiểm tra kết nối mạng và bấm nút thử lại.'
          };
        default:
          return {
            code: 'unknown',
            title: 'Không thể xác định vị trí',
            message: 'Đã có sự cố khi kết nối cảm biến định vị.',
            guide: 'Vui lòng tải lại trang hoặc kiểm tra quyền riêng tư của trình duyệt.'
          };
      }
    }

    subscribe(fn) {
      if (typeof fn === 'function') {
        this.listeners.add(fn);
        if (this.lastPosition) fn(this.lastPosition);
      }
      return () => this.listeners.delete(fn);
    }

    onStateChange(fn) {
      if (typeof fn === 'function') {
        this.stateListeners.add(fn);
        fn(this.state);
      }
      return () => this.stateListeners.delete(fn);
    }

    onError(fn) {
      if (typeof fn === 'function') {
        this.errorListeners.add(fn);
      }
      return () => this.errorListeners.delete(fn);
    }

    setState(newState) {
      if (this.state !== newState) {
        this.state = newState;
        this.stateListeners.forEach(fn => {
          try { fn(this.state); } catch (e) { console.error(e); }
        });
      }
    }

    notifyPosition(pos) {
      this.lastPosition = pos;
      this.listeners.forEach(fn => {
        try { fn(pos); } catch (e) { console.error(e); }
      });
    }

    notifyError(errInfo) {
      this.errorListeners.forEach(fn => {
        try { fn(errInfo); } catch (e) { console.error(e); }
      });
    }

    requestLocation(onSuccess, onError) {
      if (!this.isSecure()) {
        const err = this.getFriendlyError('insecure');
        this.setState('insecure');
        this.notifyError(err);
        if (onError) onError(err);
        return;
      }

      if (!('geolocation' in navigator)) {
        const err = this.getFriendlyError('unavailable');
        this.setState('unavailable');
        this.notifyError(err);
        if (onError) onError(err);
        return;
      }

      this.setState('requesting');

      navigator.geolocation.getCurrentPosition(
        (geoPos) => {
          const formatted = this.formatGeoPosition(geoPos);
          this.setState('active');
          this.notifyPosition(formatted);
          try { localStorage.setItem('huego_geo_granted', 'true'); } catch (e) {}
          if (onSuccess) onSuccess(formatted);
          this.startWatchingInternal();
        },
        (geoErr) => {
          const errInfo = this.getFriendlyError(geoErr.code);
          const stateKey = geoErr.code === 1 ? 'denied' : (geoErr.code === 3 ? 'timeout' : 'unavailable');
          this.setState(stateKey);
          this.notifyError(errInfo);
          if (onError) onError(errInfo);
        },
        this.options
      );
    }

    startWatchingInternal() {
      if (!('geolocation' in navigator) || !this.isSecure()) return;
      if (this.watchId !== null) return;

      this.isWatching = true;
      this.watchId = navigator.geolocation.watchPosition(
        (geoPos) => {
          const formatted = this.formatGeoPosition(geoPos);
          this.setState('active');
          this.notifyPosition(formatted);
        },
        (geoErr) => {
          if (geoErr.code === 1) {
            this.setState('denied');
            this.stopWatchingInternal();
          }
        },
        this.options
      );
    }

    stopWatchingInternal() {
      if (this.watchId !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = null;
      }
    }

    stopTracking() {
      this.isWatching = false;
      this.isPausedForVisibility = false;
      this.stopWatchingInternal();
      this.setState('idle');
    }

    destroy() {
      this.stopTracking();
      this.stopCompass();
      this.listeners.clear();
      this.stateListeners.clear();
      this.errorListeners.clear();
      this.headingListeners.clear();
    }

    formatGeoPosition(geoPos) {
      return {
        lat: geoPos.coords.latitude,
        lng: geoPos.coords.longitude,
        accuracy: Math.round(geoPos.coords.accuracy || 0),
        heading: (typeof geoPos.coords.heading === 'number' && !isNaN(geoPos.coords.heading)) ? Math.round(geoPos.coords.heading) : null,
        speed: geoPos.coords.speed || 0,
        timestamp: geoPos.timestamp || Date.now(),
        isSimulated: false
      };
    }

    setSimulatedPosition(lat, lng) {
      const simulatedPos = {
        lat: Number(lat),
        lng: Number(lng),
        accuracy: 10,
        heading: null,
        speed: 0,
        timestamp: Date.now(),
        isSimulated: true
      };
      this.setState('active');
      this.notifyPosition(simulatedPos);
      return simulatedPos;
    }

    async requestCompass(onHeadingUpdate) {
      if (typeof onHeadingUpdate === 'function') {
        this.headingListeners.add(onHeadingUpdate);
      }
      if (this.compassActive) return true;

      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission !== 'granted') return false;
        } catch (e) {
          return false;
        }
      }

      let lastHeading = 0;
      this.orientationHandler = (event) => {
        let heading = null;
        if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null) {
          heading = event.webkitCompassHeading;
        } else if (event.alpha !== null) {
          heading = 360 - event.alpha;
        }

        if (heading !== null) {
          const diff = ((heading - lastHeading + 180) % 360) - 180;
          lastHeading = (lastHeading + diff * 0.3 + 360) % 360;
          const smoothedHeading = Math.round(lastHeading);
          this.currentHeading = smoothedHeading;
          this.headingListeners.forEach(fn => fn(smoothedHeading));
        }
      };

      window.addEventListener('deviceorientation', this.orientationHandler, true);
      this.compassActive = true;
      return true;
    }

    stopCompass() {
      if (this.compassActive && this.orientationHandler) {
        window.removeEventListener('deviceorientation', this.orientationHandler, true);
        this.compassActive = false;
        this.orientationHandler = null;
      }
    }

    static calculateDistanceMeters(lat1, lon1, lat2, lon2) {
      const R = 6371000;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return Math.round(R * c);
    }

    static formatDistance(meters) {
      if (meters === null || meters === undefined || isNaN(meters)) return '';
      if (meters < 10) return 'Vài mét';
      if (meters < 1000) {
        return (Math.round(meters / 10) * 10) + ' m';
      }
      return (meters / 1000).toFixed(1) + ' km';
    }

    static getDirectionsUrl(destLat, destLng, destName) {
      const isApple = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent);
      const name = encodeURIComponent(destName || 'Huế');
      if (isApple) {
        return `https://maps.apple.com/?daddr=${destLat},${destLng}&q=${name}`;
      }
      return `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}`;
    }
  }

  // Khởi tạo Singleton
  window.HuegoLocationService = new LocationService();

  // ==========================================
  // 2. LEAFLET MAP UI CONTROLLER BINDER
  // ==========================================
  class HuegoMapLocationUI {
    constructor(mapInstance, options = {}) {
      this.map = mapInstance;
      this.service = window.HuegoLocationService;
      this.options = Object.assign({
        containerSelector: null,
        position: 'bottomright',
        showAccuracyBadge: true,
        showSimulateOption: true,
        onLocationUpdate: null,
        getNearbyPlaces: null
      }, options);

      this.userMarker = null;
      this.accuracyCircle = null;
      this.geofenceCircle = null;
      this.isFollowing = false;
      this.heading = null;
      this.tickerInterval = null;
      this.lastPositionTime = null;

      this.injectStyles();
      this.buildControlUI();
      this.bindEvents();
    }

    injectStyles() {
      if (document.getElementById('huego-location-styles')) return;
      const style = document.createElement('style');
      style.id = 'huego-location-styles';
      style.textContent = `
        /* HUEGO User Location Marker */
        .huego-user-location-marker {
          position: relative;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .huego-user-dot {
          width: 16px;
          height: 16px;
          background: #2563EB;
          border: 3px solid #FFFFFF;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
          position: relative;
          z-index: 2;
        }
        .huego-user-dot.simulated {
          background: #D97706 !important;
        }
        .huego-user-pulse {
          position: absolute;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.28);
          animation: huegoRadarPulse 2s infinite ease-out;
          z-index: 1;
        }
        .huego-user-dot.simulated + .huego-user-pulse {
          background: rgba(217, 119, 6, 0.25);
        }
        .huego-heading-arrow {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 9px solid #1D4ED8;
          top: -10px;
          z-index: 3;
          transform-origin: 5px 17px;
          transition: transform 0.2s ease;
        }
        @keyframes huegoRadarPulse {
          0% { transform: scale(0.6); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .huego-user-pulse { animation: none; opacity: 0.4; }
        }

        /* Floating Location Controls (>= 44x44px touch targets) */
        .huego-location-controls-bar {
          position: absolute;
          bottom: 24px;
          right: 14px;
          z-index: 500;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
          pointer-events: auto;
          font-family: inherit;
        }
        .huego-ctrl-btn {
          width: 44px;
          height: 44px;
          min-width: 44px;
          min-height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid rgba(88, 44, 131, 0.18);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          user-select: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0;
        }
        .huego-ctrl-btn:active { transform: scale(0.92); }
        .huego-ctrl-btn:hover { background: #FAF5FF; border-color: rgba(88, 44, 131, 0.35); }
        .huego-ctrl-btn.active {
          background: #2563EB;
          color: #FFFFFF;
          border-color: #1D4ED8;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
        }
        .huego-ctrl-btn.loading svg {
          animation: huegoSpin 1s linear infinite;
        }
        @keyframes huegoSpin {
          100% { transform: rotate(360deg); }
        }

        /* Realtime Accuracy & Freshness Ticker Badge */
        .huego-accuracy-ticker {
          position: absolute;
          bottom: 4px;
          left: 14px;
          z-index: 450;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(88, 44, 131, 0.15);
          border-radius: 12px;
          padding: 3px 8px;
          font-size: 10.5px;
          font-weight: 700;
          color: #334155;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          pointer-events: none;
          display: none;
          align-items: center;
          gap: 4px;
        }
        .huego-accuracy-ticker.warning {
          background: #FEF3C7;
          border-color: #F59E0B;
          color: #92400E;
        }

        /* Friendly Vietnamese Notification Modal */
        .huego-location-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          display: none;
          align-items: center;
          justify-content: center;
          padding: 16px;
          font-family: inherit;
        }
        .huego-location-modal.active { display: flex; }
        .huego-loc-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 20px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(88, 44, 131, 0.15);
          animation: huegoPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes huegoPop {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .huego-loc-title {
          font-size: 16px;
          font-weight: 800;
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .huego-loc-desc {
          font-size: 13px;
          color: #475569;
          line-height: 1.45;
          margin-bottom: 12px;
        }
        .huego-loc-guide {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 11.5px;
          color: #334155;
          line-height: 1.45;
          margin-bottom: 12px;
        }
        .huego-loc-privacy {
          font-size: 11px;
          color: #64748B;
          line-height: 1.4;
          margin-bottom: 14px;
          display: flex;
          align-items: flex-start;
          gap: 5px;
        }
        .huego-loc-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }
        .huego-loc-close-btn {
          background: var(--royal-violet, #582C83);
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          padding: 8px 16px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
        }
      `;
      document.head.appendChild(style);
    }

    buildControlUI() {
      // Container cho các nút định vị góc dưới phải
      const container = document.createElement('div');
      container.className = 'huego-location-controls-bar';
      container.id = 'huegoLocationControls';

      // 1. Nút "Xem tất cả" (Fit all landmarks & user)
      const fitBtn = document.createElement('button');
      fitBtn.className = 'huego-ctrl-btn';
      fitBtn.id = 'huegoFitAllBtn';
      fitBtn.title = 'Xem tất cả địa danh quanh vị trí';
      fitBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      `;
      fitBtn.onclick = () => this.fitUserAndLandmarks();

      // 2. Nút La bàn (Compass)
      const compassBtn = document.createElement('button');
      compassBtn.className = 'huego-ctrl-btn';
      compassBtn.id = 'huegoCompassBtn';
      compassBtn.title = 'Bật La bàn số định hướng';
      compassBtn.innerHTML = `
        <svg id="huegoCompassSvg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#DC2626"></polygon>
        </svg>
      `;
      compassBtn.onclick = () => this.toggleCompass();

      // 3. Nút chính "Vị trí của tôi" (>= 44x44px)
      const locateBtn = document.createElement('button');
      locateBtn.className = 'huego-ctrl-btn';
      locateBtn.id = 'huegoLocateBtn';
      locateBtn.title = 'Vị trí của tôi';
      locateBtn.innerHTML = `
        <svg id="huegoLocateIcon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
        </svg>
      `;
      locateBtn.onclick = () => this.onLocateBtnClick();

      container.appendChild(fitBtn);
      container.appendChild(compassBtn);
      container.appendChild(locateBtn);

      // Thêm vào Map Container
      const mapEl = this.map.getContainer();
      mapEl.appendChild(container);

      // Ticker hiển thị sai số
      const ticker = document.createElement('div');
      ticker.className = 'huego-accuracy-ticker';
      ticker.id = 'huegoAccuracyTicker';
      ticker.innerHTML = `<span>📍</span> <span id="huegoAccuracyText">Đang tìm tín hiệu...</span>`;
      mapEl.appendChild(ticker);

      // Modal thông báo lỗi tiếng Việt
      this.buildErrorModal();
    }

    buildErrorModal() {
      if (document.getElementById('huegoLocationModal')) return;
      const modal = document.createElement('div');
      modal.className = 'huego-location-modal';
      modal.id = 'huegoLocationModal';
      modal.innerHTML = `
        <div class="huego-loc-card" onclick="event.stopPropagation()">
          <div class="huego-loc-title">
            <span id="huegoModalTitle">Thông báo Vị trí</span>
            <button onclick="document.getElementById('huegoLocationModal').classList.remove('active')" style="background:none; border:none; font-size:18px; cursor:pointer; color:#64748B;">✕</button>
          </div>
          <div class="huego-loc-desc" id="huegoModalDesc"></div>
          <div class="huego-loc-guide" id="huegoModalGuide" style="display:none;"></div>
          <div class="huego-loc-privacy">
            <span>🔒</span>
            <span>Vị trí chỉ dùng để hiển thị và xác thực mở khóa di sản Cố Đô Huế. Không theo dõi ngầm.</span>
          </div>
          <div class="huego-loc-actions">
            <button class="huego-loc-close-btn" onclick="document.getElementById('huegoLocationModal').classList.remove('active')">Đã hiểu</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    showFriendlyError(errInfo) {
      const modal = document.getElementById('huegoLocationModal');
      const title = document.getElementById('huegoModalTitle');
      const desc = document.getElementById('huegoModalDesc');
      const guide = document.getElementById('huegoModalGuide');
      if (!modal) return;

      title.innerText = errInfo.title || 'Lỗi Vị trí';
      desc.innerText = errInfo.message || '';
      if (errInfo.guide) {
        guide.style.display = 'block';
        guide.innerText = errInfo.guide;
      } else {
        guide.style.display = 'none';
      }
      modal.classList.add('active');
    }

    bindEvents() {
      // 1. Khi người dùng vuốt/kéo bản đồ -> tự thoát chế độ theo dõi
      this.map.on('dragstart', () => {
        if (this.isFollowing) {
          this.isFollowing = false;
          this.updateLocateBtnUI();
        }
      });

      // 2. Lắng nghe cập nhật vị trí từ LocationService
      this.service.subscribe((pos) => {
        this.renderUserPosition(pos);
      });

      // 3. Lắng nghe trạng thái
      this.service.onStateChange((state) => {
        this.updateLocateBtnUI(state);
      });

      // 4. Lắng nghe lỗi
      this.service.onError((errInfo) => {
        this.showFriendlyError(errInfo);
      });

      // 5. Đồng hồ cập nhật độ tươi của dữ liệu vị trí (realtime ticker)
      this.tickerInterval = setInterval(() => {
        this.updateTickerTime();
      }, 1000);
    }

    onLocateBtnClick() {
      // Nếu đã có vị trí và đang theo dõi -> đưa lại về giữa
      if (this.service.lastPosition && this.service.state === 'active') {
        this.isFollowing = true;
        this.map.flyTo([this.service.lastPosition.lat, this.service.lastPosition.lng], Math.max(this.map.getZoom(), 16), { duration: 0.8 });
        this.updateLocateBtnUI();
        return;
      }

      // Chưa có vị trí -> xin quyền và lấy vị trí
      this.service.requestLocation(
        (pos) => {
          this.isFollowing = true;
          const targetZoom = (pos.accuracy && pos.accuracy <= 100) ? 16 : 14;
          this.map.flyTo([pos.lat, pos.lng], targetZoom, { duration: 1.0 });
          this.updateLocateBtnUI();
        },
        (err) => {
          this.isFollowing = false;
          this.updateLocateBtnUI();
        }
      );
    }

    updateLocateBtnUI(stateOverride) {
      const btn = document.getElementById('huegoLocateBtn');
      const icon = document.getElementById('huegoLocateIcon');
      if (!btn || !icon) return;

      const state = stateOverride || this.service.state;

      btn.classList.remove('loading', 'active');

      if (state === 'requesting') {
        btn.classList.add('loading');
        icon.innerHTML = `<path d="M21 12a9 9 0 1 1-6.219-8.56"></path>`;
      } else if (state === 'active' && this.isFollowing) {
        btn.classList.add('active');
        icon.innerHTML = `<polygon points="3 11 22 2 13 21 11 13 3 11" fill="currentColor"></polygon>`;
      } else if (state === 'active') {
        icon.innerHTML = `<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>`;
      } else {
        icon.innerHTML = `<polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>`;
      }
    }

    renderUserPosition(pos) {
      this.lastPositionTime = Date.now();
      const latLng = [pos.lat, pos.lng];

      // Marker chấm xanh (custom Leaflet DivIcon)
      if (!this.userMarker) {
        const markerHtml = `
          <div class="huego-user-location-marker">
            <div class="huego-user-dot ${pos.isSimulated ? 'simulated' : ''}"></div>
            <div class="huego-user-pulse"></div>
            <div class="huego-heading-arrow" id="huegoHeadingArrow" style="display:none;"></div>
          </div>
        `;
        const userIcon = L.divIcon({
          className: 'huego-user-icon-wrap',
          html: markerHtml,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        this.userMarker = L.marker(latLng, { icon: userIcon, zIndexOffset: 1000 }).addTo(this.map);
      } else {
        this.userMarker.setLatLng(latLng);
        const dot = this.userMarker.getElement()?.querySelector('.huego-user-dot');
        if (dot) {
          if (pos.isSimulated) dot.classList.add('simulated');
          else dot.classList.remove('simulated');
        }
      }

      // Vòng tròn sai số (L.circle)
      const radius = Math.max(pos.accuracy || 15, 5);
      const isHighError = pos.accuracy > 100;

      const circleStyle = {
        radius: radius,
        color: isHighError ? '#D97706' : '#2563EB',
        fillColor: isHighError ? '#FBBF24' : '#60A5FA',
        fillOpacity: 0.12,
        weight: isHighError ? 1.5 : 1,
        dashArray: isHighError ? '5, 5' : null
      };

      if (!this.accuracyCircle) {
        this.accuracyCircle = L.circle(latLng, circleStyle).addTo(this.map);
      } else {
        this.accuracyCircle.setLatLng(latLng);
        this.accuracyCircle.setRadius(radius);
        this.accuracyCircle.setStyle(circleStyle);
      }

      // Xoay hướng (Heading)
      const arrow = document.getElementById('huegoHeadingArrow');
      if (arrow) {
        if (typeof pos.heading === 'number' && !isNaN(pos.heading)) {
          arrow.style.display = 'block';
          arrow.style.transform = `rotate(${pos.heading}deg)`;
        } else {
          arrow.style.display = 'none';
        }
      }

      // Nếu đang follow mode -> bám theo tọa độ
      if (this.isFollowing) {
        this.map.panTo(latLng, { animate: true });
      }

      // Cập nhật ticker sai số
      this.updateTickerAccuracy(pos);

      // Báo callback bên ngoài nếu có
      if (typeof this.options.onLocationUpdate === 'function') {
        this.options.onLocationUpdate(pos);
      }
    }

    updateTickerAccuracy(pos) {
      const ticker = document.getElementById('huegoAccuracyTicker');
      const text = document.getElementById('huegoAccuracyText');
      if (!ticker || !text) return;

      ticker.style.display = 'inline-flex';
      const isExtreme = pos.accuracy > 1000;
      const isHigh = pos.accuracy > 100;

      if (isExtreme) {
        ticker.className = 'huego-accuracy-ticker warning';
        text.innerText = `Sai số ±${pos.accuracy}m (Vị trí ước lượng)`;
      } else if (isHigh) {
        ticker.className = 'huego-accuracy-ticker warning';
        text.innerText = `Sai số ±${pos.accuracy}m`;
      } else if (pos.isSimulated) {
        ticker.className = 'huego-accuracy-ticker';
        text.innerText = `Vị trí giả lập (Demo)`;
      } else {
        ticker.className = 'huego-accuracy-ticker';
        text.innerText = `Sai số ±${pos.accuracy}m`;
      }
    }

    updateTickerTime() {
      if (!this.lastPositionTime) return;
      const sec = Math.max(0, Math.floor((Date.now() - this.lastPositionTime) / 1000));
      const text = document.getElementById('huegoAccuracyText');
      if (!text || !this.service.lastPosition) return;

      const pos = this.service.lastPosition;
      const accText = pos.isSimulated ? 'Vị trí giả lập' : `Sai số ±${pos.accuracy}m`;
      const timeText = sec <= 2 ? 'vừa xong' : `${sec}s trước`;
      text.innerText = `${accText} • ${timeText}`;
    }

    async toggleCompass() {
      const btn = document.getElementById('huegoCompassBtn');
      const arrow = document.getElementById('huegoHeadingArrow');

      if (this.service.compassActive) {
        this.service.stopCompass();
        if (btn) btn.classList.remove('active');
        if (arrow) arrow.style.display = 'none';
      } else {
        const ok = await this.service.requestCompass((heading) => {
          if (arrow) {
            arrow.style.display = 'block';
            arrow.style.transform = `rotate(${heading}deg)`;
          }
          const svg = document.getElementById('huegoCompassSvg');
          if (svg) svg.style.transform = `rotate(${-heading}deg)`;
        });
        if (ok && btn) btn.classList.add('active');
      }
    }

    fitUserAndLandmarks() {
      const userPos = this.service.lastPosition;
      if (!userPos) {
        this.onLocateBtnClick();
        return;
      }

      const points = [[userPos.lat, userPos.lng]];

      // Lấy danh sách địa danh gần nếu có
      if (typeof this.options.getNearbyPlaces === 'function') {
        const nearby = this.options.getNearbyPlaces(userPos.lat, userPos.lng, 5) || [];
        nearby.forEach(p => {
          if (p.lat && p.lng) points.push([p.lat, p.lng]);
        });
      }

      const bounds = L.latLngBounds(points);
      this.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
      this.isFollowing = false;
      this.updateLocateBtnUI();
    }

    // Vẽ vòng bán kính mở khóa (35m) cho địa danh đang chọn
    showPlaceGeofence(placeLat, placeLng, placeName) {
      if (this.geofenceCircle) {
        this.map.removeLayer(this.geofenceCircle);
        this.geofenceCircle = null;
      }
      if (!placeLat || !placeLng) return;

      this.geofenceCircle = L.circle([placeLat, placeLng], {
        radius: 35,
        color: '#582C83',
        fillColor: '#D4AF37',
        fillOpacity: 0.22,
        weight: 2,
        dashArray: '4, 4'
      }).addTo(this.map);

      // Đo khoảng cách tới user nếu có
      if (this.service.lastPosition) {
        const d = LocationService.calculateDistanceMeters(
          this.service.lastPosition.lat,
          this.service.lastPosition.lng,
          placeLat,
          placeLng
        );
        const inside = d <= 35;
        const msg = inside
          ? `🎉 Bạn đang trong phạm vi mở khóa (cách ${d}m)!`
          : `📍 Còn ${d}m nữa để mở khóa ${placeName || 'địa danh này'}.`;
        return { distance: d, isInside: inside, message: msg };
      }
      return null;
    }

    clearPlaceGeofence() {
      if (this.geofenceCircle) {
        this.map.removeLayer(this.geofenceCircle);
        this.geofenceCircle = null;
      }
    }
  }

  // Gắn Controller vào Window
  window.HuegoMapLocationUI = HuegoMapLocationUI;

})(window);
