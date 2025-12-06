import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import styles from "./FloatingActions.module.css";

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  // Check scroll position to toggle visibility of Scroll-to-Top button
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      {/* WhatsApp Button (Left) */}
      <a
        href="https://wa.me/918686818384" // Replace with your actual WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappBtn}
      >
        {/* Using MessageCircle as a generic chat icon since Lucide doesn't provide brand logos */}
        <MessageCircle size={24} fill="white" className="text-white" />
        <span>WhatsApp Us</span>
      </a>

      {/* Scroll to Top Button (Right) */}
      <button
        className={`${styles.scrollBtn} ${showScroll ? styles.visible : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>
    </div>
  );
}
