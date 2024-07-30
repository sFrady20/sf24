"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import styles from "./style.module.css";
import { cn } from "@/utils/cn";

export const FileInput = forwardRef<
  ElementRef<"input">,
  Omit<ComponentPropsWithoutRef<"input">, "type">
>((props, ref) => {
  const { className, style, children, onChange, ...inputProps } = props;

  const [key, setKey] = useState(Math.random().toString(32).substring(7));

  return (
    <div ref={ref} style={style} className={cn(styles.container, className)}>
      <input
        key={key}
        {...inputProps}
        onChange={(e) => {
          onChange?.(e);
          if (e.defaultPrevented) return;
          setKey(Math.random().toString(32).substring(7));
        }}
        className={cn(styles.input)}
        type="file"
      />
      {children}
    </div>
  );
});
