uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform vec3 uSunColor;
uniform vec3 uSunPosition;
uniform vec3 uCameraPosition;
uniform float uFresnelBias;
uniform float uFresnelScale;
uniform float uFresnelPower;

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying float vElevation;

void main() {
  vec3 viewDirection = normalize(uCameraPosition - vWorldPosition);
  vec3 normal = normalize(vNormal);

  // Fresnel effect (view angle reflectivity)
  float fresnel = uFresnelBias + uFresnelScale * pow(1.0 - max(0.0, dot(viewDirection, normal)), uFresnelPower);
  fresnel = clamp(fresnel, 0.0, 1.0);

  // Sun Specular Highlight
  vec3 sunDir = normalize(uSunPosition - vWorldPosition);
  vec3 halfVector = normalize(sunDir + viewDirection);
  float NdotH = max(0.0, dot(normal, halfVector));
  float specular = pow(NdotH, 64.0) * 1.5;

  // Base water color mix based on wave height
  float colorMix = smoothstep(-0.8, 1.2, vElevation);
  vec3 waterColor = mix(uDepthColor, uSurfaceColor, colorMix);

  // Add subtle foam at peaks
  float foam = smoothstep(0.7, 1.3, vElevation);
  waterColor = mix(waterColor, vec3(0.9, 0.95, 0.98), foam * 0.4);

  // Sky reflection / Sun glint
  vec3 finalColor = mix(waterColor, uSunColor, fresnel * 0.65) + uSunColor * specular;

  // Depth atmospheric attenuation
  float distanceToCamera = length(uCameraPosition - vWorldPosition);
  float fogFactor = smoothstep(100.0, 450.0, distanceToCamera);
  finalColor = mix(finalColor, vec3(0.03, 0.08, 0.16), fogFactor);

  gl_FragColor = vec4(finalColor, 0.92);
}
