"use client";

import { FileInput } from "@/components/file-input";
import { makeStore } from "@/utils/make-store";
import { ReactNode, useMemo } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { fileConversionMap } from "./data";
import { Button } from "@/components/ui/button";

type CVT_Store = {
  input: {
    type: string;
    data: string;
  };
  output: {
    type: string;
  };
};

const CVT = makeStore<CVT_Store>((get) => ({
  input: {
    type: "",
    data: "",
  },
  output: {
    type: "",
  },
}));

export const CVT_Provider = function (props: { children?: ReactNode }) {
  return <CVT.Provider {...props} />;
};

export const CVT_Input = function (props: { children?: ReactNode }) {
  const { children } = props;

  const store = CVT.use();

  return (
    <>
      <FileInput
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            store.setState((x) => {
              x.input.type = file.type;
              x.input.data = URL.createObjectURL(new Blob([file]));
            });
          } else {
            store.setState((x) => {
              x.input.type = "";
              x.input.data = "";
            });
          }
        }}
      >
        {children}
      </FileInput>
    </>
  );
};

export const CVT_Preview = function (props: { children?: ReactNode }) {
  const { children } = props;

  const store = CVT.use();

  const type = store((x) => x.input.type);
  const data = store((x) => x.input.data);

  return (
    <>
      <img src={data} className="max-w-[200px]" />
      <div>{type}</div>
    </>
  );
};

export const CVT_Options = function (props: {}) {
  const store = CVT.use();

  const inputType = store((x) => x.input.type);

  const options = useMemo(
    () => fileConversionMap[inputType] || [],
    [inputType]
  );

  const outputType = store((x) => x.output.type);

  if (options.length == 0) return null;

  return (
    <>
      <select
        className="bg-foreground/5 hover:bg-foreground/10 rounded border cursor-pointer p-2"
        value={outputType}
        onChange={(e) => {
          store.setState((x) => {
            x.output.type = e.target.value;
          });
        }}
      >
        {options.map((x) => (
          <option key={x} value={x} className="text-background">
            {x}
          </option>
        ))}
      </select>
    </>
  );
};

export const CVT_ActionButton = function (props: {}) {
  const store = CVT.use();

  const outputType = store((x) => x.output.type);

  if (!outputType) return null;

  return (
    <>
      <Button
        variant={"outline"}
        onClick={async () => {
          await fetch("/api/convert");
        }}
      >
        Convert
      </Button>
    </>
  );
};
