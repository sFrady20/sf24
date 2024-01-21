import { Shader } from "@/components/shader";
import { notFound } from "next/navigation";

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
    <Shader
      frag={typeof frag === "string" ? frag : ""}
      className="fixed left-0 top-0 w-full h-full"
    />
  );
}
