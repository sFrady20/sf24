"use client";

import { Stack, Tab, useColorScheme } from "@mui/material";
import Link from "next/link";
import {
  AnimatedBox,
  AnimatedButton,
  AnimatedStack,
  AnimatedTabs,
} from "~/util/animated";
import { SpringValue, to, useTrail } from "@react-spring/web";

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
