import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {},
  typography: {
    fontFamily: "Optician",
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
});

export default theme;
