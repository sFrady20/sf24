"use client";

import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  ThemeOptions,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Cursor, CursorProvider } from "components/Cursor";
import { defaultTheme } from "theme";
import merge from "lodash/merge";
import Transitions from "./Transitions";
import Header from "./Header";
import CopyrightIcon from "@mui/icons-material/Copyright";
import { Footer } from "./Footer";

const themePresets = {
  default: {
    light: { palette: { mode: "light" } },
    dark: { palette: { mode: "dark" } },
  },
} satisfies { [k: string]: { light: ThemeOptions; dark: ThemeOptions } };

type AppThemePreset = {
  key: keyof typeof themePresets;
  mode?: "light" | "dark" | "system";
};
const AppContext = createContext<{
  themePreset: AppThemePreset;
  setThemePreset: Dispatch<SetStateAction<AppThemePreset>>;
}>({
  themePreset: { key: "default" },
  setThemePreset: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

function getSystemMode() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function AppProvider(props: { children?: ReactNode }) {
  const { children } = props;

  const [themePreset, setThemePreset] = useState<AppThemePreset>({
    key: "default",
  });

  useEffect(() => {
    setThemePreset((x) => ({
      ...x,
      mode: localStorage.getItem("mode") as any,
    }));
  }, []);
  useEffect(() => {
    if (themePreset.mode) localStorage.setItem("mode", themePreset.mode);
  }, [themePreset]);

  const theme = useMemo(
    () =>
      createTheme(
        merge(
          defaultTheme,
          themePresets[themePreset.key]?.[
            themePreset.mode === "system" || !themePreset.mode
              ? getSystemMode()
              : themePreset.mode
          ]
        )
      ),
    [themePreset]
  );

  return (
    <AppContext.Provider value={{ themePreset, setThemePreset }}>
      <ThemeProvider theme={theme}>
        <CursorProvider>
          <CssBaseline />
          <Header />
          <Box
            component={"div"}
            sx={{
              position: "relative",
              zIndex: 10,
              backgroundColor: "background.default",
              color: "text.primary",
              borderRadius: "0 0 24px 24px",
              overflow: "hidden",
              boxShadow: "0 5px 20px -10px rgb(0 0 0 / 30%)",
              minHeight: "calc(100vh - 60px)",
            }}
          >
            {children}
          </Box>
          <Footer />
          <Cursor />
        </CursorProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
