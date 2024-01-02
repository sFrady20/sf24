uniform vec2 resolution;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  gl_FragColor=vec4(uv,1.,1.);
}