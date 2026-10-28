import * as THREE from 'three';

/**
 * Tạo canvas noise 2D tuần hoàn dùng cho displacement / normal map
 */
export function createNoiseTexture(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  // Simple pseudo-random value noise with multiple octaves
  function pseudoNoise(x, y) {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return n - Math.floor(n);
  }

  function smoothNoise(x, y) {
    const i = Math.floor(x);
    const j = Math.floor(y);
    const fx = x - i;
    const fy = y - j;
    // Cubic hermite curve
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);

    const a = pseudoNoise(i, j);
    const b = pseudoNoise(i + 1, j);
    const c = pseudoNoise(i, j + 1);
    const d = pseudoNoise(i + 1, j + 1);

    return a * (1 - ux) * (1 - uy) +
           b * ux * (1 - uy) +
           c * (1 - ux) * uy +
           d * ux * uy;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      let val = 0;
      let scale = 0.05;
      let amp = 0.5;
      let totalAmp = 0;

      for (let o = 0; o < 4; o++) {
        val += smoothNoise(x * scale, y * scale) * amp;
        totalAmp += amp;
        scale *= 2.0;
        amp *= 0.5;
      }
      val = val / totalAmp;
      const byteVal = Math.floor(val * 255);

      data[idx] = byteVal;     // R
      data[idx + 1] = byteVal; // G
      data[idx + 2] = byteVal; // B
      data[idx + 3] = 255;     // A
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

/**
 * Tạo gradient texture cho bầu trời (Sky dome)
 */
export function createGradientTexture(stops = [
  { stop: 0, color: '#07111E' },
  { stop: 0.5, color: '#0F264A' },
  { stop: 1, color: '#E8A856' }
], height = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = 4;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createLinearGradient(0, height, 0, 0);
  stops.forEach(s => gradient.addColorStop(s.stop, s.color));

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 4, height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Tạo texture hoa văn đèn lồng / ánh sáng hình tròn mờ (Soft Radial Particle Glow)
 */
export function createParticleGlowTexture(size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const center = size / 2;
  const radGrad = ctx.createRadialGradient(center, center, 0, center, center, center);
  radGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  radGrad.addColorStop(0.2, 'rgba(255, 220, 130, 0.9)');
  radGrad.addColorStop(0.5, 'rgba(255, 140, 50, 0.4)');
  radGrad.addColorStop(0.8, 'rgba(255, 80, 20, 0.1)');
  radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = radGrad;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
