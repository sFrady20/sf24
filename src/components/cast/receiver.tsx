"use client";

import { CAST_NAMESPACE } from "@/vars";
import Script from "next/script";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CastRecieverState {}

const castReceiverStore = create(immer<CastRecieverState>((set, get) => ({})));

const CastReceiverContext =
  createContext<typeof castReceiverStore>(castReceiverStore);

export function CastReceiverProvider(props: {
  children?: ReactNode;
  handlers?: ((message: any) => PromiseLike<void>)[];
}) {
  const { handlers = [], children } = props;

  useEffect(() => {
    const ctx = (window.cast as any).CastReceiverContext.getInstance();
    handlers.forEach((x) => {
      ctx.addCustomMessageListener(`urn:x-cast:${CAST_NAMESPACE}`, x);
    });
    ctx.start();
  }, []);

  return (
    <CastReceiverContext.Provider value={castReceiverStore}>
      <Script
        src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"
        strategy="beforeInteractive"
      />
      {children}
    </CastReceiverContext.Provider>
  );
}

export const useCastReceiver = () => useContext(CastReceiverContext);
