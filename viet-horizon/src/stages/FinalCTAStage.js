import * as THREE from 'three';
import { createParticleGlowTexture } from '../utils/procedural.js';

export class FinalCTAStage {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(0, 4, -495);
    this.scene.add(this.group);

    this.rings = [];
    this.initArmillarySphere();
    this.initFlightArcs();
    this.initStardustField();
  }

  initArmillarySphere() {
    // 1. Quả cầu lõi phát sáng (Glowing Celestial Core)
    const coreGeo = new THREE.IcosahedronGeometry(3.6, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf5b861,
      emissive: 0xe5a952,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true
    });
    this.core = new THREE.Mesh(coreGeo, coreMat);
    this.group.add(this.core);

    // 2. Các vành đai thiên văn xoay đa trục (Concentric Celestial Rings)
    const ringConfigs = [
      { radius: 6.5, tube: 0.12, rotSpeed: { x: 0.005, y: 0.01, z: 0.003 } },
      { radius: 8.8, tube: 0.14, rotSpeed: { x: -0.008, y: 0.006, z: -0.005 } },
      { radius: 11.2, tube: 0.10, rotSpeed: { x: 0.003, y: -0.007, z: 0.009 } }
    ];

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf5b861,
      roughness: 0.25,
      metalness: 0.85
    });

    ringConfigs.forEach(cfg => {
      const ringGeo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 16, 100);
      const ringMesh = new THREE.Mesh(ringGeo, goldMat);
      this.group.add(ringMesh);
      this.rings.push({ mesh: ringMesh, speed: cfg.rotSpeed });
    });
  }

  initFlightArcs() {
    // Các đường cong ánh sáng bay kết nối các điểm đến
    const curvePoints = [
      new THREE.Vector3(-4, -1, 3),
      new THREE.Vector3(-1, 4, 4),
      new THREE.Vector3(3, 2, 2),
      new THREE.Vector3(4, -2, -2),
      new THREE.Vector3(-2, -4, -1)
    ];

    const curve = new THREE.CatmullRomCurve3(curvePoints, true);
    const tubeGeo = new THREE.TubeGeometry(curve, 80, 0.09, 8, true);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0xffd685,
      transparent: true,
      opacity: 0.85
    });

    this.flightArc = new THREE.Mesh(tubeGeo, tubeMat);
    this.group.add(this.flightArc);
  }

  initStardustField() {
    // 800 hạt bụi vàng hội tụ xung quanh
    const count = 800;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 12 + Math.random() * 20;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color: 0xf5b861,
      size: 0.8,
      map: createParticleGlowTexture(64),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.stardust = new THREE.Points(geo, mat);
    this.group.add(this.stardust);
  }

  update(time) {
    if (this.core) {
      this.core.rotation.y = time * 0.3;
      this.core.rotation.x = time * 0.15;
    }

    this.rings.forEach(r => {
      r.mesh.rotation.x += r.speed.x;
      r.mesh.rotation.y += r.speed.y;
      r.mesh.rotation.z += r.speed.z;
    });

    if (this.flightArc) {
      this.flightArc.rotation.y = -time * 0.2;
    }

    if (this.stardust) {
      this.stardust.rotation.y = time * 0.05;
    }
  }
}
