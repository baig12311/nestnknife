import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: hp(2),
        backgroundColor: Colors.background,
    },
    statusContainer:{
        flexDirection:'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: hp(2)
        //paddingHorizontal:hp(2)
    },
    statusText:{
        //borderWidth:1,
        //textAlign: 'center',
        paddingHorizontal: wp(2),
        //width:'20%',
        //paddingVertical: hp(1),
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        color: Colors.secondary,
    },
    selectedText:{
        borderBottomWidth: 3,
        borderColor: Colors.primary,
        color: Colors.primary,
        fontFamily: fonts.semibold,
        borderRadius: 5
    },
    contentContainer:{

    }
   
    

})
export default styles