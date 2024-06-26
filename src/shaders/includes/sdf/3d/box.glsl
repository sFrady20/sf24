/*
Box - exact   (Youtube Tutorial with derivation: https://www.youtube.com/watch?v=62-pRVZuS5c)
*/

float sdBox(vec3 p,vec3 b)
{
    vec3 q=abs(p)-b;
    return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);
}

#pragma glslify:export(sdBox)