"use client";

import { CAST_APP_ID, CAST_NAMESPACE } from "@/vars";
import Script from "next/script";
import { ReactNode, createContext, useContext } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface CastSenderState {
  initialized: boolean;
  session?: cast.framework.CastSession | null;
  refreshSession: () => Promise<cast.framework.CastSession | null>;
  requestSession: () => Promise<cast.framework.CastSession | null>;
  sendMessage: (info: chrome.cast.media.MediaInfo) => Promise<void>;
}

const castSenderStore = create(
  immer<CastSenderState>((set, get) => ({
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

    sendMessage: async (info: chrome.cast.media.MediaInfo) => {
      const session = get().session;
      if (!session) throw new Error("No cast session");
      var request = new chrome.cast.media.LoadRequest(info);
      await session.loadMedia(request);
    },
  }))
);

if (typeof window !== "undefined") {
  window["__onGCastApiAvailable"] = async function (isAvailable) {
    if (isAvailable) {
      const ctx = cast.framework.CastContext.getInstance();
      ctx.setOptions({
        receiverApplicationId: CAST_APP_ID,
        autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
      castSenderStore.setState({ initialized: true });
    }
  };
}

const CastSenderContext =
  createContext<typeof castSenderStore>(castSenderStore);

export function CastSenderProvider(props: { children?: ReactNode }) {
  const { children } = props;

  return (
    <CastSenderContext.Provider value={castSenderStore}>
      <Script
        src="//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
        strategy="beforeInteractive"
      />
      {children}
    </CastSenderContext.Provider>
  );
}

export const useCastSender = () => useContext(CastSenderContext);
