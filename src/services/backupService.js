import apiClient from "../api/apiClient";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export const backupService = {
  // ----------------------------
  // 1. DOWNLOAD BACKUP (FIXED)
  // ----------------------------
  downloadFullBackup: async () => {
    console.log("====================================");
    console.log("🟦 BACKUP STARTED: Calling /backup/download");
    console.log("====================================");

    try {
      // apiClient ALREADY returns pure JSON body
      const fullBackup = await apiClient.get("/backup/download");
      console.log("✅ Received response from backend:", fullBackup);

      if (!fullBackup || !fullBackup.data) {
        console.error("❌ Missing .data in backend response");
        throw new Error("Invalid backup format: No data in response");
      }

      const data = fullBackup.data;

      console.log("📦 Backup contains:", {
        brands: data.brands?.length,
        devices: data.devices?.length,
        services: data.services?.length,
        inquiries: data.inquiries?.length,
      });

      console.log("🟧 Creating ZIP...");
      const zip = new JSZip();
      const imgFolder = zip.folder("images");

      // SAFE IMAGE PROCESSOR
      const processList = (list, prefix) => {
        if (!list) {
          console.warn(`⚠ ${prefix} list missing`);
          return [];
        }

        return list.map((item, index) => {
          let rawName =
            item.name ||
            item.title ||
            item.model ||
            item.brandName ||
            `item_${index}`;

          try {
            if (item.image && item.image.startsWith("data:image")) {
              const matches = item.image.match(
                /^data:image\/([a-zA-Z]+);base64,(.+)$/
              );

              if (!matches) return item;

              const ext = matches[1];
              const base64Data = matches[2];
              const safeName = String(rawName).replace(/[^a-z0-9]/gi, "_");
              const filename = `${prefix}_${safeName}.${ext}`;

              imgFolder.file(filename, base64Data, { base64: true });

              return { ...item, image: `images/${filename}` };
            }
          } catch (err) {
            console.error(`❌ Error processing ${prefix} #${index}`, err);
          }

          return item;
        });
      };

      // CLEAN LISTS
      const cleanBrands = processList(data.brands, "brand");
      const cleanDevices = processList(data.devices, "device");

      // FINAL JSON FOR ZIP
      const cleanDB = {
        ...fullBackup,
        data: {
          ...data,
          brands: cleanBrands,
          devices: cleanDevices,
        },
      };

      console.log("🟪 Adding database.json to ZIP...");
      zip.file("database.json", JSON.stringify(cleanDB, null, 2));

      console.log("⏳ Generating ZIP...");
      const blob = await zip.generateAsync({ type: "blob" });

      const date = new Date().toISOString().split("T")[0];
      const fileName = `CellClinic_Backup_${date}.zip`;

      console.log("💾 Saving ZIP:", fileName);
      saveAs(blob, fileName);

      console.log("🎉 BACKUP COMPLETED");
      return { success: true };
    } catch (error) {
      console.error("\n====================================");
      console.error("❌ BACKUP FAILED");
      console.error(error);
      console.error("====================================\n");

      return { success: false, message: error.message };
    }
  },

  // ----------------------------
  // 2. RESTORE BACKUP
  // ----------------------------
  uploadRestoreFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await apiClient.post("/backup/restore", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 90000,
      });

      return res;
    } catch (error) {
      console.error("❌ Restore Failed:", error);
      throw error;
    }
  },
};
