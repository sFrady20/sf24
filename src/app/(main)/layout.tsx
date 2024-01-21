import "@/components/analytics";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { AppProvider } from "./context";
import MenuToggle from "@/components/menu-toggle";
import Menu from "@/components/menu";
import Frady from "@/app/frady.svg";

const socials = [
  {
    link: "https://www.linkedin.com/in/stevenfrady",
    icon: "icon-[ri--linkedin-box-fill]",
    alt: "Connect with Steven Frady on LinkedIn",
  },
  {
    link: "https://twitter.com/slowjamsteve",
    icon: "icon-[ri--twitter-x-fill]",
    alt: "Follow Steven Frady on X (formally Twitter)",
  },
  {
    link: "https://github.com/sFrady20",
    icon: "icon-[ri--github-fill]",
    alt: "Follow Steven Frady on Github",
  },
  {
    link: "mailto:sfrady20@gmail.com",
    icon: "icon-[ri--mail-fill]",
    alt: "Send Steven Frady an email",
  },
];

export default function App(props: {
  children?: ReactNode;
  modal?: ReactNode;
}) {
  const { children, modal } = props;

  return (
    <AppProvider>
      <ThemeProvider>
        <div className="fixed top-0 left-0 w-full p-4 md:p-10 z-[40] pointer-events-auto">
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
            <div className="flex-row justify-center items-center gap-6 flex-1 hidden md:flex">
              {socials.map((x, i) => (
                <Button
                  key={i}
                  size={"icon"}
                  className="rounded-full"
                  variant={"ghost"}
                  asChild
                >
                  <Link href={x.link} target="_blank" aria-label={x.alt}>
                    <i className={cn("text-lg", x.icon)} />
                  </Link>
                </Button>
              ))}
            </div>
            <div className="flex-1 flex flex-row items-center justify-end">
              <ModeToggle />
              <MenuToggle variant={"ghost"} size={"icon"} className="md:hidden">
                <i className="icon-[ri--menu-fill]" />
              </MenuToggle>
            </div>
          </header>
        </div>

        <Menu
          socials={
            <>
              {socials.map((x, i) => (
                <Button
                  key={i}
                  size={"icon"}
                  className="rounded-full"
                  variant={"ghost"}
                  asChild
                >
                  <Link href={x.link} target="_blank" aria-label={x.alt}>
                    <i className={cn("text-lg", x.icon)} />
                  </Link>
                </Button>
              ))}
            </>
          }
        >
          <MenuToggle
            className="h-auto text-3xl md:text-5xl"
            variant={"ghost"}
            asChild
          >
            <Link href={"/"}>Home</Link>
          </MenuToggle>
          <MenuToggle
            className="h-auto text-3xl md:text-5xl"
            variant={"ghost"}
            asChild
          >
            <Link href={"/#startups"}>Startups</Link>
          </MenuToggle>
          <MenuToggle
            className="h-auto text-3xl md:text-5xl"
            variant={"ghost"}
            asChild
          >
            <Link href={"/#solo"}>Solo</Link>
          </MenuToggle>
          <MenuToggle
            className="h-auto text-3xl md:text-5xl"
            variant={"ghost"}
            asChild
          >
            <Link href={"/#oss"}>OSS</Link>
          </MenuToggle>
          <MenuToggle
            className="h-auto text-3xl md:text-5xl"
            variant={"ghost"}
            asChild
          >
            <Link href={"/#freelance"}>Freelance</Link>
          </MenuToggle>
          <MenuToggle
            className="h-auto text-3xl md:text-5xl"
            variant={"ghost"}
            asChild
          >
            <Link href={"/shaders"}>Shaders</Link>
          </MenuToggle>
        </Menu>

        {children}

        {modal}

        <footer className="py-[100px] bg-foreground/5">
          <div className="container flex flex-col gap-10">
            <div className="grid grid-cols-6 gap-4 gap-y-10 w-full">
              <div className="col-span-6 xl:col-span-3 h-full flex flex-col gap-4">
                <Frady className={"w-[100px] h-[30px]"} />
                <p className="opacity-60 text-sm">
                  Des. and Dev. by Steven Frady
                </p>
                <div className="text-sm">© 2024</div>
              </div>
              <div className="col-span-6 sm:col-span-2 xl:col-span-1 flex flex-col">
                {[
                  { link: "/", label: "Home" },
                  { link: "/#startups", label: "Startups" },
                  { link: "/#solo", label: "Solo" },
                  { link: "/#oss", label: "OSS" },
                  { link: "/#freelance", label: "Freelance" },
                  { link: "/shaders", label: "Shaders" },
                ].map((x, i) => (
                  <div key={i} className=" col-span-1">
                    <Link href={x.link} className="hover:underline">
                      {x.label}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="col-span-6 sm:col-span-2 xl:col-span-1 flex flex-col">
                {[
                  {
                    link: "https://www.linkedin.com/in/stevenfrady/",
                    label: "LinkedIn",
                  },
                  {
                    link: "https://twitter.com/slowjamsteve",
                    label: "X",
                  },
                  {
                    link: "https://github.com/sFrady20",
                    label: "Github",
                  },
                  {
                    link: "https://www.producthunt.com/@sfrady20",
                    label: "Product Hunt",
                  },
                  {
                    link: "https://leetcode.com/sfrady20/",
                    label: "Leet Code",
                  },
                  {
                    link: "https://dribbble.com/sfrady20",
                    label: "Dribbble",
                  },
                  {
                    link: "https://calendly.com/sfrady20",
                    label: "Calendly",
                  },
                ].map((x, i) => (
                  <div key={i} className=" col-span-1">
                    <Link
                      href={x.link}
                      className="hover:underline"
                      target="_blank"
                    >
                      {x.label}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="col-span-6 sm:col-span-2 xl:col-span-1 flex flex-col">
                <div className=" col-span-1 opacity-60">
                  <Link
                    href={"mailto:sfrady20@gmail.com"}
                    download
                    className="hover:underline flex flex-row items-center gap-2"
                    target="_blank"
                  >
                    <i className="icon-[ri--mail-fill]" />
                    <div>Email me</div>
                  </Link>
                  <Link
                    href={"/resume.pdf"}
                    download
                    className="hover:underline flex flex-row items-center gap-2"
                    target="_blank"
                  >
                    <i className="icon-[ri--download-cloud-fill]" />
                    <div>Download Resume</div>
                  </Link>
                  <Link
                    href={"https://venmo.com/?txn=pay&recipients=sfrady"}
                    download
                    className="hover:underline flex flex-row items-center gap-2"
                    target="_blank"
                  >
                    <i className="icon-[ri--cup-fill]" />
                    <div>Buy me a coffee</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </ThemeProvider>
    </AppProvider>
  );
}
