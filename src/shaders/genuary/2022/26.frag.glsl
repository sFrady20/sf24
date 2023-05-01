//Airport carpet.
//https://www.google.com/search?q=airport+carpet&tbm=isch
//https://www.bing.com/images/search?q=airport+carpet&first=1&cw=2179&ch=1116
//https://en.wikipedia.org/wiki/Portland_International_Airport_carpet
//https://www.instagram.com/myhotelcarpet/

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec4 color = vec4(uv,sin(time),1.);
  gl_FragColor = color;
}