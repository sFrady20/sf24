//Screensaver.

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

#pragma glslify:noise=require('../../includes/noise/simplex-3d')
#pragma glslify:sdOrientedBox=require('../../includes/sdf/2d/oriented-box')

const int paletteSize=12;
const vec3[paletteSize]palette=vec3[](
  vec3(0),
  vec3(0),
  vec3(88.,139.,139.),
  vec3(255.,255.,255.),
  vec3(255.,213.,194.),
  vec3(242.,143.,59.),
  vec3(200.,85.,61.),
  vec3(45.,48.,71.),
  vec3(147.,183.,190.),
  vec3(0),
  vec3(0),
  vec3(0.)
);

const float lineLength=90.;
const float lineThiccness=1.5;
const float boxSize=25.;
const float nScale=.06;
const float rSpeed=.06;

vec4 sdBoxLine(in int x,in int y){
  float n=noise(vec3(float(x)*nScale*.2562+time*rSpeed,float(y)*nScale*.5829+time*rSpeed,float(y)*nScale*.1529-time*rSpeed))*.5+.5;
  float r=n*3.14*2.;
  
  vec2 a=vec2(float(x)*boxSize,float(y)*boxSize);
  vec2 b=vec2(a.x+sin(r)*lineLength,a.y+cos(r)*lineLength);
  
  float d=max(1.-(sdOrientedBox(gl_FragCoord.xy,a,b,0.)-lineThiccness),0.);
  
  if(d==0.){
    return vec4(0.);
  }
  
  float colN=noise(vec3(float(x)*nScale*.5676+time*rSpeed,float(y)*nScale*.26457+time*rSpeed,float(y)*nScale*.1535-time*rSpeed))*.5+.5;
  float sColN=colN*float(paletteSize);
  float colF=fract(sColN);
  int colA=int(floor(sColN));
  int colB=int(floor(mod(float(colA+1),float(paletteSize+1))));
  
  float ld=distance(gl_FragCoord.xy,a)/lineLength;
  
  return vec4(mix(palette[colA]/255.,palette[colB]/255.,colF),pow(ld,1.));
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  
  int cols=int(resolution.x/boxSize);
  int rows=int(resolution.y/boxSize);
  
  int mx=int(gl_FragCoord.x/boxSize);
  int my=int(gl_FragCoord.y/boxSize);
  vec2 m=vec2(float(mx),float(my));
  
  int c=int(ceil(lineLength/boxSize)+1.);//max neighbor distance
  
  int xs=max(-c,mx-c);
  int xe=min(cols+c,mx+c);
  
  int ys=max(-c,my-c);
  int ye=min(cols+c,my+c);
  
  vec4 col=vec4(0.);
  float curD=0.;
  for(int x=xs;x<xe;++x){
    for(int y=ys;y<ye;++y){
      float dist=distance(vec2(float(x),float(y)),m);
      vec4 newCol=sdBoxLine(x,y);
      if(newCol.a>0.&&dist>curD){
        col=newCol;
        curD=dist;
      }
    }
  }
  
  vec4 color=vec4(mix(vec3(0.),col.rgb,col.a),1.);
  gl_FragColor=color;
}