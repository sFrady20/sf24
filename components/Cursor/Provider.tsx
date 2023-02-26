import { SpringValue, useSpring } from "@react-spring/web";
import { atom, Atom } from "jotai/vanilla";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CursorTargetEffect } from "./Target";

export const CursorContext = createContext<{
  x: SpringValue<number>;
  y: SpringValue<number>;
  content?: ReactNode;
  effect: Atom<CursorTargetEffect | null>;
  handleTargetEnter: (
    effect: Atom<CursorTargetEffect | null>,
    content?: ReactNode
  ) => void;
  handleTargetExit: () => void;
}>({
  x: {} as any,
  y: {} as any,
  content: undefined,
  effect: atom(null),
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

  const [effect, setEffect] = useState<Atom<CursorTargetEffect | null>>(
    atom(null)
  );
  const [content, setContent] = useState<ReactNode>();

  return (
    <CursorContext.Provider
      value={{
        x,
        y,
        content,
        effect,
        handleTargetEnter(effect, content) {
          setContent(content);
          setEffect(effect);
        },
        handleTargetExit() {
          setContent(undefined);
          setEffect(atom(null));
        },
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}
