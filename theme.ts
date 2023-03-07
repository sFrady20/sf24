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
          [theme.breakpoints.down("lg")]: {
            maxWidth: "90vw",
            padding: 0,
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
    MuiTypography: {
      variants: [
        {
          props: { variant: "h5" },
          style: {
            fontSize: 18,
            fontFamily: "'Open Sans', sans-serif",
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
