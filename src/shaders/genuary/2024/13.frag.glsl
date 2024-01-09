/*
Wobbly function day.
[Wobbly Functions](https://piterpasma.nl/articles/wobbly) are a name I’ve given to smoothly undulating formulas made from modulated sine waves. Usually it’s formulas of the form:
sin(a * b + c + d * sin(e * f + g)) + sin(h * i + j + k * sin(l * m + n)) + ...
Or something along those lines. Don’t worry about angles or trigonometric identities, just go with the wobble!
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