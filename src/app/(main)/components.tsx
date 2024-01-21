"use client";

import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

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
