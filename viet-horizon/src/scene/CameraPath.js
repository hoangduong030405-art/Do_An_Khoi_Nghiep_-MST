import * as THREE from 'three';

/**
 * CameraPath - Quản lý lộ trình bay CatmullRomCurve3
 * Đồng bộ vị trí camera và điểm nhìn (lookAt) theo tiến trình cuộn (0.0 -> 1.0)
 */
export class CameraPath {
  constructor() {
    // 1. Điểm kiểm soát vị trí camera theo các chặng
    const positionPoints = [
      new THREE.Vector3(0, 42, 130),     // 0.00: Hero - Trên tầng mây
      new THREE.Vector3(12, 28, 90),     // 0.15: Đang hạ dần vào vịnh
      new THREE.Vector3(22, 6, 35),      // 0.30: Hạ Long - Lướt sát mặt biển
      new THREE.Vector3(0, 9, -15),      // 0.42: Chuyển hướng vào kênh sông
      new THREE.Vector3(-18, 11, -75),   // 0.55: Hội An - Giữa ngàn lồng đèn
      new THREE.Vector3(10, 35, -135),   // 0.68: Bắt đầu bay lên triền núi
      new THREE.Vector3(25, 62, -195),   // 0.78: Sapa - Đỉnh đèo và mây ngàn
      new THREE.Vector3(0, 24, -280),    // 0.88: Gallery trải nghiệm ngang
      new THREE.Vector3(0, 12, -370),    // 0.94: Số liệu & Trích dẫn
      new THREE.Vector3(0, 4, -455)      // 1.00: CTA - Đối diện Quả cầu thiên thể
    ];

    // 2. Điểm kiểm soát hướng nhìn (LookAt target)
    const targetPoints = [
      new THREE.Vector3(0, 20, 20),      // Nhìn đỉnh núi đảo xa
      new THREE.Vector3(5, 12, 10),      // Nhìn vách đá Hạ Long
      new THREE.Vector3(2, 3, -40),      // Nhìn mặt nước lấp lánh
      new THREE.Vector3(-5, 8, -60),     // Nhìn vào dòng sông Hoài
      new THREE.Vector3(0, 10, -120),    // Nhìn trung tâm biển lồng đèn
      new THREE.Vector3(5, 30, -180),    // Nhìn ruộng bậc thang uốn lượn
      new THREE.Vector3(0, 50, -250),    // Nhìn đỉnh Fansipan trong mây
      new THREE.Vector3(0, 24, -330),    // Nhìn thẳng vào bộ sưu tập ảnh 3D
      new THREE.Vector3(0, 12, -420),    // Nhìn các ngôi sao lấp lánh
      new THREE.Vector3(0, 4, -500)      // Nhìn tâm quả cầu 3D
    ];

    this.positionCurve = new THREE.CatmullRomCurve3(positionPoints, false, 'catmullrom', 0.5);
    this.targetCurve = new THREE.CatmullRomCurve3(targetPoints, false, 'catmullrom', 0.5);

    this.currentPosition = new THREE.Vector3();
    this.currentTarget = new THREE.Vector3();
    this.interpolatedTarget = new THREE.Vector3();

    // Cache để tính toán mượt mà
    this.positionCurve.getPointAt(0, this.currentPosition);
    this.targetCurve.getPointAt(0, this.currentTarget);
    this.interpolatedTarget.copy(this.currentTarget);
  }

  /**
   * Cập nhật vị trí và góc nhìn camera
   * @param {THREE.Camera} camera
   * @param {number} progress Tiến trình từ 0.0 đến 1.0
   * @param {object} mouseParallax { x, y } độ lệch parallax chuột
   */
  update(camera, progress, mouseParallax = { x: 0, y: 0 }) {
    const p = THREE.MathUtils.clamp(progress, 0, 1);

    this.positionCurve.getPointAt(p, this.currentPosition);
    this.targetCurve.getPointAt(p, this.currentTarget);

    // Bổ sung chuyển động thở nhẹ của máy bay + tương tác chuột
    const cameraPos = this.currentPosition.clone();
    cameraPos.x += mouseParallax.x * 2.5;
    cameraPos.y += mouseParallax.y * 1.8;

    // Gán vị trí cho camera
    camera.position.copy(cameraPos);

    // Làm mượt hướng nhìn
    this.interpolatedTarget.lerp(this.currentTarget, 0.08);
    const lookTarget = this.interpolatedTarget.clone();
    lookTarget.x += mouseParallax.x * 1.5;
    lookTarget.y += mouseParallax.y * 1.2;

    camera.lookAt(lookTarget);

    // Roll góc nghiêng máy bay nhẹ khi vào cua (bank angle)
    const tangent = this.positionCurve.getTangentAt(p);
    const bankAngle = -tangent.x * 0.35;
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, bankAngle, 0.05);
  }
}
