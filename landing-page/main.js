/**
 * main.js - Điều khiển Logic Giao diện Showcase Landing Page Web 3D Du lịch Huế
 * Tích hợp:
 *  - Khởi tạo Three.js Hero 3D qua module hero3d.js
 *  - Scroll Progress Bar & Sticky Header
 *  - Interactive Tab Switcher cho mục Xem trước trải nghiệm (Interactive Preview)
 *  - Scroll Reveal Animations & Animated Number Counters
 *  - Mobile Navigation & Smooth Scroll Anchors
 */

import { initHero3D } from './hero3d.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Khởi tạo Three.js Hero 3D Background ---
  const heroContainer = document.querySelector('#hero-3d-canvas');
  let hero3DInstance = null;

  if (heroContainer) {
    hero3DInstance = initHero3D(heroContainer);
    if (hero3DInstance) {
      console.log('✅ [Hero3D] Khởi tạo thành công Canvas 3D Cố đô Huế.');
    }
  }

  // --- 2. Thanh tiến trình cuộn trang (Scroll Progress Bar) & Sticky Header ---
  const progressBar = document.querySelector('#scroll-progress');
  const siteHeader = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('#back-to-top');

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Cập nhật thanh progress
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Hiệu ứng Header khi cuộn
    if (siteHeader) {
      if (scrollTop > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Nút Cuộn về đầu trang (Back to Top)
    if (backToTopBtn) {
      if (scrollTop > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Chạy ngay lần đầu

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 3. Menu Mobile Toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Đóng menu khi nhấp vào link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // --- 4. Interactive Preview Tabs Switcher (Mục Xem trước) ---
  const tabButtons = document.querySelectorAll('.preview-tab-btn');
  const tabPanes = document.querySelectorAll('.preview-tab-pane');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Cập nhật trạng thái Active trên nút
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Cập nhật Pane tương ứng
      tabPanes.forEach(pane => {
        if (pane.id === targetTab) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // --- 5. Scroll Reveal Animation (Fade-in mượt mà khi cuộn tới) ---
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Chỉ kích hoạt 1 lần khi cuộn tới
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback nếu không hỗ trợ IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // --- 6. Hiệu ứng Nhảy số thống kê (Animated Number Counter) ---
  const counterElements = document.querySelectorAll('[data-counter]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800; // 1.8s
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOut * target);

      el.textContent = currentVal.toLocaleString('vi-VN') + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toLocaleString('vi-VN') + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
  } else {
    counterElements.forEach(el => animateCounter(el));
  }

  // --- 7. Hiệu ứng Ripple trên các nút Nổi bật (Button Click Ripple) ---
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = button.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('btn-ripple');

      const existingRipple = button.querySelector('.btn-ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      button.appendChild(circle);

      setTimeout(() => {
        circle.remove();
      }, 600);
    });
  });

  // Ghi log hoàn thành khởi tạo
  console.log('🏛️ [HUEGO 3D] Landing Page đã sẵn sàng!');
});

