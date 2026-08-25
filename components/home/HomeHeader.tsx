import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from '../Icon';
import { fonts } from '../../constants/typography';
import Colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderIcon from './HeaderIcon';
interface Props{
  title?:string

}
const HomeHeader:React.FC<Props>=({title})=> {
  return (
   <View style={[styles.container, !title&&{borderBottomWidth:0.2,}]}>
      {/* Left Side: Title ya Logo */}
      {title ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo} 
          resizeMode='contain'
        />
      )}
      
      {/* Right Side: Icons View */}
      <View style={styles.iconView}>
        {/* Notification Icon hamesha dikhega */}
        <HeaderIcon iconName='notifications-outline'/>
        
        {/* Cart Icon sirf tab dikhega jab title NAHI hoga */}
        <HeaderIcon iconName='cart-outline'/>
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
   
    marginBottom:hp(2)
    //alignItems: 'center',
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