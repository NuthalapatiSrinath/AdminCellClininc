// src/utils/imageHelper.js

export const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/150?text=No+Image";

  // 1. If it's a full URL (like your Unsplash links), return it directly
  if (path.startsWith("http") || path.startsWith("https")) {
    return path;
  }

  // 2. If it's a relative path (from your uploads folder), prepend backend URL
  // CHANGE THIS to your actual backend URL if you have local uploads
  const API_BASE_URL = "http://localhost:4000";
  return `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};
