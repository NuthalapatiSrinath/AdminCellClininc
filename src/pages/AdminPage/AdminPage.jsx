import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { logout } from "../../redux/slices/authSlice";
import {
  LayoutDashboard,
  ShoppingBag,
  LogOut,
  ShieldAlert,
} from "lucide-react";

// --- IMPORT SUB-PAGES ---
import AdminCatalogPage from "../AdminCatalogPage/AdminCatalogPage";
import MyOrdersPage from "../MyOrdersPage/MyOrdersPage";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // State to toggle between views
  const [activeTab, setActiveTab] = useState("catalog"); // 'catalog' | 'orders'

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openModal({ type: "login" }));
    }
  }, [isAuthenticated, dispatch]);

  // --- ACCESS DENIED VIEW ---
  if (!isAuthenticated) {
    return (
      <div style={styles.deniedContainer}>
        <ShieldAlert size={64} color="#dc2626" />
        <h2>Access Restricted</h2>
        <p>You must be logged in as an Admin to view this page.</p>
        <button
          onClick={() => dispatch(openModal({ type: "login" }))}
          style={styles.loginBtn}
        >
          Open Login
        </button>
      </div>
    );
  }

  // --- ADMIN DASHBOARD VIEW ---
  return (
    <div style={styles.dashboardWrapper}>
      {/* 1. TOP BAR */}
      <div style={styles.topBar}>
        <div>
          <h1 style={styles.heading}>Admin Dashboard</h1>
          <p style={styles.subHeading}>
            Welcome back, {user?.email || "Admin"}
          </p>
        </div>
        <button onClick={() => dispatch(logout())} style={styles.logoutBtn}>
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* 2. NAVIGATION TABS */}
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

      {/* 3. CONTENT AREA (Renders the full pages) */}
      <div style={styles.contentArea}>
        {activeTab === "catalog" ? (
          <div style={styles.pageFadeIn}>
            {/* Renders the Catalog & Excel Upload Interface */}
            <AdminCatalogPage />
          </div>
        ) : (
          <div style={styles.pageFadeIn}>
            {/* Renders the Bookings List */}
            <MyOrdersPage />
          </div>
        )}
      </div>
    </div>
  );
};

// --- INLINE STYLES (Simple & Clean) ---
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
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
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
    transition: "all 0.2s",
  },

  // Tabs
  tabContainer: {
    padding: "20px 40px 0",
    display: "flex",
    gap: "16px",
    background: "#ffffff", // Keep tabs attached to header visually
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
    transition: "all 0.2s",
  },
  activeTab: {
    color: "#2563eb",
    borderBottom: "3px solid #2563eb",
  },

  // Content
  contentArea: {
    flex: 1,
  },
  pageFadeIn: {
    animation: "fadeIn 0.3s ease-in-out",
  },

  // Access Denied
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

export default AdminPage;
