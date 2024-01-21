"use client";

import { Canvas } from "@react-three/fiber";
import { Scene } from "./component";
import { OrbitControls } from "@react-three/drei";

export default function () {
  return (
    <div className="w-full h-[100dvh]">
      <Canvas dpr={[1, 1]}>
        <OrbitControls />
        <Scene />
      </Canvas>
    </div>
  );
}
