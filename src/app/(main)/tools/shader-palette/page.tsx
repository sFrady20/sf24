"use client";

import { Shader } from "@/components/shader";
import frag from "@/shaders/palette-debug.frag.glsl";
import { useRef } from "react";
import { Vector3 } from "three";
import { useImmer } from "use-immer";

export default function () {
  const [palette, updatePalette] = useImmer([
    new Vector3(0.5, 0.5, 0.5),
    new Vector3(0.5, 0.5, 0.5),
    new Vector3(1.0, 1.0, 1.0),
    new Vector3(0.0, 0.33, 0.67),
  ]);

  return (
    <div className="pt-[130px] pb-10 flex-1">
      <div className="container flex flex-col gap-4">
        <Shader
          frag={frag}
          className="h-[10svh] rounded-lg overflow-hidden"
          uniforms={{ palette: { value: palette } }}
        />
        <div className="grid grid-cols-4 gap-4">
          {new Array(4).fill("").map((x, i) => (
            <div key={i} className="grid subgrid grid-cols-1 gap-4">
              {new Array(3).fill("").map((x, ii) => (
                <div key={ii} className="w-full flex flex-row gap-2">
                  <input
                    type="range"
                    max={1}
                    min={0}
                    step={0.01}
                    value={palette[i].getComponent(ii)}
                    className="flex-1"
                    onChange={(e) => {
                      updatePalette((x) => {
                        x[i].setComponent(ii, parseFloat(e.target.value));
                        return x;
                      });
                    }}
                  />
                  <input
                    className="bg-background border rounded-md py-2 border-foreground/10 w-[60px] text-center"
                    type="number"
                    max={1}
                    min={0}
                    step={0.1}
                    value={palette[i].getComponent(ii)}
                    onChange={(e) => {
                      updatePalette((x) => {
                        x[i].setComponent(ii, parseFloat(e.target.value));
                        return x;
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
