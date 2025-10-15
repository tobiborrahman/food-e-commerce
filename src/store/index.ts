import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
