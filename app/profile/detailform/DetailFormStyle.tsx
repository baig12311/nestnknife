import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import { fonts } from "../../../constants/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        padding: hp(2),
        flex: 1

    },
    content: {
        paddingBottom: hp(6)
    },
    title: {
        fontSize: wp(5),
        fontFamily: fonts.semibold,
        color: Colors.text,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: wp(4),
        fontFamily: fonts.medium,
        color: Colors.secondary,
        textAlign: 'center',
        marginBottom: hp(3)

    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(4)
    },
   
});
export default styles