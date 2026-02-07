import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const desktopImages = [
    "/images/hero/1.webp",
    "/images/hero/2.webp",
    "/images/hero/5.webp",
  ];

  const mobileImages = [
    "/images/hero/3.webp",
    "/images/hero/4.webp",
    "/images/hero/6.webp",
  ];
  // State to track if we are on mobile
  const [isMobile, setIsMobile] = useState(false);

  // 1. Detect Screen Size on Load & Resize
  useEffect(() => {
    const handleResize = () => {
      // If width is less than 768px, we are on mobile
      setIsMobile(window.innerWidth < 768);
    };

    // Run once on mount
    handleResize();

    // Add listener for when user resizes window
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Select the correct images based on state
  const activeImages = isMobile ? mobileImages : desktopImages;

  // 3. Add the infinite loop clone (copy first image to end)
  const images = [...activeImages, activeImages[0]];

  // Slider Logic (Same as before)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000); // 3 seconds

    return () => clearInterval(intervalRef.current);
  }, [currentIndex]); // Depend on currentIndex so timer resets on manual interaction if needed

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentIndex === images.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, images.length]);

  return (
    <div className={styles.heroContainer}>
      <div
        className={styles.sliderTrack}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hero banner ${index}`}
            className={styles.heroImage}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
