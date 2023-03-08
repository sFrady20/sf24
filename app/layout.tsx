"use client";

import "windi.css";
import "../styles.css";
import "large-small-dynamic-viewport-units-polyfill";

import { ReactNode } from "react";
import { Providers } from "./Providers";
import { install } from "ga-gtag";
import { Box, CssBaseline, getInitColorSchemeScript } from "@mui/material";
import Header from "./Header";
import { Footer } from "./Footer";
import { Cursor } from "components/Cursor";

//install GA4
if (typeof window !== "undefined" && process.env.NODE_ENV !== "development")
  install("G-CYYGZKHE9K");

export default function App(props: { children?: ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        {getInitColorSchemeScript({ defaultMode: "system" })}
        <Providers>
          <CssBaseline />
          <Header />
          <Box
            component={"div"}
            sx={{
              position: "relative",
              zIndex: 10,
              backgroundColor: "background.default",
              color: "text.primary",
              borderRadius: "0 0 24px 24px",
              overflow: "hidden",
              boxShadow: "0 5px 20px -10px rgb(0 0 0 / 30%)",
              minHeight: "calc(100vh - 60px)",
            }}
          >
            {children}
          </Box>
          <Footer />
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
