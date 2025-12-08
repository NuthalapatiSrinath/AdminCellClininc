// src/modals/ManageServicesModal/ManageServicesModal.jsx
import React, { useState, useEffect } from "react";
import { X, Loader2, Edit, Trash2, Plus } from "lucide-react";
import styles from "./ManageServicesModal.module.css";
import { catalogService } from "../../services/catalogService";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/modalSlice";

const ManageServicesModal = ({ device, close }) => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [device._id]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await catalogService.getServices(device._id);
      if (res.success) setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      // Assuming you added deleteService to catalogService in previous steps
      // await catalogService.deleteService(serviceId);
      // Note: I missed adding deleteService route/controller in previous response.
      // You need to add it if you want delete functionality here.
      alert("Delete Service functionality needs backend implementation first.");
      fetchServices();
    } catch (e) {
      alert("Failed");
    }
  };

  const openEditServiceModal = (service) => {
    // Close this modal first, then open edit
    close();
    dispatch(
      openModal({
        type: "CREATE_SERVICE",
        modalData: {
          initialData: service,
          onSuccess: () => {
            // Re-open this modal to show updated list feels tricky.
            // Better to just show success message on parent page.
            alert("Service updated. Refresh page to see changes.");
          },
        },
      })
    );
  };

  const openAddServiceModal = () => {
    close();
    dispatch(
      openModal({
        type: "CREATE_SERVICE",
        modalData: {
          preSelectedDeviceId: device._id, // Lock to this device
          onSuccess: () => alert("Service added. Refresh page to see changes."),
        },
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Services for {device.name}</h3>
        <button onClick={close} className={styles.closeBtn}>
          <X size={22} />
        </button>
      </div>

      <div className={styles.content}>
        <button className={styles.addBtn} onClick={openAddServiceModal}>
          <Plus size={16} /> Add New Service
        </button>

        {loading ? (
          <Loader2 className={styles.spin} />
        ) : (
          <div className={styles.list}>
            {services.map((service) => (
              <div key={service._id} className={styles.listItem}>
                <div>
                  <strong>{service.title}</strong>
                  <p>₹{service.price}</p>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => openEditServiceModal(service)}>
                    <Edit size={16} />
                  </button>
                  {/* Uncomment when backend delete service is ready */}
                  {/* <button onClick={() => handleDeleteService(service._id)} className={styles.del}><Trash2 size={16}/></button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageServicesModal;
