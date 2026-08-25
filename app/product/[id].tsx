import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import FormattedDescription from '../../services/FormattedDescription';
import { useQueryClient } from '@tanstack/react-query';
import { useAddToCart } from '../../hooks/useCartMutations';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams } from 'expo-router';
import styles from './DetailStyle';
import { RootState } from '../../store';
import { useProduct } from '../../hooks/useProducts';
import QuantityCard from '../../components/cart/QuantityCard';
import Button from '../../components/common/Button';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ProductDetailSkeleton from '../../components/skeleton/ProductDetailSkeleton';

import {
  createCart,
  addToCart,
} from '../../services/shopify/cart';

import { setCartId } from '../../store/cartSlice';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeIndex, setActiveIndex] = useState(0);
  const queryClient = useQueryClient();
  const addToCartMutation = useAddToCart();
  const dispatch = useDispatch();

  const cartId = useSelector(
    (state: RootState) => state.cart.cartId
  );

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  const {
    data: product,
    isLoading,
    error,
  } = useProduct(id);

  if (isLoading) {
    return (
      <ProductDetailSkeleton />
      // <ActivityIndicator
      //   style={styles.loader}
      //   size="large"
      //   color="#1F5B3A"
      // />
    );
  }

  if (error || !product) {
    return (
      <Text style={styles.error}>
        Unable to load product.
      </Text>
    );
  }

  const variant = product.variants.edges[0]?.node;

  const handleAddToCart = async () => {
    if (!variant) {
      console.error('No product variant found.');
      return;
    }

    try {
      setAdding(true);

      let currentCartId = cartId;

      if (!currentCartId) {
        const cart = await createCart();
        currentCartId = cart.id;
        dispatch(setCartId(cart.id));
      }

      const cart = await addToCartMutation.mutateAsync({
        cartId: currentCartId,
        merchandiseId: variant.id,
        quantity,
      });

      console.log('CART AFTER ADD:', cart);

    } catch (error) {
      console.error('ADD TO CART ERROR:', error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>

      <View style={styles.imageContainer}>
        <FlatList
          data={product?.images.nodes ?? []}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.url}
          onMomentumScrollEnd={(event) => {
  const index = Math.round(
    event.nativeEvent.contentOffset.x / wp(100)
  );

  setActiveIndex(index);
}}
          //style={styles.flatContainer}
          renderItem={({ item }) => (

            <Image
              source={{ uri: item.url }}
              resizeMode='cover'
              style={styles.image}
            />

          )}
        />
       
      </View>
 <View style={styles.dotsContainer}>
  {product?.images.nodes.map((_, index) => (
    <View
      key={index}
      style={[
        styles.dot,
        activeIndex === index && styles.activeDot,
      ]}
    />
  ))}
</View>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >



        <View style={styles.contentContainer}>
          <View style={styles.headingView}>
            <Text style={styles.title}>
              {product.title}
            </Text>

            <Text style={styles.price}>
              Rs.{' '}
              {Number(
                product.priceRange.minVariantPrice.amount
              ).toLocaleString()}
            </Text>
          </View>




          <FormattedDescription
            html={product.descriptionHtml || product.description || ''}
          />


          {/* Quantity */}

        </View>


      </ScrollView>
      <View style={styles.buyContainer}>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>
            Quantity
          </Text>
          <QuantityCard
            onIncrease={() =>
              setQuantity((current) => current + 1)}
            onDecrease={() =>
              setQuantity((current) =>
                Math.max(1, current - 1)
              )}
            quantity={quantity}
          />


        </View>

        {/* Add to Cart */}
        {/* <TouchableOpacity
          style={[
            styles.addToCartButton,
            adding && styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={adding}
        >
          {adding ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.addToCartText}>
              Add to Cart
            </Text>
          )}
        </TouchableOpacity> */}
        <Button
          title='Add to Cart'
          onPress={handleAddToCart}
          loading={adding}
        />
      </View>

    </SafeAreaView>
  );
}

export default ProductDetailsScreen

