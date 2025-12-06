import navBarSlice from "./slices/navBarSlice";
import modalSlice from "./slices/modalSlice";
import themeSlice from "./slices/themeSlice";
import authSlice from "./slices/authSlice"; // Import

const rootReducer = {
  navBar: navBarSlice,
  modal: modalSlice,
  theme: themeSlice,
  auth: authSlice, // Add
};

export default rootReducer;
