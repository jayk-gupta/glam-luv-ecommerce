import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/user";

// Interfaces
interface UserData {
  email: string;
  password: string;
  confirmPassword?: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated") || "false"),
  user: null,
};

// Async actions
export const registerUser = async (userData: UserData): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true,
    });
    console.log("User registered successfully:", response);
    return response.data;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};

export const loginUser = async (credentials: Credentials): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true,
    });
    console.log("User logged in successfully:", response);

    return response.data;
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};

export const logoutUser = (): void => {
  // Remove the token from the cookie
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Remove the token from Axios headers
  delete axios.defaults.headers.common["Authorization"];

  // Optionally, redirect to the login page
  window.location.href = "/login";
};

// Redux slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem("isAuthenticated", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated")
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
