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

#define COIL_LENGTH 5
#define COIL_HEIGHT.2
vec3 sdCoil(in vec2 p,in vec2 c,in float r){
  vec3 ret = vec3(1.);
  for(int i=0;i<COIL_LENGTH;i++){
    float a=smoothstep(0.,1.,(0.5 + 0.5 * atan(p.y-float(i)*COIL_HEIGHT, p.x) / PI)*1.05);
    float h=(float(i)+a)*COIL_HEIGHT;
    vec2 ph=p-vec2(0.,h);
    float ringDist=abs(r-length(ph));
    float hit = step(0.013,ringDist);
    if (hit < 1.) 
      ret = vec3(ringDist, hit * ret.y, p.y-float(i)*COIL_HEIGHT);
  }
  return ret;
}

void coil(in vec2 uv,inout vec3 col){
  uv-=vec2(.5, .5);
  uv*=vec2(resolution.x/resolution.y,1.);
  
  //"tilt"
  uv*=vec2(1.,1.5);
  
  vec3 co = sdCoil(uv,uv,.5);
  float p=1.-co.y;
  
  col=vec3(p * (.5-co.z*0.5));
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec3 col=palette[0];
  
  coil(uv,col);
  
  gl_FragColor=vec4(col,1.);
}