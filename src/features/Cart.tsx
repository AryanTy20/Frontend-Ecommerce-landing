import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

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
      const exist = state.findIndex((el) => el.id == id);
      if (exist >= 0) {
        const total = quantity * price;
        state[exist].quantity = quantity;
        state[exist].total = total;
      } else {
        state.push({
          id,
          img,
          price,
          quantity,
          title,
          total: quantity * price,
        });
      }
    },
    remove: (state, action: PayloadAction<id>) => {
      return state.filter((item) => item.id !== action.payload);
      // if (exist >= 0) state.splice(exist, 1);
    },
  },
});

export const { add, remove } = Cart.actions;
export default Cart.reducer;
