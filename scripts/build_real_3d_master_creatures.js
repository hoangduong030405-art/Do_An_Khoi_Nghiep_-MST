const fs = require('fs');

const path = 'web-hue4u/public/landing.html';
let content = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n');

// 1. Locate and replace section E
const sectionEStart = '    /* ==========================================================================\n       E. THANH LONG & HỎA PHƯỢNG';
const sectionEEnd = '    /* ==========================================================================\n       G. ĐƯỜNG BAY 3D: RỒNG VÀ PHƯỢNG HOÀNG';

const real3DModelsCode = `    /* ==========================================================================
       E. THANH LONG & HỎA PHƯỢNG 3D NGHỆ THUẬT CUNG ĐÌNH ĐỒ SỘ (100% REAL 3D MESH)
       Tạo tác 3D điêu khắc chi tiết chuẩn danh họa: Thanh Long ngọc bích yếm ngà & Hỏa Phượng cánh đại bàng đuôi mắt công
       ========================================================================== */
    // --------------------------------------------------------------------------
    // VẬT LIỆU PBR CHUẨN MÀU BỨC DANH HỌA
    // --------------------------------------------------------------------------
    // Rồng: Xanh ngọc bích (Jade), Bụng ngà voi (Ivory Belly), Vây vàng kim, Sừng ngà
    const jadeScaleMat = new THREE.MeshStandardMaterial({
      color: 0x1E824C,
      roughness: 0.22,
      metalness: 0.58,
      emissive: 0x0E4D2C,
      emissiveIntensity: 0.35
    });
    const ivoryBellyMat = new THREE.MeshStandardMaterial({
      color: 0xF5E6CA,
      roughness: 0.38,
      metalness: 0.15
    });
    const goldDragonFinMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      roughness: 0.18,
      metalness: 0.88,
      emissive: 0xF59E0B,
      emissiveIntensity: 0.45,
      side: THREE.DoubleSide
    });
    const hornIvoryMat = new THREE.MeshStandardMaterial({
      color: 0xFFFDF0,
      roughness: 0.3,
      metalness: 0.25
    });
    const jadeManeMat = new THREE.MeshStandardMaterial({
      color: 0x27AE60,
      roughness: 0.35,
      emissive: 0x58B19F,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide
    });

    // Phượng: Lửa đỏ cam (Vermilion), Ức vàng kim, Lông cánh trắng & chóp đen
    const phoenixBodyMat = new THREE.MeshStandardMaterial({
      color: 0xE64A19,
      roughness: 0.28,
      metalness: 0.45,
      emissive: 0xDC2626,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide
    });
    const phoenixGoldMat = new THREE.MeshStandardMaterial({
      color: 0xFFB300,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0xF59E0B,
      emissiveIntensity: 0.6,
      side: THREE.DoubleSide
    });
    const phoenixWhiteWingMat = new THREE.MeshStandardMaterial({
      color: 0xFFFDF5,
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const phoenixBlackTipMat = new THREE.MeshStandardMaterial({
      color: 0x1A1A1A,
      roughness: 0.5,
      metalness: 0.2,
      side: THREE.DoubleSide
    });
    const peacockEyeBlueMat = new THREE.MeshStandardMaterial({
      color: 0x0D47A1,
      roughness: 0.15,
      metalness: 0.9,
      emissive: 0x1976D2,
      emissiveIntensity: 0.8,
      side: THREE.DoubleSide
    });
    const dragonEyeMat = new THREE.MeshStandardMaterial({
      color: 0xFF1744,
      emissive: 0xFF5252,
      emissiveIntensity: 2.5,
      roughness: 0.1
    });
    const phoenixEyeMat = new THREE.MeshStandardMaterial({
      color: 0x00E676,
      emissive: 0x69F0AE,
      emissiveIntensity: 2.2,
      roughness: 0.1
    });

    // ==========================================================================
    // 1. THANH LONG NGỌC BÍCH 3D ĐỒ SỘ (100% REAL 3D ARTICULATED DRAGON)
    // ==========================================================================
    const dragonEntityGroup = new THREE.Group();
    scene.add(dragonEntityGroup);

    // A. ĐẦU RỒNG ĐIÊU KHẮC 3D CHI TIẾT
    const dragonHead = new THREE.Group();
    dragonEntityGroup.add(dragonHead);

    // Sọ rồng xanh ngọc
    const dCranium = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.4, 2.8, 16), jadeScaleMat);
    dCranium.rotation.x = Math.PI / 2;
    dragonHead.add(dCranium);

    // Mũi rồng vươn dài
    const dMuzzle = new THREE.Mesh(new THREE.ConeGeometry(1.2, 3.2, 10), jadeScaleMat);
    dMuzzle.rotation.x = Math.PI / 2;
    dMuzzle.position.set(0, -0.1, 2.6);
    dragonHead.add(dMuzzle);

    // Hàm dưới yếm ngà
    const dJaw = new THREE.Mesh(new THREE.ConeGeometry(0.9, 2.6, 8), ivoryBellyMat);
    dJaw.rotation.x = Math.PI / 2 - 0.22;
    dJaw.position.set(0, -0.7, 2.0);
    dragonHead.add(dJaw);

    // Răng nanh trắng
    for (let t = -1; t <= 1; t += 2) {
      const fang = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.6, 6), hornIvoryMat);
      fang.position.set(t * 0.7, -0.4, 2.8);
      fang.rotation.x = Math.PI;
      dragonHead.add(fang);
    }

    // Mắt rồng đỏ ngọc quắc thước uy nghi
    for (let e = -1; e <= 1; e += 2) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), dragonEyeMat);
      eye.position.set(e * 0.88, 0.72, 1.2);
      dragonHead.add(eye);
    }

    // Dạ minh châu phát sáng rực rỡ
    const dPearl = new THREE.Mesh(
      new THREE.SphereGeometry(0.75, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xFFFDF5, emissive: 0xFFD700, emissiveIntensity: 2.2 })
    );
    dPearl.position.set(0, -0.3, 4.2);
    dragonHead.add(dPearl);

    const dragonEyeLight = new THREE.PointLight(0xFFD700, 3.5, 25);
    dragonEyeLight.position.set(0, 1.0, 1.8);
    dragonHead.add(dragonEyeLight);

    // Cặp sừng ngà vươn cao đồ sộ
    for (let h = -1; h <= 1; h += 2) {
      const mainHorn = new THREE.Mesh(new THREE.ConeGeometry(0.3, 3.8, 8), hornIvoryMat);
      mainHorn.rotation.x = -0.7;
      mainHorn.rotation.z = h * 0.4;
      mainHorn.position.set(h * 0.9, 1.8, -0.5);
      dragonHead.add(mainHorn);

      const branchHorn = new THREE.Mesh(new THREE.ConeGeometry(0.16, 2.0, 6), hornIvoryMat);
      branchHorn.rotation.x = -0.3;
      branchHorn.rotation.z = h * 0.8;
      branchHorn.position.set(h * 1.3, 2.5, -0.6);
      dragonHead.add(branchHorn);

      // Đôi râu rồng uốn lượn dài bồng bềnh
      const whisker = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.03, 5.0, 8), jadeManeMat);
      whisker.rotation.x = 0.55;
      whisker.rotation.z = h * 0.75;
      whisker.position.set(h * 1.2, -0.4, 3.2);
      dragonHead.add(whisker);
    }

    // Bờm tóc rồng xanh ngọc bích tung bay
    for (let m = 0; m < 7; m++) {
      const mane = new THREE.Mesh(new THREE.ConeGeometry(0.4, 2.2, 5), jadeManeMat);
      mane.rotation.x = -1.2;
      mane.position.set(0, 1.2 + m * 0.25, -0.5 - m * 0.35);
      dragonHead.add(mane);
    }

    // B. 48 ĐỐT THÂN RỒNG UỐN LƯỢN ĐỒ SỘ (VẢY NGỌC + BỤNG NGÀ + VÂY VÀNG)
    const dragonSegments = [];
    const segmentCount = 48;
    const finGeometry = new THREE.ConeGeometry(0.48, 1.6, 4);
    finGeometry.scale(0.3, 1, 1);

    for (let s = 0; s < segmentCount; s++) {
      const segGroup = new THREE.Group();
      const prog = s / segmentCount;
      const radius = Math.max(1.65 * (1 - Math.pow(prog, 1.4) * 0.78), 0.35);

      // Lưng rồng xanh ngọc bích (Upper Dome)
      const dorsalGeo = new THREE.SphereGeometry(radius, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.65);
      const dorsalMesh = new THREE.Mesh(dorsalGeo, jadeScaleMat);
      segGroup.add(dorsalMesh);

      // Yếm bụng rồng màu ngà voi xếp tầng (Lower Ventral Plates)
      const bellyGeo = new THREE.SphereGeometry(radius * 0.95, 14, 10, 0, Math.PI * 2, Math.PI * 0.65, Math.PI * 0.35);
      const bellyMesh = new THREE.Mesh(bellyGeo, ivoryBellyMat);
      segGroup.add(bellyMesh);

      // Vây lưng vàng kim phát sáng
      const fin = new THREE.Mesh(finGeometry, goldDragonFinMat);
      fin.position.y = radius * 1.15;
      fin.rotation.x = -0.45;
      segGroup.add(fin);

      // 4 Chân rồng xanh ngọc với móng vuốt ngà voi (Tứ trảo)
      if (s === 10 || s === 15 || s === 27 || s === 33) {
        for (let side = -1; side <= 1; side += 2) {
          const legGroup = new THREE.Group();
          legGroup.position.set(side * (radius + 0.4), -0.5, 0);
          legGroup.rotation.z = side * 0.85;

          const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.15, 2.4, 8), jadeScaleMat);
          legGroup.add(thigh);

          // 4 Móng vuốt ngà voi sắc nhọn
          for (let c = -1; c <= 2; c++) {
            const claw = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.85, 6), hornIvoryMat);
            claw.position.set(c * 0.18, -1.3, 0.35);
            claw.rotation.x = 0.65;
            legGroup.add(claw);
          }
          segGroup.add(legGroup);
        }
      }

      dragonEntityGroup.add(segGroup);
      dragonSegments.push(segGroup);
    }

    // Đuôi xòe lông ngọc
    const dragonTailTuft = new THREE.Mesh(new THREE.ConeGeometry(0.9, 3.6, 6), jadeManeMat);
    dragonTailTuft.rotation.x = -Math.PI / 2;
    dragonTailTuft.position.z = -1.6;
    dragonSegments[segmentCount - 1].add(dragonTailTuft);

    // Buffer lưu vết đường bay dài của Rồng
    const dragonHistoryLength = 600;
    const dragonHistory = [];
    for (let h = 0; h < dragonHistoryLength; h++) {
      dragonHistory.push(new THREE.Vector3(0, 8, -90));
    }

    // ==========================================================================
    // 2. HỎA PHƯỢNG HOÀNG KIM 3D ĐỒ SỘ (100% REAL 3D PHOENIX)
    // ==========================================================================
    const phoenixGroup = new THREE.Group();
    scene.add(phoenixGroup);

    // A. THÂN & ĐẦU PHƯỢNG HOÀNG LỬA 3D
    const phoenixMainBody = new THREE.Group();
    phoenixGroup.add(phoenixMainBody);

    // Mình phượng đỏ cam
    const pTorso = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 12), phoenixBodyMat);
    pTorso.scale.set(1.0, 1.3, 1.8);
    phoenixMainBody.add(pTorso);

    // Ức phượng dát lông vàng óng
    const pBreast = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 12), phoenixGoldMat);
    pBreast.scale.set(0.95, 1.2, 1.2);
    pBreast.position.set(0, -0.2, 0.8);
    phoenixMainBody.add(pBreast);

    // Cổ phượng vươn cao
    const pNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.9, 2.2, 12), phoenixBodyMat);
    pNeck.rotation.x = 0.45;
    pNeck.position.set(0, 1.2, 1.4);
    phoenixMainBody.add(pNeck);

    // Đầu phượng vương giả
    const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.85, 14, 12), phoenixBodyMat);
    pHead.position.set(0, 2.1, 2.2);
    phoenixMainBody.add(pHead);

    // Mắt phượng ngọc bích tinh anh
    for (let e = -1; e <= 1; e += 2) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), phoenixEyeMat);
      eye.position.set(e * 0.65, 2.3, 2.5);
      phoenixMainBody.add(eye);
    }

    // Mỏ chim vàng nhọn sắc
    const pBeak = new THREE.Mesh(new THREE.ConeGeometry(0.35, 1.4, 8), phoenixGoldMat);
    pBeak.rotation.x = Math.PI / 2 + 0.1;
    pBeak.position.set(0, 2.0, 3.2);
    phoenixMainBody.add(pBeak);

    // Mào lông phượng rực lửa
    for (let c = 0; c < 4; c++) {
      const crest = new THREE.Mesh(new THREE.ConeGeometry(0.22, 1.6, 5), phoenixGoldMat);
      crest.rotation.x = -0.9 + c * 0.15;
      crest.position.set(0, 2.8 + c * 0.2, 1.8 - c * 0.35);
      phoenixMainBody.add(crest);
    }

    const phoenixFireLight = new THREE.PointLight(0xFF4500, 3.8, 28);
    phoenixFireLight.position.set(0, 1.5, 1.5);
    phoenixMainBody.add(phoenixFireLight);

    // B. ĐÔI CÁNH ĐẠI BÀNG XẾP TẦNG 3D VỖ CÁNH THẬT
    const leftWing = new THREE.Group();
    const rightWing = new THREE.Group();
    leftWing.position.set(-1.4, 0.6, 0.2);
    rightWing.position.set(1.4, 0.6, 0.2);
    phoenixMainBody.add(leftWing);
    phoenixMainBody.add(rightWing);

    function createTieredWingFeathers(side) {
      const wingGroup = new THREE.Group();
      // Tầng 1: Lớp lông vai đỏ cam
      const upperFeather = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.2), phoenixBodyMat);
      upperFeather.position.set(side * 1.8, 0, 0);
      upperFeather.rotation.y = side * 0.2;
      wingGroup.add(upperFeather);

      // Tầng 2: Lớp lông trung tâm trắng ngà xếp lớp
      const midFeather = new THREE.Mesh(new THREE.PlaneGeometry(4.8, 2.8), phoenixWhiteWingMat);
      midFeather.position.set(side * 3.2, 0.4, -0.4);
      midFeather.rotation.y = side * 0.3;
      wingGroup.add(midFeather);

      // Tầng 3: Chóp lông cánh đen tuyền dài nhọn vươn xa
      for (let k = 0; k < 6; k++) {
        const primaryQuill = new THREE.Mesh(new THREE.ConeGeometry(0.35, 4.2 + k * 0.5, 4), phoenixBlackTipMat);
        primaryQuill.position.set(side * (4.5 + k * 0.8), 0.8 + k * 0.2, -1.0 - k * 0.35);
        primaryQuill.rotation.z = side * (Math.PI / 2 + 0.2 - k * 0.08);
        wingGroup.add(primaryQuill);
      }
      return wingGroup;
    }
    leftWing.add(createTieredWingFeathers(-1));
    rightWing.add(createTieredWingFeathers(1));

    // C. CHÙM ĐUÔI MẮT CÔNG 3D UỐN LƯỢN TUYỆT MỸ (5 PLUMES WITH PEACOCK EYES)
    const phoenixTailGroup = new THREE.Group();
    phoenixTailGroup.position.set(0, -0.6, -1.8);
    phoenixMainBody.add(phoenixTailGroup);

    const tailPlumes = [];
    for (let p = -2; p <= 2; p++) {
      const plumeGroup = new THREE.Group();
      const plumeLen = 9.0 + Math.abs(p) * 1.2;

      // Dải lụa lông đuôi đỏ cam
      const plumeRibbon = new THREE.Mesh(
        new THREE.PlaneGeometry(0.7, plumeLen, 4, 16),
        phoenixBodyMat
      );
      plumeRibbon.position.set(p * 0.75, -plumeLen / 2, -Math.abs(p) * 0.3);
      plumeRibbon.rotation.x = 0.55;
      plumeGroup.add(plumeRibbon);

      // Mắt công lộng lẫy ở chóp đuôi (Golden Ring + Blue Core)
      const eyeRing = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.2, 8, 16), phoenixGoldMat);
      eyeRing.position.set(p * 0.75, -plumeLen + 0.8, -Math.abs(p) * 0.3);
      eyeRing.rotation.x = 0.55;
      plumeGroup.add(eyeRing);

      const eyeCore = new THREE.Mesh(new THREE.CircleGeometry(0.48, 16), peacockEyeBlueMat);
      eyeCore.position.set(p * 0.75, -plumeLen + 0.8, -Math.abs(p) * 0.3 + 0.02);
      eyeCore.rotation.x = 0.55;
      plumeGroup.add(eyeCore);

      phoenixTailGroup.add(plumeGroup);
      tailPlumes.push(plumeGroup);
    }

    // Tỉ lệ toàn thân Phượng Hoàng đồ sộ
    phoenixGroup.scale.set(1.15, 1.15, 1.15);

    // Dải tàn tro lửa hoàng kim
    const phoenixSparkCount = 90;
    const phoenixSparkGeo = new THREE.BufferGeometry();
    const phoenixSparkPos = new Float32Array(phoenixSparkCount * 3);
    for (let p = 0; p < phoenixSparkCount * 3; p += 3) {
      phoenixSparkPos[p] = (Math.random() - 0.5) * 8;
      phoenixSparkPos[p + 1] = (Math.random() - 0.5) * 8;
      phoenixSparkPos[p + 2] = (Math.random() - 0.5) * 8;
    }
    phoenixSparkGeo.setAttribute('position', new THREE.BufferAttribute(phoenixSparkPos, 3));
    const phoenixSparkPoints = new THREE.Points(
      phoenixSparkGeo,
      new THREE.PointsMaterial({
        size: 0.32,
        color: 0xFFB800,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
      })
    );
    phoenixGroup.add(phoenixSparkPoints);

    // Đôi Hạc Tiên Cố Đô (Stork.glb)
    const storksGroup = new THREE.Group();
    scene.add(storksGroup);
    const storkMeshes = [];
    const storkUrls = ['./models/birds/Stork.glb', 'https://threejs.org/examples/models/gltf/Stork.glb'];
    let modelsLoadedCount = 0;
    const totalModelsToLoad = 2;

    function updateLoadingProgress(step) {
      modelsLoadedCount += step;
      const pct = Math.min(Math.round((modelsLoadedCount / totalModelsToLoad) * 100), 100);
      const bar = document.getElementById('intro-progress-bar');
      const text = document.getElementById('intro-progress-text');
      if (bar) bar.style.width = pct + '%';
      if (text) text.innerText = \`Đang triệu hồi Long Phụng 3D: \${pct}%\`;

      if (modelsLoadedCount >= totalModelsToLoad) {
        setTimeout(triggerExplosiveRoyalIntro, 350);
      }
    }

    const gltfLoader = new THREE.GLTFLoader();
    function loadStorkModel(idx = 0) {
      if (idx >= storkUrls.length) { updateLoadingProgress(1); return; }
      gltfLoader.load(storkUrls[idx], (gltf) => {
        for (let s = 0; s < 2; s++) {
          const storkMesh = gltf.scene.children[0].clone();
          storkMesh.material = new THREE.MeshStandardMaterial({
            color: 0xF8F9FA,
            emissive: 0xD4AF37,
            emissiveIntensity: 0.35,
            metalness: 0.75,
            roughness: 0.2,
            morphTargets: true
          });
          storkMesh.scale.set(0.024, 0.024, 0.024);
          storksGroup.add(storkMesh);
          storkMeshes.push(storkMesh);

          const mixer = new THREE.AnimationMixer(storkMesh);
          mixer.clipAction(gltf.animations[0]).setDuration(1.6 + s * 0.3).play();
          mixers.push(mixer);
        }
        updateLoadingProgress(1);
      }, undefined, () => loadStorkModel(idx + 1));
    }
    loadStorkModel();

    // Chim Loan Ngũ Sắc Cung Đình (Parrot.glb)
    let parrotMesh = null;
    const parrotGroup = new THREE.Group();
    heroRightGroup.add(parrotGroup);
    const parrotUrls = ['./models/birds/Parrot.glb', 'https://threejs.org/examples/models/gltf/Parrot.glb'];
    function loadParrotModel(idx = 0) {
      if (idx >= parrotUrls.length) { updateLoadingProgress(1); return; }
      gltfLoader.load(parrotUrls[idx], (gltf) => {
        parrotMesh = gltf.scene.children[0];
        parrotMesh.material = new THREE.MeshStandardMaterial({
          color: 0xDC2626,
          emissive: 0x2A9D8F,
          emissiveIntensity: 0.45,
          metalness: 0.65,
          roughness: 0.25,
          morphTargets: true
        });
        parrotMesh.scale.set(0.035, 0.035, 0.035);
        parrotGroup.add(parrotMesh);

        const mixer = new THREE.AnimationMixer(parrotMesh);
        mixer.clipAction(gltf.animations[0]).setDuration(1.3).play();
        mixers.push(mixer);

        updateLoadingProgress(1);
      }, undefined, () => loadParrotModel(idx + 1));
    }
    loadParrotModel();

    // Dải bụi vàng kim thiên hà
    const sparkPoints = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(150 * 3).map(() => (Math.random() - 0.5) * 14), 3)),
      new THREE.PointsMaterial({ size: 0.24, color: 0xFFD700, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })
    );
    heroRightGroup.add(sparkPoints);

`;

const sIdx = content.indexOf(sectionEStart);
const eIdx = content.indexOf(sectionEEnd);

if (sIdx !== -1 && eIdx !== -1) {
  content = content.substring(0, sIdx) + real3DModelsCode + content.substring(eIdx);
  console.log('Successfully installed 100% Real 3D Sculpted Dragon & Phoenix!');
} else {
  console.error('Section E markers not found!', sIdx, eIdx);
}

// 2. Update animate() loop for Dragon body undulation and Phoenix wing flapping
const animateStart = '// 1. THANH LONG (JADE DRAGON): BAY TỪ XA VÀO';
const animateEnd = '// Đôi Hạc Tiên Cung Đình';

const newAnimateReal3D = `// ========================================================================
      // 1. THANH LONG (JADE DRAGON): 100% REAL 3D SERPENTINE COILING IN 3D SKY
      // ========================================================================
      let dHeadPos = new THREE.Vector3();
      let dHeadNext = new THREE.Vector3();

      if (!isFlyInCompleted) {
        flyInTime += delta * 0.42;
        const fProg = Math.min(flyInTime, 1.0);
        const zPos = -95 + fProg * 110;
        const yPos = 24 - fProg * 14 + Math.sin(time * 3.2) * 1.6;
        const xPos = -28 + fProg * 38 + Math.cos(time * 2.5) * 2.2;
        dHeadPos.set(xPos, yPos, zPos);
        dHeadNext.set(xPos + 0.8, yPos - 0.3, zPos + 2.5);
      } else {
        const dT = (time * 0.065) % 1;
        dHeadPos = dragonSkyPath.getPointAt(dT);
        dHeadNext = dragonSkyPath.getPointAt((dT + 0.01) % 1);
        dHeadPos.y += Math.sin(time * 2.2) * 1.5;
        dHeadPos.x += Math.cos(time * 1.8) * 1.2;
      }

      dragonHead.position.copy(dHeadPos);
      dragonHead.lookAt(dHeadNext);

      // Lưu vết đường bay cho 48 đốt thân rồng
      dragonHistory.unshift(dHeadPos.clone());
      if (dragonHistory.length > dragonHistoryLength) dragonHistory.pop();

      const spacing = 8;
      for (let s = 0; s < segmentCount; s++) {
        const histIndex = Math.min((s + 1) * spacing, dragonHistory.length - 1);
        dragonSegments[s].position.copy(dragonHistory[histIndex]);

        const prevIndex = Math.max(histIndex - spacing, 0);
        dragonSegments[s].lookAt(dragonHistory[prevIndex]);
        dragonSegments[s].rotation.z += Math.sin(time * 4.0 + s * 0.3) * 0.15;
      }

      // ========================================================================
      // 2. HỎA PHƯỢNG (FIRE PHOENIX): 100% REAL 3D WINGS FLAPPING & PEACOCK TAIL SWAY
      // ========================================================================
      let pPos = new THREE.Vector3();
      let pNext = new THREE.Vector3();

      if (!isFlyInCompleted) {
        const fProg = Math.min(flyInTime, 1.0);
        const pZ = -90 + fProg * 106;
        const pY = 26 - fProg * 16 + Math.cos(time * 3.0) * 1.4;
        const pX = 28 - fProg * 34 + Math.sin(time * 2.4) * 2.0;
        pPos.set(pX, pY, pZ);
        pNext.set(pX - 0.8, pY - 0.3, pZ + 2.5);
      } else {
        const pT = (time * 0.075 + 0.38) % 1;
        pPos = phoenixSkyPath.getPointAt(pT);
        pNext = phoenixSkyPath.getPointAt((pT + 0.01) % 1);
        pPos.y += Math.cos(time * 2.4) * 1.4;
      }

      phoenixGroup.position.copy(pPos);
      phoenixGroup.lookAt(pNext);

      // Đôi cánh đại bàng 3D vỗ cánh mạnh mẽ (Flapping animation)
      const wingFlap = Math.sin(time * 5.0) * 0.38;
      leftWing.rotation.z = -wingFlap;
      rightWing.rotation.z = wingFlap;
      leftWing.rotation.y = -Math.cos(time * 5.0) * 0.2;
      rightWing.rotation.y = Math.cos(time * 5.0) * 0.2;

      // Chùm đuôi mắt công 3D đung đưa lượn sóng
      tailPlumes.forEach((plume, pIdx) => {
        plume.rotation.x = Math.sin(time * 3.2 + pIdx * 0.4) * 0.18;
        plume.rotation.z = Math.cos(time * 2.8 + pIdx * 0.3) * 0.12;
      });

      phoenixSparkPoints.rotation.y = time * 0.4;

      `;

const aStart = content.indexOf(animateStart);
const aEnd = content.indexOf(animateEnd);

if (aStart !== -1 && aEnd !== -1) {
  content = content.substring(0, aStart) + newAnimateReal3D + content.substring(aEnd);
  console.log('Successfully updated animate() loop for real 3D Dragon & Phoenix!');
} else {
  console.error('Animate flight markers not found!', aStart, aEnd);
}

// Convert back to CRLF
content = content.replace(/\n/g, '\r\n');
fs.writeFileSync(path, content, 'utf8');
fs.writeFileSync('backend/public/portal/landing.html', content, 'utf8');
console.log('Finished updating files with 100% Real 3D Sculpted Dragon and Phoenix!');
