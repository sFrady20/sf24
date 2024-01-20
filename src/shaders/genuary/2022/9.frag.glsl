//Architecture.

uniform float time;
uniform float seed;
uniform vec2 resolution;

float getDist(vec3 p){
  return 1.;
}

#define MAX_STEPS 10
#define MAX_DIST 100.
#define SURFACE_DIST.1
float march(vec3 ro,vec3 rd){
  vec3 p=ro;
  float d=0.;
  float ds=0.;
  for(int i=0;i<MAX_STEPS;i++){
    p+=ro+d*rd;
    ds=getDist(p);
    d+=ds;
    if(ds<SURFACE_DIST||d>MAX_DIST)break;
  }
  return d;
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time),1.);
  gl_FragColor=color;
}
