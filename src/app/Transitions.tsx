import {
  createContext,
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { SpringValue, to } from "@react-spring/web";
import { AnimatedBox } from "util/animated";
import { Box } from "@mui/material";

const TransitionContext = createContext<{
  enter: SpringValue<number>;
  exit: SpringValue<number>;
}>({ enter: {} as any, exit: {} as any });

export function useTransition() {
  return useContext(TransitionContext);
}

export default function Transitions(props: { children: ReactNode }) {
  const { children } = props;

  const pathname = usePathname();

  const [childMap, setChildMap] = useState<{
    [key: string]: {
      child: ReactNode;
      enter: SpringValue<number>;
      exit: SpringValue<number>;
    };
  }>({});

  useEffect(() => {
    const key = Math.random().toString(32).substring(7);
    const enter = new SpringValue(0);
    const exit = new SpringValue(0);

    setChildMap((x) => {
      return {
        ...x,
        [key]: {
          child: (
            <TransitionContext.Provider key={key} value={{ enter, exit }}>
              {children}
            </TransitionContext.Provider>
          ),
          enter,
          exit,
        },
      };
    });

    enter.start(1, {
      onRest: ({ cancelled, finished }) => {
        if (!finished || cancelled) return;
        //window.document.body.style.overflowY = "auto";
      },
    });

    return () => {
      //window.document.body.style.overflowY = "hidden";
      exit.start(1, {
        onRest: ({ cancelled, finished }) => {
          if (!finished || cancelled) return;
          setChildMap((x) => {
            delete x[key];
            return { ...x };
          });
        },
      });
    };
  }, [pathname]);

  return (
    <Box sx={{ display: "grid" }}>
      {/* {Object.entries(childMap).map(([key, { child, enter, exit }]) => (
        <AnimatedBox
          key={key}
          sx={{ gridArea: "1 / 1" }}
          style={{
            transform: to(
              [enter, exit],
              (enter, exit) => `${(enter + exit) * 20}px`
            ),
          }}
        >
          {child}
        </AnimatedBox>
      ))} */}
      {children}
    </Box>
  );
}
