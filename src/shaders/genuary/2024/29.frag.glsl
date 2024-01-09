/*
Signed Distance Functions (if we keep trying once per year, eventually we will be good at it!).

Piter explains how to SDFs in 2023(https://genuary.art/2023/wtsdf)
Video tutorial about 2D SDFs(https://youtu.be/KRB57wyo8_4)
2D distance functions by Inigo Quilez(https://iquilezles.org/articles/distfunctions2d/)
3D distance functions by Inigo Quilez(https://iquilezles.org/articles/distfunctions/)
Wikipedia: Signed Distance Functions(https://en.wikipedia.org/wiki/Signed_distance_function)
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