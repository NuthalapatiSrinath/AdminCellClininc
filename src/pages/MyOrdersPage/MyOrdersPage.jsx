import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Calendar,
  AlertCircle,
  Loader2,
  User,
  Phone,
  Hash,
  TrendingUp,
  FilterX,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  CheckCircle, // Added back for stats icons
} from "lucide-react";
import styles from "./MyOrdersPage.module.css";
import { inquiryService } from "../../services/inquiryService";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Stats State
  const [stats, setStats] = useState({ today: 0, week: 0, month: 0 });

  // Filter State: 'ALL', 'TODAY', 'WEEK', 'MONTH'
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Pagination State (New)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await inquiryService.getAllInquiries();
      if (response.success) {
        const data = response.data;
        // Sort by newest first
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedData);
        calculateStats(sortedData);
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

  const calculateStats = (data) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = now.getMonth();

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    data.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      if (orderDate >= today) todayCount++;
      if (orderDate >= oneWeekAgo) weekCount++;
      if (
        orderDate.getMonth() === thisMonth &&
        orderDate.getFullYear() === now.getFullYear()
      ) {
        monthCount++;
      }
    });

    setStats({ today: todayCount, week: weekCount, month: monthCount });
  };

  // --- FILTERING LOGIC ---
  const getFilteredOrders = () => {
    if (activeFilter === "ALL") return orders;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = now.getMonth();

    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      if (activeFilter === "TODAY") return orderDate >= today;
      if (activeFilter === "WEEK") return orderDate >= oneWeekAgo;
      if (activeFilter === "MONTH")
        return (
          orderDate.getMonth() === thisMonth &&
          orderDate.getFullYear() === now.getFullYear()
        );
      return true;
    });
  };

  const filteredOrders = getFilteredOrders();

  // --- PAGINATION LOGIC (Applied on filtered orders) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleFilterClick = (filterType) => {
    if (activeFilter === filterType) {
      setActiveFilter("ALL");
    } else {
      setActiveFilter(filterType);
    }
    setCurrentPage(1); // Reset to page 1 on filter change
  };

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

  // --- ACTIONS HANDLERS ---
  const handleSuccess = (msg) => {
    // You can replace this with a proper toast if you have one
    alert(msg);
    fetchOrders();
  };

  const handleEditOrder = (order) => {
    dispatch(
      openModal({
        type: "EDIT_ORDER",
        modalData: { order, onSuccess: handleSuccess },
      })
    );
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await inquiryService.deleteInquiry(id);
      handleSuccess("Order deleted successfully");
    } catch (err) {
      alert("Failed to delete order");
    }
  };

  const handleDeleteAll = async () => {
    const confirmInput = prompt(
      "Type 'DELETE' to confirm deleting ALL orders. This cannot be undone."
    );
    if (confirmInput === "DELETE") {
      try {
        await inquiryService.deleteAllInquiries();
        handleSuccess("All orders deleted");
      } catch (err) {
        alert("Failed to delete all");
      }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Header with Delete All Button */}
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Admin Dashboard</h1>
          {orders.length > 0 && (
            <button className={styles.deleteAllBtn} onClick={handleDeleteAll}>
              <Trash2 size={16} /> Delete All
            </button>
          )}
        </div>

        {/* --- STATS / FILTER GRID --- */}
        {!loading && !error && (
          <div className={styles.statsGrid}>
            <div
              className={`${styles.statCard} ${
                activeFilter === "TODAY" ? styles.activeCard : ""
              }`}
              onClick={() => handleFilterClick("TODAY")}
            >
              <div className={styles.statIconWrapper}>
                <Calendar size={20} className={styles.iconToday} />
              </div>
              <div>
                <span className={styles.statLabel}>Today</span>
                <h2 className={styles.statValue}>{stats.today}</h2>
              </div>
            </div>

            <div
              className={`${styles.statCard} ${
                activeFilter === "WEEK" ? styles.activeCard : ""
              }`}
              onClick={() => handleFilterClick("WEEK")}
            >
              <div className={styles.statIconWrapper}>
                <TrendingUp size={20} className={styles.iconWeek} />
              </div>
              <div>
                <span className={styles.statLabel}>Last 7 Days</span>
                <h2 className={styles.statValue}>{stats.week}</h2>
              </div>
            </div>

            <div
              className={`${styles.statCard} ${
                activeFilter === "MONTH" ? styles.activeCard : ""
              }`}
              onClick={() => handleFilterClick("MONTH")}
            >
              <div className={styles.statIconWrapper}>
                <Package size={20} className={styles.iconMonth} />
              </div>
              <div>
                <span className={styles.statLabel}>This Month</span>
                <h2 className={styles.statValue}>{stats.month}</h2>
              </div>
            </div>
          </div>
        )}

        <div className={styles.listHeaderGroup}>
          <h3 className={styles.sectionHeading}>
            {activeFilter === "ALL"
              ? "All Bookings"
              : activeFilter === "TODAY"
              ? "Today's Bookings"
              : activeFilter === "WEEK"
              ? "Weekly Bookings"
              : "Monthly Bookings"}
          </h3>
          {activeFilter !== "ALL" && (
            <button
              className={styles.clearFilterBtn}
              onClick={() => setActiveFilter("ALL")}
            >
              <FilterX size={14} /> Clear Filter
            </button>
          )}
        </div>

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
        ) : currentOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <Package size={48} />
            <p>No bookings found for this period.</p>
          </div>
        ) : (
          <>
            <div className={styles.ordersList}>
              <AnimatePresence>
                {currentOrders.map((order) => (
                  <motion.div
                    key={order._id}
                    className={styles.orderCard}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* --- TOP ROW: ID & Date --- */}
                    <div className={styles.topMeta}>
                      <div className={styles.metaItem}>
                        <Hash size={12} />
                        <span>ID: {order._id.slice(-6).toUpperCase()}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Calendar size={12} />
                        <span>{formatDate(order.createdAt)}</span>
                      </div>
                    </div>

                    {/* --- HEADER --- */}
                    <div className={styles.cardHeader}>
                      <h3 className={styles.deviceTitle}>
                        {order.deviceModel}
                      </h3>
                      {/* Status Badge */}
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

                    {/* --- SERVICES LIST --- */}
                    <div className={styles.sectionTitle}>Selected Services</div>
                    <div className={styles.servicesList}>
                      {order.selectedServices?.map((srv, index) => (
                        <div
                          key={srv._id || index}
                          className={styles.serviceRow}
                        >
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

                    {/* --- ACTIONS --- */}
                    <div className={styles.cardActions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEditOrder(order)}
                      >
                        <Edit size={14} /> Edit Order
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* --- PAGINATION CONTROLS --- */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={styles.pageBtn}
                >
                  <ChevronLeft size={18} /> Prev
                </button>
                <span className={styles.pageInfo}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={styles.pageBtn}
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
