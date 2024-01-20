//In the style of Hilma Af Klint
//https://www.wikiart.org/en/hilma-af-klint/all-works#!#filterName:all-paintings-chronologically,resultType:masonry

uniform float time;
uniform float seed;
uniform vec2 resolution;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time),1.);
  gl_FragColor=color;
}