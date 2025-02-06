
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  [key: string]: any;
  product_type: string;
  category: string;
  img_url: string;
  api_featured_image: string;
}

interface Filters {
  product_type?: string;
  product_category?: string;
  product_tags?: string[];
  brand?: string;
  price_greater_than?: number;
  price_less_than?: number;
  rating_greater_than?: number;
  rating_less_than?: number;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://makeup-api.herokuapp.com/api/v1/",
    credentials: "include"
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], Filters>({
      query: (filters) => ({
        url: "products.json",
        params: {
          ...filters,
          product_tags: filters.product_tags?.join(","),
        },
      }),
    }),
  }),
});

export const {useGetProductsQuery} = productsApi