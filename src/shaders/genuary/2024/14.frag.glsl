/*
Less than 1KB artwork.
You can decide if you want to go for size coding, for 1KB of output, or whatever you think would be appropriate, today. If
you go for size coding, we made some [tiny boiler plate code samples](https://genuary.art/tinycode) for you to start with.
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