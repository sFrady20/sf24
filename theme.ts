import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: { background: { default: "#E5E7E8", paper: "#111" } },
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
