import React, { useState, useEffect} from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Product } from '../../types/product';
import { fonts } from '../../constants/typography';
import Animated, { withTiming, withSpring, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { ShadowCard } from '../common/ShadowCard';
import { getWishlist, addToWishlist, removeFromWishlist } from '../../services/wishlist';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import Icon from '../Icon';

interface ProductCardProps {
  product: Product;
  onWishlistRemove?: (productId: string) => void;
  isWishlistScreen?: boolean,
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onWishlistRemove, isWishlistScreen}) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const heartScale = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: heartScale.value
        }
      ]
    }
  })
  const checkWishlist = async () => {
    const wishlist = await getWishlist()
    const exists = wishlist.some((item: any) => item.id === product.id)
    setIsWishlisted(exists)
  }
  useEffect(() => {
    checkWishlist()
  }, [product.id])
  const handleWishlist = async () => {
    heartScale.value = 0.7
    heartScale.value = withSpring(1.2, {
      damping: 6,
      stiffness: 300
    })
    setTimeout(() => {
      heartScale.value = withSpring(1)
    }, 150)
    if (isWishlistScreen) {
    await removeFromWishlist(product.id);
    setIsWishlisted(false);

    onWishlistRemove?.(product.id);
    return;
  }

  if (isWishlisted) {
    return;
  }

  await addToWishlist({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
  });

  setIsWishlisted(true);
  };
  return (
    <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
      <TouchableOpacity style={{ position: 'relative' }}

        activeOpacity={0.7}
        onPress={() =>
          router.push({
            pathname: '/product/[id]',
            params: { id: product.id },
          })
        }
      >
        <TouchableOpacity
          style={styles.saveIcon}
          activeOpacity={0.7}
          onPress={handleWishlist}
        >
          <Animated.View style={animatedStyle}>
            <Icon
              name={isWishlisted ? 'heart' : 'heart-outline'}
              type='Ionicons'
              color={isWishlisted ? '#C84037' : Colors.primary}
              size={wp(7)}
            />
          </Animated.View>

        </TouchableOpacity>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text
            style={styles.title}
            numberOfLines={2}
          >
            {product.title}
          </Text>

          <Text style={styles.price}>
            Rs. {product.price.toLocaleString()}
          </Text>
          
        </View>
      </TouchableOpacity>
    </ShadowCard>


  );
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    //width: wp(44),
    //marginRight: wp(),
    borderRadius: wp(3),
    //backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  containerStyle: {
    width: wp(44),
    marginBottom: hp(2)
  },

  image: {
    width: '100%',
    height: hp(17),
    backgroundColor: '#F5F5F5',
  },
  info: {
    padding: wp(2.5),
  },
  title: {
    fontSize: wp(3.5),
    //lineHeight: hp(2.4),
    fontFamily: fonts.medium,
    //fontWeight: '500',
    color: Colors.text,
  },
  price: {
    //marginTop: hp(1),
    fontSize: wp(4),
    fontFamily: fonts.displayBold,
    //fontWeight: '700',
    color: Colors.primary,
  },
  saveIcon: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(7),
    backgroundColor: Colors.secondaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10
  }
});