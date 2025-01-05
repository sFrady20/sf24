"use client";

import { useRef, useCallback, useState } from "react";

export const useCanvasRecorder = (canvasSelector: string) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = useCallback(async () => {
    const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement;

    if (!canvas) {
      throw new Error("Canvas element is required");
    }

    const stream = canvas.captureStream(60);

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: [
        "video/webm;codecs=h264",
        "video/webm;codecs=vp9",
        "video/webm;codecs=vp8",
        "video/webm",
      ].find((codec) => MediaRecorder.isTypeSupported(codec)),
      videoBitsPerSecond: 5000000,
    });

    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
  }, [canvasSelector]);

  const stopRecording = useCallback((): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const mediaRecorder = mediaRecorderRef.current;

      if (!mediaRecorder) {
        reject(new Error("No recording in progress"));
        return;
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mediaRecorder.mimeType,
        });
        resolve(blob);
        chunksRef.current = [];
        setIsRecording(false);
      };

      mediaRecorder.stop();
    });
  }, []);

  const saveRecording = useCallback(
    async (fileName: string = "canvas-recording") => {
      try {
        const blob = await stopRecording();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${fileName}`;
        a.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to save recording:", error);
        throw error;
      }
    },
    [stopRecording]
  );

  return {
    startRecording,
    stopRecording,
    saveRecording,
    isRecording,
  };
};
