import * as THREE from 'three';

export class Environment {
  constructor(scene) {
    this.scene = scene;

    // Nền scene tím sẫm hoàng gia Cố Đô
    this.scene.background = new THREE.Color('#0d081e');
    this.scene.fog = new THREE.FogExp2('#0d081e', 0.0035);

    this.initLights();
  }

  initLights() {
    // Ánh sáng vòm trời Cố Đô & dòng sông Hương (HemisphereLight)
    this.hemiLight = new THREE.HemisphereLight(0xdcd0f6, 0x0d081e, 0.75);
    this.scene.add(this.hemiLight);

    // Ánh nắng hoàng hôn vàng kim cung đình
    this.sunLight = new THREE.DirectionalLight(0xf5b861, 2.2);
    this.sunLight.position.set(60, 80, 50);
    this.scene.add(this.sunLight);

    // Ánh sáng thứ cấp sắc tím hoàng gia làm dịu bóng đổ
    this.fillLight = new THREE.DirectionalLight(0x7c5295, 0.7);
    this.fillLight.position.set(-50, 40, -40);
    this.scene.add(this.fillLight);
  }

  /**
   * Cập nhật màu sắc ánh sáng & sương mù theo tiến trình cuộn qua Cố Đô Huế
   * @param {number} progress 0.0 -> 1.0
   */
  update(progress) {
    // 0.0 - 0.3 (Hero & Sông Hương): Lam ngọc Sông Hương & ánh hoàng hôn tím vàng
    // 0.3 - 0.6 (Thiên Mụ & Hoa Đăng): Tím đêm hoàng gia & đốm sáng hổ phách
    // 0.6 - 0.85 (Lăng Tẩm & Đồi Thông): Xanh rêu đồi thông & sương sớm
    // 0.85 - 1.0 (CTA): Không gian vũ trụ huyền bí & Thiên cầu di sản

    const bgColors = [
      { p: 0.0, color: new THREE.Color('#0d081e'), fog: 0.0035 },
      { p: 0.3, color: new THREE.Color('#08212e'), fog: 0.003 },
      { p: 0.55, color: new THREE.Color('#1a0c2c'), fog: 0.0045 },
      { p: 0.78, color: new THREE.Color('#0e1828'), fog: 0.0035 },
      { p: 1.0, color: new THREE.Color('#090514'), fog: 0.0028 }
    ];

    let start = bgColors[0];
    let end = bgColors[1];

    for (let i = 0; i < bgColors.length - 1; i++) {
      if (progress >= bgColors[i].p && progress <= bgColors[i + 1].p) {
        start = bgColors[i];
        end = bgColors[i + 1];
        break;
      }
    }

    const factor = (progress - start.p) / (end.p - start.p || 1);
    this.scene.background.copy(start.color).lerp(end.color, factor);
    if (this.scene.fog) {
      this.scene.fog.color.copy(this.scene.background);
      this.scene.fog.density = THREE.MathUtils.lerp(start.fog, end.fog, factor);
    }
  }
}
