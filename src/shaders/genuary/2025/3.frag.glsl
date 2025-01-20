/*
Exactly 42 lines of code.
*/

#pragma glslify:noise=require('../../includes/noise/simplex-3d')

uniform float time;
uniform float seed;
uniform vec2 resolution;

const int LAYERS = 10;

vec3 palette(float t){
  vec3 a=vec3(0.8,0.5,0.5);
  vec3 b=vec3(0.1,0.5,0.5);
  vec3 c=vec3(0.5,1,1);
  vec3 d=vec3(0,0.33,0.67);
  return a+b*cos(6.28318*(c*t+d));
}

void main() {
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec3 color = vec3(0.0);
  for(int i=0;i<LAYERS;i++){
    float t=float(i)/float(LAYERS);
    color+=palette(t)*noise(vec3(uv*10.,time*0.1+t*0.1));
  }
  gl_FragColor=vec4(color,1.0);
}