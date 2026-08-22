import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import styles from '../styles/CartStyle';
import Header from '../../components/categories/Header';
import CartCard from '../../components/cart/CartCard';

import { RootState } from '../../store';
import { useCart } from '../../hooks/useProducts';
import { updateCartLine } from '../../services/shopify/cart';

const Cart = () => {
  const queryClient = useQueryClient();
  // ============================================================
  // CART ID
  // ============================================================

  const cartId = useSelector(
    (state: RootState) => state.cart.cartId
  );

  // ============================================================
  // GET CART FROM SHOPIFY
  // ============================================================

  const {
    data: cart,
    isLoading,
    error,
  } = useCart(cartId);

  // ============================================================
  // TRACK WHICH PRODUCT IS BEING UPDATED
  // ============================================================

  const [updatingLineId, setUpdatingLineId] = useState<string | null>(
    null
  );

  // ============================================================
  // CHANGE PRODUCT QUANTITY
  // ============================================================

const handleQuantityChange = async (
  lineId: string,
  newQuantity: number
) => {
  if (!cartId) return;

  // Quantity 1 se kam nahi hogi
  if (newQuantity < 1) return;

  try {
    setUpdatingLineId(lineId);

    // Shopify mein quantity update
    await updateCartLine(
      cartId,
      lineId,
      newQuantity
    );

    // Updated cart Shopify se dobara fetch hoga
    await queryClient.invalidateQueries({
      queryKey: ['cart', cartId],
    });

  } catch (error) {
    console.error(
      'QUANTITY UPDATE ERROR:',
      error
    );
  } finally {
    setUpdatingLineId(null);
  }
};

  // ============================================================
  // LOADING
  // ============================================================

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Cart" />

        {/* Yahan baad mein CartSkeleton use kar sakte ho */}
      </SafeAreaView>
    );
  }

  // ============================================================
  // SCREEN
  // ============================================================

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Cart" />

      <View>
        {cart?.lines.edges.map(({ node }) => (
          <CartCard
            key={node.id}

            productName={
              node.merchandise.product.title
            }

            price={Number(
              node.merchandise.price.amount
            )}

            image={
              node.merchandise.image?.url
            }

            /*
            |--------------------------------------------------------------------------
            | CURRENT QUANTITY
            |--------------------------------------------------------------------------
            |
            | Shopify se directly aa rahi hai.
            |
            */

            quantity={node.quantity}

            /*
            |--------------------------------------------------------------------------
            | INCREASE
            |--------------------------------------------------------------------------
            */

            onIncrease={() => {
              handleQuantityChange(
                node.id,
                node.quantity + 1
              );
            }}

            /*
            |--------------------------------------------------------------------------
            | DECREASE
            |--------------------------------------------------------------------------
            */

            onDecrease={() => {
              handleQuantityChange(
                node.id,
                node.quantity - 1
              );
            }}

            /*
            |--------------------------------------------------------------------------
            | LOADING
            |--------------------------------------------------------------------------
            */

            updating={
              updatingLineId === node.id
            }
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Cart;