"use client";

import { Dialog } from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";

export function ProjectDialog(props: DialogProps) {
  const { ...rest } = props;

  const router = useRouter();

  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) router.push("/", { scroll: false });
      }}
      {...rest}
    />
  );
}
