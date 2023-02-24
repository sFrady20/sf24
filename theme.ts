import { ThemeOptions } from "@mui/material";

export const defaultTheme: ThemeOptions = {
  typography: {
    fontFamily: "Optician",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "calc(var(--1svh) * 100)",
          overflowX: "hidden",

          ["a, a:visited, a:hover, a:active"]: {
            color: "inherit",
          },
          ["ul"]: {
            margin: 0,
          },

          ["& > #__next"]: {
            minHeight: "calc(var(--1svh) * 100)",
          },

          ["*::selection"]: {
            background: "#00000009",
          },
        },
      },
    },
  },
};
