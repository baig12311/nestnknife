

import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, FlatList, Alert, Linking } from 'react-native';
import { useSelector } from 'react-redux';

import styles from '../styles/CartStyle';
import Header from '../../components/categories/Header';
import CartCard from '../../components/cart/CartCard';
import { router } from 'expo-router';

import {
  useUpdateCartLine,
  useRemoveCartLine,
} from '../../hooks/useCartMutations';

import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { useCart } from '../../hooks/useProducts';

import CartAmount from '../../components/cart/CartAmount';
import CustomToast from '../../components/common/CustomToast';
import Button from '../../components/common/Button';
import { useCustomer } from '../../hooks/useCustomer';

import ConfirmatinDialog from '../../components/profile/ConfirmationDialog';
import CustomEmptyComponent from '../../components/common/CustomEmptyComponent';

const Cart = () => {
  const dispatch = useDispatch<any>();

  const { customer } = useCustomer();

  const cartId = useSelector(
    (state: RootState) => state.cart.cartId
  );

  const { data: cart, isLoading, error } = useCart(cartId);

  const updateCartLineMutation = useUpdateCartLine();
  const removeCartLineMutation = useRemoveCartLine();

  const [showToast, setShowToast] = useState(false);

  const [modalShow, setModalShow] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [toastTitle, setToastTitle] = useState('');

  const [
    toastType,
    setToastType,
  ] = useState<'success' | 'error' | 'warn' | 'info'>('error');

  const [updatingLineId, setUpdatingLineId] = useState<string | null>(null);

  const [checkingOut, setCheckingOut] = useState(false);

  // Local quantities for instant UI updates
  const [quantities, setQuantities] = useState<
    Record<string, number>
  >({});

  // Debounce timers for each cart line
  const quantityTimers = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});

  /*
   * Sync local quantities with cart data
   */
  useEffect(() => {
    if (!cart?.lines?.edges) return;

    const newQuantities: Record<string, number> = {};

    cart.lines.edges.forEach(({ node }: any) => {
      newQuantities[node.id] = node.quantity;
    });

    setQuantities(newQuantities);
  }, [cart]);

  /*
   * Cleanup timers when screen unmounts
   */
  useEffect(() => {
    return () => {
      Object.values(quantityTimers.current).forEach(timer => {
        clearTimeout(timer);
      });
    };
  }, []);

  /*
   * Quantity change
   */
  const handleQuantityChange = (
    lineId: string,
    newQuantity: number
  ) => {
    if (!cartId) return;
    if (newQuantity < 1) return;

    /*
     * Update UI immediately
     */
    setQuantities(prev => ({
      ...prev,
      [lineId]: newQuantity,
    }));

    /*
     * Clear previous timer
     */
    if (quantityTimers.current[lineId]) {
      clearTimeout(quantityTimers.current[lineId]);
    }

    /*
     * Wait until user stops pressing + / -
     */
    quantityTimers.current[lineId] = setTimeout(async () => {
      try {
        setUpdatingLineId(lineId);

        const updatedCart =
          await updateCartLineMutation.mutateAsync({
            cartId,
            lineId,
            quantity: newQuantity,
          });

        const updatedLine =
          updatedCart.lines.edges.find(
            ({ node }: any) => node.id === lineId
          );

        const actualQuantity =
          updatedLine?.node.quantity ?? newQuantity;

        /*
         * Sync actual Shopify quantity
         */
        setQuantities(prev => ({
          ...prev,
          [lineId]: actualQuantity,
        }));

        /*
         * Stock was lower than requested quantity
         */
        if (actualQuantity < newQuantity) {
          setToastType('warn');

          setToastTitle('Limited Availability');

          setToastMessage(
            `Only ${actualQuantity} item${
              actualQuantity > 1 ? 's' : ''
            } ${
              actualQuantity > 1 ? 'were' : 'was'
            } added to your cart due to availability.`,
          );

          setShowToast(true);
        }
      } catch (error) {
        console.error(
          'QUANTITY UPDATE ERROR:',
          error
        );

        /*
         * If API fails, refresh cart quantity
         * from server/cache
         */
        if (cart?.lines?.edges) {
          const currentLine =
            cart.lines.edges.find(
              ({ node }: any) => node.id === lineId
            );

          if (currentLine) {
            setQuantities(prev => ({
              ...prev,
              [lineId]: currentLine.node.quantity,
            }));
          }
        }
      } finally {
        setUpdatingLineId(null);
      }
    }, 500);
  };

  /*
   * Remove item
   */
  const handleRemoveItem = async (
    lineId: string
  ) => {
    if (!cartId) return;

    /*
     * Clear pending quantity update
     * before removing the item
     */
    if (quantityTimers.current[lineId]) {
      clearTimeout(quantityTimers.current[lineId]);
    }

    try {
      setUpdatingLineId(lineId);

      await removeCartLineMutation.mutateAsync({
        cartId,
        lineId,
      });

      /*
       * Remove local quantity
       */
      setQuantities(prev => {
        const updated = { ...prev };

        delete updated[lineId];

        return updated;
      });
    } catch (error) {
      console.error(
        'REMOVE ITEM ERROR:',
        error
      );
    } finally {
      setUpdatingLineId(null);
    }
  };

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Cart" />
      </SafeAreaView>
    );
  }

  /*
   * Empty cart
   */
  const isCartEmpty =
    !cartId ||
    !cart ||
    cart.lines.edges.length === 0;

  if (isCartEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Cart" />

        <CustomEmptyComponent
          illustration={require('../../assets/illustrations/emptyCart.png')}
          mainText="Your Cart is Empty"
          subText="Looks like you haven't added anything yet."
          buttonTitle="Explore Collection"
          onPress={() =>
            router.replace('/categories')
          }
          isCart={true}
        />
      </SafeAreaView>
    );
  }

  /*
   * Checkout
   */
  const handleCheckout = async () => {
    if (!cart?.checkoutUrl) {
      Alert.alert(
        'Error',
        'Unable to proceed to checkout. Please try again.',
      );

      return;
    }

    if (!customer) {
      setModalShow(true);

      return;
    }

    try {
      setCheckingOut(true);

      console.log(
        'CHECKOUT URL:',
        cart.checkoutUrl
      );

      const checkoutUrl =
        `${cart.checkoutUrl}&sso=silent`;

      const supported =
        await Linking.canOpenURL(checkoutUrl);

      if (supported) {
        await Linking.openURL(checkoutUrl);
      } else {
        Alert.alert(
          'Error',
          'Unable to open checkout page.',
        );
      }
    } catch (error: any) {
      console.error(
        'CHECKOUT ERROR:',
        error
      );

      Alert.alert(
        'Error',
        error?.message ??
          'Something went wrong. Please try again.',
      );
    } finally {
      setCheckingOut(false);
    }
  };

  /*
   * Calculate total using local quantities
   */
  const cartTotal =
    cart?.lines.edges.reduce(
      (total, { node }: any) => {
        const price = Number(
          node.merchandise.price.amount
        );

        const quantity =
          quantities[node.id] ??
          node.quantity;

        return total + price * quantity;
      },
      0
    ) ?? 0;

  /*
   * Cart item
   */
  const renderCartItem = ({
    item,
    index,
  }: any) => {
    const { node } = item;

    const quantity =
      quantities[node.id] ??
      node.quantity;

    return (
      <CartCard
        productName={
          node.merchandise.product.title
        }
        price={Number(
          node.merchandise.price.amount
        )}
        image={
          node.merchandise.image?.url
        }
        quantity={quantity}

        onIncrease={() =>
          handleQuantityChange(
            node.id,
            quantity + 1
          )
        }

        onDecrease={() =>
          handleQuantityChange(
            node.id,
            quantity - 1
          )
        }

        onRemove={() =>
          handleRemoveItem(node.id)
        }

        updating={
          updatingLineId === node.id
        }

        showBorder={
          index !==
          cart.lines.edges.length - 1
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <CustomToast
        type={toastType}
        visible={showToast}
        onHide={() =>
          setShowToast(false)
        }
        messageTitle={toastTitle}
        messageDescription={toastMessage}
      />

      <Header title="Cart" />

      {modalShow && (
        <ConfirmatinDialog
          modalVisible={modalShow}
          title="Sign in to continue"
          msg="Please sign in to continue with checkout and keep your order linked to your account."
          txtButton="Sign In"

          onPressCancel={() =>
            setModalShow(false)
          }

          onPressDelete={() => {
            setModalShow(false);
            router.replace('/profile');
          }}
        />
      )}

      <View style={{ flex: 1 }}>
        <View
          style={styles.contentContainer}
        >
          <FlatList
            data={cart?.lines.edges}
            contentContainerStyle={{
              paddingBottom: 25,
            }}
            keyExtractor={({ node }) =>
              node.id
            }
            showsVerticalScrollIndicator={false}
            renderItem={renderCartItem}
          />
        </View>
      </View>

      <View style={styles.amountContainer}>

        <CartAmount
          title="SubTotal"
          amount={`PKR ${cartTotal.toLocaleString()}`}
        />

        <CartAmount
          title="Shipping"
          amount="Calculated at checkout"
        />

        <CartAmount
          title="Total"
          amount={`PKR ${cartTotal.toLocaleString()}`}
          borderWidth={0.3}
          padding={5}
          margin={6}
        />

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