"use client";

import { cn } from "@/utils/cn";
import { createContextStore, useMemoStore } from "@/utils/store";
import { Slot } from "@radix-ui/react-slot";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type HoverCardState = {
  isOpen?: boolean;
};

const { Context: HoverCardContext, hook: useHoverCard } =
  createContextStore<HoverCardState>({
    isOpen: false,
  });

export const HoverCard = forwardRef<HTMLDivElement, HoverCardTriggerProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    const store = useMemoStore<HoverCardState>({});

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
        hoverCard.setState({ isOpen: true });
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          variants={{
            initial: {},
            animate: { transition: { when: "beforeChildren" } },
            exit: { transition: { when: "afterChildren" } },
          }}
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
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
