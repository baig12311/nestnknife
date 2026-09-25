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
    containerStyle: {
        width: '100%',
    },
    contentContainer:{
        //backgroundColor: 'white',
        //borderWidth:1,
        borderColor:Colors.secondary,
        borderStyle: 'dashed',
        width: '100%',
        borderRadius:wp(2),
        //padding: wp(3)
    }

});
export default styles