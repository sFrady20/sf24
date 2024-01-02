"use client";

import { Button } from "@/components/ui/button";
import { themes, useTheme } from "@/components/theme-provider";
import { ComponentProps, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ModeToggle(props: ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme();

  const [mode, setMode] = useState(themes.indexOf(theme));

  useEffect(() => {
    setTheme(themes[mode]);
  }, [themes, mode]);

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        setMode((mode + 1) % themes.length);
      }}
      className="grid rounded-full"
    >
      {typeof window !== "undefined" && (
        <AnimatePresence initial>
          {theme === "light" && (
            <motion.i
              key="light"
              initial={{ rotate: "-90deg", opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: "90deg", opacity: 0 }}
              className="icon-[ri--sun-fill] text-lg col-start-1 row-start-1"
            />
          )}
          {theme === "dark" && (
            <motion.i
              key="dark"
              initial={{ rotate: "-90deg", opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: "90deg", opacity: 0 }}
              className="icon-[ri--moon-fill] text-lg col-start-1 row-start-1"
            />
          )}
          {theme === "system" && (
            <motion.i
              key="system"
              initial={{ rotate: "-90deg", opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: "90deg", opacity: 0 }}
              className="icon-[ri--computer-fill] text-lg col-start-1 row-start-1"
            />
          )}
          {theme === "holiday" && (
            <motion.i
              key="holiday"
              initial={{ rotate: "-90deg", opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: "90deg", opacity: 0 }}
              className="text-lg col-start-1 row-start-1"
            >
              🎅
            </motion.i>
          )}
        </AnimatePresence>
      )}
    </Button>
  );
}
