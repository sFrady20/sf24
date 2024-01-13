
float opSmoothIntersection(float d1,float d2,float k)
{
    float h=clamp(.5-.5*(d2+d1)/k,0.,1.);
    return mix(d2,-d1,h)+k*h*(1.-h);
}

#pragma glslify:export(opSmoothIntersection)