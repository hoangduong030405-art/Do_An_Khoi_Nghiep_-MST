import * as THREE from 'three';
import planeVert from '../shaders/distortion/planeCurve.vert.glsl?raw';
import planeFrag from '../shaders/distortion/planeCurve.frag.glsl?raw';

export class GalleryStage {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(0, 20, -320);
    this.scene.add(this.group);

    this.cards = [];
    this.initCards();
  }

  createCardTexture(title, subtitle, location, accentColor) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1360;
    const ctx = canvas.getContext('2d');

    // Nền gradient tím thẫm hoàng gia sang trọng
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#150a2b');
    grad.addColorStop(0.5, '#0d071c');
    grad.addColorStop(1, '#05020a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vệt hào quang màu sắc chủ đạo
    const rad = ctx.createRadialGradient(canvas.width * 0.5, canvas.height * 0.4, 40, canvas.width * 0.5, canvas.height * 0.4, 450);
    rad.addColorStop(0, accentColor);
    rad.addColorStop(0.6, 'rgba(21, 10, 43, 0.2)');
    rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Viền khung chỉ vàng kim tinh tế
    ctx.strokeStyle = 'rgba(245, 184, 97, 0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Ký hiệu & Huy hiệu App HUEGO
    ctx.fillStyle = '#f5b861';
    ctx.font = '600 28px "Cinzel", "Playfair Display", serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('HUEGO — DI SẢN SỐ CỐ ĐÔ', 90, 130);

    // Địa danh & Tọa độ
    ctx.fillStyle = 'rgba(247, 243, 236, 0.7)';
    ctx.font = '400 32px sans-serif';
    ctx.fillText(location, 90, canvas.height - 240);

    // Tiêu đề trải nghiệm
    ctx.fillStyle = '#f7f3ec';
    ctx.font = 'bold 64px "Playfair Display", Georgia, serif';
    ctx.fillText(title, 90, canvas.height - 150);

    // Mô tả ngắn
    ctx.fillStyle = '#e5a952';
    ctx.font = 'italic 34px serif';
    ctx.fillText(subtitle, 90, canvas.height - 95);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  initCards() {
    const experiences = [
      {
        title: 'VR Hoàng Thành 3D',
        subtitle: 'Tái hiện Tử Cấm Thành vàng son',
        location: 'ĐẠI NỘI HUẾ // 16.47° N',
        color: 'rgba(168, 43, 53, 0.55)', // Đỏ son hoàng cung
        x: -28
      },
      {
        title: 'Ca Huế Sông Hương',
        subtitle: 'Dạ tiệc Nhã nhạc trên thuyền rồng',
        location: 'SÔNG HƯƠNG // ĐÊM HOA ĐĂNG',
        color: 'rgba(245, 184, 97, 0.5)',  // Vàng kim hoàng gia
        x: -9
      },
      {
        title: 'Cổ Vật Triều Nguyễn',
        subtitle: 'Xoay ngắm bảo vật hoàng gia 360°',
        location: 'BẢO TÀNG SỐ // DI SẢN',
        color: 'rgba(12, 59, 62, 0.6)',   // Xanh ngọc bích
        x: 10
      },
      {
        title: 'Ẩm Thực Cung Đình',
        subtitle: 'Bản đồ mỹ vị ẩm thực tiến vua',
        location: 'ẨM THỰC // 500+ MÓN',
        color: 'rgba(255, 126, 71, 0.55)', // Sắc cam ấm áp
        x: 29
      }
    ];

    const cardGeo = new THREE.PlaneGeometry(16, 21.5, 32, 32);

    experiences.forEach((item, index) => {
      const tex = this.createCardTexture(item.title, item.subtitle, item.location, item.color);
      const mat = new THREE.ShaderMaterial({
        vertexShader: planeVert,
        fragmentShader: planeFrag,
        side: THREE.DoubleSide,
        uniforms: {
          uTexture: { value: tex },
          uVelocity: { value: 0 },
          uHover: { value: 0 },
          uHoverOffset: { value: new THREE.Vector2(0, 0) }
        }
      });

      const mesh = new THREE.Mesh(cardGeo, mat);
      mesh.position.set(item.x, 0, (index % 2 === 0 ? 2 : -2));
      mesh.rotation.y = (index - 1.5) * -0.06;

      this.group.add(mesh);
      this.cards.push({ mesh, mat });
    });
  }

  update(time, velocity = 0) {
    this.cards.forEach(card => {
      card.mat.uniforms.uVelocity.value = velocity;
    });
  }
}
