import { ShaderCard } from "@/components/shader";
import { shaderData } from "@/data/shaders";

export default async function () {
  const frags = Object.fromEntries(
    await Promise.all(
      Object.keys(shaderData).map(async (shaderId) => [
        shaderId,
        (
          await import(
            `raw-loader!glslify-loader!@/shaders/${shaderId}.frag.glsl`
          )
        ).default,
      ])
    )
  );

  return (
    <div className="grid grid-cols-3 w-full mt-[100px] md:mt-[132px]">
      {Object.entries(shaderData)
        .reverse()
        .map(([shaderId, shader]) => (
          <ShaderCard
            frag={frags[shaderId]}
            title={shader.title}
            subtitle={shader.subtitle}
            shaderPath={shaderId}
            className="col-span-3 md:col-span-1 relative"
          />
        ))}
    </div>
  );
}
