import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { fonts } from '../../constants/typography';
import { ShadowCard } from '../common/ShadowCard';
import Colors from '../../constants/colors';
const HeroBanner = () => {
  return (
    <ShadowCard style={styles.container}>
 <View>
      <Image source={require('../../assets/heroImage.png')} style={styles.image} resizeMode='contain'/>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>SMARTER KITCHEN</Text>

        <Text style={styles.title}>
          Make everyday cooking feel easier.
        </Text>

        <Text style={styles.description}>
          Practical kitchen solutions designed for modern everyday living.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Explore Collection</Text>
        </TouchableOpacity>
      </View>
    </View>
     </ShadowCard>
   
  );
}

export default HeroBanner;

const styles = StyleSheet.create({
  container: {
    //marginHorizontal: 20,
    //marginTop: hp(2),
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Colors.primary,
    marginBottom: hp(2),
    //elevation: 3
  },
  image:{
    width: wp(100),
    height: hp(30),
    //borderWidth: 1,
    left: '27%',
    opacity: 0.6,
    //right:0,
    bottom:'-16%',
    position: 'absolute'
  },
  content: {
    padding: wp(6),
  },
  eyebrow: {
    fontSize: wp(3),
    //fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.accent,
        fontFamily: fonts.semibold

  },
  title: {
    //marginTop: hp(0.5),
    fontSize: wp(7),
    lineHeight: wp(8),
    
    color: Colors.background,
    fontFamily:fonts.displayBold
  },
  description: {
    marginTop: hp(1),
    fontSize: wp(4),
    lineHeight: wp(6),
    color: Colors.background,
    
    fontFamily: fonts.regular
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: hp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
    borderRadius: 10,
    backgroundColor: Colors.background,
  },
  buttonText: {
    fontSize: wp(3.5),
    
    color: Colors.primary,
    fontFamily: fonts.semibold
  },
});