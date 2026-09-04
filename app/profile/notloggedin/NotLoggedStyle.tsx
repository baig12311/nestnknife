import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: hp(2),
        backgroundColor: Colors.background,
    },
    image: {
        width: wp(70),
        height: wp(50),
        opacity:0.7 
    },
    mainContainer: {
        flex: 1,
        //justifyContent: 'center',

    },
    heading: {
        color: Colors.text,
        fontSize: wp(6),
        fontFamily: fonts.displaySemibold,
        marginBottom: hp(1)


    },
    subHeading: {
        color: Colors.secondary,
        fontFamily: fonts.medium,
        fontSize: wp(4),

        textAlign: 'center',
        width: wp(75)

    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(3)

    },
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
        padding: wp(5),
        alignItems: 'center'
    },
    buttonTextContainer: {

    },
    icon: {
        width: wp(12),
        height: wp(12),
        borderRadius: wp(6),
        backgroundColor: Colors.background,

        justifyContent: 'center',
        alignItems: 'center'
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
    guestButton: {
        height: hp(6),
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: Colors.secondary2,
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: hp(3)
    },
    buttonText: {
        fontFamily: fonts.semibold,
        fontSize: wp(5),
        color: Colors.text

    },

    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(3)
    },

    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.secondary2,
        //borderWidth:1
    },

    orText: {
        marginHorizontal: 14,
        fontSize: wp(4),
        color: Colors.secondary,
        fontFamily: fonts.medium
    },
    privateContainer:{
        flexDirection: 'row',
        alignSelf: 'center',
        gap:8,
        alignItems: 'center'
    },
    privateText:{
        fontFamily:fonts.medium,
        fontSize:wp(3.5),
        color:Colors.secondary

    }

})
export default styles