import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    type: "",
    config: {},
    modalData: null,
  },

  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload?.type || "";
      state.modalData = action.payload?.modalData || null; // ✅ match key
      state.config = action.payload?.config || {};
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.type = "";
      state.modalData = null;
      state.config = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
