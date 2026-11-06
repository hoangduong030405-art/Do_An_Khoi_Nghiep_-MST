const fs = require('fs');

const path = 'web-hue4u/public/landing.html';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

// 1. Update Couplet and Text references
content = content.replace(/LONG PHỤNG TRÌNH TƯỜNG DI SẢN VINH/g, 'BẠCH HẠC TRÌNH TƯỜNG DI SẢN VINH');
content = content.replace(/HUEGO • LONG PHỤNG KHAI MÔN/g, 'HUEGO • BẠCH HẠC KHAI MÔN');
content = content.replace(/Khởi tạo Rồng & Phượng Hoàng 3D, Thuyền Rồng Sông Hương/g, 'Khởi tạo Đàn Bạch Hạc Hoàng Cung 3D, Thuyền Rồng Sông Hương');
content = content.replace(/Đang triệu hồi Long Phụng 3D:/g, 'Đang triệu hồi Đàn Bạch Hạc Hoàng Cung 3D:');
content = content.replace(/LONG PHỤNG TRIỀU NGUYỄN • CÔNG NGHỆ 3D REALTIME/g, 'BẠCH HẠC HOÀNG CUNG • CÔNG NGHỆ 3D REALTIME');
content = content.replace(/Chiêm ngưỡng Rồng & Phượng Hoàng 3D sải cánh bay từ trời cao/g, 'Chiêm ngưỡng Đàn Bạch Hạc Hoàng Cung 3D sải cánh bay lượn từ trời cao');
content = content.replace(/Chiêm ngưỡng Rồng & Phượng Hoàng 3D/g, 'Chiêm ngưỡng Đàn Bạch Hạc Hoàng Cung 3D');
content = content.replace(/Rồng & Phượng Hoàng 3D đang bay lượn trên trời cao/g, 'Đàn Bạch Hạc Hoàng Cung 3D đang sải cánh trên trời cao');
content = content.replace(/Khám Phá Cố Đô Sơn Hà Long Phụng 3D/g, 'Khám Phá Cố Đô Sơn Hà Bạch Hạc 3D');
content = content.replace(/Rồng & Phượng Hoàng 3D bay lượn,/g, 'Đàn Bạch Hạc Hoàng Cung 3D bay lượn,');

// 2. Locate Section E & G and replace with Authentic Royal Creatures (Storks, Flamingos, Songbirds, Koi Carp)
const sectionEStart = '    /* ==========================================================================\n       E. THANH LONG & HỎA PHƯỢNG';
const sectionGEnd = '    /* ==========================================================================\n       H. HIỆU ỨNG VÀO WEB BÙNG NỔ';

const sEIdx = content.indexOf(sectionEStart);
const sGIdx = content.indexOf(sectionGEnd);

if (sEIdx === -1 || sGIdx === -1) {
  console.error('Section E or H not found!', sEIdx, sGIdx);
  process.exit(1);
}

const newCreaturesSection = `    /* ==========================================================================
       E. ĐÀN BẠCH HẠC & LINH ĐIỂU HOÀNG CUNG 3D (100% REAL 3D RIGGED MESHES)
       Thay thế hoàn toàn hình ảnh Rồng/Phượng bằng các linh thú chuẩn xác Cố Đô:
       - Đàn Bạch Hạc Hoàng Cung (5 Storks bay đội hình chữ V vỗ cánh thật 60FPS)
       - Cặp Hồng Hạc Hoàng Gia (2 Flamingos sải cánh quý phái tầng cao)
       - Đôi Chim Loan Ngũ Sắc (2 Parrots lượn nhanh quanh Smartphone & Đài Sen)
       - Đàn Cá Chép Vàng Hoàng Cung (Koi Carp bơi lội dưới dòng Sông Hương)
       ========================================================================== */
    const royalCreaturesGroup = new THREE.Group();
    scene.add(royalCreaturesGroup);

    // Vật liệu lông vũ Bạch Kim & Ánh Vàng Cung Đình
    const royalCraneMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.32,
      metalness: 0.18,
      emissive: 0xD4AF37,
      emissiveIntensity: 0.28,
      morphTargets: true
    });

    const royalFlamingoMat = new THREE.MeshStandardMaterial({
      color: 0xFF7043,
      roughness: 0.35,
      metalness: 0.25,
      emissive: 0xFF5722,
      emissiveIntensity: 0.32,
      morphTargets: true
    });

    const royalSongbirdMat = new THREE.MeshStandardMaterial({
      color: 0xDC2626,
      roughness: 0.28,
      metalness: 0.65,
      emissive: 0x2A9D8F,
      emissiveIntensity: 0.45,
      morphTargets: true
    });

    // 1. ĐÀN BẠCH HẠC HOÀNG CUNG 3D (5 CHIM HẠC BAY ĐỘI HÌNH V-FORMATION)
    const craneGroup = new THREE.Group();
    royalCreaturesGroup.add(craneGroup);
    const craneMeshes = [];
    const craneOffsets = [
      { x: 0, y: 0, z: 0, scale: 0.038, delay: 0 },         // Đại Bạch Hạc đầu đàn (Alpha Leader)
      { x: -3.5, y: 0.8, z: -3.2, scale: 0.028, delay: 0.25 }, // Hạc cánh trái 1
      { x: 3.5, y: 0.6, z: -3.2, scale: 0.028, delay: 0.4 },   // Hạc cánh phải 1
      { x: -6.8, y: 1.6, z: -6.4, scale: 0.024, delay: 0.6 },  // Hạc cánh trái 2
      { x: 6.8, y: 1.4, z: -6.4, scale: 0.024, delay: 0.75 }   // Hạc cánh phải 2
    ];

    // Dải bụi sao vàng kim mềm mại bay theo đàn hạc
    const craneSparkCount = 180;
    const craneSparkGeo = new THREE.BufferGeometry();
    const craneSparkPos = new Float32Array(craneSparkCount * 3);
    for (let p = 0; p < craneSparkCount * 3; p += 3) {
      craneSparkPos[p] = (Math.random() - 0.5) * 16;
      craneSparkPos[p + 1] = (Math.random() - 0.5) * 6;
      craneSparkPos[p + 2] = (Math.random() - 0.5) * 16;
    }
    craneSparkGeo.setAttribute('position', new THREE.BufferAttribute(craneSparkPos, 3));
    const craneSparkPoints = new THREE.Points(
      craneSparkGeo,
      new THREE.PointsMaterial({
        size: 0.28,
        color: 0xFFD700,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      })
    );
    craneGroup.add(craneSparkPoints);

    // 2. CẶP HỒNG HẠC HOÀNG GIA (2 FLAMINGOS SẢI CÁNH TẦNG TRỜI CAO)
    const flamingoGroup = new THREE.Group();
    royalCreaturesGroup.add(flamingoGroup);
    const flamingoMeshes = [];

    // 3. ĐÔI CHIM LOAN NGŨ SẮC (2 PARROTS LƯỢN QUANH BỆ HOA SEN & SMARTPHONE)
    const songbirdGroup = new THREE.Group();
    heroRightGroup.add(songbirdGroup);
    const songbirdMeshes = [];

    // 4. TIẾN ĐỘ TẢI MÔ HÌNH (LOADING MANAGER)
    let modelsLoadedCount = 0;
    const totalModelsToLoad = 3;

    function updateLoadingProgress(step) {
      modelsLoadedCount += step;
      const pct = Math.min(Math.round((modelsLoadedCount / totalModelsToLoad) * 100), 100);
      const bar = document.getElementById('intro-progress-bar');
      const text = document.getElementById('intro-progress-text');
      if (bar) bar.style.width = pct + '%';
      if (text) text.innerText = \`Đang triệu hồi Đàn Linh Điểu Hoàng Cung: \${pct}%\`;

      if (modelsLoadedCount >= totalModelsToLoad) {
        setTimeout(triggerExplosiveRoyalIntro, 350);
      }
    }

    const gltfLoader = new THREE.GLTFLoader();

    // A. TẢI STORK.GLB (BẠCH HẠC HOÀNG CUNG)
    const storkUrls = ['./models/birds/Stork.glb', 'https://threejs.org/examples/models/gltf/Stork.glb'];
    function loadStorkModel(idx = 0) {
      if (idx >= storkUrls.length) { updateLoadingProgress(1); return; }
      gltfLoader.load(storkUrls[idx], (gltf) => {
        const baseMesh = gltf.scene.children[0];
        craneOffsets.forEach((cfg, i) => {
          const crane = baseMesh.clone();
          crane.material = royalCraneMat.clone();
          crane.scale.set(cfg.scale, cfg.scale, cfg.scale);
          crane.position.set(cfg.x, cfg.y, cfg.z);
          craneGroup.add(crane);
          craneMeshes.push(crane);

          const mixer = new THREE.AnimationMixer(crane);
          const action = mixer.clipAction(gltf.animations[0]);
          action.setDuration(1.4 + (i % 3) * 0.2);
          action.play();
          mixer.setTime(cfg.delay);
          mixers.push(mixer);
        });
        updateLoadingProgress(1);
      }, undefined, () => loadStorkModel(idx + 1));
    }
    loadStorkModel();

    // B. TẢI FLAMINGO.GLB (HỒNG HẠC HOÀNG GIA)
    const flamingoUrls = ['./models/birds/Flamingo.glb', 'https://threejs.org/examples/models/gltf/Flamingo.glb'];
    function loadFlamingoModel(idx = 0) {
      if (idx >= flamingoUrls.length) { updateLoadingProgress(1); return; }
      gltfLoader.load(flamingoUrls[idx], (gltf) => {
        const baseMesh = gltf.scene.children[0];
        for (let f = 0; f < 2; f++) {
          const fl = baseMesh.clone();
          fl.material = royalFlamingoMat.clone();
          fl.scale.set(0.026, 0.026, 0.026);
          fl.position.set(f === 0 ? -4.5 : 4.5, 3.0 + f * 1.5, f * -4.0);
          flamingoGroup.add(fl);
          flamingoMeshes.push(fl);

          const mixer = new THREE.AnimationMixer(fl);
          const action = mixer.clipAction(gltf.animations[0]);
          action.setDuration(1.6 + f * 0.3);
          action.play();
          mixers.push(mixer);
        }
        updateLoadingProgress(1);
      }, undefined, () => loadFlamingoModel(idx + 1));
    }
    loadFlamingoModel();

    // C. TẢI PARROT.GLB (CHIM LOAN NGŨ SẮC)
    const parrotUrls = ['./models/birds/Parrot.glb', 'https://threejs.org/examples/models/gltf/Parrot.glb'];
    function loadParrotModel(idx = 0) {
      if (idx >= parrotUrls.length) { updateLoadingProgress(1); return; }
      gltfLoader.load(parrotUrls[idx], (gltf) => {
        const baseMesh = gltf.scene.children[0];
        for (let p = 0; p < 2; p++) {
          const pt = baseMesh.clone();
          pt.material = royalSongbirdMat.clone();
          pt.scale.set(0.032, 0.032, 0.032);
          songbirdGroup.add(pt);
          songbirdMeshes.push(pt);

          const mixer = new THREE.AnimationMixer(pt);
          const action = mixer.clipAction(gltf.animations[0]);
          action.setDuration(1.1 + p * 0.25);
          action.play();
          mixers.push(mixer);
        }
        updateLoadingProgress(1);
      }, undefined, () => loadParrotModel(idx + 1));
    }
    loadParrotModel();

    // D. ĐÀN CÁ CHÉP VÀNG HOÀNG CUNG BƠI LỘI DƯỚI SÔNG HƯƠNG (IMPERIAL KOI CARP)
    const koiGroup = new THREE.Group();
    riverScene.add(koiGroup);
    const koiFishes = [];
    const koiCount = 6;

    const koiGoldMat = new THREE.MeshStandardMaterial({
      color: 0xFF9800,
      roughness: 0.25,
      metalness: 0.75,
      emissive: 0xE65100,
      emissiveIntensity: 0.4
    });
    const koiWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xFFFDF0,
      roughness: 0.35,
      metalness: 0.2
    });

    for (let k = 0; k < koiCount; k++) {
      const fish = new THREE.Group();
      
      // Thân cá chép hình thoi uốn lượn
      const fishBody = new THREE.Mesh(
        new THREE.ConeGeometry(0.28, 1.4, 8),
        k % 2 === 0 ? koiGoldMat : koiWhiteMat
      );
      fishBody.rotation.x = Math.PI / 2;
      fish.add(fishBody);

      // Đầu cá
      const fishHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 8, 8),
        koiGoldMat
      );
      fishHead.position.z = 0.7;
      fishHead.scale.set(1.0, 0.8, 1.2);
      fish.add(fishHead);

      // Vây ngực đôi bên
      for (let s = -1; s <= 1; s += 2) {
        const fin = new THREE.Mesh(
          new THREE.PlaneGeometry(0.35, 0.6),
          koiGoldMat
        );
        fin.position.set(s * 0.26, -0.05, 0.2);
        fin.rotation.z = s * 0.6;
        fin.rotation.y = s * 0.4;
        fish.add(fin);
      }

      // Đuôi cá chép mềm mại
      const fishTail = new THREE.Mesh(
        new THREE.PlaneGeometry(0.5, 0.8),
        koiGoldMat
      );
      fishTail.position.z = -0.9;
      fishTail.rotation.y = Math.PI / 2;
      fish.add(fishTail);

      // Phân bố bơi quanh Thuyền Rồng
      fish.position.set(
        (Math.random() - 0.5) * 14,
        -1.3 + Math.random() * 0.4,
        -4.0 + (Math.random() - 0.5) * 12
      );
      fish.userData = {
        speed: 0.6 + Math.random() * 0.4,
        baseX: fish.position.x,
        baseZ: fish.position.z,
        radius: 2.5 + Math.random() * 3.5,
        angle: Math.random() * Math.PI * 2
      };

      koiGroup.add(fish);
      koiFishes.push(fish);
    }

    // ==========================================================================
    // G. ĐƯỜNG BAY 3D: ĐÀN BẠCH HẠC HOÀNG CUNG BAY TỪ XA VÀO (BẠCH HẠC KHAI MÔN)
    // ==========================================================================
    // Quỹ đạo lượn trời cao uy nghi của Đàn Bạch Hạc quanh trung tâm màn hình
    const craneFlightPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-16, 12, 14),   // Sà qua bên trái
      new THREE.Vector3(2, 16, 16),     // Bay vút cao phía trước màn hình
      new THREE.Vector3(18, 10, 6),     // Lượn qua bên phải điện thoại
      new THREE.Vector3(12, 4, -8),     // Luồn ra phía sau đài sen
      new THREE.Vector3(-8, 8, -12),    // Lượn qua phía sau bên trái
      new THREE.Vector3(-18, 10, 4)     // Vòng lại phía trước
    ], true);

    // Quỹ đạo của Cặp Hồng Hạc Hoàng Gia ở tầng mây cao
    const flamingoFlightPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(16, 16, 10),    // Bay vút cao bên phải
      new THREE.Vector3(0, 11, 14),     // Sà xuống phía trước
      new THREE.Vector3(-15, 14, 6),    // Lượn qua bên trái
      new THREE.Vector3(-8, 18, -8),    // Bay lên tầng mây phía sau
      new THREE.Vector3(14, 12, -6)     // Vòng lại bên phải
    ], true);

    // Trạng thái bay từ xa vào (Intro Fly-in State)
    let flyInTime = 0;
    let isFlyInCompleted = false;

`;

content = content.substring(0, sEIdx) + newCreaturesSection + content.substring(sGIdx);
console.log('Successfully replaced Section E & G with Authentic Royal Birds and Koi!');

// 3. Replace animate() loop logic for Dragon & Phoenix with Flock of Cranes & Flamingos & Songbirds
const aStartMarker = '      // 1. THANH LONG (JADE DRAGON):';
const aEndMarker = '      // Chim Loan Ngũ Sắc';

const aStart = content.indexOf(aStartMarker);
const aEnd = content.indexOf(aEndMarker);

if (aStart === -1 || aEnd === -1) {
  console.error('Animate markers not found!', aStart, aEnd);
  process.exit(1);
}

const newAnimateCreatures = `      // ========================================================================
      // 1. ĐÀN BẠCH HẠC HOÀNG CUNG (V-FORMATION 3D FLIGHT & INTRO FLY-IN)
      // ========================================================================
      let craneCenterPos = new THREE.Vector3();
      let craneNextPos = new THREE.Vector3();

      if (!isFlyInCompleted) {
        flyInTime += delta * 0.42;
        const fProg = Math.min(flyInTime, 1.0);
        // Bay vút từ chân trời xa (-100) vào vị trí trung tâm
        const zPos = -105 + fProg * 115;
        const yPos = 26 - fProg * 15 + Math.sin(time * 2.8) * 1.4;
        const xPos = -22 + fProg * 28 + Math.cos(time * 2.2) * 1.8;
        craneCenterPos.set(xPos, yPos, zPos);
        craneNextPos.set(xPos + 0.6, yPos - 0.2, zPos + 2.5);

        if (fProg >= 1.0) isFlyInCompleted = true;
      } else {
        const cT = (time * 0.055) % 1;
        craneCenterPos = craneFlightPath.getPointAt(cT);
        craneNextPos = craneFlightPath.getPointAt((cT + 0.01) % 1);
        craneCenterPos.y += Math.sin(time * 2.0) * 1.2;
        craneCenterPos.x += Math.cos(time * 1.5) * 1.0;
      }

      craneGroup.position.copy(craneCenterPos);
      craneGroup.lookAt(craneNextPos);
      // Hiệu ứng nghiêng cánh khi lượn vòng (banking/roll)
      craneGroup.rotation.z = Math.sin(time * 1.8) * 0.22;

      craneSparkPoints.rotation.y = time * 0.3;

      // ========================================================================
      // 2. CẶP HỒNG HẠC HOÀNG GIA (ROYAL FLAMINGOS Ở TẦNG TRỜI CAO)
      // ========================================================================
      let flamPos = new THREE.Vector3();
      let flamNext = new THREE.Vector3();

      if (!isFlyInCompleted) {
        const fProg = Math.min(flyInTime, 1.0);
        const fZ = -100 + fProg * 110;
        const fY = 28 - fProg * 14 + Math.cos(time * 2.5) * 1.2;
        const fX = 24 - fProg * 28 + Math.sin(time * 2.0) * 1.5;
        flamPos.set(fX, fY, fZ);
        flamNext.set(fX - 0.6, fY - 0.2, fZ + 2.5);
      } else {
        const fT = (time * 0.065 + 0.42) % 1;
        flamPos = flamingoFlightPath.getPointAt(fT);
        flamNext = flamingoFlightPath.getPointAt((fT + 0.01) % 1);
        flamPos.y += Math.cos(time * 2.2) * 1.2;
      }

      flamingoGroup.position.copy(flamPos);
      flamingoGroup.lookAt(flamNext);
      flamingoGroup.rotation.z = -Math.cos(time * 1.6) * 0.2;

      // ========================================================================
      // 3. ĐÔI CHIM LOAN NGŨ SẮC (LƯỢN QUANH BỆ SEN & SMARTPHONE)
      // ========================================================================
`;

// Also check and update the Songbird / Parrot block
const parrotBlockEndMarker = 'heroRightGroup.rotation.y = (targetMouseX * 0.4 - heroRightGroup.rotation.y) * 0.05;';
const pBlockStart = content.indexOf('// Chim Loan Ngũ Sắc', aEnd);
const pBlockEnd = content.indexOf(parrotBlockEndMarker);

if (pBlockStart !== -1 && pBlockEnd !== -1) {
  const newSongbirdAnimate = `// Chim Loan Ngũ Sắc lượn quanh bệ sen & Smartphone 3D
      songbirdMeshes.forEach((sb, sIdx) => {
        const sT = (time * 0.18 + sIdx * 0.5) % 1;
        const sAngle = sT * Math.PI * 2;
        const sRadius = 4.2 + Math.sin(time * 2.0 + sIdx) * 0.8;
        sb.position.set(
          Math.cos(sAngle) * sRadius,
          Math.sin(time * 3.0 + sIdx * 2.0) * 1.2 + 2.2,
          Math.sin(sAngle) * sRadius * 0.75
        );
        // Hướng mỏ theo hướng bay
        const nextAngle = sAngle + 0.08;
        sb.lookAt(
          Math.cos(nextAngle) * sRadius,
          sb.position.y,
          Math.sin(nextAngle) * sRadius * 0.75
        );
      });

      // Đàn cá chép vàng hoàng cung bơi lội dưới Sông Hương
      koiFishes.forEach((fish) => {
        fish.userData.angle += delta * fish.userData.speed * 0.6;
        fish.position.x = fish.userData.baseX + Math.cos(fish.userData.angle) * fish.userData.radius;
        fish.position.z = fish.userData.baseZ + Math.sin(fish.userData.angle) * fish.userData.radius;
        // Hướng bơi
        const heading = fish.userData.angle + Math.PI / 2;
        fish.rotation.y = -heading;
        // Đuôi và thân uốn lượn hình sin
        fish.rotation.z = Math.sin(time * 5.0 * fish.userData.speed) * 0.18;
      });

      `;

  content = content.substring(0, aStart) + newAnimateCreatures + content.substring(pBlockStart, pBlockEnd) + newSongbirdAnimate + content.substring(pBlockEnd);
  console.log('Successfully updated animate() loop with Cranes, Flamingos, Songbirds, and Koi!');
} else {
  content = content.substring(0, aStart) + newAnimateCreatures + content.substring(aEnd);
  console.log('Successfully updated animate() loop start!');
}

content = content.replace(/\n/g, '\r\n');
fs.writeFileSync(path, content, 'utf8');
fs.writeFileSync('backend/public/portal/landing.html', content, 'utf8');
console.log('Finished updating web-hue4u & backend landing.html with Authentic Royal Animals!');
