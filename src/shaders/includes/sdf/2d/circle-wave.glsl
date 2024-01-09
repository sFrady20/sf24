//Circle Wave - exact   (https://www.shadertoy.com/view/stGyzt)

float sdCircleWave(in vec2 p,in float tb,in float ra)
{
    tb=3.1415927*5./6.*max(tb,.0001);
    vec2 co=ra*vec2(sin(tb),cos(tb));
    p.x=abs(mod(p.x,co.x*4.)-co.x*2.);
    vec2 p1=p;
    vec2 p2=vec2(abs(p.x-2.*co.x),-p.y+2.*co.y);
    float d1=((co.y*p1.x>co.x*p1.y)?length(p1-co):abs(length(p1)-ra));
    float d2=((co.y*p2.x>co.x*p2.y)?length(p2-co):abs(length(p2)-ra));
    return min(d1,d2);
}

#pragma glslify:export(sdCircleWave)