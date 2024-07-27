"use client";

import { Shader } from "@/components/shader";
import frag from "@/shaders/palette-debug.frag.glsl";
import exampleFrag from "@/shaders/palette-example.frag.glsl";
import { Vector3 } from "three";
import { useImmer } from "use-immer";
import Intro from "./intro.mdx";
import { useRef } from "react";
import { Code } from "@/components/code";
import { Slider } from "@/components/slider";

/*
vec3 a=vec3(0,0.21,0.17);
vec3 b=vec3(0,0.51,0.44);
vec3 c=vec3(0,0.62,0.46);
vec3 d=vec3(0,0,0);
*/

export default function () {
  const uniforms = useRef({
    palette: {
      value: [
        new Vector3(0.5, 0.5, 0.5),
        new Vector3(0.5, 0.5, 0.5),
        new Vector3(1.0, 1.0, 1.0),
        new Vector3(0.0, 0.33, 0.67),
      ],
    },
  }).current;

  const [palette, updatePalette] = useImmer([
    ...uniforms.palette.value.map((x) => [
      x.getComponent(0),
      x.getComponent(1),
      x.getComponent(2),
    ]),
  ]);

  return (
    <div className="pt-[130px] pb-[100px] flex-1">
      <div className="container flex flex-col gap-10 max-w-[1000px]">
        <article>
          <Intro />
        </article>
        <div className="flex flex-col gap-6">
          <Shader
            frag={frag}
            className="h-[10svh] rounded-lg overflow-hidden"
            uniforms={uniforms}
          />
          <div className="flex flex-col md:flex-row gap-4">
            {new Array(3).fill("").map((x, ii) => (
              <div
                key={ii}
                className="flex-1 flex flex-col gap-4 border-b border-foreground/20 md:border-none py-4"
              >
                {new Array(4).fill("").map((x, i) => (
                  <div key={i} className="w-full flex flex-row gap-2">
                    <Slider
                      max={1}
                      min={0}
                      step={0.01}
                      value={palette[i][ii]}
                      className="flex-1"
                      onChange={(e) => {
                        updatePalette((x) => {
                          const newValue = parseFloat(e.target.value);
                          x[i][ii] = newValue;
                          uniforms.palette.value[i].setComponent(ii, newValue);
                        });
                      }}
                    />
                    <input
                      className="bg-background border rounded-md py-2 border-foreground/10 w-[60px] text-center"
                      type="number"
                      max={1}
                      min={0}
                      step={0.1}
                      value={palette[i][ii]}
                      onChange={(e) => {
                        updatePalette((x) => {
                          const newValue = parseFloat(e.target.value);
                          x[i][ii] = newValue;
                          uniforms.palette.value[i].setComponent(ii, newValue);
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <Code language="glsl">{`vec3 palette(float t){
    vec3 a=vec3(${palette[0][0]},${palette[0][1]},${palette[0][2]});
    vec3 b=vec3(${palette[1][0]},${palette[1][1]},${palette[1][2]});
    vec3 c=vec3(${palette[2][0]},${palette[2][1]},${palette[2][2]});
    vec3 d=vec3(${palette[3][0]},${palette[3][1]},${palette[3][2]});
    
    return a+b*cos(6.28318*(c*t+d));
}`}</Code>
        <div className="flex flex-col gap-6">
          <h3 className="text-xl font-title">Example</h3>

          <Shader
            frag={exampleFrag}
            className="aspect-video rounded-lg overflow-hidden"
            uniforms={uniforms}
          />
        </div>
      </div>
    </div>
  );
}
