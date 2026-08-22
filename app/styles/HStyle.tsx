import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: hp(2),
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        paddingBottom: hp(2),
    },
    section: {

        marginBottom: hp(1),
        //padding: hp(2)
        //paddingLeft: 20,
    },
    sectionTitle: {
        marginBottom: hp(1),
        fontSize: wp(5.5),
        fontFamily: fonts.displaySemibold,
        //fontWeight: '600',
        color: Colors.text,
    },
    // Stylesheet changes
    shadowContainer: {
        marginRight: wp(3),
        marginBottom: hp(1),
        //width:wp(10)
    },
    cardShadowWrapper: {
        width: wp(30),
        height: hp(15),
        borderRadius: 16,
        backgroundColor: '#FFFFFF', // Solid background stops shadow bleed through
        // REMOVED: elevation, shadowColor, shadowOpacity, shadowRadius, shadowOffset
    },
    card: {
        //flex: 1,
        width: wp(25),
        height: hp(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        overflow: 'hidden', // Cleanly clips the image
        backgroundColor: Colors.background,
        marginRight: wp(3),

    },
    image: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10)
        //marginBottom: hp(0.5),

    },
    cardTitleContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cardTitle: {
        fontSize: wp(4),
        color: Colors.text,
        fontFamily: fonts.medium,
        fontWeight: '500',
        textAlign: 'center'
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionHeaderText: {
        color: Colors.primary,
        fontSize: wp(4),
        fontFamily: fonts.semibold,
        //textDecorationLine: 'underline',
    },
    searchContainer: {
        marginBottom: hp(2)
    }

});
export default styles;