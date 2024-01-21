"use client";

import { CastProvider } from "@/components/cast";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function CastProviderWithHanders(props: { children: ReactNode }) {
  const { children } = props;

  const router = useRouter();

  return (
    <CastProvider
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
    </CastProvider>
  );
}
