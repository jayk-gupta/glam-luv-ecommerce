import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: JSON.parse(
    localStorage.getItem("isAuthenticated") || "false"
  ),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean }>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      // Persist authentication state and token
      localStorage.setItem(
        "isAuthenticated",
        JSON.stringify(action.payload.isAuthenticated)
      );

    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      // Clear persisted state
      localStorage.removeItem("isAuthenticated");

    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
