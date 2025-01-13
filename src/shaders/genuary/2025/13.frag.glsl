/*
Triangles and nothing else.
*/

#pragma glslify:sdTriangle=require('../../includes/sdf/2d/equilateral-triangle')
#pragma glslify:sigmoid=require('../../includes/math/sigmoid')

uniform float time;
uniform float seed;
uniform vec2 resolution;

// https://www.stevenfrady.com/tools/palette?p=[[0.96,0.91,0.09],[0.96,0.87,0.64],[0.47,0.34,0.91],[0.58,0.5,0.91]]
vec3 palette(float t){
  vec3 a=vec3(0.96,0.91,0.09);
  vec3 b=vec3(0.96,0.87,0.64);
  vec3 c=vec3(0.47,0.34,0.91);
  vec3 d=vec3(0.58,0.5,0.91);
  return a+b*cos(6.28318*(c*t+d));
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  float t=time*1.;

  //normalize uv
  uv-=vec2(.5);
  uv*=max(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));

  float d = sdTriangle(uv);

  vec3 color=palette(sigmoid(abs(d)-.5))*pow(1.-d, 2.1)*smoothstep(0., 1., fract(d*10.-t));

  gl_FragColor=vec4(color,1.);
}