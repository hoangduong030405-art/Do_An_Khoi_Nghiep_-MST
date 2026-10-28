import * as THREE from 'three';
import waterVert from '../shaders/water/water.vert.glsl?raw';
import waterFrag from '../shaders/water/water.frag.glsl?raw';

export class HaLongStage {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.initWater();
    this.initRiverBanks();
  }

  initWater() {
    // Dòng Sông Hương êm đềm với mắt lưới chi tiết
    const waterGeo = new THREE.PlaneGeometry(350, 350, 128, 128);
    waterGeo.rotateX(-Math.PI / 2);

    this.waterMaterial = new THREE.ShaderMaterial({
      vertexShader: waterVert,
      fragmentShader: waterFrag,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uWaveFrequency: { value: new THREE.Vector2(0.6, 0.4) },
        uWaveSpeed: { value: new THREE.Vector2(0.35, 0.25) },
        uWaveHeight: { value: 0.8 },
        uDepthColor: { value: new THREE.Color('#02141a') },    // Xanh rêu thẫm Sông Hương
        uSurfaceColor: { value: new THREE.Color('#0c4342') },  // Xanh lam ngọc nước sông
        uSunColor: { value: new THREE.Color('#f5b861') },      // Ánh hoàng hôn vàng kim Cố Đô
        uSunPosition: { value: new THREE.Vector3(50, 40, -100) },
        uCameraPosition: { value: new THREE.Vector3() },
        uFresnelBias: { value: 0.12 },
        uFresnelScale: { value: 0.82 },
        uFresnelPower: { value: 3.2 }
      }
    });

    this.waterMesh = new THREE.Mesh(waterGeo, this.waterMaterial);
    this.waterMesh.position.set(0, 0, 0);
    this.group.add(this.waterMesh);
  }

  initRiverBanks() {
    // Hai bên bờ sông và các cồn bãi xanh ngát (Cồn Hến, Cồn Dã Viên)
    const bankGeo = new THREE.CylinderGeometry(8, 14, 40, 9, 6);
    const pos = bankGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const angle = Math.atan2(pos.getZ(i), pos.getX(i));
      const displacement = (Math.sin(angle * 4) * 1.8 + Math.cos(y * 0.3) * 1.0);
      pos.setX(i, pos.getX(i) + displacement);
      pos.setZ(i, pos.getZ(i) + displacement);
    }
    bankGeo.computeVertexNormals();

    const bankMat = new THREE.MeshStandardMaterial({
      color: 0x162c22, // Xanh hàng cây ngô đồng & thông
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true
    });

    const bankLocations = [
      { x: 22, y: 10, z: -10, s: 1.1 },
      { x: -32, y: 8, z: 10, s: 0.95 },
      { x: 38, y: 11, z: -35, s: 1.2 },
      { x: -25, y: 7, z: -45, s: 0.85 },
      { x: 10, y: 9, z: -70, s: 1.05 }
    ];

    bankLocations.forEach(loc => {
      const mesh = new THREE.Mesh(bankGeo, bankMat);
      mesh.position.set(loc.x, loc.y, loc.z);
      mesh.scale.setScalar(loc.s);
      mesh.rotation.y = Math.random() * Math.PI;
      this.group.add(mesh);
    });
  }

  update(time, camera) {
    if (this.waterMaterial) {
      this.waterMaterial.uniforms.uTime.value = time;
      this.waterMaterial.uniforms.uCameraPosition.value.copy(camera.position);
    }
  }
}
