uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec3[4] palette;

//Glitch Art
//https://en.wikipedia.org/wiki/Glitch_art
vec3 col(float t){
    vec3 a = palette[0];
    vec3 b = palette[1];
    vec3 c = palette[2];
    vec3 d = palette[3];

    return a+b*cos(6.28318*(c*t+d));
}

void main(){
    vec2 uv = gl_FragCoord.xy/resolution.xy;
    vec4 color = vec4(col(uv.x),1.);
    gl_FragColor = color;
}