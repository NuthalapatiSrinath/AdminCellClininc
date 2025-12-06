import React from "react";
import { Smartphone, Tablet, Timer } from "lucide-react";
import { motion } from "framer-motion"; // Import motion
import styles from "./ServicesSection.module.css";

// Custom Android Icon
const AndroidIcon = ({ size = 24, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.523 15.3414C17.523 15.3414 17.523 15.3414 17.523 15.3414L18.658 13.3764C18.73 13.2514 18.687 13.0914 18.562 13.0194C18.437 12.9474 18.277 12.9904 18.205 13.1154L17.051 15.1134C15.753 14.5214 14.306 14.1944 12.78 14.1944C11.254 14.1944 9.807 14.5214 8.509 15.1134L7.355 13.1154C7.283 12.9904 7.123 12.9474 6.998 13.0194C6.873 13.0914 6.83 13.2514 6.902 13.3764L8.037 15.3414C8.037 15.3414 8.037 15.3414 8.037 15.3414C6.257 16.3114 5.035 18.0644 4.773 20.0834H20.787C20.525 18.0644 19.303 16.3114 17.523 15.3414ZM7.927 18.3034C7.575 18.3034 7.29 18.0184 7.29 17.6664C7.29 17.3144 7.575 17.0294 7.927 17.0294C8.279 17.0294 8.564 17.3144 8.564 17.6664C8.564 18.0184 8.279 18.3034 7.927 18.3034ZM16.353 18.3034C16.001 18.3034 15.716 18.0184 15.716 17.6664C15.716 17.3144 16.001 17.0294 16.353 17.0294C16.705 17.0294 16.99 17.3144 16.99 17.6664C16.99 18.0184 16.705 18.3034 16.353 18.3034Z" />
  </svg>
);

const servicesData = [
  {
    id: 1,
    title: "iPhone",
    description: "Screen replacement, battery, camera & all repairs",
    icon: <Smartphone size={40} strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: "Android",
    description: "All brands - Samsung, OnePlus, Xiaomi & more",
    icon: <AndroidIcon size={40} />,
  },
  {
    id: 3,
    title: "iPad",
    description: "Screen, battery, charging port repairs",
    icon: <Tablet size={40} strokeWidth={1.5} />,
  },
  {
    id: 4,
    title: "Watch",
    description: "Apple Watch & smartwatch repairs",
    icon: <Timer size={40} strokeWidth={1.5} />,
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger effect for children (cards)
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 }, // Start slightly below and transparent
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ServicesSection = () => {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of the section is visible
        variants={containerVariants}
      >
        {/* Header Text */}
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            Our Extreme Solution That We Offers
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { duration: 0.8, delay: 0.2 },
              },
            }}
          >
            Our smart experts serve you any time, anywhere. Book an Appointment
            Now!
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.2 } }} // Extra hover lift
            >
              <div className={styles.iconCircle}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
