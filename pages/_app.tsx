import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "theme";
import "../styles.css";
import "large-small-dynamic-viewport-units-polyfill";

export default function App(props: AppProps) {
  const { Component } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...props} />
    </ThemeProvider>
  );
}
