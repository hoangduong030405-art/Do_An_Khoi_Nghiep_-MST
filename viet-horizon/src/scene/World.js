import * as THREE from 'three';
import { CameraPath } from './CameraPath.js';
import { Environment } from './Environment.js';
import { PostProcessing } from './PostProcessing.js';
import { HeroStage } from '../stages/HeroStage.js';
import { HaLongStage } from '../stages/HaLongStage.js';
import { HoiAnStage } from '../stages/HoiAnStage.js';
import { SapaStage } from '../stages/SapaStage.js';
import { GalleryStage } from '../stages/GalleryStage.js';
import { FinalCTAStage } from '../stages/FinalCTAStage.js';
import { getOptimalPixelRatio, isWebGLAvailable } from '../utils/detect.js';

export class World {
  constructor(canvas) {
    this.canvas = canvas;

    if (!isWebGLAvailable()) {
      console.warn('[World] WebGL không khả dụng trên thiết bị.');
      return;
    }

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // 1. Khởi tạo Renderer tối ưu
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(getOptimalPixelRatio());
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // 2. Scene & Camera
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(46, this.width / this.height, 0.1, 1000);

    // 3. Hệ thống môi trường & camera path
    this.environment = new Environment(this.scene);
    this.cameraPath = new CameraPath();

    // 4. Các phân cảnh 3D
    this.heroStage = new HeroStage(this.scene);
    this.haLongStage = new HaLongStage(this.scene);
    this.hoiAnStage = new HoiAnStage(this.scene);
    this.sapaStage = new SapaStage(this.scene);
    this.galleryStage = new GalleryStage(this.scene);
    this.finalCTAStage = new FinalCTAStage(this.scene);

    // 5. Hậu kỳ PostProcessing
    this.postProcessing = new PostProcessing(this.renderer, this.scene, this.camera, this.width, this.height);

    // 6. Trạng thái điều khiển
    this.scrollProgress = 0;
    this.scrollVelocity = 0;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.clock = new THREE.Clock();
    this.isPaused = false;

    this.initEvents();
    this.startLoop();
  }

  initEvents() {
    window.addEventListener('resize', this.onResize.bind(this));

    window.addEventListener('mousemove', (e) => {
      // Chuẩn hóa -1.0 đến 1.0
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Tự động tạm dừng khi rời tab để tiết kiệm GPU
    document.addEventListener('visibilitychange', () => {
      this.isPaused = document.hidden;
    });
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(getOptimalPixelRatio());
    this.postProcessing.setSize(this.width, this.height);
  }

  setScrollProgress(progress, velocity = 0) {
    this.scrollProgress = progress;
    this.scrollVelocity = velocity;
  }

  startLoop() {
    const tick = () => {
      requestAnimationFrame(tick);

      if (this.isPaused) return;

      const elapsedTime = this.clock.getElapsedTime();

      // Làm mượt con trỏ chuột cho góc nhìn máy bay
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      // Cập nhật Camera Path
      this.cameraPath.update(this.camera, this.scrollProgress, this.mouse);

      // Cập nhật môi trường ánh sáng theo tiến trình
      this.environment.update(this.scrollProgress);

      // Cập nhật các stages
      this.heroStage.update(elapsedTime);
      this.haLongStage.update(elapsedTime, this.camera);
      this.hoiAnStage.update(elapsedTime);
      this.sapaStage.update(elapsedTime, this.camera);
      this.galleryStage.update(elapsedTime, this.scrollVelocity);
      this.finalCTAStage.update(elapsedTime);

      // Render qua PostProcessing
      this.postProcessing.render(elapsedTime);
    };

    tick();
  }
}
