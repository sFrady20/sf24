//Sol LeWitt Wall Drawing.
//https://massmoca.org/sol-lewitt/
//https://observer.com/2012/10/here-are-the-instructions-for-sol-lewitts-1971-wall-drawing-for-the-school-of-the-mfa-boston/
//https://publicdelivery.org/sol-lewitt-wall-drawings/
//https://illmindofryza1.wordpress.com/2016/08/17/sol-lewitt-wall-painting-118/

uniform float time;
uniform vec2 resolution;

const vec3[7]palette=vec3[](
  vec3(11.,24.,37.), //bg
  vec3(57.,1.,248.),
  vec3(242.,53.,157.),
  vec3(107.,44.,233.),
  vec3(12.,198.,111.),
  vec3(57.,1.,248.),
  vec3(11.,24.,37.)
);

//https://www.shadertoy.com/view/XtGfzw
float sdCross(in vec2 p, in vec2 b, float r) {
  p = abs(p);
  p = (p.y > p.x) ? p.yx : p.xy;
  vec2 q = p - b;
  float k = max(q.y, q.x);
  vec2 w = (k > 0.0) ? q : vec2(b.y - p.x, -k);
  return sign(k) * length(max(w, 0.0)) + r;
}

//https://www.shadertoy.com/view/Xl2yDW
float sdEquilateralTriangle( in vec2 p )
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - 1.0;
    p.y = p.y + 1.0/k;
    if( p.x+k*p.y>0.0 ) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp( p.x, -2.0, 0.0 );
    return -length(p)*sign(p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec3 col = palette[0]/vec3(255.);

  vec2 fRes = resolution.yy;
  vec2 fUv = gl_FragCoord.xy / fRes;

  vec3 crossCol = palette[1]/vec3(255.);
  vec2 crossUv = uv;
  crossUv -= vec2(.5);
  crossUv *= 2.5;
  float crossSd = sdCross(crossUv, vec2(1., 0.2), 0.);

  col = mix(col, crossCol, step(crossSd, 0.));

  gl_FragColor = vec4(col, 1.);
}