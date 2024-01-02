import { ReactNode, createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import { PersistOptions, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

//global store
export type State = {};
export const store = create(immer<State>(() => ({})));

//context api store
export function createContextStore<T>(
  defaultValue: T,
  options?: { persist?: PersistOptions<T> }
) {
  const Context = createContext(create(immer<T>(() => defaultValue)));
  return {
    Context,
    Provider: function (props: { children?: ReactNode }) {
      const store = useMemo(() => {
        let initializer = immer<T>(() => defaultValue);

        if (!!options?.persist)
          initializer = persist(initializer, options.persist) as any;

        return create(initializer);
      }, []);
      return (
        <Context.Provider value={store}>{props.children}</Context.Provider>
      );
    },
    hook: () => useContext(Context),
  };
}
