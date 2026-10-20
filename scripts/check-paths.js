const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') results = results.concat(walk(full));
    } else if (/\.(html|js|json)$/.test(file)) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('web-hue4u/public');
const absMatches = [];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/['"]\/(img|js|css|data|app)\//.test(line)) {
      absMatches.push({ file: f, line: idx + 1, text: line.trim() });
    }
  });
});
console.log('Total matches:', absMatches.length);
absMatches.slice(0, 40).forEach(m => console.log(`${m.file}:${m.line} -> ${m.text}`));
