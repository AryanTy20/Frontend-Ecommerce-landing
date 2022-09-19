import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initial = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total?: number;
  img: string;
};
type id = number;

let initialState: initial[] | null = [];

const Cart = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<initial>) => {
      const { id, img, price, quantity, title } = action.payload;
      state.push({
        id,
        img,
        price,
        quantity,
        title,
        total: quantity * price,
      });
    },
    remove: (state, action: PayloadAction<id>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { add, remove } = Cart.actions;
export default Cart.reducer;
