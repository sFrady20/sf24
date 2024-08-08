export const fileConversionMap: Record<string, string[]> = {
  "image/png": ["image/jpeg", "image/webp"],
  "image/jpeg": ["image/png", "image/webp"],
  "image/webp": ["image/jpeg", "image/png"],
};
