"use client";

import { cn } from "@/utils/cn";
import {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { useCastSender } from "@/components/cast/sender";
import { useCanvasRecorder } from "@/utils/use-canvas-recorder";

export interface CodeExpanderProps extends HTMLAttributes<HTMLDivElement> {}

export const CodeExpander = forwardRef<HTMLDivElement, CodeExpanderProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    const [isExpanded, setExpanded] = useState(false);

    return (
      <div className="flex flex-col items-center">
        <div
          ref={ref}
          data-open={isExpanded}
          {...rest}
          className={cn(
            "max-h-[500px] overflow-hidden w-full relative",
            isExpanded
              ? "max-h-none"
              : "after:absolute after:inset-0 after:bg-gradient-to-b after:from-[transparent] after:via-transparent after:to-[#011627]",
            className
          )}
        >
          {children}
        </div>
        <Button
          variant={"ghost"}
          className="gap-1 w-full"
          onClick={() => {
            setExpanded((x) => !x);
          }}
        >
          {isExpanded ? (
            <>
              <i className="icon-[ri--arrow-up-s-fill] text-lg" />
              <div>Collapse code</div>
            </>
          ) : (
            <>
              <i className="icon-[ri--arrow-down-s-fill] text-lg" />
              <div>Show full code</div>
            </>
          )}
        </Button>
      </div>
    );
  }
);

export function CastButton(props: {
  children?: ReactNode;
  shaderPath: string;
}) {
  const { children, shaderPath } = props;

  const ref = useRef<HTMLButtonElement>(null);

  const sender = useCastSender()();

  if (!sender.initialized) return null;

  return (
    <Button
      ref={ref}
      variant={"ghost"}
      className="gap-2"
      onClick={async (e) => {
        const session = await sender.refreshSession();
        if (!session) await sender.requestSession();
        await sender.sendMessage(
          new chrome.cast.media.MediaInfo(`shader/${shaderPath}`, "video/mp4")
        );
      }}
    >
      <div
        className="w-[1em] h-[1em]"
        dangerouslySetInnerHTML={{
          __html: `<google-cast-launcher></google-cast-launcher>`,
        }}
      />
      {children}
    </Button>
  );
}

export const RecordButton = function ({
  canvasSelector,
  filename,
}: {
  canvasSelector: string;
  filename: string;
}) {
  const { startRecording, saveRecording, isRecording } =
    useCanvasRecorder(canvasSelector);

  return (
    <Button
      variant={"ghost"}
      className="group flex flex-row gap-2"
      data-enabled={isRecording}
      onClick={() => {
        if (isRecording) {
          saveRecording(filename);
        } else {
          startRecording();
        }
      }}
    >
      <i
        className={cn(
          "icon-[ri--record-circle-line] text-lg group-data-[enabled=true]:text-red-500 group-data-[enabled=true]:icon-[ri--record-circle-fill]"
        )}
      />
      <div className="block group-data-[enabled=true]:hidden">
        Capture Recording
      </div>
      <div className="hidden group-data-[enabled=true]:block">
        Save Recording
      </div>
    </Button>
  );
};
