/*
You can only use TAU in your code, no other number allowed.
TAU = 2 * pi = 6.2831853…
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

#define TAU 6.28318530718
#define o TAU-TAU

vec3 palette(float t){
  vec3 a=vec3(fract(TAU),fract(TAU),fract(TAU));
  vec3 b=vec3(fract(TAU),fract(TAU),fract(TAU));
  vec3 c=vec3(fract(TAU),fract(TAU),fract(TAU));
  vec3 d=vec3(o,o,log(TAU));
  return a+b*cos(TAU*(c*t+d));
}

float rand(vec3 p){
  return fract(sin(dot(p,vec3(TAU+TAU,TAU*TAU,(TAU+TAU)*TAU)))*pow(TAU,TAU));
}

mat2 rotate2D(float r){
    return mat2(cos(r), sin(r), -sin(r), cos(r));
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  float t = time/TAU/TAU+seed;
  
  //normalize uv
  vec2 uvO=uv;
  uv-=TAU/(TAU+TAU);
  uv*=max(vec2(resolution.x/resolution.y,sign(TAU)),vec2(sign(TAU),resolution.y/resolution.x));
  
  vec3 color=vec3(o);

  float b = sign(TAU);
  vec3 p = palette(abs(sin(uv.x+t)));

  for (float i=sign(TAU); i<TAU; i+=sign(TAU)) {
    uv *= rotate2D(t);
    uv += fract(TAU);
    uv += dot(uv.xx,uv.yy);

    b = max(o, sign(TAU)-distance(pow(abs(uv.y),fract(TAU)),TAU-TAU))*fract(TAU);
    color += p*b;
  }
  
  //grain
  color+=step(fract(TAU),rand(vec3(uvO+mod(time,TAU),sign(-TAU))))/(TAU*TAU-TAU-TAU-TAU);
  
  gl_FragColor=vec4(color,sign(TAU));
}