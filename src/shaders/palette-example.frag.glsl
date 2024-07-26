/*
Wobbly function day.
[Wobbly Functions](https://piterpasma.nl/articles/wobbly) are a name I’ve given to smoothly undulating formulas made from modulated sine waves. Usually it’s formulas of the form:
sin(a * b + c + d * sin(e * f + g)) + sin(h * i + j + k * sin(l * m + n)) + ...
Or something along those lines. Don’t worry about angles or trigonometric identities, just go with the wobble!
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec3[4]palette;

vec3 paletteColor(float t){
  vec3 a=palette[0];
  vec3 b=palette[1];
  vec3 c=palette[2];
  vec3 d=palette[3];
  return a+b*cos(6.28318*(c*t+d));
}

const float timeScale=.05;

// exponential smooth min by Inigo Quilez
// https://iquilezles.org/articles/smin/
float smin(float a,float b){
  float k=10.;
  float res=exp2(-k*a)+exp2(-k*b);
  return-log2(res)/k;
}

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  float st=time*timeScale+seed*1000.;
  
  //normalize uv
  uv-=vec2(.5);
  uv*=min(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  
  vec3 color=vec3(0.);
  
  float t=sin(1.23636*st+1.23675*sin(1.236*uv.y)+10.3243256*uv.x-1.2672*sin(.245847*uv.x-1.12451*st+1.134516*uv.y+1.1435*sin(1.2385*uv.y+1.8157*uv.y)));
  
  vec3 wobble=vec3(
    sin(1.1837*st-.82184*sin(.62626*uv.x+st*3.3198-sin(st*.4138+uv.y*.591))-.32578*uv.x-2.1847*sin(1.245847*uv.x+1.182467*st+.23872*uv.y+1.239*sin(-1.59*st+.15534*uv.y)-1.1248*sin(.1848*uv.y+st*.19518)+1.43726*sin(.145*uv.x+.8157*st)+1.43726*sin(.8217*uv.y+4.8157*st))),
    sin(-.91957*st+1.15136*sin(2.2158*uv.x+st*5.1259)+1.15131*sin(5.37683*uv.x-1.26574*sin(1.1257*uv.x)+1.425642*st-1.32156*sin(7.9372*uv.x+st*.92784)+sin(1.58127*st)+1.1237*sin(7.62161*uv.y-3.43616*st))),
    sin(.9145*st-.598*sin(1.15418*uv.x+sin(4.2184*st))+1.29847*sin(3.245847*uv.x-5.1215*uv.x+1.582467*st+1.23872*sin(1.148*uv.y+.9127*st)+1.43726+1.2536*sin(1.5827*uv.y-1.3581*st)*sin(1.8217*uv.x+1.8157*st)))
  );
  color=max(paletteColor(smin(wobble.r,wobble.b)),max(paletteColor(smin(wobble.b,wobble.g)),paletteColor(smin(wobble.g,wobble.r))));
  
  gl_FragColor=vec4(color,1.);
}