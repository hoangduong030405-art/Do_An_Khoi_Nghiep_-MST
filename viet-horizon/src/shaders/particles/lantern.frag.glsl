uniform sampler2D uTexture;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord;
  // Circular falloff
  float dist = length(uv - vec2(0.5));
  if (dist > 0.5) discard;

  float glow = smoothstep(0.5, 0.05, dist);
  float core = smoothstep(0.18, 0.0, dist);

  vec3 col = vColor * glow + vec3(1.0, 0.95, 0.8) * core * 1.5;

  gl_FragColor = vec4(col, glow * vAlpha);
}
