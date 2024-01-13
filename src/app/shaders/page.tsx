import { Shader, ShaderCard } from "@/components/shader";
import frag1 from "@/shaders/genuary/2022/1.frag.glsl";
import frag2 from "@/shaders/genuary/2022/2.frag.glsl";
import frag3 from "@/shaders/genuary/2022/3.frag.glsl";
import frag4 from "@/shaders/genuary/2022/4.frag.glsl";
import frag5 from "@/shaders/genuary/2022/5.frag.glsl";
import frag6 from "@/shaders/genuary/2022/6.frag.glsl";
import frag7 from "@/shaders/genuary/2022/7.frag.glsl";
import frag8 from "@/shaders/genuary/2022/8.frag.glsl";
import frag9 from "@/shaders/genuary/2022/9.frag.glsl";

import frag_24_6 from "@/shaders/genuary/2024/6.frag.glsl";
import frag_24_7 from "@/shaders/genuary/2024/7.frag.glsl";
import frag_24_8 from "@/shaders/genuary/2024/8.frag.glsl";
import frag_24_10 from "@/shaders/genuary/2024/10.frag.glsl";
import frag_24_12 from "@/shaders/genuary/2024/12.frag.glsl";

export default async function () {
  return (
    <div className="grid grid-cols-3 w-full mt-[100px] md:mt-[132px]">
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
      {/* 
      <ShaderCard
        frag={frag8}
        title={"Single curve only"}
        subtitle={"Genuary 2022 - Day 8"}
        shaderPath="genuary/2022/8"
        className="col-span-3 md:col-span-1"
      />
      */}
      <ShaderCard
        frag={frag_24_12}
        title={"Lava lamp"}
        subtitle={"Genuary 2024 - Day 12"}
        shaderPath="genuary/2024/12"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag_24_10}
        title={"Hexagonal"}
        subtitle={"Genuary 2024 - Day 10"}
        shaderPath="genuary/2024/10"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag_24_8}
        title={"Chaotic system."}
        subtitle={"Genuary 2024 - Day 8"}
        shaderPath="genuary/2024/8"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag_24_7}
        title={"Loading"}
        subtitle={"Genuary 2024 - Day 7"}
        shaderPath="genuary/2024/7"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag_24_6}
        title={"Screensaver"}
        subtitle={"Genuary 2024 - Day 6"}
        shaderPath="genuary/2024/6"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag7}
        title={"Sol LeWitt Wall Drawing"}
        subtitle={"Genuary 2022 - Day 7"}
        shaderPath="genuary/2022/7"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag6}
        title={"Trade styles with a friend. (Feels)"}
        subtitle={"Genuary 2022 - Day 6"}
        shaderPath="genuary/2022/6"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag5}
        title={"Destroy a square"}
        subtitle={"Genuary 2022 - Day 5"}
        shaderPath="genuary/2022/5"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag4}
        title={"The next fidenza"}
        subtitle={"Genuary 2022 - Day 4"}
        shaderPath="genuary/2022/4"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag3}
        title={"SpaceTime"}
        subtitle={"Genuary 2022 - Day 3"}
        shaderPath="genuary/2022/3"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag2}
        title={"Dithering"}
        subtitle={"Genuary 2022 - Day 2"}
        shaderPath="genuary/2022/2"
        className="col-span-3 md:col-span-1"
      />
      <ShaderCard
        frag={frag1}
        title={"Draw 10,000 of something"}
        subtitle={"Genuary 2022 - Day 1"}
        shaderPath="genuary/2022/1"
        className="col-span-3 md:col-span-1"
      />
    </div>
  );
}
