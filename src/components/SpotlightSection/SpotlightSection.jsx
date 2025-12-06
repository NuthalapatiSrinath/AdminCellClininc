import React from "react";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import styles from "./SpotlightSection.module.css";

// Data
const spotlights = [
  {
    id: 1,
    coverImage:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    authorImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    authorName: "Sophie Lee",
    title: "How Technology is Shaping Our World",
    description:
      "Technology is revolutionizing every aspect of our lives, from how we communicate to how we work.",
    date: "19 Jan 2002",
  },
  {
    id: 2,
    coverImage:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    authorImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    authorName: "Sophie Lee",
    title: "The Future of Mobile Repairs",
    description:
      "Discover how AI and robotics are changing the landscape of electronic device maintenance.",
    date: "19 Jan 2002",
  },
  {
    id: 3,
    coverImage:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    authorImage:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    authorName: "Sophie Lee",
    title: "Sustainability in Tech Industry",
    description:
      "Why repairing your devices is the most eco-friendly choice you can make this year.",
    date: "19 Jan 2002",
  },
];

const SpotlightSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.headerWrapper}>
          <div className={styles.titleRow}>
            <h2 className={styles.heading}>Spotlight</h2>
            <div className={styles.line}></div>
          </div>
          <p className={styles.subHeading}>
            Stay ahead in the digital age with insights on how technology is
            reshaping industries, enhancing our daily lives, and driving future
            innovations.
          </p>
        </div>

        {/* Grid - Static (No Animation) */}
        <div className={styles.grid}>
          {spotlights.map((item) => (
            <div key={item.id}>
              <SpotlightCard {...item} />
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className={styles.footerLinkWrapper}>
          <a href="/blogs" className={styles.footerLink}>
            Go to Blogs Page &gt;&gt;
          </a>
        </div>
      </div>
    </section>
  );
};

export default SpotlightSection;
