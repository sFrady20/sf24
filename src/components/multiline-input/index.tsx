"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useState,
} from "react";
import styles from "./style.module.css";
import { cn } from "@/utils/cn";

export const MultilineInput = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"textarea">
>((props, ref) => {
  const {
    className,
    style,
    children,
    onChange,
    value,
    defaultValue,
    ...inputProps
  } = props;

  const [replicatedValue, setReplicatedValue] = useState(value || defaultValue);

  return (
    <div
      ref={ref}
      style={style}
      data-replicated-value={replicatedValue}
      className={cn(styles.container, className)}
    >
      <textarea
        rows={1}
        {...inputProps}
        value={value}
        defaultValue={defaultValue}
        className={cn(styles.control)}
        onChange={(e) => {
          setReplicatedValue(e.target.value);
          onChange?.(e);
        }}
      />
      {children}
    </div>
  );
});
