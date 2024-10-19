"use client";

import { Draft } from "immer";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

export function makeStore<R>(
  stateCreator: StateCreator<R, [["zustand/immer", unknown]]>
) {
  const creator = () => create(immer<R>(stateCreator));

  const Context = createContext(creator());

  const Provider = function StoreProvider(props: { children?: ReactNode }) {
    const { children } = props;
    const store = useMemo(creator, []);
    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  const use = () => useContext(Context);

  return {
    Provider,
    use,
  };
}
