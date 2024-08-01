import Intro from "./intro.mdx";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FMTExport,
  FMTFileInput,
  FMTFileList,
  FMTFilePreview,
  FMTImageSize,
} from "./components";
import { Code } from "@/components/code";

export const metadata: Metadata = {
  title: "Favicon and Metadata Tool - Steven Frady",
  description:
    "Create, preview, and generate favicons and essential metadata for your website to enhance its appearance across browsers and social media platforms.",
};

export default async function () {
  return (
    <div className="py-[100px] md:pt-[132px] flex-1">
      <div className="container flex flex-col">
        <div className="grid grid-cols-12 md:gap-[80px] gap-y-10">
          <div className="col-span-12 md:col-span-6">
            <div className="md:sticky top-[132px]">
              <div>
                <Button variant={"ghost"} className="gap-2 -ml-4" asChild>
                  <Link href="/tools">
                    <i className="icon-[ri--arrow-left-line]" />
                    <div>More tools</div>
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                <article>
                  <Intro />
                </article>
                <div className="flex flex-col gap-3">
                  <FMTFileInput />
                  <FMTFilePreview />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-end">
                <FMTExport>Export All</FMTExport>
              </div>
              <div className="flex flex-col gap-1 bg-foreground/5 rounded-md p-2">
                <FMTFileList />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>public/site.webmanifest</div>
              <Code language="json" className="bg-foreground/5 rounded-md p-4">
                {JSON.stringify(
                  {
                    icons: [
                      {
                        src: "/favicon/512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                      },
                      {
                        src: "/favicon/512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                      },
                    ],
                  },
                  null,
                  "  "
                )}
              </Code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
