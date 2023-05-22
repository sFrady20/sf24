//Single curve only.

precision mediump float;

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

const int paletteSize=7;
const vec3[paletteSize]palette=vec3[](
  vec3(0.05490196, 0.08235294, 0.13333333),//bg
  vec3(0.11372549, 0.18823529, 0.1372549),
  vec3(0.40784314, 0.41568627, 0.24313725),
  vec3(0.40784314, 0.41568627, 0.24313725),
  vec3(0.55686275, 0.51764706, 0.22745098),
  vec3(0.56862745, 0.60784314, 0.18431373),
  vec3(0.70588235, 0.71764706, 0.37647059)
);

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec3 col=palette[0];

  uv+=vec2(sin(uv.y*10.),sin(uv.x*10.))*0.1;
  
  float cd = 1.-(uv.x+uv.y);

  col=mix(mix(palette[0], palette[2], abs(cd * 2.)),mix(palette[2], palette[0], abs(cd * 2.)),step(0.,cd));

  gl_FragColor=vec4(col, 1.);
}