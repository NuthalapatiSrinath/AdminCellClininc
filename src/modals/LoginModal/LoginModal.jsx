import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";
import { loginSuccess } from "../../redux/slices/authSlice";
import { authService } from "../../services/authService"; // Import Auth Service
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Lock, Mail, Loader2 } from "lucide-react";
import styles from "./LoginModal.module.css";

// --- Toast Component ---
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await authService.login(email, password);

      if (response.success) {
        showToast("Login Successful!", "success");

        // Dispatch to Redux
        dispatch(loginSuccess({ email, role: response.user?.role || "admin" }));

        // Close modal after short delay
        setTimeout(() => {
          dispatch(closeModal());
        }, 1000);
      } else {
        showToast(response.message || "Invalid Credentials", "error");
      }
    } catch (error) {
      showToast(error.toString(), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalContainer}>
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
        {/* Left Panel: Admin Illustration */}
        <div className={styles.leftPanel}>
          <h2 className={styles.loginTitle}>Admin Login</h2>
          <div className={styles.illustrationWrapper}>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/secure-login-4315053-3610804.png"
              alt="Admin Login"
              className={styles.illustration}
            />
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <div className={styles.rightPanel}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={styles.formStep}
          >
            <form onSubmit={handleLogin} className={styles.form}>
              {/* Email Input */}
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputGroup}>
                  <Mail size={20} className={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="admin@cellclinic.com"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className={styles.inputWrapper}>
                <label className={styles.label}>Password</label>
                <div className={styles.inputGroup}>
                  <Lock size={20} className={styles.inputIcon} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.actionBtn}
                disabled={loading}
              >
                {loading ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <Loader2 className={styles.spin} size={20} /> Verifying...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
