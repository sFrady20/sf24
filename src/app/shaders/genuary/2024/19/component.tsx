"use client";

import { useShaderBuffer } from "@/components/shader/use-shader-buffer";
import frag from "@/shaders/genuary/2024/19.frag.glsl";

export function Scene() {
  const { target, portal } = useShaderBuffer({
    fragmentShader: frag,
  });

  return (
    <>
      {portal}
      <mesh>
        <boxGeometry />
        <meshBasicMaterial map={target.texture} color={"white"} />
      </mesh>
    </>
  );
}
