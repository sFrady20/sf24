/*
Flocking.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D channel0;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  
  //normalize uv
  uv-=vec2(.5);
  uv*=min(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  
  vec4 color=vec4(abs(uv),sin(time),1.);
  
  color+=texture(channel0,gl_FragCoord.xy);
  
  gl_FragColor=color;
}