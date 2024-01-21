"use client";

import { CAST_APP_ID, CAST_NAMESPACE } from "@/vars";
import Script from "next/script";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const isReceiver =
  typeof window !== "undefined" && window.navigator.userAgent.includes(`CrKey`);
const receiver: any = isReceiver ? cast : undefined;

export interface CastState {
  initialized: boolean;
  session?: cast.framework.CastSession | null;
  refreshSession: () => Promise<cast.framework.CastSession | null>;
  requestSession: () => Promise<cast.framework.CastSession | null>;
  sendMessage: (data: any) => Promise<void>;
}

const castStore = create(
  immer<CastState>((set, get) => ({
    initialized: false,

    refreshSession: async () => {
      const session =
        await cast.framework.CastContext.getInstance().getCurrentSession();
      set({ session });
      return session;
    },

    requestSession: async () => {
      const error =
        await cast.framework.CastContext.getInstance().requestSession();
      if (error) throw new Error(error);
      return await get().refreshSession();
    },

    sendMessage: async (message: unknown) => {
      const session = await get().refreshSession();
      if (!session) throw new Error("No cast session");
      session.sendMessage(`urn:x-cast:${CAST_NAMESPACE}`, message);
    },
  }))
);

if (typeof window !== "undefined") {
  window["__onGCastApiAvailable"] = async function (isAvailable) {
    if (isAvailable) {
      cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: CAST_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
      castStore.setState({ initialized: true });
    }
  };
}

const CastContext = createContext<typeof castStore>(castStore);

export function CastProvider(props: {
  children?: ReactNode;
  handlers?: ((message: any) => PromiseLike<void>)[];
}) {
  const { handlers = [], children } = props;

  useEffect(() => {
    if (!isReceiver) return;
    const ctx = receiver.CastReceiverContext.getInstance();
    handlers.forEach((x) => {
      ctx.addCustomMessageListener(`urn:x-cast:com.frady.steven`, x);
    });
    ctx.start();
  }, []);

  return (
    <CastContext.Provider value={castStore}>
      <Script
        src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
        strategy="beforeInteractive"
      />
      <Script
        src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js"
        strategy="beforeInteractive"
      />
      {children}
    </CastContext.Provider>
  );
}

export const useCast = () => useContext(CastContext);
