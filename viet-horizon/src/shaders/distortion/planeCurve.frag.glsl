uniform sampler2D uTexture;
uniform float uVelocity;
uniform float uHover;

varying vec2 vUv;
varying float vCurve;

void main() {
  // Chromatic aberration (RGB Split) proportional to scroll velocity
  float shift = clamp(abs(uVelocity) * 0.0008, 0.0, 0.035);

  vec2 uvR = vUv + vec2(shift, 0.0);
  vec2 uvG = vUv;
  vec2 uvB = vUv - vec2(shift, 0.0);

  float r = texture2D(uTexture, uvR).r;
  float g = texture2D(uTexture, uvG).g;
  float b = texture2D(uTexture, uvB).b;

  vec3 color = vec3(r, g, b);

  // Subtle contrast and hover warmth
  color += vec3(0.04, 0.02, 0.0) * uHover;

  // Dark border vignette on the 3D card
  vec2 uvEdge = abs(vUv - 0.5) * 2.0;
  float edge = max(uvEdge.x, uvEdge.y);
  float borderFade = 1.0 - smoothstep(0.92, 1.0, edge) * 0.4;

  gl_FragColor = vec4(color * borderFade, 1.0);
}
