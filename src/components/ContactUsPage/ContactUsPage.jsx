import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle,
  X,
  Loader2,
} from "lucide-react";
import styles from "./ContactUsPage.module.css";
import { contactService } from "../../services/contactService";

// --- Toast Component ---
const Toast = ({ message, type, onClose }) => {
  const isError = type === "error";
  return (
    <motion.div
      className={styles.toast}
      style={{
        backgroundColor: isError ? "#fee2e2" : "#dcfce7",
        color: isError ? "#ef4444" : "#166534",
        border: `1px solid ${isError ? "#fca5a5" : "#86efac"}`,
      }}
      // ANIMATION: Slide down from Top
      initial={{ opacity: 0, y: -50, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: -20, x: "-50%" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {isError ? <X size={20} /> : <CheckCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className={styles.toastClose}>
        <X size={16} />
      </button>
    </motion.div>
  );
};

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    description: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    showToast: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Start Loading Animation
    setStatus({ ...status, loading: true, showToast: false });

    try {
      await contactService.submitContactForm(formData);

      // Success State
      setStatus({
        loading: false,
        showToast: true,
        message: "Thanks for your valuable feedback!", // <-- UPDATED MESSAGE
        type: "success",
      });

      setFormData({ name: "", email: "", mobile: "", description: "" });
    } catch (error) {
      console.error("Submission Failed:", error);
      setStatus({
        loading: false,
        showToast: true,
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }

    // Auto Hide Toast
    setTimeout(() => {
      setStatus((prev) => ({ ...prev, showToast: false }));
    }, 4000);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Toast Notification */}
      <AnimatePresence>
        {status.showToast && (
          <Toast
            message={status.message}
            type={status.type}
            onClose={() => setStatus((prev) => ({ ...prev, showToast: false }))}
          />
        )}
      </AnimatePresence>

      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Contact Us</h1>
          <p className={styles.breadcrumbs}>Home &gt; Contact Us</p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* --- Form Section --- */}
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.sectionHeading}>
              WE’D LOVE TO HEAR FROM YOU!
            </h2>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={status.loading}
                />
              </div>

              <div className={styles.row}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={status.loading}
                />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile*"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  className={styles.input}
                  disabled={status.loading}
                />
              </div>

              <textarea
                name="description"
                placeholder="Description*"
                required
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                disabled={status.loading}
              ></textarea>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                disabled={status.loading}
                // Smooth fade effect for loading state
                animate={{ opacity: status.loading ? 0.7 : 1 }}
              >
                {status.loading ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <Loader2 className={styles.spin} size={20} /> Sending...
                  </span>
                ) : (
                  "SUBMIT"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* --- Info Section --- */}
          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <MapPin size={24} color="white" />
              </div>
              <div className={styles.infoText}>
                <h3>Head Office Address:</h3>
                <p>
                  Plot 5 to 8, Sector 5, Main Address, Madhapur, Hyderabad,
                  Telangana 408701
                </p>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <Mail size={24} color="white" />
              </div>
              <div className={styles.infoText}>
                <h3>Email</h3>
                <a href="mailto:support@cellclinichyd.com">
                  support@cellclinichyderabad.com
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <Phone size={24} color="white" />
              </div>
              <div className={styles.infoText}>
                <h3>Phone Number</h3>
                <a href="tel:+919346532339">+91 9346532339</a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconBox}>
                <MessageCircle size={24} color="white" />
              </div>
              <div className={styles.infoText}>
                <h3>Whatsapp Number</h3>
                <a
                  href="https://wa.me/9346532339"
                  target="_blank"
                  rel="noreferrer"
                >
                  +91 9346532339
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
