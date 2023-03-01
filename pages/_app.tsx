import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from "react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  ThemeOptions,
} from "@mui/material";
import type { AppProps } from "next/app";
import { Cursor, CursorProvider } from "components/Cursor";
import "windi.css";
import "../styles.css";
import "large-small-dynamic-viewport-units-polyfill";
import { defaultTheme } from "theme";
import { merge } from "lodash";
import { install } from "ga-gtag";

//install GA4
if (typeof window !== "undefined" && process.env.NODE_ENV !== "development")
  install("G-CYYGZKHE9K");

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

export default function App(props: AppProps) {
  const { Component } = props;

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
          <Component {...props} />
          <Cursor />
        </CursorProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
