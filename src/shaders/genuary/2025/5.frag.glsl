#pragma glslify:noise=require('../../includes/noise/3d')
#pragma glslify:opRotate=require('../../includes/ops/rotate')

/*
Isometric Art (No vanishing points).
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

// https://www.stevenfrady.com/tools/palette?p=[[0.73,0.62,1],[1,1,1],[0.2,0.35,0.3],[0.61,0.52,0.53]]
vec3 palette(float t){
  float ft = floor(time * 0.3);
  
  vec3 a=vec3(
    sin(ft + 3.5262) * 0.5 + 0.5,
    sin(ft + 64.62) * 0.5 + 0.5,
    sin(ft + 31.268) * 0.5 + 0.5
  );
  vec3 b=vec3(1,1,1);
  vec3 c=vec3(
    0.2 + (sin(ft + 11.35285) * 0.5 + 0.5) * 0.3,
    0.35 + (sin(ft + 12.35285) * 0.5 + 0.5) * 0.3,
    0.3 + (sin(ft + 13.35285) * 0.5 + 0.5) * 0.3
  );
  vec3 d=vec3(0.61,0.52,0.53);
  return a+b*cos(6.28318*(c*t+d));
}

// https://www.stevenfrady.com/tools/palette?p=[[0.97,0.82,0.7],[0.92,0.8,0.63],[0.39,0.51,0.37],[0.49,0.53,0.55]]
vec3 paletteB(float t){
  vec3 a=vec3(0.97,0.82,0.7);
  vec3 b=vec3(0.92,0.8,0.63);
  vec3 c=vec3(0.39,0.51,0.37);
  vec3 d=vec3(0.49,0.53,0.55);
  return a+b*cos(6.28318*(c*t+d));
}

bool C(vec2 p, int x, int y){
  return sin(1e3*length (ceil(p)+vec2(x,y))) > noise(vec3((ceil(p)+vec2(x,y)) * 10., seed + floor(time * 0.3))) * 0.2 + 0.8;
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  
  //normalize uv
  vec2 uv0=uv;
  uv-=vec2(.5);
  uv*=max(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));

  uv.x += sin(time * 0.03 + seed);
  uv.y += cos(time * 0.03 + seed);

  //isometric-ify
  uv *= mat2(1.,-2.,1.,2.);

  //find grid coords (p)
  float s = 10.;
  vec2 p = vec2(floor(uv.x * s), floor(uv.y * s));
  //transform uv coords to tile space
  uv = fract(uv * s);

  //init background color  
  vec4 color=vec4(vec3(0.), 1.);
  
  //calc wall value
  bool r = uv.x+uv.y > 1.;
  vec2 g = uv * 0.1;
  float w =  C(p, 1,-1)       ? 0.9
           : C(p, 1, 0) &&  r ? .6 + g.y
           : C(p, 0,-1) && !r ? .4 - g.x
           : C(p, 0, 0) ?   r ? .4 - g.x : .6 + g.y
           : C(p, -1,0)       ? 0.
           :                 .2;
  
  
  color = vec4(palette(w), 1.);

  gl_FragColor=color;
}