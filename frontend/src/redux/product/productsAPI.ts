import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQuery } from "../user/baseAPI";

interface ProductColor {
  hex_value: string;
  colour_name: string;
}

interface Product {
  _id: string;
  name: string;
  price: string;
  brand: string;
  product_type: string;
  category: string;
  api_featured_image: string;
  description: string;
  product_colors?: ProductColor[];
  tag_list?: string[];
}

interface Filters {
  product_type?: string;
  category?: string;
  brand?: string;
  tag_list?: string[];
  page?: number;
}

interface ProductsResponse {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: createBaseQuery("products"),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, Filters>({
      query: (filters) => ({
        url: "",
        params: {
          ...filters,
          page: filters.page,
          tag_list: filters.tag_list ? filters.tag_list : undefined,
        },
      }),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
