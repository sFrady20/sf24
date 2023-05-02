//Trade styles with a friend.

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

#pragma glslify:noise=require('../../includes/simplex3d')

const int paletteSize=7;
const vec3[paletteSize]palette=vec3[](
  vec3(11.,24.,37.),
  vec3(57.,1.,248.),
  vec3(242.,53.,157.),
  vec3(107.,44.,233.),
  vec3(12.,198.,111.),
  vec3(57.,1.,248.),
  vec3(11.,24.,37.)
);

vec3 gradient(float x){
  x=mod(x,1.);
  vec3 color=vec3(0.);
  for(int i=0;i<paletteSize;++i){
    color=mix(color,palette[i]/255.,max(0.,1.-abs(x*float(paletteSize)-float(i))*.5));
  }
  return color;
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  float aspect=resolution.y/resolution.x;
  
  vec2 ruv=floor((gl_FragCoord.xy/resolution.xy)*(resolution.xy*.2))/(resolution.xy*.2);
  float dd=(1.-distance(uv*vec2(1.,aspect),(ruv+vec2(.0025))*vec2(1.,aspect)));
  
  float r=pow(noise(vec3(uv.x+time*.4,uv.y+time*.074,uv.x-time*.35))+.5,2.)+.3;
  
  vec3 g=gradient(
    +noise(vec3(uv,1.))
    +r*.5
    +sin(ruv.y*200.+time)+1.
    +sin(pow(ruv.x+.5,1.+sin(noise(vec3(time*.01,uv.y,1.))+pow(uv.x*2.,2.)))*.01)*100.+1.
    +sin(uv.x)*2.
    +sin(uv.y)*2.
    +time
  );
  
  vec3 bg=palette[0]/vec3(255.);
  
  vec4 color=vec4(mix(bg,mix(bg,g,step(.997,length(dd))),r),1.);
  
  gl_FragColor=color;
}