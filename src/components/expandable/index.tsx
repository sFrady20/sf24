"use client";

import { cn } from "@/utils/cn";
import { HTMLAttributes, forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";

export interface ExpandableProps extends HTMLAttributes<HTMLDivElement> {}

export const Expandable = forwardRef<HTMLDivElement, ExpandableProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    const [isExpanded, setExpanded] = useState(false);

    return (
      <div className="flex flex-col items-center">
        <div
          ref={ref}
          data-open={isExpanded}
          {...rest}
          className={cn(
            "max-h-[500px] overflow-hidden w-full relative",
            isExpanded
              ? "max-h-none"
              : "after:absolute after:inset-0 after:bg-gradient-to-b after:from-[transparent] after:via-transparent after:to-[#011627]",
            className
          )}
        >
          {children}
        </div>
        <Button
          variant={"ghost"}
          className="gap-1 w-full"
          onClick={() => {
            setExpanded((x) => !x);
          }}
        >
          {isExpanded ? (
            <>
              <i className="icon-[ri--arrow-up-s-fill] text-lg" />
              <div>Collapse code</div>
            </>
          ) : (
            <>
              <i className="icon-[ri--arrow-down-s-fill] text-lg" />
              <div>Show full code</div>
            </>
          )}
        </Button>
      </div>
    );
  }
);
