uniform float time;
uniform float seed;
uniform vec2 cursor;
uniform vec2 resolution;
uniform sampler2D scene;

void main(){
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 color = vec4(uv,0.,1.);
    gl_FragColor=color;
}