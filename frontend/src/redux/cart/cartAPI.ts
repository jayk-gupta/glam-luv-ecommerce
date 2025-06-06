import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../user/baseAPI";

interface Product {
  _id: string;
  name: string;
  price: number;
  api_featured_image: string;
}

export interface CartItem {
  product: Product; // ✅ full product object
  quantity: number;
}

interface CartResponse {
  items: CartItem[];
  message?: string;
}

interface AddToCartRequest {
  productId: string;
  quantity?: number;
}

interface UpdateCartRequest {
  productId: string;
  quantity: number;
}

interface RemoveFromCartRequest {
  productId: string;
}

export const cartAPI = createApi({
  reducerPath: "cartApi",
  baseQuery: createBaseQuery("cart/"),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // GET CART
    getCart: builder.query<CartResponse,number | void>({
      query: (_trigger) => "",
      providesTags: ["Cart"],
    }),

    // ADD TO CART
    addToCart: builder.mutation<CartResponse, AddToCartRequest>({
      query: (body) => ({
        url: "add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // UPDATE ITEM
    updateCartItem: builder.mutation<CartResponse, UpdateCartRequest>({
      query: (body) => ({
        url: "update",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // REMOVE ITEM
    removeFromCart: builder.mutation<CartResponse, RemoveFromCartRequest>({
      query: (body) => ({
        url: "remove",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // CLEAR CART
    clearCart: builder.mutation<CartResponse, void>({
      query: () => ({
        url: "clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} = cartAPI;
