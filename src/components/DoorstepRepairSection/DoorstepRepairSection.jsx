import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { motion } from "framer-motion";
import styles from "./DoorstepRepairSection.module.css";

const repairCategories = [
  {
    id: 1,
    title: "Mobile Repair",
    image: "/images/services/mobile.webp", // Replace with your actual image path
    link: "/repair/mobile",
  },
  {
    id: 2,
    title: "iPad Repair",
    image: "/images/services/ipad.webp",
    link: "/repair-brand/ipad",
  },
  {
    id: 3,
    title: "MacBook Repair",
    image: "/images/services/macbook.webp",
    link: "/repair-brand/macbook",
  },
  {
    id: 4,
    title: "Smartwatch Repair",
    image: "/images/services/smartwatch.webp",
    link: "/repair-brand/smartwatch",
  },
];

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const DoorstepRepairSection = () => {
  const dispatch = useDispatch();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} // Triggers once when visible
        >
          DOORSTEP PHONE REPAIRS
        </motion.h2>

        <motion.p
          className={styles.subHeading}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          The fastest doorstep mobile repair services
        </motion.p>

        {/* --- Cards Grid --- */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // FIX: Removed 'amount: 0.2' to ensure it shows immediately on page load
          viewport={{ once: true }}
        >
          {repairCategories.map((item) => (
            <Link to={item.link} key={item.id} className={styles.cardLink}>
              <motion.div
                className={styles.card}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.cardImage}
                  />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <div className={styles.bottomText}>
          <button
            className={styles.helpLink}
            onClick={() => dispatch(openModal({ type: "FIND_MODEL" }))}
          >
            How to find my model number
          </button>
        </div>
      </div>
    </section>
  );
};

export default DoorstepRepairSection;
