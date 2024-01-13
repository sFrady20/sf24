/*
Plane - exact
*/

float sdPlane(vec3 p,vec3 n,float h)
{
    // n must be normalized
    return dot(p,n)+h;
}

#pragma glslify:export(sdPlane)