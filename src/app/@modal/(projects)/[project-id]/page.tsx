import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { categories } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

export default async function (props: { params: { ["project-id"]: string } }) {
  const { params } = props;

  const projectId = params["project-id"];

  const project = categories
    .flatMap((x) => x.projects)
    .find((x) => x.id === projectId);

  if (!project) return null;

  return (
    <div className="">
      <div className="p-6 flex flex-col gap-4">
        <div className="h-10 flex flex-row items-center text-lg">
          {project.label}
        </div>
        <p className="leading-relaxed"></p>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <div>Platform</div>
            <div>Web, Mobile</div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Frameworks</div>
            <div>React, Next.JS</div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Languages</div>
            <div>Typescript</div>
          </div>
        </div>
      </div>
    </div>
  );
}
