import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: { mode: "dark", background: { default: "#000", paper: "#111" } },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "calc(var(--1svh) * 100)",

          ["& > #__next"]: {
            minHeight: "calc(var(--1svh) * 100)",
          },
        },
      },
    },
  },
});

export default theme;
