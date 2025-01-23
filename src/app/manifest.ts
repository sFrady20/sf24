import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SF25",
    short_name: "SF25",
    icons: [
      {
        src: "/icon.svg",
        sizes: "1024x1024",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "1024x1024",
        type: "image/svg",
        purpose: "maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#171717",
    display: "standalone",
    start_url: "/?source=pwa",
    scope: "/",
    orientation: "portrait",
  };
}
