import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Instagram, MessageCircle } from "lucide-react";
import styles from "./HeroSection.module.css";

// Data for the Slider
const slides = [
  {
    id: 1,
    tagline: "AT YOUR DOORSTEP",
    title: "MacBook Home <br /> Solutions",
    description:
      "We are capable of doing all solution of your MacBook i.e screen replacement, battery replacement, hardware issues, other issues, etc...",
    image: "/images/watch.webp",
    imgAlt: "Smart Watch Repair",
  },
  {
    id: 2,
    tagline: "FAST & RELIABLE",
    title: "Expert iPhone <br /> Repairs",
    description:
      "From cracked screens to battery replacements, our certified technicians bring your iPhone back to life in no time at your doorstep.",
    image: "/images/watch.webp",
    imgAlt: "iPhone Repair",
  },
  {
    id: 3,
    tagline: "PREMIUM CARE",
    title: "iPad & Tablet <br /> Services",
    description:
      "Comprehensive diagnostics and repair services for all iPad models and leading Android tablets with genuine parts warranty.",
    image: "/images/watch.webp",
    imgAlt: "iPad Repair",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: { x: 50, opacity: 0, transition: { duration: 0.3 } },
};

const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const HeroSection = () => {
  const navigate = useNavigate(); // 2. Initialize the hook
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Wrapping content in AnimatePresence for slide transitions */}
        <AnimatePresence mode="wait">
          <React.Fragment key={currentSlide.id}>
            {/* --- Left Column: Text Content --- */}
            <motion.div
              className={styles.content}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.span className={styles.tagline} variants={itemVariants}>
                {currentSlide.tagline}
              </motion.span>

              <motion.h1
                className={styles.title}
                variants={itemVariants}
                dangerouslySetInnerHTML={{ __html: currentSlide.title }}
              />

              <motion.p className={styles.description} variants={itemVariants}>
                {currentSlide.description}
              </motion.p>

              <motion.div className={styles.actionRow} variants={itemVariants}>
                {/* 3. Add onClick handler to navigate */}
                <button
                  className={styles.bookBtn}
                  onClick={() => navigate("/services")}
                >
                  BOOK NOW
                </button>

                <div className={styles.socialIcons}>
                  <a
                    href="xk"
                    className={styles.iconLink}
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={20} />
                  </a>
                  <a
                    href="#s"
                    className={styles.iconLink}
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </motion.div>

              <motion.div className={styles.dots} variants={itemVariants}>
                {slides.map((_, idx) => (
                  <span
                    key={idx}
                    className={`${styles.dot} ${
                      idx === currentIndex ? styles.active : ""
                    }`}
                    onClick={() => setCurrentIndex(idx)}
                  ></span>
                ))}
              </motion.div>
            </motion.div>

            {/* --- Right Column: Image Stack --- */}
            <motion.div
              className={styles.imageWrapper}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Decorative Back Cards */}
              <div className={styles.cardBack}></div>
              <div className={styles.cardMiddle}></div>

              {/* Floating Product Image */}
              <motion.img
                src={currentSlide.image}
                alt={currentSlide.imgAlt}
                className={styles.watchImage}
                animate={floatingAnimation}
                key={currentSlide.image} // Re-trigger floating on change
              />
            </motion.div>
          </React.Fragment>
        </AnimatePresence>

        {/* --- Bottom Navigation Arrows --- */}
        <div className={styles.arrows}>
          <button
            className={styles.arrowBtn}
            onClick={handlePrev}
            aria-label="Previous Slide"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className={styles.arrowBtn}
            onClick={handleNext}
            aria-label="Next Slide"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
