//Regular Pentagon - exact   (https://www.shadertoy.com/view/llVyWW)

float sdPentagon(in vec2 p,in float r)
{
    const vec3 k=vec3(.809016994,.587785252,.726542528);
    p.x=abs(p.x);
    p-=2.*min(dot(vec2(-k.x,k.y),p),0.)*vec2(-k.x,k.y);
    p-=2.*min(dot(vec2(k.x,k.y),p),0.)*vec2(k.x,k.y);
    p-=vec2(clamp(p.x,-r*k.z,r*k.z),r);
    return length(p)*sign(p.y);
}

#pragma glslify:export(sdPentagon)