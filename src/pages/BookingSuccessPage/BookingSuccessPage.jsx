import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Home, PhoneCall } from "lucide-react";
import styles from "./BookingSuccessPage.module.css";

const BookingSuccessPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <motion.div
          className={styles.successCard}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className={styles.iconWrapper}>
            <CheckCircle size={80} className={styles.successIcon} />
          </div>

          <h1 className={styles.title}>Quote Request Sent!</h1>
          <p className={styles.subText}>
            Thank you for choosing Cell Clinic Hyderabad. We have received your
            details. Our expert team will review the issue and{" "}
            <strong>call you back shortly</strong> to discuss the best price and
            schedule your repair.
          </p>

          <div className={styles.orderDetails}>
            <div className={styles.row}>
              <span>Reference ID:</span>
              <strong>
                #REQ-{Math.floor(100000 + Math.random() * 900000)}
              </strong>
            </div>
            <div className={styles.row}>
              <span>Status:</span>
              <strong style={{ color: "#eab308" }}>Pending Callback</strong>
            </div>
          </div>

          <div className={styles.actions}>
            <Link to="/" className={styles.homeBtn}>
              <Home size={18} /> Back to Home
            </Link>
            {/* Optional: Immediate Call Action */}
            <a href="tel:+919346532339" className={styles.callBtn}>
              <PhoneCall size={18} /> Call Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;
