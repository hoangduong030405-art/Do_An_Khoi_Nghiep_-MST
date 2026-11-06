const fs = require('fs');

const path = 'web-hue4u/public/landing.html';
let content = fs.readFileSync(path, 'utf8');

// Normalize line endings to \n
content = content.replace(/\r\n/g, '\n');

// 1. Dragon Head & Body scaling
const oldHead = `    // Sọ rồng
    const dSkull = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 1.5), dragonScaleMat);
    dragonHead.add(dSkull);

    // Mũi rồng vươn dài
    const dSnout = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.5, 8), dragonScaleMat);
    dSnout.rotation.x = Math.PI / 2;
    dSnout.position.set(0, -0.1, 1.4);
    dragonHead.add(dSnout);

    // Ngọc hỏa châu trong miệng rồng
    const dPearl = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xFFFDF5, emissive: 0xFFD700, emissiveIntensity: 1.5 })
    );
    dPearl.position.set(0, -0.2, 2.0);
    dragonHead.add(dPearl);

    // Ánh mắt rồng phát sáng
    const eyeLight = new THREE.PointLight(0xFFB800, 2.0, 8);
    eyeLight.position.set(0, 0.5, 0.8);
    dragonHead.add(eyeLight);

    // Cặp sừng rồng thời Nguyễn thếp vàng
    for (let h = -1; h <= 1; h += 2) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.16, 1.8, 8), dragonScaleMat);
      horn.rotation.x = -0.65;
      horn.rotation.z = h * 0.45;
      horn.position.set(h * 0.45, 0.9, -0.2);
      dragonHead.add(horn);

      // Đôi râu rồng uốn lượn
      const whisker = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, 2.2, 6), dragonScaleMat);
      whisker.rotation.x = 0.5;
      whisker.rotation.z = h * 0.7;
      whisker.position.set(h * 0.6, -0.2, 1.6);
      dragonHead.add(whisker);
    }

    // Bờm lửa rồng
    for (let m = 0; m < 5; m++) {
      const mane = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.0, 5), dragonFinMat);
      mane.rotation.x = -1.1;
      mane.position.set(0, 0.6 + m * 0.15, -0.3 - m * 0.2);
      dragonHead.add(mane);
    }`;

const newHead = `    // Sọ rồng to lớn đồ sộ
    const dSkull = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 3.2), dragonScaleMat);
    dragonHead.add(dSkull);

    // Mũi rồng vươn dài dũng mãnh
    const dSnout = new THREE.Mesh(new THREE.ConeGeometry(1.3, 3.2, 8), dragonScaleMat);
    dSnout.rotation.x = Math.PI / 2;
    dSnout.position.set(0, -0.2, 2.8);
    dragonHead.add(dSnout);

    // Ngọc hỏa châu lớn phát sáng rực rỡ trong miệng rồng
    const dPearl = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xFFFDF5, emissive: 0xFFD700, emissiveIntensity: 2.2 })
    );
    dPearl.position.set(0, -0.3, 4.0);
    dragonHead.add(dPearl);

    // Ánh mắt rồng phát sáng thần uy
    const eyeLight = new THREE.PointLight(0xFFB800, 3.5, 25);
    eyeLight.position.set(0, 1.0, 1.5);
    dragonHead.add(eyeLight);

    // Cặp sừng rồng thời Nguyễn thếp vàng đồ sộ vươn cao
    for (let h = -1; h <= 1; h += 2) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.32, 3.6, 8), dragonScaleMat);
      horn.rotation.x = -0.65;
      horn.rotation.z = h * 0.45;
      horn.position.set(h * 0.9, 1.8, -0.4);
      dragonHead.add(horn);

      // Nhánh sừng phụ
      const subHorn = new THREE.Mesh(new THREE.ConeGeometry(0.18, 1.8, 6), dragonScaleMat);
      subHorn.rotation.x = -0.3;
      subHorn.rotation.z = h * 0.8;
      subHorn.position.set(h * 1.3, 2.4, -0.6);
      dragonHead.add(subHorn);

      // Đôi râu rồng uốn lượn dài bồng bềnh
      const whisker = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.03, 4.8, 8), dragonScaleMat);
      whisker.rotation.x = 0.55;
      whisker.rotation.z = h * 0.75;
      whisker.position.set(h * 1.2, -0.4, 3.2);
      dragonHead.add(whisker);
    }

    // Bờm lửa rồng cuồn cuộn
    for (let m = 0; m < 6; m++) {
      const mane = new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.0, 5), dragonFinMat);
      mane.rotation.x = -1.15;
      mane.position.set(0, 1.2 + m * 0.28, -0.6 - m * 0.4);
      dragonHead.add(mane);
    }`;

// 2. Body segments
const oldBody = `    // 2. 45 ĐỐT THÂN RỒNG UỐN LƯỢN (Articulated Spine Chain)
    const dragonSegments = [];
    const segmentCount = 42;
    const bodyFinGeo = new THREE.ConeGeometry(0.22, 0.7, 4);
    bodyFinGeo.scale(0.3, 1, 1);

    for (let s = 0; s < segmentCount; s++) {
      const segGroup = new THREE.Group();
      // Bán kính thân vuốt thon dần về phía đuôi
      const radius = Math.max(0.68 * (1 - s / segmentCount * 0.75), 0.12);
      const segMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 10), dragonScaleMat);
      segGroup.add(segMesh);

      // Vây lưng phát sáng
      const dorsalFin = new THREE.Mesh(bodyFinGeo, dragonFinMat);
      dorsalFin.position.y = radius * 1.1;
      dorsalFin.rotation.x = -0.4;
      segGroup.add(dorsalFin);

      // 4 Chân rồng thếp vàng (Tứ trảo hoàng gia)
      if (s === 9 || s === 13 || s === 24 || s === 28) {
        for (let side = -1; side <= 1; side += 2) {
          const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 1.2, 6), dragonScaleMat);
          leg.position.set(side * (radius + 0.5), -0.4, 0);
          leg.rotation.z = side * 0.8;
          segGroup.add(leg);
        }
      }

      dragonEntityGroup.add(segGroup);
      dragonSegments.push(segGroup);
    }

    // Đuôi rồng xòe lửa
    const tailFan = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.6, 5), dragonFinMat);
    tailFan.rotation.x = -Math.PI / 2;
    tailFan.position.z = -0.8;
    dragonSegments[segmentCount - 1].add(tailFan);

    // Buffer lưu vết đường bay của Rồng (History Position Buffer)
    const dragonHistoryLength = 450;
    const dragonHistory = [];
    for (let h = 0; h < dragonHistoryLength; h++) {
      dragonHistory.push(new THREE.Vector3(0, 5, -80));
    }`;

const newBody = `    // 2. 48 ĐỐT THÂN RỒNG ĐỒ SỘ UỐN LƯỢN (Articulated Colossal Spine Chain)
    const dragonSegments = [];
    const segmentCount = 48;
    const bodyFinGeo = new THREE.ConeGeometry(0.48, 1.6, 4);
    bodyFinGeo.scale(0.3, 1, 1);

    for (let s = 0; s < segmentCount; s++) {
      const segGroup = new THREE.Group();
      const prog = s / segmentCount;
      const radius = Math.max(1.65 * (1 - Math.pow(prog, 1.4) * 0.78), 0.35);
      const segMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 14, 12), dragonScaleMat);
      segGroup.add(segMesh);

      // Vây lưng phát sáng
      const dorsalFin = new THREE.Mesh(bodyFinGeo, dragonFinMat);
      dorsalFin.position.y = radius * 1.15;
      dorsalFin.rotation.x = -0.45;
      segGroup.add(dorsalFin);

      // 4 Chân rồng thếp vàng đồ sộ (Tứ trảo hoàng gia)
      if (s === 10 || s === 15 || s === 27 || s === 33) {
        for (let side = -1; side <= 1; side += 2) {
          const legGroup = new THREE.Group();
          legGroup.position.set(side * (radius + 0.4), -0.6, 0);
          legGroup.rotation.z = side * 0.85;

          const upperLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 2.2, 8), dragonScaleMat);
          legGroup.add(upperLeg);

          for (let c = -1; c <= 2; c++) {
            const claw = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.8, 6), dragonScaleMat);
            claw.position.set(c * 0.18, -1.2, 0.3);
            claw.rotation.x = 0.6;
            legGroup.add(claw);
          }
          segGroup.add(legGroup);
        }
      }

      dragonEntityGroup.add(segGroup);
      dragonSegments.push(segGroup);
    }

    // Đuôi rồng xòe lửa đồ sộ
    const tailFan = new THREE.Mesh(new THREE.ConeGeometry(0.9, 3.4, 6), dragonFinMat);
    tailFan.rotation.x = -Math.PI / 2;
    tailFan.position.z = -1.6;
    dragonSegments[segmentCount - 1].add(tailFan);

    // Buffer lưu vết đường bay dài của Rồng (History Position Buffer)
    const dragonHistoryLength = 600;
    const dragonHistory = [];
    for (let h = 0; h < dragonHistoryLength; h++) {
      dragonHistory.push(new THREE.Vector3(0, 8, -90));
    }`;

// 3. Phoenix feathers & scale
const oldPhoenixFeathers = `    for (let f = -1; f <= 1; f++) {
      const feather = new THREE.Mesh(
        new THREE.PlaneGeometry(0.3, 3.5),
        new THREE.MeshStandardMaterial({
          color: 0xFFD700,
          emissive: 0xFF4500,
          emissiveIntensity: 0.8,
          side: THREE.DoubleSide
        })
      );
      feather.position.set(f * 0.25, -0.4, -2.0);
      feather.rotation.x = 0.5;
      feather.rotation.y = f * 0.2;
      phoenixTailGroup.add(feather);
    }`;

const newPhoenixFeathers = `    for (let f = -1; f <= 1; f++) {
      const feather = new THREE.Mesh(
        new THREE.PlaneGeometry(0.9, 9.0),
        new THREE.MeshStandardMaterial({
          color: 0xFFD700,
          emissive: 0xFF4500,
          emissiveIntensity: 0.9,
          side: THREE.DoubleSide
        })
      );
      feather.position.set(f * 0.7, -1.0, -5.2);
      feather.rotation.x = 0.55;
      feather.rotation.y = f * 0.25;
      phoenixTailGroup.add(feather);
    }`;

const oldPScale = `phoenixMesh.scale.set(0.028, 0.028, 0.028);`;
const newPScale = `phoenixMesh.scale.set(0.082, 0.082, 0.082);`;

// 4. Sweeping paths
const oldPaths = `    // Quỹ đạo lượn trời cao của Rồng
    const dragonSkyPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-14, 12, 10),
      new THREE.Vector3(0, 16, -6),
      new THREE.Vector3(14, 10, 8),
      new THREE.Vector3(8, 5, 18),
      new THREE.Vector3(-6, 8, 14)
    ], true);

    // Quỹ đạo của Phượng Hoàng
    const phoenixSkyPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(12, 9, 8),
      new THREE.Vector3(4, 14, 16),
      new THREE.Vector3(-12, 11, 4),
      new THREE.Vector3(-4, 6, -10),
      new THREE.Vector3(8, 12, -4)
    ], true);`;

const newPaths = `    // Quỹ đạo lượn trời cao đồ sộ của Rồng quanh trung tâm màn hình
    const dragonSkyPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-14, 9, 14),     // Lượn sà qua phía trước bên trái
      new THREE.Vector3(4, 15, 16),      // Bay vút cao phía trước màn hình
      new THREE.Vector3(18, 8, 4),       // Lượn qua bên phải điện thoại
      new THREE.Vector3(10, -2, -10),    // Luồn ra phía sau bệ đài sen
      new THREE.Vector3(-8, 3, -12),     // Lượn qua phía sau bên trái
      new THREE.Vector3(-16, 6, 2)       // Vòng lại phía trước
    ], true);

    // Quỹ đạo của Phượng Hoàng sải cánh song phi
    const phoenixSkyPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(14, 14, 10),     // Bay vút cao bên phải
      new THREE.Vector3(0, 7, 14),       // Sà xuống phía trước
      new THREE.Vector3(-14, 12, 6),     // Lượn qua bên trái
      new THREE.Vector3(-6, 16, -8),     // Bay lên tầng mây phía sau
      new THREE.Vector3(12, 8, -6)       // Vòng lại bên phải
    ], true);`;

const oldSpacing = `const spacing = 7; // Khoảng cách giữa các đốt`;
const newSpacing = `const spacing = 8; // Khoảng cách giữa các đốt thân rồng đồ sộ`;

function doReplace(label, s, r) {
  if (!content.includes(s)) {
    console.error('FAILED to find:', label);
  } else {
    content = content.replace(s, r);
    console.log('SUCCESS:', label);
  }
}

doReplace('Head', oldHead, newHead);
doReplace('Body', oldBody, newBody);
doReplace('PhoenixFeathers', oldPhoenixFeathers, newPhoenixFeathers);
doReplace('PhoenixScale', oldPScale, newPScale);
doReplace('Paths', oldPaths, newPaths);
doReplace('Spacing', oldSpacing, newSpacing);

// Write back with CRLF
content = content.replace(/\n/g, '\r\n');
fs.writeFileSync(path, content, 'utf8');
fs.writeFileSync('backend/public/portal/landing.html', content, 'utf8');
console.log('Finished writing updated files!');
