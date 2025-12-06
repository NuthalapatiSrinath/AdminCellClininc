import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./WarrantyPage.module.css";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const WarrantyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Warranty Policy</h1>
          <p className={styles.breadcrumbs}>Home &gt; Warranty Policy</p>
        </div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section className={styles.section} variants={sectionVariants}>
            <h3>
              Cell Clinic Hyderabad offers you a 90 days warranty on mobile
              screen repaired/replaced by us from the date of invoice.
            </h3>
            <p>
              We guarantee that Cell Clinic Hyderabad is efficient in the
              products and services it offers on its website to users and/or
              customers. In the event of a breach of this warranty, our experts
              will resolve the customer's problems or queries. In any case, Cell
              Clinic Hyderabad is not liable and has no recourse for
              refund-related issues. Failures of our products or services, if
              any, will be investigated and resolved in accordance with the
              terms and solutions available in the circumstances.
            </p>
            <p>
              We guarantee that we retract any and all warranties mentioned,
              including all warranties of performance for a particular purpose
              and non-infringement warranties. Cell Clinic Hyderabad website's
              services will meet your needs and will always be accessible,
              uninterrupted, effective, secure, and error-free.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h4>Service & Visit Charges</h4>
            <p>
              Minimum Service / Visit Charges of RS 499/- Has Be Paid in case Of
              Deny of Repair or Job Will Not Completed or Estimate Cost Will Not
              Approved.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h4>Replace Faulty Parts</h4>
            <p>
              Replace Faulty Parts Must Be Submitted To Our Technician After
              Repair Services Of Your Devices Otherwise Warranty Will Not
              Covered.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h4>Warranty Covered On Screen Replacement?</h4>
            <ul>
              <li>Touch Automatically Working</li>
              <li>Touch Not Working</li>
            </ul>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h4>
              Cell Clinic Hyderabad warranty will not be applicable in the
              following conditions:
            </h4>
            <ul className={styles.list}>
              <li>
                Blank Screen, any type’s lines, any type’s spots, colour
                spreading & Reflector Screen issues Not Cover in Warranty.
              </li>
              <li>
                We do not cover any type of accidental damage, and our warranty
                is invalid in all such circumstances.
              </li>
              <li>
                Any display problems that occur without the need for user
                intervention and are connected to screen quality, notably
                visible lines and blank screens.
              </li>
              <li>
                Excessive or serious damage to the device or screen, where there
                is a likelihood that internal components have been harmed.
              </li>
              <li>
                Mishandling that causes the frame to bend, twist, or break.
              </li>
              <li>Water caused damage to the device.</li>
              <li>Internal hardware tampering or altering.</li>
              <li>Damage caused by attempted client self-repairs.</li>
              <li>Unrelated to the repair, issues with software.</li>
              <li>Devices that have been jailbroken.</li>
              <li>
                Any data loss that occurs as a consequence of the repair. (We
                urge customers to pull up a backup of their data before the
                repair service).
              </li>
            </ul>
          </motion.section>

          <motion.section className={styles.section} variants={sectionVariants}>
            <h4>How can I claim my warranty?</h4>
            <p>
              To avail warranty, the customer needs to send a short video and
              photos of the phone along with the problem facing by the customer
              & invoice on the company email id for{" "}
              <strong>complaint@cellclinichyderabad.com</strong>. After
              providing the necessary details, you’ll receive the warranty if
              all the prerequisites are fulfilled.
            </p>
            <p>
              Our team generally resolves an issue within 24 hours to 72 hours
              from the moment you send us a query.
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default WarrantyPage;
