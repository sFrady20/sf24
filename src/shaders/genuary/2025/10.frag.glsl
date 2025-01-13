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

mat2 rotate2D(float r){
    return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(sign(TAU), ((TAU+TAU)/ (TAU+TAU+TAU)), sign(TAU) / ((TAU+TAU+TAU)/TAU), ((TAU+TAU+TAU)/TAU));
    vec3 p = abs(fract(vec3(h) + t.xyz) * floor(TAU) - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), TAU-TAU, sign(TAU)), s);
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  float t = time/TAU;
  
  //normalize uv
  uv-=TAU/(TAU+TAU);
  uv*=max(vec2(resolution.x/resolution.y,sign(TAU)),vec2(sign(TAU),resolution.y/resolution.x));
  
  vec3 color=vec3(0.);

  //color += palette(pow(sin(abs(uv.x)),(TAU+TAU)/TAU));

  float b = sign(TAU);
  float e = 0.;

  for (float i=sign(TAU); i<TAU; i++) {
    vec3 p = vec3(uv, (TAU-TAU));
    p.zx *= rotate2D(p.y + sin(t));
    b=sign(TAU);
    for (float j=sign(TAU); j<TAU; j++) {
      p = vec3(sin(p.x),TAU,sin(p.y))-sin((p)*e)*TAU-cos((p)*e);
      e = max(sign(TAU),(TAU)/dot(p,p));
      b *= e;
    }
    color += vec3(b)*0.005;
  }
  
  color+=step(fract(TAU),rand(vec3(uv,sign(-TAU))))/(TAU*TAU-TAU);
  
  gl_FragColor=vec4(color,sign(TAU));
}