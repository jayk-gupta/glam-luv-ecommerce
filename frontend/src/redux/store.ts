import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsSlice";
import { authAPI } from "./user/authAPI";
import authReducer from "./user/authSlice"
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
