/*
Triangles and nothing else.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;



void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  float t=time;

  //normalize uv
  uv-=vec2(.5);
  uv*=max(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));

  vec3 color=vec3(abs(uv),sin(t)*0.5+0.5);

  gl_FragColor=vec4(color,1.);
}