uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

//https://www.shadertoy.com/view/XtGfzw
float sdCross( in vec2 p, in vec2 b, float r ) 
{
    p = abs(p); p = (p.y>p.x) ? p.yx : p.xy;
    vec2  q = p - b;
    float k = max(q.y,q.x);
    vec2  w = (k>0.0) ? q : vec2(b.y-p.x,-k);
    return sign(k)*length(max(w,0.0)) + r;
}

void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 color= vec4(uv,step(0.5, sdCross(uv, vec2(1.), 0.)),1.);
  gl_FragColor=color;
}