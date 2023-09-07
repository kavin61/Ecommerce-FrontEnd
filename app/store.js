import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
