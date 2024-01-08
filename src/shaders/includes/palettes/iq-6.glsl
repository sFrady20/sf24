vec3 palette(float t){
    vec3 a=vec3(.5,.5,.5);
    vec3 b=vec3(.5,.5,.5);
    vec3 c=vec3(2.,1.,0.);
    vec3 d=vec3(.50,.20,.25);
    
    return a+b*cos(6.28318*(c*t+d));
}

#pragma glslify:export(palette)