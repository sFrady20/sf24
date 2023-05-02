uniform float time;

//3D gradient noise by Íñigo Quílez
vec3 hash(vec3 p){
    p=vec3(dot(p,vec3(127.1,311.7,74.7)),
    dot(p,vec3(269.5,183.3,246.1)),
    dot(p,vec3(113.5,271.9,124.6)));
    return-1.+2.*fract(sin(p)*43758.5453123);
}

float noise(in vec3 p){
    vec3 i=floor(p);
    vec3 f=fract(p);
    vec3 u=f*f*(3.-2.*f);
    return mix(mix(mix(dot(hash(i+vec3(0.,0.,0.)),f-vec3(0.,0.,0.)),
    dot(hash(i+vec3(1.,0.,0.)),f-vec3(1.,0.,0.)),u.x),
    mix(dot(hash(i+vec3(0.,1.,0.)),f-vec3(0.,1.,0.)),
    dot(hash(i+vec3(1.,1.,0.)),f-vec3(1.,1.,0.)),u.x),u.y),
    mix(mix(dot(hash(i+vec3(0.,0.,1.)),f-vec3(0.,0.,1.)),
    dot(hash(i+vec3(1.,0.,1.)),f-vec3(1.,0.,1.)),u.x),
    mix(dot(hash(i+vec3(0.,1.,1.)),f-vec3(0.,1.,1.)),
    dot(hash(i+vec3(1.,1.,1.)),f-vec3(1.,1.,1.)),u.x),u.y),u.z);
}

float fbm(in vec2 st,in int octaves){
    float value=0.;
    float amp=.6;
    float freq=0.;
    for(int i=0;i<octaves;i++){
        value+=amp*noise(vec3(st,time));
        st*=2.1;
        amp*=.35;
    }
    return value;
}
#pragma glslify:export(fbm)