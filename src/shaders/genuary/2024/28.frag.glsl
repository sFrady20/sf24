/*
Skeuomorphism.
A skeuomorph is a derivative object that retains attributes from structures that were necessary in the original.
Skeuomorphs are typically used to make something new feel familiar in an effort to speed
understanding and acclimation. They employ elements that, while essential to the original object, serve no pragmatic
purpose in the new system. (from Wikipedia on Skeuomorphs(https://en.wikipedia.org/wiki/Skeuomorph))
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time),1.);
  gl_FragColor=color;
}