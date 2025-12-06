import React from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Award,
  ShieldCheck,
  Smartphone,
  UserCog,
  Smile,
  ThumbsUp,
  Users,
  Timer,
  TrendingUp,
  Target,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react";
import styles from "./AboutPage.module.css";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// --- Data for New Sections ---
const whyUsData = [
  {
    icon: <Award size={40} />,
    title: "Top Quality Parts",
    desc: "We provide only top quality tested spare parts.",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Certified Warranty",
    desc: "Our mobile repair service is covered by a 90-day assured warranty.",
  },
  {
    icon: <Smartphone size={40} />,
    title: "Quick Repair Service",
    desc: "Get your mobile repair at your home or work in just 90 minutes anyday.",
  },
  {
    icon: <UserCog size={40} />,
    title: "Skilled Technicians",
    desc: "Ditch your local vendor. Get phone repairs by certified technicians.",
  },
  {
    icon: <Smile size={40} />,
    title: "100% Satisfaction",
    desc: "Get free & easy re-service for any issues that arise within 90 days.",
  },
  {
    icon: <ThumbsUp size={40} />,
    title: "Guaranteed Safety",
    desc: "We take full responsibility for your phone & data and handle it with care.",
  },
];

const differentData = [
  {
    id: 1,
    icon: <Users size={32} />,
    title: "Customer's First",
    desc: "For us, our customers come first. We understand that our customers' needs come first, and we strive to meet their individual requirements.",
  },
  {
    id: 2,
    icon: <BadgeCheck size={32} />,
    title: "Quality Always",
    desc: "We know that when it comes to your phone, you want only the best. That's why we have an experienced team of professionals dedicated to providing you with excellent service.",
  },
  {
    id: 3,
    icon: <Timer size={32} />,
    title: "Fastest Service",
    desc: "Going out of our way to make sure, a phone doesn't put a stop in your life. We make sure you don't need to worry about any problems with your phone.",
  },
];

const philosophyData = [
  {
    id: 1,
    icon: <TrendingUp size={32} />,
    title: "Our vision",
    desc: "To make India's mobile repair services affordable and Reliable. To give our customers the best possible service, and to make sure that their experience with us is pleasant and hassle-free.",
  },
  {
    id: 2,
    icon: <Target size={32} />,
    title: "Our mission",
    desc: "We aim to build a trustworthy brand and staff capable of providing high-quality service and speedy repairs to the seekers of mobile repair service in Mumbai, Navi Mumbai, Thane & Panvel.",
  },
  {
    id: 3,
    icon: <HeartHandshake size={32} />,
    title: "Our values",
    desc: "Ensuring that we never let small things get in the way of your life. We are constantly striving to exceed customer expectations with our customer-focused approach.",
  },
];

const AboutPage = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>About Us</h1>
          <p className={styles.breadcrumbs}>Home &gt; About Us</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* --- Top Section: Text & Hero Image --- */}
        <div className={styles.topGrid}>
          {/* Left Column: Text */}
          <motion.div
            className={styles.textColumn}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 className={styles.mainHeading} variants={itemVariants}>
              ABOUT THE BEST MOBILE REPAIR SERVICE ONLINE
            </motion.h2>
            <motion.h3 className={styles.subHeading} variants={itemVariants}>
              Fast, Affordable and Reliable Mobile Repair Services
            </motion.h3>
            <motion.p className={styles.paragraph} variants={itemVariants}>
              We understand how important your mobile device is to you. That's
              why we offer a range of mobile repair services to get you back up
              and running in no time. From broken phone screens and battery
              replacements to mobile water damage and android or iphone software
              issues, our team of experienced technicians is equipped to handle
              it all.
            </motion.p>
            <motion.p className={styles.paragraph} variants={itemVariants}>
              We use only high-quality parts and offer a 90-day warranty on all
              repairs. We also offer same-day repairs when possible and provide
              a free diagnosis so you know exactly what needs to be done. We
              strive to make the repair process as fast and hassle-free as
              possible.
            </motion.p>
            <motion.p className={styles.paragraph} variants={itemVariants}>
              Our repair process is simple. Just check the mobile repair price
              and schedule your mobile repair online and we'll come to you at a
              time and location that's convenient for you.
            </motion.p>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            className={styles.imageColumn}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <img
              src="/images/about/aboutushero.webp"
              alt="Mobile Repair Illustration"
              className={styles.heroImage}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </motion.div>
        </div>

        {/* --- Middle Section: Process Steps --- */}
        <motion.div
          className={styles.processSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={styles.processHeading}>
            Don't let a broken device disturb your life!
          </h3>
          <ul className={styles.processList}>
            {[
              "Choose your phone from a variety of brands and models.",
              "Select the required service/replacement.",
              "Enter your cell phone number, followed by the OTP.",
              "Our technician will contact you regarding the reservation.",
              "And your phone will be working again in 90 minutes!",
            ].map((step, index) => (
              <li key={index} className={styles.processItem}>
                <div className={styles.iconWrapper}>
                  <ChevronRight size={18} strokeWidth={3} />
                </div>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* --- Divider --- */}
        <hr className={styles.divider} />

        {/* --- Who Are We Section --- */}
        <motion.div
          className={styles.whoWeAreSection}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className={styles.centerHeading}>WHO ARE WE?</h2>
          <div className={styles.whoContent}>
            <h3>One stop shop for all your mobile repair services</h3>
            <p>
              The idea for Cell Clinic arose from a noticeable market need for a
              trustworthy and specialized option for customers searching for
              mobile phone repairs. We decided to fill this gap with a business
              model that offers quality mobile phone repairs, advice, and
              support. Our technicians are highly trained and experienced, and
              our customer service is second to none.
            </p>
            <p>
              Cell Clinic was born with a mission to help lead people looking
              for mobile repair in Hyderabad, Bangalore, and Mumbai towards a
              trusted service they deserve. We offer fast, convenient, and
              reliable mobile phone repairs right at your doorstep.
            </p>
          </div>
        </motion.div>

        {/* ================= NEW SECTIONS START ================= */}

        {/* --- 1. Why Us Section --- */}
        <div className={styles.whyUsContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>WHY US</h2>
            <div className={styles.redLine}></div>
          </div>

          <motion.div
            className={styles.whyUsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {whyUsData.map((item, idx) => (
              <motion.div
                key={idx}
                className={styles.whyUsCard}
                variants={itemVariants}
              >
                <div className={styles.whyUsIcon}>{item.icon}</div>
                <div className={styles.whyUsText}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- 2. What Makes Us Different --- */}
        <div className={styles.diffContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>WHAT MAKES US DIFFERENT</h2>
            <div className={styles.redLine}></div>
          </div>

          <motion.div
            className={styles.threeColGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {differentData.map((item) => (
              <motion.div
                key={item.id}
                className={styles.featureCard}
                variants={itemVariants}
              >
                <div className={styles.featureIconRow}>
                  <div className={styles.featureIcon}>{item.icon}</div>
                </div>
                <div className={styles.numberRow}>
                  <div className={styles.redCircle}>{item.id}</div>
                  <h4>{item.title}</h4>
                </div>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- 3. Our Philosophy --- */}
        <div className={styles.diffContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>OUR PHILOSOPHY</h2>
            <div className={styles.redLine}></div>
          </div>

          <motion.div
            className={styles.threeColGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {philosophyData.map((item) => (
              <motion.div
                key={item.id}
                className={styles.featureCard}
                variants={itemVariants}
              >
                <div className={styles.featureIconRow}>
                  <div className={styles.featureIcon}>{item.icon}</div>
                </div>
                <div className={styles.numberRow}>
                  <div className={styles.redCircle}>{item.id}</div>
                  <h4>{item.title}</h4>
                </div>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ================= NEW SECTIONS END ================= */}
      </div>
    </div>
  );
};

export default AboutPage;
