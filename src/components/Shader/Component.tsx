import { useEffect, useRef } from "react";
import { useResize } from "@react-spring/web";
import { Canvas } from "@react-three/fiber";
import Slice from "~/components/Slice";
import { Box, BoxProps } from "@mui/material";

export function Shader(props: { frag?: string } & BoxProps) {
  const { frag, ...rest } = props;
  const containerEl = useRef<HTMLDivElement>(null);
  const uniforms = useRef({
    resolution: { value: [100, 100] },
    time: { value: 0 },
    cursor: { value: [0, 0] },
  }).current;

  useEffect(() => {
    let frame = 0;
    const cb = (now: number) => {
      uniforms.time.value = now / 1000;
      frame = requestAnimationFrame(cb);
    };
    frame = requestAnimationFrame(cb);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  useResize({
    container: containerEl as any,
    onChange: ({ value: { width, height } }) => {
      uniforms.resolution.value = [width, height];
    },
  });

  return (
    <Box ref={containerEl} {...rest}>
      <Canvas dpr={[1, 1]}>
        {frag && (
          <Slice key={frag}>
            <shaderMaterial fragmentShader={frag} uniforms={uniforms} />
          </Slice>
        )}
      </Canvas>
    </Box>
  );
}
