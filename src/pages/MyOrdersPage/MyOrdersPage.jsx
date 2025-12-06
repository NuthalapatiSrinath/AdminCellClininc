import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle,
  MapPin,
  Smartphone,
  Wrench,
  Truck,
} from "lucide-react";
import styles from "./MyOrdersPage.module.css";

// Dummy Order Data
const orders = [
  {
    id: "CCH-89023",
    device: "Apple iPhone 16 Pro Max",
    service: "Screen Replacement",
    date: "Today, 10 Dec",
    status: "In Progress", // Pending, In Progress, Completed
    amount: "₹38,500",
    type: "Doorstep",
    steps: [
      { label: "Order Placed", completed: true, icon: <Package size={16} /> },
      {
        label: "Technician Assigned",
        completed: true,
        icon: <Wrench size={16} />,
      },
      {
        label: "On the Way",
        completed: true,
        current: true,
        icon: <Truck size={16} />,
      },
      {
        label: "Repair Started",
        completed: false,
        icon: <Smartphone size={16} />,
      },
      { label: "Completed", completed: false, icon: <CheckCircle size={16} /> },
    ],
  },
  {
    id: "CCH-12044",
    device: "Samsung Galaxy S23 Ultra",
    service: "Battery Replacement",
    date: "01 Dec 2023",
    status: "Completed",
    amount: "₹7,990",
    type: "Pickup",
    steps: [
      { label: "Order Placed", completed: true },
      { label: "Pickup Done", completed: true },
      { label: "Repaired", completed: true },
      { label: "Delivered", completed: true },
    ],
  },
];

const MyOrdersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>My Orders</h1>

        <div className={styles.ordersList}>
          {orders.map((order) => (
            <motion.div
              key={order.id}
              className={styles.orderCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.deviceTitle}>{order.device}</h3>
                  <p className={styles.serviceName}>{order.service}</p>
                </div>
                <span
                  className={`${styles.statusBadge} ${
                    styles[order.status.replace(/\s/g, "")]
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Info Row */}
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <Clock size={14} /> <span>{order.date}</span>
                </div>
                <div className={styles.infoItem}>
                  <MapPin size={14} /> <span>{order.type}</span>
                </div>
                <div className={styles.amount}>{order.amount}</div>
              </div>

              <hr className={styles.divider} />

              {/* Live Tracker Stepper */}
              <div className={styles.stepperContainer}>
                {order.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`${styles.step} ${
                      step.completed ? styles.completed : ""
                    } ${step.current ? styles.current : ""}`}
                  >
                    <div className={styles.stepIcon}>
                      {step.completed ? (
                        <CheckCircle size={14} />
                      ) : (
                        step.icon || <div className={styles.dot} />
                      )}
                    </div>
                    <span className={styles.stepLabel}>{step.label}</span>
                    {idx !== order.steps.length - 1 && (
                      <div className={styles.stepLine}></div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
