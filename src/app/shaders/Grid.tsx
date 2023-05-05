"use client";

import { Box } from "@mui/material";
import { ShaderCard } from "~/components/Shader";
import frag1 from "~/shaders/genuary/2022/1.frag.glsl";
import frag2 from "~/shaders/genuary/2022/2.frag.glsl";
import frag3 from "~/shaders/genuary/2022/3.frag.glsl";
import frag4 from "~/shaders/genuary/2022/4.frag.glsl";
import frag5 from "~/shaders/genuary/2022/5.frag.glsl";
import frag6 from "~/shaders/genuary/2022/6.frag.glsl";
import frag7 from "~/shaders/genuary/2022/7.frag.glsl";

export default function ShadersGrid() {
  return (
    <Box
      component={"div"}
      sx={{
        display: "grid",
        width: "100%",
        gap: "10px",
        mt: "200px",
        mb: "100px",
        px: "5vw",
        borderRadius: 2,
        overflow: "hidden",
        gridTemplateColumns: {
          xs: "repeat(1, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
        },
      }}
    >
      <ShaderCard
        frag={frag1}
        title={"Draw 10,000 of something"}
        subtitle={"Genuary 2022 - Day 1"}
        sourceHref={
          "https://github.com/sFrady20/sf23/blob/main/src/shaders/genuary/2022/1.frag.glsl"
        }
      />
      <ShaderCard
        frag={frag2}
        title={"Dithering"}
        subtitle={"Genuary 2022 - Day 2"}
        sourceHref={
          "https://github.com/sFrady20/sf23/blob/main/src/shaders/genuary/2022/2.frag.glsl"
        }
      />
      <ShaderCard
        frag={frag3}
        title={"SpaceTime"}
        subtitle={"Genuary 2022 - Day 3"}
        sourceHref={
          "https://github.com/sFrady20/sf23/blob/main/src/shaders/genuary/2022/3.frag.glsl"
        }
      />
      <ShaderCard
        frag={frag4}
        title={"The next fidenza"}
        subtitle={"Genuary 2022 - Day 4"}
        sourceHref={
          "https://github.com/sFrady20/sf23/blob/main/src/shaders/genuary/2022/4.frag.glsl"
        }
      />
      <ShaderCard
        frag={frag5}
        title={"Destroy a square"}
        subtitle={"Genuary 2022 - Day 5"}
        sourceHref={
          "https://github.com/sFrady20/sf23/blob/main/src/shaders/genuary/2022/5.frag.glsl"
        }
      />
      <ShaderCard
        frag={frag6}
        title={"Trade styles with a friend. (Feels)"}
        subtitle={"Genuary 2022 - Day 6"}
        sourceHref={
          "https://github.com/sFrady20/sf23/blob/main/src/shaders/genuary/2022/6.frag.glsl"
        }
      />
      {/* <ShaderCard
        frag={frag7}
        title={"Sol LeWitt Wall Drawing"}
        subtitle={"Genuary 2022 - Day 7"}
        sourceHref={
          "https://github.com/sFrady20/sf23/blob/main/src/shaders/genuary/2022/7.frag.glsl"
        }
      /> */}
    </Box>
  );
}
