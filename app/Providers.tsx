"use client";

import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import {
  CssVarsThemeOptions,
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import { CursorProvider } from "components/Cursor";
import { defaultTheme } from "theme";
import merge from "lodash/merge";

const themePresets = {
  default: {},
} satisfies { [k: string]: CssVarsThemeOptions };

type AppThemePreset = keyof typeof themePresets;
const AppContext = createContext<{
  themePreset: AppThemePreset;
  setThemePreset: Dispatch<SetStateAction<AppThemePreset>>;
}>({
  themePreset: "default",
  setThemePreset: () => {},
});

export function useApp() {
  return useContext(AppContext);
}

export function Providers(props: { children?: ReactNode }) {
  const { children } = props;

  const [themePreset, setThemePreset] = useState<AppThemePreset>("default");

  const theme = useMemo(
    () => extendTheme(merge(defaultTheme, themePresets[themePreset])),
    [themePreset]
  );

  return (
    <AppContext.Provider value={{ themePreset, setThemePreset }}>
      <CssVarsProvider theme={theme}>
        <CursorProvider>{children}</CursorProvider>
      </CssVarsProvider>
    </AppContext.Provider>
  );
}
