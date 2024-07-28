import Intro from "./intro.mdx";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Procedural Palette Generation Tool - Steven Frady",
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
        <div className="flex flex-col gap-10 mt-10"></div>
      </div>
    </div>
  );
}
