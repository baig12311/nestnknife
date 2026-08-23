import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addToCart,
  updateCartLine,
  removeCartLine,
} from '../services/shopify/cart';

/* =========================
   ADD TO CART
========================= */

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      merchandiseId,
      quantity,
    }: {
      cartId: string;
      merchandiseId: string;
      quantity: number;
    }) => addToCart(cartId, merchandiseId, quantity),

    onSuccess: (cart) => {
      queryClient.invalidateQueries({
        queryKey: ['cart', cart.id],
      });
    },
  });
}

/* =========================
   UPDATE CART LINE (quantity)
========================= */

export function useUpdateCartLine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      lineId,
      quantity,
    }: {
      cartId: string;
      lineId: string;
      quantity: number;
    }) => updateCartLine(cartId, lineId, quantity),

    onSuccess: (cart) => {
      queryClient.invalidateQueries({
        queryKey: ['cart', cart.id],
      });
    },
  });
}

/* =========================
   REMOVE CART LINE
========================= */

export function useRemoveCartLine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      lineId,
    }: {
      cartId: string;
      lineId: string;
    }) => removeCartLine(cartId, lineId),

    onSuccess: (cart) => {
      queryClient.invalidateQueries({
        queryKey: ['cart', cart.id],
      });
    },
  });
}