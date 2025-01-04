#pragma glslify:noise=require('../../includes/noise/simplex-3d')
#pragma glslify:sdPlane=require('../../includes/sdf/3d/plane')

/*
Layers upon layers upon layers.
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

const int LAYERS = 1;

vec3 palette(float t){
  vec3 a=vec3(0.8,0.5,0.5);
  vec3 b=vec3(0.1,0.5,0.5);
  vec3 c=vec3(0.5,1,1);
  vec3 d=vec3(0,0.33,0.67);
  return a+b*cos(6.28318*(c*t+d));
}

vec3 layer(in vec2 uv, in float t){
  vec3 color = vec3(sdPlane(vec3(uv.x+t*.1, uv.y+t*.1, 0.), vec3(0.,0.,1.), 1.));
  //color *= step(max(abs(uv.x), abs(uv.y)), .1);
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
    vec3 layerCol = layer(uv,time*0.1+t*0.1);
    color = mix(color,layerCol.rgb,length(layerCol.rgb));
  }
  gl_FragColor=vec4(color,1.0);
}