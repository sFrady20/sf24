import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import styles from "./style.module.css";
import { cn } from "@/utils/cn";

export const Slider = forwardRef<
  ElementRef<"div">,
  Omit<ComponentPropsWithoutRef<"input">, "type">
>((props, ref) => {
  const { className, style, ...inputProps } = props;

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "flex-1 flex flex-row gap-4 items-center",
        styles.container,
        className
      )}
    >
      <input {...inputProps} className={styles.input} type="range" />
    </div>
  );
});
