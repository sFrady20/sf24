uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform float enter;
uniform float exit;
uniform sampler2D scene;

#pragma glslify:smoke=require(./includes/smoke.glsl)

void main(){
    vec2 uv=gl_FragCoord.xy/resolution.xy;
    vec4 color=vec4(0.);
    
    //vec4 blanketColor = vec4(229./255.,231./255.,232./255.,1.);
    float presence=smoothstep(1.-exit,1.-exit+.1,smoke(uv+vec2(14.145+seed,356.25-seed),time));
    
    float displaceX=sin(uv.x*20.+time)*.5+.5;
    float displaceY=cos(uv.y*30.+time)*.5+.5;
    
    color=vec4(displaceX,displaceY,presence,1.);
    
    gl_FragColor=color;
}