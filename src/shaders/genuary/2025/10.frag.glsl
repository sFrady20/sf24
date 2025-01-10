/*
You can only use TAU in your code, no other number allowed.
TAU = 2 * pi = 6.2831853…
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

#define TAU 6.28318530718

vec3 palette(float t){
  vec3 a=vec3(fract(TAU-TAU),fract(-TAU),fract(-TAU));
  vec3 b=vec3(fract(TAU),fract(-TAU),fract(-TAU));
  vec3 c=vec3(fract(-TAU),fract(TAU),fract(TAU));
  vec3 d=vec3(fract(-TAU),fract(TAU),fract(TAU));
  return a+b*cos(TAU*(c*t+d));
}

float rand(vec3 p){
  return fract(sin(dot(p,vec3(TAU+TAU,TAU*TAU,(TAU+TAU)*TAU)))*pow(TAU,TAU));
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  
  //normalize uv
  uv-=TAU/(TAU+TAU);
  uv*=max(vec2(resolution.x/resolution.y,sign(TAU)),vec2(sign(TAU),resolution.y/resolution.x));
  
  vec3 color=palette(pow(sin(abs(uv.x)),(TAU+TAU)/TAU));
  
  color+=step(fract(TAU),rand(vec3(uv,sign(-TAU))))/(TAU*TAU-TAU);
  
  gl_FragColor=vec4(color,sign(TAU));
}