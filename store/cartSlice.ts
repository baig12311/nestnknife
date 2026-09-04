// import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// type CartState = {
//   cartId: string | null;
// };

// const initialState: CartState = {
//   cartId: null,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     setCartId: (state, action: PayloadAction<string>) => {
//       state.cartId = action.payload;
//     },

//     clearCart: (state) => {
//       state.cartId = null;
//     },
//   },
// });

// export const {
//   setCartId,
//   clearCart,
// } = cartSlice.actions;

// export default cartSlice.reducer;


// cartSlice.ts
// ❌ YE PURAANA CODE HAI - DELETE KAR DO

// export function useCart(cartId: string | null) {
//   return useQuery({
//     queryKey: ['cart', cartId],
//     queryFn: () => getCart(cartId!),
//     enabled: !!cartId,
//   });
// }

// ✅ YE NAYA CODE USE KAR


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    setCartIdAction: (state, action: PayloadAction<string>) => {
      state.cartId = action.payload;
    },

    clearCart: (state) => {
      state.cartId = null;
    },
  },
});

export const { setCartIdAction, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

// ============================================
// NICHE WALE 3 FUNCTIONS LAZMI LIKHNA
// ============================================

// FUNCTION 1 - App start ke time (PEHLE STEP)
export const loadCartId = () => async (dispatch: any) => {
  try {
    console.log('📂 Loading cart from phone storage...');
    const cartId = await AsyncStorage.getItem('cartId');
    
    if (cartId) {
      console.log('✅ Cart found:', cartId);
      dispatch(setCartIdAction(cartId));
    } else {
      console.log('ℹ️ No cart found, fresh start');
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  }
};


// FUNCTION 2 - Jab user cart banta hai (DOOSRA STEP)
export const setCartId = (cartId: string) => async (dispatch: any) => {
  try {
    console.log('💾 Saving cart to phone storage:', cartId);
    
    dispatch(setCartIdAction(cartId));
    await AsyncStorage.setItem('cartId', cartId);
    
    console.log('✅ Cart saved');
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};


// FUNCTION 3 - Jab user logout kare (TEESRA STEP)
export const clearCartData = () => async (dispatch: any) => {
  try {
    console.log('🗑️ Clearing cart from phone storage...');
    
    dispatch(clearCart());
    await AsyncStorage.removeItem('cartId');
    
    console.log('✅ Cart cleared');
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};