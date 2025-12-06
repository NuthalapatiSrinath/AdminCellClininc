import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { motion } from "framer-motion";
import { Clock, Navigation, Loader2 } from "lucide-react";
import styles from "./AddressInfoPage.module.css";

const AddressInfoPage = () => {
  const navigate = useNavigate(); // Initialize hook

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "9346532339", // Pre-filled for logged-in user
    altPhone: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    date: "",
    time: "",
  });

  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Geolocation Logic ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Using OpenStreetMap Nominatim API (Free)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data && data.display_name) {
            setFormData((prev) => ({
              ...prev,
              address: data.display_name,
              city:
                data.address.city ||
                data.address.town ||
                data.address.state ||
                "",
              landmark: data.address.suburb || data.address.neighbourhood || "",
            }));
          } else {
            alert("Address not found.");
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Failed to fetch address details. Please enter manually.");
        } finally {
          setIsLocationLoading(false);
        }
      },
      (error) => {
        console.error("Geolocation Error:", error);
        alert("Location permission denied or unavailable.");
        setIsLocationLoading(false);
      }
    );
  };

  // --- Navigation Handlers ---
  const handleDoorstep = () => {
    // Validate form here if needed
    navigate("/payment?mode=doorstep");
  };

  const handlePickup = () => {
    // Validate form here if needed
    navigate("/pickup-checklist");
  };

  // Dummy pricing
  const priceDetails = {
    price: 7600,
    discount: 0,
    total: 7600,
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* --- LEFT COLUMN: Address Form --- */}
          <div className={styles.leftColumn}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>ADDRESS INFORMATION</h2>
              <div className={styles.headerLine}></div>
            </div>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              {/* Row 1 */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Full Name*</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter your name"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>10-Digit Mobile Number*</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    readOnly
                    className={`${styles.input} ${styles.readOnly}`}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Alternate Phone Number (Optional)</label>
                  <input
                    type="text"
                    name="altPhone"
                    value={formData.altPhone}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Any other number"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email Id*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Enter valid Email ID"
                  />
                </div>
              </div>

              {/* Full Address with Location Button */}
              <div className={styles.inputGroup}>
                <div className={styles.labelRow}>
                  <label>Full Address*</label>
                  <button
                    type="button"
                    className={styles.locationBtn}
                    onClick={handleGetLocation}
                    disabled={isLocationLoading}
                  >
                    {isLocationLoading ? (
                      <>
                        <Loader2 size={14} className={styles.spinner} />{" "}
                        Fetching...
                      </>
                    ) : (
                      <>
                        <Navigation size={14} /> Get current location
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  name="address"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="House No, Building Name, Street, Area"
                ></textarea>
              </div>

              {/* Row 3 */}
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Landmark*</label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Near..."
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">Choose City*</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Secunderabad">Secunderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* --- RIGHT COLUMN: Price Details --- */}
          <div className={styles.rightColumn}>
            <div className={styles.priceCard}>
              <h3 className={styles.priceTitle}>Price Details</h3>

              <div className={styles.priceRow}>
                <span>Best Price</span>
                <span className={styles.amount}>
                  ₹{priceDetails.price.toFixed(2)}
                </span>
              </div>
              <div className={styles.priceRow}>
                <span>Discount</span>
                <span className={styles.greenText}>
                  ₹{priceDetails.discount.toFixed(2)}
                </span>
              </div>
              <div className={`${styles.priceRow} ${styles.totalRow}`}>
                <span>Total Amount</span>
                <span>₹{priceDetails.total.toFixed(2)}</span>
              </div>

              {/* Date & Time Pickers */}
              <div className={styles.pickerGroup}>
                <label>Choose Repair Date*</label>
                <div className={styles.iconInput}>
                  <input type="date" className={styles.dateInput} />
                </div>
              </div>

              <div className={styles.pickerGroup}>
                <label>Choose Repair Time*</label>
                <div className={styles.iconInput}>
                  <select className={styles.selectInput}>
                    <option>--:-- --</option>
                    <option>10:00 AM - 12:00 PM</option>
                    <option>12:00 PM - 02:00 PM</option>
                    <option>02:00 PM - 04:00 PM</option>
                    <option>04:00 PM - 06:00 PM</option>
                  </select>
                  <Clock size={16} className={styles.pickerIcon} />
                </div>
              </div>

              <p className={styles.note}>
                <strong>Please Note:</strong> We are providing service between
                10am to 9pm daily. If booking made post 7:30pm will be scheduled
                next day.
              </p>

              <div className={styles.actionButtons}>
                <button className={styles.doorstepBtn} onClick={handleDoorstep}>
                  Doorstep Repair
                </button>
                <button className={styles.pickupBtn} onClick={handlePickup}>
                  Pickup & Drop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInfoPage;
