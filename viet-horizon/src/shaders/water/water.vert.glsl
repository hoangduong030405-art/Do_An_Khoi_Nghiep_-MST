uniform float uTime;
uniform vec2 uWaveFrequency;
uniform vec2 uWaveSpeed;
uniform float uWaveHeight;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vElevation;

// Gerstner Wave calculation
vec3 gerstnerWave(vec4 wave, vec3 p, inout vec3 tangent, inout vec3 binormal) {
  float steepness = wave.z;
  float wavelength = wave.w;
  float k = 2.0 * 3.14159265 / wavelength;
  float c = sqrt(9.8 / k);
  vec2 d = normalize(wave.xy);
  float f = k * (dot(d, p.xz) - c * uTime * 0.4);
  float a = steepness / k;

  tangent += vec3(
    -d.x * d.x * (steepness * sin(f)),
    d.x * (steepness * cos(f)),
    -d.x * d.y * (steepness * sin(f))
  );

  binormal += vec3(
    -d.x * d.y * (steepness * sin(f)),
    d.y * (steepness * cos(f)),
    -d.y * d.y * (steepness * sin(f))
  );

  return vec3(
    d.x * (a * cos(f)),
    a * sin(f),
    d.y * (a * cos(f))
  );
}

void main() {
  vUv = uv;
  vec3 gridPoint = position;
  vec3 tangent = vec3(1.0, 0.0, 0.0);
  vec3 binormal = vec3(0.0, 0.0, 1.0);
  vec3 p = gridPoint;

  // 3-octave Gerstner waves
  p += gerstnerWave(vec4(1.0, 0.4, 0.18, 24.0), gridPoint, tangent, binormal);
  p += gerstnerWave(vec4(0.3, 0.8, 0.12, 12.0), gridPoint, tangent, binormal);
  p += gerstnerWave(vec4(-0.5, 0.6, 0.08, 6.0), gridPoint, tangent, binormal);

  // Additional fine ripples
  float ripple = sin(gridPoint.x * 0.8 + uTime * 1.5) * cos(gridPoint.z * 0.8 + uTime * 1.2) * 0.12;
  p.y += ripple;

  vNormal = normalize(cross(binormal, tangent));
  vElevation = p.y;

  vec4 worldPosition = modelMatrix * vec4(p, 1.0);
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
