/*
Op Art.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

#pragma glslify:opRotate=require('../../includes/ops/rotate')

// https://www.stevenfrady.com/tools/palette?p=[[0.17,0.37,0.66],[0.99,0.42,0.2],[0.69,0.76,0.89],[0.47,0.52,0.68]]
vec3 palette(float t){
  vec3 a=vec3(0.17,0.37,0.66);
  vec3 b=vec3(0.99,0.42,0.2);
  vec3 c=vec3(0.69,0.76,0.89);
  vec3 d=vec3(0.47,0.52,0.68);
  return a+b*cos(6.28318*(c*t+d));
}

const float TILE = 25.;
const float AA = 0.033;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec2 uv0=uv;
  
  //normalize uv
  uv-=vec2(0.5);
  vec2 aspect = max(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  uv*=aspect;
  
  float t = time * 0.4f + seed;

  uv += 1./TILE/2.;
  vec2 id = floor(uv*TILE);
  uv = fract(uv*TILE);

  vec3 col = palette(0.+uv0.y*0.4)*0.25;

  vec2 max = vec2(round(TILE/2.-2.)*aspect);
  if (id.x < max.x && id.y < max.y && id.x > -max.x && id.y > -max.y) {
    vec2 rUv = opRotate(uv, id.x*2.*sin(t-abs(length(id))*0.05)+id.y*2.*cos(t), 0.5);
    vec3 h = mix(vec3(0.), vec3(1.), smoothstep(0.5-AA, 0.5+AA, rUv.x));
    col = mix(h, col, smoothstep(0.4-AA/2., 0.4+AA/2., length(uv - vec2(0.5))));
    col = mix(palette(1.-abs(id.y*0.01)), col, smoothstep(0.3-AA/2., 0.3+AA/2., length(uv - vec2(0.5))));
  }

  gl_FragColor=vec4(col,1.);
}