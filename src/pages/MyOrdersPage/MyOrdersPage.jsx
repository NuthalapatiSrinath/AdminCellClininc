import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle,
  MapPin,
  Wrench,
  AlertCircle,
  Loader2,
  User,
  Phone,
  Hash,
  Calendar,
} from "lucide-react";
import styles from "./MyOrdersPage.module.css";
import { inquiryService } from "../../services/inquiryService";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await inquiryService.getAllInquiries();
      if (response.success) {
        setOrders(response.data);
      } else {
        setError("Failed to load orders");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper: Format Date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper: Generate Steps based on Status
  const getSteps = (status) => {
    const baseSteps = [
      { label: "Received", icon: <Package size={16} /> },
      { label: "Processing", icon: <Wrench size={16} /> },
      { label: "Resolved", icon: <CheckCircle size={16} /> },
    ];

    if (status === "Pending") {
      return baseSteps.map((s, i) => ({
        ...s,
        completed: false,
        current: i === 0,
      }));
    } else if (status === "Contacted") {
      return baseSteps.map((s, i) => ({
        ...s,
        completed: i === 0,
        current: i === 1,
      }));
    } else if (status === "Resolved") {
      return baseSteps.map((s) => ({ ...s, completed: true }));
    } else if (status === "Cancelled") {
      return [
        { label: "Received", completed: true, icon: <Package size={16} /> },
        {
          label: "Cancelled",
          completed: false,
          current: true,
          icon: <AlertCircle size={16} />,
          isError: true,
        },
      ];
    }
    return baseSteps;
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>All Bookings (Admin View)</h1>

        {loading ? (
          <div className={styles.loadingState}>
            <Loader2 className={styles.spin} size={40} />
            <p>Loading bookings...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <AlertCircle size={40} />
            <p>{error}</p>
            <button onClick={fetchOrders} className={styles.retryBtn}>
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className={styles.emptyState}>
            <Package size={48} />
            <p>No bookings found yet.</p>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {orders.map((order) => {
              const steps = getSteps(order.status);

              return (
                <motion.div
                  key={order._id}
                  className={styles.orderCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* --- TOP ROW: ID & Date --- */}
                  <div className={styles.topMeta}>
                    <div className={styles.metaItem}>
                      <Hash size={12} />
                      <span>ID: {order._id}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <Calendar size={12} />
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>

                  {/* --- HEADER: Device & Status --- */}
                  <div className={styles.cardHeader}>
                    <h3 className={styles.deviceTitle}>{order.deviceModel}</h3>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[order.status] || styles.Pending
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <hr className={styles.divider} />

                  {/* --- CUSTOMER INFO --- */}
                  <div className={styles.sectionTitle}>Customer Details</div>
                  <div className={styles.customerGrid}>
                    <div className={styles.infoItem}>
                      <User size={14} />
                      <span>{order.name}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <Phone size={14} />
                      <a href={`tel:${order.mobileNumber}`}>
                        {order.mobileNumber}
                      </a>
                    </div>
                  </div>

                  <hr className={styles.divider} />

                  {/* --- SERVICES LIST (DETAILED) --- */}
                  <div className={styles.sectionTitle}>Selected Services</div>
                  <div className={styles.servicesList}>
                    {order.selectedServices?.map((srv, index) => (
                      <div key={srv._id || index} className={styles.serviceRow}>
                        <span className={styles.srvName}>{srv.name}</span>
                        <span className={styles.srvPrice}>₹{srv.price}</span>
                      </div>
                    ))}

                    {/* TOTAL ROW */}
                    <div className={styles.totalRow}>
                      <span>Total Estimate</span>
                      <span className={styles.totalAmount}>
                        ₹{order.totalEstimatedPrice}
                      </span>
                    </div>
                  </div>

                  <hr className={styles.divider} />

                  {/* --- STEPPER --- */}
                  <div className={styles.stepperContainer}>
                    {steps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`${styles.step} ${
                          step.completed ? styles.completed : ""
                        } ${step.current ? styles.current : ""} ${
                          step.isError ? styles.errorStep : ""
                        }`}
                      >
                        <div className={styles.stepIcon}>
                          {step.completed ? (
                            <CheckCircle size={14} />
                          ) : (
                            step.icon
                          )}
                        </div>
                        <span className={styles.stepLabel}>{step.label}</span>
                        {idx !== steps.length - 1 && (
                          <div className={styles.stepLine}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
