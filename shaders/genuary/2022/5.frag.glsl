uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

vec4 bgCol = vec4(.1,0.,.0,1.);
vec4 grainCol = vec4(1.);

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

float fbm(in vec2 st, in int octaves) {
  float value = 0.;
  float amp = .6;
  float freq = 0.;

  for(int i = 0; i < octaves; i++) {
    value += amp * noise(vec3(st, time));
    st *= 2.1;
    amp *= .35;
  }
  return value;
}

float expImpulse( float x, float k ) {
  float h = k*x;
  return h*exp(1.0-h);
}

float sdBox( in vec2 p, in vec2 b ) {
  vec2 d = abs(p)-b;
  return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

void grain ( inout vec4 col, inout vec2 uv ) {
  col = mix (col, grainCol, hash(vec3(uv, 1.)).x * 0.03);
}

void flames ( inout vec4 col, inout vec2 uv ) {
  //float nt = pow( fract(time / 10.), 2. ) * 2. - 1.;
  float nt = sin ( time / 5.) * 2. - 1.;
  float amt = pow( pow((fbm(uv * 6., 8) * 0.5 + 0.5), 5.) * sdBox(uv, vec2(0.5)) * 100. ,  (1. - nt) * 3.) - nt * 2.;
  col = vec4(vec3(1.,0.25,0.08) / amt, 1.);
}

void main() {
  float aspect = min (resolution.y/resolution.x, 1.);

  vec4 col = bgCol;
  vec2 uv = gl_FragCoord.xy;

  uv -= resolution * 0.5; // center
  uv /= resolution.x * aspect * 0.35; //scale

  flames(col, uv);
  grain(col, uv);


  gl_FragColor = col;
}
