import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";
import { X, PhoneCall } from "lucide-react";
import styles from "./FindModelModal.module.css";

const FindModelModal = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.modalContainer}>
      <button
        className={styles.closeBtn}
        onClick={() => dispatch(closeModal())}
      >
        <X size={24} />
      </button>

      <h2 className={styles.title}>How to find your device model!</h2>
      <p className={styles.instruction}>
        Go to Settings &gt; About phone &gt; Model number
      </p>

      <div className={styles.imageContainer}>
        {/* You would use the actual screenshot image here */}
        <div className={styles.placeholderScreen}>
          <div className={styles.settingsIcon}>⚙️</div>
          <span>Settings</span>
          <div className={styles.aboutBox}>
            <strong>About phone</strong>
            <p>Status • Legal information</p>
          </div>
          <div className={styles.modelHighlight}>Galaxy A30s</div>
        </div>
      </div>

      <p className={styles.cantFindText}>Can't Find What you're Looking For?</p>

      <a
        href="tel:+919346532339"
        className={styles.contactBtn}
        style={{ textDecoration: "none" }} // Ensures no underline from default link styles
      >
        <PhoneCall size={18} /> Contact Us
      </a>
    </div>
  );
};

export default FindModelModal;
