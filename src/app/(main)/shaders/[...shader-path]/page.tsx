import { Code } from "@/components/code";
import { Shader } from "@/components/shader";
import { notFound } from "next/navigation";
import { CastButton, CodeExpander, RecordButton } from "./components";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { shaderData } from "@/data/shaders";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { ["shader-path"]: string[] };
}): Promise<Metadata | undefined> {
  const data = shaderData[params["shader-path"].join("/")];
  if (!data) return undefined;

  const title = `${data.title}${
    data.subtitle ? ` - ${data.subtitle}` : ``
  } - A GLSL shader by Steven Frady`;

  return {
    title,
    openGraph: {
      title,
      url: `/shaders/${params["shader-path"].join("/")}`,
      images: [
        {
          alt: title,
          type: "image/png",
          width: 1200,
          height: 630,
          url: `https://stevenfrady.com/opengraph/shaders/${params[
            "shader-path"
          ].join("/")}`,
        },
      ],
    },
    twitter: {
      title,
      card: "summary_large_image",
      site: "Steven Frady",
      images: [
        {
          alt: title,
          type: "image/png",
          width: 1200,
          height: 630,
          url: `https://stevenfrady.com/opengraph/shaders/${params[
            "shader-path"
          ].join("/")}`,
        },
      ],
    },
  };
}

export default async function (props: {
  params: { ["shader-path"]: string[] };
}) {
  const { params } = props;

  let frag: string, code: string;
  const shaderPath = params["shader-path"].join("/");

  try {
    code = (await import(`raw-loader!@/shaders/${shaderPath}.frag.glsl`))
      .default;
    frag = (
      await import(
        `raw-loader!glslify-loader!@/shaders/${shaderPath}.frag.glsl`
      )
    ).default;
  } catch (err: any) {
    console.error(err);
    return notFound();
  }

  return (
    <div className="relative">
      <Shader
        frag={typeof frag === "string" ? frag : ""}
        className="h-[100svh] sticky top-0"
      />
      <div className="bg-[#011627]/90 text-[white] relative z-[1]">
        <div className="container grid grid-cols-3 gap-x-20 gap-y-[60px] py-[100px]">
          <div className="col-span-3 xl:col-span-2 break-all ">
            <CodeExpander>
              <Code language="glsl" className="break-all">
                {code}
              </Code>
            </CodeExpander>
          </div>
          <div className="col-span-1 row-start-1 xl:col-start-3">
            <div className="md:sticky top-[120px] flex flex-col items-start gap-2">
              <Button variant={"ghost"} className="gap-2" asChild>
                <Link
                  href={`https://github.com/sFrady20/sf24/blob/main/src/shaders/${shaderPath}.frag.glsl`}
                  target="_blank"
                >
                  <i className="icon-[ri--github-fill]" />
                  <div>View source on GitHub</div>
                </Link>
              </Button>
              <Button variant={"ghost"} className="gap-2" asChild>
                <Link href={`/shaders`}>
                  <i className="icon-[ri--arrow-go-back-fill]" />
                  <div>More shaders</div>
                </Link>
              </Button>
              <RecordButton
                canvasSelector={`canvas`}
                filename={`${shaderPath.replaceAll("/", "-")}.webm`}
              />
              <CastButton shaderPath={shaderPath}>
                <div>Cast to ChromeCast</div>
              </CastButton>
              {/*
              <Button variant={"ghost"} className="gap-2" asChild>
                <Link href={`/shaders`}>
                  <i className="icon-[ri--screenshot-2-fill]" />
                  <div>Screenshot</div>
                </Link>
              </Button>
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
