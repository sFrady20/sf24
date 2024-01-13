//Lava lamp.

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform float enter;
uniform float exit;

#pragma glslify:noise=require('../../includes/noise/simplex-3d')
#pragma glslify:sdSphere=require('../../includes/sdf/3d/sphere')
#pragma glslify:opSmooth=require('../../includes/ops/smooth-union')

#define MAX_DIST 3.
#define CLOSE_ENOUGH.001
#define K.2

const vec3 liquidColor=vec3(.1,0.,.17);
const vec3 hotColor=vec3(1.,1.,0.);
const vec3 waxColor=vec3(1.,0.,0);

const float blobRate=.2;
const float blobFreq=3.;
const float blobAmp=.02;
const int blobCount=3;
const float blobScaleVariance=.05;

const float moveRate=.1;

struct ray{
  vec3 o;
  vec3 d;
};

struct hit{
  float sdf;
  float heat;
  vec3 col;
};

struct light{
  vec3 d;
  float i;
};

float sdBlob(vec3 p,float s,float u){
  p+=noise(vec3(p.x*blobFreq+time*blobRate*.237128+u*.24184,p.y*blobFreq+time*blobRate*.214717+u*-.124918,p.z*blobFreq+time*blobRate*.187461+u*.125817))*blobAmp;
  return sdSphere(p,s);
}

float sdScene(vec3 p){
  float d=float(MAX_DIST);
  float bd=0.,bm=float(blobCount-1);
  float ix,is,fi;
  
  vec3 nx=vec3(sin(time*moveRate*.01489198)+seed*24.1581),
  ny=vec3(sin(time*moveRate*.01612878)-seed*15.15918),
  nz=vec3(sin(time*moveRate*.011232245)+seed*51.1491),
  ns=vec3(sin(time*moveRate*.0070712)-seed*14.187),
  center;
  
  vec3 id;
  
  for(int i=0;i<blobCount;++i){
    fi=float(i);
    id=vec3(i*16,i*32,i*25);
    ix=(fi/bm)-.5;
    
    center=vec3(
      noise(nx+id*13.1384)*.35+sin(id.x*11.418+time*moveRate)*.15,
      noise(ny+id*10.11424)*.16+sin(id.y*4.127-fi*14.19+time*moveRate)*.28,
      1.+noise(nz+id*12.35172)*.02+sin(id.z*1.1487+time*moveRate)*.02
    );
    
    bd=sdBlob(
      center-p,
      .1+noise(ns+id)*blobScaleVariance,
      fi*5.13816
    );
    d=opSmooth(bd,d,K);
  }
  
  return d;
}

hit scene(vec3 p){
  float sd=sdScene(p);
  float heat=pow(max(-sd,0.),.2);
  vec3 col=mix(waxColor,hotColor,heat);
  return hit(sd,heat,col);
}

//from iq https://iquilezles.org/articles/normalsSDF
vec3 calcNormal(in vec3 p){
  const vec2 k=vec2(1,-1);
  return normalize(k.xyy*sdScene(p+k.xyy*CLOSE_ENOUGH)+
  k.yyx*sdScene(p+k.yyx*CLOSE_ENOUGH)+
  k.yxy*sdScene(p+k.yxy*CLOSE_ENOUGH)+
  k.xxx*sdScene(p+k.xxx*CLOSE_ENOUGH));
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  
  //normalize uv
  uv-=vec2(.5);
  uv*=min(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  
  //water effect (sorta)
  //uv+=vec2(noise(vec3(uv*3.,time*.28257))*.01,noise(vec3(uv*3.,time*.11248))*.01);
  
  light l=light(normalize(vec3(1.,1.,1.)),1.);
  ray r=ray(vec3(uv,0.),normalize(vec3(uv,4.)));
  
  float d=0.;
  float b=0.;
  vec3 n=vec3(0.);
  hit h;
  float minSdf=100.;
  
  while(d<MAX_DIST){
    vec3 rp=r.o+r.d*d;
    h=scene(rp);
    minSdf=min(minSdf,h.sdf);
    if(h.sdf<CLOSE_ENOUGH){
      n=calcNormal(rp);
      break;//h and n remains
    }
    d+=max(rp.z,CLOSE_ENOUGH);
  }
  
  vec3 color=vec3(0.);
  if(d>MAX_DIST){
    float radiantHeat=max(1.-pow(minSdf,.2),0.);
    color=liquidColor;
    color=mix(color,waxColor,-uv.y*.3-pow(abs(uv.x),4.));
    color=mix(color,waxColor,pow(radiantHeat,1.4));
  }else{
    color=h.col;
    //color=mix(color,waxColor,(1.-max(dot(l.d,n),0.))*.3);//shadows
  }
  
  gl_FragColor=vec4(color,1.);
}