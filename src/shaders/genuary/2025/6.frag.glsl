/*
Make a landscape using only primitive shapes.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

// https://www.stevenfrady.com/tools/palette?p=[[0.1,0.1,0.58],[0.57,0.78,0.7],[0.78,0.36,0.57],[0.67,0.64,0.68]]
vec3 palette(float t){
  vec3 a=vec3(.1,.1,.58);
  vec3 b=vec3(.57,.78,.7);
  vec3 c=vec3(.78,.36,.57);
  vec3 d=vec3(.67,.64,.68);
  return a+b*cos(6.28318*(c*t+d));
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  //normalize uv
  uv-=vec2(.5);
  uv*=max(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  
  vec4 color=vec4(uv,sin(time),1.);
  
  gl_FragColor=color;
}