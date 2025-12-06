import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  UploadCloud,
  CheckCircle,
  AlertCircle,
  FileJson,
  Loader2,
} from "lucide-react";
import styles from "./ImportDataPage.module.css";
import { catalogService } from "../../services/catalogService";

const ImportDataPage = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    message: "",
    type: "", // 'success' | 'error'
  });

  const handleImport = async () => {
    if (!jsonInput.trim()) {
      setStatus({
        loading: false,
        message: "Please paste valid JSON data first.",
        type: "error",
      });
      return;
    }

    try {
      // 1. Validate JSON format
      let parsedData;
      try {
        parsedData = JSON.parse(jsonInput);
      } catch (e) {
        throw new Error("Invalid JSON format. Please check your syntax.");
      }

      // 2. Start Import
      setStatus({
        loading: true,
        message: "Importing data to database...",
        type: "info",
      });

      const response = await catalogService.seedDatabase(parsedData);

      // 3. Success
      setStatus({
        loading: false,
        message: `Success! ${response.message || "Database seeded."}`,
        type: "success",
      });
      setJsonInput(""); // Clear input on success
    } catch (error) {
      console.error("Import Failed:", error);
      setStatus({
        loading: false,
        message: error.message || "Failed to import data.",
        type: "error",
      });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <Database size={32} className={styles.icon} />
            <div>
              <h1 className={styles.pageTitle}>Import Catalog Data</h1>
              <p className={styles.subtitle}>
                Paste your master JSON object here to bulk update Brands,
                Devices, and Services.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.contentCard}>
          <div className={styles.editorHeader}>
            <FileJson size={18} />
            <span>JSON Editor</span>
          </div>

          <textarea
            className={styles.jsonEditor}
            placeholder='Paste your JSON here... e.g. { "apple": { "name": "Apple", "models": [...] } }'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            spellCheck="false"
          ></textarea>

          <div className={styles.actions}>
            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`${styles.statusMessage} ${styles[status.type]}`}
                >
                  {status.type === "success" && <CheckCircle size={18} />}
                  {status.type === "error" && <AlertCircle size={18} />}
                  {status.type === "info" && (
                    <Loader2 size={18} className={styles.spin} />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className={styles.importBtn}
              onClick={handleImport}
              disabled={status.loading || !jsonInput}
            >
              {status.loading ? (
                <>
                  <Loader2 size={20} className={styles.spin} />
                  Processing...
                </>
              ) : (
                <>
                  <UploadCloud size={20} />
                  Import Data
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportDataPage;
