const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const getImageUrl = (path, size = "w500") => {
  if (!path) return "/placeholder.png"; // fallback
  return `${IMAGE_BASE_URL}${size}${path}`;
};