import {
  useState,
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material";
import { CursorProvider } from "components/Cursor";
import { themes } from "themes";

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

export function Providers(props: { children?: ReactNode }) {
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
        <CursorProvider>{children}</CursorProvider>
      </CssVarsProvider>
    </AppContext.Provider>
  );
}
