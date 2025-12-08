export const getImageUrl = (img) => {
  if (!img) return "https://via.placeholder.com/150?text=No+Image";

  // 1. Base64 (Manual Uploads on Vercel)
  if (img.startsWith("data:")) return img;

  // 2. External Links (Excel Uploads)
  if (img.startsWith("http")) return img;

  // 3. Local Uploads (Localhost)
  if (img.startsWith("/")) return img;

  // 4. Fallback for relative paths without slash
  return `/${img}`;
};
