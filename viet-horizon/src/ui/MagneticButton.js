import gsap from 'gsap';
import { isMobile } from '../utils/detect.js';

export function initMagneticButtons(selector = '.magnetic-btn') {
  if (isMobile()) return;

  const buttons = document.querySelectorAll(selector);

  buttons.forEach((btn) => {
    const text = btn.querySelector('.btn-text') || btn;

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Nút dịch chuyển theo chuột với hệ số 0.35, chữ dịch chuyển thêm 0.2
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.4,
        ease: 'power2.out'
      });

      if (text !== btn) {
        gsap.to(text, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });

      if (text !== btn) {
        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    });
  });
}
