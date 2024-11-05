import Link from "next/link";
import { ReactNode } from "react";

function ToolCard(props: { title: ReactNode; description: ReactNode }) {
  const { title, description } = props;

  return (
    <div className="bg-foreground/10 rounded p-4 cursor-pointer hover:bg-foreground/15 flex flex-col gap-1 h-[200px] transition hover:-translate-y-1 hover:translate-x-1 group">
      <h2 className="font-title font-bold">{title}</h2>
      <p className="text-sm flex-1">{description}</p>
      <div className="flex flex-row justify-end">
        <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-full relative">
          <i className="icon-[ri--arrow-right-up-line] absolute group-hover:translate-x-[40px] group-hover:-translate-y-[40px] transition group-hover:opacity-0" />
          <i className="icon-[ri--arrow-right-up-line] absolute -translate-x-[40px] translate-y-[40px] opacity-0 transition group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
        </div>
      </div>
    </div>
  );
}

export default async function () {
  return (
    <div className="flex-1 container py-[100px] md:pt-[132px]">
      <div className="grid grid-cols-12 gap-6">
        {/* Favicon and Metadata Editor */}
        <div className="col-span-12 md:col-span-4">
          <Link href="/tools/metadata">
            <ToolCard
              title="Favicon and Metadata"
              description="Create, preview, and generate favicons and essential metadata
                for your website to enhance its appearance across browsers and
                social media platforms."
            />
          </Link>
        </div>

        {/* Palette Editor */}
        <div className="col-span-12 md:col-span-4">
          <Link href="/tools/palette">
            <ToolCard
              title="Procedural Palette Generator"
              description="Create customizable color palettes for GLSL shaders using a
                simple cosine-based formula."
            />
          </Link>
        </div>

        {/* File Converter */}
        <div className="col-span-12 md:col-span-4">
          <Link href="/tools/convert">
            <ToolCard title="File Converter" description="(WIP)" />
          </Link>
        </div>

        {/* App Name Generator */}
        <div className="col-span-12 md:col-span-4">
          <Link href="/tools/app-name-generator">
            <ToolCard title="App Name Generator" description="(WIP)" />
          </Link>
        </div>

        {/* Tweet topic randomaizer */}
        <div className="col-span-12 md:col-span-4">
          <Link href="/tools/tweet-topic-randomizer">
            <ToolCard
              title="Tweet Topic Randomizer"
              description="Generate a random topic to tweet on based on current events and popular memes. (WIP)"
            />
          </Link>
        </div>

        {/* Format: HTML / CSS / SCSS / JSON / JAVASCRIPT / TYPESCRIPT
        Validate
        Beautify
        Remove Whitespace
        Change Case
        Regex
        Minify
        */}

        {/* Encode/Decode: MD5 / SHA / Base64 / QR *}

        {/* Choose:
        Wheel
        Coinflip
        Dice
        */}

        {/* Generators:
        Md5
        UUID
        Lorem Ipsum
        Password
        */}

        {/* Image:
        Resize
        Crop
        */}

        {/* Conversions:
        Image to Image
        Unit to Unit
        Color to color
        */}
      </div>
    </div>
  );
}
