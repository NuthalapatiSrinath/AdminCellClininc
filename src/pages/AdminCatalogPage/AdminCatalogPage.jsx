import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice"; // Redux Action
import {
  UploadCloud,
  Plus,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Tag,
  Loader2,
  FileSpreadsheet,
} from "lucide-react";
import styles from "./AdminCatalogPage.module.css";
import { catalogService } from "../../services/catalogService";
import * as XLSX from "xlsx";

const AdminCatalogPage = () => {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const res = await catalogService.getBrands();
      if (res.success) setBrands(res.data);
    } catch (err) {
      console.error("Failed to load brands");
    }
  };

  // --- Success Handler ---
  const handleSuccess = (msg) => {
    setStatus({ loading: false, message: msg, type: "success" });
    loadBrands(); // Refresh list
    setTimeout(
      () => setStatus({ loading: false, message: "", type: "" }),
      4000
    );
  };

  // --- DISPATCH MODALS ---
  const openBrandModal = () => {
    dispatch(
      openModal({
        type: "CREATE_BRAND",
        data: { onSuccess: handleSuccess }, // Pass callback in data
      })
    );
  };

  const openDeviceModal = () => {
    dispatch(
      openModal({
        type: "CREATE_DEVICE",
        data: {
          brands: brands, // Pass loaded brands
          onSuccess: handleSuccess,
        },
      })
    );
  };

  // --- EXCEL UPLOAD ---
  const handleExcelUpload = async () => {
    if (!file) return;
    setStatus({
      loading: true,
      message: "Processing Big Data...",
      type: "info",
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await catalogService.uploadCatalogExcel(formData);
      setStatus({
        loading: false,
        message: res.message || "Bulk Upload Complete!",
        type: "success",
      });
      setFile(null);
    } catch (err) {
      setStatus({
        loading: false,
        message: "Upload Failed. Check console for details.",
        type: "error",
      });
    }
  };

  const downloadTemplate = () => {
    const headers = [
      {
        Brand_Name: "Xiaomi",
        Device_Name: "Xiaomi 14",
        Service_Title: "Display",
        Service_Price: 5000,
      },
    ];
    const ws = XLSX.utils.json_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "Catalog_Template.xlsx");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Admin Catalog Manager</h1>

        {status.message && (
          <div className={`${styles.statusBanner} ${styles[status.type]}`}>
            {status.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            {status.message}
          </div>
        )}

        <div className={styles.grid}>
          {/* Card 1: Manual Entry */}
          <div className={styles.card}>
            <h2>
              <Plus size={20} /> Manual Entry
            </h2>
            <p>Open popups to add single items.</p>
            <div className={styles.btnGroup}>
              <button className={styles.actionBtn} onClick={openBrandModal}>
                <Tag size={18} /> Add Brand
              </button>
              <button className={styles.actionBtn} onClick={openDeviceModal}>
                <Smartphone size={18} /> Add Device
              </button>
            </div>
          </div>

          {/* Card 2: Excel Upload */}
          <div className={styles.card}>
            <h2>
              <UploadCloud size={20} /> Bulk Master Upload
            </h2>
            <p>Upload .xlsx file with all details.</p>
            <div className={styles.uploadBox}>
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => setFile(e.target.files[0])}
                className={styles.fileInput}
              />
              <div className={styles.uploadActions}>
                <button
                  className={styles.downloadBtn}
                  onClick={downloadTemplate}
                >
                  <FileSpreadsheet size={18} /> Template
                </button>
                <button
                  className={styles.uploadBtn}
                  onClick={handleExcelUpload}
                  disabled={!file || status.loading}
                >
                  {status.loading ? (
                    <Loader2 className={styles.spin} />
                  ) : (
                    "Upload Data"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCatalogPage;
