import { useEffect, useRef, useState } from "react";
import { useResize, useSpring } from "@react-spring/web";
import { Canvas, useFrame } from "@react-three/fiber";
import Slice from "~/components/Slice";
import { Box, BoxProps, CircularProgress } from "@mui/material";
import { useIntersectionObserver } from "usehooks-ts";
import { AnimatedBox } from "~/util/animated";

const DisableRender = () => useFrame(() => null, 1000);

export function Shader(props: { frag?: string; paused?: boolean } & BoxProps) {
  const { frag, paused, ...rest } = props;
  const containerEl = useRef<HTMLDivElement>(null);
  const uniforms = useRef({
    resolution: { value: [100, 100] },
    time: { value: 0 },
    cursor: { value: [0, 0] },
  }).current;
  const [firstRender, setFirstRender] = useState(true);
  const obs = useIntersectionObserver(containerEl, {});

  useEffect(() => {
    if (!firstRender && (paused || !obs?.isIntersecting)) return;
    let frame = 0;
    const cb = (now: number) => {
      uniforms.time.value = now / 1000;
      frame = requestAnimationFrame(cb);
    };
    frame = requestAnimationFrame(cb);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [paused, obs?.isIntersecting, firstRender]);

  useResize({
    container: containerEl as any,
    onChange: ({ value: { width, height } }) => {
      uniforms.resolution.value = [width, height];
    },
  });

  const anim = useSpring({
    fadeIn: firstRender ? 0.01 : 1,
  });

  return (
    <Box
      ref={containerEl}
      {...rest}
      sx={{ backgroundColor: "black", ...rest.sx }}
    >
      {firstRender && (
        <CircularProgress
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            color: "rgba(255,255,255,0.5)",
          }}
          size={16}
          thickness={8}
        />
      )}
      <AnimatedBox
        sx={{ width: "100%", height: "100%" }}
        style={{ opacity: anim.fadeIn }}
      >
        <Canvas dpr={[1, 1]}>
          {!firstRender && (paused || !obs?.isIntersecting) && (
            <DisableRender />
          )}
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
      </AnimatedBox>
    </Box>
  );
}
