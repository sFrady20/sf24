"use client";

import { CastReceiverProvider } from "@/components/cast/receiver";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function MainCastReceiverProvider(props: { children: ReactNode }) {
  const { children } = props;

  const router = useRouter();

  return (
    <CastReceiverProvider
      handlers={[
        async (message: { type: "NAVIGATE"; href: string }) => {
          console.log(message);
          switch (message.type) {
            case "NAVIGATE":
              router.push(message.href);
              break;
          }
        },
      ]}
    >
      {children}
    </CastReceiverProvider>
  );
}
