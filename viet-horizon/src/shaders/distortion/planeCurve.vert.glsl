uniform float uVelocity;
uniform vec2 uHoverOffset;

varying vec2 vUv;
varying vec3 vNormal;
varying float vCurve;

void main() {
  vUv = uv;
  vec3 p = position;

  // Curvature based on distance from center and scroll velocity
  vec2 centered = uv - 0.5;
  float dist = length(centered);
  float curveFactor = -uVelocity * 0.0035;
  p.z += sin(dist * 3.14159) * curveFactor * 15.0;

  // Slight tilt based on hover
  p.z += (centered.x * uHoverOffset.x + centered.y * uHoverOffset.y) * 2.5;

  vCurve = curveFactor;
  vNormal = normal;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
