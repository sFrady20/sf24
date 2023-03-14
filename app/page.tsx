"use client";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DownloadIcon from "@mui/icons-material/Download";
import WorkIcon from "@mui/icons-material/Work";
import ScienceIcon from "@mui/icons-material/Science";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { projectList } from "data/projects";
import frag3 from "shaders/genuary/2022/3.frag.glsl";
import frag4 from "shaders/genuary/2022/4.frag.glsl";
import frag5 from "shaders/genuary/2022/5.frag.glsl";
import { experienceList } from "data/experience";
import { Project } from "./Project";
import { Shader } from "./Shader";
import Header from "./Header";

export default function HomePage(props: {}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
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
          fontSize: { xs: 13, sm: 14, md: 14.5 },
          textAlign: "justify",
          width: 530,
          maxWidth: "90vw",
          margin: { xs: "0 auto 40px", md: "0 auto 80px" },
        }}
      >
        I am a creative full-stack developer with over 8 years of experience. I
        specialize in building elegant solutions and I'm constantly crafting new
        features with a focus on simplicity and scalability.
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
        <Stack spacing={4}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <DesignServicesIcon sx={{ height: 20, width: 20 }} />
            <Typography variant={"h5"}>Projects</Typography>
          </Stack>
          <Stack>
            <Divider />
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
          {/*
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
          */}
        </Stack>
      </Container>

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
        <Stack spacing={3}>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <WorkIcon sx={{ height: 20, width: 20 }} />
            <Typography variant={"h5"}>Experience</Typography>
          </Stack>

          <Box
            component={"div"}
            sx={{
              display: "grid",
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
                  <Box component={"div"} sx={{ gridColumn: "span 4 / span 4" }}>
                    <Stack direction={"row"} alignItems={"center"} spacing={3}>
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
                    <Typography variant={"subtitle1"} sx={{ lineHeight: 1.2 }}>
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
                      variant={"caption"}
                      sx={{
                        marginTop: { xs: 0, md: 2 },
                      }}
                    >
                      {experience.location}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>

          <Stack direction={"row"} justifyContent={"flex-end"}>
            <Link download href={"/resume.pdf"} target={"_blank"}>
              <Button size={"small"} startIcon={<DownloadIcon />}>
                Download Resume
              </Button>
            </Link>
          </Stack>
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
        spacing={3}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <ScienceIcon sx={{ height: 20, width: 20 }} />
          <Typography variant={"h5"}>Shaders</Typography>
        </Stack>

        <Box
          component={"div"}
          sx={{
            display: "grid",
            width: "100%",
            gap: "1px",
            borderRadius: 2,
            overflow: "hidden",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
            marginX: {
              xs: "5vw",
              md: 0,
              lg: "5vw",
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

        {/* <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          sx={{
            paddingX: {
              xs: "5vw",
              md: 0,
              lg: "5vw",
            },
          }}
        >
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
        </Stack> */}
      </Stack>
    </>
  );
}
