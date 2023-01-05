import { Text, Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Box } from "@react-three/flex";
import { usePresence } from "components/AnimatePresence";
import Screen from "components/Screen";
import withGlobal from "middleware/withGlobal";
import { GetServerSidePropsContext } from "next";
import { createRouter } from "next-connect";
import { ReactNode, useRef } from "react";
import { animated } from "react-spring";
import { Mesh } from "three";
import frag from "shaders/screen.frag.glsl";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  await createRouter()
    .use(withGlobal())
    .use(() => ({}))
    .run(ctx.req, ctx.res);

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

const AnimatedSceen = animated(Screen);

const Home = (props: {}) => {
  const presence = usePresence();

  return (
    <AnimatedSceen
      frag={frag}
      distance={presence.spring.enter.to([0, 1], [0.4, 0.5])}
    >
      <Text
        font={"/ArchivoBlack-Regular.ttf"}
        fontSize={14}
        //maxWidth={Math.min(width, 600)}
        lineHeight={1.4}
        textAlign={"justify"}
      >
        I am a creative full-stack developer with over 9 years of experience,
        based in Fairfax, Virginia. I specialize in building elegant solutions
        for clients from all over the world and I'm constantly crafting new
        features with a focus on simplicity and scalability. I'm available to
        chat about your next app, website, or game idea, just shoot me an email.
        Let's build something great together.
      </Text>
    </AnimatedSceen>
  );
};

Home.enterSpringProps = { config: { tension: 20, damping: 120 } };

export default Home;
