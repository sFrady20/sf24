//Single curve only.

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

const int paletteSize=5;
const vec3[paletteSize]palette=vec3[](
  vec3(.87,.84,.85),//bg
  vec3(.73,.06,.16),
  vec3(.14,.56,.29),
  vec3(.85,.07,.13),
  vec3(.16,.37,.63)
);

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time)*.5+.5,1.);
  gl_FragColor=color;
}