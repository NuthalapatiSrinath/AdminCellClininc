import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { logout } from "../../redux/slices/authSlice";
import {
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  ShieldAlert,
  DownloadCloud,
  Loader2,
  Upload,
} from "lucide-react";

import { backupService } from "../../services/backupService";

// PAGES
import AdminCatalogPage from "../AdminCatalogPage/AdminCatalogPage";
import MyOrdersPage from "../MyOrdersPage/MyOrdersPage";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("catalog");
  const [downloading, setDownloading] = useState(false);
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openModal({ type: "login" }));
    }
  }, [isAuthenticated, dispatch]);

  // ---------------------------
  // BACKUP
  // ---------------------------
  const handleDownloadBackup = async () => {
    if (!window.confirm("Download full backup (Images + Data)?")) return;

    setDownloading(true);
    const result = await backupService.downloadFullBackup();
    setDownloading(false);

    if (!result.success) {
      alert("Backup Failed! Check console.");
    }
  };

  // ---------------------------
  // RESTORE
  // ---------------------------
  const handleRestore = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      !window.confirm("⚠ WARNING: This will delete all current data. Continue?")
    ) {
      e.target.value = null;
      return;
    }

    setRestoring(true);
    try {
      const res = await backupService.uploadRestoreFile(file);
      alert(res.message || "Restore successful!");
      window.location.reload();
    } catch (err) {
      alert("Restore failed. Check console.");
    } finally {
      setRestoring(false);
      e.target.value = null;
    }
  };

  // ---------------------------
  // AUTH CHECK
  // ---------------------------
  if (!isAuthenticated) {
    return (
      <div style={styles.deniedContainer}>
        <ShieldAlert size={64} color="#dc2626" />
        <h2>Access Restricted</h2>
        <p>You must be logged in as Admin.</p>
        <button
          onClick={() => dispatch(openModal({ type: "login" }))}
          style={styles.loginBtn}
        >
          Open Login
        </button>
      </div>
    );
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div style={styles.dashboardWrapper}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.heading}>Admin Dashboard</h1>
          <p style={styles.subHeading}>Welcome, {user?.email}</p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {/* BACKUP */}
          <button
            onClick={handleDownloadBackup}
            style={styles.backupBtn}
            disabled={downloading || restoring}
          >
            {downloading ? (
              <Loader2 className="spin" size={18} />
            ) : (
              <DownloadCloud size={18} />
            )}
            Backup
          </button>

          {/* RESTORE */}
          <div style={{ position: "relative" }}>
            <input
              type="file"
              accept=".zip"
              onChange={handleRestore}
              style={styles.hiddenInput}
              disabled={restoring || downloading}
            />

            <button
              style={styles.restoreBtn}
              disabled={restoring || downloading}
            >
              {restoring ? (
                <Loader2 className="spin" size={18} />
              ) : (
                <Upload size={18} />
              )}
              {restoring ? "Restoring..." : "Restore"}
            </button>
          </div>

          {/* LOGOUT */}
          <button onClick={() => dispatch(logout())} style={styles.logoutBtn}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* TABS */}
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tabBtn,
            ...(activeTab === "catalog" ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab("catalog")}
        >
          <LayoutDashboard size={20} /> Catalog Manager
        </button>

        <button
          style={{
            ...styles.tabBtn,
            ...(activeTab === "orders" ? styles.activeTab : {}),
          }}
          onClick={() => setActiveTab("orders")}
        >
          <ShoppingBag size={20} /> All Bookings
        </button>
      </div>

      <div style={styles.contentArea}>
        {activeTab === "catalog" ? <AdminCatalogPage /> : <MyOrdersPage />}
      </div>
    </div>
  );
};

// ----------------------
// STYLES
// ----------------------
const styles = {
  dashboardWrapper: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    flexDirection: "column",
  },

  topBar: {
    background: "#fff",
    padding: "20px 40px",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: { margin: 0, fontSize: "24px", fontWeight: "800" },
  subHeading: { margin: 0, color: "#666" },

  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "10px 20px",
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "8px",
    border: "1px solid #fca5a5",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  backupBtn: {
    padding: "10px 20px",
    background: "#ecfdf5",
    color: "#047857",
    borderRadius: "8px",
    border: "1px solid #6ee7b7",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  restoreBtn: {
    padding: "10px 20px",
    background: "#fff7ed",
    color: "#c2410c",
    borderRadius: "8px",
    border: "1px solid #fdba74",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  tabContainer: {
    display: "flex",
    gap: "15px",
    padding: "20px 40px",
    background: "#fff",
  },

  tabBtn: {
    padding: "12px 24px",
    background: "transparent",
    border: "none",
    borderBottom: "3px solid transparent",
    cursor: "pointer",
    color: "#666",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "600",
  },

  activeTab: {
    color: "#2563eb",
    borderBottom: "3px solid #2563eb",
  },

  contentArea: {
    flex: 1,
    // padding: "20px",
  },

  deniedContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
  },

  loginBtn: {
    padding: "12px 24px",
    background: "#2563eb",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

// Animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);

export default AdminPage;
