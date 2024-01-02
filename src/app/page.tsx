import { ShaderCard } from "@/components/shader";
import { Button } from "@/components/ui/button";
import frag3 from "@/shaders/genuary/2022/3.frag.glsl";
import frag4 from "@/shaders/genuary/2022/4.frag.glsl";
import frag5 from "@/shaders/genuary/2022/5.frag.glsl";
import Link from "next/link";

export default async function () {
  return (
    <>
      <section className="mt-[180px]">
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
        <div className="grid grid-cols-3 rounded-xl overflow-hidden gap-2">
          <ShaderCard
            className="col-span-1"
            autoplay
            frag={frag3}
            title={"Destroy a square"}
            subtitle={"Genuary 2022 - Day 3"}
            shaderPath="genuary/2022/3"
          />
          <ShaderCard
            className="col-span-1"
            autoplay
            frag={frag4}
            title={"Destroy a square"}
            subtitle={"Genuary 2022 - Day 4"}
            shaderPath="genuary/2022/4"
          />
          <ShaderCard
            className="col-span-1"
            autoplay
            frag={frag5}
            title={"Destroy a square"}
            subtitle={"Genuary 2022 - Day 5"}
            shaderPath="genuary/2022/5"
          />
        </div>
        <div className="flex flex-row items-center justify-end">
          <Button variant={"ghost"} className="gap-1" asChild>
            <Link href={"/shaders"}>
              <div>More Shaders</div>
              <i className="icon-[ri--arrow-right-up-line] text-lg" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
