"use client";

import { createContextStore, useMemoStore } from "@/utils/store";
import { ReactNode, useEffect } from "react";

type AppState = {
  isMenuOpen: boolean;
  mouse: { x: number; y: number };
  window: { width: number; height: number };
};

export const { Context: AppContext, hook: useApp } =
  createContextStore<AppState>({
    isMenuOpen: false,
    mouse: { x: 0, y: 0 },
    window: { width: 0, height: 0 },
  });

export function AppProvider(props: { children?: ReactNode }) {
  const { children } = props;

  const store = useMemoStore<AppState>({
    isMenuOpen: false,
    mouse: { x: 0, y: 0 },
    window: { width: 0, height: 0 },
  });

  useEffect(() => {
    const moveListener = (e: MouseEvent) => {
      store.setState({ mouse: { x: e.clientX, y: e.clientY } });
    };
    const sizeListener = () => {
      store.setState({
        window: { width: window.innerWidth, height: window.innerHeight },
      });
    };
    window.addEventListener("mousemove", moveListener);
    window.addEventListener("resize", sizeListener);
    return () => {
      window.removeEventListener("mousemove", moveListener);
      window.removeEventListener("resize", sizeListener);
    };
  }, []);

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
}
