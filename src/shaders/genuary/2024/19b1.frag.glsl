/*
Flocking.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec3(sin(time+uv.x*10.)),1.);
  gl_FragColor=color;
}