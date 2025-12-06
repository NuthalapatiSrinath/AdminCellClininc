import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./PrivacyPolicyPage.module.css";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Privacy Policy</h1>
          <p className={styles.breadcrumbs}>Home &gt; Privacy Policy</p>
        </div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.section className={styles.section} variants={itemVariants}>
            <p>
              <strong>Cell Clinic Hyderabad</strong>, a company having its
              registered office at Hyderabad, Telangana, India (“we”, “our” or
              “us”) take the security of your personal data very seriously and
              are committed to protecting and respecting the privacy of the
              users (“you” or “your”) of our Cell Clinic Hyderabad Website and
              App (the “Platform”).
            </p>
            <p>
              We may handle your personal data in connection with your use of
              the Platform. This privacy notice (together with our Terms and
              Conditions) set out, for the Platform, our collection and sharing
              practices, the uses to which personal data is put, the ways in
              which we protect it in accordance with the data protection laws
              and your privacy rights. Please read it carefully.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={itemVariants}>
            <h3>
              This Statement applies to Personal Data processed by Cell Clinic
              Hyderabad when you:
            </h3>
            <ul>
              <li>
                Visit this website and/or any other Cell Clinic Hyderabad
                website(s) which reference or link to this Statement
                (collectively, “Website”).
              </li>
              <li>
                Use, download, access, as applicable, any of our various
                internet-based offerings, including mobile platforms, software,
                or applications (collectively, “Services”).
              </li>
              <li>Visit Cell Clinic Hyderabad’s branded social media sites.</li>
              <li>
                Receive communications from us, including emails, phone calls,
                or other electronic messages; or Data we collect.
              </li>
            </ul>
          </motion.section>

          <motion.section className={styles.section} variants={itemVariants}>
            <h3>We collect some information directly from you</h3>
            <p>
              (for example, via forms you complete or products or Services you
              access, download, or otherwise obtain). Such information is
              generally limited to:
            </p>
            <ul>
              <li>Name, Contact details, Email ID, IMEI, Device Details</li>
              <li>Your communications with Cell Clinic Hyderabad personnel.</li>
              <li>Content you post on our social media sites.</li>
              <li>
                Information you provide on the Website, such as online
                questionnaires, or feedback forms.
              </li>
              <li>
                Information you provide when you subscribe to sms services.
              </li>
              <li>
                Information you provide when you create your account, log-in
                credentials and information about your use of and preferences
                for the Services.
              </li>
            </ul>
          </motion.section>

          <motion.section className={styles.section} variants={itemVariants}>
            <h3>Use of Personal Data</h3>
            <p>
              Cell Clinic Hyderabad uses your Personal Data when: it is
              necessary to perform our obligations or exercise our contractual
              rights; we have a legitimate business interest to process such
              Personal Data; it is necessary to comply with applicable laws or
              regulations; we have your consent (where required under applicable
              law) to use your information.
            </p>
            <h4>Common usage instances:</h4>
            <ul>
              <li>
                <strong>Administer website and services:</strong> To manage and
                promote our business, operate and administer the website, and
                provide requested content.
              </li>
              <li>
                <strong>User registration:</strong> To register and administer
                your account, provide technical support, verify identity, and
                send important account information.
              </li>
              <li>
                <strong>Support requests:</strong> To fulfill your requests and
                communicate with you regarding products and services.
              </li>
              <li>
                <strong>Compliance and Security:</strong> To review compliance,
                track usage, and ensure the safety and security of the website
                and services.
              </li>
              <li>
                <strong>Marketing:</strong> To promote our website and services,
                grow our company, and advertise our offerings (with your consent
                where applicable).
              </li>
              <li>
                <strong>Payments:</strong> To verify financial information and
                collect/process payments needed to complete a transaction.
              </li>
            </ul>
          </motion.section>

          <motion.section className={styles.section} variants={itemVariants}>
            <h3>Disclosure of your Information</h3>
            <p>Cell Clinic Hyderabad may share Personal Data as follows:</p>
            <ul>
              <li>
                <strong>Contracted Service Providers:</strong> Entities
                providing hosting, payment processing, analytics, marketing,
                etc., strictly to fulfill services for Cell Clinic Hyderabad.
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law,
                courts, or regulatory agencies.
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets, where data may be transferred to
                acquiring entities.
              </li>
            </ul>
          </motion.section>

          <motion.section className={styles.section} variants={itemVariants}>
            <h3>Security of personal information</h3>
            <p>
              All information you provide to us is stored on our or our
              subcontractors’ secure servers and accessed and used subject to
              our security policies and standards. We restrict access to your
              personal data to those employees, affiliates, and third-party
              service providers who reasonably need it. We have implemented
              commercially reasonable safeguards to comply with security
              requirements. However, no security system is impenetrable, and we
              cannot guarantee complete security of data transmitted over the
              Internet.
            </p>
          </motion.section>

          <motion.section className={styles.section} variants={itemVariants}>
            <h3>How to complain or Contact Us</h3>
            <p>
              If you have any questions regarding this Statement or your
              information, or if you are dissatisfied with how we have utilized
              your personal data, please contact us at:
            </p>
            <p className={styles.contactInfo}>
              <strong>Email:</strong> info@cellclinichyderabad.com <br />
              <strong>Phone:</strong> +91 93465 32339 <br />
              <strong>Address:</strong> Hyderabad, Telangana, India
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
