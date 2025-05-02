import { createSlice } from "@reduxjs/toolkit";

interface DialogState {
  isLogoutDialogOpen: boolean;
}
const initialState: DialogState = {
  isLogoutDialogOpen: false,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openLogoutDialog: (state) => {
      state.isLogoutDialogOpen = true;
    },
    closeLogoutDialog: (state) => {
      state.isLogoutDialogOpen = false;
    },
  },
});

export const { openLogoutDialog, closeLogoutDialog } = dialogSlice.actions 
export default dialogSlice.reducer 