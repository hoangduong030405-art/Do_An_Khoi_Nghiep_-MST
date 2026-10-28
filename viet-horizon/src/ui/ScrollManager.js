import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/detect.js';

gsap.registerPlugin(ScrollTrigger);

export class ScrollManager {
  constructor(world, hud) {
    this.world = world;
    this.hud = hud;
    this.isReducedMotion = prefersReducedMotion();

    this.initLenis();
    this.initScrollSync();
    this.initSectionAnimations();
    this.initGalleryHorizontalScroll();
  }

  initLenis() {
    this.lenis = new Lenis({
      duration: this.isReducedMotion ? 0.2 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !this.isReducedMotion,
      wheelMultiplier: 1.05
    });

    // Đồng bộ Lenis với GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  initScrollSync() {
    // Scroll progress toàn trang từ 0 đến 1
    ScrollTrigger.create({
      trigger: '#page-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress;
        const velocity = self.getVelocity();

        if (this.world) {
          this.world.setScrollProgress(progress, velocity);
        }
        if (this.hud) {
          this.hud.update(progress, velocity);
        }

        // Cập nhật thanh scroll-indicator trên cùng
        const progressBar = document.querySelector('#global-scroll-progress');
        if (progressBar) {
          progressBar.style.transform = `scaleX(${progress})`;
        }
      }
    });
  }

  initSectionAnimations() {
    // Parallax xuất hiện và biến mất cho các thẻ thông tin của từng chặng
    const sections = document.querySelectorAll('.flight-section:not(#hero)');

    sections.forEach((section) => {
      const card = section.querySelector('.content-card');
      if (!card) return;

      gsap.fromTo(
        card,
        {
          y: 60,
          opacity: 0,
          scale: 0.96
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1
          }
        }
      );
    });
  }

  initGalleryHorizontalScroll() {
    const gallerySection = document.querySelector('#gallery');
    const galleryTrack = document.querySelector('#gallery-track');

    if (!gallerySection || !galleryTrack) return;

    // Chiều rộng cuộn ngang
    const scrollAmount = galleryTrack.scrollWidth - window.innerWidth;

    if (scrollAmount > 0) {
      gsap.to(galleryTrack, {
        x: -scrollAmount - 100,
        ease: 'none',
        scrollTrigger: {
          trigger: gallerySection,
          pin: true,
          scrub: 1.2,
          start: 'top top',
          end: () => `+=${scrollAmount + 400}`,
          invalidateOnRefresh: true
        }
      });
    }
  }

  scrollTo(target) {
    if (this.lenis) {
      this.lenis.scrollTo(target, { duration: 2.0, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  }
}
