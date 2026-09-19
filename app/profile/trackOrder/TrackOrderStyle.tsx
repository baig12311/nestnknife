import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: hp(2)
    },
    containerStyle:{
        width: '100%'
    },
    statusContainer:{
        width: '100%',
        borderRadius: wp(2),
        padding: wp(3),
        flexDirection: 'row'
    },
    iconWrapper:{
        borderWidth:2,
        borderColor: Colors.primary,
        width: wp(16),
        height: wp(16),
        borderRadius: wp(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer:{
        width: wp(13),
        height: wp(13),
        borderRadius: wp(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondaryBackground
    },
    textContainer:{
        //borderWidth:1,
        flex:1,
        marginLeft: wp(3),
        alignItems: 'flex-start'
    },
    statusBadge:{
        backgroundColor: Colors.primary,
        color: Colors.background,
        fontFamily: fonts.regular,
        fontSize: wp(4),
        paddingHorizontal: wp(5),
        paddingVertical: wp(1),
        borderRadius: wp(50),
        textAlign: 'center'
    }
});

export default styles
