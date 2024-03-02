/*
Inspired by Islamic art.

Islamic star patterns(https://cs.uwaterloo.ca/~csk/other/starpatterns/)
Producing computer generated Islamic patterns(https://www.researchgate.net/figure/A-typical-workflow-for-producing-computer-generated-Islamic-patterns-Further_fig1_221448409)
Quasicrystals and Islamic patterns(https://medium.com/@orkhanart/forbidden-symmetry-unveiling-the-interconnections-of-quasicrystals-islamic-patterns-and-3caa27445d71)
Shape grammar model for Islamic patterns(https://www.semanticscholar.org/paper/Paper%3A-A-SHAPE-GRAMMAR-MODEL-TO-GENERATE-ISLAMIC-Ulu-Ener/fdf81ccdb9536d9374ec208c90cc3e0db6e60ae6)
More publications on/related to Islamic patterns(https://www.amazon.com/dp/B07N6CWWQ4?ref_=k4w_ss_dp_lp_uc)
Best practice in Islamic geometric design(https://www.amazon.com/dp/B07N6CWWQ4?ref_=k4w_ss_dp_lp_uc)
Islamic Star Patterns in Absolute Geometry(https://grail.cs.washington.edu/wp-content/uploads/2015/08/kaplan-2004-isp.pdf)
Computer Generated Islamic Star Patterns(https://archive.bridgesmathart.org/2000/bridges2000-105.pdf)
*/

uniform float time;
uniform float seed;
uniform vec2 resolution;

void main(){
  vec2 uv=gl_FragCoord.xy/resolution.xy;
  
  //normalize uv
  uv-=vec2(.5);
  uv*=min(vec2(resolution.x/resolution.y,1.),vec2(1.,resolution.y/resolution.x));
  
  vec4 color=vec4(abs(uv),sin(time),1.);
  gl_FragColor=color;
}