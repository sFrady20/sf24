"use client";

import type { LoadRequestData } from "chromecast-caf-receiver/cast.framework.messages";
import Script from "next/script";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CastRecieverState {}

const castReceiverStore = create(immer<CastRecieverState>(() => ({})));

const CastReceiverContext =
  createContext<typeof castReceiverStore>(castReceiverStore);

export function CastReceiverProvider(props: {
  children?: ReactNode;
  handler?: (e: LoadRequestData) => Promise<void>;
}) {
  const { handler, children } = props;

  useEffect(() => {
    const receiver = (cast as any).framework;

    const context = receiver.CastReceiverContext.getInstance();
    const manager = context.getPlayerManager();

    manager.setMessageInterceptor(
      receiver.messages.MessageType.LOAD,
      async (e: LoadRequestData) => {
        try {
          await handler?.(e);
        } catch (err: any) {
          new receiver.messages.ErrorData(err.message);
        }
      }
    );

    context.start();
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
