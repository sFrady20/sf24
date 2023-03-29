import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  SupportedColorScheme,
  Typography,
  useColorScheme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Menu } from "./Menu";
import { AnimatePresence } from "~/components/AnimatePresence";
import Clover from "~/util/clover.svg";
import { useApp } from "./Providers";
import { themes } from "~/themes";

const colorSchemeIconMap: {
  [key in SupportedColorScheme | "system"]: ReactNode;
} = {
  system: <AutoAwesomeIcon />,
  dark: <DarkModeIcon />,
  light: <LightModeIcon />,
};
const themeIconMap: {
  [key in keyof typeof themes]: ReactNode;
} = {
  original: <AutoAwesomeIcon />,
  shamrock: <Clover style={{ width: 24, height: 24 }} />,
};

export default function Header(props: {}) {
  const { setMode, mode, allColorSchemes } = useColorScheme();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setThemePreset, themePreset, allThemePresets } = useApp();

  useEffect(() => {
    window.document.body.style.overflowY =
      isMenuOpen && isMobile ? "hidden" : "auto";
  }, [isMenuOpen && isMobile]);

  const cm = ["system", ...allColorSchemes];

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
          right: "5vw",
          borderRadius: 1,
          pr: 1,
          zIndex: 100,
          overflow: "hidden",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} sx={{ flex: 1 }}>
          <Link href={"/"}>
            <Button
              sx={{ borderRadius: 4, height: 50, px: 2 }}
              startIcon={
                <Avatar
                  src={"/portrait-trans.png"}
                  sx={{ width: 32, height: 32 }}
                />
              }
            >
              <Typography
                component={"h1"}
                sx={{
                  color: isMenuOpen && isMobile ? "common.white" : undefined,
                }}
              >
                sf23
              </Typography>
            </Button>
          </Link>
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
            {themePreset !== "original" && (
              <Button
                variant={"text"}
                color={"inherit"}
                onClick={(e) => {
                  setThemePreset("original");
                }}
              >
                {themeIconMap[themePreset]}
              </Button>
            )}
            <Button
              variant={"text"}
              color={"inherit"}
              onClick={(e) => {
                if (e.shiftKey) {
                  setThemePreset(
                    allThemePresets[
                      (allThemePresets.indexOf(themePreset) + 1) %
                        allThemePresets.length
                    ] as any
                  );
                } else {
                  setMode(
                    cm[(cm.indexOf(mode || "system") + 1) % cm.length] as any
                  );
                }
              }}
            >
              {mode && colorSchemeIconMap[mode]}
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
    </>
  );
}
