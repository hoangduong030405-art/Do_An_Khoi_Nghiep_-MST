import * as THREE from 'three';
import lanternVert from '../shaders/particles/lantern.vert.glsl?raw';
import lanternFrag from '../shaders/particles/lantern.frag.glsl?raw';
import { isMobile } from '../utils/detect.js';

export class HoiAnStage {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(0, 0, -85);
    this.scene.add(this.group);

    this.initRiver();
    this.initLanternParticles();
    this.initFloatingLanterns();
    this.initLighting();
  }

  initRiver() {
    // Đoạn sông Hương trước chùa Thiên Mụ phản chiếu ánh đèn đêm
    const riverGeo = new THREE.PlaneGeometry(180, 200);
    riverGeo.rotateX(-Math.PI / 2);

    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x070b16,
      roughness: 0.12,
      metalness: 0.85
    });

    const riverMesh = new THREE.Mesh(riverGeo, riverMat);
    riverMesh.position.set(0, -0.2, 0);
    this.group.add(riverMesh);
  }

  initLanternParticles() {
    // 2,200 đốm sáng hoa đăng & đom đóm bờ sông (650 trên di động)
    const count = isMobile() ? 650 : 2200;
    const geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#f5b861'), // Vàng kim Cố Đô
      new THREE.Color('#ff7e47'), // Sắc cam hoa đăng
      new THREE.Color('#ff6584'), // Sắc sen hồng Cố Đô
      new THREE.Color('#ffd685')  // Ánh trăng sông Hương
    ];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = Math.random() * 30 + 0.5;
      const z = (Math.random() - 0.5) * 120;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      scales[i] = Math.random() * 0.9 + 0.3;
      phases[i] = Math.random() * Math.PI * 2;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    this.particleMaterial = new THREE.ShaderMaterial({
      vertexShader: lanternVert,
      fragmentShader: lanternFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.75) }
      }
    });

    this.particleSystem = new THREE.Points(geometry, this.particleMaterial);
    this.group.add(this.particleSystem);
  }

  initFloatingLanterns() {
    // Đèn hoa đăng cánh sen thả trôi mặt nước sông Hương
    this.lanternMeshes = [];
    const geo = new THREE.OctahedronGeometry(0.9, 0);

    const lanternColors = [0xff7e47, 0xf5b861, 0xff5252, 0xff77a9];

    for (let i = 0; i < 28; i++) {
      const col = lanternColors[i % lanternColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 1.8,
        roughness: 0.3
      });

      const mesh = new THREE.Mesh(geo, mat);
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 100;
      mesh.position.set(x, 0.4, z);
      mesh.scale.set(1.2, 0.8, 1.2);

      this.group.add(mesh);
      this.lanternMeshes.push({
        mesh,
        baseY: 0.4,
        speed: 0.08 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  initLighting() {
    // Ánh sáng ấm từ chùa Thiên Mụ và vạn ánh đèn hoa đăng
    this.ambientWarm = new THREE.PointLight(0xff9d47, 4.5, 90);
    this.ambientWarm.position.set(0, 12, 0);
    this.group.add(this.ambientWarm);
  }

  update(time) {
    if (this.particleMaterial) {
      this.particleMaterial.uniforms.uTime.value = time;
    }

    // Đèn hoa đăng trôi bập bềnh theo dòng nước
    this.lanternMeshes.forEach(item => {
      item.mesh.position.y = item.baseY + Math.sin(time * 1.8 + item.phase) * 0.12;
      item.mesh.rotation.y += 0.008;
      item.mesh.position.z += item.speed * 0.1;
      if (item.mesh.position.z > 60) {
        item.mesh.position.z = -60;
      }
    });
  }
}
