import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { ReactNode } from "react";
import { ProjectDialog } from "./components";

export default async function (props: { children?: ReactNode }) {
  const { children } = props;

  return (
    <ProjectDialog>
      <DialogContent className="w-[800px]">
        <DialogClose />
        {children}
      </DialogContent>
    </ProjectDialog>
  );
}
