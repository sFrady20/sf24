import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async function (
  req: NextRequest,
  { params }: { params: { ["output-file-type"]: string } }
) {
  const formdata = await req.formData();

  const file = formdata.get("file") as File;

  const inputFileType = file.type;

  switch (inputFileType) {
    case "image/png":
    case "image/jpeg":
    case "image/webp":
      const image = sharp(await file.arrayBuffer());
      switch (params["output-file-type"]) {
        case "png":
          return new NextResponse(
            new Blob([await image.png().toBuffer()], { type: "image/png" })
          );
        case "jpeg":
          return new NextResponse(
            new Blob([await image.jpeg().toBuffer()], { type: "image/jpeg" })
          );
        case "webp":
          return new NextResponse(
            new Blob([await image.webp().toBuffer()], { type: "image/webp" })
          );
        default:
          return new NextResponse("Output file type not supported", {
            status: 400,
          });
      }
    default:
      return new NextResponse("Input file type not supported", { status: 400 });
  }

  return new NextResponse("Unknown Error", { status: 500 });
};
