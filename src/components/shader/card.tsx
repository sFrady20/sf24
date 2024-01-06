"use client";

import Link from "next/link";
import { Shader } from "./component";
import { Button } from "../ui/button";
import { HTMLAttributes, useState } from "react";
import { cn } from "@/utils/cn";

export interface ShaderCardProps extends HTMLAttributes<HTMLDivElement> {
  frag: string;
  title?: string;
  subtitle?: string;
  shaderPath?: string;
  autoplay?: boolean;
}

export function ShaderCard(props: ShaderCardProps) {
  const {
    frag,
    title,
    subtitle,
    shaderPath,
    autoplay,
    className,
    onPointerEnter,
    onPointerLeave,
    ...rest
  } = props;

  const [isHovering, setHovering] = useState(false);

  return (
    <div
      {...rest}
      className={cn(
        "col-span-1 cursor-crosshair overflow-hidden h-0 pb-[72%] relative rounded-none",
        className
      )}
      onPointerEnter={(e) => {
        setHovering(true);
        onPointerEnter?.(e as any);
      }}
      onPointerLeave={(e) => {
        setHovering(false);
        onPointerLeave?.(e as any);
      }}
    >
      <Shader
        frag={frag}
        paused={!autoplay && !isHovering}
        className="absolute left-0 top-0 w-full h-full"
      />
      <div className="flex flex-row absolute left-0 bottom-0 w-full items-center justify-between pointer-events-none p-4">
        <div className="flex flex-col">
          <div className="text-[white] leading-none">{title}</div>
          <div className="text-[white]/60 leading-none">{subtitle}</div>
        </div>
        <div className="flex flex-row">
          {shaderPath && (
            <>
              <Button variant={"ghost"} asChild>
                <Link
                  href={`https://github.com/sFrady20/sf24/blob/main/src/shaders/${shaderPath}.frag.glsl`}
                  target={"_blank"}
                  className="pointer-events-auto cursor-alias text-[white]"
                  aria-label={`View souce code for shader titled "${title}"`}
                >
                  <i className="icon-[ri--github-fill] text-lg" />
                </Link>
              </Button>
              <Button variant={"ghost"} asChild>
                <Link
                  href={`/shaders/${shaderPath}`}
                  className="pointer-events-auto cursor-zoom-in text-[white]"
                  aria-label={`View shader titled "${title}" in fullscreen`}
                >
                  <i className="icon-[ri--fullscreen-fill] text-lg" />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
