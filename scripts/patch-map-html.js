const fs = require('fs');
let html = fs.readFileSync('web-hue4u/public/map.html', 'utf8');

const target = "document.getElementById('drawer-details-link').href = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;";
const replacement = `const dirUrl = window.HuegoLocationService ? window.HuegoLocationService.constructor.getDirectionsUrl(place.lat, place.lng, place.name) : \`https://www.google.com/maps/dir/?api=1&destination=\${place.lat},\${place.lng}\`;
      const dirLink = document.getElementById('drawer-details-link');
      if (dirLink) {
        dirLink.href = dirUrl;
        dirLink.innerText = '🧭 Chỉ đường (Apple / Google Maps) →';
      }
      if (window.huegoLocationUI) {
        window.huegoLocationUI.showPlaceGeofence(place.lat, place.lng, place.name);
      }
      if (window.HuegoLocationService && window.HuegoLocationService.lastPosition) {
        const pos = window.HuegoLocationService.lastPosition;
        const d = window.HuegoLocationService.constructor.calculateDistanceMeters(pos.lat, pos.lng, place.lat, place.lng);
        const dText = window.HuegoLocationService.constructor.formatDistance(d);
        let distPill = document.getElementById('drawer-distance');
        if (!distPill) {
          distPill = document.createElement('span');
          distPill.className = 'meta-pill';
          distPill.id = 'drawer-distance';
          distPill.style.fontWeight = '800';
          distPill.style.color = '#2563EB';
          document.querySelector('.drawer-meta-pills')?.prepend(distPill);
        }
        distPill.innerText = \`📍 Cách bạn: \${dText}\`;
      }`;

if (html.includes(target)) {
  html = html.replace(target, replacement);
  fs.writeFileSync('web-hue4u/public/map.html', html, 'utf8');
  console.log('SUCCESS: Patched map.html');
} else {
  console.log('FAILED: Target not found');
}
