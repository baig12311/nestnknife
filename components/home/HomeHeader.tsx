import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from '../Icon';
import { fonts } from '../../constants/typography';
import Colors from '../../constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderIcon from './HeaderIcon';
const HomeHeader=()=> {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode='contain'/>
        {/* <Text style={styles.brand}>NestnKnife</Text> */}
        <View style={styles.iconView}>
          <HeaderIcon iconName='notifications-outline'/>
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
    borderBottomWidth:0.2,
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

  }
  
});