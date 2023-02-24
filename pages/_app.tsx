import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";
import theme from "theme";
import { Cursor, CursorProvider } from "components/Cursor";
import "windi.css";
import "../styles.css";
import "large-small-dynamic-viewport-units-polyfill";

export default function App(props: AppProps) {
  const { Component } = props;

  return (
    <ThemeProvider theme={theme}>
      <CursorProvider>
        <CssBaseline />
        <Component {...props} />
        <Cursor />
      </CursorProvider>
    </ThemeProvider>
  );
}
