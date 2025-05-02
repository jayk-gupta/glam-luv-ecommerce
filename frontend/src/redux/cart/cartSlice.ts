import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CartUIState {
  itemCount: number;
}

const initialState: CartUIState = {
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.itemCount = action.payload;
    },
  },
});


export const { setCartCount } = cartSlice.actions;
export default cartSlice.reducer;

