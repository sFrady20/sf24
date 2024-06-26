"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Slice from "@/components/slice";
import { useIntersectionObserver } from "usehooks-ts";
import { useSize } from "./size";
import { cn } from "@/utils/cn";

const DisableRender = () => useFrame(() => null, 1000);

export interface ShaderProps extends HTMLAttributes<HTMLDivElement> {
  frag?: string;
  paused?: boolean;
  seed?: number;
}

export function Shader(props: ShaderProps) {
  const { frag, paused, className, seed, ...rest } = props;

  const containerEl = useRef<HTMLDivElement>(null);

  const uniforms = useRef({
    resolution: { value: [100, 100] },
    time: { value: 0 },
    cursor: { value: [0, 0] },
    seed: { value: seed || Math.random() },
  }).current;

  const [firstRender, setFirstRender] = useState(true);
  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (!firstRender && (paused || !isIntersecting)) return;
    let frame = 0;
    const cb = (now: number) => {
      uniforms.time.value = now / 1000;
      frame = requestAnimationFrame(cb);
    };
    frame = requestAnimationFrame(cb);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [paused, isIntersecting, firstRender]);

  const size = useSize(containerEl);
  useEffect(() => {
    uniforms.resolution.value = size;
  }, [size]);

  return (
    <div
      ref={(r) => {
        (containerEl as any).current = r;
        ref(r);
      }}
      {...rest}
      className={cn("bg-black relative", className)}
    >
      {firstRender && (
        <i className="icon-[svg-spinners--90-ring-with-bg] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 color-[white]" />
      )}
      <div className="w-full h-full">
        <Canvas dpr={[1, 1]}>
          {!firstRender && (paused || !isIntersecting) && <DisableRender />}
          {frag && (
            <Slice key={frag}>
              <shaderMaterial
                fragmentShader={frag}
                uniforms={uniforms}
                onUpdate={() => {
                  if (firstRender) setFirstRender(false);
                }}
              />
            </Slice>
          )}
        </Canvas>
      </div>
    </div>
  );
}
