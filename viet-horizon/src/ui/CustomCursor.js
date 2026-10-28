import gsap from 'gsap';
import { isMobile } from '../utils/detect.js';

export class CustomCursor {
  constructor() {
    if (isMobile()) return; // Không hiển thị con trỏ trên thiết bị cảm ứng

    this.cursor = document.querySelector('#custom-cursor');
    this.follower = document.querySelector('#cursor-follower');
    this.badge = document.querySelector('#cursor-badge');

    if (!this.cursor || !this.follower) return;

    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.target = { x: this.pos.x, y: this.pos.y };

    this.initEvents();
    this.render();
  }

  initEvents() {
    window.addEventListener('mousemove', (e) => {
      this.target.x = e.clientX;
      this.target.y = e.clientY;

      gsap.set(this.cursor, {
        x: e.clientX,
        y: e.clientY
      });
    });

    // Hover trên các phần tử tương tác
    const interactiveElements = document.querySelectorAll('a, button, [data-cursor]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.follower.classList.add('is-hovering');
        const badgeText = el.getAttribute('data-cursor');
        if (badgeText && this.badge) {
          this.badge.textContent = badgeText;
          this.follower.classList.add('has-badge');
        }
      });

      el.addEventListener('mouseleave', () => {
        this.follower.classList.remove('is-hovering', 'has-badge');
        if (this.badge) this.badge.textContent = '';
      });
    });
  }

  render() {
    const loop = () => {
      this.pos.x += (this.target.x - this.pos.x) * 0.15;
      this.pos.y += (this.target.y - this.pos.y) * 0.15;

      gsap.set(this.follower, {
        x: this.pos.x,
        y: this.pos.y
      });

      requestAnimationFrame(loop);
    };

    loop();
  }
}
