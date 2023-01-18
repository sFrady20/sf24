import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {},
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
