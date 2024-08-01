"use server";

import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async function (req: NextRequest, res: NextResponse) {
  const params = await req.formData();

  const file = params.get("file") as File;
  const width = parseInt(params.get("width") as string);
  const height = parseInt(params.get("height") as string);

  const image = sharp(await file.arrayBuffer())
    .resize(width, height, { fit: "cover" })
    .webp();

  return new NextResponse(
    new Blob([await image.toBuffer()], { type: "image/webp" })
  );
};
