import {
  Avatar,
  Box,
  Chip,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { makeServerSideProps } from "util/makeServerSideProps";
import GithubIcon from "icons/github.svg";
import TwitterIcon from "icons/twitter.svg";
import EmailIcon from "icons/email.svg";
import Link from "next/link";
import { CursorContext, CursorTarget } from "components/Cursor";
import { AnimatedBox, AnimatedImage, AnimatedStack } from "util/animated";
import {
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SpringProps, SpringValue, to } from "@react-spring/web";

const projectList = [
  {
    name: "Wanderseat",
    languages: ["typescript", "css"],
    frameworks: ["react", "nextjs", "prisma", "mui"],
  },
  {
    name: "Abundant",
    languages: ["typescript", "css"],
    frameworks: ["react", "nextjs", "prisma", "mui", "tailwind"],
  },
  { name: "Home Run Derby", languages: ["c#"], frameworks: ["unity"] },
  {
    name: "Moneybot",
    languages: ["javascript", "scss"],
    frameworks: ["nodejs", "electron"],
  },
  { name: "MASC", languages: ["javascript", "scss"], frameworks: ["electron"] },
  { name: "Area 51 Defense Squad", languages: ["c#"], frameworks: ["unity"] },
  { name: "Casino Bandito", languages: ["c#"], frameworks: ["unity"] },
  { name: "Verizon Juggle", languages: ["c#"], frameworks: ["unity"] },
  {
    name: "Phonetopia",
    languages: ["javascript", "scss"],
    frameworks: ["nodejs", "react", "electron"],
  },
  { name: "Influence", languages: ["java"], frameworks: ["processing"] },
  {
    name: "Block Party",
    languages: ["actionscript"],
    frameworks: ["flash"],
  },
  { name: "Walt Kart", languages: ["c#"], frameworks: ["unity"] },
  {
    name: "QuarterVerse",
    languages: ["javascript", "scss"],
    frameworks: ["react"],
  },
  {
    name: "Civic Education Kiosk",
    languages: ["javascript", "scss"],
    frameworks: ["react", "electron"],
  },
  {
    name: "Centurylink Vikings",
    languages: ["javascript", "scss"],
    frameworks: ["electron"],
  },
  {
    name: "Drexls",
    languages: ["brightscript", "java", "php"],
    frameworks: ["roku", "android"],
  },
  { name: "Dispatch", languages: ["actionscript"], frameworks: ["flash"] },
  { name: "Mycota", languages: ["c#"], frameworks: ["unity"] },
  {
    name: "Pit Crew",
    languages: ["typescript", "scss"],
    frameworks: ["react"],
  },
  {
    name: "Christmas Pageant",
    languages: ["typescript", "scss"],
    frameworks: ["react"],
  },
  { name: "MimicMe", languages: ["javascript"], frameworks: ["react-native"] },
  { name: "Metal After Man", languages: ["c#"], frameworks: ["unity"] },
];

export const getServerSideProps = makeServerSideProps();

type PresenceAnimatableChild = (opt: {
  enter: SpringValue<number>;
  exit: SpringValue<number>;
}) => ReactNode;
function AnimatePresence(props: {
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

function Project(props: { project: typeof projectList[number] }) {
  const { project } = props;
  const theme = useTheme();
  const cursor = useContext(CursorContext);

  return (
    <CursorTarget effect={undefined}>
      {({ hover, isHovered }) => (
        <AnimatedStack
          direction={"row"}
          alignItems={"center"}
          style={{ paddingLeft: hover.to([0, 1], ["0px", "20px"]) }}
          sx={{
            borderBottomWidth: 1,
            borderBottomColor: "divider",
            paddingY: 5,
            position: "relative",
            cursor: "pointer",
          }}
        >
          <Box component={"div"}>{project.name}</Box>
          <Box component={"div"}>
            {project.languages.map((x) => (
              <Chip key={x} size={"small"} label={x} />
            ))}
          </Box>
          <Box component={"div"}>
            {project.frameworks.map((x) => (
              <Chip key={x} size={"small"} variant={"outlined"} label={x} />
            ))}
          </Box>
          <AnimatedBox
            sx={{
              position: "absolute",
              background: theme.palette.primary.main,
              height: "1px",
              left: 0,
              top: "auto",
              bottom: 0,
            }}
            style={{
              width: hover.to([0, 1], ["0%", "100%"]),
            }}
          />
          <AnimatedBox />
          <AnimatePresence isPresent={isHovered}>
            {({ enter, exit }) => (
              <AnimatedBox
                sx={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 50,
                  overflow: "hidden",
                  pointerEvents: "none",
                }}
                style={{
                  opacity: to([enter, exit], (enter, exit) => enter - exit),
                  transform: to(
                    [cursor.spring.x, cursor.spring.y, hover],
                    (x, y, hover) => `translate(${-50 + x / 10}%, ${-50}%)`
                  ),
                }}
              >
                <AnimatedImage
                  src={`https://picsum.photos/seed/${project.name}/400/500`}
                  width={400}
                  height={400}
                  alt={project.name}
                  style={{
                    transform: to(
                      [enter, exit],
                      (enter, exit) =>
                        `translate(${(-1 + enter + exit) * 100}%)`
                    ),
                  }}
                />
              </AnimatedBox>
            )}
          </AnimatePresence>
        </AnimatedStack>
      )}
    </CursorTarget>
  );
}

const Home = (props: {}) => {
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className={"backdrop-filter backdrop-blur-100px"}
        sx={{
          position: "fixed",
          top: "5vh",
          left: "5vw",
          width: "88vw",
          borderRadius: 4,
          padding: 2,
          zIndex: 100,
        }}
      >
        <Avatar />
        <Stack direction={"row"} spacing={6}>
          <Box component={"div"}>
            <Link href={"https://github.com/sFrady20"} target="_blank">
              <GithubIcon height={20} />
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"https://twitter.com/slowjamsteve"} target="_blank">
              <TwitterIcon height={20} />
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"mailto:@sfrady20@gmail.com"} target="_blank">
              <EmailIcon height={20} />
            </Link>
          </Box>
        </Stack>
        <Typography>RESUME</Typography>
      </Stack>

      <Typography
        component={"h1"}
        sx={{
          fontFamily: "Zighead",
          fontSize: "min(30vw, 45vh)",
          textTransform: "uppercase",
          textAlign: "center",
          cursor: "default",
          lineHeight: 1,
          mt: "172px",
        }}
      >
        Frady
      </Typography>

      <Typography
        component={"div"}
        sx={{
          fontSize: 14.5,
          textAlign: "justify",
          width: 530,
          maxWidth: "80%",
          margin: "0 auto 80px",
        }}
      >
        I am a creative full-stack developer with over 9 years of experience. I
        specialize in building elegant solutions and I'm constantly crafting new
        features with a focus on simplicity and scalability.
      </Typography>

      <Container>
        <Stack>
          {projectList.map((project, i) => (
            <Project key={i} project={project} />
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
