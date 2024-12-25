import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

interface ProductsState {
  products: Product[];
  filters: Filters;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductsState = {
  products: [],
  filters: {},
  loading: false,
  error: null,
};

// Async thunk for fetching products with filters
export const fetchProducts = createAsyncThunk<Product[], Filters>(
  "products/fetchProducts",
  async (filters) => {
    const response = await axios.get(
      "https://makeup-api.herokuapp.com/api/v1/products.json",
      {
        params: {
          ...filters,
          product_tags: filters.product_tags?.join(","),
        },
      }
    );
    return response.data;
  }
);

// Products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { updateFilters, resetFilters } = productsSlice.actions;
export default productsSlice.reducer;
