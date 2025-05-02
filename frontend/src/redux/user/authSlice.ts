import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
  } | null;
  signupEmail: string;
  authTrigger: number;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  signupEmail: "",
  authTrigger: Date.now(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ email: string }>) => {
      state.isAuthenticated = true;
      state.user = { email: action.payload.email };
      state.authTrigger = Date.now();
    },
    // Called during signup step 1 (after sending OTP)
    setSignupEmail: (state, action: PayloadAction<string>) => {
      state.signupEmail = action.payload;
    },
    // Clear after signup is done or user cancels
    clearSignupState: (state) => {
      state.signupEmail = "";
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.authTrigger = Date.now();
    },
  },
});

export const { setCredentials, logout, setSignupEmail, clearSignupState } =
  authSlice.actions;
export default authSlice.reducer;
