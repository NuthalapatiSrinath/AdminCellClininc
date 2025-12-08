import React, { useState } from "react";
import { X, Loader2, Save } from "lucide-react";
import styles from "./EditOrderModal.module.css"; // We'll reuse style logic
import { inquiryService } from "../../services/inquiryService";

const EditOrderModal = ({ order, close, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: order.name || "",
    mobileNumber: order.mobileNumber || "",
    deviceModel: order.deviceModel || "",
    totalEstimatedPrice: order.totalEstimatedPrice || 0,
    status: order.status || "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await inquiryService.updateInquiry(order._id, formData);
      if (onSuccess) onSuccess("Order Updated Successfully!");
      close();
    } catch (err) {
      alert("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Edit Order: {order._id.slice(-6)}</h3>
        <button onClick={close} className={styles.closeBtn}>
          <X size={22} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContent}>
        <div className={styles.scrollArea}>
          {/* Status */}
          <div className={styles.inputGroup}>
            <label>Order Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={styles.statusSelect}
            >
              <option value="Pending">Pending</option>
              <option value="Contacted">Contacted</option>
              <option value="Resolved">Resolved</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Customer Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Mobile</label>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Device Model</label>
            <input
              name="deviceModel"
              value={formData.deviceModel}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Total Price (₹)</label>
            <input
              type="number"
              name="totalEstimatedPrice"
              value={formData.totalEstimatedPrice}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.saveBtn} disabled={loading}>
          {loading ? (
            <Loader2 className={styles.spin} />
          ) : (
            <>
              <Save size={18} /> Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditOrderModal;
