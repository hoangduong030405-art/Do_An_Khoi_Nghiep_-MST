const fs = require('fs');

// 1. web-hue4u/public/index.html
let indexHtml = fs.readFileSync('web-hue4u/public/index.html', 'utf8');
indexHtml = indexHtml
  .replace('href="/map.html"', 'href="./map.html"')
  .replace('href="/museum.html"', 'href="./museum.html"')
  .replace('href="/hue.html"', 'href="./hue.html"')
  .replace('href="/simulator.html"', 'href="./simulator.html"');
fs.writeFileSync('web-hue4u/public/index.html', indexHtml, 'utf8');

// 2. web-hue4u/public/render_cert.html
let renderCert = fs.readFileSync('web-hue4u/public/render_cert.html', 'utf8');
renderCert = renderCert.replace('href="/test_certificate.pdf"', 'href="./test_certificate.pdf"');
fs.writeFileSync('web-hue4u/public/render_cert.html', renderCert, 'utf8');

// 3. web-hue4u/public/app/index.html
let appIndex = fs.readFileSync('web-hue4u/public/app/index.html', 'utf8');
appIndex = appIndex.replace('href="/museum.html"', 'href="../museum.html"');
fs.writeFileSync('web-hue4u/public/app/index.html', appIndex, 'utf8');

console.log('Fixed relative paths in public files');
