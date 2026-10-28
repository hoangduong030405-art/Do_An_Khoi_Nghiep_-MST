import * as THREE from 'three';
import { createGradientTexture } from '../utils/procedural.js';

export class HeroStage {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.initIslands();
    this.initCloudLayers();
  }

  initIslands() {
    // Tạo cụm đảo đá vôi nhô lên qua mây
    const rockGeo = new THREE.ConeGeometry(18, 55, 7, 6);
    // Làm gồ ghề bề mặt đá bằng thuật toán biến dạng đỉnh
    const pos = rockGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const angle = Math.atan2(pos.getZ(i), pos.getX(i));
      const displacement = (Math.sin(angle * 4) + Math.cos(y * 0.4)) * 1.8;
      pos.setX(i, pos.getX(i) + displacement);
      pos.setZ(i, pos.getZ(i) + displacement);
    }
    rockGeo.computeVertexNormals();

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x1d2e28, // Xanh rêu đá cổ thẫm
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true
    });

    // 5 đỉnh núi đá vôi kỳ vĩ xung quanh đường bay
    const islandPositions = [
      { x: 0, y: -5, z: 20, scale: 1.2 },
      { x: -35, y: -12, z: 45, scale: 0.9 },
      { x: 38, y: -8, z: 15, scale: 1.1 },
      { x: -25, y: -18, z: -10, scale: 0.7 },
      { x: 45, y: -15, z: 65, scale: 0.85 }
    ];

    islandPositions.forEach(p => {
      const mesh = new THREE.Mesh(rockGeo, rockMat);
      mesh.position.set(p.x, p.y, p.z);
      mesh.scale.setScalar(p.scale);
      mesh.rotation.y = Math.random() * Math.PI * 2;
      this.group.add(mesh);
    });
  }

  initCloudLayers() {
    this.clouds = [];
    const cloudGeo = new THREE.PlaneGeometry(160, 160);
    cloudGeo.rotateX(-Math.PI / 2);

    const cloudTexture = createGradientTexture([
      { stop: 0, color: 'rgba(255, 255, 255, 0.45)' },
      { stop: 0.6, color: 'rgba(215, 230, 245, 0.18)' },
      { stop: 1, color: 'rgba(7, 17, 30, 0)' }
    ]);

    const cloudMat = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    for (let i = 0; i < 4; i++) {
      const mesh = new THREE.Mesh(cloudGeo, cloudMat);
      mesh.position.set(0, 10 + i * 8, 40 - i * 25);
      mesh.rotation.y = i * 0.8;
      this.group.add(mesh);
      this.clouds.push(mesh);
    }
  }

  update(time) {
    this.clouds.forEach((cloud, idx) => {
      cloud.rotation.y += 0.0003 * (idx % 2 === 0 ? 1 : -1);
      cloud.position.y += Math.sin(time * 0.5 + idx) * 0.015;
    });
  }
}
