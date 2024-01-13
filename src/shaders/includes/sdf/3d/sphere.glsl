/*
Sphere - exact   (https://www.shadertoy.com/view/Xds3zN)
*/

float sdSphere(vec3 p,float s)
{
    return length(p)-s;
}

#pragma glslify:export(sdSphere)