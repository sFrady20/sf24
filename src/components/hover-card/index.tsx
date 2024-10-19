"use client";

import { cn } from "@/utils/cn";
import { createContextStore, useMemoStore } from "@/utils/store";
import { Slot } from "@radix-ui/react-slot";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  forwardRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/app/(main)/context";

type HoverCardState = {
  isOpen: boolean;
  key: string;
};

const { Context: HoverCardContext, hook: useHoverCard } =
  createContextStore<HoverCardState>({
    isOpen: false,
    key: Math.random().toString(32).substring(7),
  });

export const HoverCard = forwardRef<HTMLDivElement, HoverCardTriggerProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    const store = useMemoStore<HoverCardState>({
      isOpen: false,
      key: Math.random().toString(32).substring(7),
    });

    return (
      <HoverCardContext.Provider value={store}>
        <div ref={ref} {...rest} className={"relative"}>
          {children}
        </div>
      </HoverCardContext.Provider>
    );
  }
);

export interface HoverCardTriggerProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const HoverCardTrigger = forwardRef<
  HTMLDivElement,
  HoverCardTriggerProps
>((props, ref) => {
  const { asChild, className, onPointerEnter, onPointerLeave, ...rest } = props;

  const hoverCard = useHoverCard();

  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      {...rest}
      onPointerEnter={(e) => {
        hoverCard.setState({
          isOpen: true,
          key: Math.random().toString(32).substring(7),
        });
        onPointerEnter?.(e as any);
      }}
      onPointerLeave={(e) => {
        hoverCard.setState({ isOpen: false });
        onPointerLeave?.(e as any);
      }}
      className={cn("", className)}
    />
  );
});

export const HoverCardContent = forwardRef<
  ElementRef<typeof motion.div>,
  ComponentPropsWithoutRef<typeof motion.div>
>((props, ref) => {
  const { className, ...rest } = props;

  const hoverCard = useHoverCard();
  const isOpen = hoverCard((x) => x.isOpen);
  const key = hoverCard((x) => x.key);

  const app = useApp();
  const xMove = app((x) => x.mouse.x / x.window.width - 0.5);
  const yMove = app((x) => x.mouse.y / x.window.height - 0.5);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          key={key}
          variants={{
            initial: {},
            animate: { transition: { when: "beforeChildren" } },
            exit: { transition: { when: "afterChildren" } },
          }}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          style={{
            transform: `translate(${-50 + xMove * 100}%, ${
              -50 + yMove * 100
            }%)`,
          }}
          {...rest}
          className={cn(
            "absolute pointer-events-none overflow-hidden",
            className
          )}
        />
      )}
    </AnimatePresence>
  );
});

export const HoverCardInner = forwardRef<
  ElementRef<typeof motion.div>,
  ComponentPropsWithoutRef<typeof motion.div>
>((props, ref) => {
  const { ...rest } = props;
  return <motion.div ref={ref} {...rest} />;
});
