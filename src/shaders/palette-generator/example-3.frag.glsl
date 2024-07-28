//Chaotic system.

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec3[4] palette;

#pragma glslify:noise=require('../includes/noise/simplex-3d')

vec3 paletteColor(float t){
  vec3 a=palette[0];
  vec3 b=palette[1];
  vec3 c=palette[2];
  vec3 d=palette[3];
  return a+b*cos(6.28318*(c*t+d));
}

const int iterations=20;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec2 uv0=uv;
  
  //normalize uv
  uv-=vec2(.5);
  uv*=min(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  
  float a=40.;
  mat2 rot=mat2(cos(a),sin(a),-sin(a),cos(a));
  
  float ot=1.;
  float l=length(uv);
  
  vec2 r=vec2(0.);
  float st=120.+time*.1;
  for(int i=0;i<iterations;++i){
    uv=abs(uv*rot)*1.3-1.;
    r=uv+vec2(sin(st),cos(st))*.5;
    ot=min(ot,abs(dot(r,r)-l*.015-.5));
  }
  
  float c=pow(ot,.15)+l*1.5;
  
  vec3 col=paletteColor(max(c,.75))*(2.-c);
  
  gl_FragColor=vec4(col,1.);
}