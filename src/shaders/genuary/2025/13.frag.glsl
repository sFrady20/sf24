/*
Triangles and nothing else.
*/

#pragma glslify:sdTriangle=require('../../includes/sdf/2d/equilateral-triangle')
#pragma glslify:sigmoid=require('../../includes/math/sigmoid')
#pragma glslify:opRotate=require('../../includes/ops/rotate')

uniform float time;
uniform float seed;
uniform vec2 resolution;

const float TILE = 28.;
const float BORDER = .05;

// https://www.stevenfrady.com/tools/palette?p=[[0.37,0.19,0.6],[0.43,0.31,0.19],[0.22,0.27,0.82],[0.11,0.95,0.76]]
vec3 palette(float t){
  vec3 a=vec3(0.37,0.19,0.6);
  vec3 b=vec3(0.43,0.31,0.19);
  vec3 c=vec3(0.22,0.27,0.82);
  vec3 d=vec3(0.11,0.95,0.76);
  return a+b*cos(6.28318*(c*t+d));
}

vec2 roundToTriangleCenter(vec2 uv) {
    float x = floor(uv.x);
    float y = floor(uv.y);

    vec2 localPos = fract(uv);

    bool inTopTriangle = localPos.x + localPos.y < 1.0;

    vec2 triangleCenter = inTopTriangle
        ? vec2(0.5, 0.5)
        : vec2(1.0, 1.0);

    vec2 gridOffset = vec2(x, y);

    return gridOffset + triangleCenter;
}

float isBorder(vec2 uv, float threshold) {
    uv = abs(fract(uv));
    float b = 1.;

    b *= uv.x < BORDER ? 0. : 1.;
    b *= uv.x > 2.-BORDER ? 0. : 1.;

    b *= uv.y < BORDER ? 0. : 1.;
    b *= uv.y > 2.-BORDER ? 0. : 1.;

    b *= uv.x + uv.y < 1.-BORDER || uv.x + uv.y > 1.+BORDER ? 1. : 0.;

    return 1.-b;
}

vec3 tripulse(vec2 uv, float t){
  vec2 uv0=uv;

  uv += vec2(0.,0.1);
  uv += vec2(1.,0.)*sin(t+uv.y*5.)*0.04;
  float d = sdTriangle(uv);

  vec3 color = palette(pow(sigmoid(d*3.+0.5),1.));
  color *= pow(smoothstep(0.,1.,fract(d*7.-t)),1.5);
  color *= clamp(0.,1.,pow(1.-d,2.));

  return color;
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  float t=time*.7;

  //normalize uv
  uv-=vec2(0.5);
  uv*=max(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));

  vec2 cUv = roundToTriangleCenter(uv*TILE);
  vec3 color = vec3(0);

  color += tripulse(cUv / TILE, t);
  color *= 1.-isBorder(uv * TILE, 0.2);

  gl_FragColor=vec4(color,1.);
}