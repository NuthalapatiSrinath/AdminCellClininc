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
import QuickBookingModal from "../QuickBookingModal/QuickBookingModal";

// --- Import Admin Modals ---
import CreateBrandModal from "../CreateBrandModal/CreateBrandModal";
import CreateDeviceModal from "../CreateDeviceModal/CreateDeviceModal";
import CreateServiceModal from "../CreateServiceModal/CreateServiceModal";
import ManageServicesModal from "../ManageServicesModal/ManageServicesModal"; // <--- NEW IMPORT
import EditOrderModal from "../EditOrderModal/EditOrderModal";
const RenderModal = () => {
  const dispatch = useDispatch();
  const { type, modalData } = useSelector((state) => state.modal);

  const MODAL_COMPONENTS = {
    LOGIN: LoginModal,
    FIND_MODEL: FindModelModal,
    BOOKING: BookingModal,
    QUICK_BOOKING: QuickBookingModal,

    // --- Admin Modals ---
    CREATE_BRAND: CreateBrandModal,
    CREATE_DEVICE: CreateDeviceModal,
    CREATE_SERVICE: CreateServiceModal,
    MANAGE_SERVICES: ManageServicesModal,
    EDIT_ORDER: EditOrderModal, // <--- REGISTERED HERE
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
            <ActiveComponent
              {...modalData}
              close={handleClose}
              onClose={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MainModal>
  );
};

export default RenderModal;
