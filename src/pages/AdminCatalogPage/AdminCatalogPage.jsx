import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal } from "../../redux/slices/modalSlice";
import {
  UploadCloud,
  Plus,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Tag,
  Wrench,
  Loader2,
  FileSpreadsheet,
  Trash2,
  Edit,
} from "lucide-react";
import styles from "./AdminCatalogPage.module.css";
import { catalogService } from "../../services/catalogService";
import * as XLSX from "xlsx";

const AdminCatalogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleSuccess = (msg) => {
    setStatus({ loading: false, message: msg, type: "success" });
    loadBrands();
    setTimeout(
      () => setStatus({ loading: false, message: "", type: "" }),
      4000
    );
  };

  const handleManageBrand = (brandId) => {
    if (brandId) {
      navigate(`/admin/brand/${brandId}`);
    }
  };

  const handleDeleteBrand = async (id, name) => {
    if (
      !window.confirm(
        `Delete ${name}? This will permanently remove all devices and services under it.`
      )
    )
      return;

    setStatus({ loading: true, message: "Deleting...", type: "info" });
    try {
      await catalogService.deleteBrand(id);
      handleSuccess(`Deleted ${name} successfully.`);
    } catch (err) {
      setStatus({ loading: false, message: "Delete Failed", type: "error" });
    }
  };

  const openBrandModal = () => {
    dispatch(
      openModal({
        type: "CREATE_BRAND",
        modalData: { onSuccess: handleSuccess },
      })
    );
  };

  const openDeviceModal = () => {
    dispatch(
      openModal({
        type: "CREATE_DEVICE",
        modalData: { brands, onSuccess: handleSuccess },
      })
    );
  };

  const openServiceModal = () => {
    dispatch(
      openModal({
        type: "CREATE_SERVICE",
        modalData: { brands, onSuccess: handleSuccess },
      })
    );
  };

  const handleExcelUpload = async () => {
    if (!file) return;
    setStatus({
      loading: true,
      message: "Processing Master Sheet...",
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
      loadBrands();
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        message: err.response?.data?.message || "Upload Failed",
        type: "error",
      });
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        Brand_Name: "Samsung",
        Brand_Image: "https://example.com/samsung.png",
        Brand_Title: "Samsung Repair",
        Brand_Hero_Text: "GALAXY EXPERTS",
        Brand_Hero_Desc: "We fix all Galaxy phones.",
        Device_Name: "Galaxy S24",
        Device_Image: "https://example.com/s24.png",
        Device_Type: "mobile",
        Service_Title: "Screen Replacement",
        Service_Desc: "Original AMOLED",
        Service_Price: 15000,
      },
      {
        Brand_Name: "",
        Device_Name: "",
        Service_Title: "Battery Replacement",
        Service_Desc: "Original Battery",
        Service_Price: 3000,
      },
    ];
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Master_Template");
    XLSX.writeFile(wb, "Catalog_Master_Template.xlsx");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Admin Catalog Manager</h1>

        {status.message && (
          <div className={`${styles.statusBanner} ${styles[status.type]}`}>
            {status.type === "success" ? (
              <CheckCircle size={20} />
            ) : status.type === "error" ? (
              <AlertCircle size={20} />
            ) : (
              <Loader2 className={styles.spin} size={20} />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <div className={styles.grid}>
          {/* --- CARD 1: MANUAL ENTRY --- */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>
                <Plus size={22} /> Manual Entry
              </h2>
              <p>Create individual items with instant updates.</p>
            </div>
            <div className={styles.btnGroup}>
              <button className={styles.actionBtn} onClick={openBrandModal}>
                <div className={styles.iconBox}>
                  <Tag size={20} />
                </div>
                <span>Add Brand</span>
              </button>
              <button className={styles.actionBtn} onClick={openDeviceModal}>
                <div className={styles.iconBox}>
                  <Smartphone size={20} />
                </div>
                <span>Add Device</span>
              </button>
              <button className={styles.actionBtn} onClick={openServiceModal}>
                <div className={styles.iconBox}>
                  <Wrench size={20} />
                </div>
                <span>Add Service</span>
              </button>
            </div>
          </div>

          {/* --- CARD 2: BULK UPLOAD --- */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>
                <UploadCloud size={22} /> Master Upload
              </h2>
              <p>
                Upload .xlsx file to update Brands, Devices & Services at once.
              </p>
            </div>

            <div className={styles.uploadBox}>
              <div className={styles.fileInputWrapper}>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={(e) => setFile(e.target.files[0])}
                  className={styles.fileInput}
                  id="excel-upload"
                />
                <label htmlFor="excel-upload" className={styles.fileLabel}>
                  {file ? (
                    <span className={styles.fileName}>{file.name}</span>
                  ) : (
                    <>
                      <FileSpreadsheet
                        size={24}
                        className={styles.uploadIcon}
                      />
                      <span>Click to Select Excel File</span>
                    </>
                  )}
                </label>
              </div>

              <div className={styles.uploadActions}>
                {/* Export Button REMOVED */}
                <button
                  className={styles.downloadBtn}
                  onClick={downloadTemplate}
                  title="Download Template Format"
                >
                  <FileSpreadsheet size={18} /> Template
                </button>

                <button
                  className={styles.uploadBtn}
                  onClick={handleExcelUpload}
                  disabled={!file || status.loading}
                >
                  {status.loading ? (
                    <Loader2 className={styles.spin} size={18} />
                  ) : (
                    "Upload Data"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- MANAGE BRANDS SECTION --- */}
        <div className={styles.brandsSection}>
          <h3>Manage Existing Brands ({brands.length})</h3>
          {brands.length === 0 ? (
            <p className={styles.emptyText}>
              No brands found. Add one manually or upload Excel.
            </p>
          ) : (
            <div className={styles.brandsGrid}>
              {brands.map((brand) => (
                <div key={brand._id} className={styles.brandCard}>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className={styles.brandLogo}
                    // --- FIXED IMAGE ERROR HANDLER ---
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/logo192.png";
                    }}
                  />
                  <div className={styles.brandInfo}>
                    <h4>{brand.name}</h4>
                    <div className={styles.cardActions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleManageBrand(brand._id)}
                        title="Manage Brand Details"
                      >
                        <Edit size={14} /> Manage
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteBrand(brand._id, brand.name)}
                        title="Delete Brand"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCatalogPage;
