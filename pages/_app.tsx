import { createContext, ReactNode, useContext, useRef } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "theme";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { IUniform, Mesh } from "three";
import { Text3D, useContextBridge } from "@react-three/drei";
import { ThemeContext } from "@emotion/react";
import Screen from "components/Screen";
import AnimatePresence from "components/AnimatePresence";
import fgfrag from "shaders/foreground.frag.glsl";
import bgfrag from "shaders/background.frag.glsl";
import { Box, Flex } from "@react-three/flex";
import "large-small-dynamic-viewport-units-polyfill";

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
        <meshStandardMaterial />
      </Text3D>
    </Box>
  );
};

const Foreground = () => {
  const { size } = useThree();

  return (
    <Screen frag={fgfrag} distance={0}>
      <directionalLight intensity={1} position={[-1, 1, 1]} />
      <Flex
        size={[size.width, size.height, 0]}
        position={[-size.width / 2, size.height / 2, 0]}
        padding={32}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box alignItems={"center"}>
          <Box flexDirection="row" marginBottom={16}>
            <Letter>S</Letter>
            <Box width={32}>{() => <></>}</Box>
            <Letter>F</Letter>
          </Box>
          <Box flexDirection="row" marginTop={16}>
            <Letter>2</Letter>
            <Box width={32}>{() => <></>}</Box>
            <Letter>3</Letter>
          </Box>
        </Box>
      </Flex>
    </Screen>
  );
};

const Background = () => {
  return <Screen frag={bgfrag} distance={1} />;
};

const ThreeApp = ({ Component, pageProps, router }: AppProps) => {
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
      <AnimatePresence
        enterSpringProps={{
          delay: 1000,
          config: {
            tension: 10,
            damping: 100,
          },
        }}
        exitSpringProps={{
          config: {
            tension: 10,
            damping: 100,
          },
        }}
      >
        <Foreground key={"foreground"} />
      </AnimatePresence>
      <AnimatePresence
        enterSpringProps={(Component as any).enterSpringProps}
        exitSpringProps={(Component as any).exitSpringProps}
      >
        <Component key={router.asPath} {...pageProps} />
      </AnimatePresence>
      <AnimatePresence
        enterSpringProps={{
          config: {
            tension: 2,
            damping: 120,
          },
        }}
        exitSpringProps={{
          config: {
            tension: 2,
            damping: 120,
          },
        }}
      >
        <Background key={"background"} />
      </AnimatePresence>
    </AppContext.Provider>
  );
};

export default function App(props: AppProps) {
  const ContextBridge = useContextBridge(ThemeContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Canvas
        dpr={[1, 1]}
        camera={{ fov: 75, position: [0, 0, 3] }}
        style={{
          height: "calc(var(--1svh) * 100)",
          width: "calc(var(--1svw) * 100)",
        }}
      >
        <ContextBridge>
          <ThreeApp {...props} />
        </ContextBridge>
      </Canvas>
    </ThemeProvider>
  );
}
