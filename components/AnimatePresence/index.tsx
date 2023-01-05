import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  Children,
  useState,
} from "react";
import { IUniform } from "three";
import { SpringProps, SpringValue } from "react-spring";

const AppContext = createContext<{
  uniforms: { [key: string]: IUniform<any> };
}>({
  uniforms: {},
});
export const useApp = () => useContext(AppContext);

const PresenceContext = createContext<{
  uniforms: { enter: IUniform<any>; exit: IUniform<any> };
  spring: { enter: SpringValue; exit: SpringValue };
}>({
  uniforms: {} as any,
  spring: {} as any,
});
export const usePresence = () => useContext(PresenceContext);

const AnimatePresence = (props: {
  children?: ReactNode;
  enterSpringProps?: SpringProps<number>;
  exitSpringProps?: SpringProps<number>;
}) => {
  const { children, enterSpringProps, exitSpringProps } = props;

  const [state, setState] = useState<{
    [key: string]: {
      child: ReactNode;
      uniforms: {
        enter: { value: number };
        exit: { value: number };
      };
      spring: { enter: SpringValue; exit: SpringValue };
    };
  }>({});

  useEffect(() => {
    setState(({ ...state }) => {
      const confirmedEntries: string[] = [];
      Children.forEach(children, (child) => {
        const key: string | undefined = (child as any)?.key;
        if (!key) return;

        let entry = state[key];
        if (entry) {
          //update existing
          const entry = state[key];
          entry.child = child;
        } else {
          console.log("ADDING", key);
          //add non-existent children
          const uniforms = {
            enter: { value: 0 },
            exit: { value: 0 },
          };
          entry = {
            child,
            uniforms,
            spring: {
              enter: new SpringValue(0),
              exit: new SpringValue(0),
            },
          };
          state[key] = entry;
        }
        entry.spring["enter"].start(1, {
          ...enterSpringProps,
          onChange: (...args: any[]) => {
            (enterSpringProps?.onChange as any)?.(...args);
            entry.uniforms.enter.value = args[0];
          },
        });
        entry.spring["exit"].stop(true).start(0, {
          ...exitSpringProps,
          onChange: (...args: any[]) => {
            (exitSpringProps?.onChange as any)?.(...args);
            entry.uniforms.exit.value = args[0];
          },
        });
        confirmedEntries.push(key);
      });

      const entriesToRemove = Object.keys(state).filter(
        (x) => !confirmedEntries.includes(x)
      );

      entriesToRemove.forEach((key) => {
        const entry = state[key];
        entry.spring.exit.start(1, {
          ...exitSpringProps,
          onChange: (...args: any[]) => {
            (exitSpringProps?.onChange as any)?.(...args);
            entry.uniforms.exit.value = args[0];
          },
          onRest: (...args) => {
            (exitSpringProps?.onRest as any)?.(...args);
            if (args[0].cancelled) return;
            setState(({ ...state }) => {
              delete state[key];
              return state;
            });
          },
        });
      });

      return state;
    });
  }, [children, setState]);

  return (
    <>
      {Object.entries(state).map(([key, { child, uniforms, spring }]) => (
        <PresenceContext.Provider key={key} value={{ uniforms, spring }}>
          {child}
        </PresenceContext.Provider>
      ))}
    </>
  );
};

export default AnimatePresence;
