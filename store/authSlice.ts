import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopifyCustomer } from '../services/shopify/auth';

type AuthState = {
  accessToken: string | null;
  customer: ShopifyCustomer | null;
};

const initialState: AuthState = {
  accessToken: null,
  customer: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    setCustomer: (state, action: PayloadAction<ShopifyCustomer>) => {
      state.customer = action.payload;
    },

    logoutUser: (state) => {
      state.accessToken = null;
      state.customer = null;
    },
  },
});

export const {
  setAccessToken,
  setCustomer,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;