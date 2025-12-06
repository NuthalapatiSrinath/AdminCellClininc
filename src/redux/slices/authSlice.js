import { createSlice } from "@reduxjs/toolkit";

// Check if token exists on initial load
const token = localStorage.getItem("adminToken");

const initialState = {
  isAuthenticated: !!token, // True if token exists
  user: token ? { role: "admin" } : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("adminToken"); // Clear token
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
