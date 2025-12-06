import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Smartphone,
  MemoryStick,
  BatteryWarning,
} from "lucide-react";
import styles from "./PickupChecklistPage.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const PickupChecklistPage = () => {
  const navigate = useNavigate();
  const [checks, setChecks] = useState({
    power: false,
    sim: false,
    backup: false,
    risk: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheck = (key) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = Object.values(checks).every(Boolean);

  const handleContinue = () => {
    if (allChecked) {
      // Proceed to Payment
      navigate("/payment?mode=pickup");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Device Pickup Checklist</h1>
          <p className={styles.subtitle}>
            Before our executive arrives, please confirm the following for a
            smooth pickup.
          </p>
        </div>

        <motion.div
          className={styles.checklist}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Item 1: Power */}
          <motion.div
            className={styles.checkItem}
            variants={itemVariants}
            onClick={() => handleCheck("power")}
          >
            <div
              className={`${styles.checkbox} ${
                checks.power ? styles.checked : ""
              }`}
            >
              {checks.power && <CheckCircle size={18} />}
            </div>
            <div className={styles.content}>
              <div className={styles.iconBox}>
                <Smartphone size={24} />
              </div>
              <div className={styles.text}>
                <h3>Device Switches On</h3>
                <p>
                  My device is currently switching on and the display is visible
                  (unless display dead).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Item 2: SIM/SD */}
          <motion.div
            className={styles.checkItem}
            variants={itemVariants}
            onClick={() => handleCheck("sim")}
          >
            <div
              className={`${styles.checkbox} ${
                checks.sim ? styles.checked : ""
              }`}
            >
              {checks.sim && <CheckCircle size={18} />}
            </div>
            <div className={styles.content}>
              <div className={styles.iconBox}>
                <MemoryStick size={24} />
              </div>
              <div className={styles.text}>
                <h3>SIM & Memory Card Removed</h3>
                <p>
                  I have removed my SIM card and Memory card from the device.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Item 3: Data Backup */}
          <motion.div
            className={styles.checkItem}
            variants={itemVariants}
            onClick={() => handleCheck("backup")}
          >
            <div
              className={`${styles.checkbox} ${
                checks.backup ? styles.checked : ""
              }`}
            >
              {checks.backup && <CheckCircle size={18} />}
            </div>
            <div className={styles.content}>
              <div className={styles.iconBox}>
                <AlertTriangle size={24} />
              </div>
              <div className={styles.text}>
                <h3>Data Backup Taken</h3>
                <p>
                  I have backed up my data. Cell Clinic is not responsible for
                  data loss during complex repairs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Item 4: Risk Acceptance */}
          <motion.div
            className={styles.checkItem}
            variants={itemVariants}
            onClick={() => handleCheck("risk")}
          >
            <div
              className={`${styles.checkbox} ${
                checks.risk ? styles.checked : ""
              }`}
            >
              {checks.risk && <CheckCircle size={18} />}
            </div>
            <div className={styles.content}>
              <div className={styles.iconBox}>
                <BatteryWarning size={24} />
              </div>
              <div className={styles.text}>
                <h3>Risk Acknowledgement</h3>
                <p>
                  I understand that for water-damaged or dead devices, there is
                  a risk the device may not turn on after diagnosis.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className={styles.footer}>
          <button
            className={styles.proceedBtn}
            disabled={!allChecked}
            onClick={handleContinue}
          >
            Confirm & Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickupChecklistPage;
