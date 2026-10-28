uniform float uTime;
uniform vec3 uFogColor;
uniform float uDensity;
uniform vec3 uCameraPos;

varying vec2 vUv;
varying vec3 vWorldPosition;

// Simple 2D hash & noise for drifting cloud layers
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
             mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; ++i) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 st = vUv * 6.0;
  float drift = uTime * 0.04;
  float n = fbm(st + vec2(drift, drift * 0.3));

  // Edge fading to prevent harsh intersection borders
  float edgeX = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
  float edgeY = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
  float edgeFade = edgeX * edgeY;

  // Distance fade
  float dist = length(uCameraPos - vWorldPosition);
  float distFade = smoothstep(5.0, 25.0, dist) * smoothstep(400.0, 200.0, dist);

  float alpha = smoothstep(0.3, 0.8, n) * uDensity * edgeFade * distFade;

  gl_FragColor = vec4(uFogColor, alpha);
}
