vec3 palette(float t){
    vec3 a=vec3(.8,.5,.4);
    vec3 b=vec3(.2,.4,.2);
    vec3 c=vec3(2.,1.,1.);
    vec3 d=vec3(0.,.25,.25);
    
    return a+b*cos(6.28318*(c*t+d));
}

#pragma glslify:export(palette)