import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./SpotlightPage.module.css";
import { articles } from "../../data/articles";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SpotlightPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Article</h1>
          <p className={styles.breadcrumbs}>Home &gt; Article</p>
        </div>
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {articles.map((article) => (
            <motion.div
              key={article.id}
              variants={cardVariants}
              className={styles.cardWrapper}
            >
              <Link to={`/spotlight/${article.id}`} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className={styles.cardImage}
                  />
                  <div className={styles.overlay}></div>
                </div>

                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{article.title}</h2>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>

                  <div className={styles.readMore}>
                    <span>Read Article</span>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SpotlightPage;
