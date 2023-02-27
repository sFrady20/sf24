import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeServerSideProps } from "util/makeServerSideProps";
import Link from "next/link";
import { CursorContext, CursorTarget } from "components/Cursor";
import {
  AnimatedBox,
  AnimatedButton,
  AnimatedStack,
  AnimatedTabs,
} from "util/animated";
import {
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  animated,
  SpringProps,
  SpringValue,
  to,
  useSpring,
  useTrail,
} from "@react-spring/web";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import MenuIcon from "@mui/icons-material/Menu";
import { useApp } from "./_app";
import Image from "next/image";
import projectList from "projects";

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

const AnimatedCloseIcon = animated(CloseIcon);

function Project(props: { project: typeof projectList[number] }) {
  const { project } = props;
  const cursor = useContext(CursorContext);
  const theme = useTheme();

  const [isExpanded, setExpanded] = useState(false);
  const { expansion } = useSpring({
    expansion: isExpanded ? 1 : 0,
  });

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CursorTarget
      content={
        <AnimatedBox>
          <AnimatedCloseIcon
            style={{
              rotate: expansion.to([0, 1], ["-45deg", "0deg"]),
              scale: expansion,
            }}
          />
        </AnimatedBox>
      }
      effect={
        isExpanded
          ? {
              type: "grow",
              size: 40,
            }
          : null
      }
      onClick={() => {
        setExpanded((x) => !x);
      }}
    >
      {({ hover, isHovered }) => (
        <AnimatedBox
          sx={{
            position: "relative",
            borderBottomWidth: 1,
            borderColor: "divider",
            cursor: "pointer",
            marginX: { xs: "5vw", md: 0 },
          }}
          style={{
            paddingLeft: isMobile ? 0 : hover.to([0, 1], ["0px", "20px"]),
          }}
        >
          <AnimatedBox
            className={"grid grid-cols-10 <md:grid-cols-1"}
            sx={{
              paddingY: 5,
            }}
          >
            <Typography
              component={"div"}
              className={"col-span-2"}
              sx={{ marginBottom: { xs: 1, md: 0 } }}
            >
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
            <AnimatePresence isPresent={!isMobile && isHovered && !isExpanded}>
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
                    transform: cursor.x.to(
                      (x) => `translate(${-50 + x / 10}%, ${-50}%)`
                    ),
                  }}
                >
                  <AnimatedBox
                    style={{
                      width: 400,
                      height: 400,
                      transform: to(
                        [enter, exit],
                        (enter, exit) =>
                          `translate(${(-1 + enter + exit) * 100}%)`
                      ),
                    }}
                  >
                    <Image
                      className="absolute inset-0"
                      src={`https://picsum.photos/seed/${project.name}/400/500`}
                      width={400}
                      height={400}
                      alt={project.name}
                    />
                    {/*
                    <video
                      className="absolute inset-0 object-cover"
                      src={"/videos/abundant.webm"}
                      autoPlay
                      loop
                      muted
                      controls={false}
                    />
                    */}
                  </AnimatedBox>
                </AnimatedBox>
              )}
            </AnimatePresence>
          </AnimatedBox>
          <AnimatePresence isPresent={isExpanded}>
            {({ enter, exit }) => (
              <AnimatedBox
                className={"grid grid-cols-10 <md:grid-cols-1"}
                sx={{ overflow: "hidden" }}
                style={{
                  height: to(
                    [enter, exit],
                    (enter, exit) => `${(enter - exit) * 300}px`
                  ),
                }}
              >
                <Box component={"div"} className={"col-span-2"} />
                <Box
                  component={"div"}
                  className={"col-span-5"}
                  sx={{ fontSize: 14, lineHeight: 1.6 }}
                >
                  {project.description}
                </Box>
              </AnimatedBox>
            )}
          </AnimatePresence>
        </AnimatedBox>
      )}
    </CursorTarget>
  );
}

function Menu(props: {
  enter: SpringValue<number>;
  exit: SpringValue<number>;
  onClose?: () => void;
}) {
  const { enter, exit, onClose } = props;
  const { themePreset, setThemePreset } = useApp();

  const trail = useTrail(4, {
    from: {
      enter,
      exit,
    },
  });

  const t = (n: number) =>
    to([trail[n].enter, trail[n].exit], (enter, exit) => enter - exit);

  return (
    <AnimatedBox
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        right: 0,
        overflow: "hidden",
        backgroundColor: "common.black",
        color: "common.white",
        zIndex: 50,
        paddingX: "15vw",
        boxSizing: "border-box",
      }}
      style={{
        height: to([enter, exit], (enter, exit) => `${(enter - exit) * 100}%`),
      }}
    >
      <AnimatedStack justifyContent={"space-between"} height={"100vh"}>
        <Stack></Stack>
        <Stack spacing={4}>
          <Link href={"https://github.com/sFrady20"} target="_blank">
            <AnimatedButton
              fullWidth
              size={"large"}
              sx={{
                fontSize: "13vw",
                lineHeight: 1.2,
                textDecoration: "none",

                ["& .MuiButton-startIcon"]: {
                  marginRight: 5,
                },
              }}
              style={{
                opacity: t(0),
              }}
            >
              GitHub
            </AnimatedButton>
          </Link>
          <Link href={"https://twitter.com/slowjamsteve"} target="_blank">
            <AnimatedButton
              fullWidth
              size={"large"}
              sx={{
                fontSize: "13vw",
                lineHeight: 1.2,
                textDecoration: "none",

                ["& .MuiButton-startIcon"]: {
                  marginRight: 5,
                },
              }}
              style={{
                opacity: t(1),
              }}
            >
              Twitter
            </AnimatedButton>
          </Link>
          <Link href={"mailto:@sfrady20@gmail.com"} target="_blank">
            <AnimatedButton
              fullWidth
              size={"large"}
              sx={{
                fontSize: "13vw",
                lineHeight: 1.2,
                textDecoration: "none",

                ["& .MuiButton-startIcon"]: {
                  marginRight: 5,
                },
              }}
              style={{
                opacity: t(2),
              }}
            >
              Email
            </AnimatedButton>
          </Link>
        </Stack>
        <Stack
          spacing={4}
          sx={{
            marginBottom: "10vh",
            backgroundColor: "background.default",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <AnimatedTabs
            value={["light", "dark", "system"].indexOf(
              themePreset.mode || "system"
            )}
            variant="fullWidth"
            onChange={(e, x) => {
              setThemePreset({
                ...themePreset,
                mode: (["light", "dark", "system"] as const)[x],
              });
              onClose?.();
            }}
          >
            <Tab label={"Light"} />
            <Tab label={"Dark"} />
            <Tab label={"System"} />
          </AnimatedTabs>
        </Stack>
      </AnimatedStack>
    </AnimatedBox>
  );
}

const Home = (props: {}) => {
  const { themePreset, setThemePreset } = useApp();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <AnimatePresence isPresent={isMenuOpen && isMobile}>
        {({ enter, exit }) => <Menu enter={enter} exit={exit} />}
      </AnimatePresence>

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
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={3}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Box component={"div"}>
            <Link href={"https://github.com/sFrady20"} target="_blank">
              <IconButton sx={{ color: "inherit" }}>
                <GitHubIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"https://twitter.com/slowjamsteve"} target="_blank">
              <IconButton sx={{ color: "inherit" }}>
                <TwitterIcon sx={{ width: 20, height: 20 }} />
              </IconButton>
            </Link>
          </Box>
          <Box component={"div"}>
            <Link href={"mailto:@sfrady20@gmail.com"} target="_blank">
              <IconButton sx={{ color: "inherit" }}>
                <EmailIcon sx={{ width: 20, height: 20 }} />
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
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
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
        <Stack
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            sx={{ color: isMenuOpen ? "common.white" : "inherit" }}
            onClick={() => setMenuOpen((x) => !x)}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Typography
        component={"h1"}
        sx={{
          fontFamily: "Zighead",
          fontSize: "min(28vw, 45vh)",
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
          margin: { xs: "0 auto 40px", md: "0 auto 80px" },
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
