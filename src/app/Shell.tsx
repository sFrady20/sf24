"use client";

import {
  useState,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  Box,
  CssBaseline,
  getInitColorSchemeScript,
} from "@mui/material";
import { themes } from "~/themes";
import Header from "./Header";
import { Footer } from "./Footer";
import { Cursor, CursorProvider } from "~/components/Cursor";
import Transitions from "./Transitions";

const AppContext = createContext<{
  themePreset: keyof typeof themes;
  setThemePreset: Dispatch<SetStateAction<keyof typeof themes>>;
  allThemePresets: string[];
}>({
  themePreset: "original",
  setThemePreset: () => {},
  allThemePresets: Object.keys(themes),
});

export function useApp() {
  return useContext(AppContext);
}

export function AppShell(props: { children?: ReactNode }) {
  const { children } = props;

  const [themePreset, setThemePreset] =
    useState<keyof typeof themes>("original");

  return (
    <AppContext.Provider
      value={{
        themePreset,
        setThemePreset,
        allThemePresets: Object.keys(themes),
      }}
    >
      <CssVarsProvider theme={themes[themePreset]}>
        <CursorProvider>
          {getInitColorSchemeScript({ defaultMode: "system" })}
          <CssBaseline />
          <Header />
          <Box
            component={"div"}
            sx={{
              position: "relative",
              zIndex: 10,
              backgroundColor: "background.paper",
              color: "text.primary",
              borderRadius: "0 0 24px 24px",
              overflow: "hidden",
              minHeight: "100vh",
            }}
          >
            {children}
          </Box>
          <Footer />
          <Cursor />
        </CursorProvider>
      </CssVarsProvider>
    </AppContext.Provider>
  );
}
