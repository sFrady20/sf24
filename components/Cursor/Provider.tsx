import { SpringValue, useSpring } from "@react-spring/web";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CursorTargetEffect } from "./Target";

export const CursorContext = createContext<{
  x: SpringValue<number>;
  y: SpringValue<number>;
  effect: CursorTargetEffect | null;
  handleTargetEnter: (effect: CursorTargetEffect) => void;
  handleTargetExit: () => void;
}>({
  x: {} as any,
  y: {} as any,
  effect: null,
  handleTargetEnter() {},
  handleTargetExit() {},
});

export function CursorProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [{ x, y }, springRef] = useSpring(() => ({
    x: 0,
    y: 0,
    config: {
      tension: 400,
    },
  }));

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      springRef.start({ x: e.clientX, y: e.clientY });
    };
    document.body.addEventListener("mousemove", listener);
    return () => {
      document.body.removeEventListener("mousemove", listener);
    };
  }, []);

  const [effect, setEffect] = useState<CursorTargetEffect | null>(null);

  return (
    <CursorContext.Provider
      value={{
        x,
        y,
        effect,
        handleTargetEnter(effect) {
          setEffect(effect);
        },
        handleTargetExit() {
          setEffect(null);
        },
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}
