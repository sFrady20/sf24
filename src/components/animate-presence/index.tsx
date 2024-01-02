"use client";

import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import { SpringProps, SpringValue } from "@react-spring/web";

export type PresenceAnimatableChild = (opt: {
  enter: SpringValue<number>;
  exit: SpringValue<number>;
}) => ReactNode;
export function AnimatePresence(props: {
  isPresent: boolean;
  children: PresenceAnimatableChild;
  enterSpringProps?: SpringProps<number>;
  exitSpringProps?: SpringProps<number>;
}) {
  const { children, enterSpringProps, exitSpringProps, isPresent } = props;

  const id = useMemo(
    () => Math.random().toString(32).substring(7),
    [isPresent]
  );

  const [state, setState] = useState<{
    [s: string]: {
      children: PresenceAnimatableChild;
      enter: SpringValue<number>;
      exit: SpringValue<number>;
    };
  }>({});

  useEffect(() => {
    setState((state) => {
      if (isPresent) {
        if (!state[id]) {
          state[id] = {
            children,
            enter: new SpringValue(0),
            exit: new SpringValue(0),
          };
          state[id].enter.start(1, { ...enterSpringProps });
        } else {
          state[id].children = children;
        }
      }
      Object.entries(state)
        .filter((x) => !isPresent || x[0] !== id)
        .map(([id, entry]) => {
          entry.exit.start(1, {
            ...exitSpringProps,
            onChange: (...args: any[]) => {
              (exitSpringProps?.onChange as any)?.(...args);
            },
            onRest: (...args) => {
              (exitSpringProps?.onRest as any)?.(...args);
              if (args[0].cancelled) return;
              setState(({ ...state }) => {
                delete state[id];
                return { ...state };
              });
            },
          });
        });

      return { ...state };
    });
  }, [id, isPresent, children]);

  return (
    <>
      {Object.entries(state).map(([id, entry]) => (
        <Fragment key={id}>
          {entry.children({ enter: entry.enter, exit: entry.exit })}
        </Fragment>
      ))}
    </>
  );
}
