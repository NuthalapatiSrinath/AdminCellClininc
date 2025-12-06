import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";
import { motion } from "framer-motion";
import { catalogService } from "../../services/catalogService";
import { getImageUrl } from "../../utils/imageHelper";
import {
  Smartphone,
  Battery,
  Zap,
  Disc,
  Monitor,
  ScanFace,
  PhoneCall,
  Search,
  Check,
  Loader2,
} from "lucide-react";
import styles from "./ModelRepairPage.module.css";

// --- Icon Helper ---
const getServiceMetadata = (title) => {
  const t = title?.toLowerCase() || "";
  if (t.includes("display") || t.includes("screen"))
    return { icon: <Smartphone size={28} /> };
  if (t.includes("glass")) return { icon: <Monitor size={28} /> };
  if (t.includes("battery")) return { icon: <Battery size={28} /> };
  if (t.includes("charging") || t.includes("port"))
    return { icon: <Zap size={28} /> };
  if (t.includes("back") || t.includes("panel"))
    return { icon: <Disc size={28} /> };
  if (t.includes("face") || t.includes("sensor"))
    return { icon: <ScanFace size={28} /> };
  if (t.includes("speaker") || t.includes("mic"))
    return { icon: <PhoneCall size={28} /> };
  return { icon: <Search size={28} /> };
};

const ModelRepairPage = () => {
  const { id: deviceId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  // Retrieve model details passed from previous page
  const modelData = location.state?.model;
  const deviceImage = getImageUrl(modelData?.image);
  const deviceName = modelData?.name || "Device Repair";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchServices = async () => {
      if (!deviceId) return;
      setLoading(true);
      try {
        const response = await catalogService.getServices(deviceId);
        if (response && response.data) {
          // --- Map API Data to UI format ---
          const mappedData = response.data.map((s) => ({
            id: s._id,
            title: s.title,
            description: s.description,
            price: s.price || 0,
            originalPrice: s.originalPrice || 0,
            discount: s.discount === "0%" ? null : s.discount,
            isActive: s.isActive ?? true,
            // Add icon for UI display only
            icon: getServiceMetadata(s.title).icon,
          }));
          setServices(mappedData);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [deviceId]);

  const toggleService = (service) => {
    const exists = cart.find((item) => item.id === service.id);
    if (exists) {
      setCart(cart.filter((item) => item.id !== service.id));
      setTotal((prev) => prev - service.price);
    } else {
      setCart([...cart, service]);
      setTotal((prev) => prev + service.price);
    }
  };

  const formatPrice = (price) =>
    price > 0
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(price)
      : "Contact for Price";

  // --- DISPATCH TO MODAL (FIXED) ---
  const handleGetQuote = () => {
    // 1. SANITIZE: Remove 'icon' (React Element) from data before sending to Redux
    const sanitizedServices = cart.map((item) => {
      const { icon, ...rest } = item; // Destructure to exclude icon
      return rest;
    });

    dispatch(
      openModal({
        type: "booking", // Matches 'activeModal' in RenderModal
        // IMPORTANT: Use 'modalData' because that is what modalSlice expects
        modalData: {
          deviceModel: deviceName,
          selectedServices: sanitizedServices,
          total: total,
        },
      })
    );
  };

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Loader2 className={styles.spinner} size={48} />
      </div>
    );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.modelHeader}>
            <img
              src={deviceImage}
              alt={deviceName}
              className={styles.modelImage}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/150")
              }
            />
            <h1 className={styles.modelTitle}>{deviceName}</h1>
          </div>
        </div>

        <div className={styles.layoutGrid}>
          {/* Services List */}
          <div className={styles.leftColumn}>
            <h3 className={styles.sectionTitle}>Pick Your Repair Service</h3>
            <div className={styles.servicesGrid}>
              {services.map((service) => {
                const isSelected = cart.some((item) => item.id === service.id);
                return (
                  <motion.div
                    key={service.id}
                    className={`${styles.serviceCard} ${
                      isSelected ? styles.selected : ""
                    }`}
                    whileHover={{ y: -3 }}
                    onClick={() => toggleService(service)}
                  >
                    {/* Discount Badge */}
                    {service.discount && (
                      <span className={styles.discountBadge}>
                        {service.discount} OFF
                      </span>
                    )}

                    <div className={styles.cardBody}>
                      {/* Icon */}
                      <div className={styles.iconBox}>{service.icon}</div>

                      {/* Text Content */}
                      <div className={styles.details}>
                        <h4 className={styles.serviceTitle}>{service.title}</h4>

                        {/* Description added here */}
                        {service.description && (
                          <p className={styles.serviceDesc}>
                            {service.description}
                          </p>
                        )}

                        {/* Price Section */}
                        <div className={styles.priceRow}>
                          <span className={styles.price}>
                            {formatPrice(service.price)}
                          </span>
                          {service.originalPrice > service.price && (
                            <span className={styles.originalPrice}>
                              {formatPrice(service.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    <div className={styles.cardFooter}>
                      <button
                        className={`${styles.addBtn} ${
                          isSelected ? styles.addedBtn : ""
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check size={16} /> Selected
                          </>
                        ) : (
                          "Add"
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Quote Section (Sticky) */}
          <div className={styles.rightColumn}>
            <div className={styles.priceCard}>
              <h3 className={styles.priceTitle}>Estimated Quote</h3>

              {cart.length === 0 ? (
                <p className={styles.emptyCartMsg}>No services selected.</p>
              ) : (
                <div className={styles.cartItems}>
                  {cart.map((item) => (
                    <div key={item.id} className={styles.cartRow}>
                      <span>{item.title}</span>
                      <span>{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.billRow}>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                className={styles.bookRepairBtn}
                onClick={handleGetQuote}
                disabled={cart.length === 0}
              >
                Get Quote
              </button>
              <p className={styles.quoteNote}>
                *Final price may vary after physical diagnosis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelRepairPage;
