import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./FaqPage.module.css";
import { faqs } from "../../data/faqs";

const FaqPage = () => {
  // State to track which FAQ is currently open (null means all closed)
  const [openIndex, setOpenIndex] = useState(0); // Default open the first one

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Frequently Asked Questions</h1>
          <p className={styles.breadcrumbs}>
            Home &gt; Frequently Asked Questions
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.mainHeading}>
            HAVE QUESTIONS? WE’RE HERE TO HELP!
          </h2>
          <div className={styles.redLine}></div>
        </div>

        {/* FAQ List */}
        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.id} className={styles.faqItem}>
                {/* Question Header */}
                <button
                  className={styles.questionBtn}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>
                    {faq.id}. {faq.question}
                  </span>
                  <span className={styles.iconWrapper}>
                    {isOpen ? (
                      <ChevronUp className={styles.icon} />
                    ) : (
                      <ChevronDown className={styles.icon} />
                    )}
                  </span>
                </button>

                {/* Answer Body (Animated) */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={styles.answerWrapper}
                    >
                      <div className={styles.answerContent}>
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Closing Line */}
        {/* <div className={styles.closingItem}>
          <button className={styles.closingBtn}>
            <span className={styles.questionText}>Cell Clinic Hyderabad</span>
            <ChevronDown className={styles.icon} />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FaqPage;
