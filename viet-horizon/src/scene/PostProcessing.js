import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { PostProcessShader } from '../shaders/post/postEffect.js';
import { isMobile } from '../utils/detect.js';

export class PostProcessing {
  constructor(renderer, scene, camera, width, height) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.isMobile = isMobile();

    this.composer = new EffectComposer(renderer);

    // 1. Render Pass
    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    // 2. Subtle UnrealBloomPass (chỉ kích hoạt nếu không phải mobile yếu)
    if (!this.isMobile) {
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.35,  // Cường độ bloom thanh lịch, không cháy sáng
        0.65,  // Bán kính tỏa sáng
        0.82   // Ngưỡng phát sáng
      );
      this.composer.addPass(bloomPass);
    }

    // 3. Film Grain & Vignette Shader Pass
    this.customPass = new ShaderPass(PostProcessShader);
    this.composer.addPass(this.customPass);
  }

  setSize(width, height) {
    this.composer.setSize(width, height);
  }

  render(time) {
    if (this.customPass) {
      this.customPass.uniforms.uTime.value = time;
    }
    this.composer.render();
  }
}
