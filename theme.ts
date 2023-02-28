import { ThemeOptions } from "@mui/material";

export const defaultTheme: ThemeOptions = {
  typography: {
    fontFamily: "Optician",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "inherit",
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.between("md", "lg")]: {
            maxWidth: "90vw",
          },
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "calc(var(--1svh) * 100)",
          overflowX: "hidden",

          ["a, a:visited, a:hover, a:active"]: {
            color: "inherit",
            textDecoration: "none",
          },
          ["ul"]: {
            margin: 0,
            padding: 0,
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
