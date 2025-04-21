import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsSlice";
import { authAPI } from "./user/authAPI";
import authReducer from "./user/authSlice";
import { cartAPI } from "./cart/cartAPI";
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [cartAPI.reducerPath]: cartAPI.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(authAPI.middleware)
      .concat(cartAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
