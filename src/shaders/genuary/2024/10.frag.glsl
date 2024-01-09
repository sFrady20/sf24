//Hexagonal.

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

#pragma glslify:noise=require('../../includes/noise/simplex-3d')
#pragma glslify:palette=require('../../includes/palettes/iq-1')
#pragma glslify:grain=require(glsl-film-grain)

const vec2 s=vec2(1,1.7320508);

vec4 getHex(vec2 p)
{
  vec4 hC=floor(vec4(p,p-vec2(.5,1))/s.xyxy)+.5;//not flat top
  vec4 h=vec4(p-hC.xy*s,p-(hC.zw+.5)*s);
  return dot(h.xy,h.xy)<dot(h.zw,h.zw)
  ?vec4(h.xy,hC.xy)
  :vec4(h.zw,hC.zw+.5);
}

void main(){
  vec2 p=gl_FragCoord.xy;
  vec2 uv=p/resolution;
  
  //normalize uv
  uv-=vec2(.5);
  uv*=min(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  
  uv*=40.;
  
  vec4 hex=getHex(uv);
  vec2 id=hex.zw;
  vec2 c=hex.xy;
  
  float a=time*.1;
  mat2 rot=mat2(cos(a),sin(a),-sin(a),cos(a));
  
  float n=max(0.,noise(vec3(id*.05*rot,time*.1))*.5+.5);
  float shift=n*4.+c.x;
  vec3 col=palette(max(shift,.1));
  
  col=mix(vec3(0.),col,smoothstep(.4,1.,smoothstep(shift,0.,.4)));
  
  vec4 color=vec4(col,1.);
  gl_FragColor=mod(color,11.);
}