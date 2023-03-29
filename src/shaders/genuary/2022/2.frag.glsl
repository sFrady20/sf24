uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

#define PATTERN_TIME_SCALE 0.8
#define LED_SIZE 2.

int octaves = 10;
vec3[7] palette = vec3[](
  vec3(0.7,0.3,0.3),
  vec3(0.3,0.7,0.3),
  vec3(0.3,0.3,0.7),
  vec3(0.7,0.7,0.3),
  vec3(0.3,0.7,0.7),
  vec3(0.1,0.1,0.2),
  vec3(0.2,0.2,0.3)
);
int paletteSize = 7;

float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float perlin(in vec2 p){ //or maybe not perlin idunno
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);

	float res = mix(
		mix(random(ip),random(ip+vec2(1.0,0.0)),u.x),
		mix(random(ip+vec2(0.0,1.0)),random(ip+vec2(1.0,1.0)),u.x),u.y);

	return res*res;
}

float fbm(in vec2 st) {
  float value = 0.;
  float amp = .6;
  float freq = 0.;

  for(int i = 0; i < octaves; i++) {
    value += amp * perlin(st);
    st *= 2.1;
    amp *= .35;
  }
  return value;
}

vec3 rgbToHsl(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hslToRgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float pattern(in vec2 p) {
  float f = 0.;
  vec2 q = vec2(
    fbm(p + time * PATTERN_TIME_SCALE * .2 + vec2(0.)),
    fbm(p + time * PATTERN_TIME_SCALE * .3 + vec2(2.4, 4.8))
  );
  vec2 r = vec2(
    fbm(q + time * PATTERN_TIME_SCALE * .3 + 4. * q + vec2(3., 9.)),
    fbm(q + time * PATTERN_TIME_SCALE * .2 + 8. * q + vec2(2.4, 8.4))
  );
  f = fbm(p + r * 2. + time * .09);
  return f;
}

const float indexMatrix[4] = float[](0.,  8.,
                                     12., 4.);

float indexValue() {
    float x = mod(gl_FragCoord.x, 2.);
    float y = mod(gl_FragCoord.y, 2.);
    return indexMatrix[int(x + y * 2.)] / 4.;
}

float hueDistance(float h1, float h2) {
    float diff = abs((h1 - h2));
    return min(abs((1.0 - diff)), diff);
}

vec3[2] closestColors(float hue) {
    vec3 closest = vec3(-2., 0., 0.);
    vec3 secondClosest = vec3(-2., 0., 0.);
    
    vec3 temp;
    for (int i = 0; i < paletteSize; ++i) {
        temp = rgbToHsl(palette[i]);
        float tempDistance = hueDistance(temp.x, hue);
        if (tempDistance < hueDistance(closest.x, hue)) {
            secondClosest = closest;
            closest = temp;
        } else {
            if (tempDistance < hueDistance(secondClosest.x, hue)) {
                secondClosest = temp;
            }
        }
    }
    
    return vec3[2](
      closest, secondClosest
    );;
}

vec3 dither(vec3 color) {
    vec3 hsl = rgbToHsl(color);
    vec3[2] cs = closestColors(hsl.x);
    float d = indexValue();
    float hueDiff = hueDistance(hsl.x, cs[0].x) / hueDistance(cs[1].x, cs[0].x);
    return hslToRgb(hueDiff < d ? cs[0] : cs[1]);
}

void show(inout vec4 col, inout vec2 uv) {
  float r = pattern(uv / 94. + 3825.235);
  float g = pattern(uv / 87. - 23.253);
  float b = pattern(uv / 93. + 2353.2);
  col = vec4(vec3(r,g,b), 1.);
}

void dither(inout vec4 col, inout vec2 uv) {
  vec2 pixel = mod(floor(uv/LED_SIZE), 8.0)/8.0;
  float factor = 1.3;
  vec3 oCol = col.rgb; 
  
  //oCol = floor(col.rgb * factor + vec3(0.5)) * factor;
  oCol = dither(oCol);

  col = vec4(oCol, 1.);
}

void main() {
  vec2 aspect = vec2(1., resolution.y/resolution.x);

  vec4 col = vec4(0.,0.,0.,1.);
  vec2 uv = gl_FragCoord.xy;

  show(col, uv);
  dither(col, uv);

  // uv /= resolution.xy; //scale
  // uv -= vec2(0.5); //translate
  // uv *= aspect; //apply aspect

  //show(col, uv);

  gl_FragColor = col;
}
