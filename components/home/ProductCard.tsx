import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Product } from '../../types/product';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { ShadowCard } from '../common/ShadowCard';
interface ProductCardProps {
  product: Product;
};

const ProductCard:React.FC<ProductCardProps>=({ product })=>{
  return (
    <ShadowCard style={styles.container} containerStyle={styles.containerStyle}>
      <TouchableOpacity
      activeOpacity={0.7}
  //style={styles.container}
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
    //
    
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    //elevation:2,
   
  },
  containerStyle:{
    width: wp(42),
    marginRight: wp(3),
     marginBottom: hp(1),

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
    //fontWeight: '500',
    fontFamily:fonts.medium,
    color: Colors.text,
  },
  price: {
    marginTop:hp(1),
    fontSize: wp(4),
    fontFamily:fonts.displayBold,
    //fontWeight: '700',
    color: Colors.primary,
  },
});