/*
If you like generative art, you probably have some photos on your phone of cool
looking patterns, textures, shapes or things that you’ve seen. You might have even
thought, “I should try to recreate this with code”. Today is the day.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time),1.);
  gl_FragColor=color;
}