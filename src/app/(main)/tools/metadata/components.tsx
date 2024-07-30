"use client";

import { FileInput } from "@/components/file-input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const fmtStore = create(
  immer<{ image: File | null }>((get, set) => ({
    image: null,
  }))
);

export const FMTFileInput = function () {
  return (
    <FileInput
      accept="image/*"
      onChange={(e) => {
        fmtStore.setState((x) => {
          x.image = e.target.files?.[0] || null;
        });
      }}
    >
      Choose File...
    </FileInput>
  );
};

export const FMTFilePreview = function () {
  const file = fmtStore((x) => x.image);

  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    (async () => {
      if (!file) {
        setDataUrl("");
        return;
      }

      const reader = new FileReader();
      reader.onload = function () {
        setDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    })();
  }, [file]);

  if (!dataUrl) return null;

  return (
    <div className="rounded-xl bg-foreground/10 p-3 border flex flex-row gap-4">
      <img
        src={dataUrl}
        className="border rounded-md max-w-[33%] max-h-[400px]"
      />
      <div className="flex flex-col flex-1">
        <div className="flex flex-row">
          <div className="flex-1 flex flex-col">
            <div className="font-medium">{file?.name}</div>
            <div className="text-xs opacity-60">
              {file?.size.toLocaleString("en-US")} bytes
            </div>
          </div>
          <div className="">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => {
                fmtStore.setState((x) => {
                  x.image = null;
                });
              }}
            >
              <i className="icon-[ri--delete-bin-line]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FMTImageSize = function (props: { size: number }) {
  const { size } = props;

  const file = fmtStore((x) => x.image);

  const [dataUrl, setDataUrl] = useState("");
  useEffect(() => {
    (async () => {
      if (!file) {
        setDataUrl("");
        return;
      }

      const form = new FormData();
      form.append("file", file);
      form.append("size", size.toString());

      const result = await fetch(`/api/images/resize`, {
        method: "post",
        body: form,
      });

      setDataUrl(
        URL.createObjectURL(new Blob([Buffer.from(await result.arrayBuffer())]))
      );
    })();
  }, [file]);

  if (!dataUrl) return null;

  return <img src={dataUrl} className="bg-foreground/10 rounded border" />;
};
