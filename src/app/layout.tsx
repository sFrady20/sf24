import "../globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";
import { Viewport } from "next/types";
import "@/components/analytics";
import { cn } from "@/utils/cn";
import { fonts } from "@/utils/fonts";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Steven Frady - Creative Full-Stack Developer",
  description:
    "I began teaching myself to code as a teenager, starting with video games and discovering how programming could bring creative ideas to life. I later pursued a Bachelor of Fine Arts from Savannah College of Art and Design to complement those burgeoning technical skills with visual artistry. Over 8 years as a developer, I’ve combined design and programming to craft digital experiences for global clients. At NCR Corporation, I built an intuitive React component library for cross-platform use. Through freelance and collaborative projects, I continuously hone abilities across the web and mobile stack to create unified solutions. Each endeavor reveals new opportunities to better serve users and evolve as a developer.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon/favicon-32x32.png",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060d1d" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

/*
<meta property="og:type" content="website" />
<meta property="og:url" content="https://www.stevenfrady.com/" />
<meta
  property="og:title"
  content="Steven Frady - Creative Full-Stack Developer"
/>
<meta
  property="og:description"
  content="I am a creative full-stack developer with over 8 years of experience. I specialize in building elegant solutions and I'm constantly crafting new features with a focus on simplicity and scalability."
/>
<meta property="og:image" content="http://stevenfrady.com/social.jpg" />

<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://www.stevenfrady.com/" />
<meta
  property="twitter:title"
  content="Steven Frady - Creative Full-Stack Developer"
/>
<meta
  property="twitter:description"
  content="I am a creative full-stack developer with over 8 years of experience. I specialize in building elegant solutions and I'm constantly crafting new features with a focus on simplicity and scalability."
/>
<meta
  property="twitter:image"
  content="http://stevenfrady.com/social.jpg"
/>
*/

export default function App(props: { children?: ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body
        className={cn(
          fonts.display.variable,
          fonts.title.variable,
          fonts.body.variable,
          "bg-background text-foreground font-body selection:bg-foreground selection:text-background"
        )}
      >
        <ThemeProvider>
          <div className="fixed top-0 left-0 w-full p-10 z-[40]">
            <header className="flex flex-row justify-between items-center h-[50px] bg-background/30 backdrop-blur-lg rounded-full px-2">
              <div className="flex-1 flex flex-row items-center justify-start">
                <Button
                  variant={"ghost"}
                  className="gap-3 pl-1 rounded-full"
                  asChild
                >
                  <Link href={"/"}>
                    <Image
                      src={"/avatar.webp"}
                      width={32}
                      height={32}
                      className="rounded-full"
                      alt="Steven Frady"
                    />
                    <h1>SF24</h1>
                  </Link>
                </Button>
              </div>
              <div className="flex flex-row justify-center items-center gap-6 flex-1">
                {[
                  {
                    link: "https://www.linkedin.com/in/stevenfrady",
                    icon: "icon-[ri--linkedin-box-fill]",
                  },
                  {
                    link: "https://twitter.com/slowjamsteve",
                    icon: "icon-[ri--twitter-x-fill]",
                  },
                  {
                    link: "https://github.com/sFrady20",
                    icon: "icon-[ri--github-fill]",
                  },
                  {
                    link: "mailto:sfrady20@gmail.com",
                    icon: "icon-[ri--mail-fill]",
                  },
                ].map((x, i) => (
                  <Button
                    key={i}
                    size={"icon"}
                    className="rounded-full"
                    variant={"ghost"}
                    asChild
                  >
                    <Link href={x.link} target="_blank">
                      <i className={cn("text-lg", x.icon)} />
                    </Link>
                  </Button>
                ))}
              </div>
              <div className="flex-1 flex flex-row items-center justify-end">
                <ModeToggle />
              </div>
            </header>
          </div>

          {children}
        </ThemeProvider>
        <footer className="py-[100px] text-center bg-foreground/5">
          <p className="opacity-60 text-sm">
            Des. and Dev. by Steven Frady © 2024
          </p>
        </footer>
      </body>
    </html>
  );
}
