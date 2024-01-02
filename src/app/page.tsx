import { ShaderCard } from "@/components/shader";
import { Button } from "@/components/ui/button";
import frag3 from "@/shaders/genuary/2022/3.frag.glsl";
import frag4 from "@/shaders/genuary/2022/4.frag.glsl";
import frag5 from "@/shaders/genuary/2022/5.frag.glsl";

export default async function (props: {}) {
  return (
    <>
      <section>
        <div className="container">
          <h1 className="font-display text-center text-[20svw] uppercase leading-none -translate-x-[2svw]">
            Frady
          </h1>
        </div>
      </section>
      <section>
        <div className="container max-w-[600px]">
          <p className="text-sm leading-loose">
            I am a creative full-stack developer with over 8 years of
            experience. I specialize in building elegant solutions and I'm
            constantly crafting new features with a focus on simplicity and
            scalability.
          </p>
        </div>
      </section>
      <section className="py-[64px] px-10 flex flex-col gap-2">
        <div className="grid grid-cols-3 rounded-xl overflow-hidden gap-1">
          <ShaderCard
            className="col-span-1"
            autoplay
            frag={frag3}
            title={"Destroy a square"}
            subtitle={"Genuary 2022 - Day 5"}
            sourceHref={
              "https://github.com/sFrady20/sf24/blob/main/src/shaders/genuary/2022/3.frag.glsl"
            }
          />
          <ShaderCard
            className="col-span-1"
            autoplay
            frag={frag4}
            title={"Destroy a square"}
            subtitle={"Genuary 2022 - Day 5"}
            sourceHref={
              "https://github.com/sFrady20/sf24/blob/main/src/shaders/genuary/2022/3.frag.glsl"
            }
          />
          <ShaderCard
            className="col-span-1"
            autoplay
            frag={frag5}
            title={"Destroy a square"}
            subtitle={"Genuary 2022 - Day 5"}
            sourceHref={
              "https://github.com/sFrady20/sf24/blob/main/src/shaders/genuary/2022/3.frag.glsl"
            }
          />
        </div>
        <div className="flex flex-row items-center justify-end">
          <Button variant={"ghost"} className="gap-2">
            More Shaders
          </Button>
        </div>
      </section>
    </>
  );
}
