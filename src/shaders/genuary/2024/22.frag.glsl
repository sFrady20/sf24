/*
Point - line - plane.

Wassily Kandinsky - Point and line to plane(https://www.wassilykandinsky.net/book-117.php)
Wikipedia: Wassily Kandinsky(https://en.wikipedia.org/wiki/Wassily_Kandinsky)
Wikipedia: Point–line–plane postulate(https://en.wikipedia.org/wiki/Point%E2%80%93line%E2%80%93plane_postulate)
2D Design Basics: Points, Lines, and Planes(https://www.aiga.org/sites/default/files/2021-03/2B_2D_Design_PointsLinesAndPlains.pdf)
Point, Line, Plane - The fundamental elements of design(https://bbadesign.jimdofree.com/design-foundations/point-line-plane/)
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;
uniform sampler2D scene;
uniform float enter;
uniform float exit;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  vec4 color=vec4(uv,sin(time),1.);
  gl_FragColor=color;
}