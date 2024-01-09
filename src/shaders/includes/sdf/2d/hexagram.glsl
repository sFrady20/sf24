//Hexagram - exact   (https://www.shadertoy.com/view/tt23RR)

float sdHexagram(in vec2 p,in float r)
{
    const vec4 k=vec4(-.5,.8660254038,.5773502692,1.7320508076);
    p=abs(p);
    p-=2.*min(dot(k.xy,p),0.)*k.xy;
    p-=2.*min(dot(k.yx,p),0.)*k.yx;
    p-=vec2(clamp(p.x,r*k.z,r*k.w),r);
    return length(p)*sign(p.y);
}

#pragma glslify:export(sdHexagram)