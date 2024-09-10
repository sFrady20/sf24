"use client";

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

export const AppNameGenerationForm = forwardRef<
  ElementRef<"form">,
  Omit<ComponentPropsWithoutRef<"form">, "action">
>((props, ref) => {
  const { ...rest } = props;

  return <form ref={ref} {...rest} action={() => {}} />;
});
