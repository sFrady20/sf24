float sdSegment(in vec2 p,in vec2 a,in vec2 b)
{
    vec2 pa=p-a,ba=b-a;
    float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);
    return length(pa-ba*h);
}

#pragma glslify:export(sdSegment)