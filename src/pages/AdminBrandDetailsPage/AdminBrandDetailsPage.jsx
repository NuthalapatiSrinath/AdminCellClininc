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
  
  // Multi-select States
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectMode, setSelectMode] = useState(false);

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
      const devicesData = devicesRes.data || [];
      
      // Backend returns devices sorted by _id descending (newest first)
      // This preserves Excel upload order: newest batch at top, correct row order within batch
      setDevices(devicesData);
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
    try {
      await catalogService.deleteDevice(deviceId);
      fetchData();
      setStatus({ message: "Device deleted successfully", type: "success" });
    } catch (err) {
      setStatus({ message: "Failed to delete device", type: "error" });
    }
  };

  // Delete All Devices
  const handleDeleteAllDevices = async () => {
    if (devices.length === 0) {
      alert("No devices to delete");
      return;
    }
    
    if (!window.confirm(`Delete ALL ${devices.length} devices from ${brand.name}? This cannot be undone!`)) {
      return;
    }
    
    setLoading(true);
    setStatus({ message: "Deleting all devices...", type: "info" });
    
    try {
      const deletePromises = devices.map(device => 
        catalogService.deleteDevice(device._id)
      );
      await Promise.all(deletePromises);
      
      setStatus({ message: "All devices deleted successfully", type: "success" });
      fetchData();
    } catch (err) {
      console.error(err);
      setStatus({ message: "Some devices failed to delete", type: "error" });
      fetchData();
    } finally {
      setLoading(false);
    }
  };

  // Toggle Select Mode
  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    setSelectedDevices([]);
  };

  // Toggle Device Selection
  const toggleDeviceSelection = (deviceId) => {
    setSelectedDevices(prev => {
      if (prev.includes(deviceId)) {
        return prev.filter(id => id !== deviceId);
      } else {
        return [...prev, deviceId];
      }
    });
  };

  // Select All Devices
  const selectAllDevices = () => {
    if (selectedDevices.length === devices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(devices.map(d => d._id));
    }
  };

  // Delete Selected Devices
  const handleDeleteSelected = async () => {
    if (selectedDevices.length === 0) {
      alert("No devices selected");
      return;
    }
    
    if (!window.confirm(`Delete ${selectedDevices.length} selected device(s)? This cannot be undone!`)) {
      return;
    }
    
    setLoading(true);
    setStatus({ message: `Deleting ${selectedDevices.length} device(s)...`, type: "info" });
    
    try {
      const deletePromises = selectedDevices.map(deviceId => 
        catalogService.deleteDevice(deviceId)
      );
      await Promise.all(deletePromises);
      
      setStatus({ message: `${selectedDevices.length} device(s) deleted successfully`, type: "success" });
      setSelectedDevices([]);
      setSelectMode(false);
      fetchData();
    } catch (err) {
      console.error(err);
      setStatus({ message: "Some devices failed to delete", type: "error" });
      fetchData();
    } finally {
      setLoading(false);
    }
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
              {selectMode && selectedDevices.length > 0 && (
                <span style={{ color: "#4f46e5", fontSize: "14px", fontWeight: "500" }}>
                  ({selectedDevices.length} selected)
                </span>
              )}
            </div>

            {/* ACTION GROUP: Upload & Add */}
            <div className={styles.actionGroup}>
              {!selectMode ? (
                <>
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
                  
                  {devices.length > 0 && (
                    <>
                      <button
                        className={styles.secondaryBtn}
                        onClick={toggleSelectMode}
                        style={{
                          backgroundColor: "#fff7ed",
                          color: "#ea580c",
                          border: "1px solid #fed7aa",
                        }}
                      >
                        Select
                      </button>
                      <button
                        className={styles.deleteBrandBtn}
                        onClick={handleDeleteAllDevices}
                        title="Delete All Devices"
                      >
                        <Trash2 size={16} /> Delete All
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button
                    className={styles.secondaryBtn}
                    onClick={selectAllDevices}
                    style={{
                      backgroundColor: selectedDevices.length === devices.length ? "#dcfce7" : "#f3f4f6",
                      color: selectedDevices.length === devices.length ? "#16a34a" : "#374151",
                      border: selectedDevices.length === devices.length ? "1px solid #86efac" : "1px solid #d1d5db",
                    }}
                  >
                    {selectedDevices.length === devices.length ? "Deselect All" : "Select All"}
                  </button>
                  <button
                    className={styles.deleteBrandBtn}
                    onClick={handleDeleteSelected}
                    disabled={selectedDevices.length === 0}
                    style={{
                      opacity: selectedDevices.length === 0 ? 0.5 : 1,
                      cursor: selectedDevices.length === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    <Trash2 size={16} /> Delete Selected ({selectedDevices.length})
                  </button>
                  <button
                    className={styles.secondaryBtn}
                    onClick={toggleSelectMode}
                  >
                    Cancel
                  </button>
                </>
              )}
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
                <div 
                  key={device._id} 
                  className={`${styles.deviceCard} ${
                    selectMode && selectedDevices.includes(device._id) ? styles.selected : ""
                  }`}
                  onClick={() => selectMode && toggleDeviceSelection(device._id)}
                  style={{
                    cursor: selectMode ? "pointer" : "default",
                    border: selectMode && selectedDevices.includes(device._id) 
                      ? "2px solid #4f46e5" 
                      : undefined,
                    backgroundColor: selectMode && selectedDevices.includes(device._id)
                      ? "#eef2ff"
                      : undefined,
                  }}
                >
                  {selectMode && (
                    <div style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      zIndex: 10,
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedDevices.includes(device._id)}
                        onChange={() => toggleDeviceSelection(device._id)}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  )}
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

                  {!selectMode && (
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
                  )}
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
