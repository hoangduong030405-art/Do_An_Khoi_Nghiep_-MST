const fs = require('fs');

const path = 'web-hue4u/public/landing.html';
let content = fs.readFileSync(path, 'utf8');

// Replace dragon & phoenix 3D creation section with the High-Definition Master Artwork PBR 3D Entities
const oldDragonSectionStart = '    /* ==========================================================================\n       E. RỒNG THỜI NGUYỄN 3D';
const oldDragonSectionEnd = '    /* ==========================================================================\n       G. ĐƯỜNG BAY 3D: RỒNG VÀ PHƯỢNG HOÀNG';

// Normalize \r\n
content = content.replace(/\r\n/g, '\n');

const newMasterSection = `    /* ==========================================================================
       E. THANH LONG & HỎA PHƯỢNG HOÀNG GIA 3D ĐỒ SỘ (HIGH-DEFINITION MASTER PBR ENTITIES)
       Chi tiết tinh xảo y hệt tranh lụa Cung Đình: Thanh Long ngọc bích & Hỏa Phượng mắt công
       ========================================================================== */
    const textureLoader = new THREE.TextureLoader();

    // 1. THANH LONG (JADE IMPERIAL DRAGON - 15m ĐỒ SỘ)
    const dragonEntityGroup = new THREE.Group();
    scene.add(dragonEntityGroup);

    const dragonTex = textureLoader.load('./images/thanh_long_dragon.png');
    dragonTex.generateMipmaps = true;
    dragonTex.minFilter = THREE.LinearMipmapLinearFilter;

    const dragonMat = new THREE.MeshStandardMaterial({
      map: dragonTex,
      transparent: true,
      alphaTest: 0.08,
      side: THREE.DoubleSide,
      roughness: 0.22,
      metalness: 0.55,
      emissive: 0x1B4D3E,
      emissiveIntensity: 0.38
    });

    // Thân rồng Thanh Long đồ sộ
    const dragonMesh = new THREE.Mesh(new THREE.PlaneGeometry(16.5, 16.5, 8, 8), dragonMat);
    dragonEntityGroup.add(dragonMesh);

    // Hào quang ngọc bích phát sáng từ rồng
    const dragonAuraLight = new THREE.PointLight(0x2A9D8F, 3.5, 25);
    dragonEntityGroup.add(dragonAuraLight);

    // Dải hạt tinh hoa ngọc bích & vàng kim bay theo rồng
    const dragonSparkCount = 90;
    const dragonSparkGeo = new THREE.BufferGeometry();
    const dragonSparkPos = new Float32Array(dragonSparkCount * 3);
    for (let p = 0; p < dragonSparkCount * 3; p += 3) {
      dragonSparkPos[p] = (Math.random() - 0.5) * 8;
      dragonSparkPos[p + 1] = (Math.random() - 0.5) * 8;
      dragonSparkPos[p + 2] = (Math.random() - 0.5) * 8;
    }
    dragonSparkGeo.setAttribute('position', new THREE.BufferAttribute(dragonSparkPos, 3));
    const dragonSparkPoints = new THREE.Points(
      dragonSparkGeo,
      new THREE.PointsMaterial({
        size: 0.28,
        color: 0x58B19F,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      })
    );
    dragonEntityGroup.add(dragonSparkPoints);

    // 2. HỎA PHƯỢNG HOÀNG KIM (VERMILION FIRE PHOENIX - 15m ĐỒ SỘ)
    const phoenixGroup = new THREE.Group();
    scene.add(phoenixGroup);

    const phoenixTex = textureLoader.load('./images/hoa_phuong_phoenix.png');
    phoenixTex.generateMipmaps = true;
    phoenixTex.minFilter = THREE.LinearMipmapLinearFilter;

    const phoenixMat = new THREE.MeshStandardMaterial({
      map: phoenixTex,
      transparent: true,
      alphaTest: 0.08,
      side: THREE.DoubleSide,
      roughness: 0.18,
      metalness: 0.65,
      emissive: 0xDC2626,
      emissiveIntensity: 0.45
    });

    // Cánh phượng và đuôi mắt công đồ sộ
    const phoenixMesh = new THREE.Mesh(new THREE.PlaneGeometry(16.0, 16.0, 8, 8), phoenixMat);
    phoenixGroup.add(phoenixMesh);

    // Hào quang lửa hỏa phượng phát sáng
    const phoenixFireLight = new THREE.PointLight(0xFF4500, 3.8, 28);
    phoenixGroup.add(phoenixFireLight);

    // Dải tàn tro lửa hoàng kim lấp lánh theo cánh phượng
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

// Perform replacement between section markers
const startIdx = content.indexOf(oldDragonSectionStart);
const endIdx = content.indexOf(oldDragonSectionEnd);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + newMasterSection + content.substring(endIdx);
  console.log('Successfully replaced 3D Dragon & Phoenix with Master Artwork Entities!');
} else {
  console.error('Could not find section markers!', startIdx, endIdx);
}

// Now update animate() loop for Dragon and Phoenix dynamic flying and wing flapping
const oldAnimateDragonStart = '// 1. RỒNG THỜI NGUYỄN: BAY TỪ XA VÀO';
const oldAnimatePhoenixEnd = '// Đôi Hạc Tiên Cung Đình';

const newAnimateFlight = `// ========================================================================
      // 1. THANH LONG (JADE DRAGON): BAY TỪ XA VÀO & UỐN LƯỢN ĐỒ SỘ QUANH TRUNG TÂM
      // ========================================================================
      let dHeadPos = new THREE.Vector3();
      let dHeadNext = new THREE.Vector3();

      if (!isFlyInCompleted) {
        // Giai đoạn Khai môn: Rồng lao từ cự ly sâu thẳm (z: -95) xuyên qua cổng vào tiền cảnh
        flyInTime += delta * 0.42;
        const fProg = Math.min(flyInTime, 1.0);
        const zPos = -95 + fProg * 110; // Từ z = -95 đến z = +15
        const yPos = 24 - fProg * 14 + Math.sin(time * 3.2) * 1.6;
        const xPos = -28 + fProg * 38 + Math.cos(time * 2.5) * 2.2;
        dHeadPos.set(xPos, yPos, zPos);
        dHeadNext.set(xPos + 0.8, yPos - 0.3, zPos + 2.5);
      } else {
        // Giai đoạn bay lượn bao quát 360 độ quanh Smartphone và đài sen
        const dT = (time * 0.065) % 1;
        dHeadPos = dragonSkyPath.getPointAt(dT);
        dHeadNext = dragonSkyPath.getPointAt((dT + 0.01) % 1);
        dHeadPos.y += Math.sin(time * 2.2) * 1.5;
        dHeadPos.x += Math.cos(time * 1.8) * 1.2;
      }

      dragonEntityGroup.position.copy(dHeadPos);
      dragonEntityGroup.lookAt(dHeadNext);

      // Chuyển động uốn lượn nhịp nhàng sóng sin của thân rồng
      dragonMesh.rotation.z = Math.sin(time * 2.8) * 0.16;
      dragonMesh.rotation.y = Math.cos(time * 2.2) * 0.14;
      dragonSparkPoints.rotation.z = time * 0.3;

      // ========================================================================
      // 2. HỎA PHƯỢNG HOÀNG KIM: SẢI CÁNH VỖ NHỊP 3D & SONG PHI ĐỐI MẶT RỒNG
      // ========================================================================
      let pPos = new THREE.Vector3();
      let pNext = new THREE.Vector3();

      if (!isFlyInCompleted) {
        // Phượng hoàng xuất phát từ xa đối xứng (x: +28, z: -90)
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

      // Cánh phượng vỗ nhịp và đuôi mắt công uốn lượn mềm mại theo gió
      phoenixMesh.rotation.z = Math.sin(time * 3.6) * 0.18;
      phoenixMesh.rotation.x = Math.cos(time * 2.8) * 0.12;
      phoenixSparkPoints.rotation.y = time * 0.4;

      `;

const aStart = content.indexOf(oldAnimateDragonStart);
const aEnd = content.indexOf(oldAnimatePhoenixEnd);

if (aStart !== -1 && aEnd !== -1) {
  content = content.substring(0, aStart) + newAnimateFlight + content.substring(aEnd);
  console.log('Successfully updated animate() loop for master Dragon and Phoenix flight!');
} else {
  console.error('Could not find animate flight markers!', aStart, aEnd);
}

// Convert back to CRLF
content = content.replace(/\n/g, '\r\n');
fs.writeFileSync(path, content, 'utf8');
fs.writeFileSync('backend/public/portal/landing.html', content, 'utf8');
console.log('Finished updating landing.html files!');
