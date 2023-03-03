"use client";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import CopyrightIcon from "@mui/icons-material/Copyright";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useApp } from "./AppProvider";
import { projectList } from "data/projects";
import frag3 from "shaders/genuary/2022/3.frag.glsl";
import frag4 from "shaders/genuary/2022/4.frag.glsl";
import frag5 from "shaders/genuary/2022/5.frag.glsl";
import { experienceList } from "data/experience";
import { Menu } from "./Menu";
import { AnimatePresence } from "components/AnimatePresence";
import { Project } from "./Project";
import { Shader } from "./Shader";

export default function HomePage(props: {}) {
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
          boxShadow: "0 20px 15px -15px rgb(0 0 0 / 15%)",
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
                    mode:
                      themePreset.mode === "light"
                        ? "dark"
                        : themePreset.mode === "dark"
                        ? "system"
                        : "light",
                  })
                }
              >
                {themePreset.mode === "dark" ? (
                  <DarkModeIcon />
                ) : themePreset.mode === "light" ? (
                  <LightModeIcon />
                ) : (
                  <AutoAwesomeIcon />
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
            fontSize: "min(calc(31.3vw), 45vh)",
            textTransform: "uppercase",
            textAlign: "center",
            cursor: "default",
            lineHeight: 1,
            transform: "translateX(-2vw)",
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
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <Link href={"/projects"}>
              <Button
                size={"small"}
                endIcon={
                  <ArrowForwardIcon sx={{ transform: "rotate(-45deg)" }} />
                }
              >
                More projects
              </Button>
            </Link>
          </Stack>
        </Container>

        <Stack
          sx={{
            marginTop: {
              xs: "60px",
              md: "100px",
            },
            marginBottom: {
              xs: "60px",
              md: "100px",
            },
            marginX: {
              xs: "5vw",
              md: 0,
              lg: "5vw",
            },
          }}
          spacing={5}
        >
          <Box
            component={"div"}
            sx={{
              display: "grid",
              gap: {
                xs: "40px",
                md: "1px",
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
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <Link href={"/shaders"}>
              <Button
                size={"small"}
                endIcon={
                  <ArrowForwardIcon sx={{ transform: "rotate(-45deg)" }} />
                }
              >
                More shaders
              </Button>
            </Link>
          </Stack>
        </Stack>

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
              sx={{
                display: "grid",
                px: { xs: 2, md: 0 },
                gap: { xs: "0", md: "16px" },
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
                      my: { xs: 2, md: 5 },
                      display: "grid",
                      gap: { xs: 0, md: "24px" },
                      gridTemplateColumns: {
                        xs: "repeat(1, minmax(0, 1fr))",
                        md: "repeat(12, minmax(0, 1fr))",
                      },
                    }}
                  >
                    <Box
                      component={"div"}
                      sx={{ gridColumn: "span 4 / span 4" }}
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                        >
                          {`${experience.years[0]}`}
                        </Typography>
                        {experience.years[1] && (
                          <>
                            <ArrowForwardIcon sx={{ width: 16, height: 16 }} />
                            <Typography
                              sx={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {` ${experience.years[1]}`}
                            </Typography>
                          </>
                        )}
                      </Stack>
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
                        sx={{
                          marginTop: { xs: 0, md: 2 },
                          fontSize: "14px",
                          opacity: 0.6,
                        }}
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
          display: "flex",
          zIndex: 1,
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
}
