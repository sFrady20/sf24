//Progress bar / indicator / loading animation.

uniform float time;
uniform float seed;
uniform vec2 resolution;

#pragma glslify:noise=require('../../includes/noise/simplex-3d')
#pragma glslify:grain=require(glsl-film-grain)

#define PI 3.1415926535897932384626433832795

const float rSpeed=.2;
const float blobFrequency=3.;
const float blobAmplitude=.03;

vec2 sdBlob(in vec2 p,in vec2 center,in float size,float timeOffset){
  float a=(degrees(atan(center.y-p.y,center.x-p.x))+180.)/360.;
  float lt=fract((time+timeOffset)*rSpeed);
  float v1=noise(vec3(p.x*blobFrequency+time*rSpeed+timeOffset*25.46362,p.y*blobFrequency+time*rSpeed+timeOffset*1.23267,center.x*46.32582));
  float d=distance(center,p)-size+v1*blobAmplitude;
  return vec2(d,a);
}

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float impulse(float x,float k){
  float h=k*x;
  return h*exp(1.-h);
}

float pcurve(float x,float a,float b)
{
  float k=pow(a+b,a+b)/(pow(a,a)*pow(b,b));
  return k*pow(x,a)*pow(1.-x,b);
}

vec4 bubble(vec2 p,in float timeOffset){
  float lt=fract((time+timeOffset)*rSpeed);
  vec2 bl=sdBlob(p,vec2(0.),.07,timeOffset);
  float d=bl.x;
  float i=impulse(-d*5.,max((pow(pcurve(lt,5.,20.),.8)*40.),0.));
  return vec4(vec3(i),i);
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(0.,0.,0.,1.);
  
  //normalize uv
  uv-=vec2(.5);
  uv*=vec2(1.,resolution.y/resolution.x);
  
  vec4 c=vec4(0.);
  for(float i=-1.;i<=1.;++i){
    c=bubble(uv+vec2(i*.2,0.),1.*i);
    color=max(color,c);
  }
  
  color+=noise(vec3(uv+time*rSpeed*.13596,time*rSpeed*.2425))*.2;
  
  color=mix(color,vec4(1.,1.,1.,1.),grain(uv,resolution.xy*.5,time*2.,3.)*.1);
  
  gl_FragColor=color;
}