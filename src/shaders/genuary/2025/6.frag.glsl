/*
Make a landscape using only primitive shapes.
*/

#pragma glslify:opRotate=require('../../includes/ops/rotate')

uniform float time;
uniform float seed;
uniform vec2 resolution;

// https://www.stevenfrady.com/tools/palette?p=[[0.64,0.06,0.15],[0.76,1,0.59],[0.24,0.19,0.16],[0.33,0.22,0.68]]
vec3 palette(float t){
  vec3 a=vec3(0.64,0.06,0.15);
  vec3 b=vec3(0.76,1,0.59);
  vec3 c=vec3(0.24,0.19,0.16);
  vec3 d=vec3(0.33,0.22,0.68);
  return a+b*cos(6.28318*(c*t+d));
}

mat2 rotate2D(float r){
    return mat2(cos(r), sin(r), -sin(r), cos(r));
}

void main(){
  vec3 o = vec3(0.0);
  vec2 FC = gl_FragCoord.xy, r = resolution.xy;
  float t = time;
  
  for (
      float e, i = 0.0, a, x, g = 1.0, h; // Initialize variables
      i++ < 90.0;                           // Outer loop runs 90 times
      o += 0.01 - 0.02 / exp(max(0., e) * 300.0) / h // Accumulate color output
  ) {
      // Initialize the point `p` based on screen coordinates and scaling factor `g`
      vec3 p = vec3(
          (FC.xy - 0.5 * r) / r.y * g + 2.0, // Normalize screen coordinates and offset
          g                                 // Set initial z-value
      );

      // Apply a 2D rotation to `p` in the zy-plane
      p.zy *= rotate2D(0.5);

      // Assign initial values for `e` and `h`
      e = p.y;
      h = e + p.x * 0.4;

      // Add time-based offset to the z-coordinate
      p.z += t;

      // Inner loop to apply transformations, decaying with `a`
      for (a = 0.5; a > 0.001; a *= 0.7) {
          // Rotate `p` in the xz-plane
          p.xz *= rotate2D(5.0);

          // Compute a periodic value based on `p` and time
          x = (p.x + p.z) / a + t + t;

          // Update `e` based on a sinusoidal function and an exponential decay
          e -= exp(sin(x) - 3.0) * a;

          // Update `h` by adding contributions from the dot product of `p` with sine functions
          h += abs(dot(
              sin(p.xz / a * 0.3) * a, // Oscillations scaled by `a`
              r / r                   // Normalize screen dimensions
          ));
      }

      // Update `g` based on the minimum of `e` and a function of `h`
      g += e = min(e, h * 0.5 - 1.0);
  }
  
  gl_FragColor=vec4(o, 1.);
}