

import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';



import { startLogin, logoutOAuth, getStoredAccessToken } from '../services/shopify/shopify0Auth';

import {
  setAccessToken,
  setCustomer,
  logoutUser,
  finishAuthCheck
} from '../store/authSlice';
import { clearCartData } from '../store/cartSlice';
import { AppDispatch } from '../store';

/* =========================
   LOGIN
========================= */

export function useLogin() {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation({
    mutationFn: async () => {
      const tokenResult = await startLogin();

      return tokenResult;
    },

    onSuccess: async (tokenResult) => {
      const accessToken = tokenResult.accessToken;

      dispatch(setAccessToken(accessToken));

      console.log('SHOPIFY LOGIN SUCCESS');
      console.log('ACCESS TOKEN:', accessToken);
    },

    onError: (error) => {
      console.error('SHOPIFY LOGIN ERROR:', error);
    },
  });
}

/* =========================
   LOGOUT
========================= */

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation({
    mutationFn: async () => {
      await logoutOAuth();
    },

    onSuccess: () => {
      dispatch(logoutUser());
      dispatch(clearCartData() as any);
    },

    onError: (error) => {
      console.error('LOGOUT ERROR:', error);

      // Local session bhi clear kar dete hain
      dispatch(logoutUser());
    },
  });
}

/* =========================
   RESTORE SESSION
========================= */

// export async function restoreSession(dispatch: AppDispatch) {
//   try {
//     const storedToken = await getStoredAccessToken();

//     if (!storedToken) {
//       return;
//     }

//     dispatch(setAccessToken(storedToken));

//     console.log('SESSION RESTORED');
//     dispatch(finishAuthCheck());
//   } catch (error) {
//     console.error('RESTORE SESSION ERROR:', error);
//     dispatch(finishAuthCheck());
//   }
// }

export async function restoreSession(dispatch: AppDispatch) {
  try {
    const storedToken = await getStoredAccessToken();

    if (storedToken) {
      dispatch(setAccessToken(storedToken));
      console.log('SESSION RESTORED');
    }
  } catch (error) {
    console.error('RESTORE SESSION ERROR:', error);
  } finally {
    dispatch(finishAuthCheck());
  }
}