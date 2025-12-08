import React, { useState, useEffect } from "react";
import { X, Loader2, UploadCloud } from "lucide-react";
import styles from "./CreateDeviceModal.module.css";
import { catalogService } from "../../services/catalogService";

// Added initialData for editing, preSelectedBrandId for convenience
const CreateDeviceModal = ({
  brands = [],
  close,
  onSuccess,
  initialData = null,
  preSelectedBrandId = "",
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = !!initialData;

  // Initialize state depending on edit mode or create mode
  const [brandId, setBrandId] = useState(
    initialData?.brand || preSelectedBrandId
  );
  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState(initialData?.type || "mobile");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("brand", brandId);
      formData.append("name", name);
      formData.append("type", type);
      if (imageFile) formData.append("image", imageFile);

      if (isEditMode) {
        await catalogService.updateDevice(initialData._id, formData);
        if (onSuccess) onSuccess("Device Updated Successfully!");
      } else {
        await catalogService.createDevice(formData);
        if (onSuccess) onSuccess("Device Created Successfully!");
      }

      setLoading(false);
      close();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{isEditMode ? `Edit ${initialData.name}` : "Add New Device"}</h3>
        <button onClick={close} className={styles.closeBtn}>
          <X size={22} />
        </button>
      </div>
      {error && <div className={styles.errorBanner}>{error}</div>}
      <form onSubmit={handleSubmit} className={styles.formContent}>
        <div className={styles.scrollArea}>
          {/* If preSelectedBrandId exists (from detail page), disable selection */}
          <div className={styles.inputGroup}>
            <label>Brand *</label>
            <select
              required
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              disabled={isEditMode || !!preSelectedBrandId}
            >
              <option value="">Select Brand</option>
              {brands.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Device Model Name *</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Device Image {isEditMode && "(Leave empty to keep current)"}
            </label>
            <div className={styles.fileBox}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className={styles.hiddenInput}
                id="device-file"
              />
              <label htmlFor="device-file" className={styles.fileLabel}>
                <UploadCloud size={20} />{" "}
                <span>{imageFile ? imageFile.name : "Upload Image"}</span>
              </label>
            </div>
            {isEditMode && !imageFile && initialData.image && (
              <img
                src={initialData.image}
                alt="Current"
                style={{ height: 40, objectFit: "contain", marginTop: 5 }}
              />
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
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
          ) : isEditMode ? (
            "Update Device"
          ) : (
            "Save Device"
          )}
        </button>
      </form>
    </div>
  );
};
export default CreateDeviceModal;
