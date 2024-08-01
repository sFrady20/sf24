"use client";

import { FileInput } from "@/components/file-input";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const fmtStore = create(
  immer<{ image: File | null; loadedFiles?: Record<string, string> }>(
    (get, set) => ({
      image: null,
      loadedFiles: undefined,
    })
  )
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
        URL.createObjectURL(
          new Blob([Buffer.from(await result.arrayBuffer())], {
            type: "image/webp",
          })
        )
      );
    })();
  }, [file]);

  if (!dataUrl) return null;

  return <img src={dataUrl} className="bg-foreground/10 rounded border" />;
};

type FMTFileProperties = { id: string; filepath: string } & (
  | { type: "image" }
  | { type: "json" }
);

const fileMap: FMTFileProperties[] = [
  {
    id: "500",
    filepath: "src/icon.png",
    type: "image",
  },
  {
    id: "webmanifest",
    filepath: "public/site.webmanifest",
    type: "json",
  },
  {
    id: "32",
    filepath: "public/favicon/32x32.png",
    type: "image",
  },
  {
    id: "64",
    filepath: "public/favicon/64x64.png",
    type: "image",
  },
  {
    id: "192",
    filepath: "public/favicon/192x192.png",
    type: "image",
  },
  {
    id: "512",
    filepath: "public/favicon/512x512.png",
    type: "image",
  },
];

export const FMTFileList = function () {
  return (
    <>
      {fileMap.map((x, i) => (
        <FMTFile key={x.id} fileProperties={x} />
      ))}
    </>
  );
};

export const FMTFile = function (props: { fileProperties: FMTFileProperties }) {
  const { fileProperties } = props;

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
      form.append("size", fileProperties.id);

      const result = await fetch(`/api/images/resize`, {
        method: "post",
        body: form,
      });

      setDataUrl(
        URL.createObjectURL(
          new Blob([Buffer.from(await result.arrayBuffer())], {
            type: "image/webp",
          })
        )
      );
    })();
  }, [file]);

  if (!dataUrl) return null;

  return (
    <Link
      href={dataUrl}
      target="_blank"
      className="flex flex-row items-center gap-3 rounded-md hover:bg-foreground/5 py-2 px-4"
      key={fileProperties.id}
    >
      <i
        className={cn(
          fileProperties.type === "image" && "icon-[ri--file-image-line]",
          fileProperties.type === "json" && "icon-[ri--file-code-line]"
        )}
      />
      <div className="overflow-hidden text-ellipsis text-nowrap">
        {fileProperties.filepath.split("/").join(" / ")}
      </div>
    </Link>
  );
};

export const FMTExport = function () {
  return <Button variant={"outline"}>Export</Button>;
};
