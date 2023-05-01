//Signed Distance Functions
//https://genuary.art/wtsdf
//https://iquilezles.org/articles/distfunctions2d/
//https://iquilezles.org/articles/distfunctions/
//https://en.wikipedia.org/wiki/Signed_distance_function

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 color = vec4(uv,sin(time),1.);
  gl_FragColor = color;
}