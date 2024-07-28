uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 pointer;
uniform vec2 pointers[10];
uniform vec3[4] palette;

#pragma glslify:smoothUnion=require('../includes/ops/smooth-union')
#pragma glslify:rotate=require('../includes/ops/rotate')
#pragma glslify:noise3d=require('../includes/noise/3d')

//Genuaray 2022/18: VHS.
#define V vec2(0.,1.)
#define PI 3.14159265
#define VHSRES vec2(480.0,240.0)

vec3 paletteColor(float t){
  vec3 a=palette[0];
  vec3 b=palette[1];
  vec3 c=palette[2];
  vec3 d=palette[3];
  return a+b*cos(6.28318*(c*t+d));
}

//https://www.shadertoy.com/view/mdSBRz
vec2 curve(vec2 p, float curvature, float power)
{
    p.y += (p.y - .5) * curvature * pow(abs(p.x - .5), power);
    p.x += (p.x - .5) * curvature * pow(abs(p.y - .5), power);
    return p;
}

float sdWindows(vec2 p) {
  return smoothUnion(0.2-abs(0.5 - p.x)+pow(abs((0.5 - p.y)), 1.3 + p.y * p.x), -0.12+abs(0.5 - p.y), 0.2);
}


void main(){
  vec2 p = gl_FragCoord.xy;
  vec2 uv = p/resolution.xy;

  float st = seed * -200. + time;

  //curve uv
  uv = curve(uv, 3., 6.);

  //save uv
  vec2 uv2 = uv;

  //glitch uv
  uv.x += ( noise3d( vec3( uv.y / 10.0, st / 10.0, 1. ) / 1.0 ) - 0.5 ) / VHSRES.x * 1.0;
  uv.x += ( noise3d( vec3( uv.y, st * 10.0, 1. ) ) - 0.5 ) / VHSRES.x * 1.0;

  vec3 col = vec3(0.);

  float d = smoothstep(-0.1, 0.2, sdWindows(rotate(uv + vec2(uv.x + uv.y, 0.) * sin(st * 0.085), st * 0.1)));
  col = mix(col, paletteColor(sin(d * 0.2 + st * 0.1 + uv.x * 0.7)*0.5+0.5), d);

  // tape crease
  float tcPhase = smoothstep( 0.9, 0.99, sin( uv.y * 3.0 - ( st * 0.3 + 0.03 * noise3d( vec3(st * vec2( 0.67, 0.59 ), 1.) ) ) * PI * 1.2 ) );
  float tcNoise = smoothstep( 0.6, 1.0, noise3d( vec3( uv.y * 4.77, st * 0.5, 1.) ) );
  float tc = tcPhase * tcNoise;

  float cn = tcNoise * ( 0.3 + 0.7 * tcPhase );
  if ( 0.29 < cn ) {
    vec2 uvt = ( uv + V.yx * noise3d( vec3( uv.y, st, 1.) ) ) * vec2( 0.1, 1.0 );
    float n0 = noise3d( vec3(uvt, 1.) );
    float n1 = noise3d( vec3(uvt + V.yx / VHSRES.x, 1.) );
    if ( n1 < n0 ) {
      col = mix( col, 2.0 * V.yyy, pow( n0, 10.0 ) * 0.4 );
    }
  }

  //regular noise
  col += vec3(1.) * noise3d(vec3(uv, st * 0.1)) * 0.15;

  //limit curve
  col = (1.-smoothstep(0.475, 0.525, abs(uv2.x -.5))) *  (1.-smoothstep(0.475, 0.525, abs(uv2.y -.5))) * col;


  gl_FragColor = vec4(col, 1.);
}