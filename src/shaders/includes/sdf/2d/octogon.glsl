//Regular Octogon - exact   (https://www.shadertoy.com/view/llGfDG)

float sdOctogon(in vec2 p,in float r)
{
    const vec3 k=vec3(-.9238795325,.3826834323,.4142135623);
    p=abs(p);
    p-=2.*min(dot(vec2(k.x,k.y),p),0.)*vec2(k.x,k.y);
    p-=2.*min(dot(vec2(-k.x,k.y),p),0.)*vec2(-k.x,k.y);
    p-=vec2(clamp(p.x,-k.z*r,k.z*r),r);
    return length(p)*sign(p.y);
}

#pragma glslify:export(sdOctogon)