
 import { View, Text, StyleSheet,} from 'react-native';
 import Colors from '../../constants/colors';
 import { fonts } from '../../constants/typography';
 import { ShadowCard } from '../common/ShadowCard';
 import Icon from '../Icon';
 import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
 
 // create a component
 const EmailCard = () => {
    return (
        <ShadowCard style={styles.buttonContainer} containerStyle={styles.buttonContainerStyle}>
          <View style={styles.button} 
        >
            <View style={styles.icon}>
              <Icon name='mail-outline' type='Ionicons' size={wp(6.5)} color={Colors.text} />
            </View>

            <View style={styles.buttonTextContainer}>
              <Text style={styles.ButtonMainText}>
                Email
              </Text>
              <Text style={styles.ButtonSubText}>
                shaheerbaig45@gmail.com
              </Text>
            </View>
           <Text style={styles.verifyText}>
            Verified
           </Text>

          </View>
        </ShadowCard>
    );
 };
 
 // define your styles
 const styles = StyleSheet.create({
     buttonContainer: {
        borderRadius: wp(2),
        marginBottom: hp(3)
    },
    buttonContainerStyle: {
        width: '100%',

    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp(3),
        alignItems: 'center'
    },
    buttonTextContainer: {
        flex:1
    },
    icon: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: Colors.background,

        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(4)
    },
    ButtonMainText: {
        fontFamily: fonts.semibold,
        color: Colors.text,
        fontSize: wp(4)
    },
    ButtonSubText: {
        fontFamily: fonts.medium,
        color: Colors.text,
        fontSize: wp(3.3)
    },
    verifyText:{
        padding: wp(2),
        backgroundColor: Colors.accent,
        borderRadius: wp(2)
    }
 });
 
 //make this component available to the app
 export default EmailCard;
 
 
 
 