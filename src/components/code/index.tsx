"use client";

import highlight from "@/services/highlight";
import { cn } from "@/utils/cn";
import { HTMLAttributes, forwardRef, useMemo } from "react";

export interface CodeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children?: string;
  language: string;
}

// const d = glslPlugin;

export const Code = forwardRef<HTMLDivElement, CodeProps>((props, ref) => {
  const { children, language, className, ...rest } = props;

  const highlighted = useMemo(
    () => highlight.highlight((children || ""), { language }).value,
    [children, language]
  );

  return (
    <code
      ref={ref}
      {...rest}
      className={cn("whitespace-pre-wrap", className)}
      dangerouslySetInnerHTML={{
        __html: highlighted,
      }}
    />
  );
});
