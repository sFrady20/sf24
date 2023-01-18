import { createContext, ReactNode, useContext, useRef } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "theme";
import { useFrame } from "@react-three/fiber";
import { IUniform, Mesh } from "three";
import { Text3D, useContextBridge } from "@react-three/drei";
import Screen from "components/Screen";
import AnimatePresence, {
  PresenceContext,
  usePresence,
} from "components/AnimatePresence";
import screenFrag from "shaders/screen.frag.glsl";
import { Box } from "@react-three/flex";
import "large-small-dynamic-viewport-units-polyfill";
import CanvasFilter from "components/CanvasFilter";
import { ThemeContext } from "@emotion/react";
import { animated, to } from "@react-spring/web";

const seed = Math.random() * 1000;

const AppContext = createContext<{
  uniforms: { [key: string]: IUniform<any> };
}>({
  uniforms: {},
});
export const useApp = () => useContext(AppContext);

export const Letter = (props: { children: ReactNode }) => {
  const { children } = props;

  const meshRef = useRef<Mesh>(null!);

  return (
    <Box centerAnchor width={16}>
      <Text3D
        font={"/Optician Sans.json"}
        size={16}
        height={3}
        ref={meshRef}
        bevelEnabled
        bevelSize={0.05}
      >
        {children}
        <meshStandardMaterial color={"black"} />
      </Text3D>
    </Box>
  );
};

const ShaderScene = () => {
  const uniforms = useRef({
    seed: { value: seed },
    time: { value: 0 },
    resolution: { value: [0, 0] },
    cursor: { value: [0, 0] },
    pageEnter: { value: 0 },
    pageExit: { value: 0 },
  }).current;

  useFrame(({ size, mouse }, delta) => {
    uniforms.time.value += delta;
    uniforms.resolution.value = [size.width, size.height];
    uniforms.cursor.value = [mouse.x * 0.5 + 0.5, mouse.y * 0.5 + 0.5];
  });

  return (
    <AppContext.Provider value={{ uniforms }}>
      <Screen distance={1} frag={screenFrag} />
    </AppContext.Provider>
  );
};

const AnimatedCanvasFilter = animated(CanvasFilter);
const Page = (props: AppProps) => {
  const { Component, pageProps } = props;
  const ContextBridge = useContextBridge(ThemeContext, PresenceContext);

  const presence = usePresence();

  return (
    <AnimatedCanvasFilter
      style={{
        height: "calc(var(--1svh) * 100)",
        width: "100vw",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: presence.spring.enter.to((x) => (x < 1 ? 0 : 1)),
        pointerEvents: presence.spring.exit.to((x) =>
          x === 0 ? "all" : "none"
        ),
      }}
      scene={
        <ContextBridge>
          <ShaderScene />
        </ContextBridge>
      }
    >
      <Component {...pageProps} />
    </AnimatedCanvasFilter>
  );
};

let prevPath = "";
let id = "";
function generateKey(path: string) {
  if (path != prevPath) id = (Math.random() + 1).toString(32).substring(7);
  const key = `${path}-${id}`;
  prevPath = path;
  return key;
}

export default function App(props: AppProps) {
  const { router } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatePresence
        enterSpringProps={{
          config: {
            duration: 1000,
          },
        }}
        exitSpringProps={{
          config: {
            duration: 1000,
          },
        }}
      >
        <Page key={generateKey(router.asPath)} {...props} />
      </AnimatePresence>
    </ThemeProvider>
  );
}
