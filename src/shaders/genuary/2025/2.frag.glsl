#pragma glslify:noise=require('../../includes/noise/simplex-3d')
#pragma glslify:sdBox=require('../../includes/sdf/2d/box')
#pragma glslify:opRotate=require('../../includes/ops/rotate')

/*
Layers upon layers upon layers.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

const int LAYERS = 8;

// https://www.stevenfrady.com/tools/palette?p=[[0.21,0.82,0.88],[0.26,0.87,0.66],[1,0.37,0.46],[1,0.25,0.31]]
vec3 palette(float t){
  vec3 a=vec3(0.21,0.82,0.88);
  vec3 b=vec3(0.26,0.87,0.66);
  vec3 c=vec3(1,0.37,0.46);
  vec3 d=vec3(1,0.25,0.31);
  return a+b*cos(6.28318*(c*t+d));
}

vec3 layer(in vec2 uv, in float t){
  float t0 = t;
  float l = float(LAYERS);

  t = mod(t, 1.);

  uv.y *= 2.;
  uv.y += (t * 2. - 1.);

  float r = sin(t0 * 2.) * 0.5 + 0.5;
  uv = opRotate(uv, r * 3., 0.);

 
  float box = sdBox(uv,vec2(.66));

  //initialize color
  vec3 color = vec3(1.);

  //grid lines only
  float gw = 0.4;
  float g = step(mod(uv.x * 100., 1.), gw);
  color *= g;

  //add hue
  color *= palette(noise(vec3(uv, t0)) * 0.5 + 0.5);

  //fade in and out
  color *= smoothstep(0.,0.01,t) ;
  color *= pow(smoothstep(0.,1.,1.-t), 4.);

  //constrain to box bounds
  color *= step(box,0.);

  return color;
}

void main() {
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  float t = time + seed;
  
  //normalize uv
  vec2 uv0=uv;
  uv-=vec2(.5);
  uv*=max(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  
  vec3 color = vec3(0.0);
  for(int i=0;i<LAYERS;i++){
    vec3 layerCol = layer(uv+vec2(0.,0.33),(t * 0.01) * float(LAYERS) + float(i)/float(LAYERS));
    color += layerCol.rgb;
  }
  gl_FragColor=vec4(min(color, vec3(1.)),1.0);
}