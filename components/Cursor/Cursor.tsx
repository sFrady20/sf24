import { animated } from "@react-spring/web";
import { useContext } from "react";
import { Box, BoxProps, useTheme } from "@mui/material";
import { CursorContext } from "./Provider";
import { AnimatedBox } from "util/animated";

export function Cursor(props: {} & BoxProps) {
  const { sx } = props;

  const { spring } = useContext(CursorContext);

  return (
    <AnimatedBox
      className={
        "transform -translate-x-1/2 -translate-y-1/2 fixed pointer-events-none mix-blend-difference"
      }
      sx={{
        zIndex: 1000,
        backgroundColor: "common.white",
        color: "common.black",
        borderRadius: "100%",
        ...sx,
      }}
      style={{
        left: spring.x,
        top: spring.y,
        width: spring.scale.to((x) => x * 10),
        height: spring.scale.to((x) => x * 10),
      }}
    />
  );
}
