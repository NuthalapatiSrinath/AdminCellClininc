// src/services/backupService.js
import apiClient from "../api/apiClient";

// --- Helper to trigger browser download ---
const triggerFileDownload = (response, defaultName) => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;

  // Try to get filename from backend header, else use default
  const contentDisposition = response.headers["content-disposition"];
  let fileName = defaultName;
  if (contentDisposition) {
    const matches = contentDisposition.match(/filename="?([^"]+)"?/);
    if (matches && matches[1]) fileName = matches[1];
  }

  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

// 1. Existing JSON Backup
export const downloadBackup = async () => {
  try {
    const response = await apiClient.get("/backup/download", {
      responseType: "blob",
    });
    triggerFileDownload(response, "backup.json");
    return true;
  } catch (error) {
    console.error("Download Backup Error:", error);
    throw error;
  }
};

// 2. Existing Restore
export const restoreBackup = async (formData) => {
  const response = await apiClient.post("/backup/restore", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// ================= NEW FUNCTIONS =================

// 3. Download Full Project Excel Report (Read-Only)
export const downloadExcelReport = async () => {
  try {
    const response = await apiClient.get("/backup/download-excel", {
      responseType: "blob",
    });
    triggerFileDownload(response, "CellClinic_Report.xlsx");
  } catch (error) {
    console.error("Excel Report Error:", error);
    throw error;
  }
};

// 4. Download Global Editable Excel (For Bulk Import)
export const downloadEditableExcel = async () => {
  try {
    const response = await apiClient.get("/backup/download-editable", {
      responseType: "blob",
    });
    triggerFileDownload(response, "Global_Editable_Catalog.xlsx");
  } catch (error) {
    console.error("Editable Excel Error:", error);
    throw error;
  }
};

// 5. Download Brand Specific Report
export const downloadBrandReport = async (brandId) => {
  try {
    const response = await apiClient.get(`/backup/download-excel/${brandId}`, {
      responseType: "blob",
    });
    triggerFileDownload(response, "Brand_Report.xlsx");
  } catch (error) {
    console.error("Brand Report Error:", error);
    throw error;
  }
};

// 6. Download Brand Editable Excel (For Re-import)
export const downloadBrandEditable = async (brandId) => {
  try {
    const response = await apiClient.get(
      `/backup/download-editable/${brandId}`,
      {
        responseType: "blob",
      }
    );
    triggerFileDownload(response, "Brand_Editable.xlsx");
  } catch (error) {
    console.error("Brand Editable Error:", error);
    throw error;
  }
};
