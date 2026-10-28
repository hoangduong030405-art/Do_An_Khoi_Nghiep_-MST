uniform float uTime;
uniform float uPixelRatio;

attribute float aScale;
attribute float aPhase;
attribute vec3 aColor;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vColor = aColor;

  // Organic floating bobbing motion
  vec3 pos = position;
  float t = uTime * 0.8 + aPhase;
  pos.y += sin(t * 1.5) * 1.8;
  pos.x += cos(t * 0.7) * 0.9;
  pos.z += sin(t * 0.9) * 0.9;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Size attenuation with perspective
  float size = aScale * (180.0 / -mvPosition.z) * uPixelRatio;
  gl_PointSize = clamp(size, 4.0, 75.0);

  // Soft pulsation
  vAlpha = 0.65 + 0.35 * sin(t * 2.0);
}
