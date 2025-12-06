import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { articles } from "../../data/articles";
import styles from "./ArticleDetailPage.module.css";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  const relatedArticles = articles.filter((a) => a.id !== id).slice(0, 10);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return <div className={styles.notFound}>Article not found.</div>;
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>{article.title}</h1>
          <p className={styles.breadcrumbs}>
            <Link to="/">Home</Link> &gt; <Link to="/spotlight">Article</Link>{" "}
            &gt; {article.title}
          </p>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* --- Main Content Column --- */}
          <motion.div
            className={styles.mainContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.heroImageWrapper}>
              <img
                src={article.image}
                alt={article.title}
                className={styles.heroImage}
              />
            </div>

            <div className={styles.articleBody}>
              {article.content && article.content.length > 0 ? (
                article.content.map((block, index) => {
                  if (block.type === "heading") {
                    return (
                      <h2 key={index} className={styles.contentHeading}>
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "subheading") {
                    return (
                      <h3 key={index} className={styles.contentSubHeading}>
                        {block.text}
                      </h3>
                    );
                  }
                  return (
                    <p key={index} className={styles.contentParagraph}>
                      {block.text}
                    </p>
                  );
                })
              ) : (
                <p>Full article content coming soon...</p>
              )}
            </div>
          </motion.div>

          {/* --- Sidebar Column (Sticky) --- */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>Related Articles</h3>
              <div className={styles.sidebarList}>
                {relatedArticles.map((item) => (
                  <Link
                    to={`/spotlight/${item.id}`}
                    key={item.id}
                    className={styles.sidebarLink}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
