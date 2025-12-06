const { createSlice } = require("@reduxjs/toolkit");

const navBarSlice = createSlice({
  name: "navBar",
  initialState: {
    isSideBarOpen: true,
  },
  reducers: {
    toggleNavBar(state) {
      state.isOpen = !state.isOpen;
    },
    openNavBar(state) {
      state.isOpen = true;
    },
    closeNavBar(state) {
      state.isOpen = false;
    },
  },
});

export const { toggleNavBar, openNavBar, closeNavBar } = navBarSlice.actions;

export default navBarSlice.reducer;
