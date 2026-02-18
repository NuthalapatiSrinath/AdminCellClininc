import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./BrandsSection.module.css";
import { catalogService } from "../../services/catalogService";

// --- UI Config (Maps DB names to your specific colors/styles) ---
const BRAND_STYLES = {
  apple: { color: "#000000", style: "apple" },
  xiaomi: { label: "mi", color: "#FF6900", style: "xiaomi" },
  samsung: { color: "#1428A0", style: "sans", nameDisplay: "SAMSUNG" },
  vivo: { color: "#415FFF", style: "lowercase" },
  oneplus: { color: "#F00024", style: "oneplus", nameDisplay: "ONEPLUS" },
  oppo: { color: "#04823F", style: "lowercase-bold" },
  motorola: { color: "#5c5c5c", style: "moto" },
  iqoo: { color: "#FBC02D", style: "bold" },
  poco: { color: "#FFD400", style: "bold" },
  tecno: { color: "#0033A0", style: "sans", nameDisplay: "TECNO" },
  nothing: { color: "#000000", style: "dotted", nameDisplay: "NOTHING" },
  nokia: { color: "#124191", style: "bold", nameDisplay: "NOKIA" },
  honor: { color: "#00E0FF", style: "gradient" },
};

// --- SAFE PALETTE for New/Unknown Brands ---
const SAFE_COLORS = [
  "#2563EB",
  "#DC2626",
  "#16A34A",
  "#9333EA",
  "#EA580C",
  "#0891B2",
  "#DB2777",
  "#4F46E5",
  "#059669",
  "#7C3AED",
];

const getConsistentColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % SAFE_COLORS.length);
  return SAFE_COLORS[index];
};

const fallbackBrands = [
  { id: 1, name: "Apple", color: "#000000", style: "apple" },
  { id: 2, name: "xiaomi", label: "mi", color: "#FF6900", style: "xiaomi" },
  { id: 3, name: "SAMSUNG", color: "#1428A0", style: "sans" },
  { id: 4, name: "vivo", color: "#415FFF", style: "lowercase" },
  { id: 5, name: "ONEPLUS", color: "#F00024", style: "oneplus" },
  { id: 6, name: "oppo", color: "#04823F", style: "lowercase-bold" },
  { id: 7, name: "motorola", color: "#5c5c5c", style: "moto" },
  { id: 8, name: "iQOO", color: "#FBC02D", style: "bold" },
  { id: 9, name: "POCO", color: "#FFD400", style: "bold" },
  { id: 10, name: "TECNO", color: "#0033A0", style: "sans" },
  { id: 11, name: "NOTHING", color: "#000000", style: "dotted" },
  { id: 12, name: "NOKIA", color: "#124191", style: "bold" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

const BrandsSection = () => {
  const [brandsList, setBrandsList] = useState(fallbackBrands);
  const location = useLocation();

  const fetchBrands = useCallback(async () => {
    try {
      const response = await catalogService.getBrands();

      if (response && response.data && response.data.length > 0) {
        const mobileBrands = response.data.filter(
          (b) =>
            !["ipad", "macbook", "smartwatch"].includes(
              (b.name || "").toLowerCase()
            )
        );

        if (mobileBrands.length > 0) {
          const integratedBrands = mobileBrands.map((b) => {
            const brandKey = (b.name || "").toLowerCase();
            const predefinedConfig = BRAND_STYLES[brandKey];

            const finalConfig = predefinedConfig || {
              color: getConsistentColor(brandKey),
              style: "sans",
              nameDisplay: b.name
                ? b.name.toUpperCase()
                : brandKey.toUpperCase(),
            };

            return {
              id: b._id,
              name: finalConfig.nameDisplay || b.name,
              label: finalConfig.label,
              color: finalConfig.color,
              style: finalConfig.style,
              dbName: b.name,
            };
          });

          setBrandsList(integratedBrands);
          return;
        }
      }

      // fallback if nothing useful
      setBrandsList(fallbackBrands);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setBrandsList(fallbackBrands);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) fetchBrands();

    // ensure back/forward navigation triggers a re-fetch
    const onPop = () => {
      fetchBrands();
    };
    window.addEventListener("popstate", onPop);

    return () => {
      mounted = false;
      window.removeEventListener("popstate", onPop);
    };
  }, [fetchBrands, location.key]);

  return (
    <section className={styles.section} id="brands-section">
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Brands
        </motion.h2>

        {/* always show items when mounted (no whileInView) */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="visible"
          animate="visible"
        >
          {brandsList.map((brand) => (
            <NavLink
              key={brand.id}
              to={`/repair-brand/${(brand.dbName || brand.name).toLowerCase()}`}
              className={styles.cardLink}
            >
              <motion.div
                className={styles.card}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  transition: { duration: 0.18 },
                }}
              >
                <div
                  className={`${styles.brandText} ${styles[brand.style]}`}
                  style={{ color: brand.color }}
                >
                  {brand.style === "moto" && (
                    <span className={styles.motoM}>M</span>
                  )}
                  {brand.style === "oneplus" && (
                    <span className={styles.onePlusBox}>1+</span>
                  )}
                  {brand.label ? brand.label : brand.name}
                </div>
              </motion.div>
            </NavLink>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsSection;
