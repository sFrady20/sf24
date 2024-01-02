import { IBM_Plex_Sans, IBM_Plex_Serif, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";

const display = localFont({
  src: "./Zighead.otf",
  weight: "400",
  variable: "--font-display",
});
const title = localFont({
  src: "./Optiker-K.woff",
  weight: "400",
  variable: "--font-title",
});
const body = localFont({
  src: "./Optiker-K.woff",
  weight: "400",
  variable: "--font-body",
});

export const fonts = { display, title, body };
