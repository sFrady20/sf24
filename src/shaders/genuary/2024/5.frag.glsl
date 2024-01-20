/*
In the style of Vera Molnár (1924-2023).
Wikipedia: Vera Molnár(https://en.wikipedia.org/wiki/Vera_Moln%C3%A1r)
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time),1.);
  gl_FragColor=color;
}