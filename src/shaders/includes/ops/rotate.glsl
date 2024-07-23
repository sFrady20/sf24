//2D rotate operation
//https://gist.github.com/ayamflow/c06bc0c8a64f985dd431bd0ac5b557cd

vec2 opRotate(vec2 p, float rotation)
{
    float mid = 0.5;
    return vec2(
        cos(rotation) * (p.x - mid) + sin(rotation) * (p.y - mid) + mid,
        cos(rotation) * (p.y - mid) - sin(rotation) * (p.x - mid) + mid
    );
}

vec2 opRotate(vec2 p, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (p.x - mid.x) + sin(rotation) * (p.y - mid.y) + mid.x,
      cos(rotation) * (p.y - mid.y) - sin(rotation) * (p.x - mid.x) + mid.y
    );
}

vec2 opRotate(vec2 p, float rotation, float mid)
{
    return vec2(
      cos(rotation) * (p.x - mid) + sin(rotation) * (p.y - mid) + mid,
      cos(rotation) * (p.y - mid) - sin(rotation) * (p.x - mid) + mid
    );
}

#pragma glslify:export(opRotate)