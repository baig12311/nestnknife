import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: hp(2)
    },
    containerStyle: {
        width: '100%'
    },
    statusContainer: {
        flexDirection: 'row'
    },
    customContainer: {
        width: '100%',
        borderRadius: wp(2),
        padding: wp(3),
    },
    shippingCompany: {
        //marginBottom: wp(3),
        borderBottomWidth: 0.3,
        borderColor: Colors.secondary,
        paddingVertical: wp(1.5)

    },
    tracking: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: wp(1.5)
    },
    iconWrapper: {
        borderWidth: 1.5,
        borderColor: Colors.primary,
        width: wp(16),
        height: wp(16),
        borderRadius: wp(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        width: wp(13),
        height: wp(13),
        borderRadius: wp(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondaryBackground
    },
    textContainer: {
        //borderWidth:1,
        flex: 1,
        marginLeft: wp(3),
        alignItems: 'flex-start'
    },
    statusBadge: {
        backgroundColor: Colors.primary,
        color: Colors.background,
        fontFamily: fonts.regular,
        fontSize: wp(4),
        paddingHorizontal: wp(5),
        paddingVertical: wp(1),
        borderRadius: wp(50),
        textAlign: 'center',
        marginBottom: wp(2)
    },
    textMain: {
        fontFamily: fonts.semibold,
        fontSize: wp(4.5),
        color: Colors.primary
    },
    textSub: {
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        color: Colors.secondary
    },
    textCompany: {
        color: Colors.text,
        fontSize: wp(4),
        fontFamily: fonts.medium
    },
    textHeading: {
        color: Colors.secondary,
        fontSize: wp(3.5),
        fontFamily: fonts.medium

    },
    copyIcon: {

        width: wp(10),
        height: wp(10),
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondaryBackground
    }
});

export default styles
