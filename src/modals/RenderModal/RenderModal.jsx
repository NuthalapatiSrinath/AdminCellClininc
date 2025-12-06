import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./RenderModal.module.css";
import MainModal from "../MainModal/MainModal";

// --- Import Existing Modals ---
import LoginModal from "../LoginModal/LoginModal";
import FindModelModal from "../FindModelModal/FindModelModal";
import BookingModal from "../BookingModal/BookingModal";

// --- Import NEW Modals ---
import CreateBrandModal from "../CreateBrandModal/CreateBrandModal";
import CreateDeviceModal from "../CreateDeviceModal/CreateDeviceModal";

const RenderModal = () => {
  const dispatch = useDispatch();
  const { type, data } = useSelector((state) => state.modal);

  const MODAL_COMPONENTS = {
    LOGIN: LoginModal,
    FIND_MODEL: FindModelModal,
    BOOKING: BookingModal,
    // Add New Types Here
    CREATE_BRAND: CreateBrandModal,
    CREATE_DEVICE: CreateDeviceModal,
  };

  const ActiveComponent = type
    ? MODAL_COMPONENTS[type] || MODAL_COMPONENTS[type.toUpperCase()]
    : null;

  const handleClose = () => dispatch(closeModal());

  return (
    <MainModal>
      <AnimatePresence mode="wait">
        {ActiveComponent && (
          <motion.div
            key={type}
            className={styles.RenderModal}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Pass close handler and data props */}
            <ActiveComponent {...data} close={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </MainModal>
  );
};

export default RenderModal;
