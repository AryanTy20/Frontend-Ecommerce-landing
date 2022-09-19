import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../features/Cart";

export const store = configureStore({
  reducer: {
    Cart: CartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
