import { Box, BoxProps } from "@mui/material";
import { SpringValue, useSpringValue } from "@react-spring/web";
import { ReactNode, useContext, useRef, useState } from "react";
import { CursorContext } from "./Provider";

export type CursorTargetEffect =
  | {
      type: "grow";
    }
  | {
      type: "outline";
    }
  | undefined;

export function CursorTarget(
  props: {
    effect: CursorTargetEffect;
    children?:
      | ReactNode
      | ((opt: {
          hover: SpringValue<number>;
          isHovered: boolean;
        }) => ReactNode);
  } & Omit<BoxProps, "component" | "children">
) {
  const { effect, children, onMouseEnter, onMouseLeave, ...rest } = props;
  const elRef = useRef<HTMLDivElement>(null);
  const cursor = useContext(CursorContext);

  const hover = useSpringValue(0);
  const [isHovered, setHovered] = useState(false);

  return (
    <Box
      component="div"
      ref={elRef}
      onMouseEnter={(e) => {
        hover.start(1);
        cursor.handleTargetEnter(effect);
        setHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        hover.start(0);
        cursor.handleTargetExit(effect);
        setHovered(false);
        onMouseLeave?.(e);
      }}
      {...rest}
    >
      {typeof children === "function"
        ? children({ hover, isHovered })
        : children}
    </Box>
  );
}
