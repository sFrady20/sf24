import { useContext, useRef } from "react";
import { BoxProps } from "@mui/material";
import { CursorContext } from "./Provider";
import { AnimatedBox } from "util/animated";
import { useSpring } from "@react-spring/web";
import { useAtom } from "jotai/react";
import { createPortal } from "react-dom";

export function Cursor(props: BoxProps) {
  const { sx } = props;

  const cursor = useContext(CursorContext);

  const [effect] = useAtom(cursor.effect);

  const { size } = useSpring({
    size: effect?.type === "grow" ? effect.size : 10,
  });

  const elRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatedBox
      ref={elRef}
      className={"mix-blend-difference"}
      sx={{
        zIndex: 1000,
        backgroundColor: "common.white",
        color: "common.black",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        pointerEvents: "none",
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
