"use client";

import { Box, IconButton, Stack, Tab, useColorScheme } from "@mui/material";
import Link from "next/link";
import {
  AnimatedBox,
  AnimatedButton,
  AnimatedStack,
  AnimatedTabs,
} from "~/util/animated";
import { SpringValue, to, useTrail } from "@react-spring/web";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

export function Menu(props: {
  enter: SpringValue<number>;
  exit: SpringValue<number>;
  onClose?: () => void;
}) {
  const { enter, exit, onClose } = props;
  const { mode, setMode } = useColorScheme();

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
        justifyContent: "center",
        zIndex: 50,
        paddingX: "15vw",
        boxSizing: "border-box",
        display: "flex",
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
          <Link
            href={"/"}
            onClick={() => {
              onClose?.();
            }}
          >
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
              Home
            </AnimatedButton>
          </Link>
          <Link
            href={"/shaders"}
            onClick={() => {
              onClose?.();
            }}
          >
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
              Shaders
            </AnimatedButton>
          </Link>
        </Stack>

        <AnimatedStack
          direction={"row"}
          spacing={3}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            flex: 1,
            position: "absolute",
            bottom: 0,
            left: "5vw",
            right: "5vw",
            marginBottom: "calc(5vh + 80px)",
          }}
          style={{
            opacity: to([t(3), enter, exit], (t, enter, exit) =>
              Math.min(t, enter - exit)
            ),
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
            <Link
              href={"https://www.linkedin.com/in/stevenfrady/"}
              target="_blank"
            >
              <IconButton sx={{ color: "inherit", cursor: "alias" }}>
                <LinkedInIcon sx={{ width: 20, height: 20 }} />
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
        </AnimatedStack>

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
            value={["light", "dark", "system"].indexOf(mode || "system")}
            variant="fullWidth"
            onChange={(e, x) => {
              setMode((["light", "dark", "system"] as const)[x]);
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
