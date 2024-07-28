import "@/components/analytics";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppProvider } from "./context";
import MenuToggle from "@/components/menu-toggle";
import Menu from "@/components/menu";
import Frady from "@/app/frady.svg";
import { CastSenderProvider } from "@/components/cast/sender";
import { MusicButton } from "@/components/music-button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ColorSchemeToggle } from "@/components/mode-toggle";
import { cookies } from "next/headers";

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

export default async function (props: {
  children?: ReactNode;
  modal?: ReactNode;
}) {
  const { children, modal } = props;

  const cookieJar = cookies();
  const colorScheme = cookieJar.get("color-scheme")?.value || "dark";

  return (
    <CastSenderProvider>
      <AppProvider>
        <TooltipProvider delayDuration={300}>
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
              <div className="flex-1 flex flex-row items-center justify-end gap-2 md:gap-4">
                <MusicButton src="/music/lets-connect.mp3" />
                <ColorSchemeToggle colorScheme={colorScheme} />
                <MenuToggle
                  variant={"ghost"}
                  size={"icon"}
                  className="md:hidden rounded-full"
                >
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
              <Link href={"/#apps"}>Apps</Link>
            </MenuToggle>
            {/* <MenuToggle
                className="h-auto text-3xl md:text-5xl"
                variant={"ghost"}
                asChild
              >
                <Link href={"/#tools"}>Tools</Link>
              </MenuToggle> */}
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
                <div className="col-span-6 sm:col-span-2 xl:col-span-1 flex flex-col gap-1">
                  {[
                    { link: "/", label: "Home" },
                    { link: "/#apps", label: "Apps" },
                    // { link: "/#tools", label: "Tools" },
                    { link: "/#oss", label: "OSS" },
                    { link: "/#freelance", label: "Freelance" },
                    { link: "/shaders", label: "Shaders" },
                    { link: "/tools", label: "Tools" },
                  ].map((x, i) => (
                    <div key={i} className=" col-span-1">
                      <Link
                        href={x.link}
                        className="hover:underline text-sm font-title"
                      >
                        {x.label}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="col-span-6 sm:col-span-2 xl:col-span-1 flex flex-col gap-1">
                  {[
                    {
                      link: "https://www.linkedin.com/in/stevenfrady/",
                      label: "LinkedIn",
                    },
                    {
                      link: "https://twitter.com/slowjamsteve",
                      label: "X (Formally Twitter)",
                    },
                    {
                      link: "https://peerlist.io/sfrady20",
                      label: "Peerlist",
                    },
                    {
                      link: "https://github.com/sFrady20",
                      label: "Github",
                    },
                    {
                      link: "https://dribbble.com/sfrady20",
                      label: "Dribbble",
                    },
                    {
                      link: "https://soundcloud.com/sultan-zabu",
                      label: "SoundCloud",
                    },
                    // {
                    //   link: "https://www.producthunt.com/@sfrady20",
                    //   label: "Product Hunt",
                    // },
                    // {
                    //   link: "https://calendly.com/sfrady20",
                    //   label: "Calendly",
                    // },
                  ].map((x, i) => (
                    <div key={i} className="col-span-1">
                      <Link
                        href={x.link}
                        className="hover:underline text-sm font-title"
                        target="_blank"
                      >
                        {x.label}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="col-span-6 sm:col-span-2 xl:col-span-1 flex flex-col gap-1 opacity-60">
                  <Link
                    href={"mailto:sfrady20@gmail.com"}
                    download
                    className="hover:underline flex flex-row items-center gap-2 font-title text-sm"
                    target="_blank"
                  >
                    <i className="icon-[ri--mail-fill]" />
                    <div>Email me</div>
                  </Link>
                  <Link
                    href={"https://resume.stevenfrady.com"}
                    download
                    className="hover:underline flex flex-row items-center gap-2 font-title text-sm"
                    target="_blank"
                  >
                    <i className="icon-[ri--download-cloud-fill]" />
                    <div>Resume</div>
                  </Link>
                  <Link
                    href={"https://venmo.com/?txn=pay&recipients=sfrady"}
                    download
                    className="hover:underline flex flex-row items-center gap-2 font-title text-sm"
                    target="_blank"
                  >
                    <i className="icon-[ri--cup-fill]" />
                    <div>Buy me a coffee</div>
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </TooltipProvider>
      </AppProvider>
    </CastSenderProvider>
  );
}
