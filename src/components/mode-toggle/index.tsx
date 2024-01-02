"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { ComponentProps } from "react";
import { AnimatePresence } from "framer-motion";

export function ModeToggle(props: ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        console.log(theme);
        setTheme(
          theme === "system" ? "dark" : theme === "dark" ? "light" : "system"
        );
      }}
      className="grid rounded-full"
    >
      <AnimatePresence>
        {theme === "light" && (
          <i
            key="light"
            className="icon-[ri--sun-fill] text-lg col-start-1 row-start-1"
          />
        )}
        {theme === "dark" && (
          <i
            key="dark"
            className="icon-[ri--moon-fill] text-lg col-start-1 row-start-1"
          />
        )}
        {theme === "system" && (
          <i
            key="system"
            className="icon-[ri--computer-fill] text-lg col-start-1 row-start-1"
          />
        )}
      </AnimatePresence>
    </Button>
  );
}
