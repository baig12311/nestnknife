import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import { fonts } from "../../../constants/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:hp(2),
        backgroundColor: Colors.background,
    },
    contentContainer:{
        flex:1,
        justifyContent: 'center'
    },
    image:{
        width: wp(70),
        height: hp(30),
        alignSelf: 'center'
    },
    mainText:{
        fontSize: wp(6),
        fontFamily: fonts.semibold,
        color: Colors.text,
        textAlign: 'center',
        //marginBottom: hp(1)
    },
    subText:{
        fontSize: wp(4),
        fontFamily: fonts.medium,
        color: Colors.secondary,
        textAlign: 'center',
        marginBottom: hp(10)

    },
    
});
export default styles