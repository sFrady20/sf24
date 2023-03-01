"use client";

import "windi.css";
import "../styles.css";
import "large-small-dynamic-viewport-units-polyfill";

import { ReactNode } from "react";
import { AppProvider } from "./AppProvider";
import { install } from "ga-gtag";

//install GA4
if (typeof window !== "undefined" && process.env.NODE_ENV !== "development")
  install("G-CYYGZKHE9K");

export default function App(props: { children?: ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
