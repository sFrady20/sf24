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

const firstEnter = new SpringValue(1);
const firstExit = new SpringValue(0);

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

    console.log("ADDING", key, pathname);
    setChildMap((x) => ({
      ...x,
      [key]: {
        child: (
          <TransitionContext.Provider value={{ enter, exit }}>
            {children}
          </TransitionContext.Provider>
        ),
        enter,
        exit,
      },
    }));

    enter.start(1);

    return () => {
      console.log("EXIT", key, pathname);
      exit.start(1, {
        onRest: ({ cancelled, finished }) => {
          if (!finished || cancelled) return;
          setChildMap((x) => {
            console.log("REMOVING", key, pathname);
            delete x[key];
            return { ...x };
          });
        },
      });
    };
  }, [pathname]);

  return (
    <Box sx={{ display: "grid" }}>
      {Object.entries(childMap).map(([key, { child, enter, exit }]) => (
        <AnimatedBox
          key={key}
          sx={{ gridArea: "1 / 1" }}
          style={{ opacity: to([enter, exit], (enter, exit) => enter - exit) }}
        >
          {child}
        </AnimatedBox>
      ))}
    </Box>
  );
}
