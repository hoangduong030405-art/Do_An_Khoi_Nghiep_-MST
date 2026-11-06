const fs = require('fs');

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

  // Fix line 1258 in triggerWarpToApp
  const oldWarpTarget = 'tl.to([phoenixGroup.position, storksGroup.position, parrotGroup.position, dragonEntityGroup.position], {';
  const newWarpTarget = 'tl.to([craneGroup.position, flamingoGroup.position, songbirdGroup.position], {';
  if (content.includes(oldWarpTarget)) {
    content = content.replace(oldWarpTarget, newWarpTarget);
    console.log(filePath, 'Updated warp portal targets');
  }

  // Fix lines 1620-1632 in animate()
  const oldAnimateBirds = `      // Chim Loan Ngũ Sắc
      if (parrotGroup) {
        const paT = (time * 0.12) % 1;
        const paX = Math.cos(paT * Math.PI * 2) * 4.2;
        const paZ = Math.sin(paT * Math.PI * 2) * 3.2;
        parrotGroup.position.set(paX, -0.8 + Math.sin(time * 2.0) * 0.5, paZ);
        parrotGroup.rotation.y = -paT * Math.PI * 2 - Math.PI / 2;
      }

      sparkPoints.rotation.y = time * 0.08;`;

  const newAnimateBirds = `      // ========================================================================
      // 3. ĐÔI CHIM LOAN NGŨ SẮC (LƯỢN QUANH BỆ SEN & SMARTPHONE)
      // ========================================================================
      songbirdMeshes.forEach((sb, sIdx) => {
        const sT = (time * 0.16 + sIdx * 0.5) % 1;
        const sAngle = sT * Math.PI * 2;
        const sRadius = 4.0 + Math.sin(time * 2.0 + sIdx) * 0.6;
        sb.position.set(
          Math.cos(sAngle) * sRadius,
          Math.sin(time * 3.0 + sIdx * 2.0) * 1.0 + 1.8,
          Math.sin(sAngle) * sRadius * 0.75
        );
        const nextAngle = sAngle + 0.08;
        sb.lookAt(
          Math.cos(nextAngle) * sRadius,
          sb.position.y,
          Math.sin(nextAngle) * sRadius * 0.75
        );
      });

      // ========================================================================
      // 4. ĐÀN CÁ CHÉP VÀNG HOÀNG CUNG BƠI LỘI DƯỚI SÔNG HƯƠNG
      // ========================================================================
      koiFishes.forEach((fish) => {
        fish.userData.angle += delta * fish.userData.speed * 0.6;
        fish.position.x = fish.userData.baseX + Math.cos(fish.userData.angle) * fish.userData.radius;
        fish.position.z = fish.userData.baseZ + Math.sin(fish.userData.angle) * fish.userData.radius;
        const heading = fish.userData.angle + Math.PI / 2;
        fish.rotation.y = -heading;
        fish.rotation.z = Math.sin(time * 5.0 * fish.userData.speed) * 0.18;
      });`;

  if (content.includes(oldAnimateBirds)) {
    content = content.replace(oldAnimateBirds, newAnimateBirds);
    console.log(filePath, 'Updated animate() bird & koi logic');
  }

  content = content.replace(/\n/g, '\r\n');
  fs.writeFileSync(filePath, content, 'utf8');
}

cleanFile('web-hue4u/public/landing.html');
cleanFile('backend/public/portal/landing.html');
console.log('Done cleaning legacy references in both files!');
