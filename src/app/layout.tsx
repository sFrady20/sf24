import "@/globals.css";
import "@/components/analytics";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Viewport } from "next/types";
import { cn } from "@/utils/cn";
import { fonts } from "@/utils/fonts";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Steven Frady - Creative Full-Stack Developer",
  description:
    "I am a developer with over 9 years of experience, specializing in web and mobile development. My work is focused on creating user-centric solutions, with a commitment to continuous learning and innovation in the tech field.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon/favicon-32x32.png",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: "Steven Frady - Creative Full-Stack Developer",
    url: "https://www.stevenfrady.com/",
    type: "website",
    images: [
      "http://stevenfrady.com/social.webp",
      "http://stevenfrady.com/social.png",
    ],
    videos: [
      "http://stevenfrady.com/social.webm",
      "http://stevenfrady.com/social.mp4",
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060d1d" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function App(props: { children?: ReactNode }) {
  const { children } = props;

  const cookieJar = cookies();

  const colorScheme = cookieJar.get("color-scheme");

  return (
    <html lang="en">
      <body
        className={cn(
          fonts.display.variable,
          fonts.title.variable,
          fonts.body.variable,
          "bg-background text-foreground font-body selection:bg-foreground selection:text-background",
          colorScheme?.value || "system"
        )}
      >
        {children}
      </body>
    </html>
  );
}
