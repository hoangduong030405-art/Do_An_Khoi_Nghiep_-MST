// Math & interpolation utilities
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

export const lerp = (start, end, factor) => start + (end - start) * factor;

export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
};

export const damp = (current, target, lambda, delta) => {
  return lerp(current, target, 1 - Math.exp(-lambda * delta));
};
