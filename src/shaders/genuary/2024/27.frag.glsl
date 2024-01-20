/*
Code for one hour. At the one hour mark, you’re done.
Click here(https://www.google.com/search?q=1+hour+timer) to find out how long an hour takes. PRO-TIP: Use the progress indicator from Genuary 7th!
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time),1.);
  gl_FragColor=color;
}