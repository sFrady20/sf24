import { Text, Image } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Flex, Box } from "@react-three/flex";
import { usePresence } from "components/AnimatePresence";
import { AutoReflow } from "components/AutoReflow";
import Screen from "components/Screen";
import withGlobal from "middleware/withGlobal";
import { GetServerSidePropsContext } from "next";
import { createRouter } from "next-connect";
import { useRouter } from "next/router";
import { useState } from "react";
import { animated } from "react-spring";
import frag from "shaders/screen.frag.glsl";

const projectList = [
  "Abundant",
  "Home Run Derby",
  "Moneybot",
  "Wanderseat",
  "Area 51 Defense Squad",
  "Casino Bandito",
  "Verizon Juggle",
  "Phonetopia",
  "Influence",
  "Block Party",
  "Walt Kart",
  "Shader Stage",
  "QuarterVerse",
  "Civic Education Kiosk",
  "Centurylink Vikings",
  "Drexls",
  "labctrl",
  "Dispatch",
  // meh
  "Pit Crew",
  "Christmas Pageant",
  // dont rlly exist yet,
  "MimicMe",
  "Christmas town",
  "Dispatch-new",
  "Metal After Man",
  "Perfect Routine",
  "Fradiation",
  "Earthling Creative",
  "Mycota",
];

export const getServerSideProps = async (ctx: GetServerSidePropsContext) =>
  await createRouter()
    .use(withGlobal())
    .use(() => ({}))
    .run(ctx.req, ctx.res);

const AnimatedSceen = animated(Screen);

const Home = (props: {}) => {
  const { size } = useThree();
  const presence = usePresence();
  const [hover, setHover] = useState(false);
  const router = useRouter();

  return (
    <AnimatedSceen
      frag={frag}
      distance={presence.spring.enter.to([0, 1], [0.4, 0.5])}
    >
      <Flex
        size={[size.width, size.height, 0]}
        position={[-size.width / 2, size.height / 2, 0]}
        padding={32}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <AutoReflow />
        <Box alignItems={"center"} centerAnchor>
          <Image
            url={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100px' height='100px'>TEWST</svg>`}
          />
        </Box>
        <Box alignItems={"center"} centerAnchor>
          <Text
            font={"/ArchivoBlack-Regular.ttf"}
            fontSize={64}
            fillOpacity={0}
            //strokeColor={hover ? "#AAA" : "white"}
            strokeWidth={1}
            onPointerEnter={() => {
              setHover(true);
            }}
            onClick={() => {
              //router.push("/genuary/2023/1");
            }}
            onPointerLeave={() => {
              setHover(false);
            }}
          >
            Under Construction
          </Text>
        </Box>
      </Flex>
    </AnimatedSceen>
  );
};

Home.enterSpringProps = { config: { tension: 20, damping: 120 } };

export default Home;
