import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import styles from "./MobileRepairPage.module.css";
import BestInClassSection from "../../components/BestInClassSection/BestInClassSection";
import { catalogService } from "../../services/catalogService";

// --- Configuration: Brand Styles & Colors ---
const BRAND_STYLES = {
  apple: { color: "#000000", style: "apple" },
  xiaomi: { label: "mi", color: "#FF6900", style: "xiaomi" },
  samsung: { color: "#1428A0", style: "sans" },
  vivo: { color: "#415FFF", style: "lowercase" },
  oneplus: { color: "#F00024", style: "oneplus" },
  oppo: { color: "#04823F", style: "lowercase-bold" },
  google: { color: "#4285F4", style: "google" },
  realme: { color: "#FFC915", style: "bold" },
  motorola: { color: "#5c5c5c", style: "moto" },
  iqoo: { color: "#FBC02D", style: "bold" },
  poco: { color: "#FFD400", style: "bold" },
  tecno: { color: "#0033A0", style: "sans" },
  nothing: { color: "#000000", style: "dotted" },
  nokia: { color: "#124191", style: "bold" },
  honor: { color: "#00E0FF", style: "gradient" },
};

// --- Special Cases ---
const SPECIAL_IMAGES = {
  ipad: { img: "/images/services/ipad.webp", style: "image" },
  iwatch: { img: "/images/services/smartwatch.webp", style: "image" },
  macbook: { img: "/images/services/macbook.webp", style: "image" },
};

// --- EXCLUDED BRANDS ---
const EXCLUDED_BRANDS = [
  "ipad",
  "iwatch",
  "smartwatch",
  "macbook",
  "laptop",
  "tablet",
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

const MobileRepairPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchBrands = async () => {
      try {
        const response = await catalogService.getBrands();
        if (response && response.data) {
          const processedBrands = response.data
            .filter((apiBrand) => {
              const key = apiBrand.name.toLowerCase().replace(/\s/g, "");
              return !EXCLUDED_BRANDS.includes(key);
            })
            .map((apiBrand) => {
              const key = apiBrand.name.toLowerCase().replace(/\s/g, "");

              // 1. Check Special Images (Static)
              if (SPECIAL_IMAGES[key]) {
                return {
                  id: apiBrand._id,
                  name: apiBrand.name,
                  ...SPECIAL_IMAGES[key],
                };
              }

              const config =
                BRAND_STYLES[key] || BRAND_STYLES[apiBrand.name.toLowerCase()];

              // 2. CHECK IMAGE SOURCE
              // Fix: Allow 'http' (Excel links) OR 'data:' (Manual Uploads)
              const hasValidImage =
                apiBrand.image &&
                (apiBrand.image.startsWith("http") ||
                  apiBrand.image.startsWith("data:"));

              return {
                id: apiBrand._id,
                name: apiBrand.name,
                // Use the API image if valid, otherwise null (triggers text fallback)
                img: hasValidImage ? apiBrand.image : null,
                style: hasValidImage ? "image" : config?.style || "sans",
                color: config?.color || "#124191",
                label: config?.label || apiBrand.name,
              };
            });

          setBrands(processedBrands);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>Repair Your Mobile Phone</h1>
            <p className={styles.breadcrumbs}>Home &gt; Repair &gt;</p>
          </div>

          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Select Model"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <h3 className={styles.sectionTitle}>Select Brand</h3>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", width: "100%" }}>
            <Loader2
              className={styles.spin}
              size={32}
              style={{ animation: "spin 1s linear infinite" }}
            />
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredBrands.map((brand) => (
              <Link
                to={`/repair-brand/${brand.name.toLowerCase()}`}
                key={brand.id}
                className={styles.cardLink}
              >
                <motion.div
                  className={styles.card}
                  layout
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ y: -5, borderColor: "var(--Primary_Color)" }}
                >
                  <div className={styles.logoArea}>
                    {/* Logic: If style is 'image', show img tag. Else show Text/CSS logo */}
                    {brand.style === "image" && brand.img ? (
                      <img
                        src={brand.img}
                        alt={brand.name}
                        className={styles.brandImage}
                        style={{
                          maxWidth: "60px",
                          maxHeight: "60px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
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
                        {brand.style === "google" && (
                          <span className={styles.googleG}>G</span>
                        )}

                        {!["moto", "oneplus", "google"].includes(brand.style) &&
                          (brand.label ? brand.label : brand.name)}
                      </div>
                    )}
                  </div>
                  <p className={styles.brandName}>{brand.name}</p>
                </motion.div>
              </Link>
            ))}

            {filteredBrands.length === 0 && (
              <p
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  color: "#666",
                }}
              >
                No brands found matching "{searchTerm}"
              </p>
            )}
          </div>
        )}

        <div className={styles.whyUsWrapper}>
          <BestInClassSection />
        </div>
      </div>
    </div>
  );
};

export default MobileRepairPage;
