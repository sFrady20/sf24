/*
Plane - exact
n must be normalized
*/

float sdPlane(vec2 p,vec3 n,float h)
{
    return dot(vec3(p,0.),n)+h;
}

float sdPlane(vec3 p,vec3 n,float h)
{
    return dot(p,n)+h;
}

#pragma glslify:export(sdPlane)