import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./MainModal.module.css";

function MainModal({ children }) {
  const activeModal = useSelector((state) => state.modal.type);

  const isFullScreen = ["studentSection", "staffSection"].includes(activeModal);

  // Lock background scroll
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeModal]);

  if (!activeModal) return null; // ✅ don’t render container unless modal is open

  return (
    <div
      className={`${styles.MainModal} ${
        isFullScreen ? styles.fullscreen : styles.centered
      }`}
    >
      {children}
    </div>
  );
}

export default MainModal;
