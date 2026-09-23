import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import { fonts } from "../../../constants/typography";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: hp(2),
        flex: 1

    },
    topContainer: {
        alignItems: 'center',
        marginBottom: hp(4)
    },
    image: {
        width: wp(35),
        height: wp(35),
    },
    heading: {
        fontFamily: fonts.displaySemibold,
        fontSize: wp(6),
        color: Colors.text,
        marginBottom: hp(1)
    },
    subText: {
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        color: Colors.secondary,
        textAlign: 'center'
    },
    contactContainer: {
        //borderWidth:1
        marginBottom: hp(3)
    },
    contactText: {
        fontFamily: fonts.semibold,
        fontSize: wp(4.5),
        color: Colors.text
    },
    footer: {
        position: 'relative',
        //height: hp(10),
        //width: '100%',
        borderWidth: 0.2,
        borderColor: Colors.secondary,
        alignItems: 'center'

    },
    footerText: {
        position: 'absolute',
        paddingHorizontal: wp(1),
        fontSize: wp(3),
        color: Colors.secondary,
        fontFamily: fonts.regular,
        top: -9,
        zIndex: 1,
        backgroundColor: Colors.background
    }

});
export default styles