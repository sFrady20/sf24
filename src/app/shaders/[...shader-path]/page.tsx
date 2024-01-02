import { Shader } from "@/components/shader";
import { notFound } from "next/navigation";

export default async function (props: {
  params: { ["shader-path"]: string[] };
}) {
  const { params } = props;

  let frag: string;

  try {
    frag = (
      await import(
        `raw-loader!@/shaders/${params["shader-path"].join("/")}.frag.glsl`
      )
    ).default;
  } catch (err: any) {
    return notFound();
  }

  return (
    <Shader
      frag={typeof frag === "string" ? frag : ""}
      className="h-[100svh]"
    />
  );
}
