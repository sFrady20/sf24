"use client";

import { CastReceiverProvider } from "@/components/cast/receiver";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function MainCastReceiverProvider(props: { children: ReactNode }) {
  const { children } = props;

  const router = useRouter();

  return (
    <CastReceiverProvider
      handler={async (e: any) => {
        router.push(e.media.entity || e.media.contentId);
      }}
    >
      {children}
    </CastReceiverProvider>
  );
}
