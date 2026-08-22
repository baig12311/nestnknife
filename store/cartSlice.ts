import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartState = {
  cartId: string | null;
};

const initialState: CartState = {
  cartId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartId: (state, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },

    clearCart: (state) => {
      state.cartId = null;
    },
  },
});

export const {
  setCartId,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;