
//https://www.youtube.com/watch?v=62-pRVZuS5c
float sdBox(in vec2 p,in vec2 b){
    vec2 d=abs(p)-b;
    return length(max(d,0.))+min(max(d.x,d.y),0.);
}

#pragma glslify:export(sdBox)