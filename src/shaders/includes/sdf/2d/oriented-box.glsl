//Oriented Box-exact(https://www.shadertoy.com/view/stcfzn)

float sdOrientedBox(in vec2 p,in vec2 a,in vec2 b,float th)
{
    float l=length(b-a);
    vec2 d=(b-a)/l;
    vec2 q=(p-(a+b)*.5);
    q=mat2(d.x,-d.y,d.y,d.x)*q;
    q=abs(q)-vec2(l,th)*.5;
    return length(max(q,0.))+min(max(q.x,q.y),0.);
}

#pragma glslify:export(sdOrientedBox)