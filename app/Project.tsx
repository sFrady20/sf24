"use client";

import { Box, Chip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CursorContext, CursorTarget } from "components/Cursor";
import { AnimatedBox } from "util/animated";
import { useContext } from "react";
import { to } from "@react-spring/web";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import { projectList } from "data/projects";
import { AnimatePresence } from "components/AnimatePresence";

export function Project(props: { project: typeof projectList[number] }) {
  const { project } = props;
  const cursor = useContext(CursorContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <CursorTarget
      content={
        <ArrowForwardIcon
          style={{
            rotate: "-45deg",
          }}
        />
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
                    sx={{
                      marginRight: "2px",
                      marginBottom: { xs: "8px", md: "2px" },
                    }}
                  />
                ))}
              {project.languages.map((x) => (
                <Chip
                  key={x}
                  size={"small"}
                  variant={"outlined"}
                  label={x}
                  sx={{
                    marginRight: "2px",
                    marginBottom: { xs: "8px", md: "2px" },
                  }}
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
                    borderRadius: 1,
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
                      borderRadius: 1,
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
