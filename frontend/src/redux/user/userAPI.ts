import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "./baseAPI";

interface Address {
  _id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserProfileResponse {
  user: {
    email: string;
    name?: string;
    phone?: string;
  };
  addresses: Address[];
}

interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  address?: Partial<Address>;
}

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: createBaseQuery("user"),
  endpoints: (builder) => ({
    getUserProfile: builder.query<UserProfileResponse, void>({
      query: () => "/profile",
    }),
    updateUserProfile: builder.mutation<
      UserProfileResponse,
      UpdateProfileRequest
    >({
      query: (body) => ({
        url: "/update",
        method: "PATCH",
        body,
      }),
    }),
    deleteUserProfile: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/delete",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useDeleteUserProfileMutation,
  useUpdateUserProfileMutation,
} = userAPI;
