import { World } from './scene/World.js';
import { Preloader } from './ui/Preloader.js';
import { CustomCursor } from './ui/CustomCursor.js';
import { ScrollManager } from './ui/ScrollManager.js';
import { FlightHUD } from './ui/FlightHUD.js';
import { initMagneticButtons } from './ui/MagneticButton.js';
import { initCounterStats } from './ui/CounterStats.js';
import { isWebGLAvailable } from './utils/detect.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Kiểm tra hỗ trợ WebGL
  const hasWebGL = isWebGLAvailable();
  const canvas = document.querySelector('#webgl-canvas');

  let world = null;
  if (hasWebGL && canvas) {
    try {
      world = new World(canvas);
    } catch (e) {
      console.error('[Main] Lỗi khởi tạo Three.js World:', e);
    }
  } else {
    console.warn('[Main] WebGL không khả dụng, kích hoạt chế độ Fallback.');
    if (canvas) canvas.style.display = 'none';
    document.body.classList.add('no-webgl');
  }

  // 2. Khởi tạo Flight HUD
  const flightHUD = new FlightHUD();

  // 3. Khởi tạo ScrollManager (Lenis + ScrollTrigger)
  const scrollManager = new ScrollManager(world, flightHUD);

  // 4. Khởi tạo Custom Cursor
  new CustomCursor();

  // 5. Khởi tạo Magnetic Buttons
  initMagneticButtons('.magnetic-btn');

  // 6. Khởi tạo Counter Stats
  initCounterStats();

  // 7. Khởi tạo Preloader
  new Preloader(() => {
    console.log('[HUEGO] Chuyến bay di sản Cố Đô Huế đã sẵn sàng.');
  });

  // 8. Xử lý cuộn mượt cho các thẻ liên kết nội bộ
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          scrollManager.scrollTo(targetEl);
        }
      }
    });
  });

  // 9. Nút truy cập web HUEGO
  const bookingBtn = document.querySelector('#open-booking-btn');
  if (bookingBtn && !bookingBtn.getAttribute('href')) {
    bookingBtn.addEventListener('click', () => {
      window.open('https://hoangduong030405-art.github.io/Do_An_Khoi_Nghiep_-MST/', '_blank', 'noopener,noreferrer');
    });
  }
});
