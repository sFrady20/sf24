"use client";

import { ReactNode } from "react";
import { Button, ButtonProps } from "../ui/button";
import { useApp } from "@/app/context";

export default function (props: { children: ReactNode } & ButtonProps) {
  const { children, ...rest } = props;

  const app = useApp();

  return (
    <Button
      {...rest}
      onClick={() =>
        app.setState((x) => {
          x.isMenuOpen = !x.isMenuOpen;
        })
      }
    >
      {children}
    </Button>
  );
}
