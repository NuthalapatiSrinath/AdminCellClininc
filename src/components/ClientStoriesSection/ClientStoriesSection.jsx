import React from "react";
import ClientStoriesCard from "../ClientStoriesCard/ClientStoriesCard"; // Adjust path if needed
import styles from "./ClientStoriesSection.module.css";

const stories = [
  {
    name: "Varun Kota",
    // Ensure these images exist in public/images/ or change paths
    image: "/images/review2.webp",
    text: "Cliniq helped us streamline our inventory processes, giving our team more time to focus on growth.",
  },
  {
    name: "Tejaswi Velivala",
    image: "/images/review3.webp",
    text: "Service with Cliniq transformed our daily operations. Their solution improved accuracy  timely significantly.",
  },
  {
    name: "Darshan Kotla",
    image: "/images/review2.webp",
    text: "Thanks to CH, our business now runs smoother than ever. The efficiency gains have saved us both time and money.",
  },
  // Added duplicates to demonstrate scrolling if you only have 3
  {
    name: "Anil Kumar",
    image: "/images/review3.webp",
    text: "Fantastic service and quick turnaround time. Highly recommended for any business looking to scale.",
  },
];

const ClientStoriesSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Client Stories</h2>

        <div className={styles.scrollContainer}>
          {stories.map((story, idx) => (
            <ClientStoriesCard
              key={idx}
              name={story.name}
              image={story.image}
              text={story.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientStoriesSection;
