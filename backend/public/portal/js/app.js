/**
 * Hue4U - Frontend Application Controller
 * Quản lý tìm kiếm, lọc danh mục, phân trang, và hiển thị chi tiết địa điểm
 */

let currentVertical = 'all';
let currentPage = 1;
let currentSearch = '';
let currentSort = 'rating';
let totalPages = 1;

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEventListeners();
  loadCollections();
  loadPlaces();
});

// Quản lý Dark / Light Theme
function initTheme() {
  const savedTheme = localStorage.getItem('hue4u-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('hue4u-theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  if (icon && label) {
    if (theme === 'dark') {
      icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="1" y2="3"></line><line x1="12" y1="21" x2="1" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
      label.textContent = 'Giao diện Sáng';
    } else {
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      label.textContent = 'Giao diện Tối';
    }
  }
}

// Bắt sự kiện tìm kiếm và lọc
function initEventListeners() {
  // Tìm kiếm với debounce
  const searchInput = document.getElementById('search-input');
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentSearch = e.target.value.trim();
        currentPage = 1;
        loadPlaces();
      }, 350);
    });
  }

  // Lọc danh mục Tabs
  const tabBtns = document.querySelectorAll('.category-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentVertical = btn.getAttribute('data-vertical');
      currentPage = 1;
      loadPlaces();
    });
  });

  // Modal đóng
  const modalClose = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('place-modal');
  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
}

function closeModal() {
  const modal = document.getElementById('place-modal');
  if (modal) modal.classList.remove('active');
}

// Tải bộ sưu tập nổi bật
async function loadCollections() {
  const container = document.getElementById('collections-grid');
  if (!container) return;

  try {
    const res = await fetch('/api/collections');
    const list = await res.json();
    container.innerHTML = list.map(c => `
      <div class="collection-card" onclick="filterByCollection('${c.vertical}')">
        <img class="collection-img" src="${c.heroImage}" alt="${c.title}" onerror="this.src='https://pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev/places/heritage-dai-noi-hue.webp'" />
        <div class="collection-overlay">
          <h3 class="collection-name">${c.title}</h3>
          <p class="collection-sub">${c.subtitle}</p>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('Error loading collections:', err);
  }
}

window.filterByCollection = function(vertical) {
  const targetTab = document.querySelector(`.category-tab-btn[data-vertical="${vertical}"]`);
  if (targetTab) {
    targetTab.click();
    targetTab.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
};

// Tải danh sách địa điểm theo phân trang & lọc
async function loadPlaces() {
  const grid = document.getElementById('places-grid');
  const countLabel = document.getElementById('results-count');
  if (!grid) return;

  grid.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
      <p style="margin-top: 1rem; font-weight: 500;">Đang khám phá địa điểm Huế...</p>
    </div>
  `;

  try {
    const params = new URLSearchParams({
      vertical: currentVertical,
      page: currentPage,
      limit: 24,
      q: currentSearch,
      sortBy: currentSort
    });

    const res = await fetch(`/api/places?${params.toString()}`);
    const data = await res.json();

    if (countLabel) {
      countLabel.textContent = `Tìm thấy ${data.total.toLocaleString()} địa điểm`;
    }

    totalPages = data.totalPages || 1;
    renderPlaces(data.items);
    renderPagination(data.page, totalPages);
  } catch (err) {
    grid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: red;">Lỗi tải dữ liệu: ${err.message}</p>`;
  }
}

// Hiển thị thẻ địa điểm
function renderPlaces(items) {
  const grid = document.getElementById('places-grid');
  if (!items || items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-dim); margin-bottom: 1rem;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Không tìm thấy địa điểm phù hợp</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Vui lòng thử tìm kiếm với từ khóa khác hoặc chuyển danh mục.</p>
      </div>
    `;
    return;
  }

  const verticalLabels = {
    tour: 'Di tích & Tour',
    fnb: 'Ẩm thực',
    cafe: 'Cà phê',
    stay: 'Lưu trú',
    specialty: 'Đặc sản',
    service: 'Dịch vụ'
  };

  grid.innerHTML = items.map(p => {
    const photo = p.coverPhotoUrl || 'https://pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev/places/heritage-dai-noi-hue.webp';
    const tag = verticalLabels[p.vertical] || p.vertical;
    const rating = p.googleRating ? p.googleRating.toFixed(1) : 'Mới';
    const reviews = p.googleReviewCount ? `(${p.googleReviewCount})` : '';

    return `
      <div class="place-card" onclick="openPlaceDetail('${p.id}')">
        <div class="card-img-wrapper">
          <img class="place-card-img" src="${photo}" alt="${p.name}" loading="lazy" onerror="this.src='https://pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev/places/heritage-dai-noi-hue.webp'" />
          <span class="badge-tag">${tag}</span>
          <span class="rating-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ${rating} <span style="font-size: 0.7rem; opacity: 0.7;">${reviews}</span>
          </span>
        </div>
        <div class="place-card-body">
          <h3 class="place-name">${p.name_vi || p.name}</h3>
          <p class="place-address">${p.address_vi || p.address || 'Thành phố Huế'}</p>
          <div class="place-footer">
            <div class="subcategories-list">
              ${(p.subcategory || []).slice(0, 2).map(s => `<span class="sub-pill">${s}</span>`).join('')}
            </div>
            <span class="view-detail-btn">
              Chi tiết
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Mở modal chi tiết
window.openPlaceDetail = async function(id) {
  const modal = document.getElementById('place-modal');
  const container = document.getElementById('modal-dynamic-content');
  if (!modal || !container) return;

  modal.classList.add('active');
  container.innerHTML = `<div style="text-align: center; padding: 3rem;"><p>Đang tải thông tin chi tiết...</p></div>`;

  try {
    const res = await fetch(`/api/places/${id}`);
    const p = await res.json();

    const photo = p.coverPhotoUrl || 'https://pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev/places/heritage-dai-noi-hue.webp';
    const mapsLink = p.lat && p.lng 
      ? `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((p.name || '') + ' Huế')}`;

    container.innerHTML = `
      <img class="modal-hero-img" src="${photo}" alt="${p.name}" onerror="this.src='https://pub-2a0274a4c8834f6f854b995bcd23969d.r2.dev/places/heritage-dai-noi-hue.webp'" />
      <div class="modal-body">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <h2 class="modal-title">${p.name_vi || p.name}</h2>
          <span style="background: var(--primary-light); color: var(--primary); padding: 0.35rem 0.85rem; border-radius: 9999px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 4px;">
            ★ ${p.googleRating ? p.googleRating.toFixed(1) : '5.0'}
          </span>
        </div>

        <div class="modal-info-row">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <div>
            <strong>Địa chỉ:</strong>
            <p>${p.address_vi || p.address || 'Thành phố Huế'}</p>
          </div>
        </div>

        ${p.phone ? `
          <div class="modal-info-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <div>
              <strong>Điện thoại:</strong>
              <p><a href="tel:${p.phone}" style="color: var(--primary); text-decoration: none;">${p.phone}</a></p>
            </div>
          </div>
        ` : ''}

        ${p.subcategory && p.subcategory.length > 0 ? `
          <div class="modal-info-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3.85 8.62 4.77-4.76a2 2 0 0 1 2.83 0l4.77 4.76a2 2 0 0 1 0 2.83l-4.77 4.76a2 2 0 0 1-2.83 0L3.85 11.45a2 2 0 0 1 0-2.83Z"></path></svg>
            <div>
              <strong>Phân loại:</strong>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                ${p.subcategory.map(s => `<span class="sub-pill">${s}</span>`).join('')}
              </div>
            </div>
          </div>
        ` : ''}

        <!-- HUEGO Audio Guide Player -->
        <div class="audio-guide-box">
          <div class="audio-guide-header">
            <span class="audio-guide-title">
              <span>👑</span>
              <span>Audio Guide Cố Đô (Thuyết minh AI)</span>
            </span>
            <button class="audio-guide-btn" id="modalAudioBtn" onclick="toggleAudioGuide('${encodeURIComponent(p.name_vi || p.name)}', '${encodeURIComponent(p.address_vi || p.address || '')}', '${p.vertical}')">
              <span>🔊</span>
              <span id="audioBtnText">Nghe Thuyết Minh</span>
            </button>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">
            Giọng đọc Cố Đô truyền cảm, tự động thuyết minh lịch sử, nét độc đáo và gợi ý trải nghiệm khi ghé ${p.name_vi || p.name}.
          </p>
        </div>

        <div class="modal-actions">
          <button class="btn-save-itinerary" id="saveItineraryBtn" onclick="toggleSaveItinerary('${p.id}', '${encodeURIComponent(p.name_vi || p.name)}', '${p.vertical}', '${photo}')">
            <span>🔖</span>
            <span id="saveItineraryText">Lưu Lịch Trình</span>
          </button>
          <a class="btn-primary" href="${mapsLink}" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            Chỉ đường Google Maps
          </a>
          <a class="btn-secondary" href="/map.html?lat=${p.lat || 16.4691}&lng=${p.lng || 107.5775}&id=${p.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
            Bản đồ số
          </a>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p style="color: red; padding: 2rem;">Lỗi tải thông tin: ${err.message}</p>`;
  }
};

// Hiển thị phân trang
function renderPagination(current, total) {
  const container = document.getElementById('pagination-container');
  if (!container || total <= 1) {
    if (container) container.innerHTML = '';
    return;
  }

  let html = `
    <button class="page-btn" ${current === 1 ? 'disabled' : ''} onclick="changePage(${current - 1})">
      &laquo; Trước
    </button>
  `;

  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);

  if (start > 1) {
    html += `<button class="page-btn" onclick="changePage(1)">1</button>`;
    if (start > 2) html += `<span style="padding: 0 4px; color: var(--text-dim);">...</span>`;
  }

  for (let i = start; i <= end; i++) {
    html += `
      <button class="page-btn ${i === current ? 'active' : ''}" onclick="changePage(${i})">${i}</button>
    `;
  }

  if (end < total) {
    if (end < total - 1) html += `<span style="padding: 0 4px; color: var(--text-dim);">...</span>`;
    html += `<button class="page-btn" onclick="changePage(${total})">${total}</button>`;
  }

  html += `
    <button class="page-btn" ${current === total ? 'disabled' : ''} onclick="changePage(${current + 1})">
      Sau &raquo;
    </button>
  `;

  container.innerHTML = html;
}

window.changePage = function(page) {
  currentPage = page;
  loadPlaces();
  window.scrollTo({ top: 380, behavior: 'smooth' });
};

// ==========================================================
// HUEGO PRODUCTION WEB LOGIC (Weather, Audio Guide, AI, Itinerary)
// ==========================================================

// 1. Live Weather Loader
async function loadLiveWeather() {
  const badge = document.getElementById('liveWeatherBadge');
  if (!badge) return;

  try {
    const res = await fetch('/api/v1/weather/hue-current');
    if (res.ok) {
      const data = await res.json();
      badge.innerHTML = `
        <span class="weather-icon">${data.isRaining ? '🌧️' : '⛅'}</span>
        <span>Huế ${data.tempCelsius}°C · ${data.description.split(',')[0]}</span>
      `;
      badge.title = data.description;
    }
  } catch (err) {
    badge.innerHTML = `<span>⛅ Huế 27°C · Dịu mát</span>`;
  }
}

// 2. Audio Guide Player
let isAudioPlaying = false;
let currentUtterance = null;

window.toggleAudioGuide = function(encodedName, encodedAddr, vertical) {
  const name = decodeURIComponent(encodedName);
  const addr = decodeURIComponent(encodedAddr);
  const btn = document.getElementById('modalAudioBtn');
  const btnText = document.getElementById('audioBtnText');

  if (isAudioPlaying) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    isAudioPlaying = false;
    if (btn) btn.classList.remove('playing');
    if (btnText) btnText.textContent = 'Nghe Thuyết Minh';
    return;
  }

  let textToSpeak = `Chào mừng quý khách đến với ${name}. `;
  if (vertical === 'tour') {
    textToSpeak += `Đây là một trong những di tích lịch sử và danh lam thắng cảnh tiêu biểu của Cố Đô Huế, tọa lạc tại ${addr || 'trung tâm thành phố Huế'}. Đến đây, quý khách sẽ được chiêm ngưỡng nét kiến trúc cung đình triều Nguyễn độc đáo và cảm nhận chiều sâu văn hóa trầm mặc của đất kinh kỳ.`;
  } else if (vertical === 'fnb') {
    textToSpeak += `Một địa chỉ ẩm thực đặc sản nức tiếng xứ Huế tại ${addr || 'Thành phố Huế'}. Món ăn tại đây được chế biến đậm đà, giữ trọn phong vị ẩm thực Cố Đô khó quên.`;
  } else if (vertical === 'cafe') {
    textToSpeak += `Một không gian cà phê thư thái tuyệt vời tại ${addr || 'xứ Huế'}. Quý khách có thể thưởng thức ly cà phê muối đặc sản và ngắm nhìn nhịp sống êm đềm của Cố Đô.`;
  } else {
    textToSpeak += `Tọa lạc tại ${addr || 'Thành phố Huế'}, đây là điểm dừng chân lý tưởng trong hành trình khám phá di sản Cố Đô Huế của quý khách.`;
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
    currentUtterance.lang = 'vi-VN';
    currentUtterance.rate = 0.95;

    // Tìm giọng tiếng Việt nếu có
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VIE'));
    if (viVoice) currentUtterance.voice = viVoice;

    currentUtterance.onstart = () => {
      isAudioPlaying = true;
      if (btn) btn.classList.add('playing');
      if (btnText) btnText.textContent = 'Dừng Thuyết Minh';
    };

    currentUtterance.onend = () => {
      isAudioPlaying = false;
      if (btn) btn.classList.remove('playing');
      if (btnText) btnText.textContent = 'Nghe Thuyết Minh';
    };

    currentUtterance.onerror = () => {
      isAudioPlaying = false;
      if (btn) btn.classList.remove('playing');
      if (btnText) btnText.textContent = 'Nghe Thuyết Minh';
    };

    window.speechSynthesis.speak(currentUtterance);
  } else {
    alert('Trình duyệt của bạn chưa hỗ trợ phát âm thanh trực tiếp.');
  }
};

// 3. Itinerary / Save Place
window.toggleSaveItinerary = function(id, encodedName, vertical, photo) {
  const name = decodeURIComponent(encodedName);
  const btn = document.getElementById('saveItineraryBtn');
  const btnText = document.getElementById('saveItineraryText');

  let saved = JSON.parse(localStorage.getItem('huego_itinerary') || '[]');
  const idx = saved.findIndex(item => item.id === id);

  if (idx >= 0) {
    saved.splice(idx, 1);
    localStorage.setItem('huego_itinerary', JSON.stringify(saved));
    if (btn) btn.classList.remove('saved');
    if (btnText) btnText.textContent = 'Lưu Lịch Trình';
  } else {
    saved.push({ id, name, vertical, photo, savedAt: Date.now() });
    localStorage.setItem('huego_itinerary', JSON.stringify(saved));
    if (btn) btn.classList.add('saved');
    if (btnText) btnText.textContent = '✓ Đã Lưu Lịch Trình';
  }

  updateItineraryBadge();
};

function updateItineraryBadge() {
  const badge = document.getElementById('itineraryBadge');
  if (!badge) return;
  const saved = JSON.parse(localStorage.getItem('huego_itinerary') || '[]');
  badge.textContent = saved.length > 0 ? saved.length : '';
}

// 4. Floating AI Guide (Mệ Huế)
window.toggleAiChat = function() {
  const drawer = document.getElementById('aiChatDrawer');
  if (!drawer) return;
  drawer.classList.toggle('active');
  if (drawer.classList.contains('active')) {
    const input = document.getElementById('aiChatInput');
    if (input) input.focus();
  }
};

window.sendQuickPrompt = function(text) {
  const input = document.getElementById('aiChatInput');
  if (input) input.value = text;
  sendAiMessage();
};

window.sendAiMessage = async function() {
  const input = document.getElementById('aiChatInput');
  const text = (input ? input.value : '').trim();
  if (!text) return;

  appendWebChatMsg('msg-user', text);
  input.value = '';

  const typingId = 'typing-' + Date.now();
  appendTypingWebMsg(typingId);

  try {
    const res = await fetch('/api/v1/ai-guide/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text, language: 'vi' })
    });

    removeTypingWebMsg(typingId);

    if (res.ok) {
      const data = await res.json();
      appendWebChatMsg('msg-ai', data.answer || data.reply || 'Dạ Mệ đã ghi nhận lời người rồi nhen!');
    } else {
      appendWebChatMsg('msg-ai', 'Dạ Mệ nghe rồi nhen! Huế mình mùa này rất thơ, người muốn ghé quán cà phê muối hay đi dạo ngắm hoàng hôn trên cầu Tràng Tiền thì nói Mệ chỉ lối nghe!');
    }
  } catch (err) {
    removeTypingWebMsg(typingId);
    appendWebChatMsg('msg-ai', 'Dạ Mệ nghe rồi nhen! Huế mình mỗi tấc đất một tích sử thi vị, người muốn Mệ dẫn đường đi đâu hay ăn gì ngon cứ hỏi Mệ nghe!');
  }
};

function appendWebChatMsg(cls, text) {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;

  const bubble = document.createElement('div');
  bubble.className = 'chat-msg ' + cls;
  
  if (cls === 'msg-ai') {
    // format bold & newline
    let formatted = String(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\\n/g, '<br/>')
      .replace(/\n/g, '<br/>');
    bubble.innerHTML = `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;color:var(--primary);font-weight:800;font-size:0.8rem;"><span>👑</span><span>Mệ Huế AI Guide</span></div><div>${formatted}</div>`;
  } else {
    bubble.textContent = text;
  }

  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function appendTypingWebMsg(id) {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;
  const bubble = document.createElement('div');
  bubble.id = id;
  bubble.className = 'chat-msg msg-ai';
  bubble.style.opacity = '0.7';
  bubble.innerHTML = '<em>Mệ Huế đang soạn câu trả lời cho người nghe... ✍️</em>';
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function removeTypingWebMsg(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// Khởi chạy bổ sung khi tải trang
document.addEventListener('DOMContentLoaded', () => {
  loadLiveWeather();
  updateItineraryBadge();

  // Enter trong ô input chat AI
  const chatInput = document.getElementById('aiChatInput');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendAiMessage();
    });
  }
});
