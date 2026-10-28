import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCounterStats() {
  const counters = document.querySelectorAll('[data-counter-target]');

  counters.forEach((el) => {
    const targetValue = parseFloat(el.getAttribute('data-counter-target'));
    const isDecimal = targetValue % 1 !== 0;
    const prefix = el.getAttribute('data-counter-prefix') || '';
    const suffix = el.getAttribute('data-counter-suffix') || '';

    const counterObj = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counterObj, {
          val: targetValue,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = `${prefix}${isDecimal ? counterObj.val.toFixed(1) : Math.round(counterObj.val)}${suffix}`;
          }
        });
      }
    });
  });
}
