uniform float time;
uniform float seed;
uniform vec2 resolution;

#pragma glslify:palette=require('../../includes/palettes/iq-1')

//Glitch Art
//https://en.wikipedia.org/wiki/Glitch_art

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(palette(uv.x),1.);
  gl_FragColor=color;
}