import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseAPI";

interface StartSignUpRequest {
  email: string;
}
interface VerifyOtpRequest {
  email: string;
  otp: string;
}
interface CompleteSignupRequest {
  email: string;
  password: string;
}
interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  message: string;
  user?: {
    email: string;
  };
  userId?: string;
}

export const authAPI = createApi({
  reducerPath: "authApi",
  baseQuery: createBaseQuery("auth/"),
  endpoints: (builder) => ({
    startSignUp: builder.mutation<{ message: string }, StartSignUpRequest>({
      query: (userData) => ({
        url: "signup/start",
        method: "POST",
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "verify-otp",
        method: "POST",
        body,
      }),
    }),
    completeSignup: builder.mutation<AuthResponse, CompleteSignupRequest>({
      query: (body) => ({
        url: "signup/complete",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "logout",
        method: "POST", // You can also use GET if your backend accepts it
        credentials: "include", // ensure cookies are sent
      }),
    }),
    getMe: builder.query<{ email: string }, void>({
      query: () => "me",
    }),
  }),
});

export const {
  useStartSignUpMutation,
  useVerifyOtpMutation,
  useCompleteSignupMutation,
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation
} = authAPI;
