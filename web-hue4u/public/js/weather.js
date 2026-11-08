/**
 * HUEGO Live Meteorological Engine (Thời tiết thực tế Cố Đô Huế)
 * Tọa độ Trạm khí tượng Huế: 16.4673° N, 107.5905° E
 * Kết nối dữ liệu đa tầng:
 *  1. Backend API: /api/v1/weather/hue-current
 *  2. Trạm khí tượng Open-Meteo (WMO): Cập nhật tự động thời gian thực không cần API key.
 * Hỗ trợ đa ngôn ngữ: vi, en, fr, ko, ja.
 */

(function () {
  const HUE_LAT = 16.4673;
  const HUE_LNG = 107.5905;

  let currentWeatherState = null;
  let isRainSimulation = false;

  // Bảng diễn giải WMO Weather Code đa ngôn ngữ
  const WMO_CONDITIONS = {
    0: {
      icon: '☀️',
      vi: { name: 'Trời quang đãng, nắng ấm Cố Đô', isRain: false },
      en: { name: 'Clear Sky, pleasant sunny weather', isRain: false },
      fr: { name: 'Ciel dégagé, belle journée ensoleillée', isRain: false },
      ko: { name: '맑고 화창한 고도의 날씨', isRain: false },
      ja: { name: '快晴・穏やかな日差し', isRain: false },
    },
    1: {
      icon: '🌤️',
      vi: { name: 'Trời ít mây, dịu mát', isRain: false },
      en: { name: 'Mainly Clear, gentle breeze', isRain: false },
      fr: { name: 'Peu nuageux, brise agréable', isRain: false },
      ko: { name: '대체로 맑고 선선함', isRain: false },
      ja: { name: 'おおむね晴れ・爽やかな風', isRain: false },
    },
    2: {
      icon: '⛅',
      vi: { name: 'Mây rải rác, gió sông Hương dịu mát', isRain: false },
      en: { name: 'Partly Cloudy, cool Perfume River breeze', isRain: false },
      fr: { name: 'Éclaircies, brise fraîche de la Rivière des Parfums', isRain: false },
      ko: { name: '구름 조금, 흐엉강의 시원한 바람', isRain: false },
      ja: { name: '時々曇り・香河の心地よい川風', isRain: false },
    },
    3: {
      icon: '☁️',
      vi: { name: 'Trời nhiều mây, râm mát dễ chịu', isRain: false },
      en: { name: 'Overcast, cool and comfortable', isRain: false },
      fr: { name: 'Couvert, frais et propice aux promenades', isRain: false },
      ko: { name: '흐림, 걷기 좋은 선선한 날씨', isRain: false },
      ja: { name: '曇り・散策に適した過ごしやすい気温', isRain: false },
    },
    45: {
      icon: '🌫️',
      vi: { name: 'Sương mù bảng lảng Cố Đô', isRain: false },
      en: { name: 'Foggy, romantic Hue morning mist', isRain: false },
      fr: { name: 'Brouillard matinal poétique sur Hué', isRain: false },
      ko: { name: '안개 자욱한 후에의 운치 있는 풍경', isRain: false },
      ja: { name: '霧が立ち込める古都の朝', isRain: false },
    },
    51: {
      icon: '🌧️',
      vi: { name: 'Mưa phùn nhẹ xứ Huế', isRain: true },
      en: { name: 'Light drizzle, gentle Hue rain', isRain: true },
      fr: { name: 'Bruine légère poétique de Hué', isRain: true },
      ko: { name: '후에 특유의 보슬비', isRain: true },
      ja: { name: 'フエ名物のしとしと降る小雨', isRain: true },
    },
    61: {
      icon: '🌧️',
      vi: { name: 'Mưa ngâu xứ Huế rả rích', isRain: true },
      en: { name: 'Moderate rain in Hue', isRain: true },
      fr: { name: 'Pluie modérée typique de Hué', isRain: true },
      ko: { name: '후에의 운치 있는 비', isRain: true },
      ja: { name: '情緒あふれるフエの雨', isRain: true },
    },
    63: {
      icon: '🌧️',
      vi: { name: 'Trời đổ mưa vừa xứ Huế', isRain: true },
      en: { name: 'Rainy weather in Hue', isRain: true },
      fr: { name: 'Pluie continue sur la cité', isRain: true },
      ko: { name: '비 내리는 후에', isRain: true },
      ja: { name: 'まとまった雨', isRain: true },
    },
    65: {
      icon: '⛈️',
      vi: { name: 'Trời mưa to Cố Đô', isRain: true },
      en: { name: 'Heavy rain in Hue', isRain: true },
      fr: { name: 'Forte pluie impériale', isRain: true },
      ko: { name: '강한 비', isRain: true },
      ja: { name: '大雨・注意', isRain: true },
    },
    80: {
      icon: '🌦️',
      vi: { name: 'Mưa rào thoáng qua', isRain: true },
      en: { name: 'Passing rain showers', isRain: true },
      fr: { name: 'Averses passagères', isRain: true },
      ko: { name: '지나가는 소나기', isRain: true },
      ja: { name: '通り雨・にわか雨', isRain: true },
    },
    95: {
      icon: '⛈️',
      vi: { name: 'Dông sét Cố Đô, cần trú mưa', isRain: true },
      en: { name: 'Thunderstorm, shelter advised', isRain: true },
      fr: { name: 'Orage, abri recommandé', isRain: true },
      ko: { name: '뇌우, 실내 대피 권장', isRain: true },
      ja: { name: '雷雨・屋内避難推奨', isRain: true },
    },
  };

  function getSmartRecommendation(isRain, temp, lang = 'vi') {
    const recs = {
      vi: {
        rain: 'Trời đang mưa Huế. Khuyến nghị ghé thăm các điểm trong nhà: Bảo tàng Cổ vật Cung đình, Nhà vườn An Hiên hoặc thưởng trà Cung đình.',
        hot: 'Nhiệt độ ngoài trời cao (>35°C). Khuyến nghị tham quan sáng sớm/chiều tà, di chuyển xe điện và nghỉ chân dưới bóng râm các lăng tẩm.',
        pleasant: 'Thời tiết tuyệt đẹp để dạo bước Kỳ Đài, dạo quanh sông Hương và khám phá Đại Nội Hoàng Thành.',
      },
      en: {
        rain: 'Rainy weather in Hue. Indoor visits recommended: Royal Antiquities Museum, An Hien Garden House, or Imperial Tea Tasting.',
        hot: 'High temperature. Early morning or late afternoon exploration recommended. Electric shuttles & shaded garden visits advised.',
        pleasant: 'Ideal weather for strolling around Citadel Flag Tower, biking along Perfume River, and visiting tombs.',
      },
      fr: {
        rain: 'Temps pluvieux à Hué. Visites intérieures recommandées : Musée des Antiquités Royales, maison-jardin d\'An Hien ou dégustation de thé impérial.',
        hot: 'Chaleur estivale. Privilégiez les visites matinales ou en fin d\'après-midi sous l\'ombre des mausolées royaux.',
        pleasant: 'Conditions parfaites pour flâner le long de la Rivière des Parfums et explorer la Cité Impériale.',
      },
      ko: {
        rain: '비 내리는 후에. 실내 명소 추천: 후에 궁중유물박물관, 안히엔 고택 정원, 황실 전통차 시음.',
        hot: '기온이 높습니다. 이른 아침 또는 늦은 오후 방문을 추천하며 전기 셔틀 이용 및 그늘 휴식을 권장합니다.',
        pleasant: '흐엉강 산책, 자전거 투어, 후에 황성과 황릉 답사에 최적의 날씨입니다.',
      },
      ja: {
        rain: 'フエに雨が降っています。王宮骨董博物館や安軒庭園住宅、伝統宮廷茶の喫茶など屋内スポットがおすすめです。',
        hot: '気温が高めです。早朝や夕方の涼しい時間帯の散策や、電動カートの利用をおすすめします。',
        pleasant: '王宮やフォン川沿いの散策、古都の寺院巡りに最適な爽やかな気候です。',
      },
    };

    const l = recs[lang] || recs.vi;
    if (isRain) return l.rain;
    if (temp && temp >= 35) return l.hot;
    return l.pleasant;
  }

  /**
   * Lấy dữ liệu thời tiết trực tiếp từ trạm khí tượng
   */
  async function fetchAccurateWeather() {
    const lang = (window.HuegoI18n ? window.HuegoI18n.getCurrentLang() : 'vi');

    // Thử gọi backend trước
    try {
      const backendUrl = (window.resolveApiUrl ? window.resolveApiUrl('/api/v1/weather/hue-current') : '/api/v1/weather/hue-current');
      const res = await fetch(backendUrl + (backendUrl.includes('?') ? '&' : '?') + 'lang=' + lang);
      if (res.ok) {
        const d = await res.json();
        if (d && d.condition !== 'no_key' && d.tempCelsius != null) {
          currentWeatherState = {
            temp: d.tempCelsius,
            humidity: d.humidity || 85,
            windSpeed: d.windSpeed || 4.2,
            apparentTemp: d.apparentTemp || d.tempCelsius + 1,
            isRain: isRainSimulation || d.isRaining,
            description: d.description,
            icon: d.isRaining ? '🌧️' : '⛅',
            recommendation: d.recommendation || getSmartRecommendation(d.isRaining, d.tempCelsius, lang),
            source: 'backend-live',
          };
          return currentWeatherState;
        }
      }
    } catch (_) {}

    // Kết nối trực tiếp trạm khí tượng vệ tinh Open-Meteo cho Huế
    try {
      const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${HUE_LAT}&longitude=${HUE_LNG}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&timezone=Asia%2FBangkok`;
      const res = await fetch(openMeteoUrl);
      if (res.ok) {
        const data = await res.json();
        const cur = data.current;
        const code = cur.weather_code ?? 0;
        const wmo = WMO_CONDITIONS[code] || WMO_CONDITIONS[0];
        const wmoLang = wmo[lang] || wmo.vi;

        const isRain = isRainSimulation || (cur.rain > 0.1 || cur.precipitation > 0.1 || wmoLang.isRain);
        const temp = Math.round(cur.temperature_2m * 10) / 10;
        const humidity = Math.round(cur.relative_humidity_2m);
        const wind = Math.round(cur.wind_speed_10m * 10) / 10;
        const apparent = Math.round(cur.apparent_temperature * 10) / 10;

        currentWeatherState = {
          temp,
          humidity,
          windSpeed: wind,
          apparentTemp: apparent,
          isRain,
          code,
          icon: isRain ? '🌧️' : wmo.icon,
          description: isRain ? (WMO_CONDITIONS[61][lang] || WMO_CONDITIONS[61].vi).name : wmoLang.name,
          recommendation: getSmartRecommendation(isRain, temp, lang),
          source: 'open-meteo-satellite',
        };
        return currentWeatherState;
      }
    } catch (e) {
      console.warn('[HUEGO Weather] Open-Meteo offline, using graceful fallback:', e);
    }

    // Fallback thông minh nếu mất kết nối mạng hoàn toàn
    currentWeatherState = {
      temp: 24.5,
      humidity: 88,
      windSpeed: 3.6,
      apparentTemp: 25.2,
      isRain: isRainSimulation,
      icon: isRainSimulation ? '🌧️' : '⛅',
      description: isRainSimulation ? 'Mưa ngâu xứ Huế rả rích' : 'Trời quang đãng, gió sông Hương dịu mát',
      recommendation: getSmartRecommendation(isRainSimulation, 24.5, lang),
      source: 'offline-graceful',
    };
    return currentWeatherState;
  }

  /**
   * Cập nhật giao diện Weather Badge trên thanh Header
   */
  async function updateWeatherUI() {
    const badge = document.getElementById('liveWeatherBadge');
    if (!badge) return;

    const weather = await fetchAccurateWeather();
    const lang = (window.HuegoI18n ? window.HuegoI18n.getCurrentLang() : 'vi');
    const t = (k) => (window.HuegoI18n ? window.HuegoI18n.t(k, lang) : k);

    badge.style.cursor = 'pointer';
    badge.title = t('weather_open_details');
    badge.innerHTML = `
      <span class="weather-icon" style="font-size:16px;">${weather.icon}</span>
      <span style="font-weight:700;">Huế ${weather.temp}°C · ${weather.description}</span>
      <button class="btn-weather-sim" onclick="window.HuegoWeather.toggleRainSim(event)" style="
        margin-left: 8px;
        background: ${isRainSimulation ? '#0284C7' : 'rgba(88, 44, 131, 0.12)'};
        color: ${isRainSimulation ? 'white' : '#582C83'};
        border: 1px solid ${isRainSimulation ? '#0284C7' : 'rgba(88, 44, 131, 0.2)'};
        border-radius: 12px;
        padding: 2px 8px;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transition: all 0.2s;
      " title="Mô phỏng mưa Huế để kiểm thử thích ứng lịch trình di sản">
        ${isRainSimulation ? t('weather_rain_on') : t('weather_rain_sim')}
      </button>
    `;

    // Gắn sự kiện click mở Modal chi tiết thời tiết
    badge.onclick = (e) => {
      if (e.target.closest('.btn-weather-sim')) return;
      showWeatherDetailsModal(weather);
    };

    // Đồng bộ với Mobile Simulator nếu đang cùng trang
    const pill = document.getElementById('weatherPillText');
    if (pill) {
      pill.innerText = `Huế ${weather.temp}°C · ${weather.description}`;
    }
  }

  /**
   * Hiển thị Modal thời tiết & trạm khí tượng Cố Đô chi tiết
   */
  function showWeatherDetailsModal(w) {
    const lang = (window.HuegoI18n ? window.HuegoI18n.getCurrentLang() : 'vi');
    const t = (k) => (window.HuegoI18n ? window.HuegoI18n.t(k, lang) : k);

    let modal = document.getElementById('huegoWeatherModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'huegoWeatherModal';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="weather-modal-backdrop" onclick="window.HuegoWeather.closeModal()" style="
        position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px); z-index: 100000; display: flex; align-items: center; justify-content: center; padding: 16px;
      ">
        <div class="weather-modal-card" onclick="event.stopPropagation()" style="
          background: white; border-radius: 24px; max-width: 440px; width: 100%; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); overflow: hidden; border: 1px solid rgba(88,44,131,0.15); animation: weatherModalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        ">
          <!-- Header Card -->
          <div style="background: linear-gradient(135deg, #582C83 0%, #3B1660 100%); color: white; padding: 24px; position: relative;">
            <button onclick="window.HuegoWeather.closeModal()" style="position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.2); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 16px;">✕</button>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #D4AF37; text-transform: uppercase; letter-spacing: 1px;">
              <span>🛰️</span> <span>${t('weather_details_title')}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px;">
              <div>
                <div style="font-size: 44px; font-weight: 900; line-height: 1;">${w.temp}°C</div>
                <div style="font-size: 15px; margin-top: 6px; font-weight: 600; opacity: 0.95;">${w.description}</div>
              </div>
              <div style="font-size: 56px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));">${w.icon}</div>
            </div>
          </div>

          <!-- Body Stats Grid -->
          <div style="padding: 20px; background: #F8FAFC;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div style="background: white; padding: 12px 16px; border-radius: 14px; border: 1px solid #E2E8F0;">
                <div style="font-size: 11px; color: #64748B; font-weight: 600;">💧 ${t('weather_humidity')}</div>
                <div style="font-size: 18px; font-weight: 800; color: #1E293B; margin-top: 2px;">${w.humidity}%</div>
              </div>
              <div style="background: white; padding: 12px 16px; border-radius: 14px; border: 1px solid #E2E8F0;">
                <div style="font-size: 11px; color: #64748B; font-weight: 600;">💨 ${t('weather_wind')}</div>
                <div style="font-size: 18px; font-weight: 800; color: #1E293B; margin-top: 2px;">${w.windSpeed} km/h</div>
              </div>
              <div style="background: white; padding: 12px 16px; border-radius: 14px; border: 1px solid #E2E8F0;">
                <div style="font-size: 11px; color: #64748B; font-weight: 600;">🌡️ ${t('weather_feels_like')}</div>
                <div style="font-size: 18px; font-weight: 800; color: #1E293B; margin-top: 2px;">${w.apparentTemp}°C</div>
              </div>
              <div style="background: white; padding: 12px 16px; border-radius: 14px; border: 1px solid #E2E8F0;">
                <div style="font-size: 11px; color: #64748B; font-weight: 600;">📡 ${t('weather_station')}</div>
                <div style="font-size: 13px; font-weight: 700; color: #582C83; margin-top: 5px;">Hue Station (16°N)</div>
              </div>
            </div>

            <!-- Recommendation Box -->
            <div style="margin-top: 16px; background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 16px; padding: 14px 16px;">
              <div style="font-size: 12px; font-weight: 800; color: #92400E; display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                <span>💡</span> <span>${t('weather_rec')}</span>
              </div>
              <div style="font-size: 13px; color: #78350F; line-height: 1.5;">${w.recommendation}</div>
            </div>

            <div style="margin-top: 16px; display: flex; justify-content: flex-end;">
              <button onclick="window.HuegoWeather.closeModal()" style="
                background: #582C83; color: white; border: none; border-radius: 12px; padding: 8px 20px; font-weight: 700; font-size: 13px; cursor: pointer;
              ">${t('btn_close')}</button>
            </div>
          </div>
        </div>
      </div>
    `;
    modal.style.display = 'block';
  }

  function closeModal() {
    const modal = document.getElementById('huegoWeatherModal');
    if (modal) modal.style.display = 'none';
  }

  function toggleRainSim(e) {
    if (e) e.stopPropagation();
    isRainSimulation = !isRainSimulation;
    updateWeatherUI();
    // Tự động chuyển tab gợi ý ẩm thực / trong nhà nếu bật mưa
    if (isRainSimulation && typeof window.filterByVertical === 'function') {
      window.filterByVertical('fnb');
    }
  }

  // Lắng nghe sự kiện chuyển ngôn ngữ để cập nhật lại thời tiết theo đúng ngôn ngữ
  window.addEventListener('huego:langchange', () => {
    updateWeatherUI();
  });

  // Khởi tạo
  window.addEventListener('DOMContentLoaded', () => {
    updateWeatherUI();
    // Tự động cập nhật mỗi 10 phút
    setInterval(updateWeatherUI, 10 * 60 * 1000);
  });

  window.HuegoWeather = {
    fetchAccurateWeather,
    updateWeatherUI,
    showWeatherDetailsModal,
    closeModal,
    toggleRainSim,
    getSmartRecommendation,
  };
})();
