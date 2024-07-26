import { Lato } from "next/font/google";
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
const body = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const fonts = { display, title, body };
