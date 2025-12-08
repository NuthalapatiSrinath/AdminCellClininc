import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { catalogService } from "../../services/catalogService";
import styles from "./RepairPage.module.css";
import { Search, Loader2 } from "lucide-react";

// --- Helper to fix image URLs ---
const getImageUrl = (img) => {
  if (!img) return "https://via.placeholder.com/150?text=No+Image";

  // 1. If it's a Base64 string (from manual upload)
  if (img.startsWith("data:")) return img;

  // 2. If it's an external link (http/https)
  if (img.startsWith("http")) return img;

  // 3. If it's a local path (starts with /)
  return img;
};

const RepairPage = () => {
  const { brandName } = useParams();

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandId, setBrandId] = useState(null);
  const [displayName, setDisplayName] = useState(brandName);

  // 1. Find Brand ID based on Name
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

  // 2. Fetch Devices for that Brand
  useEffect(() => {
    const fetchDevices = async () => {
      if (!brandId) return;
      setLoading(true);
      try {
        const response = await catalogService.getDevices(brandId);
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
              <div
                style={{ width: "100%", textAlign: "center", padding: "40px" }}
              >
                <Loader2 className={styles.spin} size={32} />
              </div>
            ) : filteredModels.length > 0 ? (
              filteredModels.map((model, idx) => (
                <NavLink
                  key={model._id}
                  to={`/repair/model/${model._id}`}
                  state={{ model: model }} // Pass data to next page
                  className={styles.modelLink}
                >
                  <motion.div
                    className={styles.modelCard}
                    whileHover={{ y: -5, borderColor: "var(--Primary_Color)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className={styles.imageWrapper}>
                      <img
                        src={getImageUrl(model.image)}
                        alt={model.name}
                        className={styles.modelImg}
                        loading="lazy"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/150?text=No+Image")
                        }
                      />
                    </div>
                    <p className={styles.modelName}>{model.name}</p>
                  </motion.div>
                </NavLink>
              ))
            ) : (
              <p className={styles.noModels}>
                No models found matching "{searchQuery}"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairPage;
