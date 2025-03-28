import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "./AuthAPI"; // Adjust path as necessary
import { productsApi } from "./productsSlice";
import authReducer from "./AuthSlice"
export const store = configureStore({
  reducer: {
    // [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // .concat(authApi.middleware)
      .concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

