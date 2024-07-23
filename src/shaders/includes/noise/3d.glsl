//Noise 3d

float noise3d(vec3 p){
    return fract(sin(dot(p,vec3(12.9898,78.233,128.852)))*43758.5453)*2.-1.;
}

#pragma glslify:export(noise3d)