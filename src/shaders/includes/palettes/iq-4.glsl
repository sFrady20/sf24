vec3 palette(float t){
    vec3 a=vec3(.5,.5,.5);
    vec3 b=vec3(.5,.5,.5);
    vec3 c=vec3(1.,1.,.5);
    vec3 d=vec3(.80,.90,.30);
    
    return a+b*cos(6.28318*(c*t+d));
}

#pragma glslify:export(palette)