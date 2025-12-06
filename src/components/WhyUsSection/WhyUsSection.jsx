import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Users, FileBadge } from "lucide-react";
import styles from "./WhyUsSection.module.css";

const featuresLeft = [
  {
    id: 1,
    title: "Genuine Parts",
    description:
      "We use original spare parts to ensure long-lasting performance with 90 days warranty.",
    icon: <Award size={28} />,
  },
  {
    id: 2,
    title: "Doorstep Service",
    description:
      "Get professional repairs at your home or office with no hidden charges.",
    icon: <ShieldCheck size={28} />,
  },
];

const featuresRight = [
  {
    id: 3,
    title: "Expert Technicians",
    description:
      "Trained professionals ensuring device care and complete data safety.",
    icon: <Users size={28} />,
  },
  {
    id: 4,
    title: "Certified Warranty",
    description:
      "Every repair comes with a certificate-backed warranty for peace of mind.",
    icon: <FileBadge size={28} />,
  },
];

// --- Animation Variants ---
const cardLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring" } },
};

const cardRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, type: "spring" } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const WhyUsSection = () => {
  return (
    <section className={styles.section}>
      {/* Decorative Background Blobs */}
      <div className={styles.bgBlob1}></div>
      <div className={styles.bgBlob2}></div>

      <div className={styles.container}>
        {/* --- Header --- */}
        <div className={styles.header}>
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            WHY US
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            We are committed to delivering excellence with every repair,
            ensuring your peace of mind.
          </motion.p>
        </div>

        {/* --- Main Content Grid --- */}
        <div className={styles.contentGrid}>
          {/* Left Column Cards */}
          <div className={styles.columnSide}>
            {featuresLeft.map((feature) => (
              <motion.div
                key={feature.id}
                className={styles.card}
                variants={cardLeftVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className={styles.iconBox}>{feature.icon}</div>
                <div className={styles.cardText}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Image */}
          <motion.div
            className={styles.imageContainer}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Replace with your own image if needed */}
            <img
              src="https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg"
              alt="Technician Working"
              className={styles.centerImage}
            />
            {/* Overlay Gradient for premium look */}
            <div className={styles.imageOverlay}></div>
          </motion.div>

          {/* Right Column Cards */}
          <div className={styles.columnSide}>
            {featuresRight.map((feature) => (
              <motion.div
                key={feature.id}
                className={styles.card}
                variants={cardRightVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className={styles.iconBox}>{feature.icon}</div>
                <div className={styles.cardText}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
