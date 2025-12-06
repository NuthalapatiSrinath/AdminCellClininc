import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DoorstepRepairSection from "../../components/DoorstepRepairSection/DoorstepRepairSection"; // Imported
import BrandsSection from "../../components/BrandsSection/BrandsSection";
import ServicesAvailable from "../../components/ServicesAvailable/ServicesAvailable";
import styles from "./ServicesPage.module.css";

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      {/* --- Hero Header --- */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Our Services</h1>
          <p className={styles.breadcrumbs}>
            <Link to="/">Home</Link> &gt; Services
          </p>
        </div>
      </div>

      {/* --- Main Content Stack --- */}
      <div className={styles.sectionsStack}>
        {/* 1. Doorstep Repair Categories (Replaces old Device Grid) */}
        <div className={styles.sectionBlock}>
          <DoorstepRepairSection />
        </div>

        {/* 2. Brands Section */}
        <div className={styles.sectionBlock}>
          <BrandsSection />
        </div>

        {/* 3. Services Available (Mic, Screen, etc.) */}
        <div className={styles.sectionBlock}>
          <ServicesAvailable />
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
