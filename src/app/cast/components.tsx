"use client";

import { CastReceiverProvider } from "@/components/cast/receiver";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function MainCastReceiverProvider(props: { children: ReactNode }) {
  const { children } = props;

  const router = useRouter();

  return (
    <CastReceiverProvider
      handler={async (e) => {
        router.push(`/cast/${e.media.contentId || e.media.entity}`);
      }}
    >
      {children}
    </CastReceiverProvider>
  );
}
