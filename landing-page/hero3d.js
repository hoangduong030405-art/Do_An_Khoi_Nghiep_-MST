/**
 * hero3d.js - Module Three.js tạo Canvas 3D góc nền Hero Section
 * Mô phỏng: "Quả Cầu Di Sản & Thiên Cầu Triều Nguyễn" (Imperial Heritage Armillary Sphere)
 * Tính năng chính:
 *  - Render vật thể 3D mang tính biểu tượng hoàng gia: Lõi ngọc đa diện, vành đai vàng kim Cửu Long, tinh vân bụi vàng (Golden Stardust).
 *  - Tương tác mượt mà theo con trỏ chuột (Mouse Parallax với thuật toán làm mượt Lerp).
 *  - Tự động resize Canvas linh hoạt theo màn hình.
 *  - Tự động TẠM DỪNG (pause) animation loop khi cuộn khỏi Hero Section hoặc chuyển tab để tiết kiệm GPU/CPU (FPS tối ưu).
 */

import * as THREE from 'three';

export function initHero3D(containerSelector = '#hero-3d-canvas', options = {}) {
  const container = typeof containerSelector === 'string' 
    ? document.querySelector(containerSelector) 
    : containerSelector;

  if (!container) {
    console.warn(`[Hero3D] Không tìm thấy phần tử container: ${containerSelector}`);
    return null;
  }

  // --- 1. Thiết lập Cấu hình & Trạng thái ---
  let isRunning = false;
  let animationFrameId = null;
  let scene, camera, renderer;
  let masterGroup, coreMesh, wireCoreMesh, rings = [], particleSystem;

  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const clock = new THREE.Clock();

  // Kiểm tra hỗ trợ WebGL
  try {
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('[Hero3D] Trình duyệt không hỗ trợ WebGL.');
      return null;
    }
  } catch (e) {
    console.warn('[Hero3D] Lỗi khởi tạo WebGL:', e);
    return null;
  }

  // --- 2. Khởi tạo Three.js Scene, Camera & Renderer ---
  scene = new THREE.Scene();

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 11);

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // Nhóm xoay tổng thể
  masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // --- 3. Hệ thống Ánh sáng Cung Đình (Royal Lighting) ---
  // Ánh sáng môi trường tím huyền bí Huế
  const ambientLight = new THREE.AmbientLight(0x4a154b, 1.4);
  scene.add(ambientLight);

  // Đèn chính vàng hoàng kim chiếu góc nghiêng
  const keyGoldLight = new THREE.DirectionalLight(0xffe27a, 2.8);
  keyGoldLight.position.set(6, 8, 7);
  scene.add(keyGoldLight);

  // Đèn viền xanh ngọc bích / sương sông Hương
  const rimTealLight = new THREE.DirectionalLight(0x2dd4bf, 1.6);
  rimTealLight.position.set(-7, -4, -5);
  scene.add(rimTealLight);

  // Đèn điểm trung tâm toả sắc tím hổ phách
  const centerPulseLight = new THREE.PointLight(0xf59e0b, 2.2, 15);
  centerPulseLight.position.set(0, 0, 0);
  masterGroup.add(centerPulseLight);

  // --- 4. Tạo Vật thể 3D Di sản (Heritage Armillary & Core) ---

  // A. Lõi ngọc đa diện Hoàng Tộc (Imperial Faceted Core)
  const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
  const coreMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x3d0b37,
    emissive: 0x581c87,
    emissiveIntensity: 0.6,
    roughness: 0.25,
    metalness: 0.85,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
    flatShading: true,
    transparent: true,
    opacity: 0.92
  });
  coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  masterGroup.add(coreMesh);

  // B. Khung lưới vàng bảo vệ bên trong (Inner Gold Wireframe Cage)
  const wireGeometry = new THREE.IcosahedronGeometry(1.9, 1);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  wireCoreMesh = new THREE.Mesh(wireGeometry, wireMaterial);
  masterGroup.add(wireCoreMesh);

  // C. Bộ 3 Vành đai Thiên văn Hoàng gia (Imperial Golden Orbital Rings)
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xe5c158,
    metalness: 0.95,
    roughness: 0.18,
    emissive: 0x92400e,
    emissiveIntensity: 0.15
  });

  const ringConfigs = [
    { radius: 2.6, tube: 0.045, rotX: Math.PI / 4, rotY: 0, speed: 0.35 },
    { radius: 3.1, tube: 0.04,  rotX: -Math.PI / 3, rotY: Math.PI / 6, speed: -0.28 },
    { radius: 3.6, tube: 0.035, rotX: Math.PI / 6, rotY: -Math.PI / 4, speed: 0.22 }
  ];

  ringConfigs.forEach((cfg) => {
    const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
    const ringMesh = new THREE.Mesh(ringGeo, goldMaterial);
    ringMesh.rotation.x = cfg.rotX;
    ringMesh.rotation.y = cfg.rotY;

    // Đính thêm ngọc hoàng gia trên vành đai
    const jewelGeo = new THREE.OctahedronGeometry(0.12, 0);
    const jewelMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.1
    });
    const jewel = new THREE.Mesh(jewelGeo, jewelMat);
    jewel.position.set(cfg.radius, 0, 0);
    ringMesh.add(jewel);

    masterGroup.add(ringMesh);
    rings.push({ mesh: ringMesh, speed: cfg.speed });
  });

  // D. Tinh vân bụi vàng / Đèn hoa đăng lung linh (Golden Stardust Particles)
  const particleCount = 280;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const particleScales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    // Phân bố hạt hình cầu đa tầng
    const radius = 2.4 + Math.random() * 4.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    particleScales[i] = 0.5 + Math.random() * 1.5;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // Tạo texture chấm sáng tròn mềm mại
  const particleCanvas = document.createElement('canvas');
  particleCanvas.width = 32;
  particleCanvas.height = 32;
  const pCtx = particleCanvas.getContext('2d');
  const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 235, 150, 1)');
  gradient.addColorStop(0.3, 'rgba(245, 158, 11, 0.7)');
  gradient.addColorStop(1, 'rgba(120, 20, 100, 0)');
  pCtx.fillStyle = gradient;
  pCtx.fillRect(0, 0, 32, 32);

  const particleTexture = new THREE.CanvasTexture(particleCanvas);

  const particleMat = new THREE.PointsMaterial({
    map: particleTexture,
    size: 0.22,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  particleSystem = new THREE.Points(particleGeo, particleMat);
  masterGroup.add(particleSystem);

  // --- 5. Tương tác Di chuột (Mouse Parallax) & Thiết bị di động ---
  function onMouseMove(event) {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Chuẩn hóa từ -1 đến 1
    mouse.targetX = (x / rect.width) * 2 - 1;
    mouse.targetY = -(y / rect.height) * 2 + 1;
  }

  function onTouchMove(event) {
    if (event.touches.length > 0) {
      const rect = container.getBoundingClientRect();
      const touch = event.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      mouse.targetX = (x / rect.width) * 2 - 1;
      mouse.targetY = -(y / rect.height) * 2 + 1;
    }
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });

  // --- 6. Xử lý Tự động Resize Canvas ---
  function onResize() {
    if (!container || !renderer || !camera) return;
    const newWidth = container.clientWidth || window.innerWidth;
    const newHeight = container.clientHeight || window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }

  window.addEventListener('resize', onResize);

  // --- 7. Animation Loop với Lerp Damping & Tối ưu FPS ---
  function animate() {
    if (!isRunning) return;

    animationFrameId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // Làm mượt chuyển động chuột (Lerp)
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Xoay khối tổng thể theo con trỏ chuột và trôi tự do
    masterGroup.rotation.y = elapsedTime * 0.15 + mouse.x * 0.45;
    masterGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1 - mouse.y * 0.35;

    // Hiệu ứng "nhịp thở" nhẹ cho lõi ngọc
    const breath = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
    coreMesh.scale.set(breath, breath, breath);
    coreMesh.rotation.y -= delta * 0.2;
    wireCoreMesh.rotation.y += delta * 0.25;

    // Xoay các vành đai vàng theo tốc độ độc lập
    rings.forEach((r, idx) => {
      r.mesh.rotation.z += delta * r.speed;
      r.mesh.rotation.x += delta * (r.speed * 0.5);
    });

    // Xoay tinh vân bụi vàng
    if (particleSystem) {
      particleSystem.rotation.y = -elapsedTime * 0.08;
      particleSystem.rotation.x = Math.sin(elapsedTime * 0.1) * 0.05;
    }

    renderer.render(scene, camera);
  }

  // --- 8. Điều khiển Vòng lặp: Pause / Resume ---
  function start() {
    if (!isRunning) {
      isRunning = true;
      clock.start();
      animate();
    }
  }

  function pause() {
    if (isRunning) {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      clock.stop();
    }
  }

  // --- 9. Tối ưu Hiệu Năng: IntersectionObserver & Tab Visibility ---
  // Tự động tạm dừng khi Hero Section cuộn khỏi màn hình
  const heroElement = document.querySelector('#hero') || container.closest('section') || container;
  let observer = null;

  if (typeof IntersectionObserver !== 'undefined' && heroElement) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Khi Hero xuất hiện trên màn hình -> chạy tiếp
          start();
        } else {
          // Khi người dùng cuộn khỏi Hero -> dừng loop để tiết kiệm pin/GPU
          pause();
        }
      });
    }, {
      root: null,
      threshold: 0.05 // Kích hoạt ngay khi 5% hero lọt vào màn hình
    });

    observer.observe(heroElement);
  } else {
    // Fallback nếu không có observer
    start();
  }

  // Tạm dừng khi người dùng chuyển sang tab khác
  function onVisibilityChange() {
    if (document.hidden) {
      pause();
    } else {
      // Chỉ chạy lại nếu Hero đang trong viewport
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        const isInView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (isInView) start();
      } else {
        start();
      }
    }
  }
  document.addEventListener('visibilitychange', onVisibilityChange);

  // --- 10. Dọn dẹp tài nguyên (Destroy method) ---
  function destroy() {
    pause();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibilityChange);

    if (observer && heroElement) {
      observer.unobserve(heroElement);
      observer.disconnect();
    }

    if (renderer && renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }

    // Giải phóng bộ nhớ Three.js
    if (scene) {
      scene.traverse((obj) => {
        if (obj.isMesh || obj.isPoints) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });
    }

    if (renderer) {
      renderer.dispose();
    }
  }

  // Bắt đầu chạy
  start();

  return {
    destroy,
    pause,
    resume: start,
    isRunning: () => isRunning,
    getScene: () => scene,
    getCamera: () => camera,
    getRenderer: () => renderer
  };
}

