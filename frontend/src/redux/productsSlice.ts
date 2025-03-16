import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


interface Product {
  _id: string;
  name: string;
  price: string;
  brand: string;
  product_type: string;
  category: string;
  api_featured_image: string;
  tag_list?: string[]
}

interface Filters {
  product_type?: string;
  category?: string;
  brand?: string;
  tag_list?: string[];
  page?:number
}
interface ProductsResponse {
  products: Product[];
  currentPage: number;
  totalPages: number;
}


export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, Filters>({
      query: (filters) => ({
        url: "/products",
        params: {
          ...filters,
          page: filters.page,
          tag_list: filters.tag_list ? filters.tag_list : undefined,
        },
      }),
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {useGetProductsQuery} = productsApi