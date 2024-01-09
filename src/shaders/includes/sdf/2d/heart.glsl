//Heart - exact   (https://www.shadertoy.com/view/3tyBzV)

float sdHeart(in vec2 p)
{
    p.x=abs(p.x);
    
    if(p.y+p.x>1.)
    return sqrt(dot2(p-vec2(.25,.75)))-sqrt(2.)/4.;
    return sqrt(min(dot2(p-vec2(0.,1.)),
    dot2(p-.5*max(p.x+p.y,0.))))*sign(p.x-p.y);
}

#pragma glslify:export(sdHeart)