import React, { useState, useEffect } from "react";
import { X, Loader2, RefreshCw } from "lucide-react";
import styles from "./CreateServiceModal.module.css";
import { catalogService } from "../../services/catalogService";

// Added initialData, preSelectedBrandId, preSelectedDeviceId
const CreateServiceModal = ({
  brands = [],
  close,
  onSuccess,
  initialData = null,
  preSelectedBrandId = "",
  preSelectedDeviceId = "",
}) => {
  const [loading, setLoading] = useState(false);
  const [fetchingDevices, setFetchingDevices] = useState(false);
  const [error, setError] = useState("");
  const [devices, setDevices] = useState([]);

  const isEditMode = !!initialData;

  // Initialize state
  const [brandId, setBrandId] = useState(preSelectedBrandId || "");
  // If editing, get device ID from initialData, otherwise use preSelected
  const [deviceId, setDeviceId] = useState(
    initialData?.device || preSelectedDeviceId || ""
  );
  const [title, setTitle] = useState(initialData?.title || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [desc, setDesc] = useState(initialData?.description || "");

  // ... (Keep existing useEffect for fetching devices based on brandId) ...
  useEffect(() => {
    if (brandId && !preSelectedDeviceId && !isEditMode) {
      // Only fetch if we aren't locked into a specific device already
      const loadDevices = async () => {
        setFetchingDevices(true);
        try {
          const res = await catalogService.getDevices(brandId);
          if (res.success) setDevices(res.data);
        } catch (e) {
          console.error(e);
        }
        setFetchingDevices(false);
      };
      loadDevices();
    }
  }, [brandId, preSelectedDeviceId, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const payload = {
      title,
      price: Number(price),
      description: desc,
      device: deviceId,
    };

    try {
      if (isEditMode) {
        await catalogService.updateService(initialData._id, payload);
        if (onSuccess) onSuccess("Service Updated Successfully!");
      } else {
        await catalogService.createService(payload);
        if (onSuccess) onSuccess("Service Added Successfully!");
      }
      setLoading(false);
      close();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed");
    }
  };

  // Simplified render for brevity - ensure inputs use new state values
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{isEditMode ? "Edit Service" : "Add New Service"}</h3>
        <button onClick={close} className={styles.closeBtn}>
          <X size={22} />
        </button>
      </div>
      {error && <div className={styles.errorBanner}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.formContent}>
        <div className={styles.scrollArea}>
          {/* Hide Brand/Device Selection if in Edit Mode or pre-selected */}
          {!isEditMode && !preSelectedDeviceId && (
            <>
              <div className={styles.inputGroup}>
                <label>1. Select Brand</label>
                <select
                  required
                  value={brandId}
                  onChange={(e) => {
                    setBrandId(e.target.value);
                    setDeviceId("");
                  }}
                  disabled={!!preSelectedBrandId}
                >
                  <option value="">-- Choose Brand --</option>
                  {brands.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>
                  2. Select Device{" "}
                  {fetchingDevices && (
                    <RefreshCw size={12} className={styles.spin} />
                  )}
                </label>
                <select
                  required
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  disabled={!brandId || fetchingDevices}
                >
                  <option value="">-- Choose Device --</option>
                  {devices.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className={styles.inputGroup}>
            <label>Service Title *</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Price (₹) *</label>
            <input
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Description</label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className={styles.saveBtn} disabled={loading}>
          {loading ? (
            <Loader2 className={styles.spin} size={20} />
          ) : isEditMode ? (
            "Update Service"
          ) : (
            "Save Service"
          )}
        </button>
      </form>
    </div>
  );
};
export default CreateServiceModal;
