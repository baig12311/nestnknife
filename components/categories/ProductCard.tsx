import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Product } from '../../types/product';
import { fonts } from '../../constants/typography';
import { ShadowCard } from '../common/ShadowCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
interface ProductCardProps {
  product: Product;
};

const ProductCard:React.FC<ProductCardProps>=({ product })=>{
  return (
    <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
 <TouchableOpacity
  onPress={() =>
  router.push({
    pathname: '/product/[id]',
    params: { id: product.id },
  })
}
>
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
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  containerStyle:{
    width: wp(44),
    marginBottom:hp(2)
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
    fontSize: wp(4),
    lineHeight: hp(2.4),
    fontFamily: fonts.medium,
    //fontWeight: '500',
    color: Colors.text,
  },
  price: {
    marginTop:hp(1),
    fontSize: wp(4),
    fontFamily: fonts.displayBold,
    //fontWeight: '700',
    color: Colors.primary,
  },
});