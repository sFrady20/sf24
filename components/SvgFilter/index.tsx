import { Box, type BoxProps } from "@mui/material";
import { useSpringValue, animated, useChain } from "@react-spring/web";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

const useFrame = (callback: (delta: number) => void) => {
  const handle = useRef(0);
  const cb = useCallback(() => {
    callback(0);
    handle.current = requestAnimationFrame(cb);
  }, []);
  useEffect(() => {
    handle.current = requestAnimationFrame(cb);
    return () => {
      cancelAnimationFrame(handle.current);
    };
  }, []);
};

const SvgFilter = (props: { children?: ReactNode } & BoxProps) => {
  const { children, ...rest } = props;

  const seed = useMemo(() => Math.random().toString(32).substring(7), []);
  const id = useCallback((part: string) => `${part}-${seed}`, [seed]);

  const spring = useSpringValue(0, {
    to: 1,
    onChange: (result) => {
      console.log(result);
    },
    onRest: (result) => {
      console.log(result);
      spring.start(1 - result.value);
    },
  });

  return (
    <>
      <svg
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          width: "100vw",
          height: "calc(var(--1svh) * 100)",
        }}
      >
        <defs>
          <filter id={id("root")} x={0} y={0} width={"100%"} height={"100%"}>
            {/* <feImage href={"#box"} /> */}

            <feImage href={`#${id("box")}`} result={"mask"} />
            <feComposite in={"SourceGraphic"} in2={"mask"} operator="in" />

            {/* <feImage href={"#box"} result={"mask"} />
            <feDisplacementMap
              in="SourceGraphic"
              in2="mask"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
            /> */}
          </filter>

          <linearGradient id={id("gradient")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#00000000" />
            <animated.stop
              offset={spring.to((x) => `${Math.round(x * 100)}%`)}
              stopColor={"#FF0000FF"}
            />
            <stop offset="100%" stopColor="#00000000" />
          </linearGradient>

          <rect
            id={id("box")}
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${id("gradient")})`}
          />
        </defs>
      </svg>
      <Box
        component={"div"}
        {...rest}
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
