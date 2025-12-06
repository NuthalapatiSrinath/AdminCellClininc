import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../redux/slices/modalSlice";
import { X, PhoneCall, Loader2, Smartphone } from "lucide-react";
import styles from "./BookingModal.module.css";
import { inquiryService } from "../../services/inquiryService";

const BookingModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Access the correct state key: modalData
  const { modalData } = useSelector((state) => state.modal);

  const [formData, setFormData] = useState({ name: "", mobileNumber: "" });
  const [status, setStatus] = useState("idle");

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  // UPDATED: Handle Change with Number Validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Logic: If input is mobileNumber, restrict to digits only
    if (name === "mobileNumber") {
      // Replace any non-digit character with empty string
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // UPDATED: Validation Check before submission
    if (formData.mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setStatus("loading");

    // 2. Construct the Payload using modalData
    const payload = {
      name: formData.name,
      mobileNumber: formData.mobileNumber,
      deviceModel: modalData?.deviceModel || "Unknown Device",

      // IMPORTANT: Map 'title' from frontend to 'name' for backend
      selectedServices:
        modalData?.selectedServices?.map((s) => ({
          name: s.title, // Backend key is 'name'
          price: s.price,
        })) || [],

      totalEstimatedPrice: modalData?.total || 0,
    };

    console.log(
      "🚀 Payload Sending to Backend:",
      JSON.stringify(payload, null, 2)
    );

    try {
      const response = await inquiryService.createInquiry(payload);

      if (response.success) {
        setStatus("success");
        setTimeout(() => {
          dispatch(closeModal());
          navigate("/booking-success");
        }, 1500);
      } else {
        alert("Something went wrong. Please try again.");
        setStatus("idle");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Server error. Please check your connection.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.successContainer}>
          <div className={styles.successIcon}>🎉</div>
          <h3>Booking Confirmed!</h3>
          <p>Redirecting you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={() => dispatch(closeModal())}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeBtn}
          onClick={() => dispatch(closeModal())}
        >
          <X size={24} />
        </button>

        <div className={styles.header}>
          <h2>Confirm Repair Booking</h2>
          <p>Fill in your details to get a call back.</p>
        </div>

        <div className={styles.body}>
          {/* Summary Section */}
          <div className={styles.summaryCard}>
            <div className={styles.deviceRow}>
              <Smartphone size={20} className={styles.iconBlue} />
              <span className={styles.deviceName}>
                {modalData?.deviceModel || "Device"}
              </span>
            </div>

            <div className={styles.divider}></div>

            <ul className={styles.serviceList}>
              {modalData?.selectedServices?.length > 0 ? (
                modalData.selectedServices.map((s, idx) => (
                  <li key={idx}>
                    <span>{s.title}</span>
                    <span className={styles.servicePrice}>
                      {formatPrice(s.price)}
                    </span>
                  </li>
                ))
              ) : (
                <li>No services selected</li>
              )}
            </ul>

            <div className={styles.divider}></div>

            <div className={styles.totalRow}>
              <span>Total Estimate</span>
              <span className={styles.totalPrice}>
                {formatPrice(modalData?.total || 0)}
              </span>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber" // Updated to match backend key
                placeholder="9876543210"
                maxLength="10"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <Loader2 className={styles.spin} />
              ) : (
                <>
                  <PhoneCall size={18} /> Book Now
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
