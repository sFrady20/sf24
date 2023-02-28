uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform vec2 cursor;
uniform vec2 scroll;
uniform float transition;

uniform vec2 cursorSpring;

float noise3D(vec3 p) {
	return fract(sin(dot(p ,vec3(12.9898,78.233,128.852))) * 43758.5453)*2.0-1.0;
}

float simplex3D(vec3 p) {
	float f3 = 1.0/3.0;
	float s = (p.x+p.y+p.z)*f3;
	int i = int(floor(p.x+s));
	int j = int(floor(p.y+s));
	int k = int(floor(p.z+s));
	
	float g3 = 1.0/6.0;
	float t = float((i+j+k))*g3;
	float x0 = float(i)-t;
	float y0 = float(j)-t;
	float z0 = float(k)-t;
	x0 = p.x-x0;
	y0 = p.y-y0;
	z0 = p.z-z0;
	int i1,j1,k1;
	int i2,j2,k2;
	if(x0>=y0)
	{
		if		(y0>=z0){ i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; } // X Y Z order
		else if	(x0>=z0){ i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; } // X Z Y order
		else 			{ i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; } // Z X Z order
	}
	else 
	{ 
		if		(y0<z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; } // Z Y X order
		else if	(x0<z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; } // Y Z X order
		else 			{ i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; } // Y X Z order
	}
	float x1 = x0 - float(i1) + g3; 
	float y1 = y0 - float(j1) + g3;
	float z1 = z0 - float(k1) + g3;
	float x2 = x0 - float(i2) + 2.0*g3; 
	float y2 = y0 - float(j2) + 2.0*g3;
	float z2 = z0 - float(k2) + 2.0*g3;
	float x3 = x0 - 1.0 + 3.0*g3; 
	float y3 = y0 - 1.0 + 3.0*g3;
	float z3 = z0 - 1.0 + 3.0*g3;			 
	vec3 ijk0 = vec3(i,j,k);
	vec3 ijk1 = vec3(i+i1,j+j1,k+k1);	
	vec3 ijk2 = vec3(i+i2,j+j2,k+k2);
	vec3 ijk3 = vec3(i+1,j+1,k+1);	     
	vec3 gr0 = normalize(vec3(noise3D(ijk0),noise3D(ijk0*2.01),noise3D(ijk0*2.02)));
	vec3 gr1 = normalize(vec3(noise3D(ijk1),noise3D(ijk1*2.01),noise3D(ijk1*2.02)));
	vec3 gr2 = normalize(vec3(noise3D(ijk2),noise3D(ijk2*2.01),noise3D(ijk2*2.02)));
	vec3 gr3 = normalize(vec3(noise3D(ijk3),noise3D(ijk3*2.01),noise3D(ijk3*2.02)));
	float n0 = 0.0;
	float n1 = 0.0;
	float n2 = 0.0;
	float n3 = 0.0;
	float t0 = 0.5 - x0*x0 - y0*y0 - z0*z0;
	if(t0>=0.0)
	{
		t0*=t0;
		n0 = t0 * t0 * dot(gr0, vec3(x0, y0, z0));
	}
	float t1 = 0.5 - x1*x1 - y1*y1 - z1*z1;
	if(t1>=0.0)
	{
		t1*=t1;
		n1 = t1 * t1 * dot(gr1, vec3(x1, y1, z1));
	}
	float t2 = 0.5 - x2*x2 - y2*y2 - z2*z2;
	if(t2>=0.0)
	{
		t2 *= t2;
		n2 = t2 * t2 * dot(gr2, vec3(x2, y2, z2));
	}
	float t3 = 0.5 - x3*x3 - y3*y3 - z3*z3;
	if(t3>=0.0)
	{
		t3 *= t3;
		n3 = t3 * t3 * dot(gr3, vec3(x3, y3, z3));
	}
	return 96.0*(n0+n1+n2+n3);
}

float sdRect(vec2 uv, vec2 tl, vec2 br) {
    vec2 d = max(tl-uv, uv-br);
    return length(max(vec2(0.0), d)) + min(0.0, max(d.x, d.y));
}

void ray (inout vec4 col, inout vec2 uv) {
  //rays
  col += vec4(
    .04 * 2. * simplex3D(vec3(uv/1541.325, time * 0.562)),
    .02 * 2. * simplex3D(vec3(uv/1443.654, time * 0.315)),
    .08 * 2. * simplex3D(vec3(uv/1612.252, time * 0.524)),
    1.
  );
}

void noise (inout vec4 col, inout vec2 uv) {
  //noise
  col +=  vec4(
    .2 * simplex3D(vec3(uv/1.325, time * 0.252)),
    .1 * simplex3D(vec3(uv/1.654, time * 0.352)),
    .4 * simplex3D(vec3(uv/1.252, time * 0.256)),
    1.
  );
}

void grid (inout vec4 col, inout vec2 uv) {
  vec2 oUv = vec2(uv);

  uv *= 10.;

  uv.x += sin(time + oUv.y * 6.125) * 0.3151;
  uv.y += cos(time + oUv.x * 5.5312) * 0.225;

  uv = fract(uv) - vec2(0.5);

  float borderDist = 1.+sdRect(uv, vec2(-.5), vec2(.5));
  col = mix(col, vec4(vec3(0.,0.3,0.4), 1.), pow(borderDist, 20.) * 0.3);
}

float expImpulse( float x, float k ) {
  float h = k*x;
  return h*exp(1.0-h);
}

void blackHole  (inout vec4 col, inout vec2 uv, out float mag) {
  vec2 center = resolution * 0.5;
  center += (cursorSpring - resolution * 0.5) * vec2(0.1,-0.1);

  float dx = (uv.x - center.x) / (resolution.x * 0.5);
  float dy = (uv.y - center.y) / (resolution.x * 0.5);
  
  mag = pow(clamp( 1. - sqrt(pow(dx, 2.) + pow(dy, 2.)), .0, 1.), 5.);

  float dist = 1. - sqrt(pow(uv.x - center.x, 2.) + pow(uv.y - center.y, 2.)) / resolution.x;
  float xMag = pow(expImpulse(fract((dist + time) / 4.) * 4., 4.), 1.);

  uv.x -= dx * (mag + xMag * 0.07) * 10000.;
  uv.y -= dy * (mag + xMag * 0.07) * 10000.;

  col = mix (col, vec4(vec3(0.1,0.1,0.2), 1.), xMag * 0.7);
}

void main() {
  vec2 aspect = vec2(1., resolution.y/resolution.x);

  vec2 uv = gl_FragCoord.xy;
  vec4 col = vec4(.04,.02,.08,1.);

  float bhMag;
  blackHole(col, uv, bhMag);

  ray(col, uv);
  //noise(col, uv);

  uv /= resolution.xy; //scale
  uv -= vec2(0.5); //translate
  uv *= aspect; //apply aspect

  vec2 gridUv = vec2(uv);
  grid(col, gridUv);

  col = mix(col, vec4(vec3(0.3,0.8,0.9), 1.), pow(smoothstep(0., 0.9, bhMag), 0.5));
  col = mix(col, vec4(vec3(0.), 1.), pow(smoothstep(0., 0.2, bhMag), 20.));

  gl_FragColor = col;
}
