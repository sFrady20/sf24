"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { Howl } from "howler";
import { Button } from "../ui/button";
import { useAnimationFrame } from "framer-motion";
import { cn } from "@/utils/cn";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const MusicButton = forwardRef<
  ElementRef<"div">,
  ComponentPropsWithoutRef<"div"> & { src: string }
>((props, ref) => {
  const { className, style, src, ...rest } = props;

  const [isPlaying, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const song = useMemo(() => {
    return new Howl({
      src,
      onplay: () => {
        setPlaying(true);
      },
      onpause: () => {
        setPlaying(false);
      },
      onend: () => {
        setPlaying(false);
        setProgress(0);
      },
      onstop: () => {
        setPlaying(false);
        setProgress(0);
      },
    });
  }, []);

  useAnimationFrame(() => {
    if (isPlaying)
      setProgress(Math.round((song.seek() / song.duration()) * 100) / 100);
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={ref}
          {...rest}
          className={cn(
            "-m-1 flex flex-row gap-4 z-[60] p-1 relative z-[20] rounded-full overflow-hidden",
            className
          )}
          style={{
            ...style,
            background: `conic-gradient(hsl(var(--foreground)) ${
              progress * 360 - 1
            }deg, transparent ${progress * 360}deg)`,
          }}
        >
          <div
            className={cn(
              "rounded-full flex",
              progress !== 0 && "bg-background"
            )}
          >
            <Button
              variant={isPlaying ? "outline" : "default"}
              size={"icon"}
              className={cn(
                "relative text-lg hover:bg-foreground/30 border rounded-full",
                isPlaying
                  ? "bg-foreground/20 border-foreground/50"
                  : "bg-background border-foreground/30",
                progress === 0 &&
                  "border-none bg-[transparent] hover:bg-foreground/30"
              )}
              onClick={() => {
                if (isPlaying) song.pause();
                else song.play();
              }}
              aria-label={isPlaying ? "Stop music" : "Start music"}
            >
              <i
                className={cn(
                  "icon-[ri--pause-fill] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 -rotate-180 transition-all",
                  isPlaying && "opacity-100 rotate-0"
                )}
              />
              <i
                className={cn(
                  "icon-[ri--music-2-fill] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 rotate-0 transition-all",
                  isPlaying && "opacity-0 rotate-180"
                )}
              />
            </Button>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        key={isPlaying ? `on` : `off`}
        className="font-title"
      >
        {isPlaying ? "Pause music" : "Play my theme song"}
      </TooltipContent>
    </Tooltip>
  );
});
