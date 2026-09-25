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
        
        //paddingHorizontal: wp(2),
        fontFamily: fonts.regular,
        fontSize: wp(3.3),
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

    },
    scrollContainer:{
        paddingBottom: hp(5)
    },
    emptyContainer:{
        minHeight: hp(80),
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyTitle:{
        fontFamily: fonts.semibold,
        color:Colors.text,
        fontSize: wp(5)
    },
    emptyDescription:{
        fontFamily: fonts.medium,
        color:Colors.secondary,
        fontSize: wp(4)
    }
   
    

})
export default styles