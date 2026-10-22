const fs = require('fs');
const path = require('path');

const inlineCss = `  <link rel="stylesheet" href="./css/style.css?v=20261022_03">
  <style>
    /* CRITICAL MOBILE BOTTOM NAV OVERRIDE (IMMUNE TO BROWSER CSS CACHE) */
    @media (max-width: 992px) {
      .mobile-nav {
        display: flex !important;
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        max-width: 100% !important;
        transform: none !important;
        margin: 0 !important;
        border-radius: 0 !important;
        box-sizing: border-box !important;
        height: calc(58px + env(safe-area-inset-bottom, 0px)) !important;
        padding: 6px 0 calc(6px + env(safe-area-inset-bottom, 0px)) 0 !important;
        z-index: 1000 !important;
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(20px) !important;
        -webkit-backdrop-filter: blur(20px) !important;
        border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
        border-left: none !important;
        border-right: none !important;
        border-bottom: none !important;
        box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08) !important;
        justify-content: space-around !important;
        align-items: center !important;
      }
      .mobile-nav-item {
        flex: 1 1 0 !important;
        max-width: 20% !important;
        min-height: 44px !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 4px 2px !important;
        gap: 2px !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        text-decoration: none !important;
        color: #64748B !important;
        white-space: nowrap !important;
        border-radius: 8px !important;
        box-sizing: border-box !important;
      }
      .mobile-nav-item svg {
        width: 18px !important;
        height: 18px !important;
        min-width: 18px !important;
        flex-shrink: 0 !important;
      }
      .mobile-nav-item.active {
        color: #582C83 !important;
        background: rgba(88, 44, 131, 0.08) !important;
        font-weight: 700 !important;
      }
      .ai-fab-btn, .btn-ai-float, #ai-chat-btn {
        position: fixed !important;
        bottom: calc(72px + env(safe-area-inset-bottom, 10px)) !important;
        right: 16px !important;
        width: 52px !important;
        height: 52px !important;
        min-width: 52px !important;
        min-height: 52px !important;
        font-size: 24px !important;
        z-index: 999 !important;
        box-shadow: 0 6px 20px rgba(88, 44, 131, 0.45) !important;
      }
      .top-bar-actions .btn-open-app {
        display: none !important;
      }
    }
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) .mobile-nav {
        background: rgba(20, 28, 22, 0.95) !important;
        border-top-color: rgba(255, 255, 255, 0.08) !important;
      }
      :root:not([data-theme="light"]) .mobile-nav-item {
        color: #94A3B8 !important;
      }
      :root:not([data-theme="light"]) .mobile-nav-item.active {
        color: #E9D5FF !important;
        background: rgba(88, 44, 131, 0.35) !important;
      }
    }
    [data-theme="dark"] .mobile-nav {
      background: rgba(20, 28, 22, 0.95) !important;
      border-top-color: rgba(255, 255, 255, 0.08) !important;
    }
    [data-theme="dark"] .mobile-nav-item {
      color: #94A3B8 !important;
    }
    [data-theme="dark"] .mobile-nav-item.active {
      color: #E9D5FF !important;
      background: rgba(88, 44, 131, 0.35) !important;
    }
  </style>`;

const htmlFiles = [
  'web-hue4u/public/index.html',
  'web-hue4u/public/map.html',
  'web-hue4u/public/hue.html',
  'web-hue4u/public/museum.html',
  'web-hue4u/public/simulator.html',
  'web-hue4u/public/essentials.html'
];

htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  // First remove any old inline style block if previously inserted
  content = content.replace(/\s*<style>\s*\/\* CRITICAL MOBILE BOTTOM NAV OVERRIDE[\s\S]*?<\/style>/g, '');
  // Replace stylesheet link with new cache-busted link and inline CSS
  content = content.replace(/<link rel="stylesheet" href="\.\/css\/style\.css(?:\?[^"]*)?">/, inlineCss);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Injected critical inline CSS into:', file);

  // Mirror to backend/public/portal/
  const portalFile = file.replace('web-hue4u/public/', 'backend/public/portal/');
  if (fs.existsSync(portalFile)) {
    let portalContent = fs.readFileSync(portalFile, 'utf8');
    portalContent = portalContent.replace(/\s*<style>\s*\/\* CRITICAL MOBILE BOTTOM NAV OVERRIDE[\s\S]*?<\/style>/g, '');
    portalContent = portalContent.replace(/<link rel="stylesheet" href="\.\/css\/style\.css(?:\?[^"]*)?">/, inlineCss);
    fs.writeFileSync(portalFile, portalContent, 'utf8');
    console.log('Mirrored to portal:', portalFile);
  }
});
