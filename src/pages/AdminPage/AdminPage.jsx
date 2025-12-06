import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { logout } from "../../redux/slices/authSlice";
import styles from "./AdminPage.module.css"; // We will assume simple css or you can inline styles

const AdminPage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // If not logged in, force open the Login Modal
    if (!isAuthenticated) {
      dispatch(openModal({ type: "login" }));
    }
  }, [isAuthenticated, dispatch]);

  // --- ACCESS DENIED VIEW ---
  if (!isAuthenticated) {
    return (
      <div
        style={{
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <h2>🚫 Access Restricted</h2>
        <p>You must be logged in as an Admin to view this page.</p>
        <button
          onClick={() => dispatch(openModal({ type: "login" }))}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Open Login
        </button>
      </div>
    );
  }

  // --- ADMIN DASHBOARD VIEW ---
  return (
    <div style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h1>Admin Dashboard</h1>
        <button
          onClick={() => dispatch(logout())}
          style={{
            padding: "10px 20px",
            background: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{ padding: "20px", background: "#f3f4f6", borderRadius: "8px" }}
      >
        <h3>Welcome back, {user?.email || "Admin"}!</h3>
        <p>Manage your inquiries, catalog, and settings here.</p>
        {/* We will build the tables here next */}
      </div>
    </div>
  );
};

export default AdminPage;
