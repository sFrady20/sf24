//VHS.

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 pointer;

#pragma glslify:noise=require('../../includes/noise/fbm')

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec2 pn = pointer.xy/resolution.xy;
  vec4 color=vec4(abs(uv-pn),sin(time),1.);
  gl_FragColor=color;
}