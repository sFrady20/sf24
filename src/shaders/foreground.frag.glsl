uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform float enter;
uniform sampler2D scene;

#pragma glslify: smoke = require(./includes/smoke.glsl)
#pragma glslify: grain = require(glsl-film-grain)

void main(){
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 color = vec4(0.);

    //grain
    //color = mix(color, vec4(1.,1.,1.,1.), grain(uv, resolution.xy * 0.5, time * 2., 3.) * 0.4);

    //loading blanket
    vec4 sceneColor = texture2D(scene,uv);
    vec4 blanketColor = mix(vec4(229./255.,231./255.,232./255.,1.), sceneColor, sceneColor.a);
    color = mix(color, blanketColor, smoothstep(enter, enter + 0.1, smoke(uv + vec2(14.145+seed, 356.25-seed), time)));

    gl_FragColor=color;
}