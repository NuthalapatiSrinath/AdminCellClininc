import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import styles from "./CreateBrandModal.module.css";
import { catalogService } from "../../services/catalogService";

const CreateBrandModal = ({ close, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    subtitle: "",
    heroText: "",
    heroDesc: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await catalogService.createBrand(formData);
      setLoading(false);
      // Trigger the success callback passed from AdminPage
      if (onSuccess) onSuccess("Brand Created Successfully!");
      close(); // Close the modal via Redux dispatch
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || err.message || "Failed to create brand"
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Add New Brand</h3>
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
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Logo Image URL *</label>
            <input
              required
              placeholder="https://..."
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Hero Heading</label>
            <input
              placeholder="e.g. EXPERT IPHONE REPAIR"
              value={formData.heroText}
              onChange={(e) =>
                setFormData({ ...formData, heroText: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Hero Description</label>
            <textarea
              placeholder="Description for the hero section..."
              rows={3}
              value={formData.heroDesc}
              onChange={(e) =>
                setFormData({ ...formData, heroDesc: e.target.value })
              }
            />
          </div>
        </div>

        <button type="submit" className={styles.saveBtn} disabled={loading}>
          {loading ? (
            <Loader2 className={styles.spin} size={20} />
          ) : (
            "Save Brand"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateBrandModal;
