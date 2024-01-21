"use client";

import { CastSenderProvider } from "@/components/cast/sender";
import { useRouter } from "next/navigation";
import { HTMLAttributes, ReactNode } from "react";

export interface RouterLinkProps extends HTMLAttributes<HTMLDivElement> {
  href: string;
  scroll?: boolean;
}

export function RouterLink(props: RouterLinkProps) {
  const { href, scroll, ...rest } = props;
  const router = useRouter();
  return (
    <div
      {...rest}
      onClick={() => {
        router.push(href, { scroll });
      }}
    />
  );
}

export function MainCastSenderProvider(props: { children: ReactNode }) {
  const { children } = props;

  const router = useRouter();

  return (
    <CastSenderProvider
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
    </CastSenderProvider>
  );
}
