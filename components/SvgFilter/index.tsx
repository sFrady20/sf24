import { Box, type BoxProps } from "@mui/material";
import { useSpringValue, SpringValue, animated } from "@react-spring/web";
import { ReactNode, useCallback, useMemo } from "react";

const SvgFilter = (props: { children?: ReactNode } & BoxProps) => {
  const { children, ...rest } = props;

  const seed = useMemo(() => Math.random().toString(32).substring(7), []);
  const id = useCallback((part: string) => `${part}-${seed}`, [seed]);

  const spring: SpringValue<number> = useSpringValue(0, {
    to: 1,
    onChange: (x) => {},
    onRest: (result) => void spring.start(1 - result.value),
  });

  return (
    <>
      <svg
        viewBox="0 0 100 100"
        colorInterpolationFilters="sRGB"
        style={{
          width: "100vw",
          height: "calc(var(--1svh) * 100)",
          position: "fixed",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        <defs>
          <linearGradient id={id("gradient")} x1="0" x2="0" y1="0" y2="1">
            <animated.stop
              offset={spring.to((x) => `${Math.round(x * 2 * 100) - 100}%`)}
              stopColor="#FFFFFFFF"
            />
            <animated.stop
              offset={spring.to((x) => `${Math.round(x * 2 * 100)}%`)}
              stopColor="#00000000"
            />
          </linearGradient>

          <filter id={id("root")} x={0} y={0} width={"100%"} height={"100%"}>
            <feImage href={`#${id("box")}`} result={"mask"} />
            {/* <feImage href="/ramp.png" result={"mask"} /> */}
            {/* <feTurbulence
              type="turbulence"
              baseFrequency="0.05"
              numOctaves="2"
              result="turbulence"
            /> */}
            {/* <feComposite in={"SourceGraphic"} in2={"mask"} operator="in" /> */}
            <feDisplacementMap
              scale="20"
              xChannelSelector="R"
              yChannelSelector="R"
              in="SourceGraphic"
              in2="mask"
            />
          </filter>
        </defs>
        <rect
          id={id("box")}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${id("gradient")})`}
        />
      </svg>
      <Box
        {...rest}
        component={"div"}
        sx={{
          filter: `url(#${id("root")})`,
          ...rest.sx,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default SvgFilter;
