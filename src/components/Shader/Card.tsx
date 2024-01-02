"use client";

import Link from "next/link";
import { Shader } from "./component";
import { Button } from "../ui/button";
import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

export interface ShaderCardProps extends HTMLAttributes<HTMLDivElement> {
  frag: string;
  title?: string;
  subtitle?: string;
  sourceHref?: string;
  autoplay?: boolean;
}

export function ShaderCard(props: ShaderCardProps) {
  const { frag, title, subtitle, sourceHref, autoplay, className, ...rest } =
    props;

  // const backdropRgb = Color(theme.palette.common.black)
  //   .rgb()
  //   .array()
  //   .map((x) => `${x / 2.55}%`)
  //   .join(" ");

  return (
    <div
      {...rest}
      className={cn(
        "col-span-1 cursor-crosshair overflow-hidden h-0 pb-[72%] relative rounded-none",
        className
      )}
    >
      <Shader
        frag={frag}
        paused={!autoplay}
        className="absolute left-0 top-0 w-full h-full"
      />
      <div className="flex flex-row absolute left-0 bottom-0 w-full items-center justify-between pointer-events-none p-4">
        <div className="flex flex-col">
          <div className="text-[white] leading-none">{title}</div>
          <div className="text-[white]/60 leading-none">{subtitle}</div>
        </div>
        <div className="flex flex-row">
          {sourceHref && (
            <Button variant={"ghost"} asChild>
              <Link
                href={sourceHref}
                target={"_blank"}
                className="pointer-events-auto cursor-alias text-[white]"
              >
                <i className="icon-[ri--github-fill] text-lg" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
