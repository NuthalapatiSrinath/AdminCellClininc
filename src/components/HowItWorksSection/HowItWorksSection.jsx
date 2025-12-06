import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Package, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./HowItWorksSection.module.css";

// Updated Data with specific 'colorTheme' for each tab
const tabContent = {
  doorstep: {
    title: "Doorstep Solution",
    colorTheme: "#f97316", // Orange
    description:
      "Craxxo provide the solutions for iPhone screen, battery issues smart phones, MacBook battery, RAM, replacement etc.",
    steps: [
      {
        id: 1,
        title: "Book an appointment",
        desc: "Tell us about the device & the issue. Confirm your location & convenient time.",
      },
      {
        id: 2,
        title: "Technician visit",
        desc: "Our engineer visits your registered address. He will given the solution in front of you.",
      },
      {
        id: 3,
        title: "Pay Online",
        desc: "Check the device then pay via cash, card or UPI transfer.",
      },
    ],
    cardIcon: <Truck size={32} />,
    cardTitle: "We will come to you",
    cardText:
      "We will come to you wherever you are, whether it is your home, office or anywhere else and fix your device in our van for an on-site solution.",
  },
  pickup: {
    title: "Pickup & Delivery",
    colorTheme: "#2563eb", // Blue (Brand Primary)
    description:
      "Ideal for complex repairs like motherboard issues or liquid damage that require lab equipment.",
    steps: [
      {
        id: 1,
        title: "Schedule Pickup",
        desc: "Book a slot and our delivery partner will arrive at your location to collect the device safely.",
      },
      {
        id: 2,
        title: "Diagnosis & Repair",
        desc: "Your device is transported to our certified lab for expert diagnosis and repair.",
      },
      {
        id: 3,
        title: "Safe Delivery",
        desc: "Once fixed and tested, we deliver your device back to your doorstep securely.",
      },
    ],
    cardIcon: <Package size={32} />,
    cardTitle: "Secure Logistics",
    cardText:
      "We ensure end-to-end safety for your device. From the moment we pick it up until it's delivered back to you, your gadget is tracked.",
  },
  walkin: {
    title: "Walk-in (Office Visit)",
    colorTheme: "#10b981", // Green
    description:
      "Visit our nearest service center for instant repairs and face-to-face consultation with experts.",
    steps: [
      {
        id: 1,
        title: "Visit Store",
        desc: "Walk into any of our service centers in Hyderabad, Bangalore, or Mumbai.",
      },
      {
        id: 2,
        title: "Instant Repair",
        desc: "Watch your device get repaired live by our experts. Most repairs are done in 30 mins.",
      },
      {
        id: 3,
        title: "Pay & Collect",
        desc: "Verify the repair quality, make the payment, and take your device home immediately.",
      },
    ],
    cardIcon: <MapPin size={32} />,
    cardTitle: "Visit Our Center",
    cardText:
      "Enjoy a cup of coffee while we fix your phone. Our state-of-the-art service centers are equipped to handle any repair instantly.",
  },
};

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState("doorstep");
  const activeContent = tabContent[activeTab];
  const navigate = useNavigate();

  const handleBookNow = () => {
    // navigate to services page
    navigate("/services");
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.mainCard}>
          {/* Header Tabs */}
          <div className={styles.tabsHeader}>
            {Object.keys(tabContent).map((key) => (
              <button
                key={key}
                className={`${styles.tabBtn} ${
                  activeTab === key ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab(key)}
              >
                {tabContent[key].title}
              </button>
            ))}
          </div>

          <div className={styles.contentBody}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Heading & Description */}
                <h3 className={styles.heading}>
                  {activeContent.title}
                  {/* Dynamic Underline Color */}
                  <span
                    className={styles.underline}
                    style={{ backgroundColor: activeContent.colorTheme }}
                  ></span>
                </h3>

                <p className={styles.description}>
                  {activeContent.description}
                </p>

                {/* Steps Row */}
                <div className={styles.stepsRow}>
                  {activeContent.steps.map((step, index) => (
                    <div key={step.id} className={styles.stepItem}>
                      <div className={styles.stepNumber}>{step.id}</div>
                      <div className={styles.stepText}>
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                      {/* Connector Line */}
                      {index < 2 && <div className={styles.connector}></div>}
                    </div>
                  ))}
                </div>

                {/* Bottom Grid */}
                <div className={styles.bottomGrid}>
                  {/* Info Card */}
                  <div className={styles.infoCard}>
                    <div
                      className={styles.iconBox}
                      style={{ color: activeContent.colorTheme }}
                    >
                      {/* Clone element to pass dynamic color if needed, or just use parent color */}
                      {React.cloneElement(activeContent.cardIcon, {
                        color: activeContent.colorTheme,
                      })}
                    </div>
                    <div className={styles.infoContent}>
                      <h4>{activeContent.cardTitle}</h4>
                      <p>{activeContent.cardText}</p>
                    </div>
                  </div>

                  {/* CTA Card with Dynamic Color */}
                  <div
                    className={styles.ctaCard}
                    style={{ backgroundColor: activeContent.colorTheme }}
                  >
                    {/* Button text color set to specific dark color in CSS to ensure visibility */}
                    <button
                      type="button"
                      className={styles.bookBtn}
                      onClick={handleBookNow}
                      style={{ color: activeContent.colorTheme }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
