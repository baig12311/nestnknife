import { StyleSheet } from "react-native";
import Colors from "../../../constants/colors";
import { fonts } from "../../../constants/typography";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        //padding: hp(2),
        flex:1
       
    },
    content:{
        paddingBottom:hp(6)
    },
    heading:{
        fontFamily:fonts.semibold,
        fontSize: wp(5),
        //marginBottom: hp(0.5)
    }
});
export default styles