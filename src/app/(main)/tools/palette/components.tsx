"use client";

import { Shader } from "@/components/shader";
import { IUniform, Vector2, Vector3 } from "three";
import { Updater, useImmer } from "use-immer";
import { ReactNode, createContext, useContext, useMemo, useRef } from "react";
import { Code } from "@/components/code";
import { Slider } from "@/components/slider";
import frag from "@/shaders/palette-generator/debug.frag.glsl";
import exampleFrag1 from "@/shaders/palette-generator/example-1.frag.glsl";
import exampleFrag2 from "@/shaders/palette-generator/example-2.frag.glsl";
import exampleFrag3 from "@/shaders/palette-generator/example-3.frag.glsl";
import exampleFrag4 from "@/shaders/palette-generator/example-4.frag.glsl";

/*
vec3 a=vec3(0,0.21,0.17);
vec3 b=vec3(0,0.51,0.44);
vec3 c=vec3(0,0.62,0.46);
vec3 d=vec3(0,0,0);
*/

/*
Cool one
vec3 a=vec3(0.56,0.53,0.86);
vec3 b=vec3(0.79,0.22,0.29);
vec3 c=vec3(0.84,1,1);
vec3 d=vec3(0.49,0.33,0.67);
*/

const defaultUniforms = {
  palette: {
    value: [
      new Vector3(0.5, 0.5, 0.5),
      new Vector3(0.5, 0.5, 0.5),
      new Vector3(1.0, 1.0, 1.0),
      new Vector3(0.0, 0.33, 0.67),
    ],
  },
};
const defaultPalette = [
  ...defaultUniforms.palette.value.map((x) => [
    x.getComponent(0),
    x.getComponent(1),
    x.getComponent(2),
  ]),
];

const PaletteToolContext = createContext({
  palette: defaultPalette,
  updatePalette: (() => {}) as Updater<number[][]>,
  uniforms: defaultUniforms,
});

export const PaletteProvider = function (props: { children?: ReactNode }) {
  const { children } = props;

  const [palette, updatePalette] = useImmer(defaultPalette);

  return (
    <PaletteToolContext.Provider
      value={{
        palette,
        updatePalette,
        uniforms: defaultUniforms,
      }}
    >
      {children}
    </PaletteToolContext.Provider>
  );
};

export const PaletteEditor = function () {
  const {
    palette,
    updatePalette,
    uniforms: uniformsCtx,
  } = useContext(PaletteToolContext);

  const uniforms = useMemo(
    () => ({ ...uniformsCtx, resolution: { value: new Vector2(100, 100) } }),
    []
  );

  return (
    <div className="flex flex-col gap-6">
      <Shader
        frag={frag}
        className="h-[10svh] rounded-lg overflow-hidden sticky md:relative top-[80px] md:top-0 z-[20] border-none"
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
  );
};

const PaletteExample = function (props: { frag: string }) {
  const { frag } = props;

  const { uniforms: uniformsCtx } = useContext(PaletteToolContext);

  const uniforms = useMemo(
    () => ({ ...uniformsCtx, resolution: { value: new Vector2(100, 100) } }),
    []
  );

  return (
    <Shader
      frag={frag}
      className="aspect-video rounded-lg overflow-hidden col-span-12 md:col-span-6"
      uniforms={uniforms}
    />
  );
};

export const PaletteExamples = function () {
  return (
    <div className="grid grid-cols-12 gap-6">
      <PaletteExample frag={exampleFrag2} />
      <PaletteExample frag={exampleFrag1} />
      <PaletteExample frag={exampleFrag4} />
      <PaletteExample frag={exampleFrag3} />
    </div>
  );
};

export const PaletteExport = function () {
  const { palette } = useContext(PaletteToolContext);

  return (
    <Code
      language="glsl"
      className="p-4 bg-foreground/10 rounded"
    >{`vec3 palette(float t){
  vec3 a=vec3(${palette[0][0]},${palette[0][1]},${palette[0][2]});
  vec3 b=vec3(${palette[1][0]},${palette[1][1]},${palette[1][2]});
  vec3 c=vec3(${palette[2][0]},${palette[2][1]},${palette[2][2]});
  vec3 d=vec3(${palette[3][0]},${palette[3][1]},${palette[3][2]});
  return a+b*cos(6.28318*(c*t+d));
}`}</Code>
  );
};
