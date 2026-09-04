import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import Icon from '../Icon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const Benefits = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Icon
                    name='lightbulb-on-outline'
                    type='MaterialDesignIcons'
                    size={wp(10)}
                    color={Colors.accent}
                />
                <Text style={styles.heading}>Why add your details</Text>
            </View>

            <Row
                point='Faster Checkout'
            />
            <Row
                point='Order update on Whatsapp & Email'
            />
            <Row
                point='Save multiple addresses'
            />




        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flexDirection: 'row',
        borderWidth: 0.3,
        padding: wp(3),
        borderRadius: wp(2),
        borderColor: Colors.secondary,
        backgroundColor: '#FFF5E6',
        marginBottom: hp(4)
    },
    heading: {
        fontFamily: fonts.semibold,
        fontSize: wp(4),
        color: Colors.text,
        marginLeft: wp(4)
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(1.5)

    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(0.5)
    },
    rowText: {
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        color: Colors.secondary,
        marginLeft: wp(4)
    },
    iconContainer: {
        width: wp(10),
        alignItems: 'center',
        alignSelf: 'center'
    },
});

export default Benefits;

interface Props {
    point?: string
}
const Row: React.FC<Props> = ({ point }) => {
    return (

        <View style={styles.rowContainer}>
            <View style={styles.iconContainer}>
                <Icon
                    name='checkmark-outline'
                    type='Ionicons'
                    size={wp(5)}
                    color={Colors.secondary}
                />
            </View>

            <Text style={styles.rowText}>
                {point}
            </Text>
        // </View>
    )
}
