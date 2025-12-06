import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CreditCard,
  Banknote,
  Wallet,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import styles from "./PaymentPage.module.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mode = query.get("mode") || "doorstep"; // 'doorstep' or 'pickup'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedMethod, setSelectedMethod] = useState("cash");

  const handleConfirmOrder = () => {
    // In real app: Integrate Payment Gateway here if 'online'
    // For now, direct to success
    navigate("/booking-success");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* --- Left: Payment Options --- */}
          <div className={styles.paymentSection}>
            <h1 className={styles.title}>Select Payment Method</h1>
            <p className={styles.subtitle}>
              {mode === "doorstep"
                ? "Pay securely after your device is repaired in front of you."
                : "You can pay a small advance or pay full amount after repair completion."}
            </p>

            <div className={styles.methodsList}>
              {/* Option 1: Cash / Pay after Service */}
              <motion.div
                className={`${styles.methodCard} ${
                  selectedMethod === "cash" ? styles.selected : ""
                }`}
                onClick={() => setSelectedMethod("cash")}
                whileHover={{ scale: 1.01 }}
              >
                <div className={styles.radioCircle}>
                  {selectedMethod === "cash" && (
                    <div className={styles.innerDot} />
                  )}
                </div>
                <div className={styles.methodIcon}>
                  <Banknote size={24} />
                </div>
                <div className={styles.methodText}>
                  <h3>Pay after Service</h3>
                  <p>Cash, UPI, or Card to the technician after repair.</p>
                </div>
              </motion.div>

              {/* Option 2: Online Payment */}
              <motion.div
                className={`${styles.methodCard} ${
                  selectedMethod === "online" ? styles.selected : ""
                }`}
                onClick={() => setSelectedMethod("online")}
                whileHover={{ scale: 1.01 }}
              >
                <div className={styles.radioCircle}>
                  {selectedMethod === "online" && (
                    <div className={styles.innerDot} />
                  )}
                </div>
                <div className={styles.methodIcon}>
                  <CreditCard size={24} />
                </div>
                <div className={styles.methodText}>
                  <h3>Pay Online Now</h3>
                  <p>Credit/Debit Card, Netbanking, Wallets.</p>
                  <span className={styles.badge}>Extra 5% OFF</span>
                </div>
              </motion.div>

              {/* Option 3: UPI */}
              <motion.div
                className={`${styles.methodCard} ${
                  selectedMethod === "upi" ? styles.selected : ""
                }`}
                onClick={() => setSelectedMethod("upi")}
                whileHover={{ scale: 1.01 }}
              >
                <div className={styles.radioCircle}>
                  {selectedMethod === "upi" && (
                    <div className={styles.innerDot} />
                  )}
                </div>
                <div className={styles.methodIcon}>
                  <Wallet size={24} />
                </div>
                <div className={styles.methodText}>
                  <h3>UPI</h3>
                  <p>Google Pay, PhonePe, Paytm</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* --- Right: Bill Summary --- */}
          <div className={styles.summarySection}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>

              <div className={styles.summaryRow}>
                <span>Service Total</span>
                <span>₹7,600</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Convenience Fee</span>
                <span>₹99</span>
              </div>
              {selectedMethod === "online" && (
                <div className={styles.summaryRow}>
                  <span className={styles.greenText}>Online Discount (5%)</span>
                  <span className={styles.greenText}>- ₹380</span>
                </div>
              )}

              <div className={styles.divider}></div>

              <div className={styles.totalRow}>
                <span>To Pay</span>
                <span>{selectedMethod === "online" ? "₹7,319" : "₹7,699"}</span>
              </div>

              <div className={styles.trustBadge}>
                <ShieldCheck size={16} />
                <span>100% Safe & Secure Payment</span>
              </div>

              <button className={styles.payBtn} onClick={handleConfirmOrder}>
                {selectedMethod === "cash" ? "Confirm Booking" : "Pay & Book"}{" "}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
