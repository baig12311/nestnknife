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
        padding: wp(2),
        borderRadius: wp(2)
    },
    containerStyle:{
        width: '100%',
        //padding: wp(2)
    },
    itemContainer:{
        borderRadius: wp(2),
        padding: wp(2)
    }
    

})
export default styles
