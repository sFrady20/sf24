/*
Dithering
created for genuary 2022
updated 2025
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

#define PATTERN_TIME_SCALE .3

int octaves=3;

// https://www.stevenfrady.com/tools/palette?p=[[0.35,0.74,0.44],[0.4,1,1],[0.61,0.3,0.48],[1,0.24,0.08]]
vec3 palette(float t){
  vec3 a=vec3(0.35,0.74,0.44);
  vec3 b=vec3(0.4,1,1);
  vec3 c=vec3(0.61,0.3,0.48);
  vec3 d=vec3(1,0.24,0.08);
  return a+b*cos(6.28318*(c*t+d));
}

float paletteSize = 32.;

float random(in vec2 st){
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float perlin(in vec2 p){//or maybe not perlin idunno
  vec2 ip=floor(p);
  vec2 u=fract(p);
  u=u*u*(3.-2.*u);
  
  float res=mix(
    mix(random(ip),random(ip+vec2(1.,0.)),u.x),
    mix(random(ip+vec2(0.,1.)),random(ip+vec2(1.,1.)),u.x),u.y
  );
    
  return res*res;
}
  
float fbm(in vec2 st){
  float value=0.;
  float amp=.6;
  float freq=0.;
  
  for(int i=0;i<octaves;i++){
    value+=amp*perlin(st);
    st*=2.1;
    amp*=.35;
  }
  return value;
}

vec3 rgbToHsl(vec3 c){
  vec4 K=vec4(0.,-1./3.,2./3.,-1.);
  vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));
  vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));
  
  float d=q.x-min(q.w,q.y);
  float e=1.e-10;
  return vec3(abs(q.z+(q.w-q.y)/(6.*d+e)),d/(q.x+e),q.x);
}

vec3 hslToRgb(vec3 c){
  vec4 K=vec4(1.,2./3.,1./3.,3.);
  vec3 p=abs(fract(c.xxx+K.xyz)*6.-K.www);
  return c.z*mix(K.xxx,clamp(p-K.xxx,0.,1.),c.y);
}

float pattern(in vec2 p){
  float f=0.;
  vec2 q=vec2(
    fbm(p+time*PATTERN_TIME_SCALE*.2+vec2(0.)),
    fbm(p+time*PATTERN_TIME_SCALE*.3+vec2(2.4,4.8))
  );
  vec2 r=vec2(
    fbm(q+time*PATTERN_TIME_SCALE*.3+4.*q+vec2(3.,9.)),
    fbm(q+time*PATTERN_TIME_SCALE*.2+8.*q+vec2(2.4,8.4))
  );
  f=fbm(p+r*2.+time*.09);
  return f;
}

float indexValue(vec2 p){
  float x=mod(p.x,2.);
  float y=mod(p.y,2.);
  return step(1., min(x, y));
}

vec4 dither(vec4 color, vec2 uv){
  vec3 hsl=rgbToHsl(color.rgb);
  
  float a = fract(floor(hsl.x * paletteSize) / paletteSize);
  float b = fract(ceil(hsl.x * paletteSize) / paletteSize);

  vec3 col = mix(
    palette(fract(a)),
    palette(fract(b)),
    step(0.5, indexValue(gl_FragCoord.xy))
  );
  
  return vec4(col * pow(length(col), .1), 1.);
}

void show(inout vec4 col,inout vec2 uv){
  float r=pattern(uv/94.+3825.235);
  float g=pattern(uv/87.-23.253);
  float b=pattern(uv/93.+2353.2);
  col=vec4(vec3(r,g,b),1.);
}

void main(){
  vec4 col=vec4(0.,0.,0.,1.);
  vec2 uv=gl_FragCoord.xy;
  uv -= 0.5*resolution;
  uv *= 0.5;
  
  show(col,uv);
  col = dither(col, uv);
  
  gl_FragColor=col;
}
