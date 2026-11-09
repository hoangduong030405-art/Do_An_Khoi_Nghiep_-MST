/**
 * Hue4U - Frontend Application Controller
 * Quản lý tìm kiếm, lọc danh mục, phân trang, và hiển thị chi tiết địa điểm
 */

// --- HUEGO DYNAMIC API ADAPTER & GITHUB PAGES GRACEFUL MODE ---
const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('huego.id.vn');
const configuredApi = localStorage.getItem('huego_api_endpoint');
const API_CLOUD_BASE = configuredApi || window.HUEGO_API_CLOUD_URL || (isGitHubPages ? null : '');

function resolveApiUrl(url) {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (API_CLOUD_BASE) {
    return (
      API_CLOUD_BASE.replace(/\/+$/, "") +
      (url.startsWith("/") ? url : "/" + url)
    );
  }
  return url;
}

let currentVertical = "all";
let currentPage = 1;
let currentSearch = "";
let currentSort = "rating";
let totalPages = 1;

// Khởi chạy khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initEventListeners();
  loadCollections();
  loadPlaces();
});

// Quản lý Dark / Light Theme
function initTheme() {
  const savedTheme = localStorage.getItem("hue4u-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("hue4u-theme", next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  const label = document.getElementById("theme-label");
  if (icon && label) {
    if (theme === "dark") {
      icon.innerHTML =
        '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="1" y2="3"></line><line x1="12" y1="21" x2="1" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
      label.textContent = "Giao diện Sáng";
    } else {
      icon.innerHTML =
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      label.textContent = "Giao diện Tối";
    }
  }
}

// Bắt sự kiện tìm kiếm và lọc
function initEventListeners() {
  // Tìm kiếm với debounce
  const searchInput = document.getElementById("search-input");
  let searchTimeout;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentSearch = e.target.value.trim();
        currentPage = 1;
        loadPlaces();
      }, 350);
    });
  }

  // Lọc danh mục Tabs
  const tabBtns = document.querySelectorAll(".category-tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentVertical = btn.getAttribute("data-vertical");
      currentPage = 1;
      loadPlaces();
    });
  });

  // Nút Mở App Desktop vs Mobile handling
  const qrModal = document.getElementById("app-qr-modal");
  const qrCloseBtn = document.getElementById("qr-modal-close-btn");
  const appButtons = document.querySelectorAll(".btn-open-app");

  appButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const isMobile =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768;
      if (!isMobile) {
        e.preventDefault();
        if (qrModal) {
          const appUrl =
            (window.HUEGO_CONFIG && window.HUEGO_CONFIG.appUrl) ||
            (function () {
              try {
                return new URL("app/", window.location.href).href;
              } catch (e) {
                return "./app/";
              }
            })();
          const qrImg = document.getElementById("qr-modal-image");
          const qrUrlText = document.getElementById("qr-modal-url-text");
          const qrDirectLink = document.getElementById("qr-direct-link");

          if (qrImg)
            qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}`;
          if (qrUrlText) qrUrlText.textContent = appUrl;
          if (qrDirectLink) qrDirectLink.href = appUrl;

          qrModal.classList.add("active");
        }
      }
    });
  });

  if (qrCloseBtn && qrModal) {
    qrCloseBtn.addEventListener("click", () =>
      qrModal.classList.remove("active"),
    );
    qrModal.addEventListener("click", (e) => {
      if (e.target === qrModal) qrModal.classList.remove("active");
    });
  }

  // Modal đóng
  const modalClose = document.getElementById("modal-close-btn");
  const modalOverlay = document.getElementById("place-modal");
  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
}

function closeModal() {
  const modal = document.getElementById("place-modal");
  if (modal) modal.classList.remove("active");
}

let staticAllPlaces = null;

function removeVietnameseTones(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

// Tải bộ sưu tập nổi bật
async function loadCollections() {
  const container = document.getElementById("collections-grid");
  if (!container) return;

  try {
    let res = await fetch("/api/collections");
    if (!res.ok) res = await fetch("./data/collections.json");
    const list = await res.json();

    container.innerHTML = list
      .map((item) => {
        const fallbackSvg = window.generateDynamicSvgPlaceholder
          ? window.generateDynamicSvgPlaceholder(item.vertical, item.title)
          : item.heroImage;
        const initialImg = item.heroImage || fallbackSvg;

        return `
        <div class="collection-card" onclick="filterByCollection('${item.vertical}')">
          <img class="collection-img" 
               src="${initialImg}" 
               alt="${item.title}" 
               loading="lazy" 
               decoding="async"
               data-vertical="${item.vertical}"
               data-name="${item.title}"
               onerror="if(window.handleImgError){window.handleImgError(this, '${item.vertical}', '${item.title.replace(/'/g, "\\'")}');}else{this.onerror=null;this.src='${fallbackSvg}';}" />
          <div class="collection-overlay">
            <h3 class="collection-name">${item.title}</h3>
            <p class="collection-sub">${item.subtitle}</p>
          </div>
        </div>
      `;
      })
      .join("");

    // Pre-verify each heroImage using new Image()
    list.forEach((item, idx) => {
      if (item.heroImage && !item.heroImage.startsWith("data:")) {
        const testImg = new Image();
        testImg.onload = () => {};
        testImg.onerror = () => {
          const cardImgs = container.querySelectorAll(".collection-img");
          if (cardImgs[idx]) {
            cardImgs[idx].src = window.generateDynamicSvgPlaceholder(
              item.vertical,
              item.title,
            );
          }
        };
        testImg.src = item.heroImage;
      }
    });
  } catch (err) {
    console.error("Error loading collections:", err);
  }
}

window.filterByCollection = function (vertical) {
  const targetTab = document.querySelector(
    `.category-tab-btn[data-vertical="${vertical}"]`,
  );
  if (targetTab) {
    targetTab.click();
    targetTab.scrollIntoView({ behavior: "smooth", inline: "center" });
  }
};

// Tải danh sách địa điểm theo phân trang & lọc
async function loadPlaces() {
  const grid = document.getElementById("places-grid");
  const countLabel = document.getElementById("results-count");
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
      sortBy: currentSort,
    });

    let data = null;
    try {
      const res = await fetch(`/api/places?${params.toString()}`);
      if (res.ok) data = await res.json();
    } catch (apiErr) {}

    // Fallback static JSON cho GitHub Pages
    if (!data || !data.items) {
      if (!staticAllPlaces) {
        const [placesRes, overridesRes] = await Promise.all([
          fetch("./data/places_all.json"),
          fetch("./data/image_overrides.json").catch(() => null),
        ]);
        staticAllPlaces = await placesRes.json();
        if (overridesRes && overridesRes.ok) {
          const overrides = await overridesRes.json();
          staticAllPlaces.forEach((item) => {
            if (overrides[item.id]) {
              item.imageStatus = overrides[item.id].status;
              if (overrides[item.id].url)
                item.coverPhotoUrl = overrides[item.id].url;
            }
          });
        }
      }

      let items =
        currentVertical !== "all"
          ? staticAllPlaces.filter((p) => p.vertical === currentVertical)
          : staticAllPlaces;

      if (currentSearch) {
        const q = removeVietnameseTones(currentSearch);
        items = items.filter((p) => {
          const nameNorm = removeVietnameseTones(p.name || p.name_vi || "");
          const addrNorm = removeVietnameseTones(
            p.address || p.address_vi || "",
          );
          const subNorm = Array.isArray(p.subcategory)
            ? removeVietnameseTones(p.subcategory.join(" "))
            : "";
          return (
            nameNorm.includes(q) || addrNorm.includes(q) || subNorm.includes(q)
          );
        });
      }

      if (currentSort === "rating") {
        items = [...items].sort(
          (a, b) => (b.googleRating || 0) - (a.googleRating || 0),
        );
      } else if (currentSort === "reviews") {
        items = [...items].sort(
          (a, b) => (b.googleReviewCount || 0) - (a.googleReviewCount || 0),
        );
      } else if (currentSort === "name") {
        items = [...items].sort((a, b) =>
          (a.name || "").localeCompare(b.name || ""),
        );
      }

      const limit = 24;
      const total = items.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (currentPage - 1) * limit;
      const pagedItems = items.slice(startIndex, startIndex + limit);

      data = {
        page: currentPage,
        limit,
        total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        items: pagedItems,
      };
    }

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
  const grid = document.getElementById("places-grid");
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
    tour: "Di tích & Tour",
    fnb: "Ẩm thực",
    cafe: "Cà phê",
    stay: "Lưu trú",
    specialty: "Đặc sản",
    service: "Dịch vụ",
  };

  grid.innerHTML = items
    .map((p) => {
      const photo = window.resolvePlaceImage
        ? window.resolvePlaceImage(p)
        : p.coverPhotoUrl || "";
      const tag = verticalLabels[p.vertical] || p.vertical;
      const rating = p.googleRating ? p.googleRating.toFixed(1) : "Mới";
      const reviews = p.googleReviewCount ? `(${p.googleReviewCount})` : "";
      const safeName = (p.name_vi || p.name || "Địa danh Huế").replace(
        /'/g,
        "\\'",
      );

      return `
      <div class="place-card" onclick="openPlaceDetail('${p.id}')">
        <div class="card-img-wrapper">
          <img class="place-card-img" 
               src="${photo}" 
               alt="${p.name_vi || p.name || ""}" 
               loading="lazy" 
               decoding="async" 
               data-vertical="${p.vertical || "tour"}"
               data-name="${p.name_vi || p.name || ""}"
               onerror="if(window.handleImgError){window.handleImgError(this, '${p.vertical}', '${safeName}');}else{this.onerror=null;}" />
          <span class="badge-tag">${tag}</span>
          <span class="rating-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ${rating} <span style="font-size: 0.7rem; opacity: 0.7;">${reviews}</span>
          </span>
        </div>
        <div class="place-card-body">
          <h3 class="place-name">${p.name_vi || p.name}</h3>
          <p class="place-address">${p.address_vi || p.address || "Thành phố Huế"}</p>
          <div class="place-footer">
            <div class="subcategories-list">
              ${(p.subcategory || [])
                .slice(0, 2)
                .map((s) => `<span class="sub-pill">${s}</span>`)
                .join("")}
            </div>
            <span class="view-detail-btn">
              Chi tiết
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"></path></svg>
            </span>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

// Kiểm tra xem địa điểm có thuộc diện Di tích lịch sử hoặc Du lịch thiên nhiên liên quan chiến tranh
function isNarratableHeritagePlace(p) {
  if (!p) return false;
  const nonHeritageVerticals = ["fnb", "cafe", "stay", "specialty", "service"];
  if (nonHeritageVerticals.includes(p.vertical)) return false;

  const rawName = (p.name_vi || p.name || "").toLowerCase();
  const rawId = (p.id || "").toLowerCase();
  const sub = Array.isArray(p.subcategory)
    ? p.subcategory.join(" ").toLowerCase()
    : "";
  const combined = rawId + " " + rawName + " " + sub;

  const excludeRegex =
    /cà phê|cafe|bún bò|cơm hến|bánh bèo|bánh ép|bánh khoái|chè|khách sạn|hotel|homestay|resort|cây xăng|atm|ngân hàng|siêu thị|quán nhậu|spa|phòng khám|thuốc|xe dịch vụ|tour|thuê xe|đại lý|rú chá|ru cha|đầm chuồn|phá tam giang|thác bồ ghè|suối mơ|thác đổ|vườn lan|vườn hoa|trại thiếu nhi/i;
  if (excludeRegex.test(combined)) return false;

  const heritageRegex =
    /đại nội|hoàng thành|tử cấm thành|ngọ môn|thái hòa|cửu đỉnh|thế miếu|thế tổ miếu|thiên mụ|long an|cổ vật|khải định|tự đức|minh mạng|gia long|thiệu trị|đồng khánh|dục đức|an định|hòn chén|tịnh tâm|cầu ngói|thủy xuân|từ đàm|báo quốc|từ hiếu|quốc học|bảo tàng|đông ba|hổ quyền|voi ré|duyệt thị đường|tàng thư lâu|kỳ đài|cột cờ|thần công|chín hầm|bunker|boongke|đàn âm hồn|âm hồn|khâm sứ|bác hồ|phan bội châu|nguyễn chí thanh|tràng tiền|trường tiền|vọng cảnh|hải vân|đồn nhất|bạch mã|hương giang|sông hương|ngự bình|thuận an|trấn hải thành/i;

  return heritageRegex.test(combined);
}

// Mở modal chi tiết
window.openPlaceDetail = async function (id) {
  const modal = document.getElementById("place-modal");
  const container = document.getElementById("modal-dynamic-content");
  if (!modal || !container) return;

  modal.classList.add("active");
  container.innerHTML = `<div style="text-align: center; padding: 3rem;"><p>Đang tải thông tin chi tiết...</p></div>`;

  try {
    let p = null;
    try {
      const res = await fetch(`/api/places/${id}`);
      if (res.ok) p = await res.json();
    } catch (e) {}

    if (!p) {
      if (!staticAllPlaces) {
        const res = await fetch("./data/places_all.json");
        staticAllPlaces = await res.json();
      }
      p = staticAllPlaces.find((item) => item.id === id);
    }
    if (!p) throw new Error("Không tìm thấy thông tin địa điểm");

    const photo = window.resolvePlaceImage
      ? window.resolvePlaceImage(p)
      : p.coverPhotoUrl || "";
    const mapsLink =
      p.lat && p.lng
        ? `https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((p.name || "") + " Huế")}`;

    container.innerHTML = `
      <img class="modal-hero-img" src="${photo}" alt="${p.name}" loading="lazy" decoding="async" onerror="if(window.handleImgError){window.handleImgError(this, '${p.vertical}', '${(p.name_vi || p.name || "").replace(/'/g, "\\'")}');}else{this.onerror=null;}" />
      <div class="modal-body">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
          <h2 class="modal-title">${p.name_vi || p.name}</h2>
          <span style="background: var(--primary-light); color: var(--primary); padding: 0.35rem 0.85rem; border-radius: 9999px; font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 4px;">
            ★ ${p.googleRating ? p.googleRating.toFixed(1) : "5.0"}
          </span>
        </div>

        <div class="modal-info-row">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          <div>
            <strong>Địa chỉ:</strong>
            <p>${p.address_vi || p.address || "Thành phố Huế"}</p>
          </div>
        </div>

        ${
          p.phone
            ? `
          <div class="modal-info-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <div>
              <strong>Điện thoại:</strong>
              <p><a href="tel:${p.phone}" style="color: var(--primary); text-decoration: none;">${p.phone}</a></p>
            </div>
          </div>
        `
            : ""
        }

        ${
          p.subcategory && p.subcategory.length > 0
            ? `
          <div class="modal-info-row">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3.85 8.62 4.77-4.76a2 2 0 0 1 2.83 0l4.77 4.76a2 2 0 0 1 0 2.83l-4.77 4.76a2 2 0 0 1-2.83 0L3.85 11.45a2 2 0 0 1 0-2.83Z"></path></svg>
            <div>
              <strong>Phân loại:</strong>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                ${p.subcategory.map((s) => `<span class="sub-pill">${s}</span>`).join("")}
              </div>
            </div>
          </div>
        `
            : ""
        }

        <!-- HUEGO Audio Guide Player -->
        <div class="audio-guide-box" style="margin-top: 1rem; padding: 1rem; background: linear-gradient(135deg, rgba(88,44,131,0.08), rgba(212,175,55,0.12)); border: 1px solid rgba(212,175,55,0.3); border-radius: 12px;">
          <div class="audio-guide-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="audio-guide-title" style="font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 6px;">
              <span>👑</span>
              <span>Audio Guide Cố Đô (Thuyết minh AI)</span>
            </span>
            <button class="audio-guide-btn" id="modalAudioBtn" onclick="toggleAudioGuide('${p.id || ""}', '${encodeURIComponent(p.name_vi || p.name || "")}', '${encodeURIComponent(p.address_vi || p.address || "")}', '${p.vertical || ""}')" style="background: var(--primary); color: white; border: none; padding: 6px 14px; border-radius: 20px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s;">
              <span>🔊</span>
              <span id="audioBtnText">Nghe Thuyết Minh</span>
            </button>
          </div>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 4px;">
            Giọng đọc Cố Đô truyền cảm, tự động thuyết minh lịch sử, nét độc đáo và gợi ý trải nghiệm khi ghé ${p.name_vi || p.name}.
          </p>
          <div id="audioGuideSummaryText" style="display:none; font-size: 0.82rem; color: #1f2937; background: rgba(255,255,255,0.9); border-left: 3px solid var(--accent-gold); padding: 8px 10px; border-radius: 4px; margin-top: 8px; line-height: 1.5;"></div>
        </div>

        <div class="modal-actions" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 1rem;">
          <button class="btn-save-itinerary" id="saveItineraryBtn" onclick="toggleSaveItinerary('${p.id}', '${encodeURIComponent(p.name_vi || p.name)}', '${p.vertical}', '${photo}')" style="padding: 0.6rem 1rem; border-radius: 10px; border: 1px solid var(--border); background: var(--bg-card); cursor: pointer; display: flex; align-items: center; gap: 6px; font-weight: 600;">
            <span>🔖</span>
            <span id="saveItineraryText">Lưu Lịch Trình</span>
          </button>
          <a class="btn-primary" href="${mapsLink}" target="_blank" rel="noopener noreferrer" style="padding: 0.6rem 1.2rem; border-radius: 10px; background: var(--primary); color: white; text-decoration: none; display: flex; align-items: center; gap: 6px; font-weight: 600;">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            Chỉ đường Google Maps
          </a>
          <a class="btn-secondary" href="./app/" style="padding: 0.6rem 1.2rem; border-radius: 10px; background: rgba(88,44,131,0.1); color: var(--primary); text-decoration: none; display: flex; align-items: center; gap: 6px; font-weight: 600;">
            <span>📱</span> Mở App Bản Đồ 3D
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
  const container = document.getElementById("pagination-container");
  if (!container || total <= 1) {
    if (container) container.innerHTML = "";
    return;
  }

  let html = `
    <button class="page-btn" ${current === 1 ? "disabled" : ""} onclick="changePage(${current - 1})">
      &laquo; Trước
    </button>
  `;

  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);

  if (start > 1) {
    html += `<button class="page-btn" onclick="changePage(1)">1</button>`;
    if (start > 2)
      html += `<span style="padding: 0 4px; color: var(--text-dim);">...</span>`;
  }

  for (let i = start; i <= end; i++) {
    html += `
      <button class="page-btn ${i === current ? "active" : ""}" onclick="changePage(${i})">${i}</button>
    `;
  }

  if (end < total) {
    if (end < total - 1)
      html += `<span style="padding: 0 4px; color: var(--text-dim);">...</span>`;
    html += `<button class="page-btn" onclick="changePage(${total})">${total}</button>`;
  }

  html += `
    <button class="page-btn" ${current === total ? "disabled" : ""} onclick="changePage(${current + 1})">
      Sau &raquo;
    </button>
  `;

  container.innerHTML = html;
}

window.changePage = function (page) {
  currentPage = page;
  loadPlaces();
  window.scrollTo({ top: 380, behavior: "smooth" });
};

// ==========================================================
// HUEGO PRODUCTION WEB LOGIC (Weather, Audio Guide, AI, Itinerary)
// ==========================================================

// 1. Live Weather Loader
let webRainSim = false;

// 1. Live Weather Loader
async function loadLiveWeather() {
  const badge = document.getElementById("liveWeatherBadge");
  if (!badge) return;

  try {
    let data;
    if (isGitHubPages && !API_CLOUD_BASE) {
      data = {
        condition: "clear",
        description: "Huế 28°C · Nắng ráo Cố Đô, gió sông Hương dịu mát",
        tempCelsius: 28,
        isRaining: webRainSim,
        isExtremelyHot: false,
        airQualityIndex: 32,
        recommendation:
          "Thời tiết tuyệt vời để tham quan Đại Nội và đạp xe quanh sông Hương",
        source: "github-pages-graceful-adapter",
      };
    } else {
      const res = await fetch(resolveApiUrl("/api/v1/weather/hue-current"));
      if (res.ok) {
        data = await res.json();
      }
    }

    if (data) {
      if (data.condition === "no_key" && !webRainSim) {
        badge.innerHTML = `
          <span class="weather-icon">📡</span>
          <span>Chưa kết nối dữ liệu thời tiết</span>
          <button onclick="toggleWebRainSimulation(event)" style="margin-left:6px; background:rgba(255,255,255,0.2); border:none; color:white; border-radius:10px; padding:2px 8px; font-size:10px; cursor:pointer;" title="Mô phỏng trời mưa để kiểm thử trình diễn">🌧️ Giả lập mưa (Demo)</button>
        `;
        badge.title = data.recommendation;
        return;
      }
      const isStale = data.stale || data.source === "stale";
      const staleTag = isStale
        ? ' <small style="color:#F59E0B;">(Dữ liệu cũ)</small>'
        : "";
      const isRain = webRainSim || data.isRaining;
      const tempDisplay =
        data.tempCelsius != null ? `${data.tempCelsius}°C · ` : "";
      badge.innerHTML = `
        <span class="weather-icon">${isRain ? "🌧️" : "⛅"}</span>
        <span>Huế ${tempDisplay}${isRain ? "Mưa ngâu" : data.description.split(",")[0]}${staleTag}</span>
        <button onclick="toggleWebRainSimulation(event)" style="margin-left:6px; background:${webRainSim ? "#0284C7" : "rgba(255,255,255,0.2)"}; border:none; color:white; border-radius:10px; padding:2px 8px; font-size:10px; cursor:pointer;" title="Mô phỏng trời mưa để kiểm thử trình diễn demo">🌧️ ${webRainSim ? "Mưa: BẬT" : "Giả lập mưa (Demo)"}</button>
      `;
      badge.title = data.description + (isStale ? " (Dữ liệu cache cũ)" : "");
    }
  } catch (err) {
    badge.innerHTML = `<span>⛅ Chưa kết nối thời tiết</span>`;
  }
}

window.toggleWebRainSimulation = function (e) {
  if (e) e.stopPropagation();
  webRainSim = !webRainSim;
  loadLiveWeather();
  if (webRainSim) {
    if (typeof filterByVertical === "function") {
      filterByVertical("fnb"); // Gợi ý ẩm thực/trong nhà khi trời mưa
    }
  }
};

// 2. Audio Guide Player (Thuyết minh AI Cố Đô chuẩn văn hóa & tương thích 100% mọi trình duyệt)
let isAudioPlaying = false;
let currentAudioPlayer = null;
let currentAudioQueue = [];
let currentAudioIdx = 0;

const HUE_HERITAGE_LORE = {
  '1': {
    name: 'Đại Nội Huế',
    match: ['đại nội', 'hoàng thành', 'tử cấm thành', 'ngọ môn', 'thái hòa', 'cửu đỉnh', 'thế miếu', 'kiến trung'],
    script: 'Dạ, kính chào quý khách đã đến với Đại Nội Huế – trái tim của vương triều nhà Nguyễn suốt 143 năm từ năm 1802 đến 1945. Nơi đây gồm Hoàng Thành và Tử Cấm Thành, với những công trình biểu tượng như Ngọ Môn ngũ phụng tề phi, Điện Thái Hòa nơi đặt ngai vàng uy nghiêm của 13 vị hoàng đế, và Cửu Đỉnh đúc năm 1835 tượng trưng cho sự trường tồn và thống nhất non sông gấm vóc.',
    fact: 'Sân Đại Triều Nghi trước điện Thái Hòa được lát bằng đá Thanh đẽo gọt độ dốc mai rùa giúp thoát nước mưa tức thì và khuếch đại giọng xướng truyền chỉ của quan tán vang rền khắp khoảng sân rộng.'
  },
  '2': {
    name: 'Chùa Thiên Mụ',
    match: ['thiên mụ', 'linh mụ', 'phước duyên', 'hà khê'],
    script: 'Dạ thưa quý khách, chào mừng người ghé thăm Chùa Thiên Mụ – đệ nhất cổ tự xứ Huế tọa lạc trên đồi Hà Khê soi bóng xuống dòng sông Hương. Chùa được chúa Tiên Nguyễn Hoàng khởi lập vào năm Tân Sửu 1601. Điểm nhấn nổi bật nhất trước sân chùa là Tháp Phước Duyên hình bát giác 7 tầng cao 21 mét xây dựng năm 1844 dưới triều vua Thiệu Trị, cùng quả Đại Hồng Chung đúc năm 1710 ngân vang mỗi sớm chiều.',
    fact: 'Phía sau hoa viên chùa còn lưu giữ di vật lịch sử: chiếc xe ô tô Austin màu xanh lam đưa cố Hòa thượng Thích Quảng Đức tự thiêu vì tự do tín ngưỡng năm 1963.'
  },
  '3': {
    name: 'Bảo tàng Cổ vật Cung đình Huế (Điện Long An)',
    match: ['cổ vật', 'điện long an', 'bảo tàng cung đình'],
    script: 'Dạ thưa quý khách, hiện bạn đang dừng chân trước Điện Long An – nơi lưu giữ Bảo tàng Cổ vật Cung đình Huế tại số 3 đường Lê Trực. Ngôi điện được xây dựng vào năm 1845 dưới triều vua Thiệu Trị, là kiệt tác kiến trúc cung đình trùng thiềm điệp ốc tráng lệ bậc nhất Việt Nam với 128 cột gỗ lim bề thế, vách gỗ chạm trổ hoa văn lưỡng long và khắc 448 bài thơ chữ Hán thếp vàng.',
    fact: 'Trên vách gỗ gian giữa Điện Long An có bài thơ hồi văn 56 chữ sắp xếp hình bát quái của vua Thiệu Trị mang tên "Vũ trung sơn thủy", có thể tách đọc thành 64 bài thơ thất ngôn và ngũ ngôn hoàn chỉnh.'
  },
  '4': {
    name: 'Lăng Khải Định',
    match: ['khải định', 'ứng lăng', 'châu chữ', 'thiên định'],
    script: 'Dạ thưa quý khách, chúng ta đang đứng trước Lăng Khải Định – lăng tẩm có phong cách kiến trúc độc nhất vô nhị trên triền núi Châu Chữ, hoàn thành năm 1931. Công trình là đỉnh cao giao thoa táo bạo giữa kiến trúc cung đình truyền thống phương Đông với nghệ thuật Baroque và Gothic phương Tây. Cung Thiên Định ở tầng cao nhất là tuyệt tác của nghệ thuật khảm hàng triệu mảnh sành sứ và pha lê ghép nổi sống động như gấm vóc.',
    fact: 'Bức đại bích họa "Cửu Long Ẩn Vân" trên trần Cung Thiên Định do nghệ nhân bậc thầy Phan Văn Tánh dùng cả hai tay và mười đầu ngón chân kẹp cọ vẽ nên, bền màu suốt hơn một thế kỷ.'
  },
  '5': {
    name: 'Lăng Tự Đức',
    match: ['tự đức', 'khiêm lăng', 'lưu khiêm', 'xung khiêm tạ'],
    script: 'Dạ thưa quý khách, chào mừng người ghé thăm Khiêm Lăng – nơi an nghỉ ngàn thu của vua Tự Đức, vị vua thi sĩ tài hoa của triều Nguyễn. Được xây dựng giữa một thung lũng thôn Thượng Ba, lăng tẩm mang vẻ đẹp hữu tình, lãng mạn như một bức tranh thủy mặc với gần 50 công trình đều mang chữ Khiêm. Mặt hồ Lưu Khiêm phẳng lặng thả đầy hoa sen ngát hương soi bóng Xung Khiêm Tạ và Dũ Khiêm Tạ cổ kính.',
    fact: 'Trong Bi Đình có tấm bia đá Thanh "Khiêm Cung Ký" nặng hơn 20 tấn, tấm bia lớn nhất Việt Nam, do chính vua Tự Đức tự tay soạn thảo trần tình nỗi niềm trước vận nước.'
  },
  '6': {
    name: 'Cầu Tràng Tiền',
    match: ['tràng tiền', 'trường tiền', 'sông hương', 'hương giang'],
    script: 'Dạ thưa quý khách, đứng trước dòng sông Hương thơ mộng, không ai có thể bỏ qua cây cầu Tràng Tiền – chứng nhân lịch sử hơn 125 năm gắn liền với từng nhịp thở của Cố Đô Huế. Cầu được khởi công xây dựng vào năm 1897 do hãng Eiffel thiết kế, khánh thành năm 1899 với 6 vài 12 nhịp thép hình vành lược duyên dáng vắt qua dòng sông Hương, dài 402,6 mét.',
    fact: 'Đợt đại trùng tu năm 1937 dưới thời vua Bảo Đại đã mở rộng thêm các ban-công ngắm cảnh hình bán nguyệt chìa ra lòng sông Hương thi vị như ngày nay.'
  },
  '8': {
    name: 'Đồi Vọng Cảnh',
    match: ['vọng cảnh', 'đồi vọng cảnh'],
    script: 'Dạ thưa quý khách, đồi Vọng Cảnh cao 43 mét nằm thoai thoải bên bờ Nam sông Hương. Đúng như tên gọi, đây được mệnh danh là điểm ngắm khúc uốn dòng sông Hương ngoạn mục và thơ mộng nhất xứ Huế. Từ đỉnh đồi lộng gió rợp bóng thông xanh, bạn sẽ thấy dòng Hương Giang uốn mình mềm mại ôm lấy chân đồi, hai bên là vườn thanh trà Nguyệt Biều xanh biếc.',
    fact: 'Trên đỉnh đồi hiện đã được phục dựng thành đài vọng cảnh sinh thái với sàn gỗ 360 độ trên nền lô cốt cũ, bao quát trọn vẹn cảnh sắc núi Ngự sông Hương.'
  },
  '11': {
    name: 'Làng Hương Thủy Xuân',
    match: ['thủy xuân', 'làng hương', 'trầm hương'],
    script: 'Dạ thưa quý khách, bước chân vào đường Huyền Trân Công Chúa, khứu giác của bạn sẽ được đánh thức bởi mùi hương trầm mộc mạc của Làng hương Thủy Xuân – làng nghề truyền thống hơn 700 năm tuổi. Người thợ Thủy Xuân làm hương hoàn toàn từ nguyên liệu tự nhiên: trầm kiến, quế chi, hoa hồi, đinh hương và vỏ bưởi giã mịn, xòe thành những đóa hoa hương rực rỡ.',
    fact: 'Hương trầm Thủy Xuân chính gốc cháy rất đượm, tàn uốn cong mềm mại và tỏa ra làn khói mỏng thơm dịu giúp thanh lọc không khí, an định tinh thần.'
  },
  'dong-ba': {
    name: 'Chợ Đông Ba',
    match: ['đông ba', 'chợ đông ba'],
    script: 'Dạ thưa quý khách, chào mừng người ghé thăm Chợ Đông Ba – ngôi chợ lớn và sầm uất bậc nhất xứ Huế nằm bên bờ sông Hương suốt hơn 120 năm qua. Nơi đây là kho tàng văn hóa ẩm thực và nếp sống sinh hoạt đời thường đậm chất Huế với hàng trăm món ngon nức tiếng từ bún bò, bánh bèo nậm lọc, cơm hến cho tới chè bột lọc bọc heo quay.',
    fact: 'Chợ Đông Ba nguyên nằm bên ngoài cửa Chánh Đông (cửa Đông Ba), đến năm 1899 vua Thành Thái cho dời ra vị trí đắc địa bên bờ sông Hương như hiện nay.'
  }
};

window.toggleAudioGuide = async function (arg1, arg2, arg3, arg4) {
  let placeId = "";
  let name = "";
  let addr = "";
  let vertical = "";

  if (arg4 !== undefined) {
    placeId = String(arg1 || "");
    name = decodeURIComponent(arg2 || "");
    addr = decodeURIComponent(arg3 || "");
    vertical = String(arg4 || "");
  } else {
    name = decodeURIComponent(arg1 || "");
    addr = decodeURIComponent(arg2 || "");
    vertical = String(arg3 || "");
    placeId = "";
  }

  const btn = document.getElementById("modalAudioBtn");
  const btnText = document.getElementById("audioBtnText");
  const summaryElem = document.getElementById("audioGuideSummaryText");

  // Dừng nếu đang phát
  if (isAudioPlaying) {
    stopCurrentAudio();
    return;
  }

  function stopCurrentAudio() {
    isAudioPlaying = false;
    if (currentAudioPlayer) {
      try {
        currentAudioPlayer.pause();
        currentAudioPlayer.currentTime = 0;
      } catch (_) {}
    }
    if ("speechSynthesis" in window) {
      try { window.speechSynthesis.cancel(); } catch (_) {}
    }
    if (btn) {
      btn.classList.remove("playing");
      btn.style.background = "var(--primary)";
    }
    if (btnText) btnText.textContent = "Nghe Thuyết Minh";
  }

  if (btnText) btnText.textContent = "Đang tải bài...";

  // 1. Tìm câu chuyện lịch sử phù hợp
  let matchedStory = null;
  const lowerName = (name + " " + placeId).toLowerCase();

  for (const key in HUE_HERITAGE_LORE) {
    const item = HUE_HERITAGE_LORE[key];
    if (item.match && item.match.some(m => lowerName.includes(m))) {
      matchedStory = item;
      break;
    }
  }

  let textToSpeak = "";
  let factText = "";

  if (matchedStory) {
    textToSpeak = matchedStory.script;
    factText = matchedStory.fact;
  } else {
    textToSpeak = `Chào mừng quý khách đến với ${name || "Cố Đô Huế"}. Đây là một trong những điểm dừng chân mang đậm nét văn hóa và trầm tích lịch sử độc đáo của Cố Đô. Xin mời quý khách lắng nghe và khám phá nét đẹp ngàn năm nơi đây.`;
    factText = `Địa danh ${name || "Huế"} nằm trong quần thể không gian văn hóa di sản của vùng đất Thần Kinh Cố Đô.`;
  }

  if (summaryElem) {
    summaryElem.style.display = "block";
    summaryElem.innerHTML = `<strong>Ký ức & Lịch sử:</strong> ${factText}`;
  }

  // 2. Phát âm thanh
  isAudioPlaying = true;
  if (btn) {
    btn.classList.add("playing");
    btn.style.background = "#DC2626";
  }
  if (btnText) btnText.textContent = "Dừng Thuyết Minh";

  const rawSentences = textToSpeak.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g) || [textToSpeak];
  currentAudioQueue = rawSentences.map(s => s.trim()).filter(s => s.length > 0);
  currentAudioIdx = 0;

  if (!currentAudioPlayer) {
    currentAudioPlayer = new Audio();
  }

  function playNextSentence() {
    if (!isAudioPlaying || currentAudioIdx >= currentAudioQueue.length) {
      stopCurrentAudio();
      return;
    }

    const s = currentAudioQueue[currentAudioIdx];
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodeURIComponent(s)}`;
    
    currentAudioPlayer.src = ttsUrl;
    currentAudioPlayer.onended = () => {
      if (isAudioPlaying) {
        currentAudioIdx++;
        playNextSentence();
      }
    };
    currentAudioPlayer.onerror = () => {
      speakWithWebSpeech(s);
    };

    currentAudioPlayer.play().catch(err => {
      speakWithWebSpeech(s);
    });
  }

  function speakWithWebSpeech(sentence) {
    if (!('speechSynthesis' in window)) {
      stopCurrentAudio();
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(sentence);
    utter.lang = 'vi-VN';
    utter.rate = 0.95;
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VIE'));
    if (viVoice) utter.voice = viVoice;

    utter.onend = () => {
      if (isAudioPlaying) {
        currentAudioIdx++;
        playNextSentence();
      }
    };
    utter.onerror = () => {
      if (isAudioPlaying) {
        currentAudioIdx++;
        playNextSentence();
      }
    };
    window.speechSynthesis.speak(utter);
  }

  playNextSentence();
};

// 3. Itinerary / Save Place
window.toggleSaveItinerary = function (id, encodedName, vertical, photo) {
  const name = decodeURIComponent(encodedName);
  const btn = document.getElementById("saveItineraryBtn");
  const btnText = document.getElementById("saveItineraryText");

  let saved = JSON.parse(localStorage.getItem("huego_itinerary") || "[]");
  const idx = saved.findIndex((item) => item.id === id);

  if (idx >= 0) {
    saved.splice(idx, 1);
    localStorage.setItem("huego_itinerary", JSON.stringify(saved));
    if (btn) btn.classList.remove("saved");
    if (btnText) btnText.textContent = "Lưu Lịch Trình";
  } else {
    saved.push({ id, name, vertical, photo, savedAt: Date.now() });
    localStorage.setItem("huego_itinerary", JSON.stringify(saved));
    if (btn) btn.classList.add("saved");
    if (btnText) btnText.textContent = "✓ Đã Lưu Lịch Trình";
  }

  updateItineraryBadge();
};

function updateItineraryBadge() {
  const badge = document.getElementById("itineraryBadge");
  if (!badge) return;
  const saved = JSON.parse(localStorage.getItem("huego_itinerary") || "[]");
  badge.textContent = saved.length > 0 ? saved.length : "";
}

// 4. Floating AI Guide (Mệ Huế)
window.toggleAiChat = function () {
  const drawer = document.getElementById("aiChatDrawer");
  if (!drawer) return;
  drawer.classList.toggle("active");
  if (drawer.classList.contains("active")) {
    const input = document.getElementById("aiChatInput");
    if (input) input.focus();
  }
};

window.sendQuickPrompt = function (text) {
  const input = document.getElementById("aiChatInput");
  if (input) input.value = text;
  sendAiMessage();
};

function getLocalAiReply(question) {
  const q = (question || "").toLowerCase().trim();
  const qNoAccent = q
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");

  if (
    /^(xin chào|chào mệ|chào bạn|hello|hi|hey|alo|mệ ơi|bạn là ai|mệ là ai)[!.,?\s]*$/i.test(
      q,
    )
  ) {
    return "Dạ, Mệ chào người con thương quý nhen! 👑 Mệ là **Mệ Huế** — hướng dẫn viên bản địa của ứng dụng **HUEGO**.\n\nMệ có thể giúp bạn:\n• **Kể chuyện lịch sử, báo giá vé & giờ mở cửa** Đại Nội, 7 lăng tẩm triều Nguyễn, Chùa Thiên Mụ, Cung An Định...\n• **Chỉ điểm quán ăn chuẩn Huế** (bún bò, cơm hến, bánh bèo nậm lọc, bánh ép, bánh khoái, chè heo quay, cà phê muối).\n• **Thiết kế lịch trình 1–3 ngày** hoặc gợi ý điểm đi chơi buổi tối, ngày mưa.\n\nHôm nay bạn muốn Mệ tư vấn điểm đến hay món ngon nào trước nhen?";
  }
  if (
    /^(cảm ơn|cám ơn|thank|thanks|hay quá|tuyệt quá)/i.test(q) &&
    q.length < 40
  ) {
    return "Dạ không có chi mô nhen! Đi chơi Huế cần hỏi giá vé, giờ mở cửa hay quán ăn ngon chuẩn bản địa thì cứ nhắn Mệ liền nghe! 🌸";
  }

  const asksTicket =
    /giá vé|vé vào|bao nhiêu tiền|miễn phí|mua vé|chi phí|gia ve/.test(q) ||
    /gia ve/.test(qNoAccent);
  const asksHours =
    /giờ mở cửa|mấy giờ|mở cửa|đóng cửa|buổi nào đẹp|gio mo cua|may gio/.test(
      q,
    ) || /gio mo cua/.test(qNoAccent);

  if (
    /đại nội|hoàng thành|tử cấm thành|ngọ môn|thái hòa|dai noi|hoang thanh/.test(
      q,
    ) ||
    /dai noi|hoang thanh/.test(qNoAccent)
  ) {
    if (asksTicket)
      return "Dạ, giá vé tham quan **Đại Nội Huế (Hoàng Thành)** hiện tại là **200.000 VNĐ/người lớn** và **40.000 VNĐ/trẻ em (7–12 tuổi)**.\n• **Mẹo tiết kiệm**: Bạn nên mua **vé tuyến Combo 3 điểm** (Đại Nội + Lăng Minh Mạng + Lăng Khải Định: **420.000đ**) hoặc **Combo 4 điểm** (+ Lăng Tự Đức: **530.000đ**) sẽ tiết kiệm hơn nhiều so với mua lẻ từng điểm nhen!";
    if (asksHours)
      return "Dạ, **Đại Nội Huế** mở cửa đón khách hàng ngày từ **06:30 – 17:30 (mùa hè)** và **07:00 – 17:00 (mùa đông)**. Bạn nên đi tầm **07:30 – 10:00 sáng** hoặc **15:30 – 17:00 chiều** để trời mát và chụp ảnh cổ phục trước Ngọ Môn – Điện Thái Hòa đẹp nhất nhen!";
    return "Dạ, **Đại Nội Huế (Hoàng Thành & Tử Cấm Thành)** được vua Gia Long khởi công khảo sát năm **1804** và hoàn thiện quy mô dưới thời vua Minh Mạng năm **1833**, là trung tâm quyền lực của 13 đời vua triều Nguyễn suốt 143 năm (1802–1945).\n• **Điểm nhấn không thể bỏ lỡ**: Cổng Ngọ Môn, Điện Thái Hòa, Thế Tổ Miếu & Cửu Đỉnh, Cung Diên Thọ, Điện Kiến Trung.\n• **Giờ mở cửa**: 07:00 – 17:30 | **Giá vé**: 200.000 VNĐ/người lớn.";
  }
  if (
    /thiên mụ|linh mụ|phước duyên|thien mu/.test(q) ||
    /thien mu/.test(qNoAccent)
  ) {
    return "Dạ, **Chùa Thiên Mụ (Linh Mụ Tự)** trên đồi Hà Khê bên bờ Bắc sông Hương được chúa Tiên Nguyễn Hoàng khởi lập năm **1601**. Nổi bật nhất là **Tháp Phước Duyên 7 tầng** cao 21m xây năm 1844 thời vua Thiệu Trị và chiếc xe Austin cổ của Bồ tát Thích Quảng Đức.\n• **Giờ mở cửa**: 06:00 – 18:00 hằng ngày | **Giá vé**: Miễn phí hoàn toàn.";
  }
  if (/khải định|ứng lăng|khai dinh/.test(q) || /khai dinh/.test(qNoAccent)) {
    return "Dạ, **Lăng Khải Định (Ứng Lăng)** trên núi Châu Chữ (xã Thủy Bằng) được xây dựng suốt 11 năm (**1920 – 1931**), nổi tiếng với kiến trúc giao thoa Đông – Tây và cung Thiên Định khảm hàng triệu mảnh sành sứ, thủy tinh cùng bức họa **Cửu Long Ẩn Vân** trên trần điện.\n• **Giờ mở cửa**: 07:00 – 17:30 | **Giá vé**: 150.000 VNĐ/người lớn.";
  }
  if (/tự đức|khiêm lăng|tu duc/.test(q) || /tu duc/.test(qNoAccent)) {
    return "Dạ, **Lăng Tự Đức (Khiêm Lăng)** tại phường Thủy Xuân được xây dựng từ **1864 – 1867**, mang vẻ đẹp thơ mộng như một bức tranh thủy mặc với hồ sen Lưu Khiêm, Xung Khiêm Tạ, Dũ Khiêm Tạ và tấm bia đá **Khiêm Cung Ký** 4.935 chữ do chính vua Tự Đức soạn.\n• **Giờ mở cửa**: 07:00 – 17:30 | **Giá vé**: 150.000 VNĐ/người lớn.";
  }
  if (/minh mạng|hiếu lăng|minh mang/.test(q) || /minh mang/.test(qNoAccent)) {
    return "Dạ, **Lăng Minh Mạng (Hiếu Lăng)** trên núi Cẩm Kê (xã Hương Thọ, xây dựng **1840 – 1843**) nổi tiếng với bố cục 40 công trình đăng đối nghiêm ngặt trên trục Thần Đạo dài 700m, giữa hồ Tân Nguyệt và rừng thông xanh ngát.\n• **Giờ mở cửa**: 07:00 – 17:30 | **Giá vé**: 150.000 VNĐ/người lớn.";
  }
  if (
    /vọng cảnh|làng hương|thủy xuân|vong canh|lang huong/.test(q) ||
    /vong canh|lang huong/.test(qNoAccent)
  ) {
    return "Dạ, trục đường **Huyền Trân Công Chúa** là cung đường check-in tuyệt đẹp buổi chiều tại Huế:\n1. **Làng hương trầm Thủy Xuân** (hơn 700 năm tuổi): Thuê áo dài cổ phục chụp giữa những bó hương xòe hoa ngũ sắc rực rỡ (miễn phí vé vào).\n2. **Đồi Vọng Cảnh** (cách làng hương 800m): Ngắm khúc uốn mềm mại của dòng sông Hương dưới ánh hoàng hôn từ 16:30 – 18:00 (miễn phí hoàn toàn).";
  }
  if (
    /tràng tiền|trường tiền|trang tien/.test(q) ||
    /trang tien/.test(qNoAccent)
  ) {
    return "Dạ, **Cầu Tràng Tiền** dài 402,6m với **6 vài 12 nhịp thép** do hãng Eiffel thiết kế, khởi công năm **1897** và khánh thành năm **1899** dưới triều vua Thành Thái. Buổi tối từ 18:30 cầu bật đèn LED đổi màu lung linh, rất tuyệt để tản bộ dọc Cầu Gỗ Lim và ăn bánh mì Tràng Tiền, chè Hẻm!";
  }
  if (/bún bò|bun bo/.test(q) || /bun bo/.test(qNoAccent)) {
    return "Dạ, **Bún bò Huế** chuẩn vị có nước dùng ninh xương ống bò cùng sả thơm lừng, dậy vị mắm ruốc Huế và chả cua giòn ngọt!\n🍜 **Địa chỉ ngon trứ danh**:\n1. **Bún bò Mụ Rơi**: 40 Nguyễn Chí Diểu (hoặc Nguyễn Du) — bán sáng 06:00 – 10:00.\n2. **Bún bò Bà Tuyết**: 47 Nguyễn Công Trứ (06:00 – 22:00).\n3. **Bún bò O Phụng**: 14 Nguyễn Du (bán chiều).\n• **Giá**: 35.000đ – 55.000đ/tô.";
  }
  if (/cơm hến|bún hến|cồn hến|com hen/.test(q) || /com hen/.test(qNoAccent)) {
    return "Dạ, **Cơm hến – Bún hến** chuẩn gốc phải ghé **Cơm hến Hoa Đông** (64 Kiệt 7 Ưng Bình, Cồn Hến), **Cơm hến Bà Cam** (49 Tùng Thiện Vương) hoặc **Quán Nhỏ** (11 Ngô Quyền). Tô cơm nguội trộn hến xào, tóp mỡ giòn, mắm ruốc cay nồng chan nước hến nóng chỉ 15.000đ – 25.000đ!";
  }
  if (/bánh ép|banh ep/.test(q) || /banh ep/.test(qNoAccent)) {
    return "Dạ, **Bánh ép Huế** nóng hổi dẻo dai cuộn rau răm, đu đủ chua chấm mắm tỏi ớt thì ghé ngay:\n1. **Bánh ép Cây Dừa**: 69 – 73 Nhật Lệ (trong Thành Nội).\n2. **Bánh ép Gia Di**: 101 Bà Triệu hoặc 4 Phùng Chí Kiên.\n3. **Bánh ép Chị Huệ**: 118 Lê Ngô Cát.";
  }
  if (
    /bánh bèo|bánh nậm|bánh lọc|ram ít|bánh khoái|nem lụi|banh beo|banh loc|banh khoai/.test(
      q,
    ) ||
    /banh beo|banh loc|banh khoai/.test(qNoAccent)
  ) {
    return "Dạ, muốn thưởng thức trọn bộ **Bánh bèo chén – Bánh nậm – Bánh bột lọc – Ram ít – Bánh khoái** chuẩn Huế, bạn ghé ngay:\n1. **Bánh Bà Đỏ**: Số 8 Nguyễn Bỉnh Khiêm, Phú Cát.\n2. **Bánh O Lé**: Kiệt 104 Kim Long.\n3. **Bánh khoái Hồng Mai**: 110 Đinh Tiên Hoàng (ngay gần cửa Thượng Tứ).\n4. **Bánh ướt thịt nướng Huyền Anh**: 50 Kim Long.";
  }
  if (
    /\bchè\b|chè huế|chè hẻm|chè heo quay|che hue|che hem/.test(q) ||
    /che hue|che hem/.test(qNoAccent)
  ) {
    return "Dạ, nhắc tới **Chè Huế** thì nhất định phải thử **Chè bột lọc bọc heo quay**, chè hạt sen nhãn lồng và chè đậu ngự tại:\n1. **Chè Mợ Tôn Đích**: Trước cổng Công viên Thương Bạc (đường Trần Hưng Đạo, từ 18:00 – 22:30).\n2. **Chè Hẻm Hùng Vương**: Số 1 Kiệt 29 Hùng Vương.\n3. **Chè Cầm**: Số 10 Nguyễn Sinh Cung.";
  }
  if (
    /cà phê|cafe|coffee|trà cung đình|ca phe/.test(q) ||
    /ca phe|cafe/.test(qNoAccent)
  ) {
    return "Dạ, uống **Cà phê Muối** chuẩn gốc nơi khai sinh tại Huế thì ghé **Số 10 Nguyễn Lương Định** hoặc **Số 142 Đặng Thái Thân** (ngay sát tường Đại Nội Huế) nhen! Nếu thích không gian hoài cổ thì ghé **Tân. Cafe** (14 Phạm Hồng Thái) hoặc **Không gian Trà Cung Đình Kim Long**.";
  }
  if (
    /ăn gì|món ngon|ẩm thực|ăn vặt|quán ngon|an gi|mon ngon|an vat/.test(q) ||
    /an gi|mon ngon|an vat/.test(qNoAccent)
  ) {
    return "Dạ, Mệ gợi ý danh sách **Món ngon xứ Huế theo từng bữa** để bạn dễ chọn nhen:\n• **Sáng**: Bún bò Mụ Rơi (40 Nguyễn Chí Diểu), Cơm hến Hoa Đông (Cồn Hến), Cà phê muối (142 Đặng Thái Thân).\n• **Trưa & Chiều**: Bánh bèo - nậm - lọc Bà Đỏ (8 Nguyễn Bỉnh Khiêm), Bánh ướt thịt nướng Huyền Anh (50 Kim Long), Bánh ép Cây Dừa (69 Nhật Lệ).\n• **Tối**: Bánh khoái Hồng Mai (110 Đinh Tiên Hoàng), Chè bột lọc heo quay Mợ Tôn Đích (Công viên Thương Bạc).";
  }
  if (
    /lịch trình|1 ngày|2 ngày|3 ngày|buổi tối|chơi gì|lich trinh/.test(q) ||
    /lich trinh/.test(qNoAccent)
  ) {
    return "Dạ, Mệ gợi ý **Lịch trình 1 ngày tinh hoa Cố Đô Huế** tối ưu cung đường nhất nhen:\n• **Sáng (07:30 – 11:30)**: Ăn bún bò Huế & uống cà phê muối -> Tham quan **Đại Nội Huế** (Ngọ Môn, Điện Thái Hòa, Thế Miếu) & **Bảo tàng Cổ vật Cung đình**.\n• **Trưa**: Thưởng thức khay bánh bèo, nậm, lọc Bà Đỏ (8 Nguyễn Bỉnh Khiêm).\n• **Chiều (14:30 – 18:00)**: Thăm **Lăng Tự Đức** (hoặc **Lăng Khải Định**) -> Chụp ảnh **Làng hương Thủy Xuân** -> Ngắm hoàng hôn tại **Đồi Vọng Cảnh** & **Chùa Thiên Mụ**.\n• **Tối (19:00 – 21:30)**: Dạo **Cầu Tràng Tiền – Cầu Gỗ Lim**, ăn chè heo quay và nghe **Ca Huế trên thuyền rồng sông Hương**!";
  }
  if (
    /mưa|nắng|thời tiết|mùa nào|thoi tiet/.test(q) ||
    /thoi tiet/.test(qNoAccent)
  ) {
    return "Dạ, nếu gặp ngày mưa Huế hoặc nắng gắt, Mệ khuyên bạn ưu tiên các điểm **trong nhà (Indoor)** như **Bảo tàng Cổ vật Cung đình Huế (Điện Long An - 3 Lê Trực)**, **Cung An Định (179B Phan Đình Phùng)** hoặc ngồi thưởng **Trà Cung Đình Kim Long** và **Cà phê Muối** ngắm mưa rơi rất thi vị nhen!";
  }
  if (
    /xe đạp|thuê xe|xích lô|di chuyển|xe dap|thue xe/.test(q) ||
    /xe dap|thue xe/.test(qNoAccent)
  ) {
    return "Dạ, bạn có thể thuê **Xe đạp xanh công cộng (Eco-Bike)** tại trạm Bến Tòa Khâm (Lê Lợi), Cầu Trường Tiền hoặc Cửa Hiển Nhơn (Đại Nội) với giá 20.000đ – 40.000đ/giờ, hoặc thuê xe máy (120.000đ/ngày tại phố Chu Văn An – Phạm Ngũ Lão) để đi các lăng tẩm ở xa nhen!";
  }

  if (
    /sủi cảo|há cảo|hoành thánh|dimsum|dim sum|mì sủi cảo|mì tàu|mì kéo|vằn thắn|sui cao|ha cao|hoanh thanh|van than|mi tau/.test(
      q,
    ) ||
    /sui cao|ha cao|hoanh thanh|dimsum|mi tau/.test(qNoAccent)
  ) {
    return "Dạ, muốn ăn **Sủi cảo – Hoành thánh – Dimsum** chuẩn vị người Hoa gia truyền ở Huế thì Mệ chỉ bạn ngay những quán nức tiếng lâu năm ni nhen:\n\n🥟 **1. Vĩnh Lợi Mì Gia (Gốc Hoa hơn 40 năm)**: 121 Huỳnh Thúc Kháng (gần cầu Gia Hội) & 47 Hùng Vương — mì sủi cảo tôm thịt tươi giòn, hoành thánh chiên, nước dùng ngọt thanh từ xương ống và tôm khô.\n🥟 **2. Bảo Thạnh Dimsum & Sủi Cảo**: Số 20 Bến Nghé (trung tâm bờ Nam) — sủi cảo hấp, há cảo tôm pha lê, xíu mại, bánh bao kim sa nóng hổi.\n🥟 **3. Tiệm Mì Tàu Phúc Hưng & Mì Kéo Chợ Đông Ba**: Cổng chợ Đông Ba & đường Đinh Tiên Hoàng — mì vằn thắn, sủi cảo xá xíu thơm phức.\n• **Giá**: 35.000đ – 60.000đ/tô.";
  }
  if (
    /bánh canh|cháo bột|bánh canh cá lóc|bánh canh nam phổ|bánh canh cua|banh canh|chao bot/.test(
      q,
    ) ||
    /banh canh|chao bot/.test(qNoAccent)
  ) {
    return "Dạ, **Bánh canh (Cháo bột)** ấm nóng trứ danh ở Huế thì ghé ngay:\n1. **Bánh canh cá lóc Dì Hương**: 14 Lê Thánh Tôn (trong Thành Nội) — cá lóc đồng rim nghệ vàng thơm lừng.\n2. **Bánh canh Nam Phổ Thúy**: 16 Phạm Hồng Thái — sánh đỏ gạch tôm cua, chả cua dai ngọt.\n3. **Bánh canh đêm Hàn Thuyên**: Góc đường Hàn Thuyên trong Thành Nội bán từ chiều tối đến khuya.\n• **Giá**: 20.000đ – 35.000đ/tô.";
  }
  if (
    /\b(ăn|uống|quán|tiệm|thèm|ở đâu bán|chỗ nào có|quán nào|món)\b/i.test(q) ||
    /\b(an|uong|quan|tiem|them|o dau ban|cho nao co)\b/i.test(qNoAccent)
  ) {
    return "Dạ, Mệ nghe bạn hỏi tìm chỗ ăn ngon rồi nhen! 🍲\n\nẨm thực Cố Đô phong phú lắm, từ món cung đình đến hàng quán hè phố:\n• 🥟 **Khu ẩm thực Chợ Đông Ba & đường Trần Hưng Đạo**: Mì sủi cảo, bún bò, cháo bột, bánh bèo nậm lọc gia truyền.\n• 🥢 **Khu phố ẩm thực Thành Nội (Đinh Tiên Hoàng – Nhật Lệ)**: Bánh ép dẻo, bánh khoái, bún thịt nướng, cơm gia đình.\n• 🌙 **Phố Tây bờ Nam (Phạm Ngũ Lão – Chu Văn An – Võ Thị Sáu)**: Ăn đêm, dimsum, lẩu, hải sản đầm phá.\n• ☕ **Dọc sông An Cựu (Phan Chu Trinh – Phan Đình Phùng)**: Ốc hút, bún giò, nem lụi, cà phê ngắm sông.\n\nBạn cứ nhắn tên món bạn thèm (như *sủi cảo, bánh canh, bún bò, bánh ép, ốc hút, chè heo quay...*), Mệ chỉ đúng quán ruột cho nhen!";
  }

  const cleanQ = question.trim().replace(/[?!.]+$/, "");
  return (
    'Dạ, Mệ nghe câu hỏi "' +
    cleanQ +
    '" của bạn rồi nhen! 🌸\n\nXứ Huế thương có biết bao điều thú vị: từ 143 năm lịch sử vương triều Nguyễn, vẻ đẹp Đại Nội và 7 cụm lăng tẩm hoàng gia, những ngôi chùa cổ soi bóng sông Hương, cho tới hàng trăm món ngon đậm đà làm say lòng du khách.\n\nBạn đang muốn Mệ kể chuyện lịch sử di tích, báo giá vé & giờ mở cửa, chỉ địa chỉ quán ăn ngon chuẩn gốc hay lên lịch trình khám phá Huế theo ý bạn rứa? Cứ nhắn tự nhiên, Mệ đồng hành cùng bạn liền nghe! 👑'
  );
}

window.sendAiMessage = async function () {
  const input = document.getElementById("aiChatInput");
  const text = (input ? input.value : "").trim();
  if (!text) return;

  appendWebChatMsg("msg-user", text);
  input.value = "";

  const typingId = "typing-" + Date.now();
  appendTypingWebMsg(typingId);

  async function getWebChatToken() {
    let tk = localStorage.getItem("huego_token");
    if (tk) return tk;
    if (isGitHubPages && !API_CLOUD_BASE) return "mock-gh-token";
    try {
      const r = await fetch(resolveApiUrl("/api/v1/auth/demo"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      if (r.ok) {
        const d = await r.json();
        if (d.accessToken) {
          localStorage.setItem("huego_token", d.accessToken);
          return d.accessToken;
        }
      }
    } catch (_) {}
    return null;
  }

  try {
    if (isGitHubPages && !API_CLOUD_BASE) {
      setTimeout(() => {
        removeTypingWebMsg(typingId);
        appendWebChatMsg("msg-ai", getLocalAiReply(text));
      }, 400);
      return;
    }

    let token = await getWebChatToken();
    const callChat = (tk) => {
      const headers = { "Content-Type": "application/json" };
      if (tk) headers["Authorization"] = "Bearer " + tk;
      return fetch(resolveApiUrl("/api/v1/ai-guide/chat"), {
        method: "POST",
        headers,
        body: JSON.stringify({ question: text, language: "vi" }),
      });
    };

    let res = await callChat(token);
    if (res.status === 401) {
      localStorage.removeItem("huego_token");
      token = await getWebChatToken();
      if (token) res = await callChat(token);
    }

    removeTypingWebMsg(typingId);

    if (res.ok) {
      const data = await res.json();
      appendWebChatMsg(
        "msg-ai",
        data.answer || data.reply || getLocalAiReply(text),
      );
    } else {
      appendWebChatMsg("msg-ai", getLocalAiReply(text));
    }
  } catch (err) {
    removeTypingWebMsg(typingId);
    appendWebChatMsg("msg-ai", getLocalAiReply(text));
  }
};

function appendWebChatMsg(cls, text) {
  const container = document.getElementById("aiChatMessages");
  if (!container) return;

  const bubble = document.createElement("div");
  bubble.className = "chat-msg " + cls;

  if (cls === "msg-ai") {
    // format bold & newline
    let formatted = String(text)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\\n/g, "<br/>")
      .replace(/\n/g, "<br/>");
    bubble.innerHTML = `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;color:var(--primary);font-weight:800;font-size:0.8rem;"><span>👑</span><span>Mệ Huế AI Guide</span></div><div>${formatted}</div>`;
  } else {
    bubble.textContent = text;
  }

  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function appendTypingWebMsg(id) {
  const container = document.getElementById("aiChatMessages");
  if (!container) return;
  const bubble = document.createElement("div");
  bubble.id = id;
  bubble.className = "chat-msg msg-ai";
  bubble.style.opacity = "0.7";
  bubble.innerHTML =
    "<em>Mệ Huế đang soạn câu trả lời cho người nghe... ✍️</em>";
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}

function removeTypingWebMsg(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// Khởi chạy bổ sung khi tải trang
document.addEventListener("DOMContentLoaded", () => {
  loadLiveWeather();
  updateItineraryBadge();

  // Enter trong ô input chat AI
  const chatInput = document.getElementById("aiChatInput");
  if (chatInput) {
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendAiMessage();
    });
  }
});
