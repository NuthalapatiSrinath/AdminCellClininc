import apiClient from "../api/apiClient";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const backupService = {
  // --- 1. DOWNLOAD BACKUP (Your existing working logic) ---
  downloadFullBackup: async () => {
    try {
      console.log("⏳ Fetching data from server...");
      // 1. Get the raw data
      const response = await apiClient.get("/backup/download");
      const fullData = response.data || response;

      if (!fullData || !fullData.data) {
        throw new Error("No data received");
      }

      console.log("📦 Processing images and creating ZIP...");
      const zip = new JSZip();

      // Create a folder for images inside the zip
      const imgFolder = zip.folder("images");

      // Helper to process a list (Brands/Devices) and extract images
      const processList = (list, prefix) => {
        if (!list) return [];
        return list.map((item) => {
          // If item has an image and it's a Base64 string
          if (item.image && item.image.startsWith("data:image")) {
            try {
              // 1. Get extension (png/jpeg)
              const matches = item.image.match(
                /^data:image\/([a-zA-Z]+);base64,(.+)$/
              );
              if (matches) {
                const ext = matches[1];
                const base64Data = matches[2];
                // Clean filename
                const safeName = (item.name || "unknown").replace(
                  /[^a-z0-9]/gi,
                  "_"
                );
                const filename = `${prefix}_${safeName}.${ext}`;

                // 2. Add real file to ZIP folder
                imgFolder.file(filename, base64Data, { base64: true });

                // 3. Update the JSON data to point to this file
                return { ...item, image: `images/${filename}` };
              }
            } catch (err) {
              console.warn("Failed to convert image:", item.name);
            }
          }
          // If it's already a link or empty, leave it
          return item;
        });
      };

      // Process Collections
      const cleanBrands = processList(fullData.data.brands, "brand");
      const cleanDevices = processList(fullData.data.devices, "device");

      // Reconstruct the clean database object
      const cleanDB = {
        ...fullData,
        data: {
          ...fullData.data,
          brands: cleanBrands,
          devices: cleanDevices,
        },
      };

      // Add the clean JSON to zip
      zip.file("database.json", JSON.stringify(cleanDB, null, 2));

      // Generate the ZIP file
      const content = await zip.generateAsync({ type: "blob" });

      // Save it
      const date = new Date().toISOString().split("T")[0];
      saveAs(content, `CellClinic_Backup_${date}.zip`);

      return { success: true };
    } catch (error) {
      console.error("Backup failed:", error);
      return { success: false, message: error.message };
    }
  },

  // --- 2. RESTORE BACKUP (The New Part) ---
  uploadRestoreFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Timeout increased for large restores (60s)
      const response = await apiClient.post("/backup/restore", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });

      return response.data || response;
    } catch (error) {
      console.error("Restore failed:", error);
      throw error;
    }
  },
};
