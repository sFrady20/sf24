"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import { CursorProvider } from "components/Cursor";
import { defaultThemeOptions } from "theme";

const theme = extendTheme(defaultThemeOptions);

const AppContext = createContext<{}>({});

export function useApp() {
  return useContext(AppContext);
}

export function Providers(props: { children?: ReactNode }) {
  const { children } = props;

  return (
    <AppContext.Provider value={{}}>
      <CssVarsProvider theme={theme}>
        <CursorProvider>{children}</CursorProvider>
      </CssVarsProvider>
    </AppContext.Provider>
  );
}
