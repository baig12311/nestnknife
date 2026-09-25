import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
 
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: hp(2)
    },
    infoGrid:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        //padding: wp(3),
        borderRadius: wp(2)
    },
    containerStyle:{
        width: '100%',
        //padding: wp(2)
    },
    itemContainer:{
        
    },
    mainItemContainer:{
        //flex:1,
        //borderWidth:1,
        width: '100%',
        borderRadius: wp(2),
        padding: wp(3)
    },
    showMoreButton:{
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        //width: wp(40),
        marginTop: wp(3)
    },
    showMoreText:{
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        color: Colors.secondary
    },
    infoMain:{
            width: '50%',
        flexDirection: 'row'
    },
    divider:{
        height: hp(5),
        borderWidth: 0.3,
        borderColor: Colors.secondary,
        alignSelf: 'center',
        backgroundColor: 'yellow'
    }

})
export default styles
