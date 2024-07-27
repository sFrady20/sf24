import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import "./style.css";
import styles from "./style.module.css";
import { cn } from "@/utils/cn";

export const Slider = forwardRef<
  ElementRef<"input">,
  Omit<ComponentPropsWithoutRef<"input">, "type">
>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      className={cn(
        "flex-1 flex flex-row gap-4 items-center",
        styles.container
      )}
    >
      <input
        ref={ref}
        {...rest}
        className={cn("flex-1 h-10", styles.slider)}
        type="range"
      />
      <div className={cn("bg-foreground rounded-md", styles.track)} />
    </div>
  );
});
