const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });

  await page.setContent(`<!DOCTYPE html><html><body><canvas id="c"></canvas></body></html>`);

  const outDir = path.join(__dirname, '..', 'viet-horizon', 'public', 'images');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Paths of source images in workspace
  const sources = [
    {
      id: 'gallery-vr-hoangthanh-3d.webp',
      filePath: path.resolve(__dirname, '..', 'landing-page', 'public', 'images', 'dien-thai-hoa.webp'),
      tag: 'VR HOÀNG THÀNH 3D',
      subTag: 'SPATIAL WEBGL // TỬ CẤM THÀNH',
      accent: '#E5C158',
      badgeText: '3D SPATIAL'
    },
    {
      id: 'gallery-cahue-songhuong-3d.webp',
      filePath: path.resolve(__dirname, '..', 'web-hue4u', 'public', 'images', 'pois', 'ca-hue-song-huong.webp'),
      tag: 'CA HUẾ SÔNG HƯƠNG',
      subTag: 'NHÃ NHẠC TRÊN THUYỀN RỒNG',
      accent: '#FF7E47',
      badgeText: 'LIVE AUDIO'
    },
    {
      id: 'gallery-covat-trieunguyen-3d.webp',
      filePath: path.resolve(__dirname, '..', 'web-hue4u', 'public', 'images', 'pois', 'bao-tang-co-vat-cung-dinh-hue.webp'),
      tag: 'CỔ VẬT TRIỀU NGUYỄN',
      subTag: 'BẢO TÀNG SỐ 360° PBR',
      accent: '#2DD4BF',
      badgeText: '360° MODEL'
    },
    {
      id: 'gallery-amthuc-cungdinh-3d.webp',
      filePath: path.resolve(__dirname, '..', 'web-hue4u', 'public', 'images', 'pois', 'bun-bo-hue.webp'),
      tag: 'ẨM THỰC CỐ ĐÔ',
      subTag: 'MỸ VỊ CUNG ĐÌNH & DÂN GIAN',
      accent: '#F59E0B',
      badgeText: 'AR FLAVOR'
    }
  ];

  for (const item of sources) {
    console.log(`Processing 3D master artwork for: ${item.tag}...`);

    // Read image as base64
    const imgBuffer = fs.readFileSync(item.filePath);
    const mime = item.filePath.endsWith('.png') ? 'image/png' : 'image/webp';
    const base64Src = `data:${mime};base64,${imgBuffer.toString('base64')}`;

    const dataUrl = await page.evaluate(async (data) => {
      const canvas = document.getElementById('c');
      const w = 840;
      const h = 540;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');

      // 1. Load và vẽ ảnh gốc
      const img = new Image();
      img.src = data.base64Src;
      await new Promise(r => { img.onload = r; img.onerror = r; });

      if (img.width && img.height) {
        const scale = Math.max(w / img.width, h / img.height);
        const nw = img.width * scale;
        const nh = img.height * scale;
        const ox = (w - nw) / 2;
        const oy = (h - nh) / 2;
        ctx.drawImage(img, ox, oy, nw, nh);
      }

      // 2. Lớp phủ sắc thái tím hoàng cung & viễn cận chiều sâu (Royal Depth Vignette)
      const grad = ctx.createRadialGradient(w / 2, h * 0.45, 60, w / 2, h / 2, Math.max(w, h) * 0.68);
      grad.addColorStop(0, 'rgba(13, 8, 30, 0.08)');
      grad.addColorStop(0.55, 'rgba(13, 8, 30, 0.45)');
      grad.addColorStop(1, 'rgba(5, 2, 12, 0.88)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 3. Lưới 3D Wireframe Perspective ở nửa dưới
      ctx.save();
      ctx.strokeStyle = data.accent;
      ctx.globalAlpha = 0.28;
      ctx.lineWidth = 1.2;

      const vanishX = w / 2;
      const vanishY = h * 0.52;
      for (let i = -6; i <= 6; i++) {
        const bottomX = vanishX + i * (w / 6.5);
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(bottomX, h);
        ctx.stroke();
      }

      for (let y = vanishY + 25; y < h; y += 32) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.restore();

      // 4. Hào quang phát sáng ở tâm (3D Focal Glow)
      const coreGlow = ctx.createRadialGradient(w / 2, h * 0.5, 20, w / 2, h * 0.5, 260);
      coreGlow.addColorStop(0, data.accent);
      coreGlow.addColorStop(0.35, 'rgba(245, 184, 97, 0.25)');
      coreGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = coreGlow;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // 5. Các hạt bụi vàng Stardust lơ lửng 3D
      ctx.save();
      ctx.fillStyle = '#FFF0B8';
      for (let i = 0; i < 40; i++) {
        const px = Math.sin(i * 123) * w * 0.44 + w / 2;
        const py = Math.cos(i * 87) * h * 0.38 + h / 2;
        const pr = (i % 3) * 1.3 + 0.8;
        ctx.globalAlpha = (i % 5) * 0.16 + 0.3;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 6. Viền mạ vàng nội vi tinh xảo
      ctx.save();
      ctx.strokeStyle = 'rgba(245, 184, 97, 0.55)';
      ctx.lineWidth = 1.8;
      ctx.strokeRect(16, 16, w - 32, h - 32);

      const cornerSize = 18;
      ctx.strokeStyle = data.accent;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(12, 12, cornerSize, cornerSize);
      ctx.strokeRect(w - 12 - cornerSize, 12, cornerSize, cornerSize);
      ctx.strokeRect(12, h - 12 - cornerSize, cornerSize, cornerSize);
      ctx.strokeRect(w - 12 - cornerSize, h - 12 - cornerSize, cornerSize, cornerSize);
      ctx.restore();

      // 7. Nhãn thông số công nghệ 3D ở góc dưới bên trái
      ctx.save();
      ctx.fillStyle = 'rgba(13, 8, 30, 0.88)';
      ctx.strokeStyle = 'rgba(245, 184, 97, 0.45)';
      ctx.lineWidth = 1;
      const badgeW = 290;
      const badgeH = 38;
      const badgeX = 30;
      const badgeY = h - 60;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = data.accent;
      ctx.font = 'bold 13px monospace';
      ctx.fillText(`✦ ${data.subTag}`, badgeX + 14, badgeY + 24);
      ctx.restore();

      // 8. Huy hiệu 3D Badge ở góc trên bên phải
      ctx.save();
      ctx.fillStyle = 'rgba(13, 8, 30, 0.88)';
      ctx.strokeStyle = 'rgba(245, 184, 97, 0.6)';
      ctx.lineWidth = 1;
      const pillW = 125;
      const pillH = 32;
      const pillX = w - 152;
      const pillY = 28;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 16);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFF0B8';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`✦ ${data.badgeText}`, pillX + 16, pillY + 21);
      ctx.restore();

      return canvas.toDataURL('image/webp', 0.95);
    }, { ...item, base64Src });

    const base64Data = dataUrl.replace(/^data:image\/webp;base64,/, '');
    const targetFile = path.join(outDir, item.id);
    fs.writeFileSync(targetFile, Buffer.from(base64Data, 'base64'));
    console.log(`Successfully generated master 3D artwork: ${targetFile}`);
  }

  await browser.close();
  console.log('All 4 Gallery 3D images have been built with real photos successfully!');
})();
