import { useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from '../Icon';
import { fonts } from '../../constants/typography';
import Colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderIcon from './HeaderIcon';
import { router } from 'expo-router';
import { useCartBadge } from '../../hooks/useCartBadge';
interface Props{
  title?:string
  color:string
  bgColor?:string
  //isProduct?:boolean
  leftType?: 'image' | 'title' | 'back';
  onCartLayout?: (x: number, y: number, width: number, height: number) => void;
  onCartPosition?: (
  x: number,
  y: number,
  width: number,
  height: number
) => void;

}
const HomeHeader:React.FC<Props>=({title, color, bgColor, leftType, onCartLayout, onCartPosition})=> {
  const cartCount=useCartBadge()
  const cartIconRef = useRef<View>(null);
  const measureCartIcon = () => {
  cartIconRef.current?.measureInWindow(
    (x, y, width, height) => {
      onCartPosition?.(x, y, width, height);
    }
  );
};
useEffect(() => {
  const timer = setTimeout(() => {
    measureCartIcon();
  }, 100);

  return () => clearTimeout(timer);
}, []);
  return (
   <View style={[styles.container, leftType==='image'&&{borderBottomWidth:0.3,}]}>
      {/* Left Side: Title ya Logo */}
      <View>
  {leftType === 'image' && (
    <Image
      source={require('../../assets/logo.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  )}

  {leftType === 'title' && (
    <Text style={styles.title}>
      {title}
    </Text>
  )}

  {leftType === 'back' && (
    <HeaderIcon
      iconName="arrow-back"
      color={color}
      backgroundColor={bgColor}
      onPress={() => router.back()}
    />
  )}
</View>
      
      {/* Right Side: Icons View */}
      <View style={styles.iconView}>
        {/* Notification Icon hamesha dikhega */}
        <HeaderIcon iconName='notifications-outline' color={color} backgroundColor={bgColor}/>
        
        {/* Cart Icon sirf tab dikhega jab title NAHI hoga */}
        <HeaderIcon iconName='cart-outline' count={cartCount&&cartCount} 
        ref={cartIconRef}
        backgroundColor={bgColor}
        color={color}
        onPress={()=>router.replace('/cart')}/>
      </View>
    </View>
  );
}
export default HomeHeader

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    
    
    borderColor: Colors.secondary,
   
    marginBottom:hp(2),
    //paddingBottom: hp(2),
  },
  logo:{
    width: wp(16),
    height: hp(7),
  },
  brand: {
    fontSize:wp(9),
    fontWeight: '700',
    color: Colors.primary,
  },
  tagline: {
    marginTop: hp(0.2),
    fontSize: wp(3.5),
    color: '#666',
  },
  iconView:{
    flexDirection: 'row',

  },
  title:{
    fontSize: wp(5),
        fontFamily: fonts.semibold,
        //fontWeight: '600',
        color: Colors.text,
  }
  
});