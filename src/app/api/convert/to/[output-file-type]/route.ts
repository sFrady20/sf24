import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const GET = async function (req: NextRequest, res: NextResponse) {
  const params = (req as any).params || {};
  const formdata = await req.formData();

  const file = formdata.get("file") as File;

  const inputFileType = file.type;

  switch (inputFileType) {
    case "image/png":
    case "image/jpeg":
    case "image/webp":
      const image = sharp(await file.arrayBuffer());
      switch (params) {
        case "image/png":
          return new NextResponse(
            new Blob([await image.png().toBuffer()], { type: "image/png" })
          );
        case "image/jpeg":
          return new NextResponse(
            new Blob([await image.jpeg().toBuffer()], { type: "image/jpeg" })
          );
        case "image/webp":
          return new NextResponse(
            new Blob([await image.webp().toBuffer()], { type: "image/webp" })
          );
      }
      break;
    default:
      return new NextResponse("Input file type not supported", { status: 400 });
  }
};
