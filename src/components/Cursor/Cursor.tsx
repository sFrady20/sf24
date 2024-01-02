import { useContext, useRef } from "react";
import { BoxProps, useTheme, useMediaQuery } from "@mui/material";
import { CursorContext } from "./Provider";
import { AnimatedBox } from "@/util/animated";
import { useSpring } from "@react-spring/web";
import { useAtom } from "jotai/react";

export function Cursor(props: BoxProps) {
  const { sx } = props;
  const cursor = useContext(CursorContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [effect] = useAtom(cursor.effect);

  const { size } = useSpring({
    size: effect?.type === "grow" ? effect.size : isMobile ? 0 : 10,
  });

  const elRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatedBox
      ref={elRef}
      sx={{
        zIndex: 500,
        backgroundColor: "common.white",
        color: "common.black",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translate(-50%, -50%)",
        position: "fixed",
        pointerEvents: "none",
        mixBlendMode: "difference",
        ...sx,
      }}
      style={{
        left: cursor.x,
        top: cursor.y,
        width: size,
        height: size,
      }}
    >
      {cursor.content}
    </AnimatedBox>
  );
}
