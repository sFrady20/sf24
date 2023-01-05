uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 

void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  float amt = max(enter - exit, 0.) + 0.4;

  uv += snoise2(vec2(uv.x * 2.14, uv.y * -3.25) + vec2(seed, -seed) + vec2(time * 0.1)) * 0.01 * amt;

  vec4 color=texture2D(scene,uv)*2.;
  color.a *= amt;

  color.a *= (enter - exit);

  gl_FragColor=color;
}