import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { catalogService } from "../../services/catalogService";
import { getImageUrl } from "../../utils/imageHelper"; // Import Helper
import styles from "./RepairPage.module.css";
import {
  Search,
  // Smartphone,
  // Battery,
  // Zap,
  // Camera,
  // Disc,
  // Headphones,
  // Settings,
} from "lucide-react";

const RepairPage = () => {
  const { brandName } = useParams();

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandId, setBrandId] = useState(null);
  const [displayName, setDisplayName] = useState(brandName);

  // 1. Find Brand ID
  useEffect(() => {
    const findBrandId = async () => {
      try {
        const response = await catalogService.getBrands();
        if (response && response.data) {
          const brand = response.data.find(
            (b) => b.name.toLowerCase() === brandName?.toLowerCase()
          );
          if (brand) {
            setBrandId(brand._id);
            setDisplayName(brand.name);
          }
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    if (brandName) findBrandId();
  }, [brandName]);

  // 2. Fetch Devices
  useEffect(() => {
    const fetchDevices = async () => {
      if (!brandId) return;
      setLoading(true);
      try {
        const response = await catalogService.getDevices(brandId);
        console.log("🟢 [RepairPage] Devices:", response.data);
        if (response && response.data) {
          setModels(response.data);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, [brandId]);

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>{displayName} Repair Service</h1>
          <p className={styles.breadcrumbs}>
            <Link to="/">Home</Link> &gt; Repair &gt; {displayName}
          </p>
        </div>

        <div className={styles.modelSection}>
          <div className={styles.modelHeader}>
            <h3>Select Your Model</h3>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search Model"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.modelGrid}>
            {loading ? (
              <p>Loading models...</p>
            ) : filteredModels.length > 0 ? (
              filteredModels.map((model, idx) => (
                <NavLink
                  key={model._id}
                  to={`/repair/model/${model._id}`}
                  state={{ model: model }} // Pass full object including image
                  className={styles.modelLink}
                >
                  <motion.div
                    className={styles.modelCard}
                    whileHover={{ y: -5, borderColor: "var(--Primary_Color)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <img
                      // FIX: Use imageHelper and check 'image' property
                      src={getImageUrl(model.image)}
                      alt={model.name}
                      className={styles.modelImg}
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/150?text=No+Image")
                      }
                    />
                    <p>{model.name}</p>
                  </motion.div>
                </NavLink>
              ))
            ) : (
              <p className={styles.noModels}>No models found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairPage;
