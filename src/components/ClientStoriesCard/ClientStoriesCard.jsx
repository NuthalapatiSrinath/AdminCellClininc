import React from "react";
import styles from "./ClientStoriesCard.module.css";

const ClientStoriesCard = ({ name, image, text }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          {/* Add onError to handle missing images gracefully */}
          <img
            src={image}
            alt={name}
            className={styles.profileImage}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.backgroundColor = "#ccc";
            }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.stars}>★★★★★</div>
          <p className={styles.text}>"{text}"</p>
          <p className={styles.name}>- {name}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientStoriesCard;
