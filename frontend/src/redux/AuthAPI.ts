import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthState } from "./AuthSlice";
import axios from "axios";

const API_URL = "http://localhost:3000/user";

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
interface AuthReponse {
  token:string
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include", // To include cookies for authentication
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<void, UserData>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation<AuthReponse, Credentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        async onQueryStarted(_, { dispatch }) {
          document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          axios.defaults.headers.common["Authorization"] = "";
          dispatch(setAuthState({ isAuthenticated: false }));
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
