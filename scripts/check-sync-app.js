const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const fileA = path.resolve(__dirname, '..', 'web-hue4u', 'public', 'app', 'index.html');
const fileB = path.resolve(__dirname, '..', 'backend', 'public', 'portal', 'app', 'index.html');

function getHash(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File không tồn tại: ${filePath}`);
  }
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

const hashA = getHash(fileA);
const hashB = getHash(fileB);

console.log('[check-sync-app] Hash web-hue4u/public/app/index.html:     ', hashA);
console.log('[check-sync-app] Hash backend/public/portal/app/index.html:', hashB);

if (hashA !== hashB) {
  console.error('[check-sync-app] LỖI: Hai file app/index.html bị lệch hash!');
  console.error('Vui lòng đồng bộ web-hue4u/public/app/index.html sang backend/public/portal/app/index.html');
  process.exit(1);
}

console.log('[check-sync-app] OK: Hai file app/index.html đồng nhất tuyệt đối.');
process.exit(0);
