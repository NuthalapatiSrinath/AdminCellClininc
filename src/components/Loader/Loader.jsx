import React from "react";
import { Loader2 } from "lucide-react";
import styles from "./Loader.module.css";

const Loader = ({ fullScreen = true, size = 40, color = "#2563eb" }) => {
  return (
    <div
      className={`${styles.container} ${fullScreen ? styles.fullScreen : ""}`}
    >
      <Loader2 size={size} color={color} className={styles.spin} />
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default Loader;
