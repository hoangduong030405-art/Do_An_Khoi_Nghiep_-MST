/**
 * Custom ShaderPass for Film Grain, Vignette, and Cinematic Tone Adjustments
 */
export const PostProcessShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uGrainIntensity: { value: 0.045 },
    uVignetteDarkness: { value: 0.95 },
    uVignetteOffset: { value: 0.85 }
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uGrainIntensity;
    uniform float uVignetteDarkness;
    uniform float uVignetteOffset;

    varying vec2 vUv;

    // High quality pseudo-random generator
    float random(vec2 p) {
      vec2 k1 = vec2(
        23.14069263277926, // e^pi (Gelfond's constant)
        2.665144142690225 // 2^sqrt(2) (Gelfond-Schneider constant)
      );
      return fract(cos(dot(p, k1)) * 12345.6789);
    }

    void main() {
      vec4 baseColor = texture2D(tDiffuse, vUv);

      // Subtle 35mm film grain
      vec2 uvRandom = vUv + sin(uTime * 12.0) * 0.05;
      float grain = (random(uvRandom) - 0.5) * uGrainIntensity;

      // Vignette
      vec2 uv = (vUv - 0.5) * 2.0;
      float dist = length(uv);
      float vignette = smoothstep(uVignetteOffset, uVignetteOffset - 0.5, dist * 0.7);
      vignette = mix(1.0 - uVignetteDarkness * 0.45, 1.0, vignette);

      vec3 finalRgb = (baseColor.rgb + grain) * vignette;

      gl_FragColor = vec4(finalRgb, baseColor.a);
    }
  `
};
