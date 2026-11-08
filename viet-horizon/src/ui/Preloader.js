import gsap from 'gsap';

export class Preloader {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.container = document.querySelector('#preloader');
    this.percentEl = document.querySelector('#preloader-percent');
    this.barEl = document.querySelector('#preloader-bar');
    this.statusEl = document.querySelector('#preloader-status');
    this.shockwaveEl = document.querySelector('#preloader-shockwave');
    this.dragonEl = document.querySelector('#intro-dragon');
    this.phoenixEl = document.querySelector('#intro-phoenix');
    this.sealEl = document.querySelector('.royal-seal-emblem');
    this.centerEl = document.querySelector('.preloader-center');

    this.startLoading();
  }

  startLoading() {
    const statuses = [
      'KHỞI TẠO KHÔNG GIAN DI SẢN SỐ HUẾ...',
      'TRIỆU HỒI THANH LONG TRIỀU NGUYỄN...',
      'HỎA PHƯỢNG HOÀNG TRIỀU SẢI CÁNH...',
      'LONG PHỤNG TRÌNH TƯỜNG CỐ ĐÔ HUẾ...',
      'TÍNH TOÁN ĐƯỜNG BAY HOÀNG THÀNH...',
      'SẴN SÀNG KHAI MÔN BƯỚC VÀO XỨ HUẾ'
    ];

    let progressObj = { value: 0 };

    gsap.to(progressObj, {
      value: 100,
      duration: 2.6,
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

    // 1. Sóng chấn khai môn nổ bùng từ tâm hoàng kim
    if (this.shockwaveEl) {
      tl.fromTo(
        this.shockwaveEl,
        { scale: 0.1, opacity: 1 },
        { scale: 28, opacity: 0, duration: 1.0, ease: 'power3.out' },
        0
      );
    }

    // 2. THANH LONG TRIỀU NGUYỄN: Uốn mình bay vút lượn lên góc trên bên trái
    if (this.dragonEl) {
      tl.to(
        this.dragonEl,
        {
          x: -280,
          y: -220,
          scale: 1.35,
          rotation: -18,
          opacity: 0,
          duration: 1.3,
          ease: 'power3.inOut'
        },
        0.08
      );
    }

    // 3. HỎA PHƯỢNG HOÀNG TRIỀU: Sải cánh bay vút lượn lên góc trên bên phải
    if (this.phoenixEl) {
      tl.to(
        this.phoenixEl,
        {
          x: 280,
          y: -220,
          scale: 1.35,
          rotation: 18,
          opacity: 0,
          duration: 1.3,
          ease: 'power3.inOut'
        },
        0.08
      );
    }

    // 4. Khối trung tâm (Ngọc ấn, % và text) phóng to nhẹ rồi tan biến
    if (this.centerEl) {
      tl.to(
        this.centerEl,
        {
          scale: 1.25,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.8,
          ease: 'power2.inOut'
        },
        0.2
      );
    }

    // 5. Header & Footer mờ dần
    tl.to(
      ['.preloader-header', '.preloader-footer'],
      { opacity: 0, duration: 0.6, ease: 'power2.out' },
      0.3
    );

    // 6. Màn trập mở bung điện ảnh (Circular Iris Out)
    tl.to(
      this.container,
      {
        opacity: 0,
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.3,
        ease: 'expo.inOut'
      },
      0.45
    );

    // 7. Hero Title, Subtitle, HUD bay vào vị trí
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
