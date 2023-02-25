import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { makeServerSideProps } from "util/makeServerSideProps";
import Link from "next/link";
import { CursorContext, CursorTarget } from "components/Cursor";
import { AnimatedBox, AnimatedImage } from "util/animated";
import {
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SpringProps, SpringValue, to } from "@react-spring/web";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import DownloadIcon from "@mui/icons-material/Download";
import { useApp } from "./_app";

const projectList = [
  {
    name: "Wanderseat",
    languages: ["typescript", "css"],
    frameworks: ["react", "nextjs", "prisma", "mui", "tailwind"],
    score: 9,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim blandit mi, in dignissim arcu tristique sit amet. Etiam euismod tellus massa, quis vestibulum elit lacinia vitae.",
  },
  {
    name: "Abundant",
    languages: ["typescript", "css"],
    frameworks: ["react", "nextjs", "prisma", "mui", "tailwind"],
    score: 8,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim blandit mi, in dignissim arcu tristique sit amet. Etiam euismod tellus massa, quis vestibulum elit lacinia vitae.",
  },
  {
    name: "Home Run Derby",
    languages: ["c#"],
    frameworks: ["unity"],
    score: 8.5,
  },
  {
    name: "Moneybot",
    languages: ["javascript", "scss"],
    frameworks: ["react", "nodejs", "electron"],
    score: 4.5,
  },
  {
    name: "MASC",
    languages: ["javascript", "scss"],
    frameworks: ["react", "ffmpeg", "electron"],
    score: 5,
  },
  {
    name: "Area 51 Defense Squad",
    languages: ["c#"],
    frameworks: ["unity"],
    score: 7,
  },
  {
    name: "Casino Bandito",
    languages: ["c#"],
    frameworks: ["unity"],
    score: 5.5,
  },
  {
    name: "Verizon Juggle",
    languages: ["c#"],
    frameworks: ["unity"],
    score: 7,
  },
  {
    name: "Phonetopia",
    languages: ["javascript", "scss"],
    frameworks: ["react", "nodejs", "electron"],
    score: 5,
  },
  {
    name: "Influence",
    languages: ["java"],
    frameworks: ["processing"],
    score: 6,
  },
  {
    name: "Block Party",
    languages: ["actionscript"],
    frameworks: ["flash"],
    score: 6,
  },
  { name: "Walt Kart", languages: ["c#"], frameworks: ["unity"], score: 7 },
  {
    name: "QuarterVerse",
    languages: ["typescript", "scss"],
    frameworks: ["react"],
    score: 8,
  },
  {
    name: "Civic Education Kiosk",
    languages: ["typescript", "scss"],
    frameworks: ["react", "electron"],
    score: 4,
  },
  {
    name: "Centurylink Vikings",
    languages: ["javascript", "scss"],
    frameworks: ["electron"],
    score: 5,
  },
  {
    name: "Drexls",
    languages: ["brightscript", "java", "php"],
    frameworks: ["roku", "android"],
    score: 7.5,
  },
  {
    name: "Dispatch",
    languages: ["actionscript"],
    frameworks: ["flash"],
    score: 6,
  },
  { name: "Mycota", languages: ["c#"], frameworks: ["unity"], score: 5.5 },
  {
    name: "Pit Crew",
    languages: ["typescript", "scss"],
    frameworks: ["react"],
    score: 5.5,
  },
  {
    name: "MimicMe",
    languages: ["javascript"],
    frameworks: ["react-native"],
    score: 4.5,
  },
  {
    name: "Metal After Man",
    languages: ["c#"],
    frameworks: ["unity"],
    score: 5.5,
  },
  {
    name: "Easy mesh gradient",
    languages: ["typescript"],
    frameworks: ["vite"],
    score: 7,
  },
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
    <CursorTarget effect={{ type: "grow", size: 32, content: <>+</> }}>
      {({ hover, isHovered }) => (
        <AnimatedBox
          className={"grid grid-cols-12"}
          sx={{
            borderBottomWidth: 1,
            borderBottomColor: "divider",
            paddingY: 5,
            position: "relative",
            cursor: "pointer",
          }}
          style={{ paddingLeft: hover.to([0, 1], ["0px", "20px"]) }}
        >
          <Typography component={"div"} className={"col-span-2"}>
            {project.name}
          </Typography>
          <Box component={"ul"} className={"col-span-5"}>
            {project.frameworks.map((x) => (
              <Chip key={x} size={"small"} label={x} />
            ))}
            {project.languages.map((x) => (
              <Chip key={x} size={"small"} variant={"outlined"} label={x} />
            ))}
          </Box>
          <Box component={"ul"} className={"col-span-3"}></Box>
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
                    [cursor.x, cursor.y, hover],
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
        </AnimatedBox>
      )}
    </CursorTarget>
  );
}

const Home = (props: {}) => {
  const { themePreset, setThemePreset } = useApp();

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
          paddingX: 2,
          paddingY: 1,
          zIndex: 100,
        }}
      >
        <Avatar src={"/portrait-trans.png"} sx={{ width: 32, height: 32 }} />
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <Box component={"div"}>
            <Link href={"https://github.com/sFrady20"} target="_blank">
              <IconButton sx={{ color: "inherit" }}>
                <GitHubIcon />
              </IconButton>
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"https://twitter.com/slowjamsteve"} target="_blank">
              <IconButton sx={{ color: "inherit" }}>
                <TwitterIcon />
              </IconButton>
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"mailto:@sfrady20@gmail.com"} target="_blank">
              <IconButton sx={{ color: "inherit" }}>
                <EmailIcon />
              </IconButton>
            </Link>
          </Box>
          <Box component={"div"}>
            <Button
              startIcon={<DownloadIcon />}
              color={"inherit"}
              sx={{ color: "inherit", borderRadius: 10, textTransform: "none" }}
            >
              Resume
            </Button>
          </Box>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <ButtonGroup>
            <Button variant={"text"} color={"inherit"}>
              SF23
            </Button>
            <Button
              variant={"text"}
              color={"inherit"}
              onClick={() =>
                setThemePreset({
                  ...themePreset,
                  mode: themePreset.mode === "dark" ? "light" : "dark",
                })
              }
            >
              {themePreset.mode === "dark" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </Button>
          </ButtonGroup>
        </Stack>
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
          {projectList
            .sort((a, b) =>
              a.score > b.score ? -1 : a.score < b.score ? 1 : 0
            )
            .map((project, i) => (
              <Project key={i} project={project} />
            ))}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
