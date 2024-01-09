/*
Shaders.

Use the GPU. I did a Shader Workshop(https://www.youtube.com/watch?v=EGvuSOvuREQ) a while back where I explain how to code a shader in WebGL2 from
scratch (and also finally a simple raymarcher, but you can do many other things with shaders too).
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