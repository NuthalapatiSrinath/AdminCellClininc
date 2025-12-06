import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import styles from "./CreateDeviceModal.module.css";
import { catalogService } from "../../services/catalogService";

const CreateDeviceModal = ({ brands = [], close, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    type: "mobile",
    image: "",
  });

  // Log on Mount
  useEffect(() => {
    console.log("🚀 [DeviceModal] Mounted.");
    console.log("🚀 [DeviceModal] Received 'brands' prop:", brands);
  }, [brands]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 [DeviceModal] Submitting Form:", formData);

    setLoading(true);
    setError("");

    try {
      await catalogService.createDevice(formData);
      setLoading(false);
      if (onSuccess) onSuccess("Device Created Successfully!");
      close();
    } catch (err) {
      console.error("❌ [DeviceModal] Error:", err);
      setLoading(false);
      setError(err.response?.data?.message || "Failed to create device");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Add New Device</h3>
        <button onClick={close} className={styles.closeBtn}>
          <X size={22} />
        </button>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.formContent}>
        <div className={styles.scrollArea}>
          <div className={styles.inputGroup}>
            <label>Brand * ({brands.length} available)</label>
            <select
              required
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            >
              <option value="">-- Select Brand --</option>
              {brands && brands.length > 0 ? (
                brands.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))
              ) : (
                <option disabled>No Brands Found</option>
              )}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Device Model Name *</label>
            <input
              required
              placeholder="e.g. iPhone 15 Pro"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          {/* ... other inputs ... */}
          <div className={styles.inputGroup}>
            <label>Device Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="mobile">Mobile</option>
              <option value="tablet">Tablet</option>
              <option value="laptop">Laptop</option>
              <option value="smartwatch">Watch</option>
            </select>
          </div>
        </div>

        <button type="submit" className={styles.saveBtn} disabled={loading}>
          {loading ? (
            <Loader2 className={styles.spin} size={20} />
          ) : (
            "Save Device"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateDeviceModal;
