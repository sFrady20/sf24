/*
Layers upon layers upon layers.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

#pragma glslify:noise=require('../../includes/noise/simplex-3d')

vec3 palette(float t){
  vec3 a=vec3(0.8,0.5,0.5);
  vec3 b=vec3(0.1,0.5,0.5);
  vec3 c=vec3(0.5,1,1);
  vec3 d=vec3(0,0.33,0.67);
  return a+b*cos(6.28318*(c*t+d));
}

void main() {
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time),1.);
  gl_FragColor=color;
}