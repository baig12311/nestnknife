import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../styles/CartStyle';
import Header from '../../components/categories/Header';
import CartCard from '../../components/cart/CartCard';
import { useUpdateCartLine, useRemoveCartLine } from '../../hooks/useCartMutations';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { setCartId } from '../../store/cartSlice';
import { useCart } from '../../hooks/useProducts';
import CartAmount from '../../components/cart/CartAmount';
import Button from '../../components/common/Button';
import { Linking, Alert } from 'react-native';

const Cart = () => {
  const dispatch = useDispatch<any>();
  const cartId = useSelector((state: RootState) => state.cart.cartId);

  const { data: cart, isLoading, error } = useCart(cartId);

  const updateCartLineMutation = useUpdateCartLine();
  const removeCartLineMutation = useRemoveCartLine();

  const [updatingLineId, setUpdatingLineId] = useState<string | null>(null);

  const handleQuantityChange = async (lineId: string, newQuantity: number) => {
    if (!cartId) return;
    if (newQuantity < 1) return;

    try {
      setUpdatingLineId(lineId);

      await updateCartLineMutation.mutateAsync({
        cartId,
        lineId,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error('QUANTITY UPDATE ERROR:', error);
    } finally {
      setUpdatingLineId(null);
    }
  };

  const handleRemoveItem = async (lineId: string) => {
    if (!cartId) return;

    try {
      setUpdatingLineId(lineId);

      await removeCartLineMutation.mutateAsync({
        cartId,
        lineId,
      });
    } catch (error) {
      console.error('REMOVE ITEM ERROR:', error);
    } finally {
      setUpdatingLineId(null);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Cart" />
      </SafeAreaView>
    );
  }

  const isCartEmpty = !cartId || !cart || cart.lines.edges.length === 0;

  if (isCartEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Cart" />

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptyText}>Add some products to your cart.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const [checkingOut, setCheckingOut] = useState(false);

const handleCheckout = async () => {
  if (!cart?.checkoutUrl) {
    Alert.alert('Error', 'Unable to proceed to checkout. Please try again.');
    return;
  }

  try {
    setCheckingOut(true);
 // ✅✅✅ YEH 3 LINES ADD KAR ✅✅✅
    console.log('💾 Saving cart ID to storage...');
    dispatch(setCartId(cart.id) as any);
    console.log('✅ Cart ID saved:', cart.id);
    const supported = await Linking.canOpenURL(cart.checkoutUrl);

    if (supported) {
      await Linking.openURL(cart.checkoutUrl);
    } else {
      Alert.alert('Error', 'Unable to open checkout page.');
    }
  } catch (error) {
    console.error('CHECKOUT ERROR:', error);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  } finally {
    setCheckingOut(false);
  }
};

  const cartTotal =
    cart?.lines.edges.reduce((total, { node }) => {
      const price = Number(node.merchandise.price.amount);
      return total + price * node.quantity;
    }, 0) ?? 0;

  const renderCartItem = ({ item }: any) => {
    const { node } = item;

    return (
      <CartCard
        productName={node.merchandise.product.title}
        price={Number(node.merchandise.price.amount)}
        image={node.merchandise.image?.url}
        quantity={node.quantity}
        onIncrease={() => handleQuantityChange(node.id, node.quantity + 1)}
        onDecrease={() => handleQuantityChange(node.id, node.quantity - 1)}
        onRemove={() => handleRemoveItem(node.id)}
        updating={updatingLineId === node.id}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Cart" />

      <View style={{ flex: 1}}>
        <View
          style={styles.contentContainer}
        >
          <FlatList
            data={cart?.lines.edges}
            contentContainerStyle={{ paddingBottom: 25}}
            keyExtractor={({ node }) => node.id}
            showsVerticalScrollIndicator={false}
            renderItem={renderCartItem}
          />






        </View>
      </View>


      <View style={styles.amountContainer}>
        <CartAmount title='SubTotal' amount={`Rs. ${cartTotal.toLocaleString()}`} />
        <CartAmount title='Shipping' amount='Calculated at checkout' />
        <CartAmount title='Total' amount={`Rs. ${cartTotal.toLocaleString()}`} borderWidth={0.3} padding={5} margin={6} />
        <Button
  title="Proceed to Checkout"
  onPress={handleCheckout}
  loading={checkingOut}
/>
      </View>

    </SafeAreaView>
  );
};

export default Cart;