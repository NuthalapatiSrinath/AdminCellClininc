import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";
import { loginSuccess } from "../../redux/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import styles from "./LoginModal.module.css";

// --- Toast Component (Internal) ---
const Toast = ({ message, type = "success", onClose }) => {
  return (
    <motion.div
      className={`${styles.toast} ${type === "error" ? styles.errorToast : ""}`}
      initial={{ opacity: 0, y: 20, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 20, x: "-50%" }}
    >
      {type === "error" ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
      <span>{message}</span>
      <button onClick={onClose} className={styles.toastClose}>
        <X size={16} />
      </button>
    </motion.div>
  );
};

const LoginModal = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputRefs = useRef([]);

  // Toast State
  const [toast, setToast] = useState(null); // { message: "", type: "success" | "error" }

  // Helper to show toast
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Focus first OTP input on step change
  useEffect(() => {
    if (step === 2 && otpInputRefs.current[0]) {
      otpInputRefs.current[0].focus();
    }
  }, [step]);

  // Step 1: Validate Mobile
  const handleContinue = () => {
    if (mobile.length === 10) {
      showToast(`OTP sent to +91 ${mobile}`, "success");
      setStep(2);
    } else {
      showToast("Please enter a valid 10-digit number", "error");
    }
  };

  // Step 2: Handle OTP Input
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // Step 3: Verify Login
  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 4) {
      showToast("Login Successful!", "success");

      // Delay close slightly to show success message
      setTimeout(() => {
        const userData = { name: "Srinath", mobile: mobile };
        dispatch(loginSuccess(userData));
        dispatch(closeModal());
      }, 1000);
    } else {
      showToast("Invalid OTP. Please try again.", "error");
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    showToast("OTP Resent Successfully!", "success");
    otpInputRefs.current[0].focus();
  };

  return (
    <div className={styles.modalContainer}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <button
        className={styles.closeBtn}
        onClick={() => dispatch(closeModal())}
      >
        <X size={24} />
      </button>

      <div className={styles.grid}>
        {/* Left Panel: Illustration */}
        <div className={styles.leftPanel}>
          <h2 className={styles.loginTitle}>
            {step === 1 ? "Login / Signup" : "Verify OTP"}
          </h2>
          <div className={styles.illustrationWrapper}>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-repair-service-4315043-3610794.png"
              alt="Login Illustration"
              className={styles.illustration}
            />
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className={styles.rightPanel}>
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={styles.formStep}
            >
              <label className={styles.label}>Enter Mobile Number</label>
              <div className={styles.inputGroup}>
                <span className={styles.countryCode}>+91</span>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className={styles.input}
                  value={mobile}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    if (val.length <= 10) setMobile(val);
                  }}
                />
              </div>
              <button className={styles.actionBtn} onClick={handleContinue}>
                Continue
              </button>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={styles.otpContainer}
            >
              <button className={styles.backBtn} onClick={() => setStep(1)}>
                <ArrowLeft size={16} /> Edit Number
              </button>

              <p className={styles.otpInstruction}>
                We've sent a code to <strong>+91 {mobile}</strong>
              </p>

              <div className={styles.otpInputs}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    className={styles.otpBox}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>

              <button className={styles.actionBtn} onClick={handleVerify}>
                Verify & Login
              </button>

              <div className={styles.resendText}>
                Didn't receive code?{" "}
                <button onClick={handleResend} className={styles.resendBtn}>
                  Resend
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
