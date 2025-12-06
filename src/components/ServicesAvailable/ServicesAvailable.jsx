import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import { motion } from "framer-motion";
import {
  Mic,
  PhoneIncoming,
  Zap,
  Volume2,
  Smartphone,
  Monitor,
  Battery,
  DollarSign,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import styles from "./ServicesAvailable.module.css";

// 1. Top Row Services Data
const servicesList = [
  { id: 1, label: "Mic", icon: <Mic size={28} /> },
  { id: 2, label: "Receiver", icon: <PhoneIncoming size={28} /> },
  { id: 3, label: "Charging", icon: <Zap size={28} /> },
  { id: 4, label: "Speaker", icon: <Volume2 size={28} /> },
  { id: 5, label: "Back Glass", icon: <Smartphone size={28} /> },
  { id: 6, label: "Screen", icon: <Monitor size={28} /> },
  { id: 7, label: "Battery", icon: <Battery size={28} /> },
];

// 2. Bottom Row Benefits Data
const benefitsList = [
  {
    id: 1,
    title: "Value for Money",
    desc: "Doorstep mobile repair by certified experts - genuine parts, transparent pricing, and premium service.",
    icon: <DollarSign size={24} />,
  },
  {
    id: 2,
    title: "12x7 Support",
    desc: "Get 12x7 support from Cell Clinic - call us or WhatsApp us anytime for quick and professional assistance.",
    icon: <Headphones size={24} />,
  },
  {
    id: 3,
    title: "90 Days Warranty",
    desc: "Cell Clinic offers a 90-day warranty on mobile repairs, covering both parts and service, for your peace of mind.",
    icon: <ShieldCheck size={24} />,
  },
];

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const ServicesAvailable = () => {
  const [activeId, setActiveId] = useState(3);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* --- Header --- */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>Services Available</h2>
          <p className={styles.subtitle}>
            Whatever the issue, we've got the solution. Expert repairs for all
            MacBook problems.
          </p>
        </motion.div>

        {/* --- Services Grid (Top Row) --- */}
        <motion.div
          className={styles.servicesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {servicesList.map((service) => (
            /* Wrap in Link to navigate */
            <Link
              key={service.id}
              to="/repair/mobile"
              className={styles.serviceLink}
              style={{ textDecoration: "none" }} // Ensure no underline
            >
              <motion.div
                variants={itemVariants}
                className={`${styles.serviceCard} ${
                  activeId === service.id ? styles.active : ""
                }`}
                onClick={() => setActiveId(service.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.serviceIcon}>{service.icon}</div>
                <span className={styles.serviceLabel}>{service.label}</span>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* --- Benefits Grid (Bottom Row) --- */}
        <motion.div
          className={styles.benefitsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {benefitsList.map((benefit) => (
            <motion.div
              key={benefit.id}
              className={styles.benefitCard}
              variants={itemVariants}
            >
              <div className={styles.benefitIconCircle}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDesc}>{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesAvailable;
