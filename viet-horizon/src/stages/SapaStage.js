import * as THREE from 'three';
import fogVert from '../shaders/fog/fog.vert.glsl?raw';
import fogFrag from '../shaders/fog/fog.frag.glsl?raw';

export class SapaStage {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(0, 0, -210);
    this.scene.add(this.group);

    this.initTerraces();
    this.initVolumetricFog();
  }

  initTerraces() {
    // Đồi thông phong thủy và các bậc thềm đá lăng tẩm triều Nguyễn
    const size = 160;
    const segments = 100;
    const geo = new THREE.PlaneGeometry(size, size, segments, segments);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    const pineGreen = new THREE.Color('#173426');      // Rừng thông Đồi Vọng Cảnh
    const imperialGold = new THREE.Color('#d4a034');   // Ngói hoàng lưu ly
    const ancientStone = new THREE.Color('#4a3f35');   // Đá hoa cương rêu phong

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      // Địa hình đồi núi thoai thoải đặc trưng xứ Huế
      const distFromCenter = Math.sqrt(x * x + z * z);
      const rawHeight = 40.0 * Math.exp(-distFromCenter * 0.016) +
                        Math.sin(x * 0.07) * 3.5 +
                        Math.cos(z * 0.07) * 3.5;

      // Bậc thềm kiến trúc lăng tẩm (Courtyard & Terraced Steps)
      const stepInterval = 2.2;
      const steppedHeight = Math.floor(rawHeight / stepInterval) * stepInterval +
                            Math.pow(fract(rawHeight / stepInterval), 3.0) * 0.35;

      pos.setY(i, steppedHeight);

      // Phối màu đan xen giữa rừng thông xanh thẫm và ngói lăng cổ kính
      const colorFactor = (Math.sin(steppedHeight * 0.75) + 1.0) * 0.5;
      const c = colorFactor > 0.45 ? imperialGold.clone().lerp(pineGreen, colorFactor * 0.7) : ancientStone;

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    function fract(val) {
      return val - Math.floor(val);
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.85,
      metalness: 0.1,
      flatShading: true
    });

    this.terraceMesh = new THREE.Mesh(geo, mat);
    this.terraceMesh.position.set(0, 5, 0);
    this.group.add(this.terraceMesh);
  }

  initVolumetricFog() {
    // Sương mù thể tích lơ lửng giữa thung lũng lăng tẩm
    this.fogPlanes = [];
    const fogGeo = new THREE.PlaneGeometry(150, 150);
    fogGeo.rotateX(-Math.PI / 2);

    this.fogMaterial = new THREE.ShaderMaterial({
      vertexShader: fogVert,
      fragmentShader: fogFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        uTime: { value: 0 },
        uFogColor: { value: new THREE.Color('#dcd4ec') }, // Sương sớm phảng phất sắc tím Huế
        uDensity: { value: 0.52 },
        uCameraPos: { value: new THREE.Vector3() }
      }
    });

    for (let i = 0; i < 3; i++) {
      const plane = new THREE.Mesh(fogGeo, this.fogMaterial);
      plane.position.set(0, 16 + i * 10, 0);
      plane.rotation.y = i * 0.9;
      this.group.add(plane);
      this.fogPlanes.push(plane);
    }
  }

  update(time, camera) {
    if (this.fogMaterial) {
      this.fogMaterial.uniforms.uTime.value = time;
      this.fogMaterial.uniforms.uCameraPos.value.copy(camera.position);
    }

    this.fogPlanes.forEach((plane, idx) => {
      plane.rotation.y += 0.0004 * (idx % 2 === 0 ? 1 : -1);
      plane.position.y += Math.sin(time * 0.4 + idx) * 0.02;
    });
  }
}
