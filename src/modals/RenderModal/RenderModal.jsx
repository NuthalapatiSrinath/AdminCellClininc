import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/slices/modalSlice"; // specific path to your slice
import { AnimatePresence, motion } from "framer-motion";
import styles from "./RenderModal.module.css";
import MainModal from "../MainModal/MainModal";

// Import your Modal Components
import LoginModal from "../LoginModal/LoginModal";
import FindModelModal from "../FindModelModal/FindModelModal";
import BookingModal from "../BookingModal/BookingModal";

const RenderModal = () => {
  const dispatch = useDispatch();

  // 1. Get both the 'type' (which modal to show) and the 'data' (payload)
  const { type, data } = useSelector((state) => state.modal);

  // 2. Map keys to Component References (not JSX elements)
  // Ensure these keys match what you dispatch (e.g., "BOOKING")
  const MODAL_COMPONENTS = {
    LOGIN: LoginModal,
    FIND_MODEL: FindModelModal,
    BOOKING: BookingModal,
  };

  // 3. Select the active component based on the type
  // We use UPPERCASE keys to be safe, assuming your dispatch sends "BOOKING"
  const ActiveComponent = type
    ? MODAL_COMPONENTS[type] || MODAL_COMPONENTS[type.toUpperCase()]
    : null;

  return (
    <MainModal>
      <AnimatePresence mode="wait">
        {ActiveComponent && (
          <motion.div
            key={type}
            className={styles.RenderModal}
            // Centered pop-up animation
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* 4. Render the component and spread the data as props */}
            {/* This passes deviceModel, selectedServices, etc. directly to BookingModal */}
            <ActiveComponent {...data} close={() => dispatch(closeModal())} />
          </motion.div>
        )}
      </AnimatePresence>
    </MainModal>
  );
};

export default RenderModal;
