uniform float time;
uniform float seed;
uniform vec2 cursor;
uniform vec2 resolution;
uniform sampler2D scene;

#pragma glslify:smoke=require(./includes/noise/smoke.glsl)

void main(){
    vec4 color=vec4(0.);
    // vec2 uv = gl_FragCoord.xy / resolution.xy;
    
    // color = vec4(0., 0., 0., 1.);
    
    // //depth
    // float elevation = smoke(uv + vec2(seed, -seed), time);
    
    // //vignette
    // float dist = sqrt(pow(0.5 - uv.x, 2.) + pow(0.5 - uv.y, 2.));
    // elevation = mix(elevation, 0., smoothstep(0., 1., dist));
    
    // //color
    // color = mix(color, vec4(0.,1.,1.,1.), elevation);
    
    // //dim
    // color.a *= 0.4;
    
    // //scene
    // vec4 sceneColor = texture2D(scene,uv);
    // color = color + sceneColor;
    
    gl_FragColor=color;
}