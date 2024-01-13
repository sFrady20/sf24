import { Code } from "@/components/code";
import { Shader } from "@/components/shader";
import { notFound } from "next/navigation";
import { CodeExpander } from "./components";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function (props: {
  params: { ["shader-path"]: string[] };
}) {
  const { params } = props;

  let frag: string;
  const shaderPath = params["shader-path"].join("/");

  try {
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
    <>
      <Shader
        frag={typeof frag === "string" ? frag : ""}
        className="h-[100svh]"
      />
      <div className="bg-[#011627] text-[white]">
        <div className="container grid grid-cols-3 gap-6 gap-y-[60px] py-[100px]">
          <div className="col-span-3 xl:col-span-2 break-all ">
            <CodeExpander>
              <Code language="glsl" className="break-all">
                {frag}
              </Code>
            </CodeExpander>
          </div>
          <div className="col-span-1 row-start-1 xl:col-start-3">
            <div className="md:sticky top-[120px] flex flex-col items-start gap-2">
              <Button variant={"ghost"} className="gap-2" asChild>
                <Link href={`https://github.com/sFrady20/sf24/blob/main/src/shaders/${shaderPath}.frag.glsl`} target="_blank">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
