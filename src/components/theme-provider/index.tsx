"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";

export const holiday = DateTime.fromISO("2024-02-14");

export const themes =
  holiday.hasSame(DateTime.now(), "day") && "holiday"
    ? (["dark", "light", "system", "favorite", "holiday"] as const)
    : (["dark", "light", "system", "favorite"] as const);

type Theme = (typeof themes)[number];

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (typeof window !== "undefined" &&
        (localStorage.getItem(storageKey) as Theme)) ||
      (holiday.hasSame(DateTime.now(), "day") && "holiday") ||
      defaultTheme
  );

  const actualTheme = useMemo(
    () =>
      typeof window === "undefined"
        ? "system"
        : theme === "system"
        ? holiday.hasSame(DateTime.now(), "day") && "holiday"
          ? "holiday"
          : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme,
    [theme]
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(...themes);
    root.classList.add(actualTheme);
  }, [actualTheme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  } as const;

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
