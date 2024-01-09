/*
Generative music / Generative audio / Generative sound.

While many of you probably know that Ambient music often employs generative strategies, Psy-Trance is another genre
that uses generative techniques. Check out e.g. Dash Glitch on YouTube(https://www.youtube.com/results?search_query=dash+glitch+generative)
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