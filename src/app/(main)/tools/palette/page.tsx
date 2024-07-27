import Intro from "./intro.mdx";
import { PaletteTool } from "./components";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Procedural Palette Generation Tool - Steven Frady",
  description:
    "Create customizable color palettes for GLSL shaders using a simple cosine-based formula",
};

export default async function () {
  return (
    <div className="py-[80px] md:pt-[132px] flex-1">
      <div className="container flex flex-col max-w-[1000px]">
        <div>
          <Button variant={"ghost"} className="gap-2" asChild>
            <Link href="/tools">
              <i className="icon-[ri--arrow-left-line]" />
              <div>More tools</div>
            </Link>
          </Button>
        </div>
        <article>
          <Intro />
        </article>
        <div className="flex flex-col gap-6 mt-10">
          <PaletteTool />
        </div>
      </div>
    </div>
  );
}
