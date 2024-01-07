//Circle - exact   (https://www.shadertoy.com/view/3ltSW2)

float sdCircle(vec2 p,float r)
{
    return length(p)-r;
}

#pragma glslify:export(sdCircle)