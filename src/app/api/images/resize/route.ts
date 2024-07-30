"use server";

import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const POST = async function (req: NextRequest, res: NextResponse) {
  const params = await req.formData();

  const file = params.get("file") as File;
  const size = parseInt(params.get("size") as string);

  const image = sharp(await file.arrayBuffer())
    .resize(size, size, { fit: "cover" })
    .webp();

  return new NextResponse(
    new Blob([await image.toBuffer()], { type: "image/webp" })
  );
};
