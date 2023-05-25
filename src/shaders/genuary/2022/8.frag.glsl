//Single curve only.

precision mediump float;

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

const int paletteSize=7;
const vec3[paletteSize]palette=vec3[](
  vec3(11.,24.,37.),
  vec3(57.,1.,248.),
  vec3(242.,53.,157.),
  vec3(107.,44.,233.),
  vec3(12.,198.,111.),
  vec3(57.,1.,248.),
  vec3(11.,24.,37.)
);

//https://www.shadertoy.com/view/DlSXDd
#define PI 3.14159265
#define RHO 1.5707963268
float atan2(in vec2 p,in float w){// :)
  float a=abs(p.x)<1e-8?RHO:atan(abs(p.y/p.x));
  float sy=2.*smoothstep(-w,w,p.y)-1.;
  return abs(a+PI*min(0.,sign(p.x)))*sy;
}

#define COIL_LENGTH 10
#define COIL_HEIGHT.25
float sdCoil(in vec2 p,in vec2 c,in float r){
  float d=1.;
  for(int i=0;i<COIL_LENGTH;i++){
    float h=COIL_HEIGHT*float(i);
    vec2 py=p-vec2(0.,h);
    vec2 cy=c-vec2(0.,h);
    vec2 yp=cy-py;
    float a=atan2(yp,1./resolution.y);
    //return a;
    py+=vec2(0.,a*COIL_HEIGHT);
    d=min(d,abs(r-length(py)));
  }
  return d;
}

void coil(in vec2 uv,inout vec3 col){
  uv-=vec2(.5);
  uv*=vec2(resolution.x/resolution.y,1.);
  
  //"tilt"
  uv*=vec2(1.,1.5);
  
  //float p=step(sdCoil(uv,vec2(.5,.7),.5),.01);
  float p=sdCoil(uv,vec2(uv),.5);
  
  col=vec3(p);
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec3 col=palette[0];
  
  coil(uv,col);
  
  gl_FragColor=vec4(col,1.);
}