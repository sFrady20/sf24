//Quadratic Circle - exact   (https://www.shadertoy.com/view/Nd3cW8)

float sdQuadraticCircle(in vec2 p)
{
    p=abs(p);if(p.y>p.x)p=p.yx;
    
    float a=p.x-p.y;
    float b=p.x+p.y;
    float c=(2.*b-1.)/3.;
    float h=a*a+c*c*c;
    float t;
    if(h>=0.)
    {
        h=sqrt(h);
        t=sign(h-a)*pow(abs(h-a),1./3.)-pow(h+a,1./3.);
    }
    else
    {
        float z=sqrt(-c);
        float v=acos(a/(c*z))/3.;
        t=-z*(cos(v)+sin(v)*1.732050808);
    }
    t*=.5;
    vec2 w=vec2(-t,t)+.75-t*t-p;
    return length(w)*sign(a*a*.5+b-1.5);
}

#pragma glslify:export(sdQuadraticCircle)