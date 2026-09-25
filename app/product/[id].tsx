import { useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking
} from 'react-native';
import Colors from '../../constants/colors';
import AddToCartAnimation from '../../components/animations/AddToCartAnimation';
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
import CustomEmptyComponent from '../../components/common/CustomEmptyComponent';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ProductDetailSkeleton from '../../components/skeleton/ProductDetailSkeleton';
import ButtonOutline from '../../components/common/ButtonOutline';
import {
  createCart,
  addToCart,
} from '../../services/shopify/cart';
import HomeHeader from '../../components/home/HomeHeader';
import { setCartId } from '../../store/cartSlice';
import CustomToast from '../../components/common/CustomToast';

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productImageRef = useRef<View>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartPosition, setCartPosition] = useState({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});
  const [showToast, setShowToast] = useState(false)
  const [type, setType] = useState<'success' | 'error' | 'warn' | 'info'>('error')
  const [toastTitle, setToastTitle] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const queryClient = useQueryClient();
  const addToCartMutation = useAddToCart();
  const dispatch = useDispatch<any>();
  const flatListRef = useRef<FlatList>(null)
  const [showAddAnimation, setShowAddAnimation] = useState(false);
  const [productPosition, setProductPosition] = useState({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
});
  const cartId = useSelector(
    (state: RootState) => state.cart.cartId
  );

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [buying, setBuying] = useState(false);

  const {
    data: product,
    isLoading,
    error,
    refetch
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
      <SafeAreaView style={styles.errorContainer}>
         <View style={styles.headerContainer}>
        {/* <HomeHeader color={Colors.text} bgColor='white' isProduct={true}/> */}
        <HomeHeader color={Colors.text} bgColor='white' leftType='back'/>

      </View>
        <CustomEmptyComponent
          illustration={require('../../assets/illustrations/mainError.png')}
          mainText="Something Went Wrong"
          subText="We couldn't retrieve product details right now. Please try again."
          buttonTitle="Try Again"
          onPress={() => {refetch()
            console.log('Refetch Called')
          }}

        />

      </SafeAreaView>
    )
  }

  // measuring image 
 const measureProductImage = () => {
  productImageRef.current?.measureInWindow(
    (x, y, width, height) => {
      setProductPosition({
        x,
        y,
        width,
        height,
      });
    },
  );
};

  const variant = product.variants.edges[0]?.node;

 const handleAddToCart = async () => {
 measureProductImage();
  

  if (!variant) {
    console.error('No product variant found.');
    return;
  }

  try {
    setAdding(true);

    let currentCartId = cartId;

    // No cart ID → create a new cart
    if (!currentCartId) {
      const newCart = await createCart();

      currentCartId = newCart.id;

      dispatch(setCartId(newCart.id));
    }

    try {
      // Try adding to existing cart
      const result = await addToCartMutation.mutateAsync({
        cartId: currentCartId,
        merchandiseId: variant.id,
        quantity,
      });

      console.log('CART AFTER ADD:', result);

      if (result.addedQuantity === 0) {
        setType('info');
        setToastTitle('Already in your cart');
        setToastMessage(
          'The maximum quantity of this item is already in your cart.',
        );
      } else if (
        result.addedQuantity < result.requestedQuantity
      ) {
        setType('warn');
        setToastTitle('Limited Availability');
        setToastMessage(
          `Only ${result.addedQuantity} item${
            result.addedQuantity > 1 ? 's' : ''
          } were added due to availability.`,
        );
      } else {
        setShowAddAnimation(true);
        setType('success');
        setToastTitle('Added to cart');
        setToastMessage('This item is now in your cart.');
      }

      //setShowToast(true);

    } catch (error: any) {
      // Cart ID expired
      if (
        error?.message?.toLowerCase().includes('does not exist')
      ) {
        console.log(
          'Old cart expired. Creating a new cart...',
        );

        const newCart = await createCart();

        dispatch(setCartId(newCart.id));

        const result = await addToCartMutation.mutateAsync({
          cartId: newCart.id,
          merchandiseId: variant.id,
          quantity,
        });

        console.log('NEW CART AFTER ADD:', result);

        setType('success');
        setShowToast(true);
        setToastTitle('Added to cart');
        setToastMessage('This item is now in your cart.');

      } else {
        throw error;
      }
    }

  } catch (error: any) {
    setType('error');
    setShowToast(true);

    setToastTitle(
      error?.message?.toLowerCase().includes('only')
        ? 'Limited Availability'
        : 'Something Went Wrong',
    );

    setToastMessage(
      error?.message ||
        "We couldn't add the item right now. Please try again.",
    );

  } finally {
    setAdding(false);
  }
};
const handleBuyNow = async () => {
  if (!variant) {
    console.error('No product variant found.');
    return;
  }

  try {
    setBuying(true);

    let currentCartId = cartId;

    // No cart → create one
    if (!currentCartId) {
      const newCart = await createCart();

      currentCartId = newCart.id;

      dispatch(setCartId(newCart.id));
    }

    try {
      const result = await addToCartMutation.mutateAsync({
        cartId: currentCartId,
        merchandiseId: variant.id,
        quantity,
      });

      await Linking.openURL(result.cart.checkoutUrl);

    } catch (error: any) {
      // Cart expired
      if (
        error?.message?.toLowerCase().includes('does not exist')
      ) {
        const newCart = await createCart();

        dispatch(setCartId(newCart.id));

        const result = await addToCartMutation.mutateAsync({
          cartId: newCart.id,
          merchandiseId: variant.id,
          quantity,
        });

        await Linking.openURL(result.cart.checkoutUrl);
      } else {
        throw error;
      }
    }

  } catch (error: any) {
    console.log('BUY NOW ERROR:', error);

    setType('error');
    setToastTitle('Something Went Wrong');
    setToastMessage(
      error?.message ||
        "We couldn't proceed to checkout. Please try again.",
    );
    setShowToast(true);

  } finally {
    setBuying(false);
  }
};

  return (
    <SafeAreaView style={styles.mainContainer}>
      {showAddAnimation && (
  <AddToCartAnimation
    image={product.images.nodes[activeIndex]?.url}
    startX={productPosition.x}
    startY={productPosition.y}
    endX={cartPosition.x}
    endY={cartPosition.y}
    onComplete={() => {
  setShowAddAnimation(false);
  setShowToast(true);
}}
  />
)}
      <CustomToast
        type={type}
        visible={showToast}
        onHide={() => setShowToast(false)}
        // messageTitle={
        //   type === 'success' ? 'Added to Your cart' : 'Something went wrong'
        // }
        messageTitle={toastTitle}
        messageDescription={toastMessage}
      />
      <View style={styles.headerContainer}>
        {/* <HomeHeader color={Colors.text} bgColor='white' isProduct={true}/> */}
        <HomeHeader color={Colors.text} bgColor='white' leftType='back' 
         onCartPosition={(x, y, width, height) => {
    setCartPosition({
      x,
      y,
      width,
      height,
    });
  }}/>

      </View>

      <View style={styles.imageContainer}>
        <FlatList
          data={product?.images.nodes ?? []}
          ref={flatListRef}
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
          renderItem={({ item , index}) => (
            <View ref={index === activeIndex ? productImageRef : null} key ={index}>
              <Image
              source={{ uri: item.url }}
              resizeMode='cover'
              style={styles.image}
            />
            </View>
            

          )}
        />

      </View>
      <View

        style={styles.imageMapperContainer}
      >
        {product?.images.nodes.map((itemImage, index) => (
          <TouchableOpacity
          key={index}
            activeOpacity={0.7}
            onPress={() => {
              flatListRef.current?.scrollToIndex({
                index: index,
                animated: true
              })
              setActiveIndex(index)
            }}
          >
            <Image
              key={index}
              style={[
                styles.mapImage,
                activeIndex === index && styles.activeImage,
              ]}
              source={{ uri: itemImage.url }} />
          </TouchableOpacity>

        ))}
      </View>
      <View style={styles.dividerLine} />
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
        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }}>
            <ButtonOutline
              title='Add to Cart'
              onPress={handleAddToCart}
              loading={adding}
            />

          </View>
          <View style={{ flex: 1 }}>
            <Button
              title='Buy Now'
            onPress={handleBuyNow}
            loading={buying}
            />
          </View>


        </View>

      </View>

    </SafeAreaView>
  );
}

export default ProductDetailsScreen

