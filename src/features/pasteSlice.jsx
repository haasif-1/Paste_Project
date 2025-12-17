import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pastes: localStorage.getItem("paste")
    ? JSON.parse(localStorage.getItem("paste"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      state.pastes.push(action.payload);
      localStorage.setItem("paste", JSON.stringify(state.pastes));
    },

    updateToPaste: (state, action) => {
      const index = state.pastes.findIndex(
        (item) => item._id === action.payload._id
      );

      if (index !== -1) {
        state.pastes[index] = action.payload;
        localStorage.setItem("paste", JSON.stringify(state.pastes));
      }
    },

    removeFromPaste: (state, action) => {
      state.pastes = state.pastes.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("paste", JSON.stringify(state.pastes));
    },

    resetAllPaste: (state) => {
      state.pastes = [];
      localStorage.removeItem("paste");
    },
  },
});

export const {
  addToPaste,
  updateToPaste,
  removeFromPaste,
  resetAllPaste,
} = pasteSlice.actions;

export default pasteSlice.reducer;
