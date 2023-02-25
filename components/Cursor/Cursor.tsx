import { useContext } from "react";
import { BoxProps } from "@mui/material";
import { CursorContext } from "./Provider";
import { AnimatedBox } from "util/animated";
import { useSpring } from "@react-spring/web";

export function Cursor(props: {} & BoxProps) {
  const { sx } = props;

  const cursor = useContext(CursorContext);

  const { size } = useSpring({
    size: cursor.effect?.type === "grow" ? cursor.effect.size : 10,
  });

  return (
    <AnimatedBox
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
        position: "fixed",
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
      {cursor.effect?.type === "grow" ? cursor.effect.content : null}
    </AnimatedBox>
  );
}
