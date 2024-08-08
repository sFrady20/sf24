"use client";

import { Draft } from "immer";
import { ReactNode, createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export function makeStore<R>(
  stateCreator: <T = R>(
    set: (draft: T | Partial<T> | ((state: Draft<T>) => void)) => void,
    get: () => T
  ) => R
) {
  const creator = () => create(immer<R>((set, get) => stateCreator(set, get)));

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
