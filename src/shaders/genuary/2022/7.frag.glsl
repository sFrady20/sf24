//Sol LeWitt Wall Drawing.
//https://massmoca.org/sol-lewitt/
//https://observer.com/2012/10/here-are-the-instructions-for-sol-lewitts-1971-wall-drawing-for-the-school-of-the-mfa-boston/
//https://publicdelivery.org/sol-lewitt-wall-drawings/
//https://illmindofryza1.wordpress.com/2016/08/17/sol-lewitt-wall-painting-118/

uniform float time;
uniform vec2 resolution;

#pragma glslify:noise=require('../../includes/simplex3d')

const float PI = 3.14;

const int paletteSize = 7;
const vec3[paletteSize]palette=vec3[](
  vec3(.87, .84, .85),//bg
  vec3(.73, .06, .16), 
  vec3(.14, .56, .29),
  vec3(.85, .07, .13),
  vec3(.16, .37, .63),
  vec3(.30, .20, .50),
  vec3(.95, .62, .20)
);

//https://www.youtube.com/watch?v=62-pRVZuS5c
float sdBox( in vec2 p, in vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

//https://www.shadertoy.com/view/3lVGWt
mat2 rotationMatrix(float angle) {
	angle *= PI / 180.0;
    float s=sin(angle), c=cos(angle);
    return mat2( c, -s, s, c );
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 col = palette[0];

  vec2 fRes = resolution.yy;
  vec2 fUv = gl_FragCoord.xy / fRes;

  float h = floor(fUv.x+time*0.1);
  vec2 fhUv = mod(vec2(fUv.x+time*0.1, fUv.y), vec2(1.));

  vec2 wfUv = fUv;
  wfUv.y += sin(wfUv.x*3.)*0.2;
  wfUv *= rotationMatrix(noise(vec3(h+15.42,5.262,21.262))*360.);

  int stripeY = int(floor(wfUv.y * 10. + time * 0.5));
  int stripeX = int(floor(wfUv.x * 5.+noise(vec3(float(stripeY)*14.3727+time*.1))));

  vec3 b1Col = palette[int(mod(float(stripeY + stripeX),float(paletteSize)-1.)+1.)];
  vec2 b1Uv = (fhUv - vec2(0.5)) * vec2(2.15, 2.25);
  float b1Sd = sdBox( b1Uv, vec2(1.) );
  col = mix(col, b1Col, step(b1Sd, 0.));

  gl_FragColor = vec4(col, 1.);
}