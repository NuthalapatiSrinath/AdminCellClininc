import React from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./SpotlightCard.module.css";

const SpotlightCard = ({
  coverImage,
  authorImage,
  authorName,
  title,
  description,
  date,
}) => {
  return (
    <div className={styles.card}>
      {/* Cover Image Area */}
      <div className={styles.imageContainer}>
        <img src={coverImage} alt={title} className={styles.coverImage} />

        {/* Overlapping Author Avatar */}
        <div className={styles.avatarWrapper}>
          <img src={authorImage} alt={authorName} className={styles.avatar} />
        </div>
      </div>

      {/* Content Area */}
      <div className={styles.content}>
        <span className={styles.authorName}>{authorName}</span>

        <div className={styles.titleRow}>
          <h3 className={styles.title}>{title}</h3>
          <button className={styles.iconBtn}>
            <ArrowUpRight size={20} />
          </button>
        </div>

        <p className={styles.description}>{description}</p>

        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
};

export default SpotlightCard;
