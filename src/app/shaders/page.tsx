import { ShaderCard } from "@/components/shader";
import frag1 from "@/shaders/genuary/2022/1.frag.glsl";
import frag2 from "@/shaders/genuary/2022/2.frag.glsl";
import frag3 from "@/shaders/genuary/2022/3.frag.glsl";
import frag4 from "@/shaders/genuary/2022/4.frag.glsl";
import frag5 from "@/shaders/genuary/2022/5.frag.glsl";
import frag6 from "@/shaders/genuary/2022/6.frag.glsl";
import frag7 from "@/shaders/genuary/2022/7.frag.glsl";
import frag8 from "@/shaders/genuary/2022/8.frag.glsl";
import frag9 from "@/shaders/genuary/2022/9.frag.glsl";

export default async function () {
  return (
    <div className="grid grid-cols-3 w-full gap-3 mt-[100px] md:mt-[200px] mb-[100px] px-[5vw] rrounded-md overflow-hidden">
      {/*
      <ShaderCard
        frag={frag9}
        title={"Architecture"}
        subtitle={"Genuary 2022 - Day 9"}
        sourceHref={
          "https://github.com/sFrady20/sf23/blob/main/src/shaders/genuary/2022/9.frag.glsl"
        }
      />
      */}
      <ShaderCard
        frag={frag8}
        title={"Single curve only"}
        subtitle={"Genuary 2022 - Day 8"}
        autoplay
        shaderPath="genuary/2022/8"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag7}
        title={"Sol LeWitt Wall Drawing"}
        subtitle={"Genuary 2022 - Day 7"}
        autoplay
        shaderPath="genuary/2022/7"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag6}
        title={"Trade styles with a friend. (Feels)"}
        subtitle={"Genuary 2022 - Day 6"}
        autoplay
        shaderPath="genuary/2022/6"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag5}
        title={"Destroy a square"}
        subtitle={"Genuary 2022 - Day 5"}
        autoplay
        shaderPath="genuary/2022/5"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag4}
        title={"The next fidenza"}
        subtitle={"Genuary 2022 - Day 4"}
        autoplay
        shaderPath="genuary/2022/4"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag3}
        title={"SpaceTime"}
        subtitle={"Genuary 2022 - Day 3"}
        autoplay
        shaderPath="genuary/2022/3"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag2}
        title={"Dithering"}
        subtitle={"Genuary 2022 - Day 2"}
        autoplay
        shaderPath="genuary/2022/2"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag1}
        title={"Draw 10,000 of something"}
        subtitle={"Genuary 2022 - Day 1"}
        autoplay
        shaderPath="genuary/2022/1"
        className="col-span-3 md:col-span-1"
      />
    </div>
  );
}
