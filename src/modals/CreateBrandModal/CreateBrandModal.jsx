import React, { useState, useEffect } from "react";
import { X, Loader2, UploadCloud } from "lucide-react";
import styles from "./CreateBrandModal.module.css";
import { catalogService } from "../../services/catalogService";

// Added 'initialData' prop to support Editing
const CreateBrandModal = ({ close, onSuccess, initialData = null }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize state with existing data if editing
  const [name, setName] = useState(initialData?.name || "");
  const [heroText, setHeroText] = useState(initialData?.heroText || "");
  const [heroDesc, setHeroDesc] = useState(initialData?.heroDesc || "");
  const [imageFile, setImageFile] = useState(null);

  const isEditMode = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("heroText", heroText);
      formData.append("heroDesc", heroDesc);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (isEditMode) {
        // --- UPDATE ---
        await catalogService.updateBrand(initialData._id, formData);
        if (onSuccess) onSuccess("Brand Updated Successfully!");
      } else {
        // --- CREATE ---
        if (!imageFile) throw new Error("Please select a logo image");
        await catalogService.createBrand(formData);
        if (onSuccess) onSuccess("Brand Created Successfully!");
      }

      setLoading(false);
      close();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || "Failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{isEditMode ? "Edit Brand" : "Add New Brand"}</h3>
        <button onClick={close} className={styles.closeBtn}>
          <X size={22} />
        </button>
      </div>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.formContent}>
        <div className={styles.scrollArea}>
          <div className={styles.inputGroup}>
            <label>Brand Name *</label>
            <input
              required
              placeholder="e.g. Apple"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>
              Brand Logo {isEditMode && "(Leave empty to keep current)"}
            </label>
            <div className={styles.fileBox}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className={styles.hiddenInput}
                id="brand-file"
                required={!isEditMode} // Required only for new brands
              />
              <label htmlFor="brand-file" className={styles.fileLabel}>
                <UploadCloud size={20} />
                <span>
                  {imageFile
                    ? imageFile.name
                    : isEditMode
                    ? "Change Image"
                    : "Upload Image"}
                </span>
              </label>
            </div>
            {/* Show preview if editing and no new file selected */}
            {isEditMode && !imageFile && initialData.image && (
              <img
                src={initialData.image}
                alt="Current"
                style={{ height: 40, objectFit: "contain", marginTop: 5 }}
              />
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Hero Heading</label>
            <input
              placeholder="e.g. EXPERT IPHONE REPAIR"
              value={heroText}
              onChange={(e) => setHeroText(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Hero Description</label>
            <textarea
              placeholder="Description..."
              rows={3}
              value={heroDesc}
              onChange={(e) => setHeroDesc(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className={styles.saveBtn} disabled={loading}>
          {loading ? (
            <Loader2 className={styles.spin} size={20} />
          ) : isEditMode ? (
            "Update Brand"
          ) : (
            "Save Brand"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateBrandModal;
