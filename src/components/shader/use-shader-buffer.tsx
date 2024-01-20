"use client";

import { useFBO } from "@react-three/drei";
import { createPortal, useFrame } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { Camera, Scene, Uniform } from "three";
import Slice from "../slice";

export function useShaderBuffer(options: {
  fragmentShader?: string;
  vertexShader?: string;
  width?: number;
  height?: number;
  uniforms?: { [key: string]: Uniform };
}) {
  const {
    fragmentShader,
    vertexShader,
    width = 100,
    height = 100,
    uniforms = {},
  } = options;

  const target = useFBO(width, height);

  const { scene, camera } = useMemo(() => {
    const scene = new Scene();
    const camera = new Camera();
    return { scene, camera };
  }, []);

  useEffect(() => {
    target.setSize(width, height);
  }, [width, height]);

  useFrame(({ gl }) => {
    gl.setRenderTarget(target);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  });

  return {
    target,
    portal: createPortal(
      <Slice>
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </Slice>,
      scene
    ),
  };
}
