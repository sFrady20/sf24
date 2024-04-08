"use client";

import { useEffect, useMemo, useState } from "react";
import { Howl } from "howler";
import { Button } from "../ui/button";
import { useAnimationFrame } from "framer-motion";
import { cn } from "@/utils/cn";

export function MusicPlayer(props: {}) {
  const [isPlaying, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const song = useMemo(() => {
    return new Howl({
      src: `/theme-song.mp3`,
      onplay: () => {
        setPlaying(true);
      },
      onpause: () => {
        setPlaying(false);
      },
      onend: () => {
        setPlaying(false);
      },
      onstop: () => {
        setPlaying(false);
        setProgress(0);
      },
    });
  }, []);

  useAnimationFrame(() => {
    if (isPlaying)
      setProgress(Math.round((song.seek() / song.duration()) * 100));
  });

  return (
    <div
      className="fixed right-10 bottom-10 flex flex-row gap-4 z-[60] p-1 rounded-lg"
      style={{
        background: `conic-gradient(hsl(var(--foreground)) ${
          progress - 1
        }deg, transparent ${progress}deg)`,
      }}
    >
      <div className="bg-background rounded-md flex">
        <Button
          variant={isPlaying ? "outline" : "default"}
          size={"icon"}
          className={cn(
            "relative text-lg hover:bg-foreground/30 border",
            isPlaying
              ? "bg-foreground/20 border-foreground/50"
              : "bg-background border-foreground/30"
          )}
          onClick={() => {
            if (isPlaying) song.pause();
            else song.play();
          }}
        >
          <i
            className={cn(
              "icon-[ri--pause-fill] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition",
              isPlaying && "opacity-100"
            )}
          />
          <i
            className={cn(
              "icon-[ri--music-2-fill] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 transition",
              isPlaying && "opacity-0"
            )}
          />
        </Button>
      </div>
    </div>
  );
}
