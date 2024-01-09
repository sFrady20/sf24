
float sdHexagon(in vec2 p,in float r)
{
    const vec3 k=vec3(-.866025404,.5,.577350269);
    p=abs(p);
    p-=2.*min(dot(k.xy,p),0.)*k.xy;
    p-=vec2(clamp(p.x,-k.z*r,k.z*r),r);
    return length(p)*sign(p.y);
}

#pragma glslify:export(sdHexagon)