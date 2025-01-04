#pragma glslify:noise=require('../../includes/noise/simplex-3d')
#pragma glslify:sdBox=require('../../includes/sdf/2d/box')
#pragma glslify:opRotate=require('../../includes/ops/rotate')

/*
Layers upon layers upon layers.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

const int LAYERS = 10;

vec3 palette(float t){
  vec3 a=vec3(0.8,0.5,0.5);
  vec3 b=vec3(0.1,0.5,0.5);
  vec3 c=vec3(0.5,1,1);
  vec3 d=vec3(0,0.33,0.67);
  return a+b*cos(6.28318*(c*t+d));
}

vec3 layer(in vec2 uv, in float t){
  float t0 = t;
  float l = float(LAYERS);

  t = mod(t, 1.);

  uv.y *= 2.;
  uv.y += (t - 0.5);
  uv = opRotate(uv, sin(t0), 0.);
 
  float box = sdBox(uv,vec2(.2));

  //initialize color
  vec3 color = vec3(1.);

  //fade in and out
  color *= smoothstep(0.,1.,t) ;
  color *= smoothstep(1.,0.,t);

  //constrain to box bounds
  color *= step(box,0.);

  return color;
}

void main() {
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  
  vec2 uv0=uv;
  //normalize uv
  uv-=vec2(.5);
  uv*=min(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  
  vec3 color = vec3(0.0);
  for(int i=0;i<LAYERS;i++){
    float t=float(i)/float(LAYERS);
    vec3 layerCol = layer(uv,(time * 0.03) * float(LAYERS) + t);
    color += layerCol.rgb;
  }
  gl_FragColor=vec4(color,1.0);
}