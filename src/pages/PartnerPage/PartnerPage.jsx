import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Store, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./PartnerPage.module.css";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const PartnerPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Partner With Us</h1>
          <p className={styles.breadcrumbs}>Home &gt; Partner With Us</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* --- Hero Section --- */}
        <div className={styles.heroSection}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.heroHeading}>
              Want to partner with us? <br />
              Join the best mobile repair service brand online
            </h2>
            <Link to="/contact" className={styles.ctaBtn}>
              GET IN TOUCH
            </Link>
          </motion.div>

          <motion.div
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Use the illustration from your screenshot here */}
            <img
              src="https://img.freepik.com/free-vector/business-deal-concept-illustration_114360-1331.jpg" // Placeholder illustration
              alt="Partner With Us"
              className={styles.heroImage}
            />
          </motion.div>
        </div>

        {/* --- Who Can Join Section --- */}
        <div className={styles.joinSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>WHO CAN JOIN?</h2>
            <div className={styles.redLine}></div>
          </div>

          <motion.div
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Card 1: Technicians */}
            <motion.div className={styles.card} variants={itemVariants}>
              <div className={styles.iconWrapper}>
                <Wrench size={40} strokeWidth={1.5} />
              </div>
              <div className={styles.cardHeader}>
                <div className={styles.numberCircle}>1</div>
                <h3>Technicians:</h3>
              </div>
              <p className={styles.cardText}>
                If you're a qualified technician with experience repairing
                smartphones, Cell Clinic Hyderabad is the perfect environment
                for you to work. Working with us ensures that you will be
                working with the latest equipment and with the best parts
                available in the market. You will be able to develop your skills
                and stay up to date with the latest trends in the industry.
                Plus, you will have the satisfaction of knowing you are helping
                people get their devices repaired quickly and reliably.
              </p>
            </motion.div>

            {/* Card 2: Franchise */}
            <motion.div className={styles.card} variants={itemVariants}>
              <div className={styles.iconWrapper}>
                <Store size={40} strokeWidth={1.5} />
              </div>
              <div className={styles.cardHeader}>
                <div className={styles.numberCircle}>2</div>
                <h3>Franchise</h3>
              </div>
              <p className={styles.cardText}>
                If you're a local mobile repair shop, and want to make your
                local associated with a brand, then tag along! You will be a
                part of a larger network and gain access to resources and
                support that will help you grow your business. You will also
                benefit from a larger customer base and increased visibility in
                the community. With the support of a larger brand, you can
                create a successful local mobile repair shop.
              </p>
            </motion.div>

            {/* Card 3: Enterprise */}
            <motion.div className={styles.card} variants={itemVariants}>
              <div className={styles.iconWrapper}>
                <Building2 size={40} strokeWidth={1.5} />
              </div>
              <div className={styles.cardHeader}>
                <div className={styles.numberCircle}>3</div>
                <h3>Enterprise</h3>
              </div>
              <p className={styles.cardText}>
                Are you a business with a lot of repair requirements but a
                limited budget? We'll provide excellent mobile repair service
                while saving you money. Our mobile repair shop is well-equipped
                to handle all kinds of repair needs. We guarantee quality
                service at a fraction of the cost of other repair shops. Contact
                us today to get started.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
