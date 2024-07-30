import Link from "next/link";

export default async function () {
  return (
    <div className="flex-1 container py-[100px] md:pt-[132px]">
      <div className="grid grid-cols-12 gap-6">
        {/* Favicon and Metadata Editor */}
        <div className="col-span-12 md:col-span-4">
          <Link href="/tools/metadata">
            <div className="bg-foreground/10 rounded p-4 cursor-pointer hover:bg-foreground/15 flex flex-col gap-1">
              <h2 className="font-title">Favicon and Metadata</h2>
              <p className="text-sm">
                Create, preview, and generate favicons and essential metadata
                for your website to enhance its appearance across browsers and
                social media platforms.
              </p>
            </div>
          </Link>
        </div>

        {/* Palette Editor */}
        <div className="col-span-12 md:col-span-4">
          <Link href="/tools/palette">
            <div className="bg-foreground/10 rounded p-4 cursor-pointer hover:bg-foreground/15 flex flex-col gap-1">
              <h2 className="font-title">Procedural Palette Generator</h2>
              <p className="text-sm">
                Create customizable color palettes for GLSL shaders using a
                simple cosine-based formula
              </p>
            </div>
          </Link>
        </div>

        {/* JSON Formatter */}
        {/* Flip a coin */}
        {/* Spin a wheel */}
        {/* Lorem Ipsum */}
      </div>
    </div>
  );
}
