import { SpringValue, useSpring } from "@react-spring/web";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CursorTargetEffect } from "./Target";

export const CursorContext = createContext<{
  spring: {
    x: SpringValue<number>;
    y: SpringValue<number>;
    scale: SpringValue<number>;
  };
  currentTargetEffect: CursorTargetEffect | null;
  handleTargetEnter: (effect: CursorTargetEffect) => void;
  handleTargetExit: (effect: CursorTargetEffect) => void;
}>({
  spring: {} as any,
  currentTargetEffect: null,
  handleTargetEnter() {},
  handleTargetExit() {},
});

export function CursorProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [spring, springRef] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
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

  const [currentTargetEffect, setCurrentTargetEffect] =
    useState<CursorTargetEffect | null>(null);

  return (
    <CursorContext.Provider
      value={{
        spring,
        currentTargetEffect,
        handleTargetEnter(effect) {
          setCurrentTargetEffect(effect);
        },
        handleTargetExit() {
          setCurrentTargetEffect(null);
        },
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}
