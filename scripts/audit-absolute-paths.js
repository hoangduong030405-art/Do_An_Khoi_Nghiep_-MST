const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) results = results.concat(walk(full));
    else if (file.endsWith('.html') || file.endsWith('.js')) results.push(full);
  });
  return results;
}

const files = walk('web-hue4u/public');
const pattern = /['"](\/(?:app|s|images|img|css|js|data|models|fonts)\/[^'"]*)['"]/g;

const report = {};

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = pattern.exec(content)) !== null) {
    const target = match[1];
    const rel = path.relative('.', f).replace(/\\/g, '/');
    if (!report[rel]) report[rel] = new Set();
    report[rel].add(target);
  }
});

for (const [file, paths] of Object.entries(report)) {
  console.log(`=== ${file} ===`);
  for (const p of paths) {
    console.log(`   ${p}`);
  }
}
