import React, { useState } from "react";
import { X, PhoneCall, MapPin, Smartphone, User, Loader2 } from "lucide-react";
import styles from "./QuickBookingModal.module.css";
import { contactService } from "../../services/contactService";

const QuickBookingModal = ({ close }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    deviceType: "Mobile", // Default
    location: "",
    issueDescription: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // We format the data to fit your existing Contact API
      const payload = {
        name: formData.name,
        mobile: formData.mobile,
        // We use a placeholder email since your backend requires it, but the user didn't input it
        email: "callback_request@cellclinic.com",
        description: `🚀 CALLBACK REQUEST \n\n📍 Location: ${formData.location}\n📱 Device Type: ${formData.deviceType}\n📝 Issue: ${formData.issueDescription}\n\nPlease call this customer back immediately.`,
      };

      await contactService.submitContactForm(payload);
      setSuccess(true);

      // Close automatically after 2 seconds
      setTimeout(() => {
        close();
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>🎉</div>
        <h3>Request Received!</h3>
        <p>
          We will call you shortly at <strong>{formData.mobile}</strong>.
        </p>
        <button onClick={close} className={styles.closeBtnText}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <PhoneCall size={24} className={styles.iconPulse} />
          <h3>Get a Callback</h3>
        </div>
        <button onClick={close} className={styles.closeIcon}>
          <X size={24} />
        </button>
      </div>

      <p className={styles.subtext}>
        Enter your details and we'll call you to schedule your repair.
      </p>

      {error && <div className={styles.errorBanner}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Name */}
        <div className={styles.inputGroup}>
          <User size={18} className={styles.inputIcon} />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Mobile Number */}
        <div className={styles.inputGroup}>
          <PhoneCall size={18} className={styles.inputIcon} />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            required
            pattern="[0-9]{10}"
            title="10 digit mobile number"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        {/* Device Type */}
        <div className={styles.inputGroup}>
          <Smartphone size={18} className={styles.inputIcon} />
          <select
            name="deviceType"
            value={formData.deviceType}
            onChange={handleChange}
            className={styles.selectInput}
          >
            <option value="Mobile">Mobile Phone</option>
            <option value="Tablet/iPad">Tablet / iPad</option>
            <option value="Laptop/MacBook">Laptop / MacBook</option>
            <option value="Smartwatch">Smartwatch</option>
          </select>
        </div>

        {/* Location */}
        <div className={styles.inputGroup}>
          <MapPin size={18} className={styles.inputIcon} />
          <input
            type="text"
            name="location"
            placeholder="Your Location (e.g. Madhapur)"
            required
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      
        {/* Issue Description */}
        <div className={styles.inputGroup}>
          <textarea
            name="issueDescription"
            placeholder="Describe the issue with your device..."
            value={formData.issueDescription}
            onChange={handleChange}
            className={styles.textareaInput}
            rows="3"
          ></textarea>
        </div>
      
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? <Loader2 className={styles.spin} /> : "Get a Call Now"}
        </button>
      </form>
    </div>
  );
};

export default QuickBookingModal;
