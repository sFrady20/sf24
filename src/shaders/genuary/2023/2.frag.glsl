//Made in 10 minutes
//https://www.google.com/search?hl=en&q=timer%2010%20minutes

uniform float time;
uniform float seed;
uniform vec2 resolution;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time),1.);
  gl_FragColor=color;
}