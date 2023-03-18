import { createTheme, CssVarsThemeOptions } from "@mui/material";

const shamrock = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#004400",
    },
  },
});

export const defaultThemeOptions: CssVarsThemeOptions = {
  colorSchemes: {
    light: {
      palette: { background: { default: "#D9D9D9", paper: "#DDD" } },
    },
    dark: {},
  },
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
          [theme.breakpoints.down("lg")]: {
            maxWidth: "90vw",
            padding: 0,
          },
        }),
      },
    },
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          minHeight: "calc(var(--1svh) * 100)",
          overflowX: "hidden",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,

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
      }),
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: "h5" },
          style: {
            fontSize: 16,
            //fontFamily: "'Open Sans', sans-serif",
          },
        },
        {
          props: { variant: "subtitle2" },
          style: ({ theme }) => ({
            fontSize: 12,
            fontFamily: "'Open Sans', sans-serif",
            letterSpacing: 1.1,
          }),
        },
        {
          props: { variant: "caption" },
          style: ({ theme }) => ({
            color: theme.palette.text.secondary,
            fontFamily: "'Open Sans', sans-serif",
            letterSpacing: 1.1,
          }),
        },
      ],
    },
  },
};
