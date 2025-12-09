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

// Sub-pages
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

  // --- HANDLER: DOWNLOAD BACKUP ---
  const handleDownloadBackup = async () => {
    if (!window.confirm("Download full website backup (Images + Data)?"))
      return;

    setDownloading(true);
    const result = await backupService.downloadFullBackup();
    setDownloading(false);

    if (!result.success) {
      alert("Download failed. Check console.");
    }
  };

  // --- HANDLER: RESTORE DATA ---
  const handleRestore = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      !window.confirm(
        "⚠️ WARNING: This will DELETE all current data and replace it with the backup. Are you sure?"
      )
    ) {
      e.target.value = null; // Reset input
      return;
    }

    setRestoring(true);
    try {
      const res = await backupService.uploadRestoreFile(file);
      alert(res.message || "Restore Successful!");
      window.location.reload(); // Refresh page to see new data
    } catch (err) {
      console.error(err);
      alert("Restore Failed. Check console for details.");
    } finally {
      setRestoring(false);
      e.target.value = null; // Reset input
    }
  };

  // --- ACCESS DENIED VIEW ---
  if (!isAuthenticated) {
    return (
      <div style={styles.deniedContainer}>
        <ShieldAlert size={64} color="#dc2626" />
        <h2>Access Restricted</h2>
        <p>You must be logged in as an Admin.</p>
        <button
          onClick={() => dispatch(openModal({ type: "login" }))}
          style={styles.loginBtn}
        >
          Open Login
        </button>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div style={styles.dashboardWrapper}>
      {/* TOP BAR */}
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.heading}>Admin Dashboard</h1>
          <p style={styles.subHeading}>Welcome, {user?.email || "Admin"}</p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {/* 1. BACKUP BUTTON */}
          <button
            onClick={handleDownloadBackup}
            style={styles.backupBtn}
            disabled={downloading || restoring}
            title="Download Backup ZIP"
          >
            {downloading ? (
              <Loader2 className="spin" size={18} />
            ) : (
              <DownloadCloud size={18} />
            )}
            <span>Backup</span>
          </button>

          {/* 2. RESTORE BUTTON (Hidden Input Trick) */}
          <div style={{ position: "relative" }}>
            <input
              type="file"
              accept=".zip"
              onChange={handleRestore}
              style={{
                position: "absolute",
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: restoring ? "not-allowed" : "pointer",
                left: 0,
                top: 0,
              }}
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
              <span>{restoring ? "Restoring..." : "Restore"}</span>
            </button>
          </div>

          {/* 3. LOGOUT BUTTON */}
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

      {/* CONTENT AREA */}
      <div style={styles.contentArea}>
        {activeTab === "catalog" ? <AdminCatalogPage /> : <MyOrdersPage />}
      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  dashboardWrapper: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    background: "#ffffff",
    padding: "20px 40px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  heading: { margin: 0, fontSize: "24px", color: "#111827", fontWeight: "800" },
  subHeading: { margin: "4px 0 0 0", fontSize: "14px", color: "#6b7280" },

  logoutBtn: {
    padding: "10px 20px",
    background: "#fee2e2",
    color: "#991b1b",
    border: "1px solid #fca5a5",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  backupBtn: {
    padding: "10px 20px",
    background: "#ecfdf5",
    color: "#047857",
    border: "1px solid #6ee7b7",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
  },

  restoreBtn: {
    padding: "10px 20px",
    background: "#fff7ed",
    color: "#c2410c",
    border: "1px solid #fdba74",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
    height: "100%",
  },

  tabContainer: {
    padding: "20px 40px 0",
    display: "flex",
    gap: "16px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
  },
  tabBtn: {
    padding: "12px 24px",
    background: "transparent",
    color: "#6b7280",
    border: "none",
    borderBottom: "3px solid transparent",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  activeTab: { color: "#2563eb", borderBottom: "3px solid #2563eb" },
  contentArea: { flex: 1, padding: "20px" },
  deniedContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    backgroundColor: "#fef2f2",
    color: "#991b1b",
  },
  loginBtn: {
    padding: "12px 24px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
  },
};

// Add spin animation dynamically if missing
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);

export default AdminPage;
