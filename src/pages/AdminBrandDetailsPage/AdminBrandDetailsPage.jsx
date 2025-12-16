import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  Smartphone,
  Layers,
  Loader2,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import styles from "./AdminBrandDetailsPage.module.css";
import { catalogService } from "../../services/catalogService";
import {
  downloadBrandReport,
  downloadBrandEditable,
} from "../../services/backupService";
import * as XLSX from "xlsx";
import Loader from "../../components/Loader/Loader";

const AdminBrandDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [brand, setBrand] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Upload States
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState({ message: "", type: "" });

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const fetchData = async () => {
    setLoading(true);
    setStatus({ message: "", type: "" });
    try {
      // 1. Get Brand Info
      const brandsRes = await catalogService.getBrands();
      const foundBrand = brandsRes.data.find((b) => b._id === id);

      if (!foundBrand) {
        setStatus({ message: "Brand not found", type: "error" });
        setLoading(false);
        return;
      }
      setBrand(foundBrand);

      // 2. Get Devices
      const devicesRes = await catalogService.getDevices(id);
      setDevices(devicesRes.data || []);
    } catch (err) {
      console.error(err);
      setStatus({ message: "Failed to load data", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => fetchData();

  // --- BRAND ACTIONS ---
  const handleEditBrand = () => {
    dispatch(
      openModal({
        type: "CREATE_BRAND",
        modalData: { initialData: brand, onSuccess: handleSuccess },
      })
    );
  };

  const handleDeleteBrand = async () => {
    if (!window.confirm(`Delete ${brand.name} and ALL its devices?`)) return;
    try {
      await catalogService.deleteBrand(brand._id);
      navigate("/admin");
    } catch (e) {
      alert("Delete failed");
    }
  };

  // --- NEW EXPORT ACTIONS ---
  const handleExportBrandReport = async () => {
    try {
      setStatus({ message: "Downloading Report...", type: "info" });
      await downloadBrandReport(id);
      setStatus({ message: "Report Downloaded Successfully", type: "success" });
    } catch (err) {
      setStatus({ message: "Failed to download report", type: "error" });
    }
  };

  const handleExportBrandEditable = async () => {
    try {
      setStatus({ message: "Downloading Editable Sheet...", type: "info" });
      await downloadBrandEditable(id);
      setStatus({ message: "Editable Sheet Downloaded", type: "success" });
    } catch (err) {
      setStatus({ message: "Failed to download sheet", type: "error" });
    }
  };

  // --- DEVICE ACTIONS ---
  const handleAddDevice = () => {
    dispatch(
      openModal({
        type: "CREATE_DEVICE",
        modalData: {
          preSelectedBrandId: brand._id,
          onSuccess: handleSuccess,
          brands: [brand],
        },
      })
    );
  };

  const handleEditDevice = (device) => {
    dispatch(
      openModal({
        type: "CREATE_DEVICE",
        modalData: {
          initialData: device,
          onSuccess: handleSuccess,
          brands: [brand],
        },
      })
    );
  };

  const handleDeleteDevice = async (deviceId) => {
    if (!window.confirm("Delete this device?")) return;
    await catalogService.deleteDevice(deviceId);
    fetchData();
  };

  const handleManageServices = (device) => {
    dispatch(
      openModal({
        type: "MANAGE_SERVICES",
        modalData: { device: device },
      })
    );
  };

  // --- EXCEL UPLOAD (BRAND SPECIFIC) ---
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.confirm(`Import data into ${brand.name}?`)) {
      e.target.value = null;
      return;
    }

    setUploading(true);
    setStatus({ message: "Uploading...", type: "info" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Call the BRAND-SPECIFIC upload route
      const res = await catalogService.uploadBrandExcel(brand._id, formData);
      setStatus({ message: res.message, type: "success" });
      fetchData(); // Reload to see new devices
    } catch (err) {
      console.error(err);
      setStatus({
        message: err.response?.data?.message || "Upload Failed",
        type: "error",
      });
    } finally {
      setUploading(false);
      e.target.value = null;
      // Clear success message after 4s
      setTimeout(() => setStatus({ message: "", type: "" }), 4000);
    }
  };

  // --- TEMPLATE DOWNLOAD ---
  const downloadTemplate = () => {
    const headers = [
      {
        Device_Name: "Galaxy S24",
        Device_Image: "https://example.com/s24.png",
        Device_Type: "mobile",
        Service_Title: "Screen, Battery",
        Service_Desc: "Original, High Capacity",
        Service_Price: "15000, 3000",
      },
      {
        Device_Name: "Galaxy S23",
        Device_Image: "",
        Device_Type: "",
        Service_Title: "Charging Port",
        Service_Desc: "Fix charging issues",
        Service_Price: 1200,
      },
    ];
    const ws = XLSX.utils.json_to_sheet(headers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${brand.name}_Template`);
    XLSX.writeFile(wb, `${brand.name}_Upload_Template.xlsx`);
  };

  // --- RENDER ---
  if (loading) return <Loader />;
  if (!brand) return <div className={styles.error}>Brand Not Found</div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button onClick={() => navigate("/admin")} className={styles.backBtn}>
            <ArrowLeft size={20} /> Back to Catalog
          </button>

          {/* ACTIONS */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              className={styles.secondaryBtn}
              onClick={handleExportBrandReport}
              title="Download Read-Only Report"
              style={{
                backgroundColor: "#eef2ff",
                color: "#4f46e5",
                border: "1px solid #c7d2fe",
              }}
            >
              <FileSpreadsheet size={16} /> Brand Report
            </button>

            <button
              className={styles.secondaryBtn}
              onClick={handleExportBrandEditable}
              title="Download Editable Excel for Re-Import"
              style={{
                backgroundColor: "#f0fdf4",
                color: "#16a34a",
                border: "1px solid #bbf7d0",
              }}
            >
              <Download size={16} /> Export to Edit
            </button>

            <button
              className={styles.deleteBrandBtn}
              onClick={handleDeleteBrand}
            >
              <Trash2 size={16} /> Delete Brand
            </button>
          </div>
        </div>

        {/* Status Notification */}
        {status.message && (
          <div className={`${styles.statusBanner} ${styles[status.type]}`}>
            {status.type === "success" ? (
              <CheckCircle size={18} />
            ) : status.type === "error" ? (
              <AlertCircle size={18} />
            ) : (
              <Loader2 className={styles.spin} size={18} />
            )}
            {status.message}
          </div>
        )}

        {/* Brand Info Card */}
        <div className={styles.brandSection}>
          <div className={styles.brandInfo}>
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
            <div>
              <h1>{brand.name}</h1>
              <p className={styles.heroText}>
                {brand.heroText || "No Hero Text Configured"}
              </p>
            </div>
          </div>
          <button className={styles.editBrandBtn} onClick={handleEditBrand}>
            <Edit size={16} /> Edit Details
          </button>
        </div>

        <hr className={styles.divider} />

        {/* --- DEVICES SECTION --- */}
        <div className={styles.devicesSection}>
          <div className={styles.sectionHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2>
                <Smartphone size={20} /> Devices ({devices.length})
              </h2>
            </div>

            {/* ACTION GROUP: Upload & Add */}
            <div className={styles.actionGroup}>
              <button
                className={styles.secondaryBtn}
                onClick={downloadTemplate}
                title="Download Blank Template"
              >
                <FileSpreadsheet size={16} /> Template
              </button>

              <div className={styles.uploadWrapper}>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  id="brand-upload"
                  className={styles.hiddenInput}
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
                <label
                  htmlFor="brand-upload"
                  className={`${styles.secondaryBtn} ${
                    uploading ? styles.disabled : ""
                  }`}
                >
                  {uploading ? (
                    <Loader2 size={16} className={styles.spin} />
                  ) : (
                    <UploadCloud size={16} />
                  )}
                  <span>Import Excel</span>
                </label>
              </div>

              <button className={styles.addDeviceBtn} onClick={handleAddDevice}>
                <Plus size={16} /> Add Device
              </button>
            </div>
          </div>

          {devices.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No devices found for {brand.name}.</p>
              <p>Add one manually or import from Excel.</p>
            </div>
          ) : (
            <div className={styles.deviceGrid}>
              {devices.map((device) => (
                <div key={device._id} className={styles.deviceCard}>
                  <img
                    src={device.image}
                    alt={device.name}
                    className={styles.deviceImg}
                    // --- FIXED IMAGE ERROR HANDLER ---
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/logo192.png";
                    }}
                  />
                  <h3>{device.name}</h3>
                  <p>{device.type}</p>

                  <div className={styles.deviceActions}>
                    <button
                      onClick={() => handleEditDevice(device)}
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => handleManageServices(device)}
                      className={styles.servicesBtn}
                      title="Services"
                    >
                      <Layers size={14} /> Services
                    </button>
                    <button
                      onClick={() => handleDeleteDevice(device._id)}
                      className={styles.deleteBtn}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
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

export default AdminBrandDetailsPage;
