const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ 
    headless: true, 
    channel: 'chrome',
    args: ['--allow-file-access-from-files']
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('console', msg => {
    console.log('[BROWSER]', msg.type(), msg.text());
  });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
      </head>
      <body>
        <script>
          const loader = new THREE.GLTFLoader();
          const models = [
            'https://threejs.org/examples/models/gltf/Stork.glb',
            'https://threejs.org/examples/models/gltf/Flamingo.glb',
            'https://threejs.org/examples/models/gltf/Parrot.glb'
          ];
          let loaded = 0;
          models.forEach(m => {
            loader.load(m, (gltf) => {
              console.log('SUCCESS LOADED:', m, 'animations:', gltf.animations.length);
              loaded++;
              if (loaded === models.length) console.log('ALL MODELS READY!');
            }, undefined, (err) => console.error('FAILED TO LOAD:', m, err));
          });
        </script>
      </body>
    </html>
  `);

  await page.waitForTimeout(4000);
  await browser.close();
})();
