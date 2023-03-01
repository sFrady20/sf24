import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
  Tab,
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
  useRef,
  useState,
} from "react";
import {
  animated,
  SpringProps,
  SpringValue,
  to,
  useResize,
  useSpring,
  useTrail,
} from "@react-spring/web";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MenuIcon from "@mui/icons-material/Menu";
import { useApp } from "./_app";
import Image from "next/image";
import { projectList } from "data/projects";
import { Canvas } from "@react-three/fiber";
import Color from "color";
import Slice from "components/Slice";
import frag3 from "shaders/genuary/2022/3.frag.glsl";
import frag4 from "shaders/genuary/2022/4.frag.glsl";
import frag5 from "shaders/genuary/2022/5.frag.glsl";
import { experienceList } from "data/experience";

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
  const cursor = useContext(CursorContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CursorTarget
      content={
        <AnimatedBox>
          <ArrowForwardIcon
            style={{
              rotate: "-45deg",
            }}
          />
        </AnimatedBox>
      }
      effect={{
        type: "grow",
        size: 40,
      }}
    >
      {({ hover, isHovered }) => (
        <AnimatedBox
          sx={{
            position: "relative",
            cursor: "pointer",
            marginX: { md: 0 },
          }}
          style={{
            paddingLeft: isMobile ? 0 : hover.to([0, 1], ["0px", "20px"]),
          }}
        >
          <AnimatedBox
            sx={{
              py: 5,
              display: {
                x: "block",
                md: "grid",
              },
              gridTemplateColumns: {
                md: "repeat(10, minmax(0, 1fr))",
              },
            }}
          >
            <Typography
              component={"div"}
              sx={{
                marginBottom: { xs: 2, md: 0 },
                gridColumn: { xs: "span 1 / span 1", md: "span 2 / span 2" },
              }}
            >
              {project.name}
            </Typography>

            <Box
              component={"ul"}
              sx={{
                marginBottom: { xs: 2, md: 0 },
                gridColumn: "span 5 / span 5",
              }}
            >
              {project.frameworks
                .filter((x) => !["tailwind"].includes(x))
                .map((x) => (
                  <Chip
                    key={x}
                    size={"small"}
                    label={x}
                    sx={{ marginRight: "2px", marginBottom: "2px" }}
                  />
                ))}
              {project.languages.map((x) => (
                <Chip
                  key={x}
                  size={"small"}
                  variant={"outlined"}
                  label={x}
                  sx={{ marginRight: "2px", marginBottom: "2px" }}
                />
              ))}
            </Box>

            <AnimatePresence isPresent={isMobile || isHovered}>
              {({ enter, exit }) => (
                <AnimatedBox
                  sx={{
                    position: { xs: "static", md: "absolute" },
                    left: "50%",
                    top: "50%",
                    transform: { xs: undefined, md: "translate(-50%, -50%)" },
                    zIndex: 50,
                    overflow: "hidden",
                    pointerEvents: "none",
                    borderRadius: 2,
                  }}
                  style={{
                    opacity: to([enter, exit], (enter, exit) => enter - exit),
                    transform: isMobile
                      ? ""
                      : cursor.x.to(
                          (x) => `translate(${-50 + x / 10}%, ${-50}%)`
                        ),
                  }}
                >
                  <AnimatedBox
                    sx={{
                      width: { xs: "100%", md: 400 },
                      height: { xs: 300, md: 400 },
                      overflow: "hidden",
                      borderRadius: 2,
                    }}
                    style={{
                      transform: to(
                        [enter, exit],
                        (enter, exit) =>
                          `translate(${(-1 + enter + exit) * 100}%)`
                      ),
                    }}
                  >
                    <Image
                      className="absolute inset-0"
                      src={
                        project.images?.[0] ||
                        `https://picsum.photos/seed/${project.name}/400/500`
                      }
                      fill
                      objectFit="cover"
                      objectPosition="left"
                      style={{ objectFit: "cover", objectPosition: "left" }}
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
      <Stack
        justifyContent={"center"}
        style={{ height: "calc(var(--1svh) * 100)" }}
      >
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
        <AnimatedStack
          spacing={4}
          sx={{
            position: "absolute",
            bottom: 0,
            left: "5vw",
            right: "5vw",
            marginBottom: "5vh",
            backgroundColor: "background.default",
            borderRadius: 2,
            overflow: "hidden",
          }}
          style={{
            opacity: to([t(3), enter, exit], (t, enter, exit) =>
              Math.min(t, enter - exit)
            ),
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
        </AnimatedStack>
      </Stack>
    </AnimatedBox>
  );
}

function Shader(props: {
  frag: string;
  title?: string;
  subtitle?: string;
  sourceHref?: string;
}) {
  const { frag, title, subtitle, sourceHref } = props;
  const theme = useTheme();
  const containerEl = useRef<HTMLDivElement>(null);
  const uniforms = useRef({
    resolution: { value: [100, 100] },
    time: { value: 0 },
    cursor: { value: [0, 0] },
  }).current;

  const backdropRgb = Color(theme.palette.common.black)
    .rgb()
    .array()
    .map((x) => `${x / 2.55}%`)
    .join(" ");

  useEffect(() => {
    let frame = 0;
    const cb = (now: number) => {
      uniforms.time.value = now / 1000;
      frame = requestAnimationFrame(cb);
    };
    frame = requestAnimationFrame(cb);
    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  useResize({
    container: containerEl as any,
    immediate: true,
    onChange: ({ value: { width, height } }) => {
      uniforms.resolution.value = [width, height];
    },
  });

  return (
    <CursorTarget effect={{ type: "grow", size: 0 }}>
      <Box
        component={"div"}
        className={"col-span-1"}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: {
            xs: 2,
            lg: 5,
          },
          transition: "box-shadow 0.2s ease-out, transform 0.2s ease-in-out",
          cursor: "crosshair",
          overflow: "hidden",
          paddingBottom: "72%",
          height: 0,
          position: "relative",
          boxShadow: "0 4px 3px -1.5px rgb(0 0 0 / 5%)",

          ["&:hover"]: {
            boxShadow: "0 40px 30px -15px rgb(0 0 0 / 30%)",
            transform: "scale(1.02)",
          },
        }}
      >
        <Box
          ref={containerEl}
          component={"div"}
          sx={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
          onMouseMove={(e) => {
            var rect = (e.target as any).getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            uniforms.cursor.value = [x, y];
          }}
        >
          <Canvas dpr={[1, 1]}>
            <Slice>
              <shaderMaterial fragmentShader={frag} uniforms={uniforms} />
            </Slice>
          </Canvas>
        </Box>

        <Stack
          direction={"row"}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "45%",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "20px 44px",
            pointerEvents: "none",
            backgroundImage: `linear-gradient(0deg, rgb(${backdropRgb}) 0%, rgb(${backdropRgb} / 0.9903926402016152) 6.25%, rgb(${backdropRgb} / 0.9619397662556434) 12.5%, rgb(${backdropRgb} / 0.9157348061512727) 18.75%, rgb(${backdropRgb} / 0.8535533905932737) 25%, rgb(${backdropRgb} / 0.7777851165098011) 31.25%, rgb(${backdropRgb} / 0.6913417161825449) 37.5%, rgb(${backdropRgb} / 0.5975451610080642) 43.75%, rgb(${backdropRgb} / 0.5) 50%, rgb(${backdropRgb} / 0.4024548389919359) 56.25%, rgb(${backdropRgb} / 0.3086582838174552) 62.5%, rgb(${backdropRgb} / 0.22221488349019902) 68.75%, rgb(${backdropRgb} / 0.14644660940672627) 75%, rgb(${backdropRgb} / 0.08426519384872733) 81.25%, rgb(${backdropRgb} / 0.03806023374435663) 87.5%, rgb(${backdropRgb} / 0.009607359798384785) 93.75%, rgb(${backdropRgb} / 0) 100% )`,
          }}
        >
          <Stack>
            <Typography
              sx={{ opacity: 0.8, lineHeight: 1, color: "common.white" }}
            >
              {title}
            </Typography>
            <Typography
              sx={{ opacity: 0.4, lineHeight: 1, color: "common.white" }}
            >
              {subtitle}
            </Typography>
          </Stack>
          <Stack direction={"row"}>
            {sourceHref && (
              <Link href={sourceHref} target={"_blank"}>
                <IconButton sx={{ pointerEvents: "all", cursor: "alias" }}>
                  <GitHubIcon sx={{ color: "common.white" }} />
                </IconButton>
              </Link>
            )}
          </Stack>
        </Stack>
      </Box>
    </CursorTarget>
  );
}

const Home = (props: {}) => {
  const { themePreset, setThemePreset } = useApp();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    window.document.body.style.overflowY =
      isMenuOpen && isMobile ? "hidden" : "auto";
  }, [isMenuOpen && isMobile]);

  return (
    <>
      <Box
        component={"div"}
        sx={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "background.default",
          color: "text.primary",
          borderRadius: "0 0 24px 24px",
          overflow: "hidden",
        }}
      >
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
            right: "5vw",
            borderRadius: 4,
            paddingX: 2,
            paddingY: 1,
            zIndex: 100,
          }}
        >
          <Stack direction={"row"} alignItems={"center"} sx={{ flex: 1 }}>
            <Avatar
              src={"/portrait-trans.png"}
              sx={{ width: 32, height: 32, marginRight: 2 }}
            />
            <Typography
              component={"h1"}
              sx={{
                color: isMenuOpen && isMobile ? "common.white" : undefined,
              }}
            >
              sf23
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            spacing={3}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box component={"div"}>
              <Link href={"https://github.com/sFrady20"} target="_blank">
                <IconButton sx={{ color: "inherit", cursor: "alias" }}>
                  <GitHubIcon sx={{ width: 20, height: 20 }} />
                </IconButton>
              </Link>
            </Box>
            <Box component={"div"}>
              <Link href={"https://twitter.com/slowjamsteve"} target="_blank">
                <IconButton sx={{ color: "inherit", cursor: "alias" }}>
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
                sx={{
                  color: "inherit",
                  borderRadius: 10,
                  textTransform: "none",
                }}
              >
                Resume
              </Button>
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            spacing={2}
            sx={{
              flex: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <ButtonGroup>
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
            fontSize: "min(calc(31.3vw - 16px), 45vh)",
            textTransform: "uppercase",
            textAlign: "center",
            cursor: "default",
            lineHeight: 1,
            transform: "translateX(-2.2vw)",
            mt: { xs: "calc(5vh + 90px)", md: "calc(5vh + 130px)" },
          }}
        >
          Frady
        </Typography>

        <Typography
          component={"div"}
          sx={{
            fontSize: { xs: 12, sm: 14, md: 14.5 },
            textAlign: "justify",
            width: 530,
            maxWidth: "calc(90vw - 32px)",
            margin: { xs: "0 auto 40px", md: "0 auto 80px" },
          }}
        >
          I am a creative full-stack developer with over 8 years of experience.
          I specialize in building elegant solutions and I'm constantly crafting
          new features with a focus on simplicity and scalability.
        </Typography>

        <Container
          sx={{
            marginTop: {
              xs: "60px",
              md: "100px",
            },
            marginBottom: {
              xs: "60px",
              md: "100px",
            },
          }}
        >
          <Stack>
            {projectList
              .sort((a, b) =>
                a.score > b.score ? -1 : a.score < b.score ? 1 : 0
              )
              .slice(0, isMobile ? 5 : 8)
              .flatMap((project, i) => [
                <Project key={i} project={project} />,
                <Divider key={`divider-${i}`} />,
              ])
              .slice(0, -1)}
          </Stack>
        </Container>

        <Box
          component={"div"}
          sx={{
            marginTop: {
              xs: "60px",
              md: "100px",
            },
            marginBottom: {
              xs: "60px",
              md: "100px",
            },
            marginX: "5vw",
            display: "grid",
            gap: {
              xs: "40px",
              md: "10px",
              lg: "40px",
            },
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          <Shader
            frag={frag3}
            title={"SpaceTime"}
            subtitle={"Genuary 2022 - Day 3"}
            sourceHref={
              "https://github.com/sFrady20/sf23/blob/main/shaders/genuary/2022/3.frag.glsl"
            }
          />
          <Shader
            frag={frag4}
            title={"The next fidenza"}
            subtitle={"Genuary 2022 - Day 4"}
            sourceHref={
              "https://github.com/sFrady20/sf23/blob/main/shaders/genuary/2022/3.frag.glsl"
            }
          />
          <Shader
            frag={frag5}
            title={"Destroy a square"}
            subtitle={"Genuary 2022 - Day 5"}
            sourceHref={
              "https://github.com/sFrady20/sf23/blob/main/shaders/genuary/2022/3.frag.glsl"
            }
          />
        </Box>

        <Container
          sx={{
            marginTop: {
              xs: "60px",
              md: "100px",
            },
            marginBottom: {
              xs: "60px",
              md: "100px",
            },
          }}
        >
          <Stack>
            <Box
              component={"div"}
              className={"gap-x-15"}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, minmax(0, 1fr))",
                  lg: "repeat(2, minmax(0, 1fr))",
                },
              }}
            >
              {experienceList
                .sort((a, b) =>
                  a.years[0] > b.years[0] ? -1 : a.years[0] < b.years[0] ? 1 : 0
                )
                .slice(0, 8)
                .map((experience, i) => (
                  <Box
                    key={i}
                    component={"div"}
                    sx={{
                      py: 5,
                      display: "grid",
                      gap: "24px",
                      gridTemplateColumns: {
                        xs: "repeat(1, minmax(0, 1fr))",
                        md: "repeat(12, minmax(0, 1fr))",
                      },
                    }}
                  >
                    <Box component={"div"} className={"col-span-4"}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {`${experience.years[0]}`}
                        {experience.years[1] && (
                          <>
                            {` `}
                            <ArrowForwardIcon sx={{ width: 16, height: 16 }} />
                            {` ${experience.years[1]}`}
                          </>
                        )}
                      </Typography>
                    </Box>
                    <Box component={"div"} className={"col-span-8"}>
                      <Typography variant={"subtitle1"}>
                        {experience.place}
                      </Typography>
                      <Typography
                        variant={"subtitle2"}
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineClamp: { xs: 2, md: 1 },
                          WebkitLineClamp: { xs: 2, md: 1 },
                        }}
                      >
                        {experience.position}
                      </Typography>
                      <Typography
                        sx={{ marginTop: 2, fontSize: "14px", opacity: 0.6 }}
                      >
                        {experience.location}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Stack>
        </Container>
      </Box>

      <Box
        component={"footer"}
        sx={{
          position: "sticky",
          bottom: 0,
          margin: "-200px 0 0 0",
          paddingTop: "200px",
          boxSizing: "content-box",
          backgroundColor: "common.black",
          color: "common.white",
          display: "flex",
          zIndex: 1,

          //backsplash for overscroll
          ["&:before"]: {
            content: '" "',
            position: "fixed",
            zIndex: -1,
            left: 0,
            right: 0,
            top: 0,
            height: "50vh",
            backgroundColor: "background.default",
          },
          ["&:after"]: {
            content: '" "',
            position: "fixed",
            zIndex: -1,
            left: 0,
            right: 0,
            bottom: 0,
            height: "50vh",
            backgroundColor: "common.black",
          },
        }}
      >
        <Container>
          <Stack
            sx={{
              flexDirection: "row",
              minHeight: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                opacity: 0.5,
              }}
            >
              Des. and Dev. by Steven Frady{" "}
              <CopyrightIcon sx={{ width: 12, height: 12 }} /> 2023
            </Typography>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Home;
