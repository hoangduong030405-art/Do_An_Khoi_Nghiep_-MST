import gsap from 'gsap';

export class Preloader {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.container = document.querySelector('#preloader');
    this.percentEl = document.querySelector('#preloader-percent');
    this.barEl = document.querySelector('#preloader-bar');
    this.statusEl = document.querySelector('#preloader-status');

    this.startLoading();
  }

  startLoading() {
    const statuses = [
      'KHỞI TẠO KHÔNG GIAN DI SẢN HUẾ...',
      'TÍNH TOÁN ĐƯỜNG BAY HOÀNG THÀNH...',
      'TỔNG HỢP MẶT SÓNG SÔNG HƯƠNG...',
      'HỘI TỤ ĐÊM HOA ĐĂNG THIÊN MỤ...',
      'MÔ PHỎNG SƯƠNG MÙ LĂNG TẨM CỐ ĐÔ...',
      'SẴN SÀNG CẤT CÁNH KHÁM PHÁ CỐ ĐÔ'
    ];

    let progressObj = { value: 0 };

    gsap.to(progressObj, {
      value: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        const val = Math.round(progressObj.value);
        if (this.percentEl) {
          this.percentEl.textContent = `${val.toString().padStart(2, '0')}%`;
        }
        if (this.barEl) {
          this.barEl.style.width = `${val}%`;
        }
        if (this.statusEl) {
          const statusIdx = Math.min(Math.floor((val / 100) * statuses.length), statuses.length - 1);
          this.statusEl.textContent = statuses[statusIdx];
        }
      },
      onComplete: () => {
        this.revealHero();
      }
    });
  }

  revealHero() {
    const tl = gsap.timeline({
      onComplete: () => {
        if (this.container) {
          this.container.style.display = 'none';
        }
        if (typeof this.onComplete === 'function') {
          this.onComplete();
        }
      }
    });

    // Màn trập mở bung điện ảnh
    tl.to(this.container, {
      opacity: 0,
      clipPath: 'circle(0% at 50% 50%)',
      duration: 1.2,
      ease: 'expo.inOut'
    });

    // Hero title & HUD bay vào
    tl.fromTo(
      '.hero-title .char',
      { y: 80, opacity: 0, rotateX: -45 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.4, stagger: 0.03, ease: 'power4.out' },
      '-=0.6'
    );

    tl.fromTo(
      ['.hero-subtitle', '.flight-hud', '.scroll-prompt'],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'power3.out' },
      '-=0.8'
    );
  }
}
