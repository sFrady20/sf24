
#define PI 3.1415926535897932384626433832795

vec3 palette(float t){
    const int paletteSize=7;
    
    const vec3[paletteSize]colors=vec3[](
        vec3(88.,139.,139.),
        vec3(255.,255.,255.),
        vec3(255.,213.,194.),
        vec3(242.,143.,59.),
        vec3(200.,85.,61.),
        vec3(45.,48.,71.),
        vec3(147.,183.,190.)
    );
    
    float n=t*float(paletteSize),f=fract(n);
    int a=int(floor(n)),b=int(floor(mod(float(a),float(paletteSize)))),c=int(floor(mod(float(a+1),float(paletteSize))));
    return vec3(mix(colors[b]/255.,colors[c]/255.,-(cos(PI*f)-1.)/2.));
}

#pragma glslify:export(palette)