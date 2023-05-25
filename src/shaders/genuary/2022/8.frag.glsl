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

float sdBox(in vec2 p,in vec2 b){
  vec2 d=abs(p)-b;
  return length(max(d,0.))+min(max(d.x,d.y),0.);
}

float sdCircle(in vec2 p,in float r){
  return length(p);
}

void coil(in vec2 uv,inout vec3 col){
  uv-=vec2(.5);
  uv*=vec2(resolution.x/resolution.y,1.);
  col=vec3(step(abs(.5-sdCircle(uv,.5)),.01));
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec3 col=palette[0];
  
  coil(uv,col);
  
  gl_FragColor=vec4(col,1.);
}