import { lerp } from '../utils/math.js';

export class FlightHUD {
  constructor() {
    this.altitudeEl = document.querySelector('#hud-altitude');
    this.speedEl = document.querySelector('#hud-speed');
    this.headingEl = document.querySelector('#hud-heading');
    this.waypointEl = document.querySelector('#hud-waypoint');
    this.coordsEl = document.querySelector('#hud-coords');

    this.currentAlt = 3200;
  }

  /**
   * Cập nhật thông số HUD dựa trên tiến trình cuộn cho Cố Đô Huế
   * @param {number} progress 0.0 -> 1.0
   * @param {number} velocity
   */
  update(progress, velocity = 0) {
    if (!this.altitudeEl) return;

    // Kịch bản độ cao bay qua các danh thắng Huế
    let targetAlt = 3200;
    let targetWaypoint = 'VÒM TRỜI CỐ ĐÔ // NÚI NGỰ BÌNH';
    let targetCoords = '16°28\'N 107°35\'E';
    let targetHeading = '168° S';

    if (progress < 0.2) {
      targetAlt = lerp(3200, 1600, progress / 0.2);
      targetWaypoint = 'HẠ ĐỘ CAO VÀO THUNG LŨNG SÔNG HƯƠNG';
      targetCoords = '16°28\'N 107°35\'E';
      targetHeading = '175° S';
    } else if (progress < 0.45) {
      const p = (progress - 0.2) / 0.25;
      targetAlt = lerp(1600, 35, p);
      targetWaypoint = 'SÔNG HƯƠNG — DẢI LỤA LAM NGỌC & TRÀNG TIỀN';
      targetCoords = '16°28\'N 107°35\'E';
      targetHeading = '190° SSW';
    } else if (progress < 0.65) {
      const p = (progress - 0.45) / 0.2;
      targetAlt = lerp(35, 95, p);
      targetWaypoint = 'THÁP PHƯỚC DUYÊN & ĐÊM HOA ĐĂNG THIÊN MỤ';
      targetCoords = '16°27\'N 107°32\'E';
      targetHeading = '260° W';
    } else if (progress < 0.82) {
      const p = (progress - 0.65) / 0.17;
      targetAlt = lerp(95, 1450, p);
      targetWaypoint = 'QUẦN THỂ LĂNG TẨM & ĐỒI VỌNG CẢNH';
      targetCoords = '16°23\'N 107°35\'E';
      targetHeading = '150° SE';
    } else {
      const p = (progress - 0.82) / 0.18;
      targetAlt = lerp(1450, 2600, p);
      targetWaypoint = 'HỘI TỤ DI SẢN // THIÊN CẦU TRIỀU NGUYỄN';
      targetCoords = '16°28\'N 107°34\'E';
      targetHeading = '360° N';
    }

    this.currentAlt = lerp(this.currentAlt, targetAlt, 0.08);

    this.altitudeEl.textContent = `${Math.round(this.currentAlt).toLocaleString()} M`;
    const speed = 420 + Math.abs(Math.round(velocity * 0.4));
    if (this.speedEl) this.speedEl.textContent = `${speed} KM/H`;
    if (this.headingEl) this.headingEl.textContent = targetHeading;
    if (this.waypointEl) this.waypointEl.textContent = targetWaypoint;
    if (this.coordsEl) this.coordsEl.textContent = targetCoords;
  }
}
