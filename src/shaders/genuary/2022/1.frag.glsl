uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

float border = 0.1;
float gridSize = 100.;

vec4 bgColor = vec4(vec3(.01),1.);
vec4 outerBgColor = vec4(vec3(0.001),1.);
vec4 dotColor = vec4(vec3(0.7), 1.);
vec4 outerDotColor = vec4(vec3(0.001), 1.);

//3D gradient noise by Íñigo Quílez
vec3 hash(vec3 p){
	p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
			  dot(p,vec3(269.5,183.3,246.1)),
			  dot(p,vec3(113.5,271.9,124.6)));
	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise(in vec3 p){
  vec3 i = floor( p );
  vec3 f = fract( p );
	vec3 u = f*f*(3.0-2.0*f);
  return mix( mix( mix( dot( hash( i + vec3(0.0,0.0,0.0) ), f - vec3(0.0,0.0,0.0) ), 
                        dot( hash( i + vec3(1.0,0.0,0.0) ), f - vec3(1.0,0.0,0.0) ), u.x),
                    mix( dot( hash( i + vec3(0.0,1.0,0.0) ), f - vec3(0.0,1.0,0.0) ), 
                        dot( hash( i + vec3(1.0,1.0,0.0) ), f - vec3(1.0,1.0,0.0) ), u.x), u.y),
              mix( mix( dot( hash( i + vec3(0.0,0.0,1.0) ), f - vec3(0.0,0.0,1.0) ), 
                        dot( hash( i + vec3(1.0,0.0,1.0) ), f - vec3(1.0,0.0,1.0) ), u.x),
                    mix( dot( hash( i + vec3(0.0,1.0,1.0) ), f - vec3(0.0,1.0,1.0) ), 
                        dot( hash( i + vec3(1.0,1.0,1.0) ), f - vec3(1.0,1.0,1.0) ), u.x), u.y), u.z );
}

float sdBox( in vec2 p, in vec2 b ) {
  vec2 d = abs(p)-b;
  return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

void sun(inout vec4 col, inout vec2 uv, in vec2 gUv) {
  float dist = sqrt(pow(uv.x,2.) + pow(uv.y,2.));
  float nO = step(dist, 0.3);
  float nBB = step(sdBox(gUv, vec2(1.)), 0.);
  col = mix (col, bgColor, nBB);
  col = mix (col, outerBgColor, (nBB*-1.+1.));
  col = mix (col, dotColor, nO * nBB);
  col = mix (col, outerDotColor, nO * (nBB*-1.+1.));
}

void magnify  (inout vec4 col, inout vec2 uv) {
  float aspect = min (resolution.y/resolution.x, 1.);

  vec2 center = vec2(0.5);
  vec2 c = cursor/resolution.x*aspect;

  center += (c - 0.5) * vec2(0.1,-0.1);

  float dx = (uv.x - center.x) / (resolution.x * 0.5);
  float dy = (uv.y - center.y) / (resolution.x * 0.5);
  
  float mag = pow(clamp( 1. - sqrt(pow(dx, 2.) + pow(dy, 2.)), .0, 1.), 5.);

  uv.x -= dx * mag * 2.;
  uv.y -= dy * mag * 2.;
  
  col = mix (col, vec4(1.), 0.);
}

void main() {
  float aspect = min (resolution.y/resolution.x, 1.);

  vec4 col = bgColor;
  vec2 uv = gl_FragCoord.xy;

  uv -= resolution * 0.5;
  uv /= resolution.x * aspect * 0.35;

  //magnify(col, uv);


  uv += vec2(noise(vec3(uv, time*0.5)*0.3), noise(vec3(uv, time*.5))*0.3);

  vec2 gUv = floor(uv * gridSize) / gridSize;

  uv = fract(uv * gridSize) - vec2(0.5);
  

  sun(col, uv, gUv);
  //col = vec4(gUv.xy, 0., 1.);

  gl_FragColor = col;
}
