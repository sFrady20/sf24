
float opRound(in vec2 p,in float r)
{
    return sdShape(p)-r;
}

#pragma glslify:export(opRound)