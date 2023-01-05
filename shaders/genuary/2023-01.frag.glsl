uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float amt = max(enter - exit, 0.);
  vec4 color=texture2D(scene,uv)*2.;
  gl_FragColor=color;
}