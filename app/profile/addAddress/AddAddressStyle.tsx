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
    defaultContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    defaultText:{
        fontSize: wp(3.6),
        fontFamily: fonts.medium,
        color: Colors.text,
        marginLeft: wp(3)
    },
    fieldsContainer:{
        flex:1
    },
     numberInput:{
        flexDirection:'row',
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        borderRadius:wp(2),
        marginBottom:hp(2)

    },
    codeText:{
        fontFamily:fonts.semibold,
        fontSize:wp(4),
        color:Colors.secondary,
        textAlignVertical:'center',
        paddingHorizontal:wp(2),
        borderRightWidth:0.5,
        borderColor: Colors.secondary
    }
    
});
export default styles