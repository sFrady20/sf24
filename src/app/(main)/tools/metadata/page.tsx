import Intro from "./intro.mdx";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FMTFileInput, FMTFilePreview, FMTImageSize } from "./components";

export const metadata: Metadata = {
  title: "Favicon and Metadata Tool - Steven Frady",
  description:
    "Create, preview, and generate favicons and essential metadata for your website to enhance its appearance across browsers and social media platforms.",
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
        <div className="flex flex-col gap-10 mt-10">
          <div className="flex flex-col gap-3">
            <FMTFileInput />
            <FMTFilePreview />
          </div>

          <div className="flex flex-col items-start gap-3">
            <FMTImageSize size={16} />
            <FMTImageSize size={32} />
            <FMTImageSize size={192} />
            <FMTImageSize size={512} />
          </div>
        </div>
      </div>
    </div>
  );
}
