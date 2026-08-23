// hooks/useCartBadge.ts
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useCart } from './useProducts';

export function useCartBadge() {
  const cartId = useSelector((state: RootState) => state.cart.cartId);
  const { data: cart } = useCart(cartId);

  return cart?.totalQuantity ?? 0;
}